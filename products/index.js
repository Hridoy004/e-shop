const product = require('./products');
const asyncHandler = require('express-async-handler');

const products = (app) => {
    app.post('/api/products', asyncHandler(product.products));
    app.get('/api/products', asyncHandler(product.getProduct));
};

module.exports = products;