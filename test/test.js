let assert = require("assert");
let t = new (require("typetag"))(true);
let i = t.index;
let rust = require("../index.js");
t.load(rust);
t.load(require("typetag-fn"));
assert(!i.i16.is(1 << 15));
assert(i.i16.is(1 << 15 - 1));
i.char.assert("t");
i.char.assert("型");
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
let option_i32 = i.option(i.i32);
option_i32.assert(null);
option_i32.assert(2147483647);
let result_i32_bool = i.result([i.i32, i.bool]);
result_i32_bool.assert({ "Ok": -2147483648 });
i.fn([i.i8, struct_name_age]).assert(t.fn(i.i8, struct_name_age, (src) => ({ "name": "hjiayz", "age": src })));