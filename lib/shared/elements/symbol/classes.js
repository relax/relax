import jss from 'helpers/stylesheet';

export default jss.createRules({
  row: {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
    textAlign: 'left'
  },
  column: {
    display: 'table-cell',
    verticalAlign: 'top',
    position: 'relative'
  }
});
