import displays from 'helpers/displays';
import forEach from 'lodash.foreach';
import getElementProps from 'helpers/get-element-props';
import stylesManager from 'helpers/styles-manager';
import utils from 'helpers/utils';
import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Symbol from 'elements/symbol';
import React, {PropTypes} from 'react';
import {Component as JSS} from 'relax-jss';

import styles from './canvas.less';

export default class Canvas extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired,
    symbols: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    dropHighlight: PropTypes.string.isRequired
  };

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
      <div className={styles.canvas} ref='canvas'>
        <div className={styles.content} style={bodyStyle} ref='body'>
          <Droppable
            type='body'
            placeholderOverlap={this.renderEmpty}
            dropInfo={dropInfo}
            accepts='Section'
            placeholder
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
          styleClassMap={styleClassMap}
          key={elementId}
          relax={{
            editing: this.props.pageBuilder.editing,
            display: this.props.display,
            selected,
            element,
            positionInParent,
            renderElement: this.renderElementBind,
            renderChildren: this.renderChildrenBind,
            insideSymbol: options.customData ? true : false,
            dispatch: this.context.store.dispatch
          }}
        >
          {children}
        </FactoredElement>
      );
    }
  }
}
