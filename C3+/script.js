'use strict'
function deepComp(x1,x2) {
  if (Number.isNaN(x1) && Number.isNaN(x2))
    return true;
  if (typeof x1 !=="object" || x1 === null || typeof x2 !=="object" || x2 === null) 
    return (x1 === x2);
  if (x1 instanceof Array && x2 instanceof Array) {
    if (x1.length !== x2.length)
      return false;
    for (let i = 0; i < x1.length; i++) {
      const value1 = x1[i];
      const value2 = x2[i];
      const isObjects = (value1 instanceof Object) && (value2 instanceof Object);
      if ((isObjects && !deepComp(value1, value2)) || (!isObjects && value1 !== value2))
        return false;
    }
    return true;
  }
  const objKeys1 = Object.keys(x1);
  const objKeys2 = Object.keys(x2);
  console.log(objKeys1,objKeys2);

  if (objKeys1.length !== objKeys2.length) return false;
  const isObjectNan = (object) => {
    return Number.isNaN(object) || typeof object === "object";
  }
  for (let key of objKeys1) {
    const value1 = x1[key];
    const value2 = x2[key];
    const isObjects = isObjectNan(value1) && isObjectNan(value2);
    if ((isObjects && !deepComp(value1, value2)) || (!isObjects && value1 !== value2)) 
      return false;
  }
  return true;
  
}

function deepCompTests() {
  console.log(`var H1={ a:5, b: { b1:6, b2:7 } };
  var H2={ b: { b1:6, b2:7 }, a:5 };
  var H3={ a:5, b: { b1:6 } };
  var H4={ a:5, b: { b1:66, b2:7 } };
  var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
  var H6={ a:null, b:undefined, c:Number.NaN };
  var H7={ c:Number.NaN, b:undefined, a:null };
  var H8={a:5,b:6};
  var H9={c:5,d:6};
  var H10={a:5};
  var A1=[5,7];
  var A2=[5,5,7];
  var A3=[5,8,7];`);
  var H1={ a:5, b: { b1:6, b2:7 } };
  var H2={ b: { b1:6, b2:7 }, a:5 };
  var H3={ a:5, b: { b1:6 } };
  var H4={ a:5, b: { b1:66, b2:7 } };
  var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
  var H6={ a:null, b:undefined, c:Number.NaN };
  var H7={ c:Number.NaN, b:undefined, a:null };
  var H8={a:5,b:6};
  var H9={c:5,d:6};
  var H10={a:5};
  var A1=[5,7];
  var A2=[5,5,7];
  var A3=[5,8,7];
  let passedMsg = 'пройден';
  let failedMsg = 'НЕ ПРОЙДЕН!';
  let passed = 0;
  let failed = 0;
  const passedFunc = () => {
    console.log(passedMsg);
    passed += 1;
  };
  const failedFunc = () => {
    console.log(failedMsg);
    failed += 1;
  };
  console.log('deepComp(H1,H2) будет true');
  deepComp(H1,H2)?passedFunc():failedFunc();
  console.log('deepComp(H1,H3) будет false');
  deepComp(H1,H3)?failedFunc():passedFunc();
  console.log('deepComp(H1,H4) будет false');
  deepComp(H1,H4)?failedFunc():passedFunc();
  console.log('deepComp(H1,H5) будет false');
  deepComp(H1,H5)?failedFunc():passedFunc();
  console.log('deepComp(H6,H7) будет true');
  deepComp(H6,H7)?passedFunc():failedFunc();
  console.log('deepComp(H8,H9) будет false');
  deepComp(H8,H9)?failedFunc():passedFunc();
  console.log('deepComp(H8,H10) будет false');
  deepComp(H8,H10)?failedFunc():passedFunc();
  console.log('deepComp(null,H10) будет false');
  deepComp(null,H10)?failedFunc():passedFunc();
  console.log('deepComp(H10,null) будет false');
  deepComp(H10,null)?failedFunc():passedFunc();
  console.log('deepComp(null,null) будет true');
  deepComp(null,null)?passedFunc():failedFunc();
  console.log('deepComp(null,undefined) будет false');
  deepComp(null,undefined)?failedFunc():passedFunc();
  console.log('deepComp(5,"5") будет false');
  deepComp(5,"5")?failedFunc():passedFunc();
  console.log('deepComp(5,H1) будет false');
  deepComp(5,H1)?failedFunc():passedFunc();
  console.log('deepComp(A1,H1) будет false');
  deepComp(A1,H1)?failedFunc():passedFunc();
  console.log('deepComp(A2,A3) будет false');
  deepComp(A2,A3)?failedFunc():passedFunc();
  console.log('deepComp({a:5,b:undefined}, {a:5,c:undefined}) будет false');
  deepComp({a:5,b:undefined}, {a:5,c:undefined})?failedFunc():passedFunc();
  console.log('deepComp([5,7],{0:5,1:7}) будет false');
  deepComp([5,7],{0:5,1:7})?failedFunc():passedFunc();
  console.log('deepComp([5,7],{0:5,1:7,length:2}) будет false');
  deepComp([5,7],{0:5,1:7,length:2})?failedFunc():passedFunc();
  console.log('deepComp("aaa","bbb") будет false');
  deepComp("aaa","bbb")?failedFunc():passedFunc();
  console.log('deepComp(Number.NaN,Number.NaN) будет true');
  deepComp(Number.NaN,Number.NaN)?passedFunc():failedFunc();

  console.log('пройдено тестов: '+passed);
  console.log('провалено тестов: '+failed);
}

deepCompTests();
