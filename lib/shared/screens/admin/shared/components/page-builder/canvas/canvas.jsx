import Component from 'components/component';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
import bind from 'decorators/bind';
import displays from 'statics/displays';
import React from 'react';
import PropTypes from 'prop-types';

import NoLinks from './no-links';
import PageElement from './page-element';
import classes from './canvas.less';

export default class Canvas extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    template: PropTypes.object,
    updateStylesMap: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    building: PropTypes.bool.isRequired
  };

  @bind
  onScroll () {
    window.dispatchEvent(new Event('scroll'));
  }

  render () {
    const {display} = this.props;
    const bodyStyle = {
      maxWidth: displays[display]
    };

    return (
      <Scrollable className={classes.canvas} onScroll={this.onScroll}>
        <div className={classes.content} style={bodyStyle} ref='Body' id='pb-canvas'>
          {this.renderContent()}
        </div>
        {this.renderNoLinks()}
        <Styles />
      </Scrollable>
    );
  }

  renderNoLinks () {
    const {template, type} = this.props;
    const templateHasLinks = !!(template && template.links && template.links[type]);

    if (template && !templateHasLinks) {
      return <NoLinks templateId={template._id} />;
    }
  }

  renderContent () {
    const {template, type, updateStylesMap, editing, building} = this.props;
    const hasTemplate = !!template;

    const result = (
      <PageElement
        id='Body'
        contextDoc={hasTemplate ? 'template' : 'draft'}
        contextProperty='data'
        links={template && template.links && template.links[type]}
        linksData='draft'
        updateStylesMap={updateStylesMap}
        positionInParent={0}
        editable={!hasTemplate}
        editing={editing}
        building={building}
      />
    );

    updateStylesMap();

    return result;
  }
}
