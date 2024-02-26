import React from "react";
import PropTypes from 'prop-types';
import './IShopEditor.css';

class IShopEditor extends React.Component {

	static propTypes = {
		product: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			price: PropTypes.number,
			qt: PropTypes.number,
			photoUrl: PropTypes.string
		}),
		cbSave: PropTypes.func,
		cbCancel: PropTypes.func,
		cbDisable: PropTypes.func
	}
	state = {
		name: this.props.product.name,
		price: this.props.product.price,
		qt: this.props.product.qt,
		photoUrl: this.props.product.photoUrl,
		nameError: '',
		urlError: '',
		priceError: '',
		qtError: '',
		valid: true
	}
	nameChanged = (eo) => {
		this.props.cbDisable();
		this.setState({name: eo.target.value},this.validate)
	};
	imgChanged = (eo) => {
		this.props.cbDisable();
		this.setState({photoUrl: eo.target.value},this.validate)
	};
	priceChanged = (eo) => {
		this.props.cbDisable();
		this.setState({price: eo.target.value},this.validate)
	};
	qtChanged = (eo) => {
		this.props.cbDisable();
		this.setState({qt: eo.target.value},this.validate)
	};
	validate = () => {
		const nameError = this.state.name ? "" : "Поле не должно быть пустым!";
		const urlError = this.state.photoUrl ? "" : "Поле не должно быть пустым!";
		const priceError = this.state.price ? "" : "Поле не должно быть пустым!";
		const qtError = this.state.qt ? "" : "Поле не должно быть пустым!";
		const valid = !nameError && !urlError && !priceError && !qtError;
		this.setState({nameError,urlError,priceError,qtError,valid})
	}
	save = () => {
		this.props.cbSave({
			name: this.state.name,
			price: this.state.price,
			qt: this.state.qt,
			image: this.state.photoUrl
		})
	};
	cancel = eo => {
		this.props.cbCancel();
	}
	render() {
			return (
				<div className='ShopItemCardEdit'>
				<div className='ShopItemCardEdit_item'>
					<span>Название:</span>
					<input type='text' value = {this.state.name} onChange={this.nameChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.nameError}</span>
				<br />
				<div className='ShopItemCardEdit_item'>
					<span>URL изображения:</span>
					<input type='text' value = {this.state.photoUrl} onChange={this.imgChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.urlError}</span>
				<br />
				<div className='ShopItemCardEdit_item'>
					<span>Цена, руб:</span>
					<input type='text' value = {this.state.price} onChange={this.priceChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.priceError}</span>
				<br />
				<div className='ShopItemCardEdit_item'>
					<span>Остаток на складе, шт:</span>
					<input type='text' value = {this.state.qt} onChange={this.qtChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.qtError}</span>
				<br />
				<button onClick={this.save} disabled={!this.state.valid}>Сохранить</button>
				<button onClick = {this.cancel}>Выйти</button>
			</div>
			)		
		}
	}

export default IShopEditor;