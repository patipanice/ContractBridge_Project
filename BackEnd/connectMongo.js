var MongoClient = require("mongodb").MongoClient;
//var cardJson = require("./jsonDB/card.json");
//var statusJson =require("./jsonDB/status.json");
const URL = "mongodb://localhost:27017/ContractBridgeDB";
const STATUS = "status";
const CARD = "card";


//Connect MongoDB
const connectMongo = MongoClient.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getStatus = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).find({});
  });

//Get Cards
const getCard = (match,round) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).find({ _id : match});
  });

const updateStatus = async (query, newquery) =>
 await connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).update(query, newquery);
  });

const createStatus = (query) => 
  connectMongo.then(db=>{
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).insertOne(query);
  });

  const createCard = (query) =>
  connectMongo.then((db) => { 
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).insertOne(query);
  });
/*const insertCard = (myquery, newvalues) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection("card").updateOne(myquery, newvalues);
  });*/

  const insertCard = (myquery,newquery) =>
  connectMongo.then((db) => { 
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).updateOne(myquery,newquery);
  });




  const resetMongoInit = async (_id) =>{
   await connectMongo.then((db) => {
      let dbo = db.db("ContractBridgeDB");
      dbo.collection(STATUS).deleteOne({'_id':_id},(err)=>{
        if(err) throw(err)
        console.log(`Delete ${_id} document completed`)
      });
    });
  }


module.exports = {
  getStatus,
  updateStatus,
  insertCard,
  getCard,
  createStatus,
  resetMongoInit,
  createCard
};
