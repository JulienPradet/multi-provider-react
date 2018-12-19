import React from "react";

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

export default subscription => {
  const Context = React.createContext(subscription.getValue());

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
