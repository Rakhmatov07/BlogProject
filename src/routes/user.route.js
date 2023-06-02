const { Router } = require("express");
const { register, logIn } = require("../controllers/user.controller");
const router = Router();

router.post("/register", register);
router.post("/login", logIn);

module.exports = router;
