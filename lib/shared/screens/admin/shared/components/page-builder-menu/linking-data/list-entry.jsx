import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './list-entry.less';

export default class LinkingDataListEntry extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object.isRequired
  };

  render () {
    const {schema} = this.props;
    return (
      <div className={styles.root}>
        {schema.title}
      </div>
    );
  }
}
