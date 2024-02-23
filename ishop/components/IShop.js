import React, { Fragment } from 'react';

import './IShop.css';

import IShopName from './IShopName';
import IShopItem from './IShopItem';
import IShopHeader from './IShopHeader';
import IShopCard from './IShopCard';

class IShop extends React.Component {

	state = {
		selectedItemKey: null,
		currentItems: this.props.items,
	}

	selectedItem = (id) => {
		console.log(id);
		this.setState({selectedItemKey: id});
	}
	deletedItem = (id) => {
		let updateItems = this.state.currentItems.filter((item) => item.id !== id);
		console.log(updateItems);
		this.setState({currentItems: updateItems});
	}
  render() {

    const itemsCode = this.state.currentItems.map( i =>
      <IShopItem 
			key={i.id} 
			id={i.id+10}
			name = {i.name} 
			price = {i.price} 
			qt = {i.qt} 
			image = {i.photoUrl}
			selectedId = {this.state.selectedItemKey}
			selectedItem = {this.selectedItem}
			deletedItem = {this.deletedItem} />
    );
		const itemsCards = this.state.currentItems.map(i =>
			<IShopCard 
			id={i.id+10}
			name = {i.name} 
			price = {i.price} 
			qt = {i.qt} 
			image = {i.photoUrl}
			selectedId = {this.state.selectedItemKey}
			/>
			)

    return (
        <div class='IShop'>
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
						{this.state.selectedItemKey && itemsCards}
				</div>
    )

  }

}

export default IShop;
