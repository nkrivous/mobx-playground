import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ComponentsComposition } from "./examples/ComponentsComposition";

export function RouterComponent() {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/components-composition">Components Composition</Link>
            </li>
          </ul>
        </nav>

        <section>
          <Switch>
            <Route path="/components-composition">
              <ComponentsComposition />
            </Route>
            <Route path="/">Select an example</Route>
          </Switch>
        </section>
      </>
    </Router>
  );
}
