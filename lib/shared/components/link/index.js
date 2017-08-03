import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import Link from './link';

@dataConnect(
  (state) => ({
    editing: state.pageBuilder && state.pageBuilder.editing
  }),
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
    editing: PropTypes.bool,
    relate: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.link !== nextProps.link && nextProps.link) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {link, page, editing, ...props} = this.props;

    return (
      <Link
        link={link}
        item={page}
        editing={editing}
        {...props}
      />
    );
  }
}
