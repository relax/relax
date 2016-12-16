import checkSelectionReducer from '../check-selection';
import fragmentsFixtures from './_fixtures/fragments';
import {defaultState} from '../index';

describe('Page builder check selection', () => {
  describe('selected element', () => {
    it('calculates selected existent element info', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        selected: {
          id: '1',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      // selected element
      expect(newState.selectedElement).toBe(initState.fragments.draft.doc.data['1']);
      expect(newState.selectedElement).toEqual(initState.fragments.draft.doc.data['1']);

      // selected parent
      expect(newState.selectedParent).toEqual({
        id: '0',
        context: {
          doc: 'draft',
          property: 'data'
        }
      });

      // selected path
      expect(newState.selectedPath).toEqual([
        {
          id: 'body',
          tag: 'body',
          children: ['0']
        },
        {
          id: '0',
          parent: 'body',
          tag: 'Section',
          children: ['1']
        }
      ]);

      // selected is template
      expect(newState.selectedIsTemplate).toBeFalsy();

      // selected element links
      expect(newState.selectedLinks).toEqual([]);
    });

    it('calculates selected NON existent element info', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        selected: {
          id: 'none',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        selectedElement: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        },
        selectedParent: {},
        selectedPath: [1, 2],
        selectedLinks: [1, 2],
        selectedIsTemplate: true
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      expect(newState.selectedElement).toBeNull();
      expect(newState.selectedParent).toBeNull();
      expect(newState.selectedPath).toEqual([]);
      expect(newState.selectedLinks).toEqual([]);
      expect(newState.selectedIsTemplate).toBeFalsy();
    });

    it('does not allow selected elements when linking data', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        menuTab: 'link',
        selected: {
          id: '1',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        selectedElement: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        },
        selectedParent: {},
        selectedPath: [1, 2],
        selectedLinks: [1, 2],
        selectedIsTemplate: true
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      expect(newState.selectedElement).toBeNull();
      expect(newState.selectedParent).toBeNull();
      expect(newState.selectedPath).toEqual([]);
      expect(newState.selectedLinks).toEqual([]);
      expect(newState.selectedIsTemplate).toBeFalsy();
    });
  });

  describe('overed element', () => {
    it('does nothing if overed element exists', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        overed: {
          id: '1',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      expect(newState.overed).toBe(initState.overed);
    });

    it('sets to null if overed element does not exist', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        overed: {
          id: 'none',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      expect(newState.overed).toBeNull();
    });
  });

  describe('linking data element', () => {
    it('calculates linking data existent element info', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        linkingData: {
          id: '1',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      // selected element
      expect(newState.linkingDataElement).toBe(initState.fragments.draft.doc.data['1']);
      expect(newState.linkingDataElement).toEqual(initState.fragments.draft.doc.data['1']);
    });

    it('nulls linking data NON existent element info', () => {
      const initState = Object.assign({}, defaultState, {
        fragments: fragmentsFixtures.fragmentsMock,
        linkingData: {
          id: 'none',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        linkingDataElement: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        }
      });
      const newState = checkSelectionReducer(initState);

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(initState);

      expect(newState.linkingData).toBeNull();
      expect(newState.linkingDataElement).toBeNull();
    });
  });
});
