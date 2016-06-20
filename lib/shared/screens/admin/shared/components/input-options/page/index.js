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
    fetchData: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  static defaultProps = {
    pages: []
  };

  render () {
    const {white, pages, value, onChange} = this.props;
    const labels = [];
    const values = [];

    forEach(pages, (page) => {
      labels.push(page.title);
      values.push(page._id);
    });

    return (
      <Combobox
        value={value}
        onChange={onChange}
        values={values}
        labels={labels}
        white={white}
      />
    );
  }
}
