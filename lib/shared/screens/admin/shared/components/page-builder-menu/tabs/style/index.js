import * as pageBuilderActionsArr from 'actions/page-builder';
import * as stylesActions from 'actions/styles';

import debounce from 'lodash.debounce';
import find from 'lodash.find';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Style from './style';

@connect(
  (state) => ({
    styles: state.styles.data,
    display: state.display,
    selectedId: state.pageBuilder.selectedId,
    selectedElement: state.pageBuilder.selectedElement,
    elements: state.pageBuilder.elements
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActionsArr, dispatch),
    ...bindActionCreators(stylesActions, dispatch)
  })
)
export default class StyleTabContainer extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    saveStyle: PropTypes.func.isRequired,
    updateStyle: PropTypes.func.isRequired,
    selectedId: PropTypes.string.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  };

  getInitState () {
    this.updateStyle = debounce(::this.onUpdateStyle, 3000);
    return {
      editing: true,
      editingTitle: false,
      titleValue: ''
    };
  }

  onUpdateStyle (styleId) {
    if (styleId !== 'no_style') {
      const {styles, updateStyle} = this.props;
      const selectedStyle = find(styles, {_id: styleId});
      if (selectedStyle) {
        updateStyle(StyleTabContainer.fragments, selectedStyle);
      }
    }
  }

  onStyleChange (value) {
    const {selectedId, pageBuilderActions} = this.props;
    pageBuilderActions.changeElementProperty(selectedId, 'style', value);
    this.setState({
      editing: true
    });
  }

  onChangeValue (key, value) {
    const selectedStyle = this.props.value || 'no_style';
    if (selectedStyle === 'no_style') {
      const {selectedId} = this.props.pageBuilder;
      const {changeElementStyle} = this.props.pageBuilderActions;
      changeElementStyle(selectedId, key, value);
    } else {
      this.props.changeStyleProp(selectedStyle, key, value);
      this.updateStyle(selectedStyle);
    }
  }

  render () {
    return (
      <Style
        {...this.props}
        {...this.state}
        onStyleChange={::this.onStyleChange}
      />
    );
  }
}
