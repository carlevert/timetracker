function logClass(target: any) {
 
  // save a reference to the original constructor
  var original = target;
 
  // a utility function to generate instances of a class
  function construct(constructor, args) {
    var c : any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }
 
  // the new constructor behaviour
  var f : any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  }
 
  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;
  f.prototype.boo = () => console.log("boo");
  // return new constructor (will override original)
  return f;
}

interface MyViewModel {
    label1: string;
    label2: string;
}

class Dialog<T, U> {

    public x: string = "ASDF";

    constructor() {
    }

    public viewmodel: T & U;

}

@logClass
class MyDialog extends Dialog<MyViewModel, MyDialog> {
    
    public y: string = "ASDF";

    public getViewModel() {
        return "x";
    }

    public MyRealViewModel: MyViewModel = {
        label1: "1",
        label2: "2"
    };

    constructor() { 
        super();
        this.viewmodel = Object.assign({}, this.MyRealViewModel, this);
        console.log(this.viewmodel.label1);
        console.log(this.viewmodel.x);
    }

}

let d = new MyDialog();
d.boo();
