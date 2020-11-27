const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { loginSchema, registrationSchema } = require('../utils/validations/schemas/user');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength:3
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default:"user"
  },
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
  try {
    const saltRound = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, saltRound);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password);
};

UserSchema.statics.loginValidations = (data) => {
  return loginSchema.validate(data);
};

UserSchema.statics.regValidations = (data) => {
  return registrationSchema.validate(data);
};

module.exports = mongoose.model('User', UserSchema);
