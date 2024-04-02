const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const animalDataRoute = require("./animaldata.route");

router.use("/auth", authRoute);
router.use("/userdata", userRoute);
router.use("/animaldata", animalDataRoute);

module.exports = router;
