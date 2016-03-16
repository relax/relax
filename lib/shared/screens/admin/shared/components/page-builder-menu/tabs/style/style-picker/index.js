import * as pageBuilderActions from 'actions/page-builder';
import * as stylesActions from 'actions/styles';

import debounce from 'lodash.debounce';
import filter from 'lodash.filter';
import find from 'lodash.find';
import forEach from 'lodash.foreach';
import omit from 'lodash.omit';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StylePicker from './style-picker';

@connect(
  (state) => ({
    styles: state.styles.data,
    display: state.display,
    selectedElement: state.pageBuilder.selectedElement,
    selectedId: state.pageBuilder.selectedId,
    elements: state.pageBuilder.elements
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    ...bindActionCreators(stylesActions, dispatch)
  })
)
export default class StylePickerContainer extends Component {
  static fragments = StylePicker.fragments;

  static propTypes = {
    style: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    saveStyle: PropTypes.func.isRequired,
    duplicateStyle: PropTypes.func.isRequired,
    updateStyle: PropTypes.func.isRequired,
    changeStyleProp: PropTypes.func.isRequired,
    // page builder
    selectedElement: PropTypes.object.isRequired,
    selectedId: PropTypes.string.isRequired,
    elements: PropTypes.object.isRequired
  };

  getInitState () {
    const styleOptions = this.getStyleOptions(this.props.style);
    this.updateStyle = debounce(::this.onUpdateStyle, 3000);
    return {
      editing: true,
      editingTitle: false,
      titleValue: '',
      styleOptions
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.style !== this.props.style) {
      this.setState({
        styleOptions: this.getStyleOptions(nextProps.style)
      });
    }
  }

  onUpdateStyle (styleId) {
    if (styleId !== 'no_style') {
      const selectedStyle = find(this.props.styles, {_id: styleId});
      if (selectedStyle) {
        this.props.updateStyle(this.constructor.fragments, selectedStyle);
      }
    }
  }

  async saveStyle () {
    const selectedStyle = this.props.value || 'no_style';
    if (selectedStyle === 'no_style') {
      const {selectedElement} = this.props;
      const style = {
        title: this.state.titleValue,
        type: this.state.styleOptions.type,
        options: selectedElement.style || {},
        displayOptions: selectedElement.displayStyle || {}
      };
      await this.props.saveStyle(this.constructor.fragments, selectedElement.id, style);
      this.setState({
        editingTitle: false,
        titleValue: ''
      });
    }
  }

  async duplicateStyle (data) {
    const {selectedElement} = this.props;
    const style = omit(data, '_id');
    style.title += ' copy';
    await this.props.saveStyle(this.constructor.fragments, selectedElement.id, style);
    this.setState({
      editing: true
    });
  }

  onChangeValue (key, value) {
    const selectedStyle = this.props.value || 'no_style';
    if (selectedStyle === 'no_style') {
      const {selectedId} = this.props;
      const {changeElementStyle} = this.props.pageBuilderActions;
      changeElementStyle(selectedId, key, value);
    } else {
      this.props.changeStyleProp(selectedStyle, key, value);
      this.updateStyle(selectedStyle);
    }
  }

  onChange (value) {
    const {selectedId} = this.props;
    const {changeElementProperty} = this.props.pageBuilderActions;
    changeElementProperty(selectedId, 'style', value);
    this.setState({
      editing: true
    });
  }

  toggleEditingTitle () {
    this.setState({
      editingTitle: !this.state.editingTitle
    });
  }

  changeTitleValue (value) {
    this.setState({
      titleValue: value
    });
  }

  toggleEditing () {
    this.setState({
      editing: !this.state.editing
    });
  }

  getStyleOptions (style) {
    let result = style;
    if (typeof style === 'string') {
      forEach(this.props.elements, (element) => {
        if (element.style && typeof element.style === 'object' && element.style.type === style) {
          result = element.style;
        }
      });
    }
    return result;
  }

  render () {
    let styles = [];
    if (this.state.styleOptions && this.state.styleOptions.type) {
      const {selectedElement} = this.props;
      styles = filter(this.props.styles, {type: this.state.styleOptions.type});
      styles.unshift({
        _id: 'no_style',
        title: 'No style',
        options: selectedElement.style || {},
        displayOptions: selectedElement.displayStyle || {}
      });
    }
    let selectedStyle = find(styles, {_id: this.props.value || 'no_style'});
    if (!selectedStyle) {
      selectedStyle = find(styles, {_id: 'no_style'});
    }

    return (
      <StylePicker
        {...this.props}
        {...this.state}
        styles={styles}
        selectedStyle={selectedStyle}
        styleOptions={this.state.styleOptions}
        toggleEditing={::this.toggleEditing}
        toggleEditingTitle={::this.toggleEditingTitle}
        changeTitleValue={::this.changeTitleValue}
        saveStyle={::this.saveStyle}
        onChange={::this.onChange}
        onChangeValue={::this.onChangeValue}
        duplicateStyle={::this.duplicateStyle}
      />
    );
  }
}
