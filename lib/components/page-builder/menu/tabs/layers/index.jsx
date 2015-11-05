import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';
import {Droppable} from '../../../../dnd';

export default class Layers extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  changeDisplay (type, event) {
    event.preventDefault();
  }

  expandAll (event) {
    event.preventDefault();
  }

  collapseAll (event) {
    event.preventDefault();
  }

  inPath (id) {
    const {selectedPath} = this.props.pageBuilder;
    let is = false;
    forEach(selectedPath, (pathEntry) => {
      if (pathEntry.id === id) {
        is = true;
        return false;
      }
    });
    return is;
  }

  render () {
    const {data} = this.props.pageBuilder;
    return (
      <div className='content-scrollable'>
        <GeminiScrollbar autoshow>
          <div className='advanced-menu-structure'>
            <div className='filter-display'>
              <p>Show</p>
              <a className={this.state.display === 'label' ? 'active' : ''} href='#' onClick={this.changeDisplay.bind(this, 'label')}>labels</a>
              <span> / </span>
              <a className={this.state.display === 'tag' ? 'active' : ''} href='#' onClick={this.changeDisplay.bind(this, 'tag')}>type</a>
            </div>
            <div className='filter-display right'>
              <div>
                <a href='#' onClick={this.expandAll.bind(this)}>Expand all</a>
              </div>
              <div>
                <a href='#' onClick={this.collapseAll.bind(this)}>Collapse all</a>
              </div>
            </div>
            {data.body && data.body.children && this.renderList(data.body.children, {type: 'body', id: 'body'}, {accepts: 'Section'}, {tag: 'body'})}
          </div>
        </GeminiScrollbar>
      </div>
    );
  }

  renderList (children, dropInfo, dropSettings, parent, droppable = true) {
    let result;
    if (!droppable) {
      result = (
        <ul>
          {children.map(this.renderListEntry, this)}
        </ul>
      );
    } else {
      result = (
        <ul>
          <Droppable type={parent.type} dropInfo={dropInfo} {...dropSettings} hitSpace={12} dnd={this.props.dnd} dndActions={this.props.dndActions}>
            {children.map(this.renderListEntry, this)}
          </Droppable>
        </ul>
      );
    }
    return result;
  }

  renderListEntry (elementId) {
    const {elements, data} = this.props.pageBuilder;
    const {dragging} = this.props.dnd;
    const elementInfo = data[elementId];
    const hasChildren = elementInfo.children instanceof Array && elementInfo.children.length > 0;
    const element = elements[elementInfo.tag];
    const dropInfo = {id: elementInfo.id};
    let dropSettings = element.settings.drop;
    let isExpanded = hasChildren && elementInfo.expanded;

    if (dropSettings !== false) {
      dropSettings = Object.assign({}, element.settings.drop, {
        orientation: 'vertical',
        customDropArea: false,
        selectionChildren: false
      });
    }

    if (this.inPath(elementInfo.id)) {
      isExpanded = true;
    }

    return (
      <li key={elementInfo.id}>
        <Entry
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
          id={elementInfo.id}
          elementInfo={elementInfo}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          display={this.state.display}
        />
        {
          isExpanded ?
          this.renderList(elementInfo.children, dropInfo, dropSettings, elementInfo, dropSettings) :
          (dragging && !hasChildren && dropSettings !== false ? <ul><Droppable type={elementInfo.tag} dropInfo={dropInfo} {...dropSettings} minHeight={7} pageBuilder={this.props.pageBuilder} dnd={this.props.dnd} dndActions={this.props.dndActions} /></ul> : null)
        }
      </li>
    );
  }
}
