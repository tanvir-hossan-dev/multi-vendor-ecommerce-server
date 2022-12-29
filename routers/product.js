const { addProduct, updateProduct, deleteProduct, getProduct } = require("../controllers/Product");
const Authenticate = require("../middleware/Authenticate");

const router = require("express").Router();

router.put("/updateproduct/:id", Authenticate, updateProduct);
router.delete("/deleteproduct/:id", Authenticate, deleteProduct);
router.post("/addproduct", Authenticate, addProduct);
router.get("/getproduct", getProduct);

module.exports = router;
