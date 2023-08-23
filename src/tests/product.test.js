const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/Productimg");
require("../models");

const URL_BASE = "/api/v1/products";
const URL_BASE_USER = "/api/v1/users/login";
let TOKEN;
let product;
let category;
let productId;
let image;

beforeAll(async () => {
  const user = {
    email: "luis@gmail",
    password: "lui123",
  };

  const res = await request(app).post(URL_BASE_USER).send(user);

  TOKEN = res.body.token;

  const categoryBody = {
    name: "Naruto",
  };

  category = await Category.create(categoryBody);

  product = {
    title: "Personaje Kakashi",
    description: "Maestro de la aldea de la hoja",
    price: 300.0,
    categoryId: category.id,
  };
});

test("POST -> 'URL_BASE', should resturn status code 201 and res.body.title = product.title", async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("GET -> 'URL_BASE', should resturn status code 200 and res.body.legnth = 1", async () => {
  const res = await request(app).get(URL_BASE);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET -> 'URL_BASE?category=id', should resturn status code 200 and res.body.legnth = 1, res.body[0].category to be defined and  res.body[0].category.id", async () => {
  const res = await request(app).get(`${URL_BASE}?category=${category.id}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = product.title", async () => {
  const res = await request(app).get(`${URL_BASE}/${productId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("PUT -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = productUpdate.title", async () => {
  const productUpdate = {
    title: "Dragon Ball Z",
  };

  const res = await request(app)
    .put(`${URL_BASE}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(productUpdate.title);
});

test("POST -> 'URL_BASE/:id/images', should return status code 200 and res.body.length === 1 ", async () => {
  const imageBody = {
    url: "lorem",
    filename: "lorem",
  };

  image = await ProductImg.create(imageBody);

  const res = await request(app)
    .post(`${URL_BASE}/${productId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${TOKEN}`);

  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("DELET -> 'URL_BASE/:id', should resturn status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);

  await category.destroy();
  // await image.destroy();
});
