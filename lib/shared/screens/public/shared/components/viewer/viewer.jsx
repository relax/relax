import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import elements from 'elements';
import stylesManager from 'helpers/styles-manager';
import traverseChildren from 'helpers/traverser/children';
import traverser from 'helpers/traverser';
import Component from 'components/component';
import get from 'lodash/get';
import React, {PropTypes} from 'react';
import Portal from 'components/portal';

const defaultStyleClassMap = {};
export default class Viewer extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    type: PropTypes.string.isRequired,
    styles: PropTypes.array,
    updateStylesMap: PropTypes.func.isRequired
  };

  @debounce(10)
  updateStylesMap () {
    this.props.updateStylesMap(stylesManager.stylesMap);
  }

  render () {
    const {doc, template, type} = this.props;
    let result;

    if (doc) {
      result = traverser({
        template,
        doc,
        display: 'desktop',
        elements,
        editing: false,
        type
      }, this.renderElement);

      this.updateStylesMap();
    } else {
      result = 'Loading';
    }

    return (
      <div>
        {result}
      </div>
    );
  }

  @bind
  renderChildren (options) {
    const {doc, type, template} = this.props;
    const display = 'desktop';

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

    const content = traverseChildren(Object.assign({data}, options), {
      doc,
      display,
      elements,
      editing: false,
      type
    }, this.renderElement);

    this.updateStylesMap();

    return content;
  }

  @bind
  renderElement (elementInfo, children) {
    const {styles} = this.props;
    const display = 'desktop';
    const {
      ElementClass,
      displayElement,
      props,
      elementId,
      context,
      element,
      positionInParent,
      editable,
      elementLinks
    } = elementInfo;

    const styleMap = stylesManager.processElement({
      element,
      elements,
      styles,
      display,
      single: true
    });

    if (displayElement) {
      const isFixed = get(styleMap, 'resultValues.position.position', 'static') === 'fixed';
      let result;

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
            renderChildren: this.renderChildren,
            display,
            styleValues: styleMap && styleMap.resultValues || {}
          }}
        >
          {children}
        </ElementClass>
      );

      if (isFixed) {
        result = (
          <Portal>
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
