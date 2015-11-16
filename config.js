import rc from 'rc';

export default rc('relax', {
   port: 8080,
   devPort: 8181,
   db: {
      uri: 'mongodb://localhost/relax'
   }
});
