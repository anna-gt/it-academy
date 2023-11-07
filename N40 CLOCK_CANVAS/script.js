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
const clockCanvasElem = document.getElementById('myClock');

builderBttn.onclick = buildMyClock;

function buildMyClock(eo) {
  clock.innerHTML = '';
  const clockSize = parseInt(inputElem.value);
  var myClock = document.getElementById('myClock');
  var context = myClock.getContext('2d');
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

  clockCanvasElem.setAttribute('width', clockSize);
  clockCanvasElem.setAttribute('height', clockSize);
  drawMyClock();

  function drawMyClock() {
    context.clearRect(0, 0, myClock.width, myClock.height);
    context.fillStyle = corpColor;
    context.beginPath();
    context.arc(radius,radius, radius, 0,Math.PI*2, false);
    context.fill();

    for (let i = 1; i <= hours; i++) {
      context.fillStyle = numColor;
      const angle = i*partHour;
      const numCenterX = radius + innerRadius*Math.sin(angle);
      const numCenterY = radius - innerRadius*Math.cos(angle);
      context.beginPath();
      context.arc(numCenterX,numCenterY, numCircleR, 0,Math.PI*2, false);
      context.fill();

      context.fillStyle = 'black';
      context.font = `bold ${numsSize}px Arial`;
      if (i/10 < 1) 
        context.fillText(i,(numCenterX - numsSize/4),(numCenterY + numsSize/3)); // если i - однозначное число, центрируем цифру по оси X таким образом
      else
        context.fillText(i,(numCenterX - numsSize/2),(numCenterY + numsSize/3)); // если двузначное, то таким
    }

    context.font = `${digClockSize}px Arial`;
    updateTime();
    function updateTime() {
      const currTime = new Date();
      const currTimeStr = formatTime(currTime);
      context.fillText(currTimeStr,(radius - radius/3),(radius - digClockSize)); // центрируем цифорвые часы по осям X и Y
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

      let currHours = (currTime.getHours())%12;
      let currMin = currTime.getMinutes();
      let currSec = currTime.getSeconds();
      const currMs = currTime.getMilliseconds();

      const angleM = partMinsSec*currMin;
      const angleH = partHour*currHours + angleM/hours; // hours - константа, описанная в начале функции(12)
      const angleS = partMinsSec*currSec;

      const hourArrCenterX = radius + hourArrLength*Math.sin(angleH);
      const hourArrCenterY = radius - hourArrLength*Math.cos(angleH);
      context.strokeStyle='black';
      context.lineWidth = hoursArrowW;
      context.lineCap='round';
      context.beginPath();
      context.moveTo(radius,radius);
      context.lineTo(hourArrCenterX,hourArrCenterY);
      context.stroke();

      const minArrCenterX = radius + minArrLength*Math.sin(angleM);
      const minArrCenterY = radius - minArrLength*Math.cos(angleM);
      context.lineWidth = minsArrowW;
      context.beginPath();
      context.moveTo(radius,radius);
      context.lineTo(minArrCenterX,minArrCenterY);
      context.stroke();

      const secArrCenterX = radius + secArrLength*Math.sin(angleS);
      const secArrCenterY = radius - secArrLength*Math.cos(angleS);
      context.lineWidth = secArrowW;
      context.beginPath();
      context.moveTo(radius,radius);
      context.lineTo(secArrCenterX,secArrCenterY);
      context.stroke();

      setTimeout(drawMyClock, 1010 - currMs);
    }
  }
}