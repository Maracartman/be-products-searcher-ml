const {
  getByQuery,
  getById,
  getDescriptionById,
  getCategoryTreeInformation
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
  try {
    const querySearchResultData = await getByQuery(req.query.q);
    if (
      querySearchResultData.results &&
      querySearchResultData.results.length > 0
    ) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      const arrayCategories = await getCategoryTreeInformation(
        querySearchResultData.results[0].category_id
      );
      const outGoingProductsResponse = mapQuerySearchResultToProductsResponse(
        querySearchResultData,
        arrayCategories,
        { name, lastname }
      );
      res.write(JSON.stringify(outGoingProductsResponse));
      res.end();
    } else {
      handleException(res, {
        status: 404,
        cause: `Articles not found for query: ` + req.query.q
      });
    }
  } catch (e) {
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
      const productInfo = await getById(req.params.id);
      const productDescription = await getDescriptionById(req.params.id);
      const productResponse = await mapProductInformationToProductResponse(
        productInfo,
        productDescription,
        { name, lastname }
      );

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(productResponse));
      res.end();
    } catch (e) {
      handleException(res, {
        status: 500,
        cause: `Internal server error.`
      });
    }
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductInformation: getProductInformation
};
