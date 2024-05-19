import mongoDB_connection from './db/index.js'
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})


const port = process.env.PORT || 5000
mongoDB_connection()
.then((  ) => { 
    app.on("error",(error) => {
        console.log(`MongoDB Connection Faild at ERRROR: ${error}`);
        throw error;
    });
    app.listen(port,( ) => {
        console.log(`Your server listen at Port no:${port}`);
    });
})
.catch(( err) => {
    console.log("Mongo connetion faild at Error ::",err);
 })





















/*
import dotenv from "dotenv";
import connectDB from "./db/index.js"
import app from './app.js'

dotenv.config({
    path:"./.env"
});

const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(`Mongo DB Connetion Faild file in main Index : ${error}`);
        throw error;
    });
    app.listen(port,()=>{
        console.log(`Your Local Server Listen at Port No:${port}`);
    })
})
.catch((error)=>{
    console.log(`Connetion Faild at Mongo DB ERROR:${error}`);
});
*/
