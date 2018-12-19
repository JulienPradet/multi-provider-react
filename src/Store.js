function Store(initialValue) {
  let value = initialValue;
  let listeners = [];

  return {
    getValue: () => value,
    setValue: updater => {
      value = typeof updater === "function" ? updater(value) : updater;

      listeners.forEach(function(listener) {
        listener(value);
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);

      return function unsubscribe() {
        listeners = listeners.filter(function(item) {
          return item !== listener;
        });
      };
    }
  };
}

export default Store;
