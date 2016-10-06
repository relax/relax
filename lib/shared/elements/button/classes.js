import jss from 'helpers/stylesheet';

export default jss.createRules({
  holder: {
    textAlign: 'center'
  },
  button: {
    cursor: 'pointer'
  },
  sided: {
    display: 'block',
    '>div': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  }
});
