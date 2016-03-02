import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

export function updateColor (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateColor,
      query: `
        mutation updateColor ($data: ColorInput!) {
          updateColor (data: $data) {
            ${fragmentToQL(fragments.color)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function addColor (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addColor,
      query: `
        mutation addColor ($data: ColorInput!) {
          addColor (data: $data) {
            ${fragmentToQL(fragments.color)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function duplicateColor (id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.graphql,
      query: `
        mutation duplicateColor ($id: ID!) {
          duplicateColor (id: $id) {
            _id
            label
            value
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}

export function removeColor (id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.graphql,
      query: `
        mutation removeColor ($id: ID!) {
          removeColor (id: $id) {
            _id
          }
        }
      `,
      variables: {
        id
      },
      params: {
        remove: true
      }
    })
  );
}
