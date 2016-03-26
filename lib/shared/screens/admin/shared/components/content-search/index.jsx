import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentSearch extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    const {value} = this.props;
    return (
      <label className={styles.root}>
        <i className='nc-icon-outline ui-1_zoom'></i>
        <input
          className={styles.input}
          type='text'
          value={value}
          placeholder='Search'
          onChange={::this.onChange}
        />
      </label>
    );
  }
}
