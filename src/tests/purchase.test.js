const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

const URL_BASE_USERS = "/api/v1/users";
const URL_BASE = "/api/v1/cart";

let TOKEN;
let userId;
let productBody;
let product;

beforeAll(async () => {
  //INICIO de sesion
  const user = {
    email: "lui@gmail",
    password: "lui1234567",
  };
  const res = await request(app).post(`${URL_BASE_USERS}/login`).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;

  productBody = {
    title: "productTest",
    description: "test Node js",
    price: 23,
  };

  product = await Product.create(productBody);

  //CART
  const bodyCart = {
    quantity: 1,
    productId: product.id,
  };
});
