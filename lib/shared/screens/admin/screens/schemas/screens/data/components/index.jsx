import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentLoading from 'components/content-loading';
import EditableTitle from 'components/editable-title';
import React, {PropTypes} from 'react';

export default class DataSchema extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {schema, loading} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!schema) {
      result = this.renderNotFound();
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderContent () {
    const {schema} = this.props;
    return (
      <div>
        <ContentHeader>
          <EditableTitle value={schema.title} onSubmit={() => {}} />
        </ContentHeader>
        <Content></Content>
      </div>
    );
  }

  renderNotFound () {
    return (<div>Schema not found</div>);
  }
}
