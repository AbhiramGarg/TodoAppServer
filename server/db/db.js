import mongoose, { Mongoose } from "mongoose";
const collectionname = "users"

const checkdb = async() => {
    const collectionexists = await mongoose.connection.db.listCollections().toArray()
    const list = collectionexists.map(c => c.name)
    console.log(list)
    const result = collectionexists.some(c => c.name === collectionname)
    return result
}

export const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB!")
        
        const dbexists = await checkdb()
        console.log(dbexists)
        if(dbexists) {
            console.log(`Table ${collectionname} exisis, skipping creation`);
        }
        else {
            mongoose.connection.db.createCollection(collectionname,(err,res) => {
                if(err){
                    console.log(`Error creating collection ->${err}`)
                }
                else {
                    console.log(`Collection ${dbName} created successfully!`);
                }
            })
        }
           
    } catch (error) {
        console.log(`Error connecting to the server->${error}`);    
    }
}
