var assert = require('assert');
var scenarios = require('./resources/ml.query.map.scenario');
const {
  mapQuerySearchResultToProductsResponse,
  mapProductInformationToProductResponse
} = require('../mappers/outgoing.mercadolibre.data');
const categorySearchSample = require('./resources/dog.categories.search.sample.json');
const expect = require('chai').expect;

const productIdSearchSample = require('./resources/dog.product.search.sample.json');
const detailsSearchSample = require('./resources/dog.details.sample.json');
const currencySearchSample = require('./resources/currency.details.sample.json');
const categoriesSearchSample = require('./resources/dog.categories.search.sample.json');
const productDetailsResponseSample = require('./resources/product.details.output.response.json');
describe('Mapper test suite', () => {
  const author = {
    name: 'Jhon',
    lastname: 'Doe'
  };
  it('Should the expected mapped response match the API Ml Response', () => {
    scenarios.forEach(scenario => {
      const mapResult = mapQuerySearchResultToProductsResponse(
        scenario.testCase,
        categorySearchSample.path_from_root,
        author,
        scenario.withCurrencyInfo
      );
      expect(mapResult).to.eql(scenario.expected);
    });
  });

  it('ShouldMapProductInformationToProductResponseReturnsTheExpectedObject', () => {
    const mappedProductInformationToResponseSample = mapProductInformationToProductResponse(
      productIdSearchSample,
      detailsSearchSample.plain_text,
      currencySearchSample,
      author,
      categoriesSearchSample.path_from_root
    );
    expect(mappedProductInformationToResponseSample).to.eql(productDetailsResponseSample);
  });
});
