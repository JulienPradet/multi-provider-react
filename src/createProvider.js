import React from "react";

function Subscription(initialValue) {
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

class ListenSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.subscription.getValue()
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscription.subscribe(value =>
      this.setState({ value })
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.children(
      this.state.value,
      this.props.subscription.setValue
    );
  }
}

export default initialValue => {
  const Context = React.createContext(initialValue);
  const subscription = Subscription(initialValue);

  return {
    Provider: ({ children }) => {
      return (
        <ListenSubscription subscription={subscription}>
          {(value, setValue) => (
            <Context.Provider value={value}>
              {children(value, setValue)}
            </Context.Provider>
          )}
        </ListenSubscription>
      );
    }
  };
};
