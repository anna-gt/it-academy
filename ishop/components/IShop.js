import React from 'react';
import PropTypes from "prop-types";

import './IShop.css';

import IShopName from './IShopName';
import IShopItem from './IShopItem';
import IShopHeader from './IShopHeader';
import IShopCard from './IShopCard';
import IShopEditor from './IShopEditor';
import IShopAdd from './IShopAdd';

class IShop extends React.Component {

	static propTypes = {
		name: PropTypes.string,
		items: PropTypes.array,
		names: PropTypes.string,
		images: PropTypes.string,
		prices: PropTypes.string,
		qts: PropTypes.string,
	}

	state = {
		selectedItemId: null,
		currentItems: this.props.items,
		editingItemId: null,
		disabled: false,
		addingItem: false,
		newID: 5
	}

	selectedItem = (id) => {
		if (!this.state.disabled) {
			this.setState({selectedItemId: id});
			if (this.state.editingItemId !==id )
				this.setState({editingItemId: null})
			}	
		};
	deletedItem = (id) => {
		let del = confirm('Вы точно хотите удалить выбранный товар?');
		if (del) {
			let updateItems = this.state.currentItems.filter((item) => item.id !== id);
			this.setState({currentItems: updateItems, selectedItemId: null, editingItemId: null});
		}
	};
	editingItem = (id) => {
		this.setState({editingItemId: id, selectedItemId: null});
	};
	save = ({name,price,qt,image}) => {
		let updateItems = this.state.currentItems.slice();
		for (let i=0; i<updateItems.length; i++) {
			const item = updateItems[i];
			if (item.id === this.state.editingItemId) {
				item.name = name;
				item.price = price;
				item.qt = qt;
				item.image = image
			}
			this.setState({currentItems: updateItems})
		}
	};
	cancel = () => {
		this.setState({editingItemId: null, selectedItemId: null, disabled: false, addingItem: false});
	}
	
	openAdditonField = (eo) => {
		this.setState({editingItemId: null, selectedItemId: null, addingItem: true, disabled: true});
	}
	add = ({name,price,qt,image}) => {
		let updateItems = this.state.currentItems.slice();
		let newItem = {
			name: name,
			price: price,
			qt: qt,
			image: image
		};
		updateItems.push(newItem);
		this.setState({currentItems: updateItems, addingItem: false, disabled: false, newID: (this.state.newID+1)})
	}
	disable = () => {
		this.setState({disabled: true})
	}

  render() {

    const itemsCode = this.state.currentItems.map( i =>
      <IShopItem 
			key={i.id} 
			id={i.id}
			name = {i.name} 
			price = {i.price} 
			qt = {i.qt} 
			image = {i.photoUrl}
			disabled = {this.state.disabled}
			selectedId = {this.state.selectedItemId}
			editingId = {this.state.editingItemId}
			selectedItem = {this.selectedItem}
			deletedItem = {this.deletedItem}
			editingItem = {this.editingItem} />
    );
		const [shownItem] = this.state.currentItems.filter(i => i.id===this.state.selectedItemId);
		const itemsCard = <IShopCard product = {shownItem} />
		const [editingItem] = this.state.currentItems.filter(i => i.id===this.state.editingItemId);
		const itemsEditor = <IShopEditor 
		id = {this.state.editingItemId}
		key = {this.state.editingItemId} 
		product = {editingItem} 
		cbSave={this.save} 
		cbCancel={this.cancel}
		cbDisable={this.disable}
		/>
		
    return (
        <div className='IShop'>
					<table>
						<caption><IShopName name = {this.props.name} /></caption>
						<thead>
							<IShopHeader 
								names = {this.props.names} 
								images = {this.props.images} 
								prices = {this.props.prices} 
								qts = {this.props.qts} />
						</thead>
						<tbody>{itemsCode}</tbody>
						<tfoot><tr><th scope='row' colSpan='6'>
							<button onClick={this.openAdditonField} disabled={this.state.disabled}>Добавить новый товар</button>
							</th></tr></tfoot>
						</table>
						{this.state.selectedItemId && itemsCard}
						{this.state.editingItemId && itemsEditor}
						{this.state.addingItem 
						&&
						<IShopAdd
						id={this.state.newID}
						cbCancel={this.cancel}
						cbSave={this.add}
						/>}
				</div>
    )

  }

}

export default IShop;
