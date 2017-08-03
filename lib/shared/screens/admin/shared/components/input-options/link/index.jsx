import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Type from './type';
import styles from './index.less';

const types = [
  {
    type: 'external',
    icon: 'nc-icon-outline ui-2_link-72',
    label: 'External'
  },
  {
    type: 'internal',
    icon: 'nc-icon-outline ui-2_webpage',
    label: 'Page'
  },
  {
    type: 'anchor',
    icon: 'nc-icon-outline objects_anchor',
    label: 'Anchor'
  }
];

const formSubmitOption = {
  type: 'form',
  icon: 'nc-icon-outline ui-1_email-85',
  label: 'Form Submit'
};

const typesOptions = {
  external: [
    {
      label: 'Url',
      id: 'url',
      type: 'String'
    }
  ],
  internal: [
    {
      label: 'Page',
      id: 'page',
      type: 'TitablePicker',
      props: {
        type: 'pages'
      }
    }
  ],
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
    formSubmit: PropTypes.bool,
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
    const {white, formSubmit} = this.props;

    return (
      <div className={cx(styles.root, white && styles.white)}>
        <div>
          {types.map(this.renderType, this)}
          {formSubmit && this.renderType(formSubmitOption, 'form')}
        </div>
        {this.renderTypeOptions()}
      </div>
    );
  }

  renderType (type, key) {
    const {white, value, formSubmit} = this.props;

    return (
      <Type
        {...type}
        onClick={this.onTypeChange}
        active={value && value.type === type.type}
        white={white}
        small={!!formSubmit}
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
        <div className={styles.options}>
          <OptionsList
            options={options}
            values={value.options || {}}
            onChange={this.onTypeOptionChange}
            white={white}
            tight
          />
        </div>
      );
    }
  }
}
