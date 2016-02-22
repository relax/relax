import utils from 'helpers/utils';
import Component from 'components/component';
import React from 'react';

import styles from './font.less';

export default class Font extends Component {
  static propTypes = {
    input: React.PropTypes.bool,
    style: React.PropTypes.object,
    family: React.PropTypes.string,
    fvd: React.PropTypes.string,
    onChange: React.PropTypes.func,
    text: React.PropTypes.string
  };

  render () {
    const style = Object.assign({}, this.props.style);
    style.fontFamily = this.props.family;
    utils.processFVD(style, this.props.fvd);

    return (
      <div
        className={styles.font}
        style={style}
      >
        {this.props.text}
      </div>
    );
  }
}
