function buildWrapper(tag) { 
  function makeMnemonic(str) {
    let finStr = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '<')
        finStr += '&lt;';
      else if (str[i] === '>')
        finStr += '&gt;';
      else if (str[i] === "'")
        finStr += '&apos;';
      else if (str[i] === '"')
        finStr += '&quot;';
      else if (str[i] === '&')
        finStr += '&amp;';
      else 
        finStr += str[i];
    }
    return finStr;
  }
  function wrapX (string, atr) {
    let finString = makeMnemonic(string);
    let finAtr = '';
    for (let key in atr) {
      let atrValue = makeMnemonic(atr[key]);
      finAtr += ` ${key}='${atrValue}'`;
    }
    let result = `<${tag}${finAtr}> ${finString}<${tag}>`;
    return result;
  }
  return wrapX;
}

var wrapP=buildWrapper("P");  // строим функцию для оборачивания текста в тег P
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
console.log( wrapP("Однажды в <студёную> зимнюю пору") );
var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
