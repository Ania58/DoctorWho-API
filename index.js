import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const base =  "https://doctor-who-api.onrender.com/api";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", async (req, res) => {
    try {
        const characterIds = [10, 11, 12, 13, 17, 24, 20, 21, 22]
        const responses = await Promise.all(
            characterIds.map((id) => axios.get(`${base}/character/${id}`))
        );
        const specificCharacters =  responses.map((response) => response.data);
        console.log(specificCharacters);
        
        res.render("index.ejs", { characters: specificCharacters });
    } catch (error) {
        console.error("Error fetching characters:", error.message);
        res.status(500).send("An error occurred while fetching characters.");
    }
   
})










app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})