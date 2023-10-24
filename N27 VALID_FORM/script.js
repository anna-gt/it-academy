'use strict'
const formElem = document.forms.addsite;
/*
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
const errorPublic1Mssg = document.getElementById('public1');
const errorPublic2Mssg = document.getElementById('public2');
const errorPublic3Mssg = document.getElementById('public3');

const replyField = formElem.elements.reply;
const replyValue = replyField.checked;
const errorReply1Mssg = document.getElementById('reply');

const articleField = formElem.elements.article;
const articleValue = articleField.value;
const errorArticle1Mssg = document.getElementById('article');
*/
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
  const errorRubricMssg = document.getElementById('rubricspan');

  const publicField = formElem.elements.public;
  const publicValue = publicField.value;
  const errorPublic1Mssg = document.getElementById('public1');
  const errorPublic2Mssg = document.getElementById('public2');
  const errorPublic3Mssg = document.getElementById('public3');

  const replyField = formElem.elements.reply;
  const replyValue = replyField.checked;
  const errorReply1Mssg = document.getElementById('reply');

  const articleField = formElem.elements.article;
  const articleValue = articleField.value;
  const errorArticle1Mssg = document.getElementById('article');
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
    if (isNaN(visitorsValue)) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, количество посетителей!');
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

  }
  catch ( ex ) {
    console.log(ex);
    alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
    eo.preventDefault(); 
}
}