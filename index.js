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
        const characterIds = [10, 11, 12, 13, 17, 24, 20, 21, 22, 30, 34, 41]
        const responses = await Promise.all(
            characterIds.map((id) => axios.get(`${base}/character/${id}`))
        );
        const specificCharacters =  responses.map((response) => response.data);
        console.log(specificCharacters);

        specificCharacters.forEach((character) => {
            console.log(`Character: ${character.name}, Image: ${character.image}`);
        });

        specificCharacters.forEach((character) => {
            if (character.image.includes("scale-to-width-down")) {
                character.image = character.image.split("/revision")[0];
            }
        });
        
        res.render("index.ejs", { characters: specificCharacters });
    } catch (error) {
        console.error("Error fetching characters:", error.message);
        res.status(500).send("An error occurred while fetching characters.");
    }
})

app.get("/characters", async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.render("characters.ejs", { characters: [] , searchPerformed: false}); 
    }

    try {
        const response = await axios.get(`${base}/character`);
        const characters = response.data;

        const filteredCharacters = characters.filter((character) =>
            character.name.toLowerCase().includes(name.toLowerCase())
        );

        filteredCharacters.forEach((character) => {
            if (character.image.includes("scale-to-width-down")) {
                character.image = character.image.split("/revision")[0];
            }
        });

        res.render("characters.ejs", { characters: filteredCharacters , searchPerformed: true});  
    } catch (error) {
        console.error("Error fetching characters:", error.message);
        res.status(500).send("An error occurred while fetching characters.");
    }
    
})

app.get("/species", async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.render("species.ejs", { species: [] , searchPerformed: false}); 
    }

    try {
        const response = await axios.get(`${base}/species`);
        const species = response.data;

        const filteredSpecies = species.filter((s) =>
            s.name.toLowerCase().includes(name.toLowerCase())
        );

        filteredSpecies.forEach((s) => {
            if (s.image.includes("scale-to-width-down")) {
                s.image = s.image.split("/revision")[0];
            }

            s.placeOfOrigin = s.placeOfOrigin || s.planetOfOrigin || { name: "Unknown" };
        });


        res.render("species.ejs", { species: filteredSpecies , searchPerformed: true});  
    } catch (error) {
        console.error("Error fetching species:", error.message);
        res.status(500).send("An error occurred while fetching species.");
    }
    
})

app.get("/locations", async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.render("locations.ejs", { locations: [] , searchPerformed: false}); 
    }

    try {
        const response = await axios.get(`${base}/location`);
        const locations = response.data;

        const filteredLocations = locations.filter((location) =>
            location.name.toLowerCase().includes(name.toLowerCase())
        );

        filteredLocations.forEach((location) => {
            if (location.image.includes("scale-to-width-down")) {
                location.image = location.image.split("/revision")[0];
            }
        });


        res.render("locations.ejs", { locations: filteredLocations , searchPerformed: true});  
    } catch (error) {
        console.error("Error fetching locations:", error.message);
        res.status(500).send("An error occurred while fetching locations.");
    }
    
})






app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})