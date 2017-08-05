import bind from 'decorators/bind';
import cx from 'classnames';
import {getBestImageUrl} from 'helpers/utils';
import Balloon from 'components/balloon';
import ColorPicker from 'components/input-options/color';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './entry.less';
import EditImage from './edit-image';

export default class BackgroundEntry extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['color', 'image']).isRequired,
    value: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    opened: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    toggleOpened: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      ready: false
    };
  }

  @bind
  toggleOpened () {
    const {toggleOpened, index} = this.props;
    toggleOpened(index);
  }

  @bind
  onChange (value) {
    const {onChange, index, type} = this.props;
    onChange(index, {
      type,
      value
    });
  }

  @bind
  onRemove (event) {
    const {onRemove, index} = this.props;

    event.preventDefault();
    event.stopPropagation();

    onRemove(index);
  }

  render () {
    const {type} = this.props;
    let result;

    if (type === 'color') {
      result = this.renderColor();
    } else {
      result = this.renderImage();
    }

    return result;
  }

  renderColor () {
    const {value} = this.props;

    return (
      <div className={styles.colorHolder}>
        <ColorPicker
          value={value}
          onChange={this.onChange}
          className={styles.colorPicker}
          gradients
        />
        <i
          className={cx(
            styles.removeButton,
            'nc-icon-mini ui-1_trash-simple'
          )}
          onClick={this.onRemove}
        />
      </div>
    );
  }

  renderImage () {
    const {value} = this.props;
    const style = {};

    if (value.image) {
      const url = getBestImageUrl(value.image, 36, 36);
      style.background = `url(${url})`;
    }

    return (
      <div
        onClick={this.toggleOpened}
        className={styles.image}
        ref={(ref) => {
          this.ref = ref;
          !this.state.ready && this.setState({ready: true});
        }}
      >
        <div className={styles.preview} style={style} />
        <div className={styles.info}>
          {`${value.size}, x ${value.x} y ${value.y} ${value.repeat}`}
        </div>
        <i
          className={cx(
            styles.removeButton,
            'nc-icon-mini ui-1_trash-simple'
          )}
          onClick={this.onRemove}
        />
        {this.renderImageOpened()}
      </div>
    );
  }

  renderImageOpened () {
    const {value, opened} = this.props;

    if (opened && this.state.ready) {
      return (
        <Balloon element={this.ref} stickOptions={{horizontalPosition: 'center'}}>
          <EditImage
            value={value}
            onChange={this.onChange}
            onClose={this.toggleOpened}
          />
        </Balloon>
      );
    }
  }
}
