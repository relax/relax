import * as elementsActions from '../../client/actions/elements';

import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import staticProperties from '../../helpers/schema-static-properties';
import Sorts from '../../components/data-types/sorts';

@connect(
  (state) => ({
    elements: state.elements,
    draftData: state.draft.data.data
  }),
  (dispatch) => bindActionCreators(elementsActions, dispatch)
)
export default class SortsContainer extends Component {
  static fragments = Sorts.fragments

  static propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired
  }

  static defaultProps = {
    value: []
  }

  getInitState () {
    this.fetchData(this.props);
    return {
      newOpened: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.getSelectedSchemaId(nextProps) !== this.getSelectedSchemaId(this.props)) {
      this.fetchData(nextProps);
    }
  }

  getSelectedSchemaId (props) {
    const elementId = props.pageBuilder.selectedId;
    const selectedElement = props.draftData[elementId];
    return selectedElement && selectedElement.props && selectedElement.props.schemaId;
  }

  fetchData (props) {
    const elementId = props.pageBuilder.selectedId;
    const schemaId = this.getSelectedSchemaId(props);
    if (schemaId) {
      props.getElementData(elementId, buildQueryAndVariables(
        this.constructor.fragments,
        {
          schema: {
            _id: {
              value: schemaId,
              type: 'ID!'
            }
          }
        }
      ));
    }
  }

  openNew () {
    this.setState({
      newOpened: true,
      editingSort: {
        prop: 'publishedDate',
        type: 'Date',
        options: {}
      }
    });
  }

  onPropertyChange (prop) {
    this.setState({
      editingSort: Object.assign({}, this.state.editingSort, {
        prop
      })
    });
  }

  onOrderChange (order) {
    this.setState({
      editingSort: Object.assign({}, this.state.editingSort, {
        order
      })
    });
  }

  cancelEdit () {
    this.setState({
      newOpened: false,
      editOpened: false,
      editIndex: null
    });
  }

  submitEdit () {
    let newSorts = this.props.value;

    if (this.state.newOpened) {
      newSorts = [...newSorts, this.state.editingSort];
    } else if (this.state.editOpened) {
      newSorts = [...newSorts];
      newSorts[this.state.editIndex] = this.state.editingSort;
    }

    this.props.onChange(newSorts);
    this.setState({
      newOpened: false,
      editOpened: false,
      editIndex: null
    });
  }

  selectSort (index) {
    if (this.state.editOpened && this.state.editIndex === index) {
      this.setState({
        editOpened: false,
        editIndex: null
      });
    } else {
      this.setState({
        editOpened: true,
        editIndex: index,
        editingSort: cloneDeep(this.props.value[index])
      });
    }
  }

  removeSort (index) {
    const newSorts = [...this.props.value];
    newSorts.splice(index, 1);
    this.props.onChange(newSorts);
  }

  render () {
    const {pageBuilder, elements} = this.props;
    const elementData = elements[pageBuilder.selectedId];
    const schema = elementData && elementData.schema || null;

    const schemaProperties = schema && schema.properties || [];
    const properties = [...staticProperties];

    forEach(schemaProperties, (customProperty) => {
      properties.push(Object.assign({}, customProperty, {
        id: 'properties#' + customProperty.id
      }));
    });

    return (
      <Sorts
        {...this.props}
        {...this.state}
        schema={schema}
        schemaProperties={properties}
        openNew={::this.openNew}
        onPropertyChange={::this.onPropertyChange}
        onOrderChange={::this.onOrderChange}
        cancelEdit={::this.cancelEdit}
        submitEdit={::this.submitEdit}
        selectSort={::this.selectSort}
        removeSort={::this.removeSort}
      />
    );
  }
}
