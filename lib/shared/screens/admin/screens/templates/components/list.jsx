import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class TemplatesList extends Component {
  static fragments = {
    templates: Entry.fragments.template
  };

  static propTypes = {
    templates: PropTypes.array.isRequired,
    activeTemplateId: PropTypes.string,
    query: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        {this.props.templates.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (template, key) {
    const {activeTemplateId, query} = this.props;
    return (
      <Entry template={template} key={key} active={activeTemplateId === template._id} query={query} />
    );
  }
}
