import Relay from 'react-relay';

export default class AdminRoute extends Relay.Route {
  static queries = {
    page: () => {
      return Relay.QL`
        query  {
          page (slug: $slug)
        }
      `;
    },
    pages: () => {
      return Relay.QL`
        query { pages }
      `;
    }
  };

  static paramDefinitions = {
  };

  static routeName = 'AdminRoute';
}
