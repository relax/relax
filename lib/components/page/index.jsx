import React from 'react';
import {Component} from 'relax-framework';
import JSSReact from '../../react-jss/jss-react';
import displays from '../../displays';
import utils from '../../utils';
import forEach from 'lodash.foreach';

export default class Page extends Component {
  getInitialState () {
    this.onResizeBind = this.onResize.bind(this);
    this.renderElementBind = this.renderElement.bind(this);
    return {
      mounted: false,
      display: 'desktop',
      page: this.getPage(this.props)
    };
  }

  componentDidMount () {
    super.componentDidMount();
    window.addEventListener('resize', this.onResizeBind);
    this.onResize();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      page: this.getPage(nextProps)
    });
  }

  getElementsSchemaLinks () {
    let elementsLinks = {};
    if (this.context.schemaEntry && this.context.page.schemaLinks) {
      elementsLinks = utils.getElementsSchemaLinks(this.context.page.schemaLinks);
    }
    return elementsLinks;
  }

  getPage (props) {
    let page = {data: []};

    if (props.page) {
      page = props.page;
    } else if (props.schemaEntry) {
      if (props.schemaEntry._overlap) {
        page = {
          data: props.schemaEntry._data,
          elementsLinks: utils.getElementsSchemaLinks(props.schemaEntry._schemaLinks)
        };
      } else if (props.schema) {
        page = {
          data: props.schema.data,
          elementsLinks: utils.getElementsSchemaLinks(props.schema.schemaLinks)
        };
      }
    }

    return page;
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
      editing: false,
      renderElement: this.renderElementBind,
      display: this.state.display
    };
  }

  renderElement (element) {
    if ((!element.hide || !element.hide[this.context.display]) && element.display !== false) {
      if (this.props.schemaEntry && this.state.page.elementsLinks && this.state.page.elementsLinks[element.id]) {
        utils.alterSchemaElementProps(this.state.page.elementsLinks[element.id], element, this.props.schemaEntry);
      }

      if (element.display !== false) {
        var FactoredElement = this.props.elements[element.tag];
        return (
          <FactoredElement {...element.props} key={element.id} element={element}>
            {this.renderChildren(element.children || '')}
          </FactoredElement>
        );
      }
    }
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
        <JSSReact />
        {this.renderChildren(this.state.page.data)}
      </div>
    );
  }
}

Page.propTypes = {
  elements: React.PropTypes.object.isRequired,
  page: React.PropTypes.object,
  schema: React.PropTypes.object,
  schemaEntry: React.PropTypes.object
};

Page.childContextTypes = {
  editing: React.PropTypes.bool.isRequired,
  renderElement: React.PropTypes.func.isRequired,
  display: React.PropTypes.string.isRequired
};
