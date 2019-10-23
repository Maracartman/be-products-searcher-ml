const winston = require('winston');

const commander = require('commander');

console.log(process.argv);
commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --production', 'Production environment')
  .option('-d, --development', 'Development environment')
  .parse(process.argv);
//Loggin configurations

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
if (commander.development) {
  console.log('Stablishing development loggin configurations');
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

if (commander.production && !commander.development) {
  console.log('Stablishing production loggin configurations');
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

const logRequest = (req, res, next) => {
  logger.info(req.url);
  next();
};

const logError = (err, req, res, next) => {
  logger.error(err);
  next();
};

module.exports = {
  logRequest: logRequest,
  logError: logError
};
