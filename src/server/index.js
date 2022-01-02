require("dotenv").config();
const express = require("express");
const cors= require("cors");
const app = express();
const port = process.env.PORT || 5001 ;
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
    const mockAPIRes = require("./mockAPI.js");


app.use(cors());
app.use(express.json());

app.use(express.static("dist"))

app.get("/test", (req, res)=>{
    res.status(200).send(mockAPIRes)
});
app.post("/",async (req,res)=>{
    const url = req.body.url;
    const privateKey=process.env.API_KEY; 
    const returnedData= await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${privateKey}&url=${url}&lang=en`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  const {
    agreement,
    confidence,
    subjectivity,
    status,
  } = returnedData;
  res.status(200).json({
    agreement,
    confidence,
    subjectivity,
    status,
  });
});

app.listen(port, ()=>{
    console.log(`server is running on port :  ${port}`);
});




