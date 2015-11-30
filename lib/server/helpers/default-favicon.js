export default function getDefaultIcon (res) {
  return {
    tag: 'link',
    props: {
      rel: 'icon',
      type: 'image/vnd.microsoft.icon',
      href: `${res.baseScriptsURL}/images/admin/favicon.ico`
    }
  };
}
