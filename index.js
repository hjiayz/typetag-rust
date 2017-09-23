module.exports = (t) => {
    let i = t.index
    let isInt = Number.isInteger;
    t.raw
        .verify((o) => isInt(o) && o < 256 && o >= 0).define("u8")
        .verify((o) => isInt(o) && o < (1 << 16) && o >= 0).define("u16")
        .verify((o) => isInt(o) && o <= (-1 >>> 0) && o >= 0).define("u32").define("usize")
        .verify((o) => isInt(o) && o < (1 << 7) && o >= (-1 << 7)).define("i8")
        .verify((o) => isInt(o) && o < (1 << 15) && o >= (-1 << 15)).define("i16")
        .verify((o) => isInt(o) && o <= (-1 >>> 1) && o >= (-1 << 31)).define("i32").define("isize")
        .verify((o) => typeof o == "number").define("f64")
        .verify((o) => typeof o == "string").define("string")
    t.generic.verify((o, p) => Array.isArray(o) && o.every((v) => p.is(v))).paramtype(i.type).define("slice");
    i.slice.new(i.type, "slice_type");
    t.generic.verify((o, p) => Array.isArray(o) && (o.length == p.length) && o.every((v, i) => p[i].is(v))).paramtype(i.slice_type).define("tuple");
    i.tuple.new([i.type, i.usize], "tuple_type_usize");
    t.generic.verify((o, p) => Array.isArray(o) && (o.length == p[1]) && (o.every((v) => p[0].is(v)))).paramtype(i.tuple_type_usize).define("array");
    i.array.new([i.type, 2], "array_type_2");
    t.generic.verify((o, p) => o.constructor === Map && Array.from(o).every(v => p[0].is(v[0]) && p[1].is(v[1]))).paramtype(i.array_type_2).define("hashmap");
    i.hashmap.new([i.string, i.type], "map_string_type");
    t.generic.verify((o, p) => (typeof o == "object") && (Object.keys(o).length === p.size) && Array.from(p).every(p => p[1].is(o[p[0]]))).paramtype(i.map_string_type).define("struct");
    i.hashmap.new([i.string, i.slice_type], "map_string_slice_type");
    t.generic.verify((o, p) => {
        if (typeof o == "string") return (p.has(o)) && (p.get(o).length == 0);
        if (typeof o != "object") return false;
        let lit = Object.keys(o)[0];
        let types = p.get(lit);
        let val = o[lit];
        if (types.length == 1) return types[0].is(val);
        return Array.isArray(val) && (types.length == val.length) && types.every((v, i) => v.is(val[i]))
    }).paramtype(i.map_string_slice_type).define("enum");
}