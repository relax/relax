import * as elementsActions from '../../client/actions/elements';

import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import staticProperties from '../../helpers/schema-static-properties';
import Filters from '../../components/data-types/filters';

@connect(
  (state) => ({
    elements: state.elements,
    draftData: state.draft.data.data
  }),
  (dispatch) => bindActionCreators(elementsActions, dispatch)
)
export default class FiltersContainer extends Component {
  static fragments = Filters.fragments

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
      editingFilter: {
        prop: 'publishedDate',
        type: 'Date',
        options: {}
      }
    });
  }

  onPropertyChange (prop) {
    this.setState({
      editingFilter: Object.assign({}, this.state.editingFilter, {
        prop
      })
    });
  }

  onOptionChange (key, value) {
    this.setState({
      editingFilter: Object.assign({}, this.state.editingFilter, {
        options: Object.assign({}, this.state.editingFilter.options, {
          [key]: value
        })
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
    let newFilters = this.props.value;

    if (this.state.newOpened) {
      newFilters = [...newFilters, this.state.editingFilter];
    } else if (this.state.editOpened) {
      newFilters = [...newFilters];
      newFilters[this.state.editIndex] = this.state.editingFilter;
    }

    this.props.onChange(newFilters);
    this.setState({
      newOpened: false,
      editOpened: false,
      editIndex: null
    });
  }

  selectFilter (index) {
    if (this.state.editOpened && this.state.editIndex === index) {
      this.setState({
        editOpened: false,
        editIndex: null
      });
    } else {
      this.setState({
        editOpened: true,
        editIndex: index,
        editingFilter: cloneDeep(this.props.value[index])
      });
    }
  }

  removeFilter (index) {
    const newFilters = [...this.props.value];
    newFilters.splice(index, 1);
    this.props.onChange(newFilters);
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
      <Filters
        {...this.props}
        {...this.state}
        schema={schema}
        schemaProperties={properties}
        openNew={::this.openNew}
        onPropertyChange={::this.onPropertyChange}
        onOptionChange={::this.onOptionChange}
        cancelEdit={::this.cancelEdit}
        submitEdit={::this.submitEdit}
        selectFilter={::this.selectFilter}
        removeFilter={::this.removeFilter}
      />
    );
  }
}
