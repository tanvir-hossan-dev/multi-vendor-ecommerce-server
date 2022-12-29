const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  req.body.userId = req.user._id;

  try {
    const { name, description, price, imagesUrl, category, stock } = req.body;

    if (!name || !description || !price || !imagesUrl || !category || !stock) {
      return res.status(404).json({ message: "Please fullfill your all input." });
    }
    const createProduct = new Product(req.body);
    await createProduct.save();
    return res.status(201).json({ message: "Product create successfull", createProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    console.log(product);
    return res.status(201).json({ message: "Product update Successful", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
