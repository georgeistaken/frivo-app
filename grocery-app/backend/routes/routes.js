const express = require("express");  // Importing tool 'Express'
const router = express.Router();  // router obj to handle routes to organise endpoints

// Importing the functions from the controller.js file
const { getProducts, getOrders, addToCart, placeOrder, updateStock, createProduct } = require('../controllers/controller');

// Get products from the database
router.get('/products', getProducts);

// Get orders from the database
router.get('/orders', getOrders);

// Add an item to cart
router.post('/cart', addToCart);

// Placing an order
router.post('/order', placeOrder);

// Updating stock count
router.patch('/products/:id', updateStock);

// Used to create a new product and add it to the database
router.post('/products', createProduct);

// Makes router available to be used by other files such as server.js
module.exports = router;