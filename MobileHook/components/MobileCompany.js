import React, { useState, useEffect } from 'react';

import MobileClient from "./MobileClient";
import AddClient from "./AddClient";

import { mobileEvents } from "./events";

const MobileCompany = props => {

	console.log("MobileCompany render");

	const [clients, setClients] = useState(props.mobileClients);
	const [shownClients, setShownClients] = useState(1); // 1 - все клиенты, 2 - активные, 3 - заблокированные(баланс<0)
	const [nextId, setNextId] = useState(105);
	const [addingClient, setAddingClient] = useState(false);

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
		let newClients = [...clients]; // копия самого массива клиентов
		newClients.forEach( (client,i) => {
			if (client.id == id) {
				let newClient = {...client}; // копия объекта изменившегося клиента
				newClient.key = id;
				newClient.sName = sName;
				newClient.name = name;
				newClient.fName = fName;
				newClient.balance = balance;
				newClients[i] = newClient;
			}
		}
		);
		setClients(newClients);
		};

	function deleteClient(id) {
		const del = confirm('Удалить клиента?');
		if (del) {
			let newClients = clients.filter( (client) => client.id !== id);
			setClients(newClients);
		} 
	};

	function addClient({id,sName,name,fName,balance}) {
		let newClients = [...clients];
		newClients.push({
			id: id,
			sName: sName,
			name: name,
			fName: fName,
			balance: balance
		});
		setClients(newClients);
		setAddingClient(false);
		setNextId(nextId+1);
	};

	let clientCode;

	let newClientCode;
	if (addingClient) {
		newClientCode = <AddClient id={nextId} />;
	}

	if (shownClients == 1) {
		clientCode = clients.map(client =>
			<MobileClient key={client.id} info={client} />
		);
	}		

	if (shownClients == 2) {
		const filteredClients = clients.filter((client) => client.balance>0)
		clientCode = filteredClients.map(client =>
			<MobileClient key={client.id} info={client} />
		);
	};

	if (shownClients == 3) {
		const filteredClients = clients.filter((client) => client.balance<0)
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