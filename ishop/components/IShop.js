import React, { Fragment } from 'react';

import './IShop.css';

import IShopName from './IShopName';
import IShopItem from './IShopItem';
import IShopHeader from './IShopHeader';

class IShop extends React.Component {

	state = {
		selectedItemKey: null,
		currentItems: this.props.items,
	}

	selectedItem = (id) => {
		console.log(id);
		this.setState({selectedItemKey: id});
	}
	deletedItem = (id,event) => {
		event.stopPropagation();
		let updateItems = this.state.currentItems.filter((item) => item.id !== id);
		console.log(updateItems);
		this.setState({currentItems: updateItems});
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
			selectedId = {this.state.selectedItemKey}
			selectedItem = {this.selectedItem}
			deletedItem = {this.deletedItem} />
    );

    return (
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
    )

  }

}

export default IShop;
