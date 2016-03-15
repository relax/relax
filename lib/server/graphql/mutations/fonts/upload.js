import authorize from '../../authorize';
import uploadedType from '../../types/uploaded';

export default {
  type: uploadedType,
  resolve (root) {
    authorize(root);
    return root.file;
  }
};
