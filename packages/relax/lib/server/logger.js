import winston from 'winston';
import config from '../../config';
import buildLoggerConfig from 'helpers/build-logger-config';

export default new winston.Logger(buildLoggerConfig(config.logger));
