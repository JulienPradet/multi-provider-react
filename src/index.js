import React from "react";
import ReactDOM from "react-dom";
import createProvider from "./createProvider";

const { Provider, Consumer } = createProvider(0);

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
