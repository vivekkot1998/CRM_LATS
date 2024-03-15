const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");


router.route("/").get(authcontrollers.home);
router.route("/login").post(authcontrollers.login);

module.exports = router;