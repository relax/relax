import cx from 'classnames';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import Component from 'components/component';

import styles from './index.less';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
    primary: PropTypes.boolean,
    full: PropTypes.boolean,
    big: PropTypes.boolean
  };

  static defaultProps = {
    primary: true,
    full: false,
    big: false
  };

  render () {
    const {onClick, ...classes} = this.props;

    let className = styles.button;
    forEach(classes, (value, key) => {
      if (styles[key] && value) {
        className = cx(className, styles[key]);
      }
    });

    return (
      <button className={className} onClick={onClick} style={this.props.style}>
        {this.props.children}
      </button>
    );
  }
}
