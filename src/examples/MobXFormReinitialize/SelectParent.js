import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

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

export function createSelectParent(value, onApply, options) {
  const store = new Store(value);
  const presenter = new Presenter();

  const handleChange = (value) => {
    presenter.onChange(store, value);
  };

  const Component = observer(() => {
    return (
      <fieldset>
        <Select value={store.value} onChange={handleChange} options={options} />
        <button type="button" onClick={() => onApply(store.value)}>
          Apply
        </button>
      </fieldset>
    );
  });

  return Component;
}
