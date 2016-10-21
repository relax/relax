import jss from 'helpers/stylesheet';

export default jss.createRules({
  icon: {
    display: 'inline-block',
    textAlign: 'center'
  },
  menu: {
    position: 'fixed',
    listStyleType: 'none',
    zIndex: '999999',
    maxWidth: '100%',
    maxHeight: '100%',
    overflowY: 'auto'
  },
  submenu: {
    listStyleType: 'none'
  },
  menuButton: {
    textDecoration: 'none'
  }
});
