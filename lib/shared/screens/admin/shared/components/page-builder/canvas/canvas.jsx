import bind from 'decorators/bind';
import displays from 'statics/displays';
import isElementSelected from 'helpers/is-element-selected';
import stylesManager from 'helpers/styles-manager';
import traverseChildren from 'helpers/traverser/children';
import traverser from 'helpers/traverser';
import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
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

  updateStylesMap () {
    this.props.updateStylesMap(stylesManager.stylesMap);
  }

  render () {
    const {display, template, doc, elements, type, editing} = this.props;
    const bodyStyle = {
      margin: '0 auto',
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
        <div className={classes.content} style={bodyStyle} ref='body'>
          {content}
        </div>
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
      builderLink
    } = elementInfo;

    const styleClassMap = stylesManager.processElement({
      element,
      elements,
      styles,
      display
    });

    if (displayElement) {
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

      return (
        <ElementClass
          key={`${context}-${elementId}`}
          styleClassMap={styleClassMap || defaultStyleClassMap}
          {...props}
          relax={{
            editing: editable,
            context,
            element,
            positionInParent,
            elementLinks,
            renderChildren: this.renderChildChildren,
            display,
            selected: selected && isElementSelected(selected, {
              id: elementId,
              context
            })
          }}
        >
          {resultChildren}
        </ElementClass>
      );
    }
  }
}
