let assert = require("assert");
let t = new (require("typetag"))(true);
let i = t.index;
let rust = require("../index.js");
t.load(rust);
assert(!i.i16.is(1 << 15));
assert(i.i16.is(1 << 15 - 1));
let tuple_u8_u16_i32 = i.tuple([i.u8, i.u16, i.i32]);
tuple_u8_u16_i32.assert([255, 111, -100]);
let array_u8_3 = i.array([i.u8, 3]);
array_u8_3.assert([1, 2, 22])
let struct_name_age = i.struct({ "name": i.string, "age": i.i8 });
struct_name_age.assert({ name: "hjiayz", age: 90 });
let enum_option_string = i.enum({ "none": [], "some": [i.string] });
enum_option_string.assert("none");
enum_option_string.assert({ "some": "nice" });
let enum_option_string_string = i.enum({ "none": [], "some": [i.string, i.string] });
enum_option_string_string.assert("none");
enum_option_string_string.assert({ "some": ["nice", "boat"] });