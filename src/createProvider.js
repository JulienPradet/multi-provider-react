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
      object: {
        value: props.subscription.getValue(),
        setValue: props.subscription.setValue
      }
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscription.subscribe(value =>
      this.setState({
        object: {
          value,
          setValue: this.props.subscription.setValue
        }
      })
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.children(this.state.object);
  }
}

export default initialValue => {
  const Context = React.createContext(initialValue);
  const subscription = Subscription(initialValue);

  return {
    subscription: subscription,
    Consumer: Context.Consumer,
    Provider: ({ children }) => {
      return (
        <ListenSubscription subscription={subscription}>
          {(
            object // object = {value, setValue}
          ) => <Context.Provider value={object}>{children}</Context.Provider>}
        </ListenSubscription>
      );
    }
  };
};
