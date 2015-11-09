import forEach from 'lodash.foreach';
import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeTab (fragments, _id, active) {
  return (dispatch, getState) => {
    const tabs = getState().tabs.data;

    return request({
      dispatch,
      type: actionTypes.removeTab,
      query: `
        mutation removeTab ($id: String!) {
          removeTab (id: $id) {
            ${fragmentToQL(fragments.tab)}
          }
        }
      `,
      variables: {
        id: _id._id
      }
    }).then(() => {
      if (active) {
        let url = '/admin';
        if (tabs.length > 1) {
          let tab = false;
          forEach(tabs, (tabIt) => {
            if (tabIt._id._id === _id._id) {
              return false;
            }
            tab = tabIt;
          });
          if (tab === false) {
            tab = tabs[1];
          }
          // navigate to 'tab'
          if (tab.page) {
            url = '/admin/page/' + tab.page._id;
          } else if (tab.userSchema) {
            url = '/admin/schemas/' + tab.userSchema._id + '/template';
          } else if (tab.schemaEntry) {
            url = '/admin/schema/' + tab.schemaEntry.schemaSlug + '/' + tab.schemaEntry._id + '/single';
          }
        }
        dispatch(pushState(null, url));
      }
    });
  };
}
