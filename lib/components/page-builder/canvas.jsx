import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {Component as JSS} from 'relax-jss';

import displays from '../../helpers/displays';
import getElementProps from '../../helpers/get-element-props';
import stylesManager from '../../helpers/styles-manager';
import utils from '../../helpers/utils';
import Symbol from '../elements/symbol';
import {Droppable} from '../dnd';

export default class Canvas extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired,
    symbols: PropTypes.object.isRequired
  }

  static childContextTypes = {
    dropHighlight: PropTypes.string.isRequired
  }

  getInitState () {
    this.renderElementBind = ::this.renderElement;
    this.renderChildrenBind = ::this.renderChildren;
    return {};
  }

  getChildContext () {
    return {
      dropHighlight: this.props.pageBuilder.dragging ? 'vertical' : 'none'
    };
  }

  componentDidMount () {
    this.refs.canvas.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll () {
    window.dispatchEvent(new Event('scroll'));
  }

  onElementClick (id, event) {
    event.preventDefault();
    this.props.pageBuilderActions.selectElement(id);
  }

  render () {
    const {data} = this.props.pageBuilder;
    const dropInfo = {
      id: 'body',
      type: 'body'
    };
    const bodyStyle = {
      margin: '0 auto',
      maxWidth: displays[this.props.display]
    };

    // Process schema links if any
    const elementsLinks = {};
    const elements = data && data.body && this.renderChildren(data.body.children, {elementsLinks});

    return (
      <div className='page-builder-canvas' ref='canvas'>
        <div className='body-element' style={bodyStyle} ref='body'>
          <Droppable
            type='body'
            placeholderOverlap={this.renderEmpty}
            dropInfo={dropInfo}
            accepts='Section'
            placeholder
            dnd={this.props.dnd}
            dndActions={this.props.dndActions}
            pageBuilder={this.props.pageBuilder}
            pageBuilderActions={this.props.pageBuilderActions}
            minHeight='100%'>
            {elements}
          </Droppable>
        </div>
        {this.renderStyles()}
      </div>
    );
  }

  renderEmpty (renderMark) {
    return (
      <div className='pb-empty-placeholder'>
        <div className='pb-empty-placeholder-wrapper'>
          <div className='title'>Let's get you started</div>
          <div className='sub-title'>Click the blue dot below to add your first section</div>
          {renderMark()}
        </div>
      </div>
    );
  }

  renderStyles () {
    const styleTags = [];
    forEach(stylesManager.stylesMap, (styleMap, key) => {
      styleTags.push(
        <JSS stylesheet={styleMap.stylesheet} key={key} />
      );
    });
    return styleTags;
  }

  renderChildren (children, options) {
    let result;
    if ( children instanceof Array ) {
      result = children.map(this.renderElement.bind(this, options));
    } else {
      result = children;
    }
    return result;
  }

  renderElement (options, elementId, positionInParent) {
    const {display} = this.props;
    const {data, elements, selectedId} = this.props.pageBuilder;
    let element = options.customData && options.customData[elementId] || data[elementId];

    const elementProps = getElementProps(element, display);

    if (options.schemaEntry && options.elementsLinks && options.elementsLinks[element.id]) {
      element = utils.alterSchemaElementProps(options.elementsLinks[element.id], element, options.schemaEntry, elementProps);
    }

    const styleClassMap = stylesManager.processElement(element, elementProps, elements[element.tag], this.props.styles, elements, this.props.display);

    if ((!element.hide || !element.hide[this.props.display]) && element.display !== false) {
      const FactoredElement = element.tag === 'Symbol' ? Symbol : elements[element.tag];
      const selected = selectedId === element.id;
      let children = element.children && this.renderChildren(element.children, options);

      if (element.tag === 'Symbol') {
        const symbol = this.props.symbols[element.props.symbolId];
        children = symbol && symbol.data && this.renderElement({customData: symbol.data}, 'base', 0);
      }

      return (
        <FactoredElement
          {...elementProps}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          display={this.props.display}
          key={elementId}
          selected={selected}
          element={element}
          elementId={elementId}
          positionInParent={positionInParent}
          styleClassMap={styleClassMap}
          renderElement={this.renderElementBind}
          renderChildren={this.renderChildrenBind}
          insideSymbol={options.customData ? true : false}>
          {children}
        </FactoredElement>
      );
    }
  }
}
