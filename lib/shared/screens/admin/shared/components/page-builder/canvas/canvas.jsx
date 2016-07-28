import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import displays from 'helpers/displays';
import getElementProps from 'helpers/get-element-props';
import stylesManager from 'helpers/styles-manager';
import utils from 'helpers/utils';
import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
import Symbol from 'elements/symbol';
import React, {PropTypes} from 'react';

import classes from './canvas.less';
import Empty from './empty';

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
    selectedId: PropTypes.string,
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

  @debounce(10)
  updateStylesMap () {
    this.props.updateStylesMap(stylesManager.stylesMap);
  }

  render () {
    const {display, template} = this.props;
    const bodyStyle = {
      margin: '0 auto',
      maxWidth: displays[display]
    };

    const content = template ? this.renderTemplate() : this.renderContent();
    this.updateStylesMap();

    return (
      <Scrollable className={classes.canvas} onScroll={this.onScroll}>
        <div className={classes.content} style={bodyStyle} ref='body'>
          {content}
        </div>
        <Styles />
      </Scrollable>
    );
  }

  renderTemplate () {
    const {template, type} = this.props;

    if (template && template.data && template.data.body) {
      return this.renderChildren(template.data.body.children, {
        links: template.links && template.links[type],
        customData: template,
        editing: false
      });
    }
  }

  renderContent () {
    const {doc, editingSymbol, type} = this.props;
    let content;

    if (doc && doc.data && doc.data.body) {
      content = this.renderChildren(doc.data.body.children, {
        links: type !== 'template' && doc.links,
        disableSelection: editingSymbol
      });
    }

    return (
      <Droppable
        type='body'
        placeholder
        placeholderRender={this.renderPlaceholder}
        dropInfo={bodyDropInfo}
        accepts='Section'
        minHeight='100%'
      >
        {content}
      </Droppable>
    );
  }

  @bind
  renderPlaceholder () {
    const {pageBuilderActions} = this.props;
    return (
      <Empty pageBuilderActions={pageBuilderActions} />
    );
  }

  renderChildren (children, options) {
    let result;

    if (children instanceof Array) {
      result = children.map(this.renderElement.bind(this, options));
    } else {
      result = children;
    }

    return result;
  }

  @bind
  renderChildrenSub (...params) {
    const result = this.renderChildren(...params);
    this.updateStylesMap();
    return result;
  }

  @bind
  renderElementSub (...params) {
    const result = this.renderElement(...params);
    this.updateStylesMap();
    return result;
  }

  renderElement (options, elementId, positionInParent) {
    const {
      doc,        // current document
      display,    // current display ex: desktop
      editing,    // editing boolean
      elements,   // page builder elements
      selectedId, // current selected element id
      styles      // styles
    } = this.props;

    let element =
      options.customData && options.customData[elementId] ||  // from custom data in options
      doc[options.context][elementId];                        // from current draft document with context

    // get element props according to display
    const elementProps = getElementProps(element, display);

    // linked data to components
    const elementLinks = options.links && options.links[element.id];
    if (elementLinks) {
      element = utils.alterSchemaElementProps(
        elementLinks,
        element,
        doc,
        elementProps
      );
    }

    // get element styles class map
    const styleClassMap = stylesManager.processElement(
      element,
      elementProps,
      elements[element.tag],
      styles,
      elements,
      display
    );

    if ((!element.hide || !element.hide[display]) && element.display !== false) {
      const ElementClass = element.tag === 'Symbol' ? Symbol : elements[element.tag];
      const selected = selectedId === element.id;

      // element children calc
      let children;
      if (element.tag !== 'Symbol' && element.children) {
        children = this.renderChildren(element.children, options);
      }

      return (
        <ElementClass
          {...elementProps}
          styleClassMap={styleClassMap || defaultStyleClassMap}
          key={elementId}
          relax={{
            editing: typeof options.editing !== 'undefined' ? options.editing : editing,
            disableSelection: options.disableSelection,
            display,
            selected,
            element,
            positionInParent,
            renderElement: this.renderElementSub,
            renderChildren: this.renderChildrenSub,
            insideSymbol: options.customData && true,
            dispatch: this.context.store.dispatch
          }}
        >
          {children}
        </ElementClass>
      );
    }
  }
}
