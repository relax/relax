import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: {
      pages: {
        _id: 1,
        title: 1
      }
    }
  })
)
export default class PagePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  static defaultProps = {
    pages: []
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
