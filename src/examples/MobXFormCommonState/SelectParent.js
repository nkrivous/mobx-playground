import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

export function getOptions() {
  return [
    { value: "", label: "" },
    { value: "1", label: "Parent 1" },
    { value: "3", label: "Parent 3" },
  ];
}

export class Store {
  value;
  constructor(value) {
    this.value = value;
    makeObservable(this, { value: observable });
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

export function createSelectParent(store, onChange, getOptions) {
  const Component = observer(() => {
    return (
      <fieldset>
        <Select
          value={store.value}
          onChange={onChange}
          options={getOptions()}
        />
        <button type="button" onClick={() => {}}>
          Apply
        </button>
      </fieldset>
    );
  });

  return Component;
}
