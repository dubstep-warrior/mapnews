import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from 'mongoose'
// const express = require('express')
// const articles = require("./routes/article.routes");
// const auth = require("./routes/auth.routes");
// const config = require("./routes/config.routes")
// const bodyParser =  require("body-parser");
// const cors = require("cors"); 
import application from './application'
import * as http from 'http';
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_CLUSTER_URI!, {useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
.then((res: any) => console.log(`Connection Succesful ${res}`))
.catch((err: any) => console.log(`Error in DB connection ${err}`));

 

 

const server = http.createServer(application.instance);

server.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
}); 
