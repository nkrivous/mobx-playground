import mobx from "mobx";

mobx.configure({ enforceActions: "never" });

// Ex 2.1: `reaction` listens to `data`, runs `effect` with the data when it changes,
// and stops listening once `dispose` is called.
const box1 = mobx.observable.box('foo');
box1.get()
const dispose1 = mobx.reaction(
  () => {
       return box1.get() 
    }, // query/data function
   x => { 
       console.log('box1 now contains:', x) 
    }, // effect function
);

box1.set(5)
// Logs 'box1 now contains: 5'
box1.set(5)
// Logs nothing, because the data did not change

dispose1()
box1.set(7)
// Logs nothing, because we disposed of the reaction
