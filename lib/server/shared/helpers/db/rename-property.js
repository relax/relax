export default (Model, oldName, newName) => new Promise((resolve, reject) => {
  Model.collection.update(
    {},
    {
      $rename: {
        [oldName]: newName
      }
    },
    {multi: true},
    (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    }
  );
});
