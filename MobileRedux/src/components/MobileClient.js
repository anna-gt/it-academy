import React, { useState, useRef } from 'react';

import {mobileEvents} from "./events";

const MobileClient = ({info}) => {

	console.log("MobileClient id="+info.id+" render");
	
	const [isEditing, setEditing] = useState(false);

	const newSNameRef = useRef(null);
	const newNameRef = useRef(null);
	const newFNameRef = useRef(null);
	const newBalanceRef = useRef(null);

	function saveClient() {
		mobileEvents.emit('EClientChanged',
		{id: info.id, 
		sName: newSNameRef.current.value,
		name: newNameRef.current.value,
		fName: newFNameRef.current.value,
		balance: parseFloat(newBalanceRef.current.value),
	});
	setEditing(false);
	};

	function deleteClient() {
		mobileEvents.emit('EDeleteClient',info.id)
	};

	return(
		<tr>
				<td>
					{isEditing ? 
					<input type='text' defaultValue={info.sName} ref={newSNameRef}></input> :
					info.sName}
				</td>
				<td>
					{isEditing ?
					<input type='text' defaultValue={info.name} ref={newNameRef}></input> :
					info.name}
				</td>
				<td>
					{isEditing ?
					<input type='text' defaultValue={info.fName} ref={newFNameRef}></input> :
					info.fName}
					</td>
				<td>
					{isEditing ?
					<input type='number' defaultValue={info.balance} ref={newBalanceRef}></input> :
					info.balance}
					</td>
				<td>{info.balance>0 ? "active" : "blocked"}</td>
				<td>
				{isEditing ?
					<button onClick={saveClient}>Сохранить</button> :
					<button onClick={()=>setEditing(true)}>Редактировать</button>}
					</td>
				<td><button onClick={deleteClient}>Удалить</button></td>
			</tr>
	)
};

export default React.memo(MobileClient);