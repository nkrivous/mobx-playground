import { action, makeObservable, observable, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";

export function getOptions(parentValue) {
  const dep = {
    "": [{ value: "", label: "" }],
    1: [
      { value: "", label: "" },
      { value: "12", label: "Child 1 - 2" },
      { value: "14", label: "Child 1 - 4" },
    ],
    3: [
      { value: "", label: "" },
      { value: "32", label: "Child 3 - 2" },
      { value: "34", label: "Child 3 - 4" },
    ],
  };
  return dep[parentValue];
}

class Store {
  value;
  constructor(value) {
    this.value = value;
    makeObservable(this, { value: observable });
  }
}

class Presenter {
  constructor() {
    makeObservable(this, { onChange: action, reset: action });
  }

  subscribeToValueChange(store, formStore) {
    return reaction(
      () => formStore.childValue,
      action((newValue) => {
        this.onChange(store, newValue);
      })
    );
  }

  subscribeToOptionsChange(store, formStore) {
    return reaction(
      () => formStore.childOptions,
      action(() => {
        this.reset(store);
      })
    );
  }

  onChange(store, value) {
    store.value = value;
  }

  reset(store) {
    store.value = "";
  }
}

function Select({ options, value, onChange }) {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function createSelectChild(formStore, onApply) {
  const store = new Store(formStore.childValue);
  const presenter = new Presenter();

  const unsubscribeToValueChange = presenter.subscribeToValueChange(
    store,
    formStore
  );
  const unsubscribeToOptionsChange = presenter.subscribeToOptionsChange(
    store,
    formStore
  );

  const handleChange = (value) => {
    presenter.onChange(store, value);
  };

  const Component = observer(() => {
    useEffect(() => {
      const dispose = () => {
        unsubscribeToValueChange();
        unsubscribeToOptionsChange();
      };
      return () => {
        dispose();
      };
    }, []);
    return (
      <fieldset>
        <Select
          value={store.value}
          onChange={handleChange}
          options={formStore.childOptions}
        />
        <button type="button" onClick={() => onApply(store.value)}>
          Apply
        </button>
      </fieldset>
    );
  });

  return Component;
}
