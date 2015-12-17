export default function getDefaultIcon (res) {
  return {
    tag: 'link',
    props: {
      rel: 'shortcut icon',
      type: 'image/vnd.microsoft.icon',
      href: `${res.baseScriptsURL}/images/admin/favicon.ico`
    }
  };
}
