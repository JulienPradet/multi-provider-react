import React from "react";
import ReactDOM from "react-dom";
import Store from "./Store";
import createProvider from "./createProvider";

const store = Store(0);
const { Provider, Consumer } = createProvider(store);

ReactDOM.render(
  <Provider>
    Root1
    <Consumer>{({ value }) => <div>{value}</div>}</Consumer>
  </Provider>,
  document.getElementById("root1")
);

ReactDOM.render(
  <Provider>
    Root2
    <Consumer>
      {({ value, setValue }) => (
        <div>
          {value}{" "}
          <button onClick={() => setValue(value => value + 1)}>
            Increment
          </button>
        </div>
      )}
    </Consumer>
  </Provider>,
  document.getElementById("root2")
);
