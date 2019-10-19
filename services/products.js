const {
  getByQuery,
  getById,
  getDescriptionById,
  getCategoryTreeInformation,
  getCurrencyInformation
} = require('../clients/mercadolibre.api.client');
const handleException = require('../services/exceptions');
const {
  mapQuerySearchResultToProductsResponse,
  mapProductInformationToProductResponse
} = require('../mappers/outgoing.mercadolibre.data');
const {
  author: { name, lastname }
} = require('../package.json');

/**
 *
 * @param {Object} req the incoming request.
 * @param {Object} res the outcoming response.
 */
const getAllProducts = async (req, res) => {
  const MAX_NUMBER_OF_REGISTRY = 4;
  try {
    let querySearchResultData = await getByQuery(req.query.q);
    if (
      querySearchResultData.results &&
      querySearchResultData.results.length > 0
    ) {
      querySearchResultData['results'] = querySearchResultData['results'].slice(
        0,
        MAX_NUMBER_OF_REGISTRY
      );
      const arrayCategories = await getCategoryTreeInformation(
        defineMostUsedCategoriesTreeNodeFromResults(
          querySearchResultData.results
        )
      );
      const currenciesInformation = await getCurrenciesInformationPerResults(
        querySearchResultData.results
      );
      const outGoingProductsResponse = mapQuerySearchResultToProductsResponse(
        querySearchResultData,
        arrayCategories,
        { name, lastname },
        currenciesInformation
      );
      fetchResponse(res, outGoingProductsResponse);
    } else {
      handleException(res, {
        status: 404,
        cause: `Articles not found for query: ` + req.query.q
      });
    }
  } catch (error) {
    handleException(res, {
      status: 500,
      cause: `An error occured getting query consult: ${error}`
    });
  }
};

/**
 *
 * @param {Object} req the incoming request.
 * @param {Object} res the outcoming response.
 */
const getProductInformation = async (req, res) => {
  if (req.params.id) {
    try {
      let productInfo = await getById(req.params.id);
      const productDescription = await getDescriptionById(req.params.id);
      const arrayCategories = await getCategoryTreeInformation(
        productInfo.category_id
      );
      const currencyInformation = await getCurrencyInformation(
        productInfo.currency_id
      );
      const productResponse = await mapProductInformationToProductResponse(
        productInfo,
        productDescription,
        currencyInformation,
        { name, lastname },
        arrayCategories
      );
      fetchResponse(res, productResponse);
    } catch (e) {
      handleException(res, {
        status: 500,
        cause: `Internal server error.`
      });
    }
  }
};

/**
 * @description fetcher in charge of build and send the response back.
 * @param {Response} res
 * @param {*} body
 */
const fetchResponse = (res, body) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(body));
  res.end();
};

/**
 * @description Based on a collection of results, defines which one is the most used
 * for breadcrumb
 * @param {Array<Object>} results
 */
const defineMostUsedCategoriesTreeNodeFromResults = results => {
  let obj = results.reduce((object, result) => {
    let newObject = object;
    newObject[result.category_id] = (object[result.category_id] || 0) + 1;
    return newObject;
  }, {});
  console.log(`The obj resultant is ${JSON.stringify(obj)}`);
  const higherKey = Object.keys(obj).reduce((a, b) =>
    obj[a].count > obj[b].count ? a : b
  );
  console.log(higherKey);
  return higherKey;
};

const getCurrencyDataFromClient = async currency_id =>
  await getCurrencyInformation(currency_id);
/**
 * Returns a decorated Array or Object with the currencyInformation
 * @param {Array, Object} elem
 */
const getCurrenciesInformationPerResults = async results => {
  return await Promise.all(
    results.map(item => getCurrencyDataFromClient(item.currency_id))
  );
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductInformation: getProductInformation
};
