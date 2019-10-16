/**
 * @description Construct a default config whenever the config is not coming.
 * @param {Object} config
 */
const constructConfigurations = config => ({
  status: config.status || 500,
  cause: config.cause || 'An unexpected error has occured',
  headers: config.headers || {
    'Content-Type': 'application/json'
  }
});

/**
 * @description handle the response constructing, logging and responsing.
 * @param {Object} res the response to be fallback.
 * @param {Object} responseConfigurations the configurations.
 */
const handleException = (res, responseConfigurations) => {
  const enhancedConfigurations = constructConfigurations(
    responseConfigurations
  );
  console.log(enhancedConfigurations.cause);
  res.writeHead(enhancedConfigurations.status, enhancedConfigurations.headers);
  res.write(
    JSON.stringify({
      cause: enhancedConfigurations.cause,
      status: enhancedConfigurations.status
    })
  );
  res.end();
};

module.exports = handleException;
