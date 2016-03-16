import cx from 'classnames';
import getElementProps from 'helpers/get-element-props';
import optionsStyles from 'components/options-list/index.less';
import Component from 'components/component';
import Input from 'components/input-options/input';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

import styles from './props.less';
import Animation from './animation';
import Position from './position';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    selectedElement: PropTypes.object,
    selectedId: PropTypes.string,
    elements: PropTypes.object.isRequired
  };

  displayToggleElement (id, display) {
    const {toggleElementVisibleOn} = this.props.pageBuilderActions;
    toggleElementVisibleOn(id, display);
  }

  render () {
    const {selectedElement, elements} = this.props;
    const {changeElementLabel} = this.props.pageBuilderActions;
    const ElementClass = elements[selectedElement.tag];

    return (
      <div className={styles.root}>
        <div className={optionsStyles.option}>
          <div className={optionsStyles.label}>Label</div>
          <Input
            value={selectedElement.label || selectedElement.tag}
            onChange={changeElementLabel.bind(this, selectedElement.id)}
          />
        </div>
        <div className={optionsStyles.option}>
          <div className={optionsStyles.label}>Visible on</div>
          <div>
            <button
              className={cx(
                styles.displayButton,
                selectedElement.hide && selectedElement.hide.desktop && styles.selected
              )}
              onClick={this.displayToggleElement.bind(this, selectedElement.id, 'desktop')}
            >
              <i className='nc-icon-mini tech_desktop-screen'></i>
            </button>
            <button
              className={cx(
                styles.displayButton,
                selectedElement.hide && selectedElement.hide.tablet && styles.selected
              )}
              onClick={this.displayToggleElement.bind(this, selectedElement.id, 'tablet')}
            >
              <i className='nc-icon-mini tech_tablet-button'></i>
            </button>
            <button
              className={cx(
                styles.displayButton,
                selectedElement.hide && selectedElement.hide.mobile && styles.selected
              )}
              onClick={this.displayToggleElement.bind(this, selectedElement.id, 'mobile')}
            >
              <i className='nc-icon-mini tech_mobile-button'></i>
            </button>
          </div>
        </div>
        <Position {...this.props} />
        {this.renderOptions(ElementClass)}
        <Animation {...this.props} />
      </div>
    );
  }

  renderOptions (ElementClass) {
    const {changeElementProperty} = this.props.pageBuilderActions;
    const {selectedId, selectedElement, display} = this.props;

    if (ElementClass.propsSchema) {
      const values = Object.assign({}, ElementClass.defaultProps, getElementProps(selectedElement, display));
      return (
        <OptionsList
          options={ElementClass.propsSchema}
          values={values}
          onChange={changeElementProperty.bind(this, selectedId)}
        />
      );
    }
  }
}
