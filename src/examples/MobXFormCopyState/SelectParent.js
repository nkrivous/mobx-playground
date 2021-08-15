import { action, makeObservable, observable, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";

export function getOptions() {
  return [
    { value: "", label: "" },
    { value: "1", label: "Parent 1" },
    { value: "3", label: "Parent 3" },
  ];
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
    makeObservable(this, { onChange: action });
  }

  subscribeToFormChanges(store, formStore) {
    return reaction(
      () => formStore.parentValue,
      action((newValue) => {
        this.onChange(store, newValue);
      })
    );
  }

  onChange(store, value) {
    store.value = value;
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

export function createSelectParent(formStore, onApply) {
  const store = new Store(formStore.parentValue);
  const presenter = new Presenter();

  const handleChange = (value) => {
    presenter.onChange(store, value);
  };

  const Component = observer(() => {
    useEffect(() => {
      const dispose = presenter.subscribeToFormChanges(store, formStore);
      return () => {
        dispose();
      };
    }, []);
    return (
      <fieldset>
        <Select
          value={store.value}
          onChange={handleChange}
          options={formStore.parentOptions}
        />
        <button type="button" onClick={() => onApply(store.value)}>
          Apply
        </button>
      </fieldset>
    );
  });

  return Component;
}
