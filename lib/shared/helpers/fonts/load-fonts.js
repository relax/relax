import Promise from 'bluebird';

import getWebFontLoader from './get-webfontloader';

export default function loadFonts (input) {
  const webfontloader = getWebFontLoader(input);
  const deferred = Q.defer();
  const newFonts = {};

  if (Object.keys(webfontloader).length === 0) {
    deferred.resolve(newFonts);
  } else {
    const params = {
      active: () => {
        deferred.resolve(newFonts);
      },
      fontactive: (familyName, fvd) => {
        newFonts[familyName] = newFonts[familyName] || [];
        newFonts[familyName].push(fvd);
      },
      ...webfontloader
    };

    WebFont.load(params); // eslint-disable-line no-undef
  }

  return deferred.promise;
}
