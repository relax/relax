import rc from 'rc';

export default rc('relax', {
   port: 8080,
   db: {
      uri: 'mongodb://localhost/relax'
   }
});
