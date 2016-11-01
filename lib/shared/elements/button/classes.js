import jss from 'helpers/stylesheet';

export default jss.createRules({
  holder: {
    textAlign: 'center'
  },
  button: {
    cursor: 'pointer',
    textDecoration: 'none'
  },
  sided: {
    display: 'block',
    '>div': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  }
});
