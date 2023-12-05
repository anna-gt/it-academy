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

  function startGame() {
    // задаем переменные 
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    // Размер одной клеточки на поле — 1/25 часть поля
    var grid = width/25;
    // Служебная переменная, которая отвечает за скорость змейки
    var count = 0;
    var snakeColor = '#62cafe';

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
      // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. 
      // На старте будет двигаться горизонтально, поэтому скорость по оси  У равна нулю.
      self.speed = grid;
      self.dx = self.speed;
      self.dy = 0;
      // Тащим за собой хвост, который пока пустой
      self.cells = [];
      self.cells[0] = {
        x: self.x,
        y: self.y
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
        self.cells.unshift({ x: self.x, y: self.y });
        // Сразу после этого удаляем последний элемент из массива змейки, 
        // потому что она движется и постоянно особождает клетки после себя
        if (self.cells.length > self.maxCells) {
          self.cells.pop();
        }
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
      // Рисуем новое яблочко
      // Помним, что холст разбит на ячейки — 25 в каждую сторону
       // Ставим яблочко в случайное место
       self.update = function() {
        self.x = randomDiap(1, 25) * grid;
        self.y = randomDiap(1, 25) * grid;
       } 
    };
    // создаем яблоко и змейку
    var snake = new SnakeType;
    var apple = new AppleType;

    // Игровой цикл — основной процесс, внутри которого будет всё происходить
    function loop() {
      // Дальше будет хитрая функция, которая замедляет скорость игры с 60 кадров в секунду до 15. 
      // Для этого она пропускает три кадра из четырёх, то есть срабатывает каждый четвёртый кадр игры. 
      // Было 60 кадров в секунду, станет 15.
      requestAnimationFrame(loop);
      // Игровой код выполнится только один раз из восьми, в этом и суть замедления кадров, 
      // а пока переменная count меньше восьми, код выполняться не будет.
      if (++count < 8) {
        return;
      }
      // Обнуляем переменную скорости
      count = 0;
      // Очищаем игровое поле
      context.clearRect(0, 0, canvas.width, canvas.height);
      snake.update();
      // Рисуем еду — красное яблоко
      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
      // Одно движение змейки — один новый нарисованный квадратик 
      context.fillStyle = snakeColor;
      // Обрабатываем каждый элемент змейки
      snake.cells.forEach(function (cell, index) {
        // нулевой элемент змейки - голова - крупнее остальных элементов
        if (index == 0) {
          drawCircle((cell.x+grid/2),(cell.y+grid/2),grid*0.8,true);
        }
          drawCircle((cell.x+grid/2),(cell.y+grid/2),grid*0.65,true);
        //context.fillRect(cell.x, cell.y, grid, grid);
        // Если змейка добралась до яблока...
        if (cell.x === apple.x && cell.y === apple.y) {
          // увеличиваем длину змейки
          snake.maxCells++;
          apple.update();
          }
          // Проверяем, не столкнулась ли змея сама с собой
          // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
        for (var i = index + 1; i < snake.cells.length; i++) {
          // Если такие клетки есть — начинаем игру заново
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            // Задаём стартовые параметры основным переменным
            snake.restart();
            apple.update();
          }
        }
      });
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