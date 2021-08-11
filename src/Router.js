import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ComponentsComposition } from "./examples/ComponentsComposition";
import { MobXComponentComposition } from "./examples/MobXComponentComposition";
import { MobXFormSeparateState } from "./examples/MobXFormSeparateState";
import { MobXFormCopyState } from "./examples/MobXFormCopyState";
import { StateInContext } from "./examples/StateInContext";
import { MobXFormCommonState } from "./examples/MobXFormCommonState";

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
              <Link to="/mobx-form-separate-state">
                MobX Form Separate State
              </Link>
            </li>
            <li>
              <Link to="/mobx-form-copy-state">MobX Form Copy State</Link>
            </li>
            <li>
              <Link to="/mobx-form-common-state">MobX Form Common State</Link>
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
            <Route path="/mobx-form-separate-state">
              <MobXFormSeparateState />
            </Route>
            <Route path="/mobx-form-copy-state">
              <MobXFormCopyState />
            </Route>
            <Route path="/mobx-form-common-state">
              <MobXFormCommonState />
            </Route>
            <Route path="/">Select an example</Route>
          </Switch>
        </section>
      </>
    </Router>
  );
}
