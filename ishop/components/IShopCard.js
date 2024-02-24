import React from "react";
import PropTypes from 'prop-types';
import './IShopCard.css';

class IShopCard extends React.Component {

	static propTypes = {
		product: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			price: PropTypes.number,
			qt: PropTypes.number,
			photoUrl: PropTypes.string
		}),

	}

	render() {
		return (
			<div className='ShopItemCard'>
			<img src={this.props.product.photoUrl} alt={this.props.product.name} width = '200' height = '200' />
			<div className='IShopItemDesc'>
				<div>
					<span>Название:</span>
					{this.props.product.name} <br />
				</div>
				<div>
					<span>Цена, руб:</span>
					{this.props.product.price} <br />
				</div>
				<div>
					<span>Остаток на складе, шт:</span>
					{this.props.product.qt}
				</div>
			</div>
		</div>
		)	
	}
};

export default IShopCard;