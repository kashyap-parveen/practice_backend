import { connect } from "mongoose";
import {DB_NAME} from "../constants.js"

async function mongoDB_connection(){
    try {
      const connectionInstance =  await connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);
      console.log(`MongoDB Connect successfully at Host :-: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`mongoDB connection faild ERROR:-: ${error}`);
        process.exit(1);
    }
};

export default mongoDB_connection;


























/*
import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);
        console.log(`/m Mongo Database Connetion Connect Successfully at Host :: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`ERROR: Mongo DB connetion faild : ${error}`);
        process.exit(1)
    }
}
export default connectDB;
*/