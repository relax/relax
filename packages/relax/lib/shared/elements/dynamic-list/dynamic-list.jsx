import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';
import Row from './row';
import settings from './settings';

export default class DynamicList extends Component {
  static propTypes = {
    children: PropTypes.any,
    relax: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
    limit: PropTypes.number,
    columns: PropTypes.number,
    verticalGutter: PropTypes.string,
    horizontalGutter: PropTypes.string,
    elementsLinks: PropTypes.object,
    isLinkingData: PropTypes.bool
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  render () {
    const {Element} = this.context;

    return (
      <Element
        htmlTag={'div'}
        {...this.props.relax}
        settings={settings}
      >
        {this.renderItems()}
      </Element>
    );
  }

  renderItems () {
    const {entries, columns, limit} = this.props;
    const items = [];

    let number = Math.min(entries.length, limit);
    if (number === 0) {
      number = limit;
    }

    for (let i = 0; i < number; i) {
      if (columns > 1) {
        const columnItems = [];
        let a = 0;

        for (; a < columns && i < number; a++) {
          columnItems.push(this.renderItem(i, a === 0, a === columns - 1));
          i++;
        }

        if (columnItems.length < columns) {
          const missing = columns - columnItems.length;
          for (let c = 0; c < missing; c++) {
            columnItems.push(this.renderItem(a + c, false, c === missing - 1, true));
          }
        }
        items.push(this.renderRow(columnItems, i >= number, i));
      } else {
        items.push(this.renderItem(i));
        i++;
      }
    }

    return items;
  }

  renderRow (items, isLast, key) {
    const {verticalGutter, isLinkingData} = this.props;

    return (
      <Row
        isLast={isLast}
        isLinkingData={isLinkingData}
        verticalGutter={verticalGutter}
        key={key}
      >
        {items}
      </Row>
    );
  }

  renderItem (key, isFirst, isLast, dummy = false) {
    const {children, entries, relax, elementsLinks, columns, horizontalGutter, isLinkingData} = this.props;

    return (
      <Entry
        key={key}
        isFirst={isFirst}
        isLast={isLast}
        dummy={dummy}
        columns={columns}
        isLinkingData={isLinkingData}
        horizontalGutter={horizontalGutter}
        relax={relax}
        editing={relax.editing}
        element={relax.element}
        elementsLinks={elementsLinks}
        schemaEntry={!dummy && entries[key]}
        renderChildren={relax.renderChildren}
        context={relax.context}
      >
        {children}
      </Entry>
    );
  }
}
