const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    cost: String,
    price: String
})

const ProductModel = mongoose.model("products", ProductSchema)
module.exports = ProductModel