import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './linking.less';
import Property from './property';

export default class Linking extends Component {
  static fragments = {
    schema: {
      _id: 1,
      properties: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object,
    links: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object,
    linkingDataElementId: PropTypes.string.isRequired
  };

  render () {
    const {schema} = this.props;
    return (
      <div className={styles.root}>
        {
          schema &&
          schema.properties.map(
            this.renderProperty.bind(this, 'properties#')
          )
        }
      </div>
    );
  }

  renderProperty (prefix, property) {
    const {
      links,
      pageBuilderActions,
      linkingDataElementId
    } = this.props;

    return (
      <Property
        key={property.id}
        property={property}
        prefix={prefix}
        links={links && links[prefix + property.id] || []}
        pageBuilderActions={pageBuilderActions}
        linkingDataElementId={linkingDataElementId}
      />
    );
  }
}
