import React from "react";
import './IShopCard.css';

class IShopCard extends React.Component {

	render() {
		const isSelected = this.props.selectedId;
		return (
			(isSelected===this.props.id) &&
			<div class='ShopItemCard'>
			<img src={this.props.image} alt={this.props.name} width = '200' height = '200' />
			<div class='IShopItemDesc'>
				<div>
					<span>Название:</span>
					{this.props.name} <br />
				</div>
				<div>
					<span>Цена, руб:</span>
					{this.props.price} <br />
				</div>
				<div>
					<span>Остаток на складе, шт:</span>
					{this.props.qt}
				</div>
			</div>
		</div>
		)	
	}
};

export default IShopCard;