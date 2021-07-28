import mobx from "mobx";

mobx.configure({ enforceActions: "never" });

// Ex 5.1: Observable object vs original object.
const foo = { name: "foo" };
const fooBox = mobx.observable.box(foo);
const obsFoo = mobx.observable(foo);
console.log(fooBox.get() == obsFoo);

const obsMap = mobx.observable(
  new Map([
    ["a", 8],
    ["b", 9],
  ])
);

const obsArray = mobx.observable([1, 2, 3]);

const dispose = mobx.autorun(() => {
  console.log("object", obsFoo.name);
  console.log("map", obsMap.get("a"));
  console.log("array", obsArray[0]);
});

obsFoo.name = "bar"; // runs reaction
// Logs 'object bar'
// Logs 'map 8'
// Logs 'array 1'
obsFoo.unknown = "a";
// Does not run reaction (`obsFoo.unknown` is not tracked)

obsMap.set("a", 88);
// Logs 'object bar'
// Logs 'map 88'
// Logs 'array 1'
obsMap.set("b", 99);
// Does not run the reaction (key `'b'` of `obsMap` is not tracked)

obsArray[0] = 9; // runs reaction
// Logs 'object bar'
// Logs 'map 88'
// Logs 'array 9'
obsArray[1] = 7;
// Logs 'object bar'
// Logs 'map 88'
// Logs 'array 9'
dispose();
