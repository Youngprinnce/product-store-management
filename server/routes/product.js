const express = require("express")
const router = express.Router();
const upload = require("../middlewares/upload")

//Required middlewares
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct } = require('../Controllers/productController');
const { checkLoggedIn, adminRole } = require('../middlewares/auth');


module.exports = () => {
  //Recommended
  // router.post('/', checkLoggedIn, upload.single("image"), createProduct);
  // router.get('/', checkLoggedIn, getProducts);

  //Test purpose
  router.post('/',  upload.single("image"), createProduct);
  router.get('/', getProducts);
  
  router.put('/:productId', checkLoggedIn, adminRole, upload.single("image"),  updateProduct);
  router.delete('/:productId', checkLoggedIn, adminRole,  deleteProduct);
  return router;
};
