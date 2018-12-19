import React from "react";
import ReactDOM from "react-dom";
import createProvider from "./createProvider";

const { Provider } = createProvider(0);

ReactDOM.render(
  <Provider>{(value, setValue) => <div>{value}</div>}</Provider>,
  document.getElementById("root1")
);

ReactDOM.render(
  <Provider>
    {(value, setValue) => (
      <div>
        {value}{" "}
        <button onClick={() => setValue(value => value + 1)}>Increment</button>
      </div>
    )}
  </Provider>,
  document.getElementById("root2")
);
