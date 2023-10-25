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
const errorPublicMssg = document.getElementById('public1');

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
    if (devValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, разработчиков!');
      errorDevMssg.appendChild(errorMsg);
      errorDevMssg.style.color = 'red';
      devField.focus();
      eo.preventDefault();
      return;
    }
    if (nameValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, название сайта!');
      errorNameMssg.appendChild(errorMsg);
      errorNameMssg.style.color = 'red';
      nameField.focus();
      eo.preventDefault();
      return;
    }
    if (addressValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, URL сайта!');
      errorAddressMssg.appendChild(errorMsg);
      errorAddressMssg.style.color = 'red';
      addressField.focus();
      eo.preventDefault();
      return;
    }
    if (startdateValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, дату запуска сайта!');
      errorStartDateMssg.appendChild(errorMsg);
      errorStartDateMssg.style.color = 'red';
      startdateField.focus();
      eo.preventDefault();
      return;
    }
    if (startdateValue < '2015-00-01') {
      let errorMsg = document.createTextNode('Дата запуска не может быть раньше 01.01.2015г!');
      errorStartDateMssg.appendChild(errorMsg);
      errorStartDateMssg.style.color = 'red';
      startdateField.focus();
      eo.preventDefault();
      return;
    }
    if (isNaN(visitorsValue)) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, количество посетителей!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      visitorsField.focus();
      eo.preventDefault();
      return;
    }
    if (visitorsValue < 3) {
      let errorMsg = document.createTextNode('Слишком мало!');
      errorVisitorsMssg.appendChild(errorMsg);
      errorVisitorsMssg.style.color = 'red';
      visitorsField.focus();
      eo.preventDefault();
      return;
    }
    if (mailValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, E-mail для связи!');
      errorMailMssg.appendChild(errorMsg);
      errorMailMssg.style.color = 'red';
      mailField.focus();
      eo.preventDefault();
      return;
    }
    if (rubricValue == 3) {
      let errorMsg = document.createTextNode('Бытовая техника сейчас недоступна!');
      errorRubricMssg.appendChild(errorMsg);
      errorRubricMssg.style.color = 'red';
      rubricField.focus();
      eo.preventDefault();
      return;
    }
    if (publicValue == '') {
      let errorMsg = document.createTextNode('Выберите, пожалуйста, вид размещения!');
      errorPublicMssg.appendChild(errorMsg);
      errorPublicMssg.style.color = 'red';
      document.getElementById('publicscroll').scrollIntoView();
      eo.preventDefault();
      return;
    }
    if (publicValue == '3') {
      let errorMsg = document.createTextNode('VIP размещение сейчас недоступно!');
      errorPublicMssg.appendChild(errorMsg);
      errorPublicMssg.style.color = 'red';
      document.getElementById('publicscroll').scrollIntoView();
      eo.preventDefault();
      return;
    }
    if (!replyValue) {
      let errorMsg = document.createTextNode('Вы не разрешили отзывы!');
      errorReplyMssg.appendChild(errorMsg);
      errorReplyMssg.style.color = 'red';
      replyField.focus();
      eo.preventDefault();
      return;
    }
    if (articleValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, описание сайта!');
      errorArticleMssg.appendChild(errorMsg);
      errorArticleMssg.style.color = 'red';
      articleField.focus();
      eo.preventDefault();
      return;
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
      try {
        if (devValue.length < 1) {
          errorDevMssg.innerHTML = '';
          let errorMsg = document.createTextNode('Введите, пожалуйста, разработчиков!');
          errorDevMssg.appendChild(errorMsg);
          errorDevMssg.style.color = 'red';
          return;
        }
        errorDevMssg.innerHTML = '';
      }
      catch(ex){
      console.log(ex);
      alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
      eo.preventDefault(); 
      }
  }

  nameField.onblur = function() {
    const nameValue = nameField.value;
    try {
      if (nameValue.length < 1) {
        errorNameMssg.innerHTML = '';
        let errorMsg = document.createTextNode('Введите, пожалуйста, название сайта!');
        errorNameMssg.appendChild(errorMsg);
        errorNameMssg.style.color = 'red';
        return;
      }
      errorNameMssg.innerHTML = '';
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

  addressField.onblur = function() {
    const addressValue = addressField.value;
    try {
      if (addressValue.length < 1) {
        errorAddressMssg.innerHTML = '';
        let errorMsg = document.createTextNode('Введите, пожалуйста, URL сайта!');
        errorAddressMssg.appendChild(errorMsg);
        errorAddressMssg.style.color = 'red';
        return;
      }
      errorAddressMssg.innerHTML = '';
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

  startdateField.onblur = function() {
    const startdateValue = startdateField.value;
    try {
      if (startdateValue.length < 1) {
        errorStartDateMssg.innerHTML = '';
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
      errorStartDateMssg.innerHTML = '';
    }
    catch(ex){
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
    }
}

visitorsField.onblur = function() {
  const visitorsValue = visitorsField.value;
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
    errorVisitorsMssg.innerHTML = '';
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

mailField.onblur = function() {
  const mailValue = mailField.value;
  try {
    if (mailValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, E-mail для связи!');
      errorMailMssg.appendChild(errorMsg);
      errorMailMssg.style.color = 'red';
      return;
    }
    errorMailMssg.innerHTML = '';
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

rubricField.onblur = function() {
  const rubricValue = rubricField.value;
  try {
    if (rubricValue == 3) {
      let errorMsg = document.createTextNode('Бытовая техника сейчас недоступна!');
      errorRubricMssg.appendChild(errorMsg);
      errorRubricMssg.style.color = 'red';
      return;
    }
    errorRubricMssg.innerHTML = '';
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}

articleField.onblur = function() {
  const articleValue = articleField.value;
  try {
    if (articleValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, описание сайта!');
      errorArticleMssg.appendChild(errorMsg);
      errorArticleMssg.style.color = 'red';
      return;
    }
    errorArticleMssg.innerHTML = '';
  }
  catch(ex){
  console.log(ex);
  alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
  eo.preventDefault(); 
  }
}