import jss from '../../../helpers/stylesheet';

export default jss.createRules({
  overable: {
    '.over-image': {
      display: 'none'
    },
    ':hover': {
      '.normal-image': {
        display: 'none'
      },
      '.over-image': {
        display: 'inline-block'
      }
    }
  }
});
