import Component from 'components/component';
import bind from 'decorators/bind';
import stylesManager from 'helpers/styles-manager';
import React from 'react';
import PropTypes from 'prop-types';

import PageElement from './page-element';

export default class Viewer extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    type: PropTypes.string.isRequired,
    ready: PropTypes.bool,
    display: PropTypes.string.isRequired,
    styles: PropTypes.array,
    updateStylesMap: PropTypes.func.isRequired
  };

  @bind
  updateStylesMap () {
    this.props.updateStylesMap(stylesManager.stylesMap);
  }

  render () {
    const {ready, doc} = this.props;
    const style = {};

    if (!ready) {
      style.display = 'none';
    }

    return (
      <div style={style}>
        {doc && this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {doc, template, type, display} = this.props;
    const hasTemplate = !!template;
    const fragments = {
      draft: doc,
      template
    };

    const result = (
      <PageElement
        id='Body'
        contextDoc={hasTemplate ? 'template' : 'draft'}
        contextProperty='data'
        links={template && template.links && template.links[type]}
        linksData='draft'
        updateStylesMap={this.updateStylesMap}
        positionInParent={0}
        fragments={fragments}
        display={display}
      />
    );

    this.updateStylesMap();

    return result;
  }
}
