const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("QuantHire Backend Running");
});

app.listen(5000,()=>{
    console.log("Server running");
});