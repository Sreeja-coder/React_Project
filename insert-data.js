const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:Newuser123@vidly.w1sgx.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "vidly";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("genres");

         // Construct a document                                                                                                                                                              
         let personDocument = {
  "_id": {
    "oid": "5ff7d03aec334f4ac8baa937"
  },
  "name": "Comedy",
  "__v": 0
}

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);