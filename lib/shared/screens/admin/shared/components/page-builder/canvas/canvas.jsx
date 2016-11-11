import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Portal from 'components/portal';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
import bind from 'decorators/bind';
import displays from 'statics/displays';
import get from 'lodash/get';
import isElementSelected from 'helpers/is-element-selected';
import stylesManager from 'helpers/styles-manager';
import traverseChildren from 'helpers/traverser/children';
import traverser from 'helpers/traverser';
import React, {PropTypes} from 'react';

import Empty from './empty';
import NoLinks from './no-links';
import classes from './canvas.less';

const defaultStyleClassMap = {};
const bodyDropInfo = {
  id: 'body',
  type: 'body',
  context: 'data'
};

export default class Canvas extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired,
    dragging: PropTypes.bool.isRequired,
    doc: PropTypes.object.isRequired,
    template: PropTypes.object,
    elements: PropTypes.object.isRequired,
    selected: PropTypes.object,
    editing: PropTypes.bool.isRequired,
    editingSymbol: PropTypes.bool.isRequired,
    updateStylesMap: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    dropHighlight: PropTypes.string.isRequired
  };

  getChildContext () {
    const {dragging} = this.props;
    return {
      dropHighlight: dragging ? 'vertical' : 'none'
    };
  }

  @bind
  onScroll () {
    window.dispatchEvent(new Event('scroll'));
  }

  @bind
  onCanvasClick () {
    const {pageBuilderActions} = this.props;
    pageBuilderActions.selectElement();
  }

  updateStylesMap () {
    this.props.updateStylesMap();
  }

  render () {
    const {display, template, doc, elements, type, editing} = this.props;
    const templateHasLinks = template && template.links && template.links[type];
    const bodyStyle = {
      maxWidth: displays[display]
    };

    let content = traverser({
      template,
      doc,
      display,
      elements,
      editing,
      type
    }, this.renderElement);
    this.updateStylesMap();

    if (!template) {
      content = (
        <Droppable
          key='body'
          type='body'
          placeholder
          placeholderRender={this.renderPlaceholder}
          dropInfo={bodyDropInfo}
        >
          {content}
        </Droppable>
      );
    }

    return (
      <Scrollable className={classes.canvas} onScroll={this.onScroll}>
        <div className={classes.content} style={bodyStyle} ref='body' id='pb-canvas' onClick={this.onCanvasClick}>
          {content}
        </div>
        {template && !templateHasLinks && <NoLinks templateId={template._id} />}
        <Styles />
      </Scrollable>
    );
  }

  @bind
  renderPlaceholder () {
    const {pageBuilderActions} = this.props;
    return (
      <Empty pageBuilderActions={pageBuilderActions} />
    );
  }

  @bind
  renderChildren (options) {
    const {doc, display, elements, type, editing, template} = this.props;

    // calculate data from context
    let data;
    if (!options.data) {
      if (template && options.context === template._id) {
        // belongs to template
        data = template.data;
      } else {
        // belongs to page
        data = doc[options.context];
      }
    }

    return traverseChildren(Object.assign({data}, options), {
      doc,
      display,
      elements,
      editing,
      type
    }, this.renderElement);
  }

  @bind
  renderChildChildren (options) {
    const result = this.renderChildren(options);
    this.updateStylesMap();

    return result;
  }

  @bind
  renderElement (elementInfo, children) {
    const {styles, elements, display, selected} = this.props;
    const {
      ElementClass,
      displayElement,
      props,
      elementId,
      context,
      element,
      positionInParent,
      editable,
      elementLinks,
      builderLink,
      isTemplate
    } = elementInfo;

    const styleMap = stylesManager.processElement({
      element,
      context,
      elements,
      styles,
      display
    });

    if (displayElement) {
      const isFixed = get(styleMap, 'resultValues.position.position', 'static') === 'fixed';
      let result;
      let resultChildren = children;

      if (builderLink) {
        resultChildren = (
          <Droppable
            key={`${context}-${elementId}-body`}
            type='body'
            placeholder
            placeholderRender={this.renderPlaceholder}
            dropInfo={{
              id: 'body',
              context: builderLink.property
            }}
          >
            {children}
          </Droppable>
        );
      }

      const renderedElement = (
        <ElementClass
          key={`${context}-${elementId}`}
          styleClassMap={styleMap && styleMap.classMap || defaultStyleClassMap}
          {...props}
          relax={{
            editing: editable,
            context,
            element,
            positionInParent,
            elementLinks,
            isTemplate,
            renderChildren: this.renderChildChildren,
            display,
            styleValues: styleMap && styleMap.resultValues || {},
            selected: selected && isElementSelected(selected, {
              id: elementId,
              context
            })
          }}
        >
          {resultChildren}
        </ElementClass>
      );

      if (isFixed) {
        result = (
          <Portal attachTo='pb-canvas'>
            {renderedElement}
          </Portal>
        );
      } else {
        result = renderedElement;
      }

      return result;
    }
  }
}
