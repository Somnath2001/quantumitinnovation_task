var express = require("express");
const { isSignedIn } = require("../controller/auth");
var router = express.Router();
const { Data } = require("../controller/data");

router.get("/data", isSignedIn, Data);

module.exports = router;
