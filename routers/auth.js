const { userLogin, userRegister } = require("../controllers/Auth");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
