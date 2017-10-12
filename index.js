module.exports = (t) => {
    let i = t.index
    let { raw, generic, type } = t;
    let isInt = Number.isInteger;
    raw((o) => isInt(o) && o < 256 && o >= 0).define("u8");
    raw((o) => isInt(o) && o < (1 << 16) && o >= 0).define("u16");
    raw((o) => isInt(o) && o <= (-1 >>> 0) && o >= 0).define("u32").define("usize")
    raw((o) => isInt(o) && o < (1 << 7) && o >= (-1 << 7)).define("i8")
    raw((o) => isInt(o) && o < (1 << 15) && o >= (-1 << 15)).define("i16")
    raw((o) => isInt(o) && o <= (-1 >>> 1) && o >= (-1 << 31)).define("i32").define("isize")
    raw((o) => typeof o == "number").define("f64")
    raw((o) => typeof o == "string").define("string").define("str")
    raw((o) => typeof o == "boolean").define("bool")
    raw((o) => i.string.is(o) && (o.length == 1)).define("char");
    generic((o, p) => Array.isArray(o) && o.every((v) => p.is(v)), type).define("slice").define("vec").define("linkedlist");
    let slice_type = i.slice(type);
    generic((o, p) => Array.isArray(o) && (o.length == p.length) && o.every((v, i) => p[i].is(v)), slice_type).define("tuple");
    i.tuple([]).define("unit");
    let tuple_type_usize = i.tuple([type, i.usize]);
    generic((o, p) => Array.isArray(o) && (o.length == p[1]) && (o.every((v) => p[0].is(v))), tuple_type_usize).define("array");
    let array_type_2 = i.array([type, 2]);
    generic((o, p) => o.constructor === Object && Object.values(o).every(v => p.is(v)), type).define("hashmap").define("btreemap");
    let map_type = i.hashmap(type);
    generic((o, p) => (typeof o == "object") && (Object.keys(o).length === Object.keys(p).length) && Object.keys(p).every(k => p[k].is(o[k])), map_type).define("struct");
    let map_slice_type = i.hashmap(slice_type);
    generic((o, p) => {
        if (typeof o == "string") return p[o].length == 0;
        if (typeof o != "object") return false;
        let lit = Object.keys(o)[0];
        let types = p[lit];
        let val = o[lit];
        if (types.length == 1) return types[0].is(val);
        return Array.isArray(val) && (types.length == val.length) && types.every((v, i) => v.is(val[i]))
    }, map_slice_type).define("enum");
    generic((o, p) => (o === null) || p.is(o), type).define("option");
    generic((o, p) => i.enum({ "Ok": [p[0]], "Err": [p[1]] }).is(o), array_type_2).define("result");
    generic((o, p) => (typeof o == "function") && (typeof o.meta == "object") && (p[0].eq(o.meta.param)) && (p[1].eq(o.meta.result)), array_type_2).define("fn");
}