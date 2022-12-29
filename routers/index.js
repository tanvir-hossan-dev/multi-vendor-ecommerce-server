const router = require("express").Router();
const userRouter = require("./auth");
const productRouter = require("./product");

router.use("/api/v1/auth", userRouter);
router.use("/api/v1/product", productRouter);

module.exports = router;
