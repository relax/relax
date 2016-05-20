import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import Modal from 'components/modal';
import React, {PropTypes} from 'react';

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
    display: PropTypes.string.isRequired,
    manage: PropTypes.bool.isRequired,
    openManage: PropTypes.func.isRequired,
    closeManage: PropTypes.func.isRequired,
    fontsActions: PropTypes.object.isRequired
  };

  render () {
    const {fonts, previewText, changePreviewText, changeDisplay, display, openManage, fontsActions} = this.props;

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
            fontsActions={fontsActions}
          />
        </Content>
        {this.renderManage()}
      </div>
    );
  }

  renderManage () {
    const {manage, closeManage, fonts, fontsActions} = this.props;

    if (manage) {
      return (
        <Modal onClose={closeManage} subTitle='Manage fonts' title='Where should we fetch them from?'>
          <Manage fonts={fonts} fontsActions={fontsActions} closeManage={closeManage} />
        </Modal>
      );
    }
  }
}
