import React from 'react';
import {Component} from 'relax-framework';
import displays from '../../displays';
import forEach from 'lodash.foreach';

export default class Page extends Component {
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
    var width = window.outerWidth;
    //var height = window.outerHeight;

    var display = 'desktop';
    var amount = 99999;

    forEach(displays, (value, key) => {
      var dif = value - width;
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

  getChildContext () {
    return {
      editing: false
    };
  }

  renderElement (element) {
    if (element.hide && element.hide[this.state.display]) {
      return null;
    }
    var FactoredElement = this.props.elements[element.tag];

    return (
      <FactoredElement {...element.props} key={element.id} element={element}>
        {this.renderChildren(element.children || '')}
      </FactoredElement>
    );
  }

  renderChildren (children) {
    // group of elements (array)
    if ( children instanceof Array ) {
      return children.map(this.renderElement.bind(this));
    }
    // String or other static content
    else {
      return children;
    }
  }

  render () {
    return (
      <div>
        {this.renderChildren(this.props.page.data)}
      </div>
    );
  }
}

Page.propTypes = {
  elements: React.PropTypes.object.isRequired,
  page: React.PropTypes.object.isRequired
};

Page.childContextTypes = {
  editing: React.PropTypes.bool.isRequired
};
