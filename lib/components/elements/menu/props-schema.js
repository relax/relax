import {Types} from '../../../data-types';
import menusStore from '../../../client/stores/menus';

export default [
  {
    label: 'Menu',
    type: Types.SelectEntry,
    id: 'menu',
    props: {
      store: menusStore,
      property: '_id'
    }
  }
];
