import React from 'react';
import './IShopItem.css';
import PropTypes from 'prop-types';


class IShopItem extends React.Component {

	static propTypes = {
		id: PropTypes.number,
		name: PropTypes.string,
		image: PropTypes.string,
		price: PropTypes.number,
		qt: PropTypes.number,
		editingId: PropTypes.number,
		selectedId: PropTypes.number,
		disabled: PropTypes.bool,
		selectedItem: PropTypes.func,
		editingItem: PropTypes.func,
		deletedItem: PropTypes.func,
	}

	itemSelected = eo => {
		this.props.selectedItem(this.props.id);
	}
	itemDeleted = event => {
		event.stopPropagation();
		this.props.deletedItem(this.props.id);
	}
	itemEditing = eo => {
		eo.stopPropagation();
		this.props.editingItem(this.props.id);
	}
  render() {
		const isSelected = this.props.selectedId;
		const isEditing = this.props.editingId;
    return (
        <tr className={((isSelected===this.props.id)||((isEditing===this.props.id)))
					?
					'IShopItem IShopItemSelected'
					:
					'IShopItem'}
						onClick={this.itemSelected}>
          <td>{this.props.name}</td>
          <td><img src={this.props.image} alt={this.props.name} width = '100' height = '100'/></td>
          <td>{this.props.price}</td>
          <td>{this.props.qt}</td>
					<td><button onClick = {this.itemEditing} disabled={this.props.disabled}>Редактировать товар</button></td>
					<td><button onClick = {this.itemDeleted} disabled={this.props.disabled}>Удалить товар</button></td>
        </tr>
    )

  }

}

export default IShopItem;
