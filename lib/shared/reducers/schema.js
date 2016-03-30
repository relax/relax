import actionTypes from 'actions';

const defaultState = {
  step: 0,
  data: {}
};

export default function schemaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changeSchemaType:
      return Object.assign({}, state, {
        step: 1,
        data: Object.assign({}, state.data, {type: action.schemaType})
      });
    case actionTypes.changeSchemaTitle:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {title: action.title})
      });
    case actionTypes.schemaStepBack:
      return Object.assign({}, state, {
        step: state.step - 1
      });
    default:
      return state;
  }
}
