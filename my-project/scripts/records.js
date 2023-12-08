"use strict"

const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
const stringName='HETSMAN_SNAKE_SCORE';

function storeInfo() {
  updatePassword=Math.random();
  $.ajax( {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'LOCKGET', n : stringName, p : updatePassword },
          success : lockGetReady, error : errorHandler
      }
  );
}

function lockGetReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else {
    let scoreTable = JSON.parse(callresult.result);
    console.log(callresult.result);
      const info={
          name : document.getElementById('user-name').value,
          score : parseInt(document.getElementById('current-score').textContent)
      };
      scoreTable.push(info);
      scoreTable.sort(byField('score'));
      console.log(scoreTable);
      // больше 10 результатов хранить не будем
      if (scoreTable.length > 10) {
        scoreTable.pop();
      }
      $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'UPDATE', n : stringName,
                  v : JSON.stringify(scoreTable), p : updatePassword },
              success : updateReady, error : errorHandler
          }
      );
  }
}

function updateReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
}


function restoreInfo() {
  $.ajax(
      {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'READ', n : stringName },
          success : readReady, error : errorHandler
      }
  );
}

function readReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else if ( callresult.result!="" ) {
      const info=JSON.parse(callresult.result);
      let list = document.querySelector('.records-wrapper').querySelectorAll('li');
      for (let i = 0; i < list.length; i++) {
        console.log(i);
        list[i].innerHTML = `${i+1}. ${info[i].name}: <span id='record-number'>${info[i].score}</span>`;
      }
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
function byField(field) {
  return (a, b) => a[field] > b[field] ? -1 : 1;
}  