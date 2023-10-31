'use strict'
const clock = document.getElementById('Clock');
const inputElem = document.getElementById('size');
const builderBttn = document.getElementById('build');
const hours = 12; // количество часов на циферблате -> количество полей на часах 
const minsSec = 60; // количество минут и секунд на циферблате

builderBttn.onclick = buildMyClock;

function buildMyClock(eo) {
  const clockSize = parseInt(inputElem.value);
  const radius = clockSize/2;
  const innerRadius = radius/10*8; // расстояние от центра часов до цифер
  const partHour = 2*Math.PI/hours; // размер угла, равного одному часу
  const partminsSec = 2*Math.PI/minsSec; // размер угла, равного одной минуте или секунде
  const numbersCircleSize = clockSize/10; // размер полей с цифрами 
  clock.innerHTML = '';
  clock.style.width = clockSize + 'px';
  clock.style.height = clockSize + 'px';
  clock.style.backgroundColor = '#f0f092';
  clock.style.borderRadius = 50 + '%';
  clock.style.position = 'relative';
  for (let i = 1; i <= hours; i++) {
    let numberCicrcle = document.createElement('div');
    clock.appendChild(numberCicrcle);
    numberCicrcle.style.width = numbersCircleSize + 'px';
    numberCicrcle.style.height = numbersCircleSize + 'px';
    numberCicrcle.style.backgroundColor = '#6ca86c';
    numberCicrcle.style.borderRadius = 50 + '%';
    numberCicrcle.style.position = 'absolute';
    const angle = i*partHour;
    const numCenterX = radius + innerRadius*Math.sin(angle);
    console.log( i + ' = ' + numCenterX);
    const numCenterY = radius - innerRadius*Math.cos(angle);
    numberCicrcle.style.left = (numCenterX - numbersCircleSize/2)+'px';
    numberCicrcle.style.top = (numCenterY - numbersCircleSize/2)+'px';
    

    let numberElem = document.createElement('div');
    numberElem.style.position = 'absolute';
    numberElem.style.left = 50 + '%';
    numberElem.style.top = 50 + '%';
    numberElem.style.transform = 'translate(-50%,-50%)';
    numberElem.style.fontSize = 2 + 'em';
    let number = document.createTextNode(i);
    numberElem.appendChild(number);
    numberCicrcle.appendChild(numberElem);

    let digTimeField = document.createElement('div');
    clock.appendChild(digTimeField);
    digTimeField.style.position = 'absolute';
    digTimeField.style.left = 50 + '%';
    digTimeField.style.top = 30 + '%';
    digTimeField.style.transform = 'translate(-50%,-50%)';
    digTimeField.style.fontSize = 3 + 'em';
    updateTime();
    setInterval(updateTime,1000);
    function updateTime() {
      const currTime = new Date();
      const currTimeStr = formatTime(currTime);
      digTimeField.innerHTML = currTimeStr;
      // форматирует время в формате чч:мм:сс
      function formatTime(dt) {
        const hours=dt.getHours();
        const minutes=dt.getMinutes();
        const seconds=dt.getSeconds();
        return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
    }

      // дополняет строку val слева нулями до длины Len
      function str0l(val,len) {
          let strVal=val.toString();
          while ( strVal.length < len )
              strVal='0'+strVal;
          return strVal;
      }
    }
    

  }
}