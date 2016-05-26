import actionTypes from 'actions';
import {getColorString} from 'helpers/colors';
import {mutation} from 'relate-js';

export function openNewColor () {
  return {
    type: actionTypes.openNewColor
  };
}

export function closeNewColor () {
  return {
    type: actionTypes.closeNewColor
  };
}

export function openEditColor (color) {
  return {
    type: actionTypes.openEditColor,
    color
  };
}

export function changeColorLabel (value) {
  return {
    type: actionTypes.changeColorProperty,
    property: 'label',
    value
  };
}

export function changeColorValue (value) {
  return {
    type: actionTypes.changeColorProperty,
    property: 'value',
    value
  };
}

export function updateColorFromState () {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.colorLoading
    });
    const state = getState().color;
    return mutation({
      fragments: {
        updateColor: {
          _id: 1,
          label: 1,
          value: 1
        }
      },
      variables: {
        updateColor: {
          data: {
            value: {
              _id: state.editingId,
              label: state.label,
              value: getColorString(state.value)
            },
            type: 'ColorInput!'
          }
        }
      }
    }, () => {
      // TODO error handling
      dispatch({
        type: actionTypes.colorSuccess
      });
    })(dispatch, getState);
  };
}

export function updateColor (data) {
  return mutation({
    fragments: {
      updateColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      updateColor: {
        data: {
          value: data,
          type: 'ColorInput!'
        }
      }
    }
  });
}

export function createColor () {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.colorLoading
    });
    const state = getState().color;
    return mutation({
      fragments: {
        addColor: {
          _id: 1,
          label: 1,
          value: 1
        }
      },
      variables: {
        addColor: {
          data: {
            value: {
              label: state.label,
              value: getColorString(state.value)
            },
            type: 'ColorInput!'
          }
        }
      }
    }, () => {
      // TODO error handling
      dispatch({
        type: actionTypes.colorSuccess
      });
    })(dispatch, getState);
  };
}

export function addColor (data) {
  return mutation({
    fragments: {
      addColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      addColor: {
        data: {
          value: data,
          type: 'ColorInput!'
        }
      }
    }
  });
}

export function duplicateColor (id) {
  return mutation({
    fragments: {
      duplicateColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      duplicateColor: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    }
  });
}

export function openRemoveColor (id) {
  return {
    type: actionTypes.openRemoveColor,
    id
  };
}

export function closeRemoveColor () {
  return {
    type: actionTypes.closeRemoveColor
  };
}

export function removeColor () {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.colorLoading
    });
    const state = getState().color;
    return mutation({
      fragments: {
        removeColor: {
          _id: 1
        }
      },
      variables: {
        removeColor: {
          id: {
            value: state.removeId,
            type: 'ID!'
          }
        }
      },
      type: 'REMOVE'
    }, () => {
      // TODO error handling
      dispatch({
        type: actionTypes.colorSuccess
      });
    })(dispatch, getState);
  };
}
