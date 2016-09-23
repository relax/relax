import React, {PropTypes} from 'react';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import Option from './option';
import styles from './options.less';
import cx from 'classnames';
import Scrollable from 'components/scrollable';

export default class Options extends Component {
  static propTypes = {
    labels: PropTypes.array,
    values: PropTypes.array.isRequired,
    element: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  render () {
    const {labels, values, element, white, onClose} = this.props;

    const style = {
      width: element.getBoundingClientRect().width
    };

    return (
      <Portal>
        <Stick
          element={element}
          verticalPosition='bottom'
          horizontalPosition='left'
          transition='slideUpIn'
          horizontalOffset={0}
          verticalOffset={3}
          onClose={onClose}
        >
          <div className={cx(styles.root, white && styles.white)} style={style}>
            <Scrollable>
              {(labels || values).map(this.renderOption, this)}
            </Scrollable>
          </div>
        </Stick>
      </Portal>
    );
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
