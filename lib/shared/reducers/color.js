import actionTypes from 'actions';

const defaultState = {
  opened: false,
  removeOpened: false,
  removeId: null,
  loading: false,
  editing: false,
  editingId: null,
  label: '',
  value: '#000000'
};

export default function colorReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.openNewColor:
      return Object.assign({}, state, {
        opened: true
      });
    case actionTypes.closeNewColor:
      return Object.assign({}, state, {
        opened: false,
        editing: false,
        label: '',
        value: '#000000'
      });
    case actionTypes.openEditColor:
      return Object.assign({}, state, {
        opened: true,
        editing: true,
        editingId: action.color._id,
        label: action.color.label,
        value: {
          type: 'hex',
          value: action.color.value,
          opacity: 100
        }
      });
    case actionTypes.changeColorProperty:
      return Object.assign({}, state, {
        [action.property]: action.value
      });
    case actionTypes.colorLoading:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.colorSuccess:
      return Object.assign({}, defaultState);
    case actionTypes.openRemoveColor:
      return Object.assign({}, state, {
        removeOpened: true,
        removeId: action.id
      });
    case actionTypes.closeRemoveColor:
      return Object.assign({}, state, {
        removeOpened: false,
        removeId: null
      });
    default:
      return state;
  }
}
