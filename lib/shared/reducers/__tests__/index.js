import chai from 'chai';

import {reducersToCombine} from '../index';

const expect = chai.expect;

describe('Index Reducer', () => {
  it('should contain all reducers to combine', () => {
    expect(reducersToCombine).to.have.all.keys(
      'relateReducer',
      'adminMenu',
      'color',
      'display',
      'dnd',
      'fonts',
      'media',
      'menu',
      'pageBuilder',
      'schema',
      'schemaEntry',
      'settings',
      'styles',
      'stylesMap',
      'symbols',
      'router',
      'template',
      'user'
    );
  });
});
