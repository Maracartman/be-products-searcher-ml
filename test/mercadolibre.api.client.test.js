const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const sampleQueryResponse = require('./resources/dog.query.search.sample.json');
const sampleCategoryResponse = require('./resources/dog.categories.search.sample.json');
const sampleItemSearchResponse = require('./resources/dog.product.search.sample.json');
const sampleItemDetailsSearchResponse = require('./resources/dog.details.sample.json');
const currencyDetailsSearchResponse = require('./resources/currency.details.sample.json');

const mlApiClient = require('../clients/mercadolibre.api.client');
const mock = new MockAdapter(axios);
const expect = require('chai').expect;
const SUBJECT_TEST_CASE = {
  query: 'perro',
  category: 'MLA1073',
  item_id: 'MLA662503052',
  desc_item_id: 'MLA662503052',
  currency: 'ARS'
};
describe('MercadoLibre api client test suite', () => {
  mock.onGet(new RegExp('/search*')).reply(200, sampleQueryResponse);

  mock.onGet(new RegExp('/categories/*')).reply(200, sampleCategoryResponse);

  mock
    .onGet(new RegExp(/[^%]*\/items\/([A-Z0-9]+)$/))
    .reply(200, sampleItemSearchResponse);

  mock
    .onGet(new RegExp(/[^%]*\/items\/([A-Z0-9]+)(\/description)/))
    .reply(200, sampleItemDetailsSearchResponse);

  mock
    .onGet(new RegExp('/currencies/*'))
    .reply(200, currencyDetailsSearchResponse);

  it('ShouldgetByQueryReturnInmutableExpectedResponse', async () => {
    const response = await mlApiClient.getByQuery(SUBJECT_TEST_CASE.query);
    expect(response).to.eql(sampleQueryResponse);
  });

  it('ShouldgetByQueryReturnInmutableExpectedResponse', async () => {
    const response = await mlApiClient.getCategoryTreeInformation(
      SUBJECT_TEST_CASE.category
    );
    expect(response).to.eql(sampleCategoryResponse.path_from_root);
  });

  it('ShouldgetByIdReturnInmutableExpectedResponse', async () => {
    const response = await mlApiClient.getById(SUBJECT_TEST_CASE.item_id);
    expect(response).to.eql(sampleItemSearchResponse);
  });

  it('ShouldgetDescriptionByIdReturnInmutableExpectedResponse', async () => {
    const response = await mlApiClient.getDescriptionById(
      SUBJECT_TEST_CASE.desc_item_id
    );
    expect(response).to.eql(sampleItemDetailsSearchResponse.plain_text);
  });

  it('ShouldgetCurrencyInformationReturnInmutableExpectedResponse', async () => {
    const response = await mlApiClient.getCurrencyInformation(
      SUBJECT_TEST_CASE.currency
    );
    const { decimal_places, symbol } = currencyDetailsSearchResponse;
    expect(response).to.eql({ decimal_places, symbol });
  });
});
