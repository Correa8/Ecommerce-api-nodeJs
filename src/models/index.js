const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

//Product -> categoryId
Product.belongsTo(Category); // categoryId
Category.hasMany(Product);
