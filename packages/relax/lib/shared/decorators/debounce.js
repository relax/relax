export default function debounce (delay = 300) {
  return (target, key, descriptor) => {
    const fn = descriptor.value;
    let args;
    let context;
    let timer;

    descriptor.value = function debounced (...a) {
      args = a;
      context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
        args = context = timer = null;
      }, delay);
    };

    return descriptor;
  };
}
