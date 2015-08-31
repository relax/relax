import {Component} from 'relax-framework';
import React from 'react';
import styles from '../../styles';
import OptionsMenu from '../options-menu';
import cloneDeep from 'lodash.clonedeep';
import cx from 'classnames';

import stylesActions from '../../client/actions/style';

export default class Entry extends Component {
  getInitialState () {
    return {
      classesMap: styles.getClassesMap(this.props.entry._id),
      options: false
    };
  }

  onClick (event) {
    event.preventDefault();
    this.props.onClick(this.props.entry._id);
  }

  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  onMouseLeave () {
    if (this.state.options) {
      this.setState({
        options: false
      });
    }
  }

  edit () {
    this.props.onEdit(this.props.entry._id);
    this.setState({
      options: false
    });
  }

  duplicate () {
    var duplicate = cloneDeep(this.props.entry);
    delete duplicate._id;

    stylesActions.add(duplicate);

    this.setState({
      options: false
    });
  }

  remove () {
    stylesActions.remove(this.props.entry._id);
  }

  renderInfo () {
    if (this.props.styleOptions.getIdentifierLabel) {
      return (
        <span className='info'>{this.props.styleOptions.getIdentifierLabel(this.props.entry.options)}</span>
      );
    }
  }

  renderPreview () {
    if (this.props.styleOptions.preview) {
      return (
        <div className='preview'>
          {this.props.styleOptions.preview(this.state.classesMap)}
        </div>
      );
    }
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Edit', action: this.edit.bind(this), icon: 'fa fa-pencil'},
          {label: 'Duplicate', action: this.duplicate.bind(this), icon: 'fa fa-copy'},
          {label: 'Remove', action: this.remove.bind(this), icon: 'fa fa-trash-o'}
        ]} />
      );
    }
  }

  render () {
    var className = cx(
      'entry',
      this.props.selected && 'selected',
      this.props.entry.options && this.props.entry.options.preview && 'contrast',
      this.props.editing && 'editing'
    );

    return (
      <div className={className} onClick={this.onClick.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <div className='info-holder'>
          <span className='title'>{this.props.entry.title}</span>
          {this.renderInfo()}
        </div>
        {this.renderPreview()}
        <div className='options-btn' onClick={this.openOptions.bind(this)}>
          <i className='material-icons'>more_horiz</i>
          {this.renderOptionsMenu()}
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  entry: React.PropTypes.object.isRequired,
  styleOptions: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};
