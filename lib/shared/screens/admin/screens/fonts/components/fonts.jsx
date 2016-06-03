import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import Modal from 'components/modal';
import React, {PropTypes} from 'react';

import styles from './fonts.less';
import List from './list';
import Manage from './manage';
import PreviewText from './preview-text';

export default class Fonts extends Component {
  static fragments = List.fragments;

  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired,
    changePreviewText: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    display: PropTypes.oneOf(['list', 'grid']).isRequired,
    manage: PropTypes.bool.isRequired,
    openManage: PropTypes.func.isRequired,
    closeManage: PropTypes.func.isRequired
  };

  render () {
    const {fonts} = this.props;
    let result;

    if (fonts && Object.keys(fonts).length > 0) {
      result = this.renderHasContent();
    } else {
      result = this.renderNoContent();
    }

    return result;
  }

  renderHasContent () {
    const {fonts, previewText, display, changePreviewText, changeDisplay, openManage} = this.props;
    return (
      <div>
        <ContentHeader>
          <PreviewText value={previewText} onChange={changePreviewText} />
          <ContentHeaderActions>
            <ContentDisplays display={display} onChange={changeDisplay} />
            <ContentNew onClick={openManage}>Manage fonts</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List
            fonts={fonts}
            previewText={previewText}
            display={display}
          />
        </Content>
        {this.renderManage()}
      </div>
    );
  }

  renderNoContent () {
    return (
      <Content noOffset>
        <div className={styles.noFonts}>
          <div className={styles.noTitle}>Add new fonts!</div>
          <div className={styles.noText}>
            <span>Design and build your creations with amazing fonts from the</span>
            <br />
            <span>best providers or even your own.</span>
          </div>
          <Manage />
        </div>
      </Content>
    );
  }

  renderManage () {
    const {manage, closeManage} = this.props;

    if (manage) {
      return (
        <Modal onClose={closeManage} subTitle='Manage fonts' title='Where should we fetch them from?'>
          <Manage />
        </Modal>
      );
    }
  }
}
