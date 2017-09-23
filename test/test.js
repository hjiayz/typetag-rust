let assert = require("assert");
let t = new (require("typetag"))(true);
let i = t.index;
let rust = require("../index.js");
t.load(rust);
assert(!i.i16.is(1 << 15));
assert(i.i16.is(1 << 15 - 1));
i.tuple.new([i.u8, i.u16, i.i32], "tuple_u8_u16_i32");
i.tuple_u8_u16_i32.assert([255, 111, -100]);
i.array.new([i.u8, 3], "array_u8_3");
i.array_u8_3.assert([1, 2, 22])
i.hashmap.new([i.i8, i.i8], "hashmap_i8_i8")
i.hashmap_i8_i8.assert(new Map([[1, 92], [3, 4]]));
i.struct.new({ "name": i.string, "age": i.i8 }, "struct_name_age");
i.struct_name_age.assert({ name: "hjiayz", age: 90 });
i.enum.new({ "none": [], "some": [i.string] }, "enum_option_string");
i.enum_option_string.assert("none");
i.enum_option_string.assert({ "some": "nice" });
i.enum.new({ "none": [], "some": [i.string, i.string] }, "enum_option_string_string");
i.enum_option_string_string.assert("none");
i.enum_option_string_string.assert({ "some": ["nice", "boat"] });