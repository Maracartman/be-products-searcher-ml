const {
  getByQuery,
  getById,
  getCategoryTreeInformation
} = require('../clients/mercadolibre.api.client');
const handleException = require('../services/exceptions');
const {
  mapQuerySearchResponseToApiResponse
} = require('../mappers/outgoing.mercadolibre.data');
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
      const outGoingProductsResponse = mapQuerySearchResponseToApiResponse(
        querySearchResultData,
        arrayCategories
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

module.exports = {
  getAllProducts: getAllProducts
};
