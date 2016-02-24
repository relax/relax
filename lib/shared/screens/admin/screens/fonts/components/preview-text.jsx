import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './preview-text.less';

export default class PreviewText extends Component {
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
      <input className={styles.root} value={value} onChange={::this.onChange} placeholder='Preview Text' />
    );
  }
}
