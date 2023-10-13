function createForm(arr) {
  let form1 = document.createElement("form");
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i];
    let labelName = document.createTextNode(line.label);
    form1.appendChild(labelName);
    // document.body.appendChild(p1);
   // let input1 = document.createElement("input");
    let type1;
    let elem;
    if (line.kind === 'longtext' || line.kind === 'number' || line.kind === 'shorttext') {
      elem = 'input';
      type1 = 'text';
    }
    else if (line.kind === 'combo')
      elem = 'select';
    else if (line.kind === 'radio') {
      elem = 'input';
      type1 = 'radio';
    }
    else if (line.kind === 'check') {
      elem = 'checkbox';
    }
    else if (line.kind === 'memo') 
      elem = 'textarea';
      else if (line.kind === 'submit') {
        elem = 'input';
        type1 = 'submit'; 
      }
    let elem1 = document.createElement(elem);
    elem1.setAttribute("type", type1);
    elem1.setAttribute("name", line.name);
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