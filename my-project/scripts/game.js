"use strict"
// задаем размеры canvas
window.addEventListener('resize',BodyResized,false);
  function BodyResized() { ResizeCanvas();}
  function ResizeCanvas() {
    var wrapper = document.querySelector('.game-wrapper');
    var NewCanvasWidth = wrapper.offsetWidth;
    var NewCanvasHeight = wrapper.offsetWidth;

    var canvas = document.getElementById('game');
    canvas.width = NewCanvasWidth;
    canvas.height = NewCanvasHeight;
    //ReDrawCanvas(NewCanvasWidth/DrawCanvasWidth);
  }
  // функция для определения столкновения двух объектов
  function collides(obj1, obj2) { // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    return obj1.x < obj2.x + obj2.width &&
       obj1.x + obj1.width > obj2.x &&
       obj1.y < obj2.y + obj2.height &&
       obj1.y + obj1.height > obj2.y;
  }

  // получение целого случайного числа в заданном диапазоне
  function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
  }
  // уровни сложности: 1 - низкий(по умолчанию), 2 - средний, 3 - высокий
  var difficultyLevel = 1;
  function setLevelFunc(level) {
    function setLevel() {
      difficultyLevel = level;
    }
    return setLevel
  }
  // строим функции для установки уровней
  var setLevel1 = setLevelFunc(1);
  var setLevel2 = setLevelFunc(2);
  var setLevel3 = setLevelFunc(3);

  // цвета
  var color1 = '#12B8FF'; // Deep sky blue
  var color2 = '#01DC03'; // Vibrant green
  var color3 = '#FFE62D'; // Canary
  var color4 = '#FD4499'; // Rose bonbon
  var color5 = '#DF19FB'; // Phlox
  var color6 = '#2F46FA'; // Blue orchid
  var wallColor = 'white';

  // изображения
  const preloadedImagesH={}; // ключ - имя предзагруженного изображения
    function preloadImage(fn) {
        // если такое изображение уже предзагружалось - ничего не делаем
        if ( fn in preloadedImagesH )
            return;
        // предзагружаем - создаём невидимое изображение
        const img=new Image();
        img.src=fn; // загрузка начинается
        // запоминаем, что изображение уже предзагружалось
        preloadedImagesH[fn]=true;
    };
  preloadImage('images/candy.svg');
  preloadImage('images/mute.svg');
  preloadImage('images/unmute.svg');
  preloadImage('images/play.svg');
  preloadImage('images/pause.svg');
  preloadImage('images/vibro-off.svg');
  preloadImage('images/vibro-on.svg');

  var currentScore;
  var gameStat = 0; // 1 - игра идет, 2 - пауза, 3 - игра окончена
  var mute = false;
  var vibration = true;

  // звук и вибрация
  const hitSound = new Audio;
  const pickSound = new Audio;
  if ( hitSound.canPlayType("audio/mpeg")=="probably" )
    hitSound.src = "sounds/hit.mp3"
  else
    hitSound.src = "sounds/hit.ogg";
  if ( pickSound.canPlayType("audio/mpeg")=="probably" )
    pickSound.src = "sounds/pick.mp3"
  else
    pickSound.src = "sounds/pick.ogg";
  function hitSoundInit() {
    hitSound.play(); // запускаем звук
    hitSound.pause(); // и сразу останавливаем
  };
  function hitSoundPlay() {
    if (!mute) {
      hitSound.currentTime = 0; // в секундах
      hitSound.play();
    }
  };
  function pickSoundInit() {
    pickSound.play(); // запускаем звук
    pickSound.pause(); // и сразу останавливаем
  };
  function pickSoundPlay() {
    if (!mute) {
      pickSound.currentTime = 0; // в секундах
      pickSound.play();
    }
  };
  function vibro() {
    if (vibration) {
      if ( navigator.vibrate ) {
        window.navigator.vibrate(100);
      }
    }
  };

  function startGame() {
    gameStat = 1;
    currentScore = 0;
    closeModal();
    hitSoundInit();
    pickSoundInit();
    // задаем переменные 
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var foodImg;
    // Размер одной клеточки на поле — 1/25 часть поля
    var grid = width/25;

    // конструктор класса змеек
    function SnakeType() {
      // спасаем this в self
      const self = this;
      // Начальные координаты
      self.x = grid*10;
      self.y = grid*10;
      self.width = grid;
      self.height = grid;
      // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. 
      // На старте будет двигаться горизонтально, поэтому скорость по оси  У равна нулю.
      self.speed = grid;
      self.dx = self.speed;
      self.dy = 0;
      // Тащим за собой хвост, который пока пустой
      self.cells = [];
      self.cells[0] = {
        x: self.x,
        y: self.y,
        dx: self.dx,
        dy: self.dy
      };
      // Стартовая длина змейки — 4 клеточки
      self.maxCells = 4;
    
      self.update = function() {
        // Двигаем змейку с нужной скоростью
        self.x += self.dx;
        self.y += self.dy;
        // Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной стороны
        if (self.x < 0) {
          self.x = width - grid;
        }
        else if (self.x >= width) {
          self.x = 0;
        }
      // Делаем то же самое для движения по вертикали
        if (self.y < 0) {
          self.y = height - grid;
        }
        else if (self.y >= height) {
          self.y = 0;
        }
        // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, 
        // поэтому добавляем её координаты в начало массива, который отвечает за всю змейку.
        self.cells.unshift({ x: self.x, y: self.y, dx: self.dx, dy: self.dy, width: self.width, height: self.height });
        // Сразу после этого удаляем последний элемент из массива змейки, 
        // потому что она движется и постоянно особождает клетки после себя
        if (self.cells.length > self.maxCells) {
          self.cells.pop();
        }
      }
      self.setDirection = function(newDirection) {
        if (newDirection === 'right') {
          if (snake.dx === 0) {
            self.dx = snake.speed;
            self.dy = 0;
          }
        };
        if (newDirection === 'left') {
          if (snake.dx === 0) {
            self.dx = -snake.speed;
            self.dy = 0;
          }
        };
        if (newDirection === 'top') {
          if (snake.dy === 0) {
            self.dy = -snake.speed;
            self.dx = 0;
          }
        };
        if (newDirection === 'bottom') {
          if (snake.dy === 0) {
            self.dy = snake.speed;
            self.dx = 0;
          }
        };
      }
      self.restart = function() {
        self.x = grid * 10;
        self.y = grid * 10;
        self.cells = [];
        self.maxCells = 4;
        self.dx = self.speed;
        self.dy = 0;
      }
    };

      // Конструктор класса еды
    function FoodType()  {
      // спасаем this в self
      const self = this;
      // Начальные координаты 
      self.x = grid*5;
      self.y = grid*5;
      self.width = grid;
      self.height = grid;
      // Рисуем новую еду
      // Помним, что холст разбит на ячейки — 25 в каждую сторону
       // Ставим еду в случайное место
       // Не ставим по краям - там могут быть стены
      self.getRandomPoint = function() {
        self.x = randomDiap(3, 23) * grid;
        self.y = randomDiap(2, 23) * grid;
       };
    };

    // конструктор класса стен с окнами
    // стена собирается из 8 частей по периметру(для уровня сложности 2)
    function WallWithWindows() {
      const self = this;
      self.part1 = {
        x: 0,
        y: 0,
        width: canvas.width/3,
        height: grid
      };
      self.part2 = {
        x: canvas.width/3*2,
        y: 0,
        width: canvas.width/3,
        height: grid
      };
      self.part3 = {
        x: canvas.width-grid,
        y: grid,
        width: grid,
        height: canvas.height/3-grid
      };
      self.part4 = {
        x: canvas.width-grid,
        y: canvas.height/3*2,
        width: grid,
        height: canvas.height/3
      };
      self.part5 = {
        x: canvas.width/3*2,
        y: canvas.height-grid,
        width: canvas.width/3-grid,
        height: grid
      };
      self.part6 = {
        x: grid,
        y: canvas.height-grid,
        width: canvas.width/3-grid,
        height: grid
      };
      self.part7 = {
        x: 0,
        y: canvas.height/3*2,
        width: grid,
        height: canvas.height/3
      };
      self.part8 = {
        x: 0,
        y: grid,
        width: grid,
        height: canvas.height/3-grid
      };
    }
    // конструктор класса сплошной стены
    function WallType() {
      const self = this;
      self.part1 = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: grid
      };
      self.part2 = {
        x: canvas.width-grid,
        y: grid,
        width: grid,
        height: canvas.height - grid*2
      };
      self.part3 = {
        x: 0,
        y:canvas.width-grid,
        width: canvas.width,
        height: grid
      };
      self.part4 = {
        x: 0,
        y: grid,
        width: grid,
        height: canvas.height - grid*2
      };
    }

    // конструктор класса кирпичей-препятствий
    function BrickType() {
      const self = this;
      self.parts = [];
      self.clear = function() {
        // набор кирпичей - массив
        self.parts = [];
      };
      // создать 2 кирпича в верхнем левом и нижнем правом участке поля
      self.create13 = function() {
        self.parts[0] = {x: randomDiap(2,12)*grid, y: randomDiap(2,12)*grid, width: grid, height: grid};
        self.parts[1] = {x: randomDiap(13,23)*grid, y: randomDiap(13,23)*grid, width: grid, height: grid}
      };
      // создать 2 кирпича в верхнем правом и нижнем левом участке поля
      self.create24 = function() {
        self.parts[2] = {x: randomDiap(13,23)*grid, y: randomDiap(2,12)*grid, width: grid, height: grid};
        self.parts[3] = {x: randomDiap(2,12)*grid, y: randomDiap(13,23)*grid, width: grid, height: grid}
      }
    }

    // создаем конфету, змейку, стены и кирпичи
    var snake = new SnakeType;
    var candy = new FoodType;
    var windowWall = new WallWithWindows;
    var wall = new WallType;
    var bricks = new BrickType;
    if (difficultyLevel === 2) 
      bricks.create13();
    if (difficultyLevel === 3) {
      bricks.create13();
      bricks.create24();
    }
    
    // если уровень сложности не 1 - убираем границу поля, вместо этого будут стены
    if (difficultyLevel != 1) 
      document.querySelector('canvas').style.border = 'none';

    // Игровой цикл — основной процесс, внутри которого будет всё происходить
    function loop() {
      function gameOver() {
        gameStat = 3;
        clearInterval(gameInterval);
        //cancelAnimationFrame(gameLoop);
        localStorage.setItem('bestScore',currentScore);
        openModal();
      }
      if (gameStat === 3) {
        clearInterval(gameInterval);
      };
      // Обновляем счетчики на экране
      var bestScore = localStorage.getItem('bestScore'); 
      document.getElementById('current-score').innerHTML = currentScore;
      document.getElementById('best-score').innerHTML = bestScore?bestScore:currentScore;
      // Очищаем игровое поле
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (gameStat === 1) 
        snake.update();
      // Рисуем еду
      foodImg = new Image();
      foodImg.src = "images/candy.svg";
      context.shadowBlur = 0;
      context.drawImage(foodImg, candy.x, candy.y, candy.width, candy.height);
      // Одно движение змейки — один новый нарисованный квадратик 
      // Обрабатываем каждый элемент змейки
      snake.cells.forEach(function (cell, index) {
        if (index == 0) 
          context.fillStyle = color1;
        else if (index == 1)
          context.fillStyle = color2;
        else if (index % 3 === 0)
          context.fillStyle = color5;
        else if (index % 4 === 0)
          context.fillStyle = color4;
        else if (index % 5 === 0)
          context.fillStyle = color6;
        else if (index % 7 === 0)
          context.fillStyle = color1;
        else if (index % 2 === 0)
          context.fillStyle = color3;
        else 
          context.fillStyle = color3;

        context.fillRect(cell.x, cell.y, cell.height, cell.width);
    
        // Если змейка добралась до конфеты...
        if (cell.x === candy.x && cell.y === candy.y) {
          // увеличиваем длину змейки
          pickSoundPlay();
          snake.maxCells++;
          currentScore++;
          candy.getRandomPoint();
          // проверяем, не создалась ли новая конфета внутри кирпича
          for (let i=0; i<bricks.parts.lenght; i++) {
            if (bricks.parts[i].x === candy.x && bricks.parts[i].y === candy.y)
            candy.getRandomPoint();
            }
          };
          // Проверяем, не столкнулась ли змея сама с собой
          // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
        for (var i = index + 1; i < snake.cells.length; i++) {
          // Если такие клетки есть — начинаем игру заново
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            // Задаём стартовые параметры основным переменным
            hitSoundPlay();
            gameOver();
          }
        }
      });
      if (difficultyLevel != 1) {
        for (let i = 0; i < bricks.parts.length; i++) {
          const brick = bricks.parts[i];
          context.fillStyle = wallColor;
          context.fillRect(brick.x, brick.y, brick.width, brick.height)
          if (collides(snake.cells[0],brick)) {
            vibro();
            hitSoundPlay();
            gameOver();
          }
        };
      }
      // если уровень сложности 2 - рисуем стены с окнами
      if (difficultyLevel === 2) {
        context.fillStyle = wallColor;
        context.fillRect(windowWall.part1.x, windowWall.part1.y, windowWall.part1.width, windowWall.part1.height);
        context.fillRect(windowWall.part2.x, windowWall.part2.y, windowWall.part2.width, windowWall.part2.height);
        context.fillRect(windowWall.part3.x, windowWall.part3.y, windowWall.part3.width, windowWall.part3.height);
        context.fillRect(windowWall.part4.x, windowWall.part4.y, windowWall.part4.width, windowWall.part4.height);
        context.fillRect(windowWall.part5.x, windowWall.part5.y, windowWall.part5.width, windowWall.part5.height);
        context.fillRect(windowWall.part6.x, windowWall.part6.y, windowWall.part6.width, windowWall.part6.height);
        context.fillRect(windowWall.part7.x, windowWall.part7.y, windowWall.part7.width, windowWall.part7.height);
        context.fillRect(windowWall.part8.x, windowWall.part8.y, windowWall.part8.width, windowWall.part8.height);
        // есди змейка столкнулась с какой-либо частью стены - игра окончена
        if (collides(snake,windowWall.part1) || collides(snake,windowWall.part2) || collides(snake,windowWall.part3) || collides(snake,windowWall.part4)|| collides(snake,windowWall.part5)|| collides(snake,windowWall.part6) || collides(snake,windowWall.part7) || collides(snake,windowWall.part8)) {
          vibro();
          hitSoundPlay();
          gameOver();
          console.log('wall collision');
          console.log(snake.cells[0].x, snake.cells[0].y );
        }
      }
       // если уровень сложности 3 - рисуем стены без окон
       if (difficultyLevel === 3) {
        context.fillStyle = wallColor;
        context.fillRect(wall.part1.x, wall.part1.y, wall.part1.width, wall.part1.height);
        context.fillRect(wall.part2.x, wall.part2.y, wall.part2.width, wall.part2.height);
        context.fillRect(wall.part3.x, wall.part3.y, wall.part3.width, wall.part3.height);
        context.fillRect(wall.part4.x, wall.part4.y, wall.part4.width, wall.part4.height);
        if (collides(snake.cells[0],wall.part1) || collides(snake.cells[0],wall.part2) || collides(snake.cells[0],wall.part3) || collides(snake.cells[0],wall.part4)) {
          vibro();
          hitSoundPlay();
          gameOver();
          console.log('wall collision');
          console.log(snake.cells[0].x, snake.cells[0].y );
        }
      }
    }
    // Смотрим, какие нажимаются клавиши, и реагируем на них нужным образом
    document.addEventListener('keydown', direction);
    function direction(eo) {
      eo = eo || window.event;
      // Стрелка влево
      // Если нажата стрелка влево или A, и при этом змейка никуда не движется по горизонтали…
      if (eo.which === 37 || eo.which === 65) {
        // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
        // Та же самая логика будет и в остальных кнопках
        snake.setDirection('left');
      }
      // Стрелка вверх или W
      else if (eo.which === 38 || eo.which === 87) {
        snake.setDirection('top');
      }
      // Стрелка вправо или D
      else if (eo.which === 39 || eo.which === 68) {
        snake.setDirection('right');
      }
      // Стрелка вниз или S
      else if (eo.which === 40 || eo.which === 83) {
        snake.setDirection('bottom');
      }
    };
    document.getElementById('left-b').addEventListener('click',setLeftDirection);
    function setLeftDirection(eo) {
      eo = eo || window.event;
      snake.setDirection('left');
    };
    document.getElementById('right-b').addEventListener('click',setRightDirection);
    function setRightDirection(eo) {
      eo = eo || window.event;
      snake.setDirection('right');
    };
    document.getElementById('up-b').addEventListener('click',setUpDirection);
    function setUpDirection(eo) {
      eo = eo || window.event;
      snake.setDirection('top');
    };
    document.getElementById('down-b').addEventListener('click',setDownDirection);
    function setDownDirection(eo) {
      eo = eo || window.event;
      snake.setDirection('bottom');
    };
    var wrapper = $('.game-wrapper');
    wrapper.on('swipeLeft',setLeftDirection);
    wrapper.on('swipeRight',setRightDirection);
    wrapper.on('swipeUp',setUpDirection);
    wrapper.on('swipeDown',setDownDirection);

    const gameInterval = setInterval(loop, 150);
  }