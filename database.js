const {MongoClient} = require("mongodb");
const {URL} = require("./secret.js")

const url = URL;

const client = new MongoClient(url);

const dbName = 'NodeJS';

async function main(){
    await client.connect();
    console.log("Connected Sucessfully");
    const db = client.db(dbName);
    const collection = db.collection('Victory');

    await collection.insertOne({
        name: "Rahul",
        age: 21
    });

    const findResult = await collection.find({}).toArray();
    console.log(findResult);

    return 'done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());