import React, { useCallback } from "react";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { createSelectParent } from "./SelectParent";
import { createSelectChild } from "./SelectChild";

class Store {
  selectParentStore;
  selectChildStore;
  constructor(selectParentStore, selectChildStore) {
    this.selectParentStore = selectParentStore;
    this.selectChildStore = selectChildStore;
    makeObservable(this, {
      selectParentStore: observable,
      selectChildStore: observable,
    });
  }
}

class Presenter {
  constructor() {
    makeObservable(this, { onSubmit: action });
  }

  onSubmit(store) {
    console.log({
      selectParent: store.selectParentStore.value,
      selectChild: store.selectChildStore.value,
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

export function MobXForm() {
  const { store: selectParentStore, Component: SelectParentComponent } =
    createSelectParent(parentInitialValue);
  const { store: selectChildStore, Component: SelectChildComponent } =
    createSelectChild(childInitialValue, selectParentStore);

  const store = new Store(selectParentStore, selectChildStore);
  const presenter = new Presenter();
  const onSubmit = () => presenter.onSubmit(store);

  const Component = observer(() => (
    <Form
      SelectParent={SelectParentComponent}
      SelectChild={SelectChildComponent}
      onSubmit={onSubmit}
    />
  ));
  return <Component />;
}
