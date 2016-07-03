import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Type from './type';

const types = [
  {
    type: 'external',
    icon: 'nc-icon-mini ui-2_link-72'
  },
  {
    type: 'internal',
    icon: 'nc-icon-mini ui-2_webpage'
  },
  {
    type: 'anchor',
    icon: 'nc-icon-mini objects_anchor'
  }
];

const typesOptions = {
  external: [
    {
      label: 'Url',
      id: 'url',
      type: 'String'
    }
  ],
  internal: [],
  anchor: [
    {
      label: 'Anchor to section',
      id: 'anchor',
      type: 'String'
    }
  ]
};

export default class LinkInputOption extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    white: PropTypes.bool,
    OptionsList: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: {
      type: 'external',
      options: {}
    }
  };

  @bind
  onTypeChange (type) {
    const {value, onChange} = this.props;

    onChange(Object.assign({}, value, {
      type
    }));
  }

  @bind
  onTypeOptionChange (id, val) {
    const {value, onChange} = this.props;

    onChange(Object.assign({}, value, {
      options: Object.assign({}, value.options, {
        [id]: val
      })
    }));
  }

  render () {
    return (
      <div>
        <div>
          {types.map(this.renderType, this)}
        </div>
        <div className={styles.options}>
          {this.renderTypeOptions()}
        </div>
      </div>
    );
  }

  renderType (type, key) {
    const {white, value} = this.props;
    return (
      <Type
        {...type}
        onClick={this.onTypeChange}
        active={value && value.type === type.type}
        white={white}
        key={key}
      />
    );
  }

  renderTypeOptions () {
    const {value, OptionsList, white} = this.props;
    const type = value && value.type;
    const options = type && typesOptions[type];

    if (options) {
      return (
        <OptionsList
          options={options}
          values={value.options || {}}
          onChange={this.onTypeOptionChange}
          white={white}
        />
      );
    }
  }
}
