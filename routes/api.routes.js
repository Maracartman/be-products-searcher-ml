const express = require('express');
let app = express();
const productsService = require('../services/products');
const handleException = require('../services/exceptions');

/**
 * Route definition for specific item ID searching
 */
app.get('/items/:id', (req, res) => {
  console.log(`Requesting information of item with id: ${req.params.id}`);
  productsService.getProductInformation(req, res);
});

/**
 * Route definition for query searching
 */
app.get('/items', async (req, res, next) => {
  if (req.params.id) next();
  else if (req.query.q) {
    console.log(
      `Requesting list of products matching query: ${
        req.query.q ? req.query.q : ''
      }`
    );
    productsService.getAllProducts(req, res);
  } else {
    handleException(res, {
      status: 400,
      cause: 'Query not found'
    });
  }
});

module.exports = app;
