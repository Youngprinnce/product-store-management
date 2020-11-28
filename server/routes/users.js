const express = require('express');
const router = express.Router();

//Required middlewares
const { signin, signup, adminSignup, signout } = require('../Controllers/userController');
const {checkLoggedIn} = require("../middlewares/auth")

module.exports = () => {
  router.post('/signup', signup);
  router.post('/admin/signup', adminSignup);
  router.put('/signin', signin);
  router.post("/signout", checkLoggedIn, signout)
  return router;
};
