"use strict"

 // в закладке УРЛа будем хранить разделённые подчёркиваниями слова
  // #game - страница с игрой
  // #rules - правила игры
  // #levels - выбор уровня сложности
  // #records - таблица рекордов

  // отслеживаем изменение закладки в УРЛе
  // оно происходит при любом виде навигации
  // в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
  window.onhashchange = switchToStateFromURLHash;
  // текущее состояние приложения
  // это Model из MVC
  var SPAState = {};
  // вызывается при изменении закладки УРЛа
  // а также при первом открытии страницы
  // читает новое состояние приложения из закладки УРЛа
  // и обновляет ВСЮ вариабельную часть веб-страницы
  // соответственно этому состоянию
  // это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
  // частей кода в зависимости от формы URLа
  // "роутинг" и есть "контроллер" из MVC - управление приложением через URL
  function switchToStateFromURLHash() {
    if ((gameStat === 1 || gameStat === 2) && currentScore > 0) {
      gameStat = 3;
      alert('Прогресс будет утерян');
    };
    var URLHash = window.location.hash;

    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    var stateStr=URLHash.substr(1);

    if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
      var parts=stateStr.split("_")
      SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы
    }
    else
      SPAState={pagename:'menu'}; // иначе показываем главную страницу

    console.log('Новое состояние приложения:');
    console.log(SPAState);
    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    var pageHTML = "";
    switch ( SPAState.pagename ) {
      case 'menu':
        pageHTML+="<div class='menu-wrapper'><h3 class='snake-word'><span id='one'>З</span><span id='two'>М</span><span id='three'>Е</span><span id='four'>Й</span><span id='five'>К</span><span id='six'>А</span></h3><ul><li class='menu-item'><a href='#game'>Игра</a></li><li class='menu-item'><a href='#rules'>Правила</a></li><li class='menu-item'><a href='#levels'>Уровень сложности: <span id='level-point'></span></a></li><li class='menu-item'><a href='#records'>Таблица рекордов</a></li></ul></div>";
        document.querySelector('.wrapper').innerHTML = pageHTML;
        var levelSpan = document.getElementById('level-point');
        if (difficultyLevel === 1) 
          levelSpan.innerHTML = 'низкий';
        else if (difficultyLevel === 2) 
          levelSpan.innerHTML = 'средний';
        else if (difficultyLevel === 3) 
          levelSpan.innerHTML = 'высокий';
        break;
      case 'levels':
        pageHTML+="<div class='levels-wrapper'><div id='arrow-back'><a href='#menu'>&LT; назад</a></div><ul><li class='menu-item'><a href='#menu' id='level-1'>Низкий</a></li><li class='menu-item' id='level-2'><a href='#menu'>Средний</a></li><li class='menu-item' ><a href='#menu' id='level-3'>Высокий</a></li></ul></div>";
        document.querySelector('.wrapper').innerHTML = pageHTML;
        document.getElementById('level-1').addEventListener('click',setLevel1);
        document.getElementById('level-2').addEventListener('click',setLevel2);
        document.getElementById('level-3').addEventListener('click',setLevel3);
        break;
      case 'game':
        // сама игра
        pageHTML+="<div class='score'><span>Счет : <span id='current-score'></span></span><span>Лучший счет : <span id='best-score'></span></span></div><div class='game-wrapper'><canvas id='game' width='100' height='100'></canvas></div>";
        pageHTML+="<div class='buttons'><button id='left-b'>&larr;</button><button id='right-b'>&rarr;</button><button id='up-b'>&uarr;</button><button id='down-b'>&darr;</button></div>";
        // модальное окно, открывается в случае проигрыша
        pageHTML+="<div class='modal-glass'><div class='modal-menu'><h3>Игра окончена!</h3><input type='text' placeholder='Введите ваше имя' id='user-name'>";
        pageHTML+="<div id='add-me'>Запомнить меня</div><a id='new-game'href='#game'>Новая игра</a><a href='#records'>Таблица рекордов</a></div></div>";
        document.querySelector('.wrapper').innerHTML = pageHTML;
        document.getElementById('add-me').addEventListener('click', storeInfo, false);
        document.getElementById('new-game').addEventListener('click', startGame, false);
        ResizeCanvas();
        startGame();
        if (gameStat != 3)
          closeModal();
        break;
      case 'records':
        pageHTML+="<div class='records-wrapper'><h3>Лучшие результаты</h3>";
        pageHTML+="<ul><li class='records-item'></li><li class='records-item'></li><li class='records-item'></li>";
        pageHTML+="<li class='records-item'></li><li class='records-item'></li></ul></div>";
        document.querySelector('.wrapper').innerHTML = pageHTML;
        restoreInfo();
        break;
      case 'rules':
        pageHTML+="<div class='rules-wrapper'><h3>Правила игры</h3><ul class='rules'><li class='rules-item'>есть поле из клеточек, где случайным образом появляется еда;</li><li class='rules-item'>есть змейка, которая всё время двигается и которой мы можем управлять с помощью стрелок на клавиатуре, кнопок на экране или свайпом вверх-вниз-влево-вправо;</li><li class='rules-item'>если змейка на своём пути встречает еду — еда исчезает, появляется в новом месте, а сама змейка удлиняется на одну клеточку;</li><li class='rules-item'>если змейка врежется в стену, кирпич или в саму себя, игра заканчивается.</li></ul></div>";
        document.querySelector('.wrapper').innerHTML = pageHTML;
        break;
    }
  }
// устанавливает в закладке УРЛа новое состояние приложения
  // и затем устанавливает+отображает это состояние
  function switchToState(newState) {
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    var stateStr=newState.pagename;
    location.hash=stateStr;

    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
  }
  
  function switchToMenuPage() {
    switchToState( { pagename:'menu' } );
  }

  function switchToGamePage() {
    switchToState( { pagename:'game' } );
  }

  function switchToLevelsPage() {
    switchToState( { pagename:'levels' } );
  }

  function switchToRulesPage() {
    switchToState( { pagename:'rules' } );
  }
  function switchToRecordsPage() {
    switchToState( { pagename:'records' } );
  }
  // переключаемся в состояние, которое сейчас прописано в закладке УРЛ
  switchToStateFromURLHash();

  function openModal() {
    let modal = document.querySelector('.modal-menu');
    document.querySelector('.modal-glass').style.visibility = 'visible';
    modal.style.visibility = 'visible';
    modal.style.width = 'auto';
    console.log('modal opened');
  }
  function closeModal() {
    let modal = document.querySelector('.modal-menu');
    document.querySelector('.modal-glass').style.visibility = 'hidden';
    modal.style.visibility = 'hidden';
    modal.style.width = 0 + 'px';
    console.log('modal closed');
  }

  //window.onbeforeunload = befUnload;

  function befUnload(EO) {
    EO=EO||window.event;
    // если текст изменён, попросим браузер задать вопрос пользователю
    if ( (gameStat === 1 || gameStat === 2) && currentScore > 0 )
      console.log('we have progress')
      EO.returnValue='Вы можете потерять свой прогресс';
  };