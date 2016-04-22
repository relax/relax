import bind from 'decorators/bind';
import Component from 'components/component';
import MediaItem from 'components/media-item-preview';
import MediaSelector from 'components/media-selector';
import React, {PropTypes} from 'react';

import styles from './picker.less';

export default class ImagePicker extends Component {
  static fragments = MediaItem.fragments;

  static propTypes = {
    width: PropTypes.any,
    height: PropTypes.number,
    calcWidth: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    selector: PropTypes.bool.isRequired,
    openSelector: PropTypes.func.isRequired,
    closeSelector: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    mediaItem: PropTypes.object,
    allowedType: PropTypes.string.isRequired
  };

  static defaultProps = {
    width: '100%',
    height: 135
  };

  componentDidMount () {
    const dom = this.refs.imageHolder;
    const rect = dom.getBoundingClientRect();

    const width = Math.round(rect.right - rect.left);

    this.props.onMount(width);
  }

  @bind
  unselect () {
    this.props.onChange(null);
  }

  render () {
    const {openSelector} = this.props;
    const style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div>
        <div className={styles.picker} style={style} onClick={openSelector}>
          <div className={styles.selected} ref='imageHolder'>
            {this.renderSelected()}
            <div className={styles.changeCover}>Choose Image</div>
          </div>
        </div>
        {this.renderUnselect()}
        {this.renderMediaSelector()}
      </div>
    );
  }

  renderUnselect () {
    const {value, width} = this.props;
    if (value) {
      return (
        <div
          className={styles.unselect}
          style={{width}}
          onClick={this.unselect}
        >
          Unselect Image
        </div>
      );
    }
  }

  renderSelected () {
    if (this.props.mounted && this.props.value && this.props.mediaItem && this.props.mediaItem._id) {
      return (
        <MediaItem
          mediaItem={this.props.mediaItem}
          width={this.props.calcWidth}
          height={this.props.height}
          useThumbnail={false}
        />
      );
    }
  }

  renderMediaSelector () {
    const {selector, value, closeSelector, onChange, allowedType} = this.props;
    if (selector) {
      return (
        <MediaSelector
          selected={value}
          onClose={closeSelector}
          onChange={onChange}
          allowedType={allowedType}
        />
      );
    }
  }
}
