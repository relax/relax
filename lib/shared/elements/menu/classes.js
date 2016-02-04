import jss from 'helpers/stylesheet';

export default jss.createRules({
  menu: {
    listStyleType: 'none',
    padding: '0px',
    margin: '0px',
    textAlign: 'left',
    'li:last-child': {
      marginRight: '0px'
    }
  },
  menuItem: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top',
    marginRight: '20px'
  },
  button: {
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer'
  },
  submenu: {
    position: 'absolute',
    top: '100%',
    left: 0
  },
  submenuItem: {
    display: 'block',
    textAlign: 'left'
  },
  submenuButton: {
    display: 'block',
    textDecoration: 'none',
    cursor: 'pointer'
  }
});
