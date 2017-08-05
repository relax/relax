import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNew from 'components/content-new';
import Modal from 'components/modal';
import React from 'react';
import PropTypes from 'prop-types';

import List from './list';
import Manage from './manage';
import PreviewText from './preview-text';
import styles from './fonts.less';

export default class Fonts extends Component {
  static fragments = List.fragments;

  static propTypes = {
    fonts: PropTypes.object.isRequired,
    previewText: PropTypes.string.isRequired,
    changePreviewText: PropTypes.func.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    display: PropTypes.oneOf(['list', 'grid']).isRequired,
    manage: PropTypes.bool.isRequired,
    openManage: PropTypes.func.isRequired,
    closeManage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {fonts, loading} = this.props;
    let result;

    if (fonts && Object.keys(fonts).length > 0) {
      result = this.renderHasContent();
    } else if (loading) {
      result = this.renderLoading();
    } else {
      result = this.renderNoContent();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
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
        {this.renderLoadingContent()}
      </div>
    );
  }

  renderLoadingContent () {
    if (this.props.loading) {
      return (
        <ContentLoading above excludeHeader />
      );
    }
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
