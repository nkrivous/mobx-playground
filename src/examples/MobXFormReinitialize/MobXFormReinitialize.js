import React, { useCallback } from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { createSelectParent } from "./SelectParent";
import { createSelectChild } from "./SelectChild";
import { getOptions as getParentOptions } from "./SelectParent";
import { getOptions as getChildOptions } from "./SelectChild";
import { observer } from "mobx-react";

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

export function MobXFormReinitialize() {
  const store = new Store(parentInitialValue, childInitialValue);
  const presenter = new Presenter();

  const SelectParentComponent = observer(() => {
    const Component = createSelectParent(
      store.parentValue,
      presenter.onParentChange.bind(this, store),
      store.parentOptions
    );
    return <Component />;
  });

  const SelectChildComponent = observer(() => {
    const Component = createSelectChild(
      store.childValue,
      presenter.onChildChange.bind(this, store),
      store.childOptions
    );
    return <Component />;
  });

  const onSubmit = () => presenter.onSubmit(store);

  return (
    <Form
      SelectParent={SelectParentComponent}
      SelectChild={SelectChildComponent}
      onSubmit={onSubmit}
    />
  );
}
