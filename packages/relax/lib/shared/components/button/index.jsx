import Component from 'components/component';
import cx from 'classnames';
import forEach from 'lodash/forEach';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    primary: PropTypes.bool,
    full: PropTypes.bool,
    big: PropTypes.bool,
    noBackground: PropTypes.bool,
    bordered: PropTypes.bool,
    grey: PropTypes.bool,
    small: PropTypes.bool,
    thin: PropTypes.bool,
    smallFont: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    primary: true,
    full: false,
    big: false,
    noBackground: false,
    bordered: false,
    smallFont: false,
    disabled: false
  };

  render () {
    const {onClick, className, ...classes} = this.props;

    let resultClassName = cx(styles.button, className);
    forEach(classes, (value, key) => {
      if (styles[key] && value) {
        resultClassName = cx(resultClassName, styles[key]);
      }
    });

    return (
      <button className={resultClassName} onClick={onClick} style={this.props.style}>
        {this.props.children}
      </button>
    );
  }
}
