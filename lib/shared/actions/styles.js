import actionTypes from 'actions';
import {mutation} from 'relate-js';

export function saveStyle (data, cb) {
  return (dispatch, getState) => (
    mutation({
      fragments: {
        addStyle: {
          _id: 1,
          title: 1,
          options: 1,
          displayOptions: 1
        }
      },
      variables: {
        addStyle: {
          data: {
            value: data,
            type: 'StyleInput!'
          }
        }
      }
    }, (result) => {
      const style = result.addStyle;

      if (style) {
        dispatch({
          type: actionTypes.saveStyle,
          style
        });
        cb && cb(style);
      }
    })(dispatch, getState)
  );
}

export function changeStyleProp (styleId, property, value) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.changeStyleProp,
      styleId,
      property,
      value,
      display
    });
  };
}

export function updateStyle (id, data) {
  return (dispatch, getState) => (
    mutation({
      fragments: {
        updateStyle: {
          _id: 1,
          title: 1,
          options: 1,
          displayOptions: 1
        }
      },
      variables: {
        updateStyle: {
          id: {
            value: id,
            type: 'ID!'
          },
          data: {
            value: data,
            type: 'StyleInput!'
          }
        }
      }
    }, (result) => {
      const style = result.updateStyle;

      if (style) {
        // success
        dispatch({
          type: actionTypes.updateStyle,
          style
        });
      }

      return style;
    })(dispatch, getState)
  );
}

export function removeStyle (styleId) {
  return (dispatch, getState) => (
    mutation({
      fragments: {
        removeStyle: {
          _id: 1
        }
      },
      variables: {
        removeStyle: {
          id: {
            value: styleId,
            type: 'ID!'
          }
        }
      }
    }, (result) => {
      dispatch({
        type: actionTypes.removeStyle,
        style: result.removeStyle
      });
    })(dispatch, getState)
  );
}
