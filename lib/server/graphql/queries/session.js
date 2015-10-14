import sessionType from '../types/session';

export default {
  type: sessionType,
  resolve: (root, params, options) => {
    let result;
    if (root.isAuthenticated) {
      result = root.user;
    } else {
      result = {
        error: 'No session'
      };
    }
    return {
      _id: 1,
      username: '1',
      name: '1',
      email: '1'
    };
  }
};
