var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const editarrData = require("./editarrData");
const { resultRound } = require("./resultRound");
var {
  getStatus,
  updateStatus,
  insertCard,
  getCardMatch,
  createStatus,
  createCard,
  deleteMatch,
  getCardAll,
  loginSessionHandler,
} = require("./connectMongo");
const { response } = require("express");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 5000;

var arrData = []; //recive 4 cards form arduino
//init status
var gameStatus = {
  game_match: 1,
  game_round: 1,
  trump: "None",
  first_direction: "South",
  start_date_time: "2021-05-15T17:04:35.680+00:00",
  end_date_time: "2021-05-15T17:04:35.680+00:00",
  win_point: {
    South: 0,
    West: 0,
    North: 0,
    East: 0,
  },
};

//Get last status form last game_match form Mongo
const getStatusHandler = () => {
  getStatus().then((res) => {
    res
      .sort({ _id: -1 })
      .limit(1)
      .toArray((err, docs) => {
        gameStatus = {
          game_match: docs[0].game_match,
          game_round: docs[0].game_round,
          trump: docs[0].trump,
          first_direction: docs[0].first_direction,
          start_date_time: docs[0].start_date_time,
          end_date_time: docs[0].end_date_time,
          win_point: {
            South: docs[0].win_point.South,
            West: docs[0].win_point.West,
            North: docs[0].win_point.North,
            East: docs[0].win_point.East,
          },
        };
        console.log(gameStatus);
        if (gameStatus.game_round === 13) {
          //start new game match reset status to init and game_match += 1
          let myqueryStatus = {
            _id: gameStatus.game_match + 1,
            game_match: gameStatus.game_match + 1,
            game_round: 1,
            trump: "H1",
            first_direction: "South",
            start_date_time: gameStatus.end_date_time,
            end_date_time: gameStatus.end_date_time,
            win_point: {
              South: 0,
              West: 0,
              North: 0,
              East: 0,
            },
          };
          let myqueryCard = {
            _id: gameStatus.game_match + 1,
            record_card: [["Back", "Back", "Back", "Back", "Back"]],
          };
          createStatus(myqueryStatus)
            .then(console.log("[Create new status match success]"))
            .then(getStatusHandler())
            .catch((err) => console.log(err));
          createCard(myqueryCard)
            .then(console.log("[Create new card match success]"))
            .catch((err) => console.log(err));
        }
      });
  });
};

app.listen(port, () => {
  console.log("[success] : listening on port " + port);
  //resetMongoInit();
  getStatusHandler();
});

app.get("/", (req, res) => {
  res.status(200).send("first page of api express");
});

//get data form arduino
app.get("/write/:data", (req, res) => {
  data = req.params.data;
  if (gameStatus.trump === "None") {
    console.log("You must to Auction before go to playing state.");
    return res.send(
      "You placing " +
        data +
        "  You must to auction before go to playing state !!"
    );
  } else {
    res.send("You placing " + data);
    console.log("You placing " + data);
    arrData.push(data);
    if (arrData.length === 4) {
      console.log(`[Card_Data] :  ${arrData}`);
      //console.log(gameStatus.first_direction);
      arrData = editarrData(arrData, gameStatus.first_direction);
      var [winRound, first_direciton] = resultRound(arrData, gameStatus.trump);
      console.log(
        `[WinRound] : ${winRound}  [First_Direction] :  ${first_direciton}`
      );
      //insert card to db
      let myquery = { _id: gameStatus.game_match };
      let newvalues = {
        $push: { record_card: [...arrData, `${winRound}_${first_direciton}`] },
      };
      insertCard(myquery, newvalues)
        .then((res, err) => {
          if (err) throw err;
          console.log("Update record_card completed");
        })
        .then(() => {
          //update status when finish round
          let date = new Date(); //get local time
          let winRound = gameStatus.win_point[first_direciton] + 1;
          console.log(winRound);
          let myqueryStatus = { _id: gameStatus.game_match };
          var newvaluesStatus = {
            $set: {
              game_round: gameStatus.game_round + 1,
              first_direction: first_direciton,
              [`win_point.${first_direciton}`]: winRound,
            },
          };
          //if first round
          if (gameStatus.game_round === 1) {
            console.log("Round = 1");
            newvaluesStatus = {
              $set: {
                game_round: gameStatus.game_round + 1,
                first_direction: first_direciton,
                start_date_time: date,
                [`win_point.${first_direciton}`]: winRound,
              },
            };
          }
          //if last round
          if (gameStatus.game_round === 13) {
            console.log("Round = 13");
            newvaluesStatus = {
              $set: {
                game_round: gameStatus.game_round,
                first_direction: first_direciton,
                end_date_time: date,
                [`win_point.${first_direciton}`]: winRound,
              },
            };
          }
          updateStatus(myqueryStatus, newvaluesStatus)
            .then(() => {
              console.log("Update status completed");
              arrData = []; //reset
              getStatusHandler();
            })
            .catch((err) => console.log(err));
        });
    }
  }
});

//Post status trump & first_direction
app.post("/poststatus", (req, res) => {
  let trump = req.body.trump;
  let first_direction = req.body.first_direction;
  let mySQL = { _id: gameStatus.game_match };
  let newSQL = { $set: { trump: trump, first_direction: first_direction } };
  updateStatus(mySQL, newSQL)
    .then(() => {
      console.log("Update Post status complete");
      res.send("Update Post status complete");
    })
    .then(getStatusHandler())
    .catch((err) => console.log(err));
});

//Get card api
app.get("/card", (req, res) => {
  readAllCard(res);
});

//Get record_card api
app.get("/recordcard/:match", (req, res) => {
  let match = req.params.match;
  readCardMatch(parseInt(match), res);
});

//Get status api
app.get("/status", (req, res) => {
  readStatus(res);
});

//Deleted Match API
app.get("/delete/match/:match", (req, res) => {
  let match = req.params.match;
  deleteMatch(parseInt(match), res);
});

//Post Login API
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(`username : ${username} , password : ${password}`);
  loginSession(username, password, res);
});

//Login function
function loginSession(username, password, res) {
  loginSessionHandler().then((response, err) => {
    if (response.username === username && response.password === password) {
      res.send({ token: response.session });
    } else {
      res.send({ token: "Failed" });
    }
  });
}

//read card match function
async function readCardMatch(match, res) {
  await getCardMatch(match).then((response, err) => {
    if (err) throw err;
    res.json(response);
    console.log("Read card match passed");
  });
}

//read all card function
async function readAllCard(res) {
  await getCardAll().then((response) => {
    response.toArray((err, docs) => {
      if (err) throw err;
      res.json(docs);
      console.log("Read all card passed");
    });
  });
}

//read status function
async function readStatus(res) {
  await getStatus().then((response) => {
    response.toArray((err, docs) => {
      if (err) throw err;
      res.json(docs);
      console.log("Read status passed");
    });
  });
}
