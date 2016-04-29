import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './column.less';

export default class Column extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    width: PropTypes.string,
    widthPerc: PropTypes.string,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  @bind
  onClick () {
    const {id, onClick} = this.props;
    onClick(id);
  }

  render () {
    const {selected, width, widthPerc, className} = this.props;

    const style = {};
    if (width === 'custom') {
      style.width = `${widthPerc}`;
    }

    return (
      <div
        style={style}
        className={cx(styles.root, className, selected && styles.active)}
        onClick={this.onClick}
      />
    );
  }
}
