import Component from 'components/component';
import React from 'react';

import GeneralSettings from './components/general';

const options = [
  {
    label: 'Site Title',
    type: 'String',
    id: 'title',
    default: ''
  }
  // {
  //   label: 'Frontpage',
  //   type: 'PagePicker',
  //   id: 'frontpage'
  // },
  // {
  //   label: 'Favicon',
  //   type: 'Image',
  //   id: 'favicon',
  //   props: {
  //     width: 50,
  //     height: 50,
  //     type: 'favicon'
  //   }
  // },
  // {
  //   label: 'Webclip',
  //   type: 'Image',
  //   id: 'webclip',
  //   props: {
  //     width: 114,
  //     height: 114
  //   }
  // }
];

export default class GeneralSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <GeneralSettings options={options} />
    );
  }
}
