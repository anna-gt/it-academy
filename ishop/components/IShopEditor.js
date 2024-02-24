import React from "react";
import PropTypes from 'prop-types';

class IShopEditor extends React.Component {

	static propTypes = {
		product: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			price: PropTypes.number,
			qt: PropTypes.number,
			photoUrl: PropTypes.string
		}),

	}
	state = {
		
	}
	quit = eo => {
		this.props.quit();
	}
	render() {
		const isEditing = this.props.editingId;
			return (
				<div className='ShopItemCardEdit'>
				<span>Название:</span>
				<input type='text' value = {this.props.product.name}/><br />
				<span>URL изображения:</span>
				<input type='text' value = {this.props.product.image}/><br />
				<span>Цена, руб:</span>
				<input type='text' value = {this.props.product.price}/><br />
				<span>Остаток на складе, шт:</span>
				<input type='text' value = {this.props.product.qt}/><br />
				<button>Сохранить</button>
				<button onClick = {this.quit}>Выйти</button>
			</div>
			)		
		}
	}

export default IShopEditor;