const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const { login, me } = require("../controllers/auth.controller");

router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
