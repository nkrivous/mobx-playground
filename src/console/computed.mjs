import mobx from "mobx";

mobx.configure({ enforceActions: "never" });

// Ex 6.1 `computed`.

const box = mobx.observable.box("a");

const computed = mobx.computed(() => {
  const val = box.get() + "_computed";
  console.log("compute:", val);
  return val;
});
// Logs nothing: the computed doesn't run until it's used.
// Note: There's no need to dispose of a `computed`. That's handled automatically.

computed.get();
// Logs 'compute: a_computed'
// The callback was run and its return value returned from `.get()`

computed.get();
// Logs 'compute: a_computed'
// It ran _again_! `computed` _only_ avoids repeated computation when being tracked

const dispose = mobx.autorun(() => {
  console.log("autorun: ", computed.get());
});
// Logs 'compute: a_computed'
// Logs 'autorun: a_computed'
// The `autorun` ran, which called `computed.get()` and ran the computed

computed.get();
// Does not log anything. Computed is now tracked and memoized, so it just
// immediately returns the value from last time.

box.set("b");
// Logs 'compute: b_computed'
// Logs 'autorun: b_computed'

dispose();
