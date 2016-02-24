import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import React, {PropTypes} from 'react';

import styles from './fonts.less';
import List from './list';
import PreviewText from './preview-text';

export default class Fonts extends Component {
  static fragments = List.fragments;

  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired,
    changePreviewText: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  };

  render () {
    const {fonts, previewText, changePreviewText, changeDisplay, display} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <PreviewText value={previewText} onChange={changePreviewText} />
          <ContentHeaderActions>
            <ContentDisplays display={display} onChange={changeDisplay} />
            <ContentNew>Manage fonts</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List fonts={fonts} previewText={previewText} display={display} />
        </Content>
      </div>
    );
  }
}
