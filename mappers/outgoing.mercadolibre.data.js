const ProductsResponse = require('../models/ProductsResponse');
const Product = require('../models/Product');
const ProductItem2 = require('../models/ProductItem');

/**
 *
 * @param {Object} mlResponse The Mercado Libre incoming response
 * @param {Object} categories An object of the most used categories ordered tree.
 * @param {Object} author The service author.
 * @param {int} maxNumberOfResults the number of registries to be shown
 */
const mapQuerySearchResultToProductsResponse = (
  mlResponse,
  categories,
  author,
  currenciesInformation
) => {
  let productsResponse = new ProductsResponse();
  productsResponse.setAuthor(author);
  productsResponse.setCategories(categories.map(catObj => catObj.name));
  productsResponse.setItems(
    mlResponse.results.map((result, index) => ({
      id: result.id,
      title: result.title.trim(),
      price: {
        amount: result.price,
        currency: result.currency_id,
        currency_symbol: currenciesInformation[index].symbol,
        decimals: currenciesInformation[index].decimal_places
      },
      picture: result.thumbnail,
      condition: MAP_OF_TRANSALTIONS[result.condition],
      free_shipping: result.shipping['free_shipping'],
      seller_city: result.seller_address.city.name
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
  currencyInformation,
  author,
  categories
) => {
  const ProductItem = new ProductItem2(
    productInfo.id,
    productInfo.title,
    {
      currency: productInfo.currency_id,
      currency_symbol: currencyInformation.symbol,
      decimals: currencyInformation.decimal_places,
      amount: productInfo.price
    },
    productInfo.pictures[0].secure_url || productInfo.secure_thumbnail,
    MAP_OF_TRANSALTIONS[productInfo.condition],
    productInfo.shipping.free_shipping,
    productInfo.sold_quantity,
    productDescription,
    categories.map(category => category.name)
  );
  const productResponse = new Product(author, ProductItem);

  return productResponse;
};

const MAP_OF_TRANSALTIONS = {
  new: 'Nuevo',
  used: 'Usado',
  not_specified: 'No especificado'
};

module.exports = {
  mapQuerySearchResultToProductsResponse: mapQuerySearchResultToProductsResponse,
  mapProductInformationToProductResponse: mapProductInformationToProductResponse
};
