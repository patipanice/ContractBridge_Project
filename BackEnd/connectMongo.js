var MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://localhost:27017/ContractBridgeDB";
const STATUS = "status";
const CARD = "card";
const USER = "user";

//Connect MongoDB
const connectMongo = MongoClient.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Find All user
const loginSessionHandler = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    let loginData = dbo.collection("user").findOne({ _id: 1 });
    return loginData;
  });

//Get Status All
const getStatus = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).find({});
  });

//Get Cards Match
const getCardMatch = (match) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).findOne({ _id: match });
  });

//Get Cards All
const getCardAll = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).find({});
  });

const updateStatus = async (query, newquery) =>
  await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).update(query, newquery);
  });

const createStatus = (query) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).insertOne(query);
  });

const createCard = (query) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).insertOne(query);
  });

const insertCard = (myquery, newquery) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).updateOne(myquery, newquery);
  });

const resetMongoInit = async (_id) => {
  await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    dbo.collection(STATUS).deleteOne({ _id: _id }, (err) => {
      if (err) throw err;
      console.log(`Delete ${_id} document completed`);
    });
  });
};

//Deleted and creted document and update status
const deleteMatch = async (match, res) => {
  await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    dbo.collection(CARD).deleteOne({ _id: match }, (err) => {
      if (err) throw err;
      console.log(`Delete ${match} document completed`);
    });
  });

  await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    let cardCollection = {
      _id: match,
      record_card: [["Back", "Back", "Back", "Back", "Back"]],
    };
    dbo.collection(CARD).insertOne(cardCollection, (err) => {
      if (err) throw err;
      console.log(`Insert ${match} document completed`);
      res.send(`Delete & Insert on match ${match} completed`);
    });
  });

  //Update status

  await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    dbo.collection(STATUS).deleteOne({ _id: match }, (err) => {
      if (err) throw err;
      console.log(`Delete status on match ${match} completed`);
    });
  });
  await connectMongo.then((db) => {
    let date = new Date();
    let statusCollection = {
      _id: match,
      game_match: match,
      trump: "None",
      game_round: 1,
      first_direction: "South",
      end_date_time: date,
      start_date_time: date,
      win_point: { South: 0, West: 0, North: 0, East: 0 },
    };
    let dbo = db.db("ContractBridgeDB");
    dbo.collection(STATUS).insertOne(statusCollection, (err) => {
      if (err) throw err;
      console.log(`Update status on match ${match} completed`);
    });
  });
};

module.exports = {
  getStatus,
  updateStatus,
  insertCard,
  getCardMatch,
  createStatus,
  resetMongoInit,
  createCard,
  deleteMatch,
  getCardAll,
  loginSessionHandler,
};
