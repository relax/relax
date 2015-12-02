import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {Component as JSS} from 'relax-jss';

import displays from '../../helpers/displays';
import getElementProps from '../../helpers/get-element-props';
import stylesheet from '../../helpers/stylesheet';
import stylesManager from '../../helpers/styles-manager';
import utils from '../../utils';

export default class Page extends Component {
  static fragments = {
    page: {
      title: 1,
      data: 1
    }
  }

  static propTypes = {
    elements: PropTypes.object.isRequired,
    styles: PropTypes.array.isRequired,
    page: PropTypes.object
  }

  getInitState () {
    this.onResizeBind = ::this.onResize;
    this.renderElementBind = ::this.renderElement;
    this.renderChildrenBind = ::this.renderChildren;

    return {
      mounted: false,
      display: 'desktop'
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResizeBind);
    this.onResize();
  }

  onResize () {
    const width = window.outerWidth;
    // var height = window.outerHeight;

    let display = 'desktop';
    let amount = 99999;
    forEach(displays, (value, key) => {
      const dif = value - width;
      if (width < value && dif < amount) {
        amount = dif;
        display = key;
      }
    });

    this.setState({
      mounted: true,
      display
    });
  }

  render () {
    const {data} = this.props.page;
    const elements = data && data.body && this.renderChildren(data.body.children);
    return (
      <div>
        <JSS stylesheet={stylesheet} />
        <JSS stylesheet={stylesManager.singleStylesheet} />
        {elements}
      </div>
    );
  }

  renderChildren (children, elementsLinks = false, schemaEntry = false) {
    let result;
    if ( children instanceof Array ) {
      result = children.map(this.renderElement.bind(this, elementsLinks, schemaEntry));
    } else {
      result = children;
    }
    return result;
  }

  renderElement (elementsLinks = false, schemaEntry = false, elementId) {
    const {display} = this.state;
    const {elements, styles, page} = this.props;
    let element = page.data[elementId];

    const ElementClass = elements[element.tag];
    const elementProps = getElementProps(element, this.state.display);
    const styleClassMap = stylesManager.processElement(element, elementProps, ElementClass, styles, elements, this.state.display, true);

    if ((!element.hide || !element.hide[display]) && element.display !== false) {
      if (schemaEntry && elementsLinks && elementsLinks[element.id]) {
        element = utils.alterSchemaElementProps(elementsLinks[element.id], element, schemaEntry);
      }

      if (element.display !== false) {
        return (
          <ElementClass
            {...elementProps}
            key={elementId}
            element={element}
            elementId={elementId}
            styleClassMap={styleClassMap}
            display={this.state.display}
            renderElement={this.renderElementBind}
            renderChildren={this.renderChildrenBind}
          >
            {element.children && this.renderChildren(element.children, elementsLinks, schemaEntry)}
          </ElementClass>
        );
      }
    }
  }
}
