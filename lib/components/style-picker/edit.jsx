import {Component} from 'relax-framework';
import React from 'react';
import merge from 'lodash.merge';
import ComplementMenu from '../complement-menu';
import Styles from '../../styles';
import OptionsList from '../options-list';
import cloneDeep from 'lodash.clonedeep';
import Input from '../input';
import GeminiScrollbar from 'react-gemini-scrollbar';

import styleActions from '../../client/actions/style';

export default class Edit extends Component {
  getInitialState () {
    var model;
    this.isNew = this.props.editing === false;

    if (!this.isNew) {
      model = Styles.get(this.props.editing);
      this.initialOptions = model && model.get('options') || {};
    } else {
      model = Styles.createTemp(this.props.type);
    }

    return {
      model
    };
  }

  onTitleChange (value) {
    this.state.model.set({
      title: value
    });
  }

  onChange (id, value) {
    var options = cloneDeep(this.state.model.get('options'));
    options[id] = value;
    this.state.model.set({
      options
    });
  }

  onCancel () {
    if (this.isNew) {
      Styles.removeTemp();
    } else {
      this.state.model.set({
        options: this.initialOptions
      });
    }

    this.props.onClose();
  }

  onSubmit () {
    var json = this.state.model.toJSON();
    if (this.isNew) {
      delete json._id;
      Styles.removeTemp();
      styleActions
        .add(json)
        .then(() => this.props.onClose());
    } else {
      styleActions
        .update(json)
        .then(() => this.props.onClose());
    }
  }

  renderOptions () {
    var registeredStyle = Styles.getStyleOptionsByType(this.props.type);
    var values = cloneDeep(registeredStyle.defaults);
    merge(values, this.state.model.get('options'));

    return (
      <OptionsList
        options={registeredStyle.options}
        values={values}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  render () {
    return (
      <ComplementMenu className='edit-style'>
        <div className='complement-content-scrollable'>
          <GeminiScrollbar autoshow={true}>
            <div className='complement-padded'>
              <div className='option'>
                <div className='label'>Title</div>
                <Input value={this.state.model.get('title')} placeholder='Style title' onChange={this.onTitleChange.bind(this)} />
              </div>
              {this.renderOptions()}
            </div>
          </GeminiScrollbar>
        </div>
        <div className='buttons-group'>
          <div className='cancel' onClick={this.onCancel.bind(this)}>Cancel</div>
          <div className='submit' onClick={this.onSubmit.bind(this)}>Done</div>
        </div>
      </ComplementMenu>
    );
  }
}

Edit.propTypes = {
  type: React.PropTypes.string.isRequired,
  editing: React.PropTypes.any.isRequired,
  onClose: React.PropTypes.func.isRequired
};
