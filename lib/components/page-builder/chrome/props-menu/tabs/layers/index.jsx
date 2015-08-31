import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';
import {Droppable} from '../../../../../drag';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';

export default class Layers extends Component {
  getInitialState () {
    return {
      display: 'label'
    };
  }

  changeDisplay (type, event) {
    event.preventDefault();
    this.setState({
      display: type
    });
  }

  expandAll (event) {
    event.preventDefault();
    this.context.expandAll();
  }

  collapseAll (event) {
    event.preventDefault();
    this.context.collapseAll();
  }

  inPath (id) {
    var is = false;
    forEach(this.context.selectedPath, (pathEntry) => {
      if (pathEntry.id === id) {
        is = true;
        return false;
      }
    });
    return is;
  }

  renderListEntry (elementInfo) {
    var hasChildren = elementInfo.children instanceof Array && elementInfo.children.length > 0;
    var isExpanded = hasChildren && elementInfo.expanded;
    var element = this.context.elements[elementInfo.tag];
    var dropInfo = {id: elementInfo.id};
    var dropSettings = element.settings.drop;

    if (dropSettings !== false) {
      dropSettings = merge({}, element.settings.drop);
      dropSettings.orientation = 'vertical';
      delete dropSettings.customDropArea;
      delete dropSettings.selectionChildren;
    }

    if (this.inPath(elementInfo.id)) {
      isExpanded = true;
    }

    return (
      <li key={elementInfo.id}>
        <Entry
          id={elementInfo.id}
          elementInfo={elementInfo}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          display={this.state.display}
        />
        {
          isExpanded ?
          this.renderList(elementInfo.children, dropInfo, dropSettings, elementInfo, dropSettings) :
          (this.context.dragging && !hasChildren && dropSettings !== false ? <ul><Droppable type={elementInfo.tag} dropInfo={dropInfo} {...dropSettings} minHeight={7}></Droppable></ul> : null)
        }
      </li>
    );
  }

  renderList (children, dropInfo, dropSettings, parent, droppable = true) {
    if (!droppable) {
      return (
        <ul>
          {children.map(this.renderListEntry, this)}
        </ul>
      );
    } else {
      return (
        <ul>
          <Droppable type={parent.type} dropInfo={dropInfo} {...dropSettings} hitSpace={12}>
            {children.map(this.renderListEntry, this)}
          </Droppable>
        </ul>
      );
    }
  }

  render () {
    return (
      <div className='content-scrollable'>
        <GeminiScrollbar autoshow={true}>
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
            {this.renderList(this.context.page.data, {type: 'body'}, {accepts: 'Section'}, {tag: 'body'})}
          </div>
        </GeminiScrollbar>
      </div>
    );
  }
}

Layers.contextTypes = {
  page: React.PropTypes.object.isRequired,
  elements: React.PropTypes.object.isRequired,
  dragging: React.PropTypes.bool.isRequired,
  expandAll: React.PropTypes.func.isRequired,
  collapseAll: React.PropTypes.func.isRequired,
  selectedPath: React.PropTypes.array.isRequired
};
