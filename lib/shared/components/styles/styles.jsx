import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Component as Jss} from 'relax-jss';

export default class Styles extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };

  render () {
    const {styles} = this.props;
    const styleTags = [];

    forEach(styles, (styleMap, key) => {
      styleTags.push(
        <Jss stylesheet={styleMap.stylesheet} key={key} />
      );
    });

    return (
      <div>{styleTags}</div>
    );
  }
}
