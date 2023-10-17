function deepCopy(arg) {
  if (arg instanceof String ||  arg instanceof Number || typeof arg === 'boolean' || typeof arg === 'undefined' || Number.isNaN(arg))
    return arg;
  if (arg instanceof Object) {
    let obj = {};
    for (let key in arg) {
      if (arg[key] instanceof Object || arg[key] instanceof Array) 
        obj[key] = deepCopy(arg[key]);
      else obj[key] = arg[key];
    }
    return obj;
  };
  if (arg instanceof Array) {
    let arr = [];
    for (let k of arg) {
      if (arg[k] instanceof Object || arg[k] instanceof Array)
        arr[k] = deepCopy(arg[k]);
      else arr[k] = arg[k]
    }
    return arr;
  }
}