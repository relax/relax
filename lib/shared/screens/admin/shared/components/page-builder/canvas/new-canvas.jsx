import Body from 'elements/body';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
import displays from 'statics/displays';
import React, {PropTypes} from 'react';

import NoLinks from './no-links';
import classes from './canvas.less';

export default class Canvas extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    template: PropTypes.object
  };

  render () {
    const {display} = this.props;
    const bodyStyle = {
      maxWidth: displays[display]
    };

    return (
      <Scrollable className={classes.canvas} onScroll={this.onScroll}>
        <div className={classes.content} style={bodyStyle} ref='body' id='pb-canvas'>
          {this.renderContent()}
        </div>
        {this.renderNoLinks()}
        <Styles />
      </Scrollable>
    );
  }

  renderNoLinks () {
    const {template, type} = this.props;
    const templateHasLinks = !!(template && template.links && template.links[type]);

    if (template && !templateHasLinks) {
      return <NoLinks templateId={template._id} />;
    }
  }

  renderContent () {
    const {template} = this.props;

    return (
      <Body
        id='body'
        context={template ? template._id : 'data'}
      />
    );
  }
}
