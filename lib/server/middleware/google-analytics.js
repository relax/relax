import utils from '../../utils';
import SettingModel from '../models/setting';

export default async (req, res, next) => {
  res.locals.header.push({
    tag: 'script',
    props: {
      src: '//ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js'
    }
  });

  const googleAnalyticsSetting = await SettingModel
    .findById('googleAnalytics')
    .exec();

  if (googleAnalyticsSetting &&
      googleAnalyticsSetting.value &&
      utils.validateGATrackingId(googleAnalyticsSetting.value)) {
    res.locals.header.push({
      tag: 'script',
      content: `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', '${googleAnalyticsSetting.value}', 'auto');
      `
    });
    next();
  } else {
    next();
  }
};
