import Q from 'q';

export default function loadFonts (body) {
  const {dispatch: callback, webfontloader, type} = body;

  return new Q()
    .then(() => {
      const deferred = Q.defer();
      let promise = deferred.promise;
      const newFonts = {};

      function loadingFontsFinished () {
        deferred.resolve(newFonts);
      }

      function fontActive (familyName, fvd) {
        if (!newFonts[familyName]) {
          newFonts[familyName] = [];
        }
        newFonts[familyName].push(fvd);
      }

      if (Object.keys(webfontloader).length === 0) {
        deferred.resolve(newFonts);
      } else {
        const params = {
          active: loadingFontsFinished,
          fontactive: fontActive,
          ...webfontloader
        };

        WebFont.load(params); // eslint-disable-line no-undef
      }

      if (callback) {
        promise = promise.then((fonts) => {
          callback({type, fonts});
        });
      }

      return promise;
    });
}
