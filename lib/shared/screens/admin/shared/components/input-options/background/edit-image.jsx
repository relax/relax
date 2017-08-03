import bind from 'decorators/bind';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React from 'react';
import PropTypes from 'prop-types';
import keymaster from 'keymaster';
import styles from './edit-image.less';

const options = [
  {
    type: 'Columns',
    options: [
      {
        type: 'Image',
        id: 'image'
      },
      {
        type: 'Buttons',
        label: 'Size',
        id: 'size',
        props: {
          vertical: true,
          values: ['cover', 'contain', 'custom'],
          labels: ['Cover', 'Contain', 'Custom']
        }
      }
    ]
  }
];

const positionRepeatOptions = [
  {
    type: 'Columns',
    options: [
      {
        label: 'X Position',
        type: 'Number',
        id: 'x',
        props: {
          allowed: ['%', 'px']
        }
      },
      {
        label: 'Y Position',
        type: 'Number',
        id: 'y',
        props: {
          allowed: ['%', 'px']
        }
      }
    ]
  },
  {
    type: 'Buttons',
    label: 'Repeat',
    id: 'repeat',
    props: {
      tooltips: ['No Repeat', 'Repeat', 'Repeat Horiz.', 'Repeat Vert.'],
      values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
      labels: [
        <i className='nc-icon-outline ui-1_simple-remove' />,
        <i className='nc-icon-outline arrows-2_corner-right-down' />,
        <i className='nc-icon-outline arrows-1_tail-right' />,
        <i className='nc-icon-outline arrows-1_tail-down' />
      ]
    }
  }
];

const customSizeOptions = [
  {
    type: 'Columns',
    options: [
      {
        label: 'Width',
        type: 'Number',
        id: 'width',
        props: {
          allowed: ['%', 'px']
        }
      },
      {
        label: 'Height',
        type: 'Number',
        id: 'height',
        props: {
          allowed: ['%', 'px']
        }
      }
    ]
  }
];

export default class EditImage extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  componentDidMount () {
    keymaster('esc', this.props.onClose);
  }

  componentWillUnmount () {
    keymaster.unbind('esc');
  }

  @bind
  onChange (key, val) {
    const {onChange, value} = this.props;

    onChange(Object.assign({}, value, {
      [key]: val
    }));
  }

  render () {
    const {value} = this.props;

    return (
      <div>
        <div className={styles.group}>
          <OptionsList
            options={options}
            values={value}
            onChange={this.onChange}
            white
            tight
          />
        </div>
        {
          value.size === 'custom' &&
          <div className={styles.group}>
            <OptionsList
              options={customSizeOptions}
              values={value}
              onChange={this.onChange}
              white
              tight
            />
          </div>
        }
        <OptionsList
          options={positionRepeatOptions}
          values={value}
          onChange={this.onChange}
          white
          tight
        />
      </div>
    );
  }
}
