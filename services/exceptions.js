const constructConfigurations = config => ({
  status: config.status || 500,
  cause: config.cause || 'An unexpected error has occured',
  headers: config.headers || {
    'Content-Type': 'application/json'
  }
});

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
