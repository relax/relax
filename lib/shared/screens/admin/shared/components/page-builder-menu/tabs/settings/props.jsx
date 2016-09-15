import bind from 'decorators/bind';
import getElementCss from 'helpers/get-element-css';
import getElementProps from 'helpers/get-element-props';
import optionsStyles from 'components/options-list/index.less';
import Component from 'components/component';
import CssDisplay from 'components/css-display';
import CssPadMarg from 'components/css-pad-marg';
import CssPosition from 'components/css-position';
import Input from 'components/input-options/input';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

import styles from './props.less';
import Animation from './animation';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    elements: PropTypes.object.isRequired,
    type: PropTypes.string,
    contentElementId: PropTypes.string
  };

  @bind
  changeElementLabel (value) {
    const {selected} = this.props;
    const {changeElementLabel} = this.props.pageBuilderActions;
    changeElementLabel(selected.id, value, selected.context);
  }

  @bind
  changeElementProperty (key, value) {
    const {selected, pageBuilderActions} = this.props;
    const {changeElementProperty} = pageBuilderActions;
    changeElementProperty(selected.id, key, value, selected.context);
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderLabelOption()}
        {this.renderOptions()}
        <Animation {...this.props} />
      </div>
    );
  }

  renderLabelOption () {
    const {selectedElement} = this.props;

    return (
      <div className={optionsStyles.option}>
        <div className={optionsStyles.label}>Label</div>
        <Input
          value={selectedElement.label || selectedElement.tag}
          onChange={this.changeElementLabel}
        />
      </div>
    );
  }

  renderOptions () {
    const {selectedElement, display, elements} = this.props;
    const ElementClass = elements[selectedElement.tag];

    if (ElementClass.propsSchema) {
      const values = Object.assign({}, ElementClass.defaultProps, getElementProps(selectedElement, display));
      return (
        <OptionsList
          options={ElementClass.propsSchema}
          values={values}
          onChange={this.changeElementProperty}
        />
      );
    }
  }
}
