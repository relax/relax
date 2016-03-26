export default function bind (target, key, {value: fn}) {
  return {
    configurable: true,
    get () {
      const value = fn.bind(this);
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        writable: true
      });
      return value;
    }
  };
}
