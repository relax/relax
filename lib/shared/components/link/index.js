import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Link from './link';

@dataConnect(
  (props) => {
    const {link} = props;
    let result = {};

    if (link && link.options && link.type === 'internal') {
      const options = link.options;

      if (options.page) {
        result = {
          fragments: {
            page: {
              _id: 1,
              slug: 1
            }
          },
          variablesTypes: {
            page: {
              _id: 'ID!'
            }
          },
          initialVariables: {
            page: {
              _id: options.page
            }
          }
        };
      }
    }

    return result;
  }
)
export default class LinkContainer extends Component {
  static propTypes = {
    link: PropTypes.object,
    page: PropTypes.object,
    relate: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.link !== nextProps.link && nextProps.link) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {link, page, ...props} = this.props;

    return (
      <Link
        link={link}
        item={page}
        {...props}
      />
    );
  }
}
