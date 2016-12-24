import bind from 'decorators/bind';
import getLazyFilters from 'helpers/get-lazy-load-filters';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Templates from './templates';

@dataConnect(
  () => ({
    fragments: Templates.fragments,
    variablesTypes: {
      templates: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      templates: {
        sort: '_id',
        order: 'desc',
        search: 'title',
        limit: 15
      }
    }
  })
)
export default class TemplatesPickerContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    templates: PropTypes.array,
    relate: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    itemId: PropTypes.string
  };

  getInitState () {
    return {
      search: ''
    };
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.search !== this.state.search) {
      this.props.relate.setVariables({
        templates: {
          sort: '_id',
          order: 'desc',
          search: 'title',
          s: nextState.search,
          limit: 15
        }
      });
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;
    if (!loading && relate.hasMore) {
      const {templates} = this.props;
      const {search} = this.state;

      relate.loadMore({
        templates: {
          sort: '_id',
          order: 'desc',
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: templates,
            sort: '_id',
            order: 'desc'
          })
        }
      }, 'templates', 10);
    }
  }

  @bind
  onSearchChange (search) {
    this.setState({
      search
    });
  }

  render () {
    const {loading, templates, value, onChange, type, itemId} = this.props;
    return (
      <Templates
        {...this.state}
        loading={loading}
        templates={templates}
        onSearchChange={this.onSearchChange}
        loadMore={this.loadMore}
        value={value}
        onChange={onChange}
        type={type}
        itemId={itemId}
      />
    );
  }
}
