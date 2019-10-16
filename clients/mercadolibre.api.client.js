const axios = require('axios');

const getByQuery = async query => {
  const { data } = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(
      query
    )}`
  );
  return data;
};

const getCategoryTreeInformation = async categoryId => {
  const { data: { path_from_root } } = await axios.get(
    `https://api.mercadolibre.com/categories/${categoryId}`
  );
  return path_from_root;
};

const getById = id => {};

module.exports = {
  getByQuery: getByQuery,
  getById: getById,
  getCategoryTreeInformation: getCategoryTreeInformation
};
