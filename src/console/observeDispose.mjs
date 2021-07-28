import mobx from "mobx";

const box1 = mobx.observable.box();
box1.get()

box1.set(5)
box1.get() // 5

// Register an observer function on the box. Returns a `dispose` function.
const dispose = mobx.observe(box1, x =>{
     console.log(x.oldValue, x.newValue)
});

box1.set('foo')
// Logs `5 'foo'`
box1.set('bar')
// Logs `'foo' 'bar'`
box1.set('bar')
// Does not log anything. The value in the box did not change.

dispose()
// Always dispose reactions once you no longer need them.
// This prevents them from running again, and frees up any memory they were using.

box1.set('never')
// Does not log anything. The `observe` was disposed.

const box2 = mobx.observable.box();

box2.set({ a: 7 })
const dispose2 = mobx.observe(box2, x =>{
     console.log("box2",x.oldValue, x.newValue)
});
box2.set({ a: 7 })
dispose2();

const box3 = mobx.observable.box({ a: 7 }, { deep: false });
const dispose3 = mobx.observe(box3, x =>{
     console.log("box3",x.oldValue, x.newValue)
});
box3.set({ a: 7 })
dispose3();

const box4 = mobx.observable.box({ a: 7 }, { deep: true });
const dispose4 = mobx.observe(box4, x =>{
     console.log("box4", x.oldValue, x.newValue)
});
box4.set({ a: 7 })
dispose4()
