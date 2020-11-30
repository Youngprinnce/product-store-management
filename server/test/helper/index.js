const UserModel = require("../../models/User");
const mongoose = require('mongoose');
const dsn = "mongodb://localhost:27017/veegil";


const validUser = {
  username: 'Frank',
  email: '123@frank.com',
  password: 'Verysecret1',
};

const validProduct = {
  name: 'Samsung Galaxy Pro',
  slug:"Samsung-Galaxy-Pro",
  price: 100,
  description:"Good mobile with great reliabilty",
  image: 'samsung.jpg',
};


const db = async () => {
  await mongoose.connect(dsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

// const before = async () => {
//   await UserModel.deleteMany({}).exec()
// }

// const after = async () => {
//   await UserModel.deleteMany({}).exec()
// };

module.exports = {
  validUser,
  validProduct,
  // before,
  // after,
  db
  }
