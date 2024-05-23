const express = require("express");
const app = express();
const db = require("./config/connection");
const router =require("./route/locationRoute")
const port = 3000;
const createLocationTable =require('./model/location')
app.use(express.json())

app.use("/test",router)

//if you want create table form here

const initModel=async()=>{
    try {
        await createLocationTable()
        console.log('initialization completed', )
    } catch (error) {
        console.log('failed to db', error)
        process.exit(1)
    }
}
initModel().then(()=>{
    app.listen(port, () => {
        console.log("server on fire", port);
      });
})




