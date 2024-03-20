import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clientChangedR, deleteClientR, addClientR } from "../redux/clients.js";

import MobileClient from "./MobileClient";
import AddClient from "./AddClient";

import { mobileEvents } from "./events";

const MobileCompany = props => {

	console.log("MobileCompany render");

	const [shownClients, setShownClients] = useState(1); // 1 - все клиенты, 2 - активные, 3 - заблокированные(баланс<0)
	const [nextId, setNextId] = useState(105);
	const [addingClient, setAddingClient] = useState(false);

	const dispatch = useDispatch();
	const clients = useSelector(state => state.clients);

	useEffect(
		() => {
			mobileEvents.addListener('EClientChanged',clientChanged);
			mobileEvents.addListener('EDeleteClient',deleteClient);
			mobileEvents.addListener('EClientAdded',addClient);
			mobileEvents.addListener('ECancelAdding',setAddingClient);
			return () => {
				mobileEvents.removeListener('EClientChanged',clientChanged);
				mobileEvents.removeListener('EDeleteClient',deleteClient);
				mobileEvents.removeListener('EClientAdded',addClient);
				mobileEvents.removeListener('ECancelAdding',setAddingClient);
			};
		},
		[clients]
	);
	
	function clientChanged({id,sName,name,fName,balance}) {
		dispatch( clientChangedR({id,sName,name,fName,balance}))
		};

	function deleteClient(id) {
		const del = window.confirm('Удалить клиента?');
		if (del) {
			dispatch( deleteClientR({id}) );
		} 
	};

	function addClient({id,sName,name,fName,balance}) {
		dispatch( addClientR({id,sName,name,fName,balance})); 
		setAddingClient(false);
		setNextId(nextId+1);
	};

	let clientCode;

	let newClientCode;
	if (addingClient) {
		newClientCode = <AddClient id={nextId} />;
	}

	if (shownClients === 1) {
		clientCode = clients.clients.map(client =>
			<MobileClient key={client.id} info={client} />
		);
	}		

	if (shownClients === 2) {
		const filteredClients = clients.clients.filter((client) => client.balance>0)
		clientCode = filteredClients.map(client =>
			<MobileClient key={client.id} info={client} />
		);
	};

	if (shownClients === 3) {
		const filteredClients = clients.clients.filter((client) => client.balance<0)
		clientCode = filteredClients.map(client =>
			<MobileClient key={client.id} info={client} />
		);
	};


	return(
		<div>
					<button onClick={()=>setShownClients(1)}>Все</button>
					<button onClick={()=>setShownClients(2)}>Активные</button>
					<button onClick={()=>setShownClients(3)}>Заблокированные</button>
					<table>
						<thead>
						<tr>
							<td>Фамилия</td>
							<td>Имя</td>
							<td>Отчество</td>
							<td>Баланс</td>
							<td>Статус</td>
							<td>Редактировать</td>
							<td>Удалить</td>
						</tr>
						</thead>
						<tbody>
							{clientCode}
							{newClientCode}
						</tbody>
						<tfoot>
							<tr>
								<td>
									<button onClick={()=>setAddingClient(true)}>Добавить клиента</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
	)
};

export default MobileCompany;