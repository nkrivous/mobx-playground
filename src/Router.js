import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ComponentsComposition } from "./examples/ComponentsComposition";
import { MobXComponentComposition } from "./examples/MobXComponentComposition";
import { MobXForm } from "./examples/MobXForm";
import { StateInContext } from "./examples/StateInContext";

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
            <li>
              <Link to="/mobx-components-composition">
                MobX Components Composition
              </Link>
            </li>
            <li>
              <Link to="/state-in-context">State in Context</Link>
            </li>
            <li>
              <Link to="/mobx-form">MobX Form</Link>
            </li>
          </ul>
        </nav>

        <section>
          <Switch>
            <Route path="/components-composition">
              <ComponentsComposition />
            </Route>
            <Route path="/mobx-components-composition">
              <MobXComponentComposition />
            </Route>
            <Route path="/state-in-context">
              <StateInContext />
            </Route>
            <Route path="/mobx-form">
              <MobXForm />
            </Route>
            <Route path="/">Select an example</Route>
          </Switch>
        </section>
      </>
    </Router>
  );
}
