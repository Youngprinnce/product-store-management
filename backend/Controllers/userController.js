const jwt = require("jsonwebtoken")
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');

//User Signup
const signup = async (req, res) => {
  const { error, value } = await User.regValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message, 401);
  }

  const { email } = value;
  
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    const message = 'Email already exist, try another one';
    return sendError(res, message, 401);
  }

  const user = new User({ ...value});
  const newUser = await user.save();
  if (!newUser) {
    const message = 'Error! Try again';
    return sendError(res, message, 400);
  }
  return sendSuccess(res, {}, 201)
};

//Admin Signup
const adminSignup = async (req, res) => {
  const { error, value } = await User.regValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message, 401);
  }

  const { email } = value;

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    const message = 'Email already exist, try another one';
    return sendError(res, message, 401);
  }

  const user = new User({ ...value, role:"admin" });
  const newUser = await user.save();
  if (!newUser) {
    const message = 'Error! Try again';
    return sendError(res, message, 400);
  }
  return sendSuccess(res, {}, 201)
};

//User and Admin Login
const signin = async (req, res) => {
  // VALIDATE USER BEFORE SAVE
  const { error, value } = await User.loginValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message, 401);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });
  if (!user) {
    const message = 'Email not found';
    return sendError(res, message, 401);
  }

  const validPass = await user.comparePassword(password);
  if (!validPass) {
    const message = 'Invalid password';
    return sendError(res, message, 401);
  }

  const token = jwt.sign({ user }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
   res.cookie("token", token, { expiresIn: "1d" })
   return sendSuccess(res, { token, user }, 200)
}

//Logout
const signout = (req, res) => {
  res.clearCookie("token");
  return sendSuccess(res, {}, 200)
}

module.exports = {
  signup,
  adminSignup,
  signin,
  signout
};
