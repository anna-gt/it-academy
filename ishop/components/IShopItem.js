﻿import React from 'react';
import './IShopItem.css';


class IShopItem extends React.Component {
	itemSelected = eo => {
		this.props.selectedItem(this.props.id);
	}
	itemDeleted = eo => {
		this.props.deletedItem(this.props.id,eo);
	}
  render() {
    return (
        <tr className={(this.props.selectedId===this.props.id)?'IShopItem IShopItemSelected':'IShopItem'}
						onClick={this.itemSelected}>
          <td>{this.props.name}</td>
          <td><img src={this.props.image} alt={this.props.name} width = '100' height = '100'/></td>
          <td>{this.props.price}</td>
          <td>{this.props.qt}</td>
					<td><button onClick={this.itemDeleted}>Удалить товар</button></td>
        </tr>
    )

  }

}

export default IShopItem;
