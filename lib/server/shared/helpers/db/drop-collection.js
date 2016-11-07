export default (collection) => new Promise((resolve, reject) => {
  collection.drop((err) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});
