import actionTypes from 'actions';
import forEach from 'lodash.foreach';
import getElement from 'helpers/get-element';
import getSchemaLinkActions from 'helpers/schema-link-actions';
import merge from 'lodash.merge';
import {updateDraft, saveDraft, dropDraft} from 'actions/draft';
import {saveStyle, updateStyle} from 'actions/styles';
import {updateSymbol} from 'actions/symbol';
import {mutation} from 'relate-js';

let successTimeout = null;

export function autosave () {
  return (dispatch) => {
    clearTimeout(successTimeout);
    dispatch(changeState('loading', 'Saving draft'));

    dispatch(updateDraft())
      .then(() => {
        dispatch(changeState('success', 'Autosave successful'));
        successTimeout = setTimeout(() => {dispatch(changeState(null, ''));}, 2000);
      })
      .catch(() => {
        dispatch(changeState('error', 'Error auto saving draft'));
      });
  };
}

export function save () {
  return (dispatch) => {
    clearTimeout(successTimeout);
    dispatch(changeState('loading', 'Saving page'));

    dispatch(saveDraft())
      .then(() => {
        dispatch(changeState('success', 'Page saved successfuly'));
        successTimeout = setTimeout(() => {dispatch(changeState(null, ''));}, 2000);
      })
      .catch(() => {
        dispatch(changeState('error', 'Error saving page'));
      });
  };
}

export function drop () {
  return (dispatch) => {
    clearTimeout(successTimeout);
    dispatch(changeState('loading', 'Dropping draft'));

    dispatch(dropDraft())
      .then(() => {
        dispatch(changeState('success', 'Draft dropped successfuly'));
        successTimeout = setTimeout(() => {dispatch(changeState(null, ''));}, 2000);
      })
      .catch(() => {
        dispatch(changeState('error', 'Error dropping draft'));
      });
  };
}

export function changeState (state, message) {
  return {
    type: actionTypes.pbChangeState,
    state,
    message
  };
}

export function toggleEditing () {
  return {
    type: actionTypes.pbToggleEditing
  };
}

export function setMenuOpened (value) {
  return {
    type: actionTypes.pbSetMenuOpened,
    value
  };
}

export function setMenuSide (value) {
  return {
    type: actionTypes.pbSetMenuSide,
    value
  };
}

export function setMenuTab (value) {
  return {
    type: actionTypes.pbSetMenuTab,
    value
  };
}

export function openElementsMenu (options) {
  return {
    type: actionTypes.pbOpenElementsMenu,
    options
  };
}

export function closeElementsMenu () {
  return {
    type: actionTypes.pbCloseElementsMenu
  };
}

export function toggleCategory (category) {
  return {
    type: actionTypes.pbToggleCategory,
    category
  };
}

export function toggleExpandElement (elementId, context) {
  return {
    type: actionTypes.pbToggleExpandElement,
    elementId,
    context
  };
}

export function collapseAll () {
  return {
    type: actionTypes.pbCollapseAll
  };
}

export function expandAll () {
  return {
    type: actionTypes.pbExpandAll
  };
}

export function overElement (elementId, context) {
  return {
    type: actionTypes.pbOverElement,
    elementId,
    context
  };
}

export function outElement (elementId, context) {
  return {
    type: actionTypes.pbOutElement,
    elementId,
    context
  };
}

export function selectElement (elementId, context) {
  return {
    type: actionTypes.pbSelectElement,
    elementId,
    context
  };
}

export function duplicateElement (elementId, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'duplicate',
      elementId,
      context
    }
  };
}

export function removeElement (elementId, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'remove',
      elementId,
      context
    }
  };
}

export function removeSelectedElement () {
  return (dispatch, getState) => {
    const selected = getState().pageBuilder.selected;

    if (selected) {
      dispatch(removeElement(selected.id, selected.context));
    }
  };
}

export function changeElementAnimation (elementId, property, value, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeAnimation',
      elementId,
      property,
      value,
      context
    }
  };
}

export function changeElementLabel (elementId, value, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeLabel',
      elementId,
      value,
      context
    }
  };
}

export function changeElementStyle (elementId, value, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeStyle',
      elementId,
      value,
      context
    }
  };
}

export function changeElementStyleProp (elementId, property, value, context) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.pbDoAction,
      action: {
        type: 'changeStyleProp',
        elementId,
        property,
        value,
        display,
        context
      }
    });
  };
}

export function saveSelectedElementStyleChanges (style) {
  return (dispatch, getState) => {
    const {pageBuilder} = getState();
    const {selected, selectedElement} = pageBuilder;

    const styleProps = Object.assign({}, style.options, selectedElement.styleProps);
    const displayStyleProps = merge({}, style.displayOptions, selectedElement.displayStyleProps);

    // Strip nulls
    forEach(displayStyleProps, (displayValues, display) => {
      forEach(displayValues, (val, key) => {
        if (val === null) {
          delete displayStyleProps[display][key];
        }
      });
    });

    dispatch(updateStyle(
      style._id,
      {
        options: styleProps,
        displayOptions: displayStyleProps
      }
    )).then(() => {
      dispatch({
        type: actionTypes.doActionNoHistory,
        action: {
          type: 'changeStyle',
          elementId: selected.id,
          value: style._id,
          context: selected.context
        }
      });
    });
  };
}

export function createStyleFromSelectedElement (title, fromStyle) {
  return (dispatch, getState) => {
    const {pageBuilder} = getState();
    const {selected, selectedElement, elements} = pageBuilder;

    const ElementClass = elements[selectedElement.tag];

    const options = merge({}, fromStyle && fromStyle.options, selectedElement.styleProps);
    const displayOptions = merge({}, fromStyle && fromStyle.displayOptions, selectedElement.displayStyleProps);

    // Strip nulls
    forEach(displayOptions, (displayValues, display) => {
      forEach(displayValues, (val, key) => {
        if (val === null) {
          delete displayOptions[display][key];
        }
      });
    });

    dispatch(saveStyle({
      title,
      type: ElementClass.style && ElementClass.style.type || ElementClass.style,
      options,
      displayOptions
    }, (style) => {
      dispatch({
        type: actionTypes.doActionNoHistory,
        action: {
          type: 'changeStyle',
          elementId: selected.id,
          value: style._id,
          context: selected.context
        }
      });
    }));
  };
}

export function changeElementProperty (elementId, property, value, context) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.pbDoAction,
      action: {
        type: 'changeProp',
        elementId,
        property,
        value,
        display,
        context
      }
    });
  };
}

export function changeElementContent (elementId, value, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeContent',
      elementId,
      value,
      context
    }
  };
}

export function changeElementChildren (elementId, children, elements, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeChildren',
      elementId,
      children,
      elements,
      context
    }
  };
}

export function addLink ({elementId, schemaId, linkElementId, property, prefix, context}) {
  return (dispatch, getState) => {
    const state = getState();
    const linkElement = getElement({
      state: state.pageBuilder,
      id: linkElementId,
      context
    });

    if (linkElement) {
      const actions = getSchemaLinkActions(
        state.pageBuilder,
        linkElement,
        property
      );

      dispatch({
        type: actionTypes.pbDoAction,
        action: {
          type: 'addLink',
          elementId,
          context,
          schemaId,
          property: prefix + property.id,
          linkElementId,
          action: actions.values[0]
        }
      });
    }
  };
}

export function removeLink ({elementId, context, schemaId, linkElementId, index}) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'removeLink',
      elementId,
      context,
      schemaId,
      linkElementId,
      index
    }
  };
}

export function changeLinkAction ({elementId, context, schemaId, linkElementId, index, value}) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeLinkAction',
      elementId,
      context,
      schemaId,
      linkElementId,
      index,
      value
    }
  };
}

export function undoAction () {
  return {
    type: actionTypes.pbUndoAction
  };
}

export function redoAction () {
  return {
    type: actionTypes.pbRedoAction
  };
}

export function addElementAt (element, destination) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'new',
      element,
      destination // destination contains context
    }
  };
}

export function makeElementDynamic (elementId, context) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'makeDynamic',
      elementId,
      context
    }
  };
}

export function draggedComponent (dragInfo, dropInfo) {
  const action = {
    type: dragInfo.type
  };

  if (dragInfo.type === 'new') {
    action.element = {
      tag: dragInfo.element,
      context: dragInfo.context
    };
  } else if (dragInfo.type === 'move') {
    action.source = {
      id: dragInfo.id,
      context: dragInfo.context
    };
  }

  action.destination = {
    id: dropInfo.id,
    position: 0,
    context: dropInfo.context
  };

  if (typeof dropInfo.position !== 'undefined') {
    action.destination.position = dropInfo.position;
  }

  return {
    type: actionTypes.pbDoAction,
    action
  };
}

export function linkDataMode (elementId, context) {
  return {
    type: actionTypes.pbLinkDataMode,
    elementId,
    context
  };
}

export function closeLinkDataMode () {
  return {
    type: actionTypes.pbCloseLinkDataMode
  };
}

function extractChildren (children, data, draftData, parentId) {
  forEach(children, (childId) => {
    data[childId] = Object.assign({}, draftData[childId]);
    if (parentId) {
      data[childId].parent = parentId;
    }
    if (data[childId].children && data[childId].children.constructor === Array) {
      extractChildren(data[childId].children, data, draftData);
    }
  });
}

export function makeElementSymbol (elementId, title, context) {
  return (dispatch, getState) => {
    const symbolData = {};
    const draftDoc = getState().pageBuilder.doc;
    const draftData = draftDoc[context];

    symbolData.base = Object.assign({}, draftData[elementId]);
    symbolData.base.id = 'base';
    delete symbolData.base.parent;
    if (symbolData.base.children && symbolData.base.children.constructor === Array) {
      extractChildren(symbolData.base.children, symbolData, draftData, 'base');
    }

    const data = {
      title,
      data: symbolData
    };

    mutation({
      fragments: {
        addSymbol: {
          _id: 1,
          title: 1,
          data: 1
        }
      },
      variables: {
        addSymbol: {
          data: {
            type: 'SymbolInput!',
            value: data
          }
        }
      }
    }, (result) => {
      if (result.addSymbol) {
        dispatch({
          type: actionTypes.makeElementSymbol,
          symbol: result.addSymbol,
          elementId,
          context
        });
      }
    })(dispatch, getState);
  };
}

export function editSymbol (elementId, symbol, context) {
  return {
    type: actionTypes.pbEditSymbol,
    elementId,
    symbol,
    context
  };
}

export function closeEditSymbol () {
  return {
    type: actionTypes.pbCloseEditSymbol
  };
}

export function saveSymbol (symbolId) {
  return (dispatch, getState) => {
    const data = getState().pageBuilder.symbolsData[symbolId].doc[symbolId];

    updateSymbol(symbolId, data, () => {
      dispatch({
        type: actionTypes.pbCloseEditSymbol
      });
    })(dispatch, getState);
  };
}

export function changeLinkTabSchemaId (schemaId) {
  return {
    type: actionTypes.pbChangeLinkTabSchemaId,
    schemaId
  };
}

export function setPageBuilderTemplate (template) {
  return {
    type: actionTypes.setPageBuilderTemplate,
    template
  };
}
