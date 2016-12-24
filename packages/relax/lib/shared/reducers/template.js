import actionTypes from 'actions';

const defaultState = {
  opened: false,
  loading: false,
  title: ''
};

export default function templateReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.openNewTemplate:
      return Object.assign({}, state, {
        opened: true
      });
    case actionTypes.closeNewTemplate:
      return Object.assign({}, state, {
        opened: false
      });
    case actionTypes.changeTemplateTitle:
      return Object.assign({}, state, {
        title: action.value
      });
    case actionTypes.templateLoading:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.templateSuccess:
      return Object.assign({}, state, {
        opened: false,
        title: '',
        loading: false
      });
    default:
      return state;
  }
}
