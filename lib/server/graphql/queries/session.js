import authorize from '../authorize';
import sessionType from '../types/session';

export default {
  type: sessionType,
  resolve (root, params, options) {
    authorize(root);

    var result;

    if (root.isAuthenticated) {
      result = root.user;
    } else {
      result = {
        error: 'No session'
      };
    }

    return result;
  }
};
