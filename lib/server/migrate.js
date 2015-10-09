import {readdirSync} from 'fs';
import {basename, extname, join} from 'path';
import Q from 'q';
import semver from 'semver';
import logger from '../logger';
import MigrationModel from './models/migration';

const migrationsPath = join(__dirname, '../../migrations');

function runMigration (path) {
  const migration = require(join(migrationsPath, path));
  return migration()
    .then(() => saveMigration(path))
    .then(() => logger.info(`migration ${path} was applied`));
}

function saveMigration (path) {
  return new MigrationModel({_id: path}).save();
}

export default function migrate () {
  return Q()
    .then(() => {
      var promise = Q();

      readdirSync(migrationsPath)
        .map((path) => extname(path) === '.js' ? basename(path) : false)
        .filter((path) => path && semver.valid(path.split('-')[0]))
        .sort((a, b) => semver.compare(a.split('-')[0], b.split('-')[0]))
        .forEach((path) => {
          promise = promise
            .then(() => MigrationModel.findOne({_id: path}).exec())
            .then((migration) => !migration && runMigration(path));
        });

        return promise;
    });
}
