import Promise from 'bluebird';

import getWebFontLoader from './get-webfontloader';

/* global WebFont */

export default function loadFonts (input) {
  return new Promise((resolve) => {
    const webfontloader = getWebFontLoader(input);
    const newFonts = {};

    if (Object.keys(webfontloader).length === 0) {
      return resolve(newFonts);
    }
    const params = {
      active () {
        resolve(newFonts);
      },
      fontactive (familyName, fvd) {
        newFonts[familyName] = newFonts[familyName] || [];
        newFonts[familyName].push(fvd);
      },
      ...webfontloader
    };

    WebFont.load(params);
  });
}
