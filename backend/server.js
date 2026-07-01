
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const searchRoutes = require("./routes/searchRoutes");


app.use("/api", searchRoutes);

app.get("/", (req,res)=>{
    res.send("QuantHire Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});