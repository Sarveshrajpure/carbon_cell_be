const express = require("express");
const animalDataController = require("../controllers/animaldata.controller");
const router = express.Router();

//api/animaldata/animalfacts

router.get("/animalfacts/:animal_type/:amount", animalDataController.getAnimalFacts);

module.exports = router;
