import cx from 'classnames';
import Component from 'components/component';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Scrollable extends Component {
  static propTypes = {
    children: PropTypes.node,
    autoshow: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    autoshow: true
  };

  render () {
    return (
      <div className={cx(this.props.className || styles.root, styles.scrollbar)}>
        <GeminiScrollbar autoshow={this.props.autoshow}>
          {this.props.children}
        </GeminiScrollbar>
      </div>
    );
  }
}
