import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";
import { CurrentUserProvider } from "./components/CurrentUserContext";

ReactDOM.render(
  <Router>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </Router>,
  document.getElementById("root")
);
