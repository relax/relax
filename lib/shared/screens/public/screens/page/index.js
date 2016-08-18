import Component from 'components/component';
import Viewer from 'components/viewer';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    pageSlug: state.router.params.slug
  }),
  (props) => ({
    fragments: {
      page: {
        _id: 1,
        title: 1,
        data: 1,
        template: {
          _id: 1,
          data: 1,
          links: 1
        }
      }
    },
    variablesTypes: {
      page: {
        slug: 'String'
      }
    },
    initialVariables: {
      page: {
        slug: props.pageSlug
      }
    }
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    pageSlug: PropTypes.string
  };

  render () {
    const {page} = this.props;

    return (
      <Viewer
        doc={page}
        template={page && page.template}
        type='page'
      />
    );
  }
}
