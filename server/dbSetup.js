import mongoose from 'mongoose'

const dbConnection = async () =>{
    try{
        console.log("process.env.MONGO_URL",process.env.MONGO_URL)
        const con = await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
        const dbName = con.connection.db.databaseName;
        console.log("Connected MongoDB : "+ dbName)
        return con;
    }catch(error){
        console.log("Error connecting with MongoDB : ",error)
    }
}

export default dbConnection