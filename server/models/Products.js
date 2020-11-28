const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { productSchema } = require('../utils/validations/schemas/product');

const ProductSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String 
    },
},
  { timestamps: true }
);

ProductSchema.statics.productValidations = (data) => {
    return productSchema.validate(data);
};

module.exports = mongoose.model('Product', ProductSchema);
