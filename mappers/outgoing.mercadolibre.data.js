const {
  author: { name, lastname }
} = require('../package.json');

const mapQuerySearchResponseToApiResponse = (
  mlResponse,
  categories = '',
  maxNumberOfResults = 4
) => ({
  author: {
    name: name,
    lastname: lastname
  },
  categories: categories.map(catObj => catObj.name),
  items: mlResponse.results.slice(0, maxNumberOfResults).map(result => ({
    id: result.id,
    title: result.title.trim(),
    price: { price: result.price, currency: result.currency_id, decimals: 0 },
    picture: result.thumbnail,
    condition: result.condition,
    free_shipping: result.shipping['free_shipping']
  }))
});

module.exports = {
  mapQuerySearchResponseToApiResponse: mapQuerySearchResponseToApiResponse
};
