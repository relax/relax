import Component from 'components/component';
import Content from 'components/content';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

export default class GeneralSettings extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  };

  render () {
    const {options} = this.props;
    return (
      <div>
        <Content noOffset>
          <OptionsList options={options} values={{}} white />
        </Content>
      </div>
    );
  }
}
