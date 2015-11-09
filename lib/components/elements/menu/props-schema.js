import menusStore from '../../../client/stores/menus';
import {Types} from '../../../data-types';

export default [
  {
    label: 'Menu',
    type: Types.SelectEntry,
    id: 'menuId',
    props: {
      store: menusStore,
      property: '_id'
    }
  }
];
