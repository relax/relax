import * as pageBuilderActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {removeStyle, saveStyle} from 'actions/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import elements from 'elements';
import filter from 'lodash/filter';

import List from './list';

@connect(
  (state) => {
    const {selectedElement} = state.pageBuilder;
    const ElementClass = selectedElement && elements[selectedElement.tag];
    const styleType = typeof ElementClass.style === 'string' ? ElementClass.style : ElementClass.style.type;

    let styles = [];
    if (state.styles) {
      styles = filter(state.styles, (style) => (style.type === styleType));
    }

    return {
      styles,
      selected: state.pageBuilder.selected
    };
  },
  (dispatch) => bindActionCreators({...pageBuilderActions, removeStyle, saveStyle}, dispatch)
)
export default class StylePickerListContainer extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    changeElementStyle: PropTypes.func.isRequired,
    removeStyle: PropTypes.func.isRequired,
    saveStyle: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
    selectedStyle: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  @bind
  changeStyle (styleId) {
    const {changeElementStyle, selected, onChange} = this.props;
    onChange();
    changeElementStyle(selected.id, styleId, selected.context);
  }

  @bind
  duplicateStyle (style) {
    const newStyle = Object.assign({}, style);
    delete newStyle._id;
    newStyle.title = `${newStyle.title} (duplicate)`;

    this.props.saveStyle(newStyle);
  }

  render () {
    const {styles, selectedStyle} = this.props;

    return (
      <List
        styles={styles}
        removeStyle={this.props.removeStyle}
        duplicateStyle={this.duplicateStyle}
        changeStyle={this.changeStyle}
        currentId={selectedStyle && selectedStyle._id}
      />
    );
  }
}
