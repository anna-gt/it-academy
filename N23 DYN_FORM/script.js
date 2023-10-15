"use strict"
function createForm(arr) {
  let form = document.createElement("form");
  function newLine() {
    let brElem = document.createElement('br');
    form.appendChild(brElem);
  };
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i];
    switch (line.kind) {
      case 'longtext': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        let inputElem = document.createElement('input');
        inputElem.type = 'text';
        inputElem.name = line.name;
        form.appendChild(inputElem);
        newLine();
      }
      break;
      case 'number': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        let inputElem = document.createElement('input');
        inputElem.type = 'text';
        inputElem.name = line.name;
        form.appendChild(inputElem);
        newLine();
      }
      break;
      case 'shorttext': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        let inputElem = document.createElement('input');
        inputElem.type = 'text';
        inputElem.name = line.name;
        form.appendChild(inputElem);
        newLine();
      }
      break;
      case 'combo': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        let selectElem = document.createElement('select');
        selectElem.name = line.name;
        for (let i = 0; i < line.variants.length; i++) {
          const variant =  line.variants[i];
          let optionElem = document.createElement('option');
          optionElem.value = variant.value;
          let optionName = document.createTextNode(variant.text);
          optionElem.appendChild(optionName);
          selectElem.appendChild(optionElem);
        }
        form.appendChild(selectElem);
        newLine();
      }
      break;
      case 'radio': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        for (let i = 0; i < line.variants.length; i++) {
          const variant = line.variants[i];
          let radioElem = document.createElement('input');
          radioElem.type = 'radio';
          radioElem.name = line.name;
          radioElem.value = variant.value;
          let radioName = document.createTextNode(variant.text);
          form.appendChild(radioElem);
          form.appendChild(radioName);
        }
        newLine();
      }
      break;
      case 'check': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        let checkElem = document.createElement('input');
        checkElem.type = 'checkbox';
        checkElem.checked = 'checked';
        form.appendChild(checkElem);
        newLine();
      }
      break;
      case 'memo': {
        let labelName = document.createTextNode(line.label);
        form.appendChild(labelName);
        newLine();
        let textarElem = document.createElement('textarea');
        form.appendChild(textarElem);
        newLine();
      }
      break;
      case 'submit': {
        let submitElem = document.createElement('input');
        submitElem.type = 'submit';
        submitElem.value = line.caption;
        form.appendChild(submitElem);
        newLine();
      }
      break;
    }
  }
  document.body.appendChild(form);
}

const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];
createForm(formDef1);
createForm(formDef2);