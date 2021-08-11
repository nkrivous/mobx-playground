import React, { useCallback } from "react";
import { action, makeObservable, observable } from "mobx";
import { createSelectParent, Store as ParentStore } from "./SelectParent";
import { createSelectChild, Store as ChildStore } from "./SelectChild";
import { getOptions as getParentOptions } from "./SelectParent";
import { getOptions as getChildOptions } from "./SelectChild";

class Store {
  parentStore;
  childStore;

  constructor(parentInitialValue, childInitialValue) {
    this.parentStore = new ParentStore(parentInitialValue);
    this.childStore = new ChildStore(childInitialValue);
    makeObservable(this, {
      parentStore: observable,
      childStore: observable,
    });
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
    store.childStore.value = "";
    store.parentStore.value = value;
  }

  onChildChange(store, value) {
    store.childStore.value = value;
  }

  getParentOptions() {
    return getParentOptions();
  }

  getChildOptions(parentStore) {
    return getChildOptions(parentStore.value);
  }

  onSubmit(store) {
    console.log({
      selectParent: store.parentStore.value,
      selectChild: store.childStore.value,
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

export function MobXFormCommonState() {
  const store = new Store(parentInitialValue, childInitialValue);
  const presenter = new Presenter();

  const SelectParentComponent = createSelectParent(
    store.parentStore,
    presenter.onParentChange.bind(this, store),
    presenter.getParentOptions
  );

  const SelectChildComponent = createSelectChild(
    store.childStore,
    presenter.onChildChange.bind(this, store),
    presenter.getChildOptions.bind(this, store.parentStore)
  );

  const onSubmit = () => presenter.onSubmit(store);

  return (
    <Form
      SelectParent={SelectParentComponent}
      SelectChild={SelectChildComponent}
      onSubmit={onSubmit}
    />
  );
}
