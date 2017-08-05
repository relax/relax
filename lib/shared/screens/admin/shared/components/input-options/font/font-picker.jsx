import Component from 'components/component';
import {filterFontFamily} from 'helpers/utils';
import defaultFonts from 'statics/default-fonts';
import defaultFvds from 'statics/default-fvds';
import forEach from 'lodash/forEach';
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import Font from './font';
import styles from './font-picker.less';

export default class FontPicker extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    fonts: PropTypes.object.isRequired
  };

  init () {
    this.onFamilyChange = this.onChange.bind(this, 'family');
    this.onFVDChange = this.onChange.bind(this, 'fvd');
  }

  getChangedValue (key, value) {
    const newValue = Object.assign({}, this.props.value);

    newValue[key] = value;

    if (key === 'family') {
      // check if current fvd exists
      const family = value;
      const fvds = this.props.fonts[family];

      if (fvds && fvds.indexOf(newValue.fvd) === -1) {
        newValue.fvd = fvds[0];
      }
    }

    return newValue;
  }

  onChange (key, value) {
    const newValue = this.getChangedValue(key, value);
    this.props.onChange(newValue);
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderFont()}
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const {value, fonts} = this.props;
    const families = [];
    let fvds = [];

    if (fonts) {
      forEach(fonts, (fvdsArray, family) => {
        families.push({
          label: family,
          value: family
        });

        if (value.family && value.family === family) {
          forEach(fvdsArray, (fvd) => {
            fvds.push({
              label: fvd,
              value: fvd
            });
          });
        }
      });
    }

    forEach(defaultFonts, (defaultFont) => {
      families.push({
        label: defaultFont.label,
        value: defaultFont.value
      });

      if (value.family && value.family === defaultFont.value) {
        fvds = defaultFvds;
      }
    });

    return (
      <div className={styles.options}>
        <Dropdown
          entries={families}
          value={value.family}
          label={filterFontFamily(value.family || '')}
          onChange={this.onFamilyChange}
          className={styles.fontsDropdown}
          family
        />
        <span className={styles.sep}></span>
        <Dropdown
          entries={fvds}
          value={value.fvd}
          label={value.fvd}
          onChange={this.onFVDChange}
          className={styles.typeDropdown}
          fvd
        />
      </div>
    );
  }

  renderFont () {
    const {value} = this.props;
    let result;

    if (typeof value === 'object' && value.family && value.fvd) {
      result = (
        <Font
          family={value.family}
          fvd={value.fvd}
          text={'Abc'}
        />
      );
    } else {
      result = (
        <div className={styles.warning}>No font selected yet</div>
      );
    }

    return result;
  }
}
