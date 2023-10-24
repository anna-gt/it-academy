'use strict'
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
const errorPublic1Mssg = document.getElementById('public1');
const errorPublic2Mssg = document.getElementById('public2');
const errorPublic3Mssg = document.getElementById('public3');

const replyField = formElem.elements.reply;
const replyValue = replyField.checked;
const errorReply1Mssg = document.getElementById('reply');

const articleField = formElem.elements.article;
const articleValue = articleField.value;
const errorArticle1Mssg = document.getElementById('article');

formElem.addEventListener('submit',validateForm,false);
function validateForm(eo) {
  eo=eo||window.event;
  try {
    if (devValue.length < 1) {
      let errorMsg = document.createTextNode('Введите, пожалуйста, разработчиков');
      errorMsg.color = 'red';
      errorDevMssg.appendChild(errorMsg);
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