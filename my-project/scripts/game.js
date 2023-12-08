"use strict"

// задаем размеры canvas
window.addEventListener('resize',BodyResized,false);
  function BodyResized() { ResizeCanvas();}
  function ResizeCanvas() {
    var wrapper = document.querySelector('.game-wrapper');
    console.log('Ширина контейнера: '+wrapper.offsetWidth);

    var NewCanvasWidth = wrapper.offsetWidth;
    var NewCanvasHeight = wrapper.offsetWidth;
    console.log('Размер Canvas: '+NewCanvasWidth+'x'+NewCanvasHeight);

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

  var gameStat = 1; // 1 - игра идет, 2 - пауза, 3 - игра окончена

  function startGame() {
    gameStat = 1;
    closeModal();
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
    }
    preloadImage('images/apple.png');
    // задаем переменные 
    var currentScore = 0;
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var food;
    // Размер одной клеточки на поле — 1/25 часть поля
    var grid = width/25;
    // Служебная переменная, которая отвечает за скорость змейки
    var count = 0;
    var color1 = '#12B8FF'; // Deep sky blue
    var color2 = '#01DC03'; // Vibrant green
    var color3 = '#FFE62D'; // Canary
    var color4 = '#FD4499'; // Rose bonbon
    var color5 = '#DF19FB'; // Phlox
    var color6 = '#2F46FA'; // Blue orchid
    var wallColor = 'white';

    function drawCircle (x, y, radius, fillCircle) {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      if (fillCircle) {
        context.fill();
      } else {
        context.stroke();
      }
    };

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
      self.stop = function() {
        self.dx = 0;
        self.dy = 0;
      }
      self.update = function() {
        // Двигаем змейку с нужной скоростью
        self.x += self.dx;
        self.y += self.dy;
        // Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной стороны
        if (self.x < 0) {
          self.x = canvas.width - grid;
        }
        else if (self.x >= canvas.width) {
          self.x = 0;
        }
      // Делаем то же самое для движения по вертикали
        if (self.y < 0) {
          self.y = canvas.height - grid;
        }
        else if (self.y >= canvas.height) {
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
      self.crop = function() {
        self.cells.shift();
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

      // Конструктор класса яблок
    function AppleType()  {
      // спасаем this в self
      const self = this;
      // Начальные координаты яблока
      self.x = grid*5;
      self.y = grid*5;
      self.width = grid;
      self.height = grid;
      // Рисуем новое яблочко
      // Помним, что холст разбит на ячейки — 25 в каждую сторону
       // Ставим яблочко в случайное место
       self.update = function() {
        self.x = randomDiap(1, 25) * grid;
        self.y = randomDiap(1, 25) * grid;
       } 
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

    // создаем яблоко, змейку, стены
    var snake = new SnakeType;
    var apple = new AppleType;
    var windowWall = new WallWithWindows;
    var wall = new WallType;
    // если уровень сложности не 1 - убираем границу поля, вместо этого будут стены
    if (difficultyLevel != 1) 
      document.querySelector('canvas').style.border = 'none';

    // Игровой цикл — основной процесс, внутри которого будет всё происходить
    function loop() {
      // Дальше будет хитрая функция, которая замедляет скорость игры с 60 кадров в секунду до 15. 
      // Для этого она пропускает три кадра из четырёх, то есть срабатывает каждый четвёртый кадр игры. 
      // Было 60 кадров в секунду, станет 15.
      var gameLoop = requestAnimationFrame(loop);
      // Игровой код выполнится только один раз из восьми, в этом и суть замедления кадров, 
      // а пока переменная count меньше восьми, код выполняться не будет.
      if (++count < 8) {
        return;
      }
      // Обнуляем переменную скорости
      count = 0;
      function gameOver() {
        cancelAnimationFrame(gameLoop);
        localStorage.setItem('bestScore',currentScore);
        gameStat = 3;
        openModal();
        console.log('GAME OVER');
        console.log(currentScore);
      }
      // Обновляем счетчики на экране
      var bestScore = localStorage.getItem('bestScore'); 
      document.getElementById('current-score').innerHTML = currentScore;
      document.getElementById('best-score').innerHTML = bestScore?bestScore:currentScore;
      // Очищаем игровое поле
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (gameStat === 1) 
        snake.update();
      // Рисуем еду — красное яблоко
      food = new Image();
      food.src = "images/apple.png";
      context.shadowBlur = 0;
      context.drawImage(food, apple.x, apple.y, apple.width, apple.height);
      //context.fillStyle = 'red';
      //context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
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
    
        // Если змейка добралась до яблока...
        if (cell.x === apple.x && cell.y === apple.y) {
          // увеличиваем длину змейки
          snake.maxCells++;
          currentScore++;
          apple.update();
          }
          // Проверяем, не столкнулась ли змея сама с собой
          // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
        for (var i = index + 1; i < snake.cells.length; i++) {
          // Если такие клетки есть — начинаем игру заново
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            // Задаём стартовые параметры основным переменным
            gameOver();
            console.log('snake ate itself');
            snake.restart();
            apple.update();
          }
        }
      });
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
          gameOver();
          console.log('wall collision');
          console.log(snake.cells[0].x, snake.cells[0].y );
        }
      }
    }
    // Смотрим, какие нажимаются клавиши, и реагируем на них нужным образом
    document.addEventListener('keydown', direction);
    function direction(eo) {
      // Дополнительно проверяем такой момент: если змейка движется, например, влево, 
      // то ещё одно нажатие влево или вправо ничего не поменяет — змейка продолжит двигаться в ту же сторону, что и раньше. 
      // Это сделано для того, чтобы не разворачивать весь массив со змейкой на лету и не усложнять код игры.
      // Стрелка влево
      // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
      if (eo.which === 37 && snake.dx === 0) {
        // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
        // Та же самая логика будет и в остальных кнопках
        snake.dx = -snake.speed;
        snake.dy = 0;
      }
      // Стрелка вверх
      else if (eo.which === 38 && snake.dy === 0) {
      snake.dy = -snake.speed;
      snake.dx = 0;
      }
      // Стрелка вправо
      else if (eo.which === 39 && snake.dx === 0) {
        snake.dx = snake.speed;
        snake.dy = 0;
      }
      // Стрелка вниз
      else if (eo.which === 40 && snake.dy === 0) {
        snake.dy = snake.speed;
        snake.dx = 0;
          }
    };

    requestAnimationFrame(loop);
  }