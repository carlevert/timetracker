var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logClass(target) {
    // save a reference to the original constructor
    var original = target;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("New: " + original.name);
        return construct(original, args);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    f.prototype.boo = function () { return console.log("boo"); };
    // return new constructor (will override original)
    return f;
}
var Dialog = (function () {
    function Dialog() {
        this.x = "ASDF";
    }
    return Dialog;
}());
var MyDialog = (function (_super) {
    __extends(MyDialog, _super);
    function MyDialog() {
        _super.call(this);
        this.y = "ASDF";
        this.MyRealViewModel = {
            label1: "1",
            label2: "2"
        };
        this.viewmodel = Object.assign({}, this.MyRealViewModel, this);
        console.log(this.viewmodel.label1);
        console.log(this.viewmodel.x);
    }
    MyDialog.prototype.getViewModel = function () {
        return "x";
    };
    MyDialog = __decorate([
        logClass
    ], MyDialog);
    return MyDialog;
}(Dialog));
var d = new MyDialog();
d.boo();
