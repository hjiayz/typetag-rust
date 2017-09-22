module.exports = (t) => {
    let i = t.index
    let isInt = Number.isInteger;
    t.raw
        .verify((o) => isInt(o) && o < 256 && o >= 0).define("u8")
        .verify((o) => isInt(o) && o < (1 << 16) && o >= 0).define("u16")
        .verify((o) => isInt(o) && o < (1 << 32) && o >= 0).define("u32").define("usize")
        .verify((o) => isInt(o) && o < (1 << 7) && o >= (-1 << 7)).define("i8")
        .verify((o) => isInt(o) && o < (1 << 15) && o >= (-1 << 15)).define("i16")
        .verify((o) => isInt(o) && o < (1 << 31) && o >= (-1 << 31)).define("i32").define("isize")
        .verify((o) => typeof o == "number").define("f64")
    t.generic.verify((o, p) => Array.isArray(o) && o.every((v) => p.is(v))).paramtype(i.type).define("slice");
    i.slice.new(i.type, "slice<type>");
    t.generic.verify((o, p) => Array.isArray(o) && (o.length == p.length) && o.every((v, i) => p[i].is(v))).paramtype(i.slice<type>).define("tuple");
    
}