import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './list.less';
import Entry from './entry';
import Manage from './manage';

export default class List extends Component {
  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired,
    display: PropTypes.oneOf(['grid', 'list']).isRequired,
    fontsActions: PropTypes.object.isRequired
  };

  render () {
    const {fonts, previewText, display} = this.props;
    let list = [];
    let result;

    if (fonts.fonts) {
      forEach(fonts.fonts, (variants, family) => {
        list = variants.map((fvd) => {
          const key = (family + fvd).replace(/ /g, '_');
          return (
            <Entry
              key={key}
              family={family}
              fvd={fvd}
              text={previewText || (display === 'grid' ? 'Abc' : 'Relax the fonts up')}
              display={display}
            />
          );
        }, this);
      });
    }

    if (list.length > 0) {
      result = (
        <div>
          {list}
        </div>
      );
    } else {
      result = this.renderNoContent();
    }

    return result;
  }

  renderNoContent () {
    const {fonts, fontsActions} = this.props;

    return (
      <div className={styles.noFonts}>
        <div className={styles.noTitle}>Add new fonts!</div>
        <div className={styles.noText}>
          <span>Design and build your creations with amazing fonts from the</span>
          <br />
          <span>best providers or even your own.</span>
        </div>
        <Manage fonts={fonts} fontsActions={fontsActions} />
      </div>
    );
  }
}
