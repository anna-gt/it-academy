import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let clientsArr=[ 
  {id:101, sName:"Иванов", name:"Иван", fName:"Иванович", balance:200}, 
  {id:102, sName:"Сидоров", name:"Сидор", fName:"Сидорович", balance:250}, 
  {id:103, sName:"Петров", name:"Петр", fName:"Петрович", balance:180},
  {id:104, sName:"Григорьев", name:"Григорий", fName:"Григорьевич", balance:-220},
];

ReactDOM.render(
  <MobileCompany 
		mobileClients={clientsArr}
  />
  , document.getElementById('container') 
);

