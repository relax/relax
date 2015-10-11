import Relay from 'react-relay';

export default class UpdatePage extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation {updatePage}`;
  }

  getVariables () {
    console.log(this.props);
    return {
      data: this.props.data
    };
  }

  getFatQuery () {
    return Relay.QL`
      fragment on UpdatePagePayload {
        page {
          title,
          slug,
          state,
          updatedDate,
          updatedBy
        }
      }
    `;
  }

  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        page: this.props._id
      }
    }];
  }

  static fragments = {
    page: () => Relay.QL`
      fragment on Page {
        _id
      }
    `
  };
}
