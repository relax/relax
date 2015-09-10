import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import cloneDeep from 'lodash.clonedeep';
import Utils from '../../../../../../utils';
import OptionsMenu from '../../../../../options-menu';

export default class SchemaPropertyLink extends Component {
  getInitialState () {
    let element = this.props.element;

    const ElementClass = this.context.elements[element.tag];

    let availableActions = [];

    // Content
    if (element.tag === 'TextBox') {
      availableActions.push({
        label: 'Content',
        value: 'children'
      });
    }

    // Settings
    if (ElementClass.propsSchema && ElementClass.propsSchema.length > 0) {
      // Check settings that match property type
      let propsList = Utils.getPropSchemaList(ElementClass.propsSchema);
      forEach(propsList, propSchema => {
        if (propSchema.id && propSchema.label && propSchema.type === this.props.property.type) {
          availableActions.push({
            label: propSchema.label,
            value: propSchema.id
          });
        }
      });
    }

    // Display
    availableActions.push({
      label: 'Show',
      value: 'show'
    });
    availableActions.push({
      label: 'Hide',
      value: 'hide'
    });

    return {
      ElementClass,
      availableActions,
      opened: false
    };
  }

  componentDidMount () {
    if (!this.props.link.action) {
      this.actionClicked(this.state.availableActions[0].value);
    }
  }

  onMouseOver (id, event) {
    this.context.overElement(id);
  }

  onMouseOut (id) {
    this.context.outElement(id);
  }

  actionClicked (actionId, event) {
    if (event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }

    let cloned = cloneDeep(this.context.page.schema || {});
    cloned.properties[this.props.property.id][this.props.index].action = actionId;
    this.context.setPageSchema(cloned);
    this.closeMenu();
  }

  onRemove () {
    let cloned = cloneDeep(this.context.page.schema || {});
    cloned.properties[this.props.property.id].splice(this.props.index, 1);
    this.context.setPageSchema(cloned);
  }

  openMenu () {
    this.setState({
      opened: true
    });
  }

  closeMenu () {
    this.setState({
      opened: false
    });
  }

  getCurrentLabel () {
    const link = this.props.link;
    let label = '';
    forEach(this.state.availableActions, action => {
      if (link.action === action.value) {
        label = action.label;
        return false;
      }
    });
    return label;
  }

  renderMenu () {
    if (this.state.opened) {
      let options = [];

      forEach(this.state.availableActions, action => {
        options.push({
          label: action.label,
          action: this.actionClicked.bind(this, action.value)
        });
      });

      return <OptionsMenu options= {options} />;
    }
  }

  renderAction () {
    const link = this.props.link;

    if (link.action) {
      return (
        <div className='action' onClick={this.openMenu.bind(this)} onMouseLeave={this.closeMenu.bind(this)}>
          <span>{this.getCurrentLabel()}</span>
          <i className='material-icons'>{this.state.opened ? 'expand_less' : 'expand_more'}</i>
          {this.renderMenu()}
        </div>
      );
    }
  }

  render () {
    const ElementClass = this.state.ElementClass;
    const element = this.props.element;

    let linkStyle = {
      borderColor: this.props.color,
      backgroundColor: this.props.color
    };

    return (
      <div
        className='linked'
        onMouseEnter={this.onMouseOver.bind(this, element.id)}
        onMouseLeave={this.onMouseOut.bind(this, element.id)}
      >
        <div className='link'>
          <span style={linkStyle}></span>
        </div>
        <div>
          <div className='element-info'>
            <i className={ElementClass.settings.icon.class}>{ElementClass.settings.icon.content}</i>
            <span>{element.label || element.tag}</span>
          </div>
        </div>
        <div className='actions'>
          {this.renderAction()}
        </div>
        <div className='delete-col'>
          <div className='delete' onClick={this.onRemove.bind(this)}>
            <i className='material-icons'>close</i>
          </div>
        </div>
      </div>
    );
  }
}

SchemaPropertyLink.contextTypes = {
  page: React.PropTypes.object.isRequired,
  setPageSchema: React.PropTypes.func.isRequired,
  findPageElementById: React.PropTypes.func.isRequired,
  overElement: React.PropTypes.func.isRequired,
  outElement: React.PropTypes.func.isRequired,
  elements: React.PropTypes.object.isRequired
};
