import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {Component as JSS} from 'relax-jss';

import displays from '../../helpers/displays';
import getElementProps from '../../helpers/get-element-props';
import stylesheet from '../../helpers/stylesheet';
import stylesManager from '../../helpers/styles-manager';

export default class Page extends Component {
  static fragments = {
    page: {
      data: 1
    }
  }

  static propTypes = {
    elements: PropTypes.object.isRequired,
    styles: PropTypes.array.isRequired,
    page: PropTypes.object
  }

  getInitialState () {
    this.onResizeBind = this.onResize.bind(this);

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

  renderChildren (children) {
    let result;
    if ( children instanceof Array ) {
      result = children.map(this.renderElement.bind(this));
    } else {
      result = children;
    }
    return result;
  }

  renderElement (elementId) {
    const {display} = this.state;
    const {elements, styles, page} = this.props;
    const element = page.data[elementId];

    const ElementClass = elements[element.tag];
    const elementProps = getElementProps(element, this.state.display);
    const styleClassMap = stylesManager.processElement(element, elementProps, ElementClass, styles, elements, true);

    if ((!element.hide || !element.hide[display]) && element.display !== false) {
      if (element.display !== false) {
        return (
          <ElementClass
            {...elementProps}
            key={elementId}
            element={element}
            elementId={elementId}
            styleClassMap={styleClassMap}
            display={this.state.display}
          >
            {element.children && this.renderChildren(element.children)}
          </ElementClass>
        );
      }
    }
  }
}
