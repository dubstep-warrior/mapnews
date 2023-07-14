const express = require("express");
const router = express.Router(); 
const ImageKit = require("imagekit"); 
require('dotenv').config();


var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id"
});

router.get("/signature", (req, res) => {
  var authentcationParameters = imagekit.getAuthenticationParameters();
  res.send(authentcationParameters);
});

module.exports =  router; 