import authorize from '../../authorize';
import uploadedType from '../../types/uploaded';

export default {
  type: uploadedType,
  resolve (root, params, options) {
    authorize(root);
    return root.file;
  }
};
