import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';
import {favicon, frontpage, notfound, title, webclip} from 'statics/settings-keys';
const options = [
  {
    label: 'Site Title',
    type: 'String',
    id: title,
    default: ''
  },
  {
    label: 'Frontpage',
    type: 'TitablePicker',
    id: frontpage,
    props: {
      type: 'pages',
      filters: [
        {
          property: 'state',
          op: {
            eq: 'published'
          }
        }
      ]
    }
  },
  {
    label: '404 Page',
    type: 'TitablePicker',
    id: notfound,
    props: {
      type: 'pages',
      filters: [
        {
          property: 'state',
          op: {
            eq: 'published'
          }
        }
      ]
    }
  },
  {
    label: 'Favicon',
    type: 'Image',
    id: favicon,
    props: {
      width: 50,
      height: 50,
      type: 'favicon'
    }
  },
  {
    label: 'Webclip',
    type: 'Image',
    id: webclip,
    props: {
      width: 114,
      height: 114
    }
  }
];

export default class GeneralSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
