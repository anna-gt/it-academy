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
const clockSvgElem = document.getElementById('myClock');

builderBttn.onclick = buildMyClock;

function buildMyClock(eo) {
  clock.innerHTML = '';
  const clockSize = parseInt(inputElem.value);
  const myClock = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  const radius = clockSize/2;
  const innerRadius = radius/10*8; // расстояние от центра часов до цифр
  const hourArrLength = radius/2; // длина часовой стрелки
  const minArrLength = radius/5*3; // длина минутной стрелки
  const secArrLength = radius/6*4; // длина секундной стрелки
  const numCircleR = clockSize/15; // радиус полей с цифрами 
  const digClockSize = radius/5; // размер цифровых часов
  const numsSize = radius/10; // размер цифр на стрелочных часах
  const hoursArrowW = radius/25; // толщина часовой стрелки
  const minsArrowW = radius/50; // толщина минутной стрелки
  const secArrowW = radius/150; // толщина секундной стрелки

  clockSvgElem.setAttribute('width', clockSize);
  clockSvgElem.setAttribute('height', clockSize);
  myClock.setAttribute("fill",corpColor);
  myClock.setAttribute("cx",radius);
  myClock.setAttribute("cy",radius);
  myClock.setAttribute("r",radius);
  clockSvgElem.appendChild(myClock);
  for (let i = 1; i <= hours; i++) {
    const numberCicrcle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    clockSvgElem.appendChild(numberCicrcle);
    numberCicrcle.setAttribute('fill',numColor);

    const angle = i*partHour;
    const numCenterX = radius + innerRadius*Math.sin(angle);
    const numCenterY = radius - innerRadius*Math.cos(angle);
    numberCicrcle.setAttribute('cx',numCenterX);
    numberCicrcle.setAttribute('cy',numCenterY);
    numberCicrcle.setAttribute('r',numCircleR);

    const numElem = document.createElementNS("http://www.w3.org/2000/svg",'text');
    if (i/10 < 1) 
      numElem.setAttribute('x',numCenterX - numsSize/4); // если i - однозначное число, центроруем цифру по оси X таким образом
    else 
      numElem.setAttribute('x',numCenterX - numsSize/2);  // если двузначное, то таким
    numElem.setAttribute('y',numCenterY + numsSize/3); // центрируем цифру по оси Y
    numElem.textContent = i;
    numElem.style.fill='black';
    numElem.style.fontSize = numsSize;
    clockSvgElem.appendChild(numElem);
  }
  let digTimeField = document.createElementNS("http://www.w3.org/2000/svg",'text');
  clockSvgElem.appendChild(digTimeField);
  digTimeField.setAttribute('x',(radius - radius/3)); // центрируем цифорвые часы по оси X
  digTimeField.setAttribute('y',radius - digClockSize); // центрируем цифорвые часы по оси Y
  digTimeField.style.fontSize = digClockSize;
  digTimeField.style.fill = 'black';
  function updateTime() {
    const currTime = new Date();
    const currTimeStr = formatTime(currTime);
    digTimeField.textContent = currTimeStr;
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

  const hourArr = document.createElementNS("http://www.w3.org/2000/svg",'line');
  clockSvgElem.appendChild(hourArr);
  hourArr.setAttribute('x1',radius);
  hourArr.setAttribute('y1',radius);
  hourArr.setAttribute('stroke','black');
  hourArr.setAttribute('stroke-width',hoursArrowW);
  hourArr.setAttribute('stroke-linecap','round');
  function setHourArr() {
    const currTime = new Date();
    let currHours = currTime.getHours();
    if (currHours > 12) 
      currHours = currHours - 12;
    const angle = partHour*currHours;
    const hourArrCenterX = radius + hourArrLength*Math.sin(angle);
    const hourArrCenterY = radius - hourArrLength*Math.cos(angle);
    hourArr.setAttribute('x2',hourArrCenterX);
    hourArr.setAttribute('y2',hourArrCenterY);
  };

  const minArr = document.createElementNS("http://www.w3.org/2000/svg",'line');
  clockSvgElem.appendChild(minArr);
  minArr.setAttribute('x1',radius);
  minArr.setAttribute('y1',radius);
  minArr.setAttribute('stroke','black');
  minArr.setAttribute('stroke-width',minsArrowW);
  minArr.setAttribute('stroke-linecap','round');
  function setMinArr() {
    const currTime = new Date();
    let currMin = currTime.getMinutes();
    const angle = partMinsSec*currMin;
    const minArrCenterX = radius + minArrLength*Math.sin(angle);
    const minArrCenterY = radius - minArrLength*Math.cos(angle);
    minArr.setAttribute('x2',minArrCenterX);
    minArr.setAttribute('y2',minArrCenterY);
  };

  const secArr = document.createElementNS("http://www.w3.org/2000/svg",'line');
  clockSvgElem.appendChild(secArr);
  secArr.setAttribute('x1',radius);
  secArr.setAttribute('y1',radius);
  secArr.setAttribute('stroke','black');
  secArr.setAttribute('stroke-width',secArrowW);
  secArr.setAttribute('stroke-linecap','round');
  function setSecArr() {
    const currTime = new Date();
    let currSec = currTime.getSeconds();
    const angle = partMinsSec*currSec;
    const secArrCenterX = radius + secArrLength*Math.sin(angle);
    const secArrCenterY = radius - secArrLength*Math.cos(angle);
    secArr.setAttribute('x2',secArrCenterX);
    secArr.setAttribute('y2',secArrCenterY);
  };

  function setTime() {
    updateTime();
    setHourArr();
    setMinArr()
    setSecArr();
  }
  setTime();
  setInterval(setTime,1000);
}