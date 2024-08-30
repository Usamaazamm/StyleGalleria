import mongoose from "mongoose";

const ConnectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to the ${conn.connection.host}`);
    }
    catch (error){
        console.log(`find some error ${process.env.PORT} ${error}`);
    }
}

export default ConnectDb;