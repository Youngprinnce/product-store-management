const chai = require('chai');
const { validUser, db, validProduct} = require('../helper');
const UserModel = require("../../models/User");
const ProductModel = require("../../models/Products")
const { expect } = chai;
const request = require("request");

db()
describe('The user controller and schema', async () => {
  it('should let you create a new user with valid data', async () => {
    request.post({url:"http://localhost:3000/api/signup", form:validUser}, async function (err, response, body) {
      expect(response.statusCode).to.equal(201);
      const foundUser = await UserModel.findOne({ email: validUser.email }).exec();
      UserModel.deleteOne({username:foundUser.username}).then((response => {
        expect(1).to.equal(1)
      }))
    })
  });

  it('should reject a too short username', async () => {
    request.post({ url: "http://localhost:3000/api/signup", form:{ username: 'ab', password: 'VerySecret1', email: 'foo@bar.com' } }, function (err, response, body) {expect(response.statusCode).to.equal(401);})
  });

  it('should reject a password that is not valid', async () => {
    request.post({ url: "http://localhost:3000/api/signup", form: { username: 'abc', password: 'verysec', email: 'foo@bar.com' } }, function (err, response, body) { expect(response.statusCode).to.equal(401); })
  });

  it('should reject an invalid email format', async () => {
  request.post({ url: "http://localhost:3000/api/signup", form: { username: 'abc', password: 'verysecret', email: 'foobar' } }, function (err, response, body) { expect(response.statusCode).to.equal(401); })
  });

  it('should find a user', async () => {
    const user = new UserModel(validUser);
    await user.save();
    const foundUser = await UserModel.findOne({ email: validUser.email }).exec();
    expect(foundUser.username).to.equal('frank');
    await UserModel.deleteOne({ _id: foundUser._id }).then((response => {
      expect(1).to.equal(1)
    }))
  });

  it('should store the password encrypted', async () => {
    const user = new UserModel(validUser);
    await user.save();
    const foundUser = await UserModel.findOne({ email: validUser.email }).exec();
    expect(foundUser.password).to.exist;
    expect(foundUser.password).to.not.equal(validUser.password);
    await UserModel.deleteOne({_id:foundUser._id}).then((response => {
      expect(1).to.equal(1)
    }))
  });
});

describe("The product controller", async () => {
  it("should let you add a product", async () => {
    const newProduct = await ProductModel.create(validProduct);
    expect(newProduct.name).to.equal("Samsung Galaxy Pro")
    await ProductModel.deleteOne({ _id: newProduct._id }).then((response => {
     expect(1).to.equal(1)
   }))
  });

  it('should let you get all product', async () => {
    request.get({ url: "http://localhost:3000/api/product"}, async function (err, response, body) {
      expect(response.statusCode).to.equal(200);
    })
  })

  it("should update a product", async () => {
    const newProduct = await ProductModel.create(validProduct);
    const updateProduct = await ProductModel.findOneAndUpdate({_id:newProduct._id}, {name:"Infinix hot pro"}, {new:true});
    expect(updateProduct.name).to.equal("Infinix hot pro")
    await ProductModel.deleteOne({ _id: updateProduct._id }).then((response => {
      expect(1).to.equal(1)
    }))
  });
})

