import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import forEach from 'lodash/forEach';
import React from 'react';
import PropTypes from 'prop-types';

import Options from './options';
import styles from './index.less';

export default class Combobox extends Component {
  static propTypes = {
    labels: PropTypes.array,
    values: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    white: PropTypes.bool,
    zIndex: PropTypes.number
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  @bind
  optionClicked (value) {
    const {onChange} = this.props;

    onChange && onChange(value);

    this.setState({
      opened: false
    });
  }

  render () {
    const {values, labels, value, className, style, white} = this.props;
    const {opened} = this.state;

    let label = '';
    forEach(values, (valueIt, key) => {
      if (value === valueIt) {
        label = labels && labels[key] || valueIt;
      }
    });

    return (
      <div
        className={cx(
          styles.combobox,
          white && styles.white,
          opened && styles.opened,
          className
        )}
        style={style}
        ref={(ref) => {this.ref = ref;}}
        onClick={this.toggle}
      >
        <div className={styles.selectedText}>{label}</div>
        <div className={styles.button}>
          <i
            className={cx(
              'nc-icon-mini',
              opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
            )}
          />
        </div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    if (this.state.opened) {
      const {labels, values, white, zIndex} = this.props;

      const style = {};
      let scroll = true;
      if (values.length <= 5) {
        const len = values.length || 2;
        style.height = `${len * 30}px`;
        scroll = false;
      }

      return (
        <Options
          values={values}
          labels={labels}
          white={white}
          style={style}
          scroll={scroll}
          zIndex={zIndex}
          element={this.ref}
          onClose={this.toggle}
          onChange={this.optionClicked}
        />
      );
    }
  }
}
