import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import styleSettings from './style';

export default class ColumnsElement extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static defaultChildren = [
    {tag: 'Column'}, {tag: 'Column'}
  ];
  static propsSchema = propsSchema;
  static settings = settings;
  static style = styleSettings;

  render () {
    const {styleClassMap, relax, Element} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        settings={settings}
        className={styleClassMap.root}
      >
        {this.renderContent()}
      </Element>
    );
  }

  renderContent () {
    const {relax, renderChildren, styleClassMap} = this.props;

    const spacingHor = parseFloat(relax.styleValues.spacing, 10) / 2;
    const spacingVer = parseFloat(relax.styleValues.spacingRows, 10) / 2;

    return renderChildren({
      customDropProps: {
        className: styleClassMap.table
      },
      customChildrenProps: {
        spacingHor,
        spacingVer
      }
    });
  }
}
