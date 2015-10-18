import {Component} from 'relax-framework';
import React from 'react';
import styles from '../../styles';
import Entry from './entry';
import Edit from './edit';
// TODO Use EventEmitter from Node or something
// import {Events} from 'backbone';
import merge from 'lodash.merge';
import GeminiScrollbar from 'react-gemini-scrollbar';

export default class StylePicker extends Component {
  getInitialState () {
    styles.fetch();
    return {
      styles: styles.getEntriesByType(this.props.type),
      styleOptions: styles.getStyleOptionsByType(this.props.type)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({
        styles: styles.getEntriesByType(nextProps.type),
        styleOptions: styles.getStyleOptionsByType(nextProps.type)
      });
    }
  }

  componentDidMount () {
    super.componentDidMount();
    this.listenTo(styles, 'update', this.updatedStyles.bind(this));
  }

  comoponentWillUnmount () {
    this.stopListening();
  }

  updatedStyles () {
    this.setState({
      styles: styles.getEntriesByType(this.props.type)
    });
  }

  onClick (id) {
    this.props.onChange(id);
  }

  onAddNewClick (event) {
    event.preventDefault();
    this.setState({
      editing: true,
      editingValue: false
    });
  }

  onEditEntry (id) {
    this.setState({
      editing: true,
      editingValue: id
    });
  }

  onEditClose () {
    this.setState({
      editing: false,
      editingValue: false
    });
  }

  renderEdit () {
    if (this.state.editing) {
      return <Edit editing={this.state.editingValue} type={this.props.type} onClose={this.onEditClose.bind(this)} />;
    }
  }

  renderEntry (entry) {
    return (
      <Entry
        entry={entry}
        styleOptions={this.state.styleOptions}
        key={entry._id}
        onClick={this.onClick.bind(this)}
        selected={entry._id === this.props.value}
        editing={entry._id === this.state.editingValue || entry._id === 'temp'}
        onEdit={this.onEditEntry.bind(this)}
      />
    );
  }

  renderEntries () {
    if (this.state.styles.length > 0) {
      return this.state.styles.map(this.renderEntry, this);
    } else {
      return (
        <div className='none-info'>
          <i className='material-icons'>gps_fixed</i>
          <div>No entries in this style yet!</div>
          <a href='#' onClick={this.onAddNewClick.bind(this)}>add new style</a>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='style-picker'>
        <div className='content-scrollable'>
          <GeminiScrollbar autoshow={true}>
            {this.renderEntries()}
          </GeminiScrollbar>
        </div>
        <div className='add-style-btn' onClick={this.onAddNewClick.bind(this)}>
          <i className='material-icons'>add_circle_outline</i>
          <span>Add new style</span>
        </div>
        {this.renderEdit()}
      </div>
    );
  }
}

merge(StylePicker.prototype, Events);

StylePicker.propTypes = {
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired
};
