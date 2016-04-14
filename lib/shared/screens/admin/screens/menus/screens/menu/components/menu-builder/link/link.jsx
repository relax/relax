import Component from 'components/component';
import Input from 'components/input-options/input';
import React, {PropTypes} from 'react';

import styles from './link.less';
import Entry from '../entry';

export default class Link extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    changeLabel: PropTypes.func.isRequired,
    changeUrl: PropTypes.func.isRequired
  };

  render () {
    const {changeLabel, changeUrl, label, url} = this.props;
    const item = {
      type: 'url',
      url,
      label
    };
    return (
      <div>
        <label className={styles.option}>
          <div className={styles.label}>Label</div>
          <Input value={label} onChange={changeLabel} white />
        </label>
        <label className={styles.option}>
          <div className={styles.label}>Link</div>
          <Input value={url} onChange={changeUrl} white />
        </label>
        <Entry item={item} />
      </div>
    );
  }
}
