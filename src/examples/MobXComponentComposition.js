import React from "react";
import { useRenderCount } from "../helpers/useRenderCount";
import { useMountLog } from "../helpers/useMountLog";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

class Store {
  count1 = 0;
  count2 = 0;
  constructor() {
    makeObservable(this, { count1: observable, count2: observable });
  }
}

class Presenter {
  #store;
  constructor(store) {
    this.#store = store;
    makeObservable(this, { incrementCount1: action, incrementCount2: action });
  }
  incrementCount1() {
    this.#store.count1++;
  }
  incrementCount2() {
    this.#store.count2++;
  }
}

export function MobXComponentComposition() {
  const store = new Store();
  const presenter = new Presenter(store);

  const onClick1 = () => {
    presenter.incrementCount1();
  };
  const onClick2 = () => {
    presenter.incrementCount2();
  };

  const ButtonComponent = observer(() => (
    <Button
      text={"Button RenderProps"}
      times={store.count2}
      onClick={onClick2}
    />
  ));
  return (
    <div>
      <RenderProps
        Label={(text) => <Label text={text} />}
        Button={<ButtonComponent />}
      />
      <CanvaDI
        Label={observer((props) => (
          <Label {...props} text={"Label Canva DI"} />
        ))}
        Button={observer(() => (
          <Button
            text={"Button Canva DI"}
            times={store.count1}
            onClick={onClick1}
          />
        ))}
      />
    </div>
  );
}

const Label = function Label({ text }) {
  const renderCount = useRenderCount();
  useMountLog(text);

  return (
    <p>
      {text}: {renderCount}
    </p>
  );
};

const Button = function Button({ text, times, onClick }) {
  const count = useRenderCount();
  useMountLog(text);

  return (
    <label>
      <p>Button rerendered: {count}</p>
      <button onClick={onClick}>Click me: {times}</button>
    </label>
  );
};

const RenderProps = function RenderProps({ Label, Button }) {
  const renderCount = useRenderCount();
  useMountLog("RenderProps");

  return (
    <fieldset>
      <legend>RenderProps</legend>
      <p>Rerendered: {renderCount}</p>
      {Label("Label RenderProps")}
      {Button}
    </fieldset>
  );
};

const CanvaDI = function CanvaDI({ Label, Button }) {
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
};
