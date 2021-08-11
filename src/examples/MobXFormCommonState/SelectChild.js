import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

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

export function createSelectChild(store, onChange, getOptions) {
  const Component = observer(() => (
    <fieldset>
      <Select value={store.value} onChange={onChange} options={getOptions()} />
      <button type="button" onClick={() => {}}>
        Apply
      </button>
    </fieldset>
  ));

  return Component;
}
