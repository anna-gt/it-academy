const clockElem = document.getElementById('Clock');
const inputElem = document.getElementById('size');

const builderBttn = document.getElementById('build');
const clockNumbers = 12; // количество полей на часах 
builderBttn.onclick = buildMyClock;

function buildMyClock(eo) {
  const clockSize = parseInt(inputElem.value);
  const numbersCircleSize = clockSize/10; // размер полей с цифрами 
  clockElem.innerHTML = '';
  clockElem.style.width = clockSize + 'px';
  clockElem.style.height = clockSize + 'px';
  clockElem.style.backgroundColor = 'yellow';
  clockElem.style.borderRadius = 50 + '%';
  clockElem.style.position = 'relative';
  for (let i = 1; i <= clockNumbers.length; i++) {
    let numberCicrcle = document.createElement(div);
    numberCicrcle.style.width = numbersCircleSize + 'px';
    numberCicrcle.style.height = numbersCircleSize + 'px';
    numberCicrcle.style.backgroundColor = 'green';
    numberCicrcle.style.borderRadius = 50 + '%';
    numberCicrcle.style.position = 'absolute';
    clockElem.appendChild(numberCicrcle);

    let numberElem = document.createElement(div);
    let number = document.createTextNode(i);
    numberElem.appendChild(number);

  }
}