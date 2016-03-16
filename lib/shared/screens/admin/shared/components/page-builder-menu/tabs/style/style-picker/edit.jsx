import getElementStyleValues from 'helpers/get-element-style-values';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React from 'react';

import styles from './edit.less';

export default class Edit extends Component {
  static propTypes = {
    display: React.PropTypes.string.isRequired,
    styleOptions: React.PropTypes.object.isRequired,
    selectedStyle: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const {styleOptions, selectedStyle, display} = this.props;
    const values = getElementStyleValues(
      styleOptions.defaults,
      selectedStyle.options,
      selectedStyle.displayOptions,
      display
    );

    return (
      <OptionsList
        options={styleOptions.options}
        values={values}
        onChange={this.props.onChange}
      />
    );
  }
}
