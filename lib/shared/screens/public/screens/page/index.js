import Component from 'components/component';
import Viewer from 'components/viewer';
import React from 'react';
import PropTypes from 'prop-types';
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
        slug: 'String',
        state: 'String',
        public: 'Boolean'
      }
    },
    initialVariables: {
      page: {
        slug: props.pageSlug,
        state: 'published',
        public: true
      }
    }
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    pageSlug: PropTypes.string
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.pageSlug !== this.props.pageSlug) {
      this.props.relate.setVariables({
        page: {
          slug: nextProps.pageSlug,
          state: 'published',
          public: true
        }
      });
    }
  }

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
