export default function safeHtmlString (str) {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}
