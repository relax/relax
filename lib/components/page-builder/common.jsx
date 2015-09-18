import React from 'react';

import Colors from '../../colors';
import Styles from '../../styles';
import ElementsMenu from './elements-menu';

import forEach from 'lodash.foreach';
import key from 'keymaster';
import cloneDeep from 'lodash.clonedeep';

import {DragRoot} from '../drag';

var BUILDER_ID = 0;
const ACTIONS_LIMIT = 20;

export default class Common extends DragRoot {
  getInitialState () {
    this.onStartDragBind = this.onStartDrag.bind(this);
    this.onPropChangeBind = this.onPropChange.bind(this);
    this.onAddElementAtSelected = this.addElementAtSelected.bind(this);
    this.selectElementBind = this.selectElement.bind(this);
    this.overElementBind = this.overElement.bind(this);
    this.outElementBind = this.outElement.bind(this);
    this.duplicateElementBind = this.duplicateElement.bind(this);
    this.removeElementBind = this.removeElement.bind(this);
    this.onLabelChangeBind = this.onLabelChange.bind(this);
    this.toggleExpandElementBind = this.toggleExpandElement.bind(this);
    this.expandAllBind = this.expandAll.bind(this);
    this.collapseAllBind = this.collapseAll.bind(this);
    this.displayToggleElementBind = this.displayToggleElement.bind(this);
    this.onResizeBind = this.onResize.bind(this);
    this.setElementAnimationBind = this.setElementAnimation.bind(this);
    this.elementContentChangeBind = this.elementContentChange.bind(this);
    this.findPageElementByIdBind = this.findPageElementById.bind(this);
    this.addElementAtIdBind = this.addElementAtId.bind(this);
    this.openElementsMenuBind = this.openElementsMenu.bind(this);
    this.setPageSchemaBind = this.setPageSchema.bind(this);

    this.idCounter = this.checkLatestId(this.props.value.data) + 1;

    this.scope = 'keyscope'+(BUILDER_ID++);
    this.previousScope = key.getScope();
    key.setScope(this.scope);

    this.listenTo(Colors, 'update', this.colorUpdated.bind(this));

    return {
      dragging: false,
      selected: false,
      selectedPath: [],
      overedElement: false,
      redos: []
    };
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.data._id !== this.props.value._id) {
    //   nextProps.data.data = nextProps.data.data || [];
    //   nextProps.data.actions = nextProps.data.actions || [];
    //   this.idCounter = this.checkLatestId(nextProps.data.data) + 1;
    //
    //   this.setState({
    //     page: nextProps.data
    //   });
    // }
  }

  colorUpdated () {
    Styles.onStylesUpdate();
    this.forceUpdate();
  }

  getChildContext () {
    return {
      elements: this.context.elements,
      page: this.props.value,
      selectElement: this.selectElementBind,
      selected: this.state.selected,
      selectedPath: this.state.selectedPath,
      selectedParent: this.state.selectedParent,
      overElement: this.overElementBind,
      outElement: this.outElementBind,
      overedElement: this.state.overedElement,
      overedPath: this.state.overedPath,
      onStartDrag: this.onStartDragBind,
      onPropChange: this.onPropChangeBind,
      dragging: this.state.dragging,
      redos: this.state.redos,
      addElementAtSelected: this.onAddElementAtSelected,
      addElementAtId: this.addElementAtIdBind,
      duplicateElement: this.duplicateElementBind,
      removeElement: this.removeElementBind,
      onLabelChange: this.onLabelChangeBind,
      toggleExpandElement: this.toggleExpandElementBind,
      expandAll: this.expandAllBind,
      collapseAll: this.collapseAllBind,
      displayToggleElement: this.displayToggleElementBind,
      setElementAnimation: this.setElementAnimationBind,
      elementContentChange: this.elementContentChangeBind,
      findPageElementById: this.findPageElementByIdBind,
      openElementsMenu: this.openElementsMenuBind,
      elementsMenuSpot: this.state.elementsMenu ? this.state.elementsMenuProps.targetPosition : -1,
      setPageSchema: this.setPageSchemaBind
    };
  }

  componentDidMount () {
    super.componentDidMount();
    if (window !== undefined) {
      key('⌘+z, ctrl+z', this.scope, this.undoAction.bind(this));
      key('⌘+y, ctrl+y', this.scope, this.redoAction.bind(this));
      key('delete', this.scope, this.removeSelectedElement.bind(this));

      window.addEventListener('resize', this.onResizeBind);
      this.onResize();
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    key.unbind('⌘+z, ctrl+z');
    key.unbind('⌘+y, ctrl+y');
    key.unbind('delete');
    window.removeEventListener('resize', this.onResizeBind);
    key.setScope(this.previousScope);
  }

  onResize () {
    this.setState({
      mounted: true
    });
  }

  updatePage () {
    this.setState({
      page: this.props.value
    });
  }

  forEachElement (elements, callback) {
    forEach(elements, (element, index) => {
      callback(element);

      if (element.children && element.children.length) {
        this.forEachElement(element.children, callback);
      }
    });
  }

  checkLatestId (data) {
    var max = 0;

    this.forEachElement(data, (element) => {
      if (element.id > max) {
        max = element.id;
      }
    });

    return max;
  }

  registerAction (action) {
    this.props.value.actions.push(action);
  }

  undoAction (event) {
    if (event && event.preventDefault) {
       event.preventDefault();
    }

    this.revertAction();
  }

  redoAction (event) {
    if (event && event.preventDefault) {
       event.preventDefault();
    }

    if (this.state.redos.length > 0) {
      var action = this.state.redos.pop();
      this.props.value.actions.push(action);
      this.doAction(action);
    }
  }

  selectElement (id) {
    if (id === 'body') {
      this.setState({
        selected: 'body',
        selectedPath: [],
        selectedParent: null
      });
    } else {
      var info = this.findElementById(this.props.value.data, id);
      var element = info.element;

      if (element !== false) {
        let selectedParent = null;

        if (info.parent && (!element.children || element.children.constructor !== Array || element.tag === 'Column')) {
          selectedParent = info.parent;
        }

        this.setState({
          selected: element,
          selectedPath: info.path,
          selectedParent
        });
      }
    }
  }

  overElement (id) {
    if (id !== 'body' && (!this.overedElement || this.overedElement.id !== id)) {
      var info = this.findElementById(this.props.value.data, id);
      var element = info.element;

      if (element !== false) {
        this.setState({
          overedElement: info.element,
          overedPath: info.path
        });
      }
    }
  }

  outElement (id) {
    if (this.state.overedElement && this.state.overedElement.id === id) {
      this.setState({
        overedElement: false
      });
    }
  }

  doAction (action) {
    if (action.type === 'new' || action.type === 'move' || action.type === 'add') {
      // Source
      var element;
      if (action.type === 'new') {
        element = action.element;
        element.id = element.id || this.idCounter++;

        if (!element.children && this.context.elements[element.tag].defaultChildren) {
          const defaultChildren = this.context.elements[element.tag].defaultChildren;

          if (defaultChildren.constructor === Array) {
            let defaultChildrenClone = cloneDeep(defaultChildren);
            forEach(defaultChildrenClone, (childElement) => {
              childElement.id = this.idCounter++;
            });
            element.children = defaultChildrenClone;
          } else {
            element.children = defaultChildren;
          }
        }
      } else if (action.type === 'add') {
        element = action.element;
      } else {
        element = this.findElementById(this.props.value.data, action.source.id, true).element;
      }

      // Destination
      let destination;
      if (action.destination.id === 'body') {
        destination = this.props.value.data;
      } else {
        destination = this.findElementById(this.props.value.data, action.destination.id).element;
        destination.children = destination.children || [];
        destination = destination.children;
      }

      // Position
      var position = action.destination.position;
      if (action.type === 'move') {
        if (action.source.parent === action.destination.id && action.source.position < action.destination.position) {
          position -= 1;
        }
      }

      destination.splice(position, 0, element);

      if (action.type === 'new') {
        this.selectElement(element.id);
      }
    } else if (action.type === 'remove') {
      if (this.state.selected.id === action.id) {
        this.selectElement('body');
      } else {
        // check if child is selected
        let info = this.findElementById(this.props.value.data, this.state.selected.id);
        forEach(info.path, (element) => {
          if (element.id === action.id) {
            this.selectElement('body');
            return false;
          }
        });
      }
      this.findElementById(this.props.value.data, action.id, true);
    } else if (action.type === 'changeProp') {
      let info = this.findElementById(this.props.value.data, action.id);
       info.element.props[action.prop] = action.value;
      if (action.prop === 'children') {
        info.element.children = action.value;
      }
    } else if (action.type === 'changeContent') {
      let info = this.findElementById(this.props.value.data, action.id);
      info.element.children = action.value;
    } else if (action.type === 'changeAnimation') {
      let info = this.findElementById(this.props.value.data, action.id);
      info.element.animation = action.value;
    } else if (action.type === 'changeLabel') {
      let info = this.findElementById(this.props.value.data, action.id);
      info.element.label = action.value;
    } else if (action.type === 'changeDisplay') {
      let info = this.findElementById(this.props.value.data, action.id);
      info.element.hide[action.display] = info.element.hide[action.display] ? false : true;
    } else if (action.type === 'changeSchema') {
      this.props.value.schema = action.value;
    }

    this.props.onChange(this.props.value);
  }

  revertAction () {
    if (this.props.value.actions.length > 0) {
      var revertedAction = {};
      var action = this.props.value.actions.pop();

      // New
      if (action.type === 'new') {
        revertedAction.type = 'remove';
        revertedAction.id = action.element.id;
      }

      // Move
      else if (action.type === 'move') {
        revertedAction.type = 'move';

        revertedAction.source = {
          id: action.source.id,
          parent: action.destination.id,
          position: action.destination.position
        };

        revertedAction.destination = {
          id: action.source.parent,
          position: action.source.position
        };
      }

      // Remove
      else if (action.type === 'remove') {
        revertedAction.type = 'add';
        revertedAction.element = action.element;
        revertedAction.destination = {
          id: action.parent,
          position: action.position
        };
      }

      // Prop change
      else if (action.type === 'changeProp') {
        revertedAction = {
          type: 'changeProp',
          id: action.id,
          prop: action.prop,
          value: action.oldValue,
          oldValue: action.value
        };
      }

      // Content change
      else if (action.type === 'changeContent') {
        revertedAction = {
          type: 'changeContent',
          id: action.id,
          value: action.oldValue,
          oldValue: action.value
        };
      }

      // Animation change
      else if (action.type === 'changeAnimation') {
        revertedAction = {
          type: 'changeAnimation',
          id: action.id,
          value: action.oldValue,
          oldValue: action.value
        };
      }

      // Label change
      else if (action.type === 'changeLabel') {
        revertedAction = {
          type: 'changeLabel',
          id: action.id,
          value: action.oldValue,
          oldValue: action.value
        };
      }

      // Display change
      else if (action.type === 'changeDisplay') {
        revertedAction = {
          type: 'changeDisplay',
          id: action.id,
          display: action.display
        };
      }

      // Change schema
      else if (action.type === 'changeSchema') {
        revertedAction = {
          type: 'changeSchema',
          value: action.oldValue,
          oldValue: action.value
        };
      }

      this.state.redos.push(action);
      this.doAction(revertedAction);
    }
  }

  addElementAtSelected (element) {
    var position = 0;

    if (this.state.selected.children && this.state.selected.children.constructor === Array) {
      position = this.state.selected.children.length;
    }

    var action = {
      type: 'new',
      element: {
        tag: element,
        id: this.idCounter++
      },
      destination: {
        id: this.state.selected !== false ? this.state.selected.id : 'body',
        position
      }
    };
    this.factorAction(action);
  }

  addElementAtId (tag, toId, position = 0) {
    var action = {
      type: 'new',
      element: {
        tag,
        id: this.idCounter++
      },
      destination: {
        id: toId,
        position
      }
    };
    this.factorAction(action);
  }

  updateElementIds (element) {
    element.id = this.idCounter++;

    if (element.children && element.children.constructor === Array) {
      forEach(element.children, (element) => {
        this.updateElementIds(element);
      });
    }
  }

  duplicateElement (id) {
    var info = this.findElementById(this.props.value.data, id, false);
    var element = cloneDeep(info.element);
    this.updateElementIds(element);
    var action = {
      type: 'new',
      element,
      destination: {
        id: info.parent,
        position: info.position+1
      }
    };
    this.factorAction(action);
  }

  removeElement (id) {
    let info = this.findElementById(this.props.value.data, id);
    this.factorAction({
      type: 'remove',
      id,
      parent: info.parent,
      position: info.position,
      element: info.element
    });
  }

  removeSelectedElement () {
    if (this.state.selected !== 'body') {
      this.removeElement (this.state.selected.id);
    }
  }

  draggedComponent (dragReport) {
    const dragInfo = dragReport.dragInfo;
    const dropInfo = dragReport.dropInfo;

    // dropped no where
    if (!dropInfo || !dragInfo) {
      return;
    }

    var action = {
      type: dragInfo.type
    };

    // dragging element
    if (dragInfo.type === 'new') {
      action.element = {
        tag: dragInfo.element,
        id: this.idCounter++
      };
    } else if (dragInfo.type === 'move') {
      let info = this.findElementById(this.props.value.data, dragInfo.id);
      action.source = {
        id: dragInfo.id,
        parent: info.parent,
        position: info.position
      };
    }

    // destination
    if (dropInfo.type === 'body') {
      action.destination = {
        id: 'body',
        position: 0
      };
    } else {
      action.destination = {
        id: dropInfo.id,
        position: 0
      };
    }

    // position
    if (dropInfo.position !== undefined) {
      action.destination.position = dropInfo.position;
    }

    this.factorAction(action);
  }

  factorAction (action) {
    this.state.redos = [];
    this.props.value.actions.push(action);

    if (this.props.value.actions.length > ACTIONS_LIMIT) {
      this.props.value.actions.shift();
    }

    this.doAction(action);
  }

  findPageElementById (id) {
    return this.findElementById(this.props.value.data, id).element;
  }

  findElementById (elements, id, remove = false, parent = {tag: 'body', id: 'body'}, path = []) {
    var result = false;

    path.push(parent);

    forEach(elements, (element, index) => {
      if (element.id === id) {
        if (remove) {
          result = {
            element: (elements.splice(index, 1))[0],
            parent: parent.id,
            position: index,
            path
          };
        } else {
          result = {
            element,
            parent: parent.id,
            position: index,
            path
          };
        }

        return false;
      }

      if (element.children && element.children.length > 0) {
        result = this.findElementById(element.children, id, remove, element, path);

        if (result !== false) {
          return false;
        }
      }
    });

    if (result === false) {
      path.pop();
    }

    return result;
  }

  toggleExpandElement (elementId) {
    var info = this.findElementById(this.props.value.data, elementId);
    info.element.expanded = !info.element.expanded;
    this.updatePage();
  }

  expandAll () {
    this.forEachElement(this.props.value.data, (element) => {
      element.expanded = true;
    });
    this.updatePage();
  }

  collapseAll () {
    this.forEachElement(this.props.value.data, (element) => {
      element.expanded = false;
    });
    this.updatePage();
  }

  onPropChange (id, value) {
    this.state.selected.props = this.state.selected.props || {};
    this.factorAction({
      type: 'changeProp',
      id: this.state.selected.id,
      prop: id,
      value,
      oldValue: this.state.selected.props[id]
    });
  }

  elementContentChange (value) {
    if (value && value.constructor === Array) {
      forEach(value, (childElement) => {
        if (!childElement.id) {
          childElement.id = this.idCounter++;
        }
      });
    }

    this.factorAction({
      type: 'changeContent',
      id: this.state.selected.id,
      value,
      oldValue: this.state.selected.children
    });
  }

  onLabelChange (value) {
    this.factorAction({
      type: 'changeLabel',
      id: this.state.selected.id,
      value,
      oldValue: this.state.selected.label
    });
  }

  displayToggleElement (elementId, display) {
    var info = this.findElementById(this.props.value.data, elementId);
    info.element.hide = info.element.hide || {};

    this.factorAction({
      type: 'changeDisplay',
      id: this.state.selected.id,
      display
    });
  }

  setElementAnimation (animation) {
    this.factorAction({
      type: 'changeAnimation',
      id: this.state.selected.id,
      value: animation,
      oldValue: this.state.selected.animation
    });
  }

  setPageSchema (schema) {
    this.factorAction({
      type: 'changeSchema',
      value: schema,
      oldValue: this.props.value.schema
    });
  }

  openElementsMenu (options) {
    this.setState({
      elementsMenu: true,
      elementsMenuProps: options
    });
  }

  closeElementsMenu () {
    this.setState({
      elementsMenu: false,
      elementsMenuProps: null
    });
  }

  renderElementsMenu () {
    if (this.state.elementsMenu) {
      return (
        <ElementsMenu
          {...this.state.elementsMenuProps}
          onClose={this.closeElementsMenu.bind(this)}
        />
      );
    }
  }
}

Common.propTypes = {
  data: React.PropTypes.object.isRequired
};

Common.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  editing: React.PropTypes.bool.isRequired
};

Common.childContextTypes = {
  elements: React.PropTypes.object.isRequired,
  page: React.PropTypes.object.isRequired,
  selectElement: React.PropTypes.func.isRequired,
  selected: React.PropTypes.any.isRequired,
  selectedPath: React.PropTypes.array.isRequired,
  selectedParent: React.PropTypes.string,
  overElement: React.PropTypes.func.isRequired,
  outElement: React.PropTypes.func.isRequired,
  overedElement: React.PropTypes.any.isRequired,
  overedPath: React.PropTypes.array.isRequired,
  onStartDrag: React.PropTypes.func.isRequired,
  onPropChange: React.PropTypes.func.isRequired,
  dragging: React.PropTypes.bool.isRequired,
  redos: React.PropTypes.array.isRequired,
  addElementAtSelected: React.PropTypes.func.isRequired,
  addElementAtId: React.PropTypes.func.isRequired,
  duplicateElement: React.PropTypes.func.isRequired,
  removeElement: React.PropTypes.func.isRequired,
  onLabelChange: React.PropTypes.func.isRequired,
  toggleExpandElement: React.PropTypes.func.isRequired,
  expandAll: React.PropTypes.func.isRequired,
  collapseAll: React.PropTypes.func.isRequired,
  displayToggleElement: React.PropTypes.func.isRequired,
  setElementAnimation: React.PropTypes.func.isRequired,
  elementContentChange: React.PropTypes.func.isRequired,
  findPageElementById: React.PropTypes.func.isRequired,
  openElementsMenu: React.PropTypes.func.isRequired,
  elementsMenuSpot: React.PropTypes.number.isRequired,
  setPageSchema: React.PropTypes.func.isRequired
};
