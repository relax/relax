import dataConnect from 'decorators/data-connector';
import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

@dataConnect()
@connect(
  (state) => ({
    pages: state.pages.data.items
  })
)
export default class PagePickerContainer extends Component {
  static fragments = {
    pages: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchData({
      fragments: this.constructor.fragments
    });
  }

  render () {
    const labels = [];
    const values = [];

    forEach(this.props.pages, (page) => {
      labels.push(page.title);
      values.push(page._id);
    });

    return (
      <Combobox
        value={this.props.value}
        onChange={this.props.onChange}
        values={values}
        labels={labels}
      />
    );
  }
}
