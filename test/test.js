let assert = require("assert");
let t = new (require("typetag"))();
let i = t.index;
let rust = require("../index.js");
t.load(rust);
assert(!i.i16.is(1 << 15));
assert(i.i16.is(1 << 15 - 1));
