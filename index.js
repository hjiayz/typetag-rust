module.exports = (t) => {
    let isInt = Number.isInteger;
    t.raw
        .verify((o) => isInt(o) && o < 256 && o >= 0).define("u8")
        .verify((o) => isInt(o) && o < (1 << 16) && o >= 0).define("u16")
        .verify((o) => isInt(o) && o < (1 << 32) && o >= 0).define("u32")
        .verify((o) => isInt(o) && o < (1 << 7) && o >= (-1 << 7)).define("i8")
        .verify((o) => isInt(o) && o < (1 << 15) && o >= (-1 << 15)).define("i16")
        .verify((o) => isInt(o) && o < (1 << 31) && o >= (-1 << 31)).define("i32")
        .verify((o) => typeof o == "number").define("f64")
}