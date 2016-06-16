import Promise from 'bluebird';
import semver from 'semver';
import {readdirSync} from 'fs';
import {basename, extname, join} from 'path';

import logger from './logger';
import MigrationModel from './models/migration';

const migrationsPath = './migrations';

function saveMigration (path) {
  return new MigrationModel({_id: path}).save();
}

function runMigration (path) {
  const migration = require(join(migrationsPath, path));
  return migration()
    .then(() => saveMigration(path))
    .then(() => logger.info(`migration ${path} was applied`));
}

export default function migrate () {
  const files = readdirSync(migrationsPath)
    .map((path) => (extname(path) === '.js' ? basename(path) : false))
    .filter((path) => path && semver.valid(path.split('-')[0]))
    .sort((a, b) => semver.compare(a.split('-')[0], b.split('-')[0]));

  return Promise
    .each(files, path =>
      MigrationModel
        .findOne({_id: path})
        .then(migration => !migration && runMigration(path))
    );
}
