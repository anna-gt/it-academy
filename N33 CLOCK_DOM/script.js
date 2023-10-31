'use strict'
const clock = document.getElementById('Clock');
const inputElem = document.getElementById('size');
const builderBttn = document.getElementById('build');
const hours = 12; // количество часов на циферблате -> количество полей на часах 
const minsSec = 60; // количество минут и секунд на циферблате
const partHour = 2*Math.PI/hours; // размер угла, равного одному часу
const partMinsSec = 2*Math.PI/minsSec; // размер угла, равного одной минуте или секунде
const corpColor = '#f0f092'; // цвет корпуса часов
const numColor = '#6ca86c'; // цвет ячеек для цифр

builderBttn.onclick = buildMyClock;

function buildMyClock(eo) {
  const clockSize = parseInt(inputElem.value);
  const radius = clockSize/2;
  const innerRadius = radius/10*8; // расстояние от центра часов до цифр
  const hourArrLength = radius/2; // длина часовой стрелки
  const minArrLength = radius/4*3; // длина минутной стрелки
  const secArrLength = radius*0.9; // длина секундной стрелки
  const numbersCircleSize = clockSize/10; // размер полей с цифрами 
  const originBottomPoint = radius/15; // точка вращения стрелок 
  const digClockSize = radius/5; // размер цифровых часов
  const numsSize = radius/10; // размер цифр на стрелочных часах
  const hoursArrowW = radius/25; // толщина часовой стрелки
  const minsArrowW = radius/50; // толщина минутной стрелки
  const secArrowW = radius/150; // толщина секундной стрелки

  clock.innerHTML = '';
  clock.style.width = clockSize + 'px';
  clock.style.height = clockSize + 'px';
  clock.style.backgroundColor = corpColor;
  clock.style.borderRadius = 50 + '%';
  clock.style.position = 'relative';
  for (let i = 1; i <= hours; i++) {
    let numberCicrcle = document.createElement('div');
    clock.appendChild(numberCicrcle);
    numberCicrcle.style.width = numbersCircleSize + 'px';
    numberCicrcle.style.height = numbersCircleSize + 'px';
    numberCicrcle.style.backgroundColor = numColor;
    numberCicrcle.style.borderRadius = 50 + '%';
    numberCicrcle.style.position = 'absolute';
    const angle = i*partHour;
    const numCenterX = radius + innerRadius*Math.sin(angle);
    const numCenterY = radius - innerRadius*Math.cos(angle);
    numberCicrcle.style.left = (numCenterX - numbersCircleSize/2)+'px';
    numberCicrcle.style.top = (numCenterY - numbersCircleSize/2)+'px';
    

    let numberElem = document.createElement('div');
    numberElem.style.position = 'absolute';
    numberElem.style.left = 50 + '%';
    numberElem.style.top = 50 + '%';
    numberElem.style.transform = 'translate(-50%,-50%)';
    numberElem.style.fontSize = numsSize + 'px';
    let number = document.createTextNode(i);
    numberElem.appendChild(number);
    numberCicrcle.appendChild(numberElem);
  }
  let digTimeField = document.createElement('div');
  clock.appendChild(digTimeField);
  digTimeField.style.position = 'absolute';
  digTimeField.style.left = 50 + '%';
  digTimeField.style.top = 30 + '%';
  digTimeField.style.transform = 'translate(-50%,-50%)';
  digTimeField.style.fontSize = digClockSize + 'px';
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
  const hourArr = document.createElement('div');
  clock.appendChild(hourArr);
  hourArr.style.position = 'absolute';
  hourArr.style.width = hoursArrowW + 'px'; // толщина часовой стрелки
  hourArr.style.height = hourArrLength + 'px'; 
  hourArr.style.left = 50 + '%';
  hourArr.style.top = (radius - hourArrLength) + 'px'; // top позиция стрелки = радиус - длина стрелки
  hourArr.style.transform = 'translate(-50%, -50%)';
  hourArr.style.backgroundColor = 'black';
  hourArr.style.borderRadius = 25 + 'px'; // закругление углов часовой стрелки
  const originHStr = 'center '+(hourArrLength-originBottomPoint)+'px';
  hourArr.style.transformOrigin = originHStr;

  function setHourArr() {
    const currTime = new Date();
    let currHours = currTime.getHours();
    if (currHours > 12) 
      currHours = currHours - 12;
    const angle = partHour*currHours;
    const rotateStr = 'rotate('+angle+'rad)'; 
    hourArr.style.transform = rotateStr;
  };

  const minArr = document.createElement('div');
  clock.appendChild(minArr);
  minArr.style.position = 'absolute';
  minArr.style.width = minsArrowW +'px'; // толщина минутной стрелки
  minArr.style.height = minArrLength + 'px'; 
  minArr.style.left = 50 + '%';
  minArr.style.top = (radius - minArrLength) + 'px'; // top позиция стрелки = радиус - длина стрелки
  minArr.style.transform = 'translate(-50%, -50%)';
  minArr.style.backgroundColor = 'black';
  minArr.style.borderRadius = 25 + 'px'; // закругление углов минутной стрелки
  const originMStr = 'center '+(minArrLength - originBottomPoint)+'px';
  minArr.style.transformOrigin = originMStr;
  function setMinArr() {
    const currTime = new Date();
    let currMin = currTime.getMinutes();
    const angle = partMinsSec*currMin;
    const rotateStr = 'rotate('+angle+'rad)'; 
    minArr.style.transform = rotateStr;
  };
  
  const secArr = document.createElement('div');
  clock.appendChild(secArr);
  secArr.style.position = 'absolute';
  secArr.style.width = secArrowW +'px'; // толщина секундной стрелки
  secArr.style.height = secArrLength + 'px'; 
  secArr.style.left = 50 + '%';
  secArr.style.top = (radius - secArrLength) + 'px'; // top позиция стрелки = радиус - длина стрелки
  secArr.style.transform = 'translate(-50%, -50%)';
  secArr.style.backgroundColor = 'black';
  secArr.style.borderRadius = 25 + 'px'; // закругление углов секундной стрелки
  const originSStr = 'center '+(secArrLength - originBottomPoint)+'px';
  secArr.style.transformOrigin = originSStr;
  function setSecArr() {
    const currTime = new Date();
    let currSec = currTime.getSeconds();
    const angle = partMinsSec*currSec;
    const rotateStr = 'rotate('+angle+'rad)'; 
    secArr.style.transform = rotateStr;
  };
  function setTime() {
    setHourArr();
    setMinArr()
    setSecArr();
  }
  setTime();
  setInterval(setTime,1000);
}