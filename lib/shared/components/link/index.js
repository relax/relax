import Component from 'components/component';
import React, {PropTypes} from 'react';

import Link from './link';

export default class LinkContainer extends Component {
  static propTypes = {
    link: PropTypes.object
  };

  render () {
    const {link, ...props} = this.props;

    return (
      <Link
        link={link}
        {...props}
      />
    );
  }
}
