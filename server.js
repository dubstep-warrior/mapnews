require('dotenv').config();
const mongoose =  require("mongoose");
const express = require('express')
const articles = require("./routes/article.routes");
const auth = require("./routes/auth.routes");
const config = require("./routes/config.routes")
const bodyParser =  require("body-parser");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_CLUSTER_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));


const whitelist = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

 

//body-parser config;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`)
});

app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

app.use("/api/v1/config", config); 
app.use("/api/v1/articles", articles); 
app.use("/api/v1/auth", auth); 
