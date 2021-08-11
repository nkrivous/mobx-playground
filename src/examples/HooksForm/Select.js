import { memo, useCallback } from "react";

export function getParentOptions() {
  return [
    { value: "", label: "" },
    { value: "1", label: "Parent 1" },
    { value: "3", label: "Parent 3" },
  ];
}

export function getChildOptions(parentValue) {
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

export const SelectField = memo(function SelectField({
  value,
  onChange,
  options,
}) {
  return (
    <fieldset>
      <Select value={value} onChange={onChange} options={options} />
      <button type="button" onClick={() => {}}>
        Apply
      </button>
    </fieldset>
  );
});
