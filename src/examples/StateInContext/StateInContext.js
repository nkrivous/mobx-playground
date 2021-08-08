import React, { memo, useCallback, useMemo, useState } from "react";
import {
  Layout,
  Nav,
  Article,
  HeavyToRenderComponent,
  Select,
  Table,
  Td,
  Tr,
  RemoveButton,
} from "./CommonComponents";

const DATA_TYPE_NUMBER = 1;
const DATA_TYPE_STRING = 2;

const numberConfiguration = {
  type: DATA_TYPE_NUMBER,
  name: "Number",
  color: "lightblue",
  initialData: [0.2, 0, 0.9],
  generate() {
    return Math.random().toFixed(3);
  },
};

const stringConfiguration = {
  type: DATA_TYPE_STRING,
  name: "String",
  color: "lightcoral",
  initialData: ["aasdac", "svdfba"],
  generate() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
  },
};

export function StateInContext() {
  const [dataType, setDataType] = useState(DATA_TYPE_NUMBER);
  const configurations = useMemo(
    () => [numberConfiguration, stringConfiguration],
    []
  );
  const configuration = useMemo(
    () => configurations.find((x) => x.type === +dataType),
    [configurations, dataType]
  );
  const initialData = useMemo(
    () =>
      configurations.reduce((prev, curr) => {
        prev[curr.type] = [...curr.initialData];
        return prev;
      }, {}),
    [configurations]
  );

  return (
    <Layout
      Nav={
        <NavComponent
          configurations={configurations}
          dataType={dataType}
          setDataType={setDataType}
        />
      }
      Article={
        <ArticleComponent
          configuration={configuration}
          initialData={initialData}
        />
      }
    />
  );
}

const NavComponent = memo(function NavComponent({
  configurations,
  dataType,
  setDataType,
}) {
  return (
    <Nav
      Slot1={
        <Select
          configurations={configurations}
          dataType={dataType}
          onSelect={setDataType}
        />
      }
      Slot2={<HeavyToRenderComponent key={Math.random()} />}
    />
  );
});

const ArticleComponent = memo(function ArticleComponent({
  configuration,
  initialData,
}) {
  const [dataObj, setDatObj] = useState(initialData);
  const onAddData = useCallback(() => {
    setDatObj((dataObj) => ({
      ...dataObj,
      [configuration.type]: [
        ...dataObj[configuration.type],
        configuration.generate(),
      ],
    }));
  }, [configuration]);
  const onRemove = useCallback(
    (value) => {
      setDatObj((dataObj) => ({
        ...dataObj,
        [configuration.type]: dataObj[configuration.type].filter(
          (x) => x !== value
        ),
      }));
    },
    [configuration]
  );

  const ButtonComponent = useCallback(
    (rowValue) => <RemoveButton rowValue={rowValue} onRemove={onRemove} />,
    [onRemove]
  );

  return (
    <Article
      Slot1={<HeavyComponent />}
      Slot2={
        configuration && (
          <Table
            data={dataObj[configuration.type]}
            onAddData={onAddData}
            color={configuration.color}
            SlotTr={(rowValue) => (
              <Tr
                rowValue={rowValue}
                SlotTd={SlotTd}
                SlotButton={ButtonComponent}
              />
            )}
          />
        )
      }
    />
  );
});

// function SlotButton(rowValue, onRemove) {
//   return (
//     <Td>
//       <button onClick={() => onRemove(rowValue)}>Remove</button>
//     </Td>
//   );
// }
//
function SlotTd(x) {
  return <Td>{x}</Td>;
}

const HeavyComponent = memo(function () {
  return <HeavyToRenderComponent key={Math.random()} />;
});
