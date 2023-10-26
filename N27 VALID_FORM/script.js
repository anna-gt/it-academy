'use strict'
const formElem = document.forms.addsite;

const devField = formElem.elements.developers;
const errorDevMssg = document.getElementById('dev');

const nameField = formElem.elements.name;
const errorNameMssg = document.getElementById('name');

const addressField = formElem.elements.address;
const errorAddressMssg = document.getElementById('address');

const startdateField = formElem.elements.startdate;
const errorStartDateMssg = document.getElementById('startdate');

const visitorsField = formElem.elements.visitors;
const errorVisitorsMssg = document.getElementById('visitors');

const mailField = formElem.elements.mail;
const errorMailMssg = document.getElementById('mail');

const rubricField = formElem.elements.rubric;
const errorRubricMssg = document.getElementById('rubric');

const publicField = formElem.elements.public;
const errorPublicMssg = document.getElementById('public');

const replyField = formElem.elements.reply;
const errorReplyMssg = document.getElementById('reply');

const articleField = formElem.elements.article;
const errorArticleMssg = document.getElementById('article');

formElem.addEventListener('submit',validateForm,false);
function validateForm(eo) {
  eo=eo||window.event;
  const formElem = document.forms.addsite;

  const devField = formElem.elements.developers;
  const devValue = devField.value;
  const errorDevMssg = document.getElementById('dev');
  
  const nameField = formElem.elements.name;
  const nameValue = nameField.value;
  const errorNameMssg = document.getElementById('name');

  const addressField = formElem.elements.address;
  const addressValue = addressField.value;
  const errorAddressMssg = document.getElementById('address');

  const startdateField = formElem.elements.startdate;
  const startdateValue = startdateField.value;
  const errorStartDateMssg = document.getElementById('startdate');

  const visitorsField = formElem.elements.visitors;
  const visitorsValue = parseInt(visitorsField.value.trim());
  const errorVisitorsMssg = document.getElementById('visitors');

  const mailField = formElem.elements.mail;
  const mailValue = mailField.value;
  const errorMailMssg = document.getElementById('mail');

  const rubricField = formElem.elements.rubric;
  const rubricValue = rubricField.value;
  const errorRubricMssg = document.getElementById('rubric');

  const publicField = formElem.elements.public;
  const publicValue = publicField.value;
  const errorPublicMssg = document.getElementById('public');

  const replyField = formElem.elements.reply;
  const replyValue = replyField.checked;
  const errorReplyMssg = document.getElementById('reply');

  const articleField = formElem.elements.article;
  const articleValue = articleField.value;
  const errorArticleMssg = document.getElementById('article');

  errorDevMssg.innerHTML = '';
  errorNameMssg.innerHTML = '';
  errorAddressMssg.innerHTML = '';
  errorStartDateMssg.innerHTML = '';
  errorVisitorsMssg.innerHTML = '';
  errorMailMssg.innerHTML = '';
  errorRubricMssg.innerHTML = '';
  errorPublicMssg.innerHTML = '';
  errorReplyMssg.innerHTML = '';
  errorArticleMssg.innerHTML = '';

  try {
    if (articleValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, описание сайта!');
      errorArticleMssg.appendChild(errorMsg);
      errorArticleMssg.style.color = 'red';
      articleField.focus();
      eo.preventDefault();
    }
    if (!replyValue) {
      let errorMsg = document.createTextNode('Вы не разрешили отзывы!');
      errorReplyMssg.appendChild(errorMsg);
      errorReplyMssg.style.color = 'red';
      replyField.focus();
      eo.preventDefault();
    }
    if (publicValue == '3') {
      let errorMsg = document.createTextNode('VIP размещение сейчас недоступно!');
      errorPublicMssg.appendChild(errorMsg);
      errorPublicMssg.style.color = 'red';
      document.getElementById('publicscroll').scrollIntoView();
      eo.preventDefault();
    }
    if (publicValue == '') {
      let errorMsg = document.createTextNode('Выберите, пожалуйста, вид размещения!');
      errorPublicMssg.appendChild(errorMsg);
      errorPublicMssg.style.color = 'red';
      document.getElementById('publicscroll').scrollIntoView();
      eo.preventDefault();
    }
    if (rubricValue == 3) {
      let errorMsg = document.createTextNode('Бытовая техника сейчас недоступна!');
      errorRubricMssg.appendChild(errorMsg);
      errorRubricMssg.style.color = 'red';
      rubricField.focus();
      eo.preventDefault();
    }
    if (mailValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, E-mail для связи!');
      errorMailMssg.appendChild(errorMsg);
      errorMailMssg.style.color = 'red';
      mailField.focus();
      eo.preventDefault();
    }
    if (isNaN(visitorsValue)) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, количество посетителей!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      visitorsField.focus();
      eo.preventDefault();
    }
    if (visitorsValue < 3) {
      let errorMsg = document.createTextNode('Слишком мало!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      visitorsField.focus();
      eo.preventDefault();
    } 
    if (startdateValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, дату запуска сайта!');
      errorStartDateMssg.appendChild(errorMsg);
      errorStartDateMssg.style.color = 'red';
      startdateField.focus();
      eo.preventDefault();
    }
    if (startdateValue < '2015-00-01') {
      let errorMsg = document.createTextNode('Дата запуска не может быть раньше 01.01.2015г!');
      errorStartDateMssg.appendChild(errorMsg);
      errorStartDateMssg.style.color = 'red';
      startdateField.focus();
      eo.preventDefault();
    }
    if (addressValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, URL сайта!');
      errorAddressMssg.appendChild(errorMsg);
      errorAddressMssg.style.color = 'red';
      addressField.focus();
      eo.preventDefault();
    }
    if (nameValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, название сайта!');
      errorNameMssg.appendChild(errorMsg);
      errorNameMssg.style.color = 'red';
      nameField.focus();
      eo.preventDefault();
    }
    if (devValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, разработчиков!');
      errorDevMssg.appendChild(errorMsg);
      errorDevMssg.style.color = 'red';
      devField.focus();
      eo.preventDefault();
    }
  }
    catch ( ex ) {
      console.log(ex);
      alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
      eo.preventDefault(); 
  }
}

 devField.onblur = function() {
      const devValue = devField.value;
      errorDevMssg.innerHTML = '';
      try {
        if (devValue.length < 1) {
          let errorMsg = document.createTextNode('Введите, пожалуйста, разработчиков!');
          errorDevMssg.appendChild(errorMsg);
          errorDevMssg.style.color = 'red';
          return;
        }
      }
      catch(ex){
      console.log(ex);
      alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
      eo.preventDefault(); 
      }
  }

  nameField.onblur = function() {
    const nameValue = nameField.value;
    errorNameMssg.innerHTML = '';
    try {
      if (nameValue.length < 1) {
        let errorMsg = document.createTextNode('Введите, пожалуйста, название сайта!');
        errorNameMssg.appendChild(errorMsg);
        errorNameMssg.style.color = 'red';
        return;
      }
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

  addressField.onblur = function() {
    const addressValue = addressField.value;
    errorAddressMssg.innerHTML = '';
    try {
      if (addressValue.length < 1) {
        let errorMsg = document.createTextNode('Введите, пожалуйста, URL сайта!');
        errorAddressMssg.appendChild(errorMsg);
        errorAddressMssg.style.color = 'red';
        return;
      }
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

  startdateField.onblur = function() {
    const startdateValue = startdateField.value;
    errorStartDateMssg.innerHTML = '';
    try {
      if (startdateValue.length < 1) {
        let errorMsg = document.createTextNode('Введите, пожалуйста, дату запуска сайта!');
        errorStartDateMssg.appendChild(errorMsg);
        errorStartDateMssg.style.color = 'red';
        return;
      }
      if (startdateValue < '2015-00-01') {
        let errorMsg = document.createTextNode('Дата запуска не может быть раньше 01.01.2015г!');
        errorStartDateMssg.appendChild(errorMsg);
        errorStartDateMssg.style.color = 'red';
        return;
      }
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

visitorsField.onblur = function() {
  const visitorsValue = parseInt(visitorsField.value.trim());
  errorVisitorsMssg.innerHTML = '';
  try {
    if (isNaN(visitorsValue)) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, количество посетителей!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      return;
    }
    if (visitorsValue < 3) {
      let errorMsg = document.createTextNode('Слишком мало!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      return;
    }
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

mailField.onblur = function() {
  const mailValue = mailField.value;
  errorMailMssg.innerHTML = '';
  try {
    if (mailValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, E-mail для связи!');
      errorMailMssg.appendChild(errorMsg);
      errorMailMssg.style.color = 'red';
      return;
    }
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

rubricField.onblur = function() {
  const rubricValue = rubricField.value;
  errorRubricMssg.innerHTML = '';
  try {
    if (rubricValue == 3) {
      let errorMsg = document.createTextNode('Бытовая техника сейчас недоступна!');
      errorRubricMssg.appendChild(errorMsg);
      errorRubricMssg.style.color = 'red';
      return;
    }
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}
const radio1 = document.getElementById('public1');
const radio2 = document.getElementById('public2');
const radio3 = document.getElementById('public3');
radio1.addEventListener('blur',radioCheck, false );
radio2.addEventListener('blur',radioCheck, false );
radio3.addEventListener('blur',radioCheck, false );
function radioCheck(eo) {
  eo = eo || window.event;
  const publicValue = publicField.value;
  errorPublicMssg.innerHTML = '';
  if (publicValue == '3') {
    let errorMsg = document.createTextNode('VIP размещение сейчас недоступно!');
    errorPublicMssg.appendChild(errorMsg);
    errorPublicMssg.style.color = 'red';
    return;
  }
}

replyField.onblur = function() {
  const replyValue = replyField.checked;
  errorReplyMssg.innerHTML = '';
  try {
    if (!replyValue) {
      let errorMsg = document.createTextNode('Вы не разрешили отзывы!');
      errorReplyMssg.appendChild(errorMsg);
      errorReplyMssg.style.color = 'red';
      return;
    }
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

articleField.onblur = function() {
  const articleValue = articleField.value;
  errorArticleMssg.innerHTML = '';
  try {
    if (articleValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, описание сайта!');
      errorArticleMssg.appendChild(errorMsg);
      errorArticleMssg.style.color = 'red';
      return;
    }
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}