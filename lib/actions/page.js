import request from '../client/helpers/request';

export const actionTypes = {
  getPage: 'GET_PAGE',
  getPages: 'GET_PAGES',
  updatePage: 'UPDATE_PAGE'
};

export function getPage (slug) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPage,
      query: `
          query page ($slug: String!) {
            page (slug: $slug) {
              _id,
              title,
              slug,
              state,
              date,
              updatedDate,
              createdBy {
                _id,
                email,
                name
              },
              updatedBy {
                _id,
                email,
                name
              }
            }
          }
      `,
      variables: {
        slug
      }
    })
  );
}

export function getPages (data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPages,
      query: `
        query pages {
          pages {
            _id,
            title,
            slug,
            state,
            date
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function updatePage (data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updatePage,
      query: `
        mutation updatePage ($data: PageInput!) {
          updatePage (data: $data) {
            _id,
            title,
            slug,
            state,
            date,
            updatedDate,
            createdBy {
              _id,
              email,
              name
            },
            updatedBy {
              _id,
              email,
              name
            }
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
