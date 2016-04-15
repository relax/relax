import Component from 'components/component';
import OptionsList from 'components/options-list';
import SettingsContent from 'components/settings-content';
import React, {PropTypes} from 'react';

export default class AnalyticsSettings extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  };

  render () {
    const {options} = this.props;
    return (
      <div>
        <SettingsContent>
          <OptionsList options={options} values={{}} white />
        </SettingsContent>
      </div>
    );
  }
}
