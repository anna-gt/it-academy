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
		cbSave: PropTypes.func
	}
	state = {
		name: this.props.product.name,
		price: this.props.product.price,
		qt: this.props.product.qt,
		photoUrl: this.props.product.photoUrl
	}
	nameChanged = (eo) => {
		this.setState({name: eo.target.value})
	};
	imgChanged = (eo) => {
		this.setState({photoUrl: eo.target.value})
	};
	priceChanged = (eo) => {
		this.setState({price: eo.target.value})
	};
	qtChanged = (eo) => {
		this.setState({qt: eo.target.value})
	};
	save = () => {
		this.props.cbSave({
			name: this.state.name,
			price: this.state.price,
			qt: this.state.qt,
			image: this.state.photoUrl
		})
	};
	cancel = eo => {
		this.props.quit();
	}
	render() {
		const isEditing = this.props.editingId;
			return (
				<div className='ShopItemCardEdit'>
				<span>Название:</span>
				<input type='text' value = {this.state.name} onChange={this.nameChanged}/><br />
				<span>URL изображения:</span>
				<input type='text' value = {this.state.photoUrl} onChange={this.imgChanged}/><br />
				<span>Цена, руб:</span>
				<input type='text' value = {this.state.price} onChange={this.priceChanged}/><br />
				<span>Остаток на складе, шт:</span>
				<input type='text' value = {this.state.qt} onChange={this.qtChanged}/><br />
				<button onClick={this.save}>Сохранить</button>
				<button onClick = {this.cancel}>Выйти</button>
			</div>
			)		
		}
	}

export default IShopEditor;