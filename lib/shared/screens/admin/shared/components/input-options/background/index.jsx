import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';
import Entry from './entry';

export default class BackgroundInputOption extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: []
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggleOpened (index) {
    if (this.state.opened === index) {
      this.setState({
        opened: false
      });
    } else {
      this.setState({
        opened: index
      });
    }
  }

  @bind
  onLayerChange (index, changedLayer) {
    const {value = [], onChange} = this.props;
    const newValue = value.slice(0);

    newValue.splice(index, 1, changedLayer);
    onChange(newValue);
  }

  addLayer (layer) {
    const {onChange, value = []} = this.props;
    const newValue = value.slice(0);

    newValue.unshift(layer);
    onChange(newValue);
  }

  @bind
  addColorLayer () {
    this.addLayer({
      type: 'color',
      value: {}
    });
  }

  @bind
  addImageLayer () {
    this.addLayer({
      type: 'image',
      value: {
        size: 'cover',
        x: '50%',
        y: '50%',
        repeat: 'no-repeat',
        width: '50px',
        height: '50px'
      }
    });
  }

  @bind
  onRemove (index) {
    const {onChange, value = []} = this.props;
    const newValue = value.slice(0);

    newValue.splice(index, 1);
    onChange(newValue);
  }

  render () {
    const {value = []} = this.props;

    return (
      <div>
        <div className={styles.addButtons}>
          <div className={styles.addButton} onClick={this.addColorLayer}>
            <i className='nc-icon-mini ui-1_drop' />
            <span>Add Color</span>
          </div>
          <div className={styles.addButton} onClick={this.addImageLayer}>
            <i className='nc-icon-mini design_image' />
            <span>Add Image</span>
          </div>
        </div>
        <div>
          {value.map(this.renderProperty, this)}
        </div>
      </div>
    );
  }

  renderProperty (prop, index) {
    const {opened} = this.state;

    return (
      <Entry
        key={index}
        index={index}
        type={prop.type}
        value={prop.value}
        opened={opened === index}
        onChange={this.onLayerChange}
        onRemove={this.onRemove}
        toggleOpened={this.toggleOpened}
      />
    );
  }
}
