import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './types.less';

export default class Types extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    changeToSolid: PropTypes.func.isRequired,
    changeToLinear: PropTypes.func.isRequired,
    changeToRadial: PropTypes.func.isRequired
  };

  render () {
    const {type} = this.props;

    return (
      <div className={styles.types}>
        <div
          className={cx(styles.type, styles.solid, type !== 'linear' && type !== 'radial' && styles.active)}
          onClick={this.props.changeToSolid}
        />
        <div
          className={cx(styles.type, styles.linear, type === 'linear' && styles.active)}
          onClick={this.props.changeToLinear}
        />
        <div
          className={cx(styles.type, styles.radial, type === 'radial' && styles.active)}
          onClick={this.props.changeToRadial}
        />
      </div>
    );
  }
}
