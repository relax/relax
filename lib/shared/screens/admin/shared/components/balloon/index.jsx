import cx from 'classnames';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React from 'react';
import PropTypes from 'prop-types';
import key from 'keymaster';
import bind from 'decorators/bind';
import styles from './index.less';

export default class Balloon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.any.isRequired,
    stickOptions: PropTypes.object,
    white: PropTypes.bool,
    small: PropTypes.bool,
    unpadded: PropTypes.bool,
    className: PropTypes.string
  };

  componentDidMount () {
    key('esc', 'balloon', this.close);
    this.beforeScope = key.getScope();
    key.setScope('balloon');
  }

  componentWillUnmount () {
    key.unbind('esc', 'balloon');
    key.setScope(this.beforeScope);
  }

  @bind
  close () {
    const {stickOptions} = this.props;
    if (stickOptions && stickOptions.onClose) {
      stickOptions.onClose();
    }
  }

  render () {
    const {stickOptions, white, small, unpadded, className} = this.props;
    const stickProps = Object.assign({
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      transition: 'slideUpIn',
      horizontalOffset: -4,
      verticalOffset: 4
    }, stickOptions);

    return (
      <Portal>
        <Stick element={this.props.element} {...stickProps}>
          <div className={cx(
            styles.balloon,
            white && styles.white,
            small && styles.small,
            unpadded && styles.unpadded,
            className
          )}
          >
            <div>
              {this.props.children}
            </div>
          </div>
        </Stick>
      </Portal>
    );
  }
}
