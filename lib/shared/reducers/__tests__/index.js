import {reducersToCombine} from '../index';

describe('Index Reducer', () => {
  it('should contain all reducers to combine', () => {
    expect(Object.keys(reducersToCombine)).toEqual([
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
    ]);
  });
});
