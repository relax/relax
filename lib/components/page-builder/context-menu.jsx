import React from 'react';
import {Component} from 'relax-framework';
import Autocomplete from '../autocomplete';
import foreach from 'lodash.foreach';
import key from 'keymaster';
import merge from 'lodash.merge';
import {Draggable} from '../drag';

export default class ContextMenu extends Component {
  getInitialState () {
    return {
      searchOpened: this.props.search,
      search: '',
      suggestions: [],
      suggestion: ''
    };
  }

  componentDidMount () {
    this.keyDownBind = this.focusSearch.bind(this);
    document.addEventListener('keydown', this.keyDownBind);

    if (this.state.searchOpened) {
      this.bindSearchEvents();
    }

    key('escape', 'context-menu', this.close.bind(this));
    key.setScope('context-menu');
  }

  focusSearch (event) {
    document.removeEventListener('keydown', this.keyDownBind);
    this.setState({
      searchOpened: true
    });
  }

  toggleSearch (event) {
    event.preventDefault();
    this.setState({
      searchOpened: !this.state.searchOpened
    });
  }

  close (event) {
    if (typeof event !== 'undefined') {
      event.preventDefault();
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onChange (search) {
    var suggestion = '';
    var suggestions = [];

    foreach(this.context.elements, (element, name) => {
      if (name.toLowerCase().indexOf(search.toLowerCase()) === 0) {
        if (suggestion === '' || name === this.state.suggestion) {
          suggestion = name;
        }
        suggestions.push(name);
      }
    });

    this.setState({
      suggestions,
      suggestion,
      search
    });

    return suggestion;
  }

  nextSuggestion (event) {
    event.preventDefault();

    var next = false;

    foreach(this.state.suggestions, (suggestion, key) => {
      if (suggestion === this.state.suggestion) {
        if (key+1 < this.state.suggestions.length) {
          next = this.state.suggestions[key+1];
        }
        return false;
      }
    });

    if (next !== false) {
      this.setState({
        suggestion: next
      });
    }
  }

  previousSuggestion (event) {
    event.preventDefault();

    var previous = false;

    foreach(this.state.suggestions, (suggestion) => {
      if (suggestion === this.state.suggestion) {
        return false;
      }
      previous = suggestion;
    });

    if (previous !== false) {
      this.setState({
        suggestion: previous
      });
    }
  }

  submitSelected (event) {
    event.preventDefault();

    if (this.state.suggestion) {
      this.context.addElementAtSelected(this.state.suggestion);
      this.close();
    }
  }

  acceptSuggestion (event) {
    event.preventDefault();
    this.setState({
      search: this.state.suggestion
    });
  }

  bindSearchEvents () {
    key('down', 'context-menu', this.nextSuggestion.bind(this));
    key('up', 'context-menu', this.previousSuggestion.bind(this));
    key('enter', 'context-menu', this.submitSelected.bind(this));
    key('tab', 'context-menu', this.acceptSuggestion.bind(this));
  }

  unbindSearchEvents () {
    key.unbind('down', 'context-menu');
    key.unbind('up', 'context-menu');
    key.unbind('enter', 'context-menu');
    key.unbind('tab', 'context-menu');
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.searchOpened && !prevState.searchOpened) {
      this.bindSearchEvents();
    } else if (!this.state.searchOpened && prevState.searchOpened) {
      this.unbindSearchEvents();
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keyDownBind);
    key.unbind('escape', 'context-menu');
    this.unbindSearchEvents();
    key.setScope('all');
  }

  onStartDrag () {
    this.context.onStartDrag();
    this.close();
  }

  renderCommon (name) {
    var element = this.context.elements[name];
    var settings = element.settings;

    var props = {
      key: name,
      onStartDrag: this.onStartDrag.bind(this),
      dragInfo: {
        type: 'new',
        element: name
      },
      type: name
    };

    if(settings && settings.drag){
      merge(props, settings.drag);
    }

    return (
      <Draggable {...props}>
        <a href='#'>
          <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
        </a>
      </Draggable>
    );
  }

  renderContent () {
    if (!this.state.searchOpened) {
      return (
        <div className='main-elements'>
          {this.props.common.map(this.renderCommon, this)}
        </div>
      );
    } else {
      return (
        <Autocomplete onChange={this.onChange.bind(this)} suggestion={this.state.suggestion} value={this.state.search} />
      );
    }
  }

  renderSuggestion (elementName) {
    var element = this.context.elements[elementName];
    var settings = element.settings;
    var className = '';

    if (elementName === this.state.suggestion) {
      className += 'active';
    }

    var activeStr = elementName.slice(0, this.state.search.length);
    var inactiveStr = elementName.slice(this.state.search.length);

    var props = {
      key: elementName,
      onStartDrag: this.onStartDrag.bind(this),
      dragInfo: {
        type: 'new',
        element: elementName
      },
      type: elementName
    };

    if(settings && settings.drag){
      merge(props, settings.drag);
    }

    return (
      <Draggable {...props}>
        <div className={className} key={elementName}>
          <i className='fa fa-puzzle-piece'></i>
          <span className='active'>{activeStr}</span>
          <span>{inactiveStr}</span>
        </div>
      </Draggable>
    );
  }

  renderDropdown () {
    if (this.state.searchOpened) {
      return (
        <div className='dropdown'>
          {this.state.suggestions.length > 0 ? this.state.suggestions.map(this.renderSuggestion, this) : <div className='error'>No results found</div>}
        </div>
      );
    }
  }

  render () {
    var style = {
      top: this.props.y,
      left: this.props.x
    };

    var className = 'context-menu';
    if (this.state.searchOpened) {
      className += ' search';
    }

    return (
      <div className={className} style={style}>
        <a href='#' onClick={this.toggleSearch.bind(this)}><i className='fa fa-search'></i></a>
        <div className='seperator'></div>
        {this.renderContent()}
        {this.renderDropdown()}
      </div>
    );
  }
}

ContextMenu.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  addElementAtSelected: React.PropTypes.func.isRequired,
  onStartDrag: React.PropTypes.func.isRequired
};

ContextMenu.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func,
  search: React.PropTypes.bool,
  common: React.PropTypes.array
};

ContextMenu.defaultProps = {
  x: 200,
  y: 200,
  search: false,
  common: ['Section', 'Container', 'Columns', 'TextBox', 'Image']
};
