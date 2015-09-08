import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import cloneDeep from 'lodash.clonedeep';
import cx from 'classnames';
import Utils from '../../../../../../utils';

import Combobox from '../../../../../combobox';

export default class SchemaPropertyLink extends Component {
  getInitialState () {
    let element = this.props.element;

    const ElementClass = this.context.elements[element.tag];

    const canChildren = element.tag === 'TextBox';
    const canProps = ElementClass.propsSchema && ElementClass.propsSchema.length > 0;
    const canDisplay = this.props.property.type === 'Boolean';

    let actions = [];

    if (canProps) {
      actions.push({
        title: 'Setting',
        value: 'setting'
      });
    }
    if (canChildren) {
      actions.push({
        title: 'Content',
        value: 'children'
      });
    }
    if (canDisplay) {
      actions.push({
        title: 'Display',
        value: 'display'
      });
    }

    return {
      ElementClass,
      actions
    };
  }

  onMouseOver (id, event) {
    this.context.overElement(id);
  }

  onMouseOut (id) {
    this.context.outElement(id);
  }

  actionClicked (actionId) {
    let cloned = cloneDeep(this.context.page.schema || {});
    cloned.properties[this.props.property.id][this.props.index].action = actionId;
    this.context.setPageSchema(cloned);
  }

  onRemove () {
    let cloned = cloneDeep(this.context.page.schema || {});
    cloned.properties[this.props.property.id].splice(this.props.index, 1);
    this.context.setPageSchema(cloned);
  }

  onExtraChange (value) {
    let cloned = cloneDeep(this.context.page.schema || {});
    cloned.properties[this.props.property.id][this.props.index].actionExtra = value;
    this.context.setPageSchema(cloned);
  }

  renderExtra () {
    const link = this.props.link;
    if (link.action === 'setting') {
      let props = {
        values: [],
        labels: [],
        value: link.actionExtra || '',
        onChange: this.onExtraChange.bind(this)
      };
      let propsList = Utils.getPropSchemaList(this.state.ElementClass.propsSchema);

      forEach(propsList, (propSchema) => {
        if (propSchema.id && propSchema.label) {
          props.values.push(propSchema.id);
          props.labels.push(propSchema.label);
        }
      });

      return (
        <div className='extra-option'>
          <div className='label'>Setting to change</div>
          <Combobox {...props} />
        </div>
      );
    }
  }

  render () {
    const link = this.props.link;
    const ElementClass = this.state.ElementClass;
    const element = this.props.element;

    let actionsComponents = [];
    forEach(this.state.actions, (action, index) => {
      actionsComponents.push((
        <span
          className={cx('action', link.action && link.action === action.value && 'active')}
          onClick={this.actionClicked.bind(this, action.value)}
          key={action.value}
        >{action.title}</span>
      ));

      if (index + 1 < this.state.actions.length) {
        actionsComponents.push(<span key={index}>/</span>);
      }
    });

    return (
      <div
        className='linked'
        onMouseEnter={this.onMouseOver.bind(this, element.id)}
        onMouseLeave={this.onMouseOut.bind(this, element.id)}
      >
        <div className='label'>Element</div>
        <div className='element-info'>
          <i className={ElementClass.settings.icon.class}>{ElementClass.settings.icon.content}</i>
          <span>{element.label || element.tag}</span>
        </div>
        <div className='label'>Change</div>
        <div className='actions'>
          {actionsComponents}
        </div>
        {this.renderExtra()}
        <div className='delete' onClick={this.onRemove.bind(this)}>
          <i className='material-icons'>close</i>
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
