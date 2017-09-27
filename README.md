# typetag-rust

some rust type tag.

## how to use

npm i typetag typetag-rust

### example:

```javascript
let t = new (require("typetag"))(true);//testmode
t.load(require("typetag-rust"));
let {i32,bool,string,vec,struct,tuple,array,hashmap,option,result}=t.index;
let tenum=t.index.enum;//reserved word
if (i32.is(1234)) console.log("is i32");
if (vec(i32).is([1,2,3,4])) console.log("is vec(i32)");
if (array([i32,3]).is([1,2,3])) console.log("is array(i32,3)");
if (tenum({none:[],some:[i32],some_3:[i32,i32,i32]}).is({some_3:[1,2,3]})) console.log("is tenum({none:[],some:[i32],some_3:[i32,i32,i32]})");
```

### output:

```
is i32
is vec(i32)
is array(i32,3)
is tenum({none:[],some:[i32],some_3:[i32,i32,i32]})
```