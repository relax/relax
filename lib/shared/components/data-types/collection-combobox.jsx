import React from 'react';
import {Component} from 'relax-framework';
import Combobox from './combobox';
import forEach from 'lodash.foreach';

export default class CollectionCombobox extends Component {
  getInitState () {
    return {
      entries: []
    };
  }

  getInitialCollections () {
    return {
      entries: this.props.store.getCollection()
    };
  }

  render () {
    let labels = [], values = [];

    forEach(this.state.entries, (entry) => {
      labels.push(entry.title);
      values.push(entry[this.props.property]);
    });

    return (
      <Combobox
        labels={labels}
        values={values}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

CollectionCombobox.defaultProps = {
  property: 'slug'
};

CollectionCombobox.propTypes = {
  store: React.PropTypes.any.isRequired,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  property: React.PropTypes.string.isRequired
};
