import jss from '../../../react-jss';

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
        display: 'block'
      }
    }
  }
});
