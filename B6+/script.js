function buildWrapper(tag, string, atr) { 
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
  finString = makeMnemonic(string);
  let finAtr = '';
  for (let key in atr) {
    if (key === 'title')
      atr[key] = makeMnemonic(atr[key]);
    finAtr += ` ${key}='${atr[key]}'`;
  }
  let result = `<${tag}${finAtr}> ${finString}<${tag}>`;
  return result;
}

console.log(buildWrapper('P', "Однажды в <студёную> зимнюю пору",{lang:"ru"}));
console.log(buildWrapper('H1', "СТИХИ",{align:"center",title:"M&M's"}));
