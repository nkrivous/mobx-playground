import React, { useCallback, useMemo, useState } from "react";
import { SelectField, getParentOptions, getChildOptions } from "./Select";

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
      {SelectParent}
      {SelectChild}
      <button type="submit">Submit</button>
    </form>
  );
}

const parentInitialValue = "1";
const childInitialValue = "14";

export function HooksForm() {
  const [parentValue, setParentValue] = useState(parentInitialValue);
  const [childValue, setChildValue] = useState(childInitialValue);

  const onParentChange = useCallback((value) => {
    setParentValue(value);
    setChildValue("");
  }, []);

  const onChildChange = useCallback((value) => {
    setChildValue(value);
  }, []);

  const onSubmit = useCallback(() => {
    console.log({
      selectParent: parentValue,
      selectChild: childValue,
    });
  }, [childValue, parentValue]);

  const parentOptions = useMemo(() => getParentOptions(), []);

  const childOptions = useMemo(
    () => getChildOptions(parentValue),
    [parentValue]
  );

  return (
    <Form
      SelectParent={
        <SelectField
          value={parentValue}
          onChange={onParentChange}
          options={parentOptions}
        />
      }
      SelectChild={
        <SelectField
          value={childValue}
          onChange={onChildChange}
          options={childOptions}
        />
      }
      onSubmit={onSubmit}
    />
  );
}
