import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './actions.less';
import Back from './back';
import Displays from './displays';
import RightMenu from './right-menu';
import Statuses from './statuses';

export default class Actions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        <Displays />
        <Back link={this.props.location.pathname} />
        <Statuses />
        <RightMenu />
      </div>
    );
  }
}
