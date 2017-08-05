import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import Element from './element';
import styles from './layers.less';

export default class Layers extends Component {
  static propTypes = {
    hasTemplate: PropTypes.bool,
    templateLinks: PropTypes.object,
    type: PropTypes.string,
    pageBuilderActions: PropTypes.object.isRequired
  };

  componentDidMount () {
    const elem = document.getElementById('selected-element');
    const scroll = this.refs.scroll;

    if (elem) {
      const rect = elem.getBoundingClientRect();
      const scrollRect = findDOMNode(scroll).getBoundingClientRect();
      const relativeTop = rect.top - scrollRect.top;

      if (relativeTop > scrollRect.height / 2) {
        scroll.refs.gemini.refs['scroll-view'].scrollTop = relativeTop - scrollRect.height / 2;
      }
    }
  }

  render () {
    const {pageBuilderActions} = this.props;

    return (
      <Scrollable ref='scroll'>
        <div className={styles.filterDisplay}>
          <button
            className={styles.trigger}
            onClick={pageBuilderActions.expandAll}
          >
            Expand all
          </button>
          <button
            className={styles.trigger}
            onClick={pageBuilderActions.collapseAll}
          >
            Collapse all
          </button>
        </div>
        <div className={styles.structureList}>
          <ul className={styles.list}>
            {this.renderContent()}
          </ul>
        </div>
      </Scrollable>
    );
  }

  renderContent () {
    const {hasTemplate, templateLinks, type, pageBuilderActions} = this.props;

    return (
      <ul className={styles.list}>
        <Element
          id='Body'
          contextDoc={hasTemplate ? 'template' : 'draft'}
          contextProperty='data'
          links={templateLinks && templateLinks[type]}
          linksData='draft'
          positionInParent={0}
          editable={!hasTemplate}
          pageBuilderActions={pageBuilderActions}
        />
      </ul>
    );
  }
}
