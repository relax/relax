import cx from 'classnames';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Balloon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.any.isRequired,
    stickOptions: PropTypes.object,
    white: PropTypes.bool,
    small: PropTypes.bool,
    unpadded: PropTypes.bool
  };

  render () {
    const {stickOptions, white, small, unpadded} = this.props;
    const stickProps = Object.assign({
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      transition: 'slideUpIn',
      horizontalOffset: -9
    }, stickOptions);

    return (
      <Portal>
        <Stick element={this.props.element} {...stickProps}>
          <div className={cx(
            styles.balloon,
            white && styles.white,
            small && styles.small,
            unpadded && styles.unpadded
          )}
          >
            <span className={styles.triangle} />
            <div>
              {this.props.children}
            </div>
          </div>
        </Stick>
      </Portal>
    );
  }
}
