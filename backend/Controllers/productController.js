const Product = require("../models/Products")
const slugify = require("slugify")
const shortid = require("shortid")
const { sendSuccess, sendError } = require('../utils/responseHandler');

// Add new product
const createProduct = async (req, res) => {
  const { error, value } = await Product.productValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message, 401)
  }
  let image;
  const { name, price, description } = value;

  const productObject = {
    name,
    slug: `${slugify(name)}-${shortid.generate()}`,
    description,
    price
  }

  if (req.file) {
    image = req.file.filename
    productObject.image = image
  }

  const product = new Product(productObject);
  await product.save((error, product) => {
    if (error) sendError(res,error, 400);
    return sendSuccess(res,product, 201)
  });
}

//Get all products
const getProducts = async (req, res) => {
  await Product.find().exec((error, product) => {
    if (error) {
      return sendError(res, error, 400)
    } else {
      return sendSuccess(res, product,200)
    }
  });
}

//Update a product
const updateProduct = async (req, res) => {
  const { name } = req.body
  if (name) {
    req.body.slug = `${slugify(name)}-${shortid.generate()}`
  }
  if (req.file) {
    req.body.image = req.file.filename
  }
  await Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true, useFindAndModify: false }, (error, product) => {
      if (error) sendError(res,error, 400)
      return sendSuccess(res, product, 200)
  });
}

//Delete a Product
const deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.productId },(error, product) => {
    if (error) return sendError(res,error, 400);
    return sendSuccess(res, {}, 200)
  });
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
}