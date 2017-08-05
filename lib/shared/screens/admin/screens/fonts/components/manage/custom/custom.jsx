import cx from 'classnames';
import Component from 'components/component';
import Upload from 'components/upload';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './custom.less';
import Font from './font';

export default class CustomFonts extends Component {
  static propTypes = {
    fonts: PropTypes.array.isRequired,
    tempFonts: PropTypes.array.isRequired,
    addCustomFonts: PropTypes.func.isRequired,
    removeCustomTempFont: PropTypes.func.isRequired,
    removeCustomFont: PropTypes.func.isRequired
  };

  render () {
    const {fonts, tempFonts, addCustomFonts} = this.props;

    return (
      <div>
        <div>
          {fonts.map(this.renderFont, this)}
          {tempFonts.map(this.renderTempFont, this)}
        </div>
        <Upload
          showInfos={false}
          onFiles={addCustomFonts}
          accept=''
          className={cx(styles.upload, (fonts.length || tempFonts.length) && styles.hasFonts)}
        >
          <div className={styles.uploadContent}>
            <div className={styles.title}>Drag your font files here</div>
            <div className={styles.sub}>OTF or TTF files only</div>
          </div>
        </Upload>
      </div>
    );
  }

  renderFont (font, key) {
    const {removeCustomFont} = this.props;

    return (
      <Font
        name={font.family}
        index={key}
        onRemove={removeCustomFont}
        key={key}
      />
    );
  }

  renderTempFont (font, key) {
    const {removeCustomTempFont} = this.props;

    return (
      <Font
        name={font.name}
        index={key}
        onRemove={removeCustomTempFont}
        isNew
        key={`${key}-temp`}
      />
    );
  }
}
