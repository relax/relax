import * as elementsActions from '../../../client/actions/elements';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {buildQueryAndVariables} from 'relax-framework';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import List from './list';

@connect(
  (state) => ({
    elements: state.elements
  }),
  (dispatch) => bindActionCreators(elementsActions, dispatch)
)
export default class Schema extends Component {
  static propTypes = {
    children: PropTypes.node,
    schemaId: PropTypes.string,
    dataLinking: PropTypes.object,
    limit: PropTypes.number,
    columns: PropTypes.number,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    dnd: PropTypes.object,
    dndActions: PropTypes.object,
    element: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,
    renderChildren: PropTypes.func.isRequired,
    verticalGutter: PropTypes.number.isRequired,
    horizontalGutter: PropTypes.number.isRequired,
    getElementData: PropTypes.func.isRequired
  }
  static defaultProps = {
    limit: 10,
    columns: 2,
    verticalGutter: 10,
    horizontalGutter: 10
  }
  static propsSchema = propsSchema
  static settings = settings
  static fragments = {
    schemaList: {
      _id: 1,
      title: 1,
      slug: 1,
      date: 1,
      state: 1,
      properties: 1
    }
  }

  getInitialState () {
    this.fetchData(this.props);
    return {};
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schemaId !== this.props.schemaId ||
        nextProps.dataLinking !== this.props.dataLinking ||
        nextProps.limit > this.props.limit) {
      this.fetchData(nextProps);
    }
  }

  fetchData (props) {
    if (props.schemaId) {
      props.getElementData(props.elementId, buildQueryAndVariables(
        this.constructor.fragments,
        {
          schemaList: {
            schemaId: {
              value: props.schemaId,
              type: 'ID!'
            },
            limit: {
              value: props.limit,
              type: 'Int'
            }
          }
        }
      ));
    }
  }

  render () {
    const props = {
      htmlTag: 'div',
      info: this.props,
      settings: settings
    };

    return (
      <Element {...props}>
        <List {...this.props}>
          {this.props.children}
        </List>
      </Element>
    );
  }
}
