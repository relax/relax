import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import elements from 'elements';
import stylesManager from 'helpers/styles-manager';
import traverseChildren from 'helpers/traverser/children';
import traverser from 'helpers/traverser';
import Component from 'components/component';
import React, {PropTypes} from 'react';

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

    const styleClassMap = stylesManager.processElement({
      element,
      elements,
      styles,
      display,
      single: true
    });

    if (displayElement) {
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
            renderChildren: this.renderChildren,
            display
          }}
        >
          {children}
        </ElementClass>
      );
    }
  }
}
