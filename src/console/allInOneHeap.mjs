import mobx, { makeAutoObservable, observable, computed } from "mobx";

class Person {
  constructor(name) {
    this.name = name;
    makeAutoObservable(this, {
      name: observable,
      splittedName: computed,
    });
  }

  get splittedName() {
    const result = this.name.split("");
    console.log("Computed: ", result);
    return result;
  }
}

const p1 = new Person("Ann");

// mobx.reaction(
//   function () {
//     return p1.name;
//   },
//   function (value) {
//     console.log("p1 name is:", value);
//   }
// );

mobx.autorun(function () {
  console.log("autorun: ", p1.splittedName);
});

mobx.runInAction(function () {
  p1.name = "Ivan";
});

let t = p1.splittedName;
console.log("1");
console.log([]);
