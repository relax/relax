import actionTypes from 'actions';

import templateReducer, {defaultState} from '../template';

describe('Template Reducer', () => {
  describe('without parameters', () => {
    it('should return default state', () => {
      expect(templateReducer()).toEqual(defaultState);
    });
  });

  describe('when opening new template', () => {
    const action = {
      type: actionTypes.openNewTemplate
    };

    it('should return state with `opened: true`', () => {
      expect(templateReducer({}, action)).toMatchObject({opened: true});
    });
  });

  describe('when closing new template', () => {
    const action = {
      type: actionTypes.closeNewTemplate
    };

    it('should return state with `opened: false`', () => {
      expect(templateReducer({}, action)).toMatchObject({opened: false});
    });
  });

  describe("when changing template's title", () => {
    const action = {
      type: actionTypes.changeTemplateTitle,
      value: 'Rick and Morty'
    };

    it("should return state with action's value as title", () => {
      expect(templateReducer({}, action)).toMatchObject({title: action.value});
    });
  });

  describe('when marking the template as loading', () => {
    const action = {
      type: actionTypes.templateLoading
    };

    it('should return state with `loading: true`', () => {
      expect(templateReducer({}, action)).toMatchObject({loading: true});
    });
  });

  describe('when marking the template as successfull', () => {
    const action = {
      type: actionTypes.templateSuccess
    };

    it('should return state representative successfull template', () => {
      expect(
        templateReducer({}, action)
      ).toMatchObject({
        opened: false,
        title: '',
        loading: false
      });
    });
  });
});
