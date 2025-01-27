import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const base =  "https://doctor-who-api.onrender.com/api";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})










app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})