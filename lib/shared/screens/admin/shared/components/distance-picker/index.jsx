import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Value from './value';

export default class DistancePicker extends Component {
  static propTypes = {
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    inside: PropTypes.bool,
    label: PropTypes.string
  };

  static defaultProps = {
    width: '100px',
    height: '100px'
  };

  render () {
    const {width, height, top, right, bottom, left, onChange, className, inside, label} = this.props;
    const style = {
      width,
      height
    };

    return (
      <div className={cx(styles.root, className)} style={style}>
        <Value
          property='top'
          value={top}
          onChange={onChange}
          inside={inside}
        />
        <Value
          property='right'
          value={right}
          onChange={onChange}
          inside={inside}
        />
        <Value
          property='bottom'
          value={bottom}
          onChange={onChange}
          inside={inside}
          label={label}
        />
        <Value
          property='left'
          value={left}
          onChange={onChange}
          inside={inside}
        />
      </div>
    );
  }
}
