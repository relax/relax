import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';

const options = [
  {
    label: 'Site Title',
    type: 'String',
    id: 'title',
    default: ''
  },
  {
    label: 'Frontpage',
    type: 'TitablePicker',
    id: 'frontpage',
    props: {
      type: 'pages'
    }
  },
  {
    label: 'Favicon',
    type: 'Image',
    id: 'favicon',
    props: {
      width: 50,
      height: 50,
      type: 'favicon'
    }
  },
  {
    label: 'Webclip',
    type: 'Image',
    id: 'webclip',
    props: {
      width: 114,
      height: 114
    }
  }
];

const settingsIds = ['title', 'frontpage', 'favicon', 'webclip'];

export default class GeneralSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={settingsIds} />
      </Content>
    );
  }
}
