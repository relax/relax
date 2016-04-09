import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import React, {PropTypes} from 'react';

import List from './list';

export default class Colors extends Component {
  static fragments = List.fragments;

  static propTypes = {
    colors: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    duplicateColor: PropTypes.func.isRequired,
    removeColor: PropTypes.func.isRequired
  };

  render () {
    const {colors, search, searchChange, duplicateColor, removeColor} = this.props;

    return (
      <div>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <ContentNew>Add new color</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List
            colors={colors}
            search={search}
            duplicateColor={duplicateColor}
            removeColor={removeColor}
          />
        </Content>
      </div>
    );
  }
}
