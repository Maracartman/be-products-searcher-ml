var assert = require('assert');
var scenarios = require('./resources/ml.query.map.scenario');
const {
  mapQuerySearchResultToProductsResponse
} = require('../mappers/outgoing.mercadolibre.data');
const categorySearchSample = require('./resources/dog.categories.search.sample.json');
var expect = require('chai').expect;

describe('Mapper test suite', () => {
  it('Should the expected mapped response match the API Ml Response', () => {
    const author = {
      name: 'Jhon',
      lastname: 'Doe'
    };
    scenarios.forEach(scenario => {
      const mapResult = mapQuerySearchResultToProductsResponse(
        scenario.testCase,
        categorySearchSample.path_from_root,
        author
      );
      expect(mapResult).to.eql(scenario.expected);
    });
  });
});
