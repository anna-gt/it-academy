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

function deepCopyTests () {
  console.log(`var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
  var h2=deepCopy(h1);'`);
  var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
  var h2=deepCopy(h1);
  let passedMsg = 'пройден';
  let failedMsg = 'НЕ ПРОЙДЕН!';
  let passed = 0;
  let failed = 0;
  console.log('h1===h2 будет false');
  if (h1===h2) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('h1.a===h2.a будет true');
  if (h1.a===h2) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('h1.b===h2.b будет false');
  if (h1.b===h2.b) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('h1.b.b1===h2.b.b1 будет true');
  if (h1.b.b1===h2.b.b1) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('h1.c===h2.c будет false');
  if (h1.c===h2.c) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('h1.c[0]===h2.c[0] будет true');
  if (h1.c[0]===h2.c[0]) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('h1.d===h2.d будет true');
  if (h1.d===h2.d) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('h1.e===h2.e будет true');
  if (h1.e===h2.e) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('isNaN(h2.f) будет true');
  if (isNaN(h2.f)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('h2.c instanceof Array будет true');
  if (h2.c instanceof Array) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };

  console.log(`var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
  var a2=deepCopy(a1);`);
  var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
  var a2=deepCopy(a1);
  console.log('a1===a2 будет false');
  if (a1===a2) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('typeof(a2)===typeof(a1) будет true');
  if (typeof(a2)===typeof(a1)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a1[0]===a2[0] будет true');
  if (a1[0]===a2[0]) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a1[1]===a2[1] будет false');
  if (a1[1]===a2[1]) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('a1[1].b1===a2[1].b1 будет true');
  if (a1[1].b1===a2[1].b1) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a1[2]===a2[2] будет false');
  if (a1[2]===a2[2]) {
    console.log(failedMsg);
    failed += 1;
  }
  else {
    console.log(passedMsg);
    passed += 1;
  };
  console.log('a1[2][0]===a2[2][0] будет true');
  if (a1[2][0]===a2[2][0]) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a1[3]===a2[3] будет true');
  if (a1[3]===a2[3]) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a1[4]===a2[4] будет true');
  if (a1[4]===a2[4]) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('isNaN(a2[5]) будет true');
  if (isNaN(a2[5])) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('a2[2] instanceof Array будет true');
  if (a2[2] instanceof Array) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log(`var v1="sss";
  var v2=deepCopy(v1);`);
  var v1="sss";
  var v2=deepCopy(v1);
  console.log('typeof(v2)===typeof(v1) будет true');
  if (typeof(v2)===typeof(v1)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('v1===v2 будет true');
  if (v1===v2) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log(`var z1=null;
  var z2=deepCopy(z1);`);
  var z1=null;
  var z2=deepCopy(z1);
  console.log('typeof(z2)===typeof(z1) будет true');
  if (typeof(z2)===typeof(z1)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('z1===z2 будет true');
  if (z1===z2) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log(`var n1=Number.NaN;
  var n2=deepCopy(n1);`);
  var n1=Number.NaN;
  var n2=deepCopy(n1);
  console.log('typeof(n2)===typeof(n1) будет true');
  if (typeof(n2)===typeof(n1)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('isNaN(n2) будет true');
  if (isNaN(n2)) {
    console.log(passedMsg);
    passed += 1;
  }
  else {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('Пройдено тестов:'+passed);
  console.log('Провалено тестов:'+failed);
};

deepCopyTests ();
