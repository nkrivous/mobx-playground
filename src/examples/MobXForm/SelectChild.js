import { action, makeObservable, observable, computed, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

function getOptions(parentValue) {
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

  onChange(store, value) {
    store.value = value;
  }

  getOptions(parentStore) {
    return getOptions(parentStore.value);
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

export function createSelectChild(value, parentStore) {
  const store = new Store(value);
  const presenter = new Presenter();

  reaction(
    () => parentStore.value,
    () => {
      presenter.reset(store);
    }
  );

  const options = computed(() => presenter.getOptions(parentStore));

  const onChange = (value) => {
    presenter.onChange(store, value);
  };

  const Component = observer(() => (
    <Select value={store.value} onChange={onChange} options={options.get()} />
  ));

  return {
    store,
    Component,
  };
}
