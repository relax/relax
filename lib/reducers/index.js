import {combineReducers} from 'redux';

import admin from './admin';
import page from './page';

const rootReducer = combineReducers({
  admin,
  page
});

export default rootReducer;
