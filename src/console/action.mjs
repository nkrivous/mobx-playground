import mobx from "mobx";

// Ex 6.1 `action`.

const boxA = mobx.observable.box("a");
const box1 = mobx.observable.box(1);
const box2 = mobx.observable.box(2);

const dispose = mobx.autorun(() => {
  console.log("autorun:", boxA.get(), box1.get(), box2.get());
});

function changeBoth(a, n) {
  boxA.set(a);
  box1.set(n);
}
console.log("1)");
changeBoth("b", 2);
// Logs 'autorun: b 1 2'
// Logs 'autorun: b 2 2'
// The `autorun` ran _twice_!

// `mobx.action(func)` returns a function that runs `func`, but batches
// suspends all reactions to state changes until `func` returns.
const changeBothAction = mobx.action(changeBoth);

console.log("2)");
changeBothAction("c", 3);
// Logs 'autorun: c 3 2'
// The `autorun` ran only once.

const changeThree = mobx.action(function () {
  box2.set(2);
  changeBothAction("d", 4);
});

console.log("3)");
changeThree();

const changeThreeAsync = mobx.action(async function () {
  box2.set(3);
  await Promise.resolve();

  changeBothAction("e", 5);
});

console.log("4)");
changeThreeAsync();

//dispose();
