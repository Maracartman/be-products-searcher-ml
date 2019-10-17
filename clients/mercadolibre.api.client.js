const axios = require('axios');

/*TODO:  Externalize the api route host */

/**
 * @access public
 * @async true
 * @description Returns a list of products with matches the query search
 * @param {String} query the query to be searched.
 */
const getByQuery = async query => {
  const { data } = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(
      query
    )}`
  );
  return data;
};

/**
 * @access public
 * @async true
 * @description Return the category complete information.
 * @param {String} categoryId the category to get the information
 */
const getCategoryTreeInformation = async categoryId => {
  const {
    data: { path_from_root }
  } = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
  return path_from_root;
};

/**
 * @access public
 * @async true
 * @description Get a product information by the ID.
 * @param {String} id
 */
const getById = async id => {
  const { data } = await axios.get(`https://api.mercadolibre.com/items/${id}`);
  return data;
};

/**
 * @access public
 * @async true
 * @description Get a product description detailed by its id.
 * @param {String} id
 */
const getDescriptionById = async id => {
  const {
    data: { plain_text }
  } = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
  return plain_text;
};

module.exports = {
  getByQuery: getByQuery,
  getById: getById,
  getCategoryTreeInformation: getCategoryTreeInformation,
  getDescriptionById: getDescriptionById
};
