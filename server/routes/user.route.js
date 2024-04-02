const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/user/userdata
router.get("/userdata", auth(), userController.getUserdata);

module.exports = router;
