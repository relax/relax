import Component from 'components/component';
import Portal from 'components/portal';
import Scrollable from 'components/scrollable';
import Stick from 'components/stick';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Option from './option';
import styles from './options.less';

export default class Options extends Component {
  static propTypes = {
    labels: PropTypes.array,
    values: PropTypes.array.isRequired,
    element: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    white: PropTypes.bool,
    scroll: PropTypes.bool,
    style: PropTypes.object,
    zIndex: PropTypes.number
  };

  render () {
    const {element, white, onClose, scroll, zIndex} = this.props;

    const style = Object.assign({
      width: element.getBoundingClientRect().width
    }, this.props.style);

    return (
      <Portal>
        <Stick
          element={element}
          verticalPosition='bottom'
          horizontalPosition='left'
          transition='slideDownIn'
          horizontalOffset={0}
          verticalOffset={-1}
          onClose={onClose}
          zIndex={zIndex}
        >
          <div className={cx(styles.root, white && styles.white, scroll && styles.scroll)} style={style}>
            {this.renderContent()}
          </div>
        </Stick>
      </Portal>
    );
  }

  renderContent () {
    const {labels, values, scroll} = this.props;
    let children = (labels || values).map(this.renderOption, this);

    if (!children.length) {
      children = (
        <div className={styles.empty}>No options to pick</div>
      );
    }

    let result;
    if (scroll) {
      result = (
        <Scrollable>
          {children}
        </Scrollable>
      );
    } else {
      result = children;
    }

    return result;
  }

  renderOption (label, index) {
    const {onChange, values, white} = this.props;
    const value = values[index];

    return (
      <Option
        key={index}
        value={value}
        label={label}
        onClick={onChange}
        white={white}
      />
    );
  }
}
