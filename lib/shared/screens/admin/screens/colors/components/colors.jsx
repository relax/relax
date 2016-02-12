import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentSearch from 'components/content-search';
import React, {PropTypes} from 'react';

import styles from './colors.less';
import List from './list';

export default class Colors extends Component {
  static fragments = List.fragments;

  static propTypes = {
    colors: PropTypes.array.isRequired
  };

  render () {
    const {colors} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentSearch value='' />
        </ContentHeader>
        <Content>
          <List colors={colors} />
        </Content>
      </div>
    );
  }
}
