import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired
  };

  render () {
    const {fonts, previewText} = this.props;
    const list = [];
    let result;

    if (fonts.fonts) {
      forEach(fonts.fonts, (variants, family) => {
        variants.map((fvd, ind) => {
          const key = (family + fvd).replace(/ /g, '_');
          list.push(
            <Entry
              key={key}
              family={family}
              fvd={fvd}
              text={previewText || 'Abc'}
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
      result = (
        <div>
          No fonts yet
        </div>
      );
    }

    return result;
  }
}
