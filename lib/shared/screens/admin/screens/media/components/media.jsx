import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentSearch from 'components/content-search';
import React, {PropTypes} from 'react';

import styles from './media.less';

export default class Media extends Component {
  render () {
    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentSearch value='' />
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          Media list
        </Content>
      </div>
    );
  }
}
