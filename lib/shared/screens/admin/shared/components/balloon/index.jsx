import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Balloon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.any.isRequired
  };

  render () {
    return (
      <Portal>
        <Stick element={this.props.element} verticalPosition='bottom' horizontalPosition='left' transition='slideUpIn' horizontalOffset={-9}>
          <div className={styles.balloon}>
            <span className={styles.triangle}/>
            <div>
              {this.props.children}
            </div>
          </div>
        </Stick>
      </Portal>
    );
  }
}
