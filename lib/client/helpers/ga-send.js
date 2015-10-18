export default function gaSend () {
  if (typeof window !== 'undefined') {
    window.ga && window.ga('send', 'pageview');
  }
}
