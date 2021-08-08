import React, { useCallback, memo, useEffect, useState, useRef } from "react";
import { useMountLog } from "../../helpers/useMountLog";
import { useRenderCount } from "../../helpers/useRenderCount";
import styles from "./styles.module.css";

export function Article({ Slot1, Slot2 }) {
  return (
    <article className={styles.article}>
      {Slot1}
      {Slot2}
    </article>
  );
}

export function Nav({ Slot1, Slot2 }) {
  return (
    <aside className={styles.aside}>
      {Slot1}
      {Slot2}
    </aside>
  );
}

export function Layout({ Nav, Article }) {
  return (
    <section className={styles.section}>
      {Nav}
      {Article}
    </section>
  );
}

function getNewColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
export function HeavyToRenderComponent() {
  const [, forceUpdate] = useState([]);
  const color = useRef(getNewColor());

  useEffect(() => {
    const id = setInterval(function () {
      color.current = getNewColor();
      forceUpdate([]);
    }, 10);
    const timeoutId = setTimeout(function () {
      clearInterval(id);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(id);
    };
  }, []);

  return <div style={{ backgroundColor: color.current }}>{color.current}</div>;
}

export function Select({ configurations, dataType, onSelect }) {
  const onChange = useCallback(
    (event) => {
      onSelect(event.target.value);
    },
    [onSelect]
  );
  return (
    <select value={dataType} onChange={onChange}>
      <option value={undefined}>--Please choose an option--</option>
      {configurations.map((configuration) => (
        <option key={configuration.type} value={configuration.type}>
          {configuration.name}
        </option>
      ))}
    </select>
  );
}

export const Table = memo(function Table({ data, onAddData, color, SlotTr }) {
  useMountLog("Table");
  return (
    <table border="1">
      <thead>
        <tr>
          <td>
            <button onClick={onAddData}>Add random data</button>
          </td>
          <td>
            <HeavyToRenderComponent key={Math.random()} />
          </td>
        </tr>
      </thead>
      <tbody bgcolor={color}>
        {data.map((x) => (
          <React.Fragment key={x}>{SlotTr(x)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
});

export const Tr = memo(function Tr({ rowValue, SlotTd, SlotButton }) {
  const count = useRenderCount();
  return (
    <tr>
      {SlotTd(rowValue)}
      <td>
        <HeavyToRenderComponent key={Math.random()} />
      </td>
      <td>{count}</td>
      <GenerateNewDataButton />
      {SlotButton(rowValue)}
    </tr>
  );
});

export const Td = memo(function Td({ children }) {
  return <td>{children}</td>;
});

export const RemoveButton = memo(function RemoveButton({ rowValue, onRemove }) {
  const count = useRenderCount();
  return (
    <Td>
      <button onClick={() => onRemove(rowValue)}>Remove</button> {count}
    </Td>
  );
});

export const GenerateNewDataButton = memo(function GenerateNewDataButton() {
  const [, forceUpdate] = useState([]);
  return (
    <Td>
      <button onClick={() => forceUpdate([])}>Update</button>
    </Td>
  );
});
