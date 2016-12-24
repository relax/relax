import winston from 'winston';
import {forEach, isFunction} from 'lodash';

export default function buildLoggerConfig (config) {
  const loggerConfig = Object.assign({}, config);
  loggerConfig.transports = [];
  forEach(config.transports, (transport, key) => {
    if (isFunction(winston.transports[key])) {
      loggerConfig.transports.push(new winston.transports[key](transport));
    }
  });
  return loggerConfig;
}
