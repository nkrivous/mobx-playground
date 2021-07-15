import React, { memo, useCallback, useState } from "react";
import { useRenderCount } from "../helpers/useRenderCount";
import { useMountLog } from "../helpers/useMountLog";
import { useMountCount } from "../helpers/useMountCount";

export function ComponentsComposition(props) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const onClick1 = useCallback(() => {
    setCount1((c) => c + 1);
  }, []);
  const onClick2 = useCallback(() => {
    setCount2((c) => c + 1);
  }, []);

  return (
    <div>
      <RenderProps
        Label={(text) => <Label text={text} />}
        Button={
          <Button text={"Button Canva DI"} times={count2} onClick={onClick2} />
        }
      />
      <CanvaDI
        Label={(props) => <Label {...props} text={"Label Canva DI"} />}
        Button={() => (
          <Button text={"Button Canva DI"} times={count1} onClick={onClick1} />
        )}
      />
    </div>
  );
}

const Label = memo(function Label({ text }) {
  const renderCount = useRenderCount();

  useMountLog(text);
  return (
    <p>
      {text}: {renderCount}
    </p>
  );
});

const Button = memo(function Button({ text, times, onClick }) {
  const count = useRenderCount();
  useMountLog(text);

  return (
    <label>
      <p>Button rerendered: {count}</p>
      <button onClick={onClick}>Click me: {times}</button>
    </label>
  );
});

const RenderProps = memo(function RenderProps({ Label, Button }) {
  const renderCount = useRenderCount();
  useMountLog("Canva DI");

  return (
    <fieldset>
      <legend>RenderProps</legend>
      <p>Rerendered: {renderCount}</p>
      {Label("Label RenderProps")}
      {Button}
    </fieldset>
  );
});

const CanvaDI = memo(function CanvaDI({ Label, Button }) {
  const renderCount = useRenderCount();
  useMountLog("Canva DI");

  return (
    <fieldset>
      <legend>CanvaDI</legend>
      <p>Rerendered: {renderCount}</p>
      <Label text={"Label rerendered"} />
      <Button />
    </fieldset>
  );
});
