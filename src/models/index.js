const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

//Product -> categoryId
Product.belongsTo(Category); // categoryId
Category.hasMany(Product);

//Cart -> userId
Cart.belongsTo(User);
User.hasMany(Cart);

//Cart -> productId
Cart.belongsTo(Product);
Product.hasMany(Cart);
