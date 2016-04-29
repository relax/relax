import authorize from '../../authorize';
import sessionType from '../../types/session';

export default {
  type: sessionType,
  resolve (root) {
    authorize(root);

    let result;

    if (root.isAuthenticated) {
      result = {userId: root.user._id};
    } else {
      throw new Error('Not authenticated');
    }

    return result;
  }
};
