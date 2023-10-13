function createForm(arr) {
  let form1 = document.createElement("form");
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i];
    let labelName = document.createTextNode(line.label);
    form1.appendChild(labelName);
    let type1;
    let elem;
    if (line.kind === 'longtext' || line.kind === 'number' || line.kind === 'shorttext') {
      elem = 'input';
      type1 = 'text';
    }
    else if (line.kind === 'combo') {
      elem = 'select';
    }
    else if (line.kind === 'radio') {
      elem = 'input';
      type1 = 'radio';
    }
    else if (line.kind === 'check') {
      elem = 'input';
      type1 = 'checkbox';
    }
    else if (line.kind === 'memo') 
      elem = 'textarea';
    else if (line.kind === 'submit') {
        elem = 'input';
        type1 = 'submit'; 
      };
    /* if (type1 === 'radio') {
      for (let i = 0; i < line.variants.length; i++) {
        let variant = line.variants[i];
        let elem2 = document.createElement(elem);
        let value1 = variant.value;
        let radioName = variant.text;
        let radio1 = document.createTextNode(radioName);
        elem2.setAttribute("value", value1);
        elem2.appendChild(radio1);
    }
  } */
      let elem1 = document.createElement(elem);
    if (elem === 'select') {
      for (let i = 0; i < line.variants.length; i++){
        let variant = line.variants[i];
        let optionName = variant.text;
        let value1 = variant.value;
        let option1 = document.createElement('option');
        let optionValue = document.createTextNode(optionName);
        option1.appendChild(optionValue);
        option1.setAttribute("value", value1);
        elem1.appendChild(option1);
      }
    };
    if (type1 === 'submit') {
      value1 = line.caption;
      elem1.setAttribute("value", value1);
    };
    elem1.setAttribute("type", type1);
    elem1.setAttribute("name", line.name);
    elem1.setAttribute("checked", "checked");
    let newLine = document.createElement("br");
    form1.appendChild(elem1);
    form1.appendChild(newLine);
  }
  document.body.appendChild(form1);
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