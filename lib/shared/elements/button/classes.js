import jss from 'helpers/stylesheet';

export default jss.createRules({
  holder: {
    textAlign: 'center'
  },
  button: {
    color: '#ffffff',
    backgroundColor: '#282828',
    borderRadius: '3px 3px 3px 3px',
    padding: '11px 20px 11px 20px',
    maxWidth: '250px',
    display: 'inline-block',
    cursor: 'pointer',
    ':hover': {
      color: '#282828',
      backgroundColor: '#ffffff'
    }
  },
  sided: {
    display: 'block',
    '>div': {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }
});
