import forEach from 'lodash.foreach';

import getWebFontLoader from '../../shared/helpers/fonts/get-webfontloader';
import SettingModel from '../models/setting';

export default async (req, res, next) => {
  res.locals.header.push({
    tag: 'script',
    props: {
      src: '//ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js'
    }
  });

  try {
    const fontsSetting = await SettingModel.findOne({_id: 'fonts'});

    if (fontsSetting && fontsSetting.value) {
      const fonts = JSON.parse(fontsSetting.value);

      if (fonts.customFonts) {
        let css = '';

        forEach(fonts.customFonts, (customFont) => {
          const family = customFont.family;
          const map = customFont.files;
          const location = `/fonts/${customFont.id}/`;

          css += `@font-face {
            font-family: "${family}";
            src: url("${location}${map.eot}");
            src:
          `;

          if (map.woff2) {
            css += `url("${location}${map.woff2}"), `;
          }

          css += `
            url("${location}${map.woff}"),
            url("${location}${map.ttf}");
          }
          `;
        });

        if (css !== '') {
          res.locals.header.push({
            tag: 'style',
            props: {
              type: 'text/css'
            },
            content: css
          });
        }
      }

      const webfontloader = getWebFontLoader(fonts);
      res.locals.header.push({
        tag: 'script',
        content: `WebFont.load(${JSON.stringify(webfontloader)});`
      });
    }

    next();
  } catch (err) {
    next();
  }
};
