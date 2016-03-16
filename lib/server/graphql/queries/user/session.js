import authorize from '../../authorize';
import sessionType from '../../types/session';

export default {
  type: sessionType,
  resolve (root) {
    authorize(root);

    let result;

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
