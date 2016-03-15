import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentSearch from 'components/content-search';
import React, {PropTypes} from 'react';

import styles from './media.less';
import List from './list';

export default class Media extends Component {
  static fragments = List.fragments;

  static propTypes = {
    media: PropTypes.array.isRequired
  };

  render () {
    const {media} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentSearch value='' />
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List media={media} />
        </Content>
      </div>
    );
  }
}
