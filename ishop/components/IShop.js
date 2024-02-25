import React, { Fragment } from 'react';

import './IShop.css';

import IShopName from './IShopName';
import IShopItem from './IShopItem';
import IShopHeader from './IShopHeader';
import IShopCard from './IShopCard';
import IShopEditor from './IShopEditor';

class IShop extends React.Component {

	state = {
		selectedItemId: null,
		currentItems: this.props.items,
		editingItemId: null,
	}

	selectedItem = (id) => {
		this.setState({selectedItemId: id});
		if (this.state.editingItemId !==id )
			this.setState({editingItemId: null})
	};
	deletedItem = (id) => {
		let updateItems = this.state.currentItems.filter((item) => item.id !== id);
		this.setState({currentItems: updateItems, selectedItemId: null, editingItemId: null});
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
	quit = () => {
		this.setState({editingItemId: null});
		this.setState({selectedItemId: null});
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
			selectedId = {this.state.selectedItemId}
			editingId = {this.state.editingItemId}
			selectedItem = {this.selectedItem}
			deletedItem = {this.deletedItem}
			editingItem = {this.editingItem} />
    );
		const [shownItem] = this.state.currentItems.filter(i => i.id===this.state.selectedItemId);
		const itemsCard = <IShopCard product = {shownItem} />
		const [editingItem] = this.state.currentItems.filter(i => i.id===this.state.editingItemId);
		const itemsEditor = <IShopEditor product = {editingItem} cbSave={this.save}/>
		
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
						</table>
						{this.state.selectedItemId && itemsCard}
						{this.state.editingItemId && itemsEditor}
				</div>
    )

  }

}

export default IShop;
