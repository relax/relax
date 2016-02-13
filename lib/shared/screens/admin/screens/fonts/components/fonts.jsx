import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import React, {PropTypes} from 'react';

import styles from './fonts.less';
import List from './list';

export default class Fonts extends Component {
  static fragments = List.fragments;

  static propTypes = {
    fonts: PropTypes.object.isRequired
  };

  render () {
    const {fonts} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
            <ContentNew>Manage fonts</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List fonts={fonts} />
        </Content>
      </div>
    );
  }
}
