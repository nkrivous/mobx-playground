import React, { useCallback } from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { createSelectParent } from "./SelectParent";
import { createSelectChild } from "./SelectChild";
import { getOptions as getParentOptions } from "./SelectParent";
import { getOptions as getChildOptions } from "./SelectChild";

class Store {
  parentValue;
  childValue;

  constructor(parentInitialValue, childInitialValue) {
    this.parentValue = parentInitialValue;
    this.childValue = childInitialValue;
    makeObservable(this, {
      parentValue: observable,
      childValue: observable,
      childOptions: computed,
    });
  }

  get parentOptions() {
    return getParentOptions();
  }

  get childOptions() {
    return getChildOptions(this.parentValue);
  }
}

class Presenter {
  constructor() {
    makeObservable(this, {
      onParentChange: action,
      onChildChange: action,
      onSubmit: action,
    });
  }

  onParentChange(store, value) {
    store.childValue = "";
    store.parentValue = value;
  }

  onChildChange(store, value) {
    store.childValue = value;
  }

  onSubmit(store) {
    console.log({
      selectParent: store.parentValue,
      selectChild: store.childValue,
    });
  }
}

function Form({ SelectParent, SelectChild, onSubmit }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  return (
    <form onSubmit={handleSubmit}>
      <SelectParent />
      <SelectChild />
      <button type="submit">Submit</button>
    </form>
  );
}

const parentInitialValue = "1";
const childInitialValue = "14";

export function MobXFormCopyState() {
  const store = new Store(parentInitialValue, childInitialValue);
  const presenter = new Presenter();

  // eslint-disable-next-line no-unused-vars
  const { Component: SelectParentComponent, dispose: disposeParentComponent } =
    createSelectParent(store, presenter.onParentChange.bind(this, store));

  // eslint-disable-next-line no-unused-vars
  const { Component: SelectChildComponent, dispose: disposeChildComponent } =
    createSelectChild(store, presenter.onChildChange.bind(this, store));

  const onSubmit = () => presenter.onSubmit(store);

  return (
    <Form
      SelectParent={SelectParentComponent}
      SelectChild={SelectChildComponent}
      onSubmit={onSubmit}
    />
  );
}
