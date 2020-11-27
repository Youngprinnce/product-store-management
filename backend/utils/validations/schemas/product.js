const joi = require('joi');

const productSchema = joi.object().keys({
    name: joi.string().required().label('Product Name'),
    price: joi.number().required().label('Product Price'),
    description: joi.string().required().label("Product Description"),
})

module.exports = {
    productSchema,
};
