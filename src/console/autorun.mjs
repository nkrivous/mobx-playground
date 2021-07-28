import mobx from "mobx";

mobx.configure({ enforceActions: "never" });
const box = mobx.observable.box('initial');

let outsideBox = undefined;

const dispose = mobx.autorun(() => {
  // Do something with the observable `box`, but don't access its contents
  outsideBox = box;

  console.log('autorun');
});

box.set('foo');
// Nothing happens. The reaction doesn't access any observable properties.

outsideBox.set('foo2');
// Still nothing.

dispose();
