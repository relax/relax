import {Component} from 'relax-framework';
import React from 'react';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import Input from '../input';
import Entry from './entry';
import Edit from './edit';
import styles from '../../styles';

import stylesActions from '../../client/actions/style';

export default class StylePicker extends Component {
  getInitialState () {
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onSelectBind = this.onSelect.bind(this);
    this.onEditBind = this.onEdit.bind(this);

    return {
      edit: false,
      editing: {},
      styles: styles.getByType(this.props.type),
      selected: this.props.value,
      element: this.context.selected
    };
  }

  componentDidMount () {
    this.updatedStylesBind = this.updatedStyles.bind(this);
    styles.on('update', this.updatedStylesBind);
  }

  comoponentWillUnmount () {
    styles.off('update', this.updatedStylesBind);
  }

  updatedStyles () {
    this.setState({
      styles: styles.getByType(this.props.type)
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.context.selected.id !== this.state.element.id) {
      this.setState({
        element: this.context.selected,
        selected: this.props.value
      });

      if (prevProps.type !== this.props.type) {
        this.setCollections(this.getInitialCollections());
      }
    }
  }

  addNewClick (event) {
    event.preventDefault();
    var editing = {
      title: 'New style',
      type: this.props.type,
      options: clone(this.props.defaults)
    };
    this.setState({
      edit: true,
      editing
    });
    this.props.onChange(editing);
  }

  onValueChange (id, value) {
    this.state.editing.options[id] = value;
    this.setState({
      editing: this.state.editing
    });
    this.props.onChange(this.state.editing);
  }

  onTitleChange (value) {
    this.state.editing.title = value;
    this.setState({
      editing: this.state.editing
    });
  }

  onEdit (style) {
    this.setState({
      edit: true,
      editing: cloneDeep(style)
    });
    this.props.onChange(style);
  }

  submitStyle (event) {
    event.preventDefault();

    if (this.state.editing._id) {
      stylesActions
        .update(this.state.editing)
        .then(() => {
          this.setState({
            edit: false,
            editing: false
          });
          this.props.onChange(this.state.selected);
        });
    } else {
      stylesActions
        .add(this.state.editing)
        .then(() => {
          this.setState({
            edit: false,
            editing: false
          });
          this.props.onChange(this.state.selected);
        });
    }
  }

  cancel (event) {
    event.preventDefault();
    this.setState({
      edit: false,
      editing: false
    });
    this.props.onChange(this.state.selected);
  }

  onSelect (style) {
    this.props.onChange(style._id);
    this.setState({
      selected: style._id
    });
  }

  renderStyle (style) {
    var props = {
      selected: false,
      style,
      onMouseEnter: this.onMouseEnterBind,
      onMouseLeave: this.onMouseLeaveBind,
      onSelect: this.onSelectBind,
      onEdit: this.onEditBind,
      key: style._id
    };

    if (this.props.value === style._id || this.state.selected === style._id) {
      props.selected = true;
    }

    return (
      <Entry {...props} />
    );
  }

  renderContent () {
    if (this.state.edit) {
      return (
        <Edit
          OptionsList={this.props.OptionsList}
          options={this.props.options}
          onClose={this.closeEdit.bind(this)}
          editing={this.state.editing}
          onChange={this.props.onChange}
        />
      );
    } else {
      return (
        <div>
          <div>
            {this.state.styles.map(this.renderStyle, this)}
          </div>
          <a href='#' className='button button-primary' onClick={this.addNewClick.bind(this)}>Add new style</a>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='style-picker'>
        {this.renderContent()}
      </div>
    );
  }
}

StylePicker.contextTypes = {
  selected: React.PropTypes.any.isRequired
};

StylePicker.propTypes = {
  OptionsList: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};
