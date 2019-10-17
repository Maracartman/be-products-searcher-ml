const ProductsResponse = require('../models/ProductsResponse');
const Product = require('../models/Product');

/**
 *
 * @param {Object} mlResponse The Mercado Libre incoming response
 * @param {Object} categories An object of categories ordered.
 * @param {Object} author The service author.
 * @param {int} maxNumberOfResults the number of registries to be shown
 */
const mapQuerySearchResultToProductsResponse = (
  mlResponse,
  categories,
  author,
  maxNumberOfResults = 4
) => {
  let productsResponse = new ProductsResponse();
  productsResponse.setAuthor(author);
  productsResponse.setCategories(categories.map(catObj => catObj.name));
  productsResponse.setItems(
    mlResponse.results.slice(0, maxNumberOfResults).map(result => ({
      id: result.id,
      title: result.title.trim(),
      price: {
        amount: result.price,
        currency: result.currency_id,
        decimals: 0
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping['free_shipping']
    }))
  );
  return productsResponse;
};

/**
 *
 * @param {Object} productInfo The Mercado Libre incoming product information.
 * @param {String} productDescription The current product description.
 * @param {Object} author The service author.
 */
const mapProductInformationToProductResponse = (
  productInfo,
  productDescription,
  author
) => {
  const productResponse = new Product(author, {
    id: productInfo.id,
    title: productInfo.title,
    price: {
      currency: productInfo.currency_id,
      amount: productInfo.price,
      decimals: 0
    },
    picture: productInfo.pictures[0].secure_url || productInfo.secure_thumbnail,
    condition: productInfo.condition,
    free_shipping: productInfo.shipping.free_shiping,
    sold_quantity: productInfo.sold_quantity,
    description: productDescription
  });

  return productResponse;
};

module.exports = {
  mapQuerySearchResultToProductsResponse: mapQuerySearchResultToProductsResponse,
  mapProductInformationToProductResponse: mapProductInformationToProductResponse
};
