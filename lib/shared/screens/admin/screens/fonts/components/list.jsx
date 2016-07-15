import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired,
    display: PropTypes.oneOf(['grid', 'list']).isRequired
  };

  render () {
    const {fonts, previewText, display} = this.props;
    let list = [];

    forEach(fonts, (variants, family) => {
      list = list.concat(variants.map((fvd) => {
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
      }, this));
    });

    return (
      <div>{list}</div>
    );
  }
}
