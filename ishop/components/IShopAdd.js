import React from "react";
import PropTypes from "prop-types";
import './IShopEditor.css';

class IShopAdd extends React.Component {

	static propTypes = {
		id: PropTypes.number,
		cbSave: PropTypes.func,
		cbCancel: PropTypes.func,
	}

	state = {
		name: '',
		price: '',
		qt: '',
		photoUrl: '',
		nameError: '',
		urlError: '',
		priceError: '',
		qtError: '',
		valid: true
	}
	nameChanged = (eo) => {
		this.setState({name: eo.target.value},this.validate)
	};
	imgChanged = (eo) => {
		this.setState({photoUrl: eo.target.value},this.validate)
	};
	priceChanged = (eo) => {
		this.setState({price: parseFloat(eo.target.value)},this.validate)
	};
	qtChanged = (eo) => {
		this.setState({qt: parseFloat(eo.target.value)},this.validate)
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
			id: this.props.id,
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
		return(
			<div className='ShopItemCardEdit'>
				<div className='ShopItemCardEdit_item'>
					<span>ID: {this.props.id}</span>
				</div>
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
					<input type='number' value = {this.state.price} onChange={this.priceChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.priceError}</span>
				<br />
				<div className='ShopItemCardEdit_item'>
					<span>Остаток на складе, шт:</span>
					<input type='number' value = {this.state.qt} onChange={this.qtChanged}/>
				</div>
				<span className ='ShopItemCardEdit_error'>{this.state.qtError}</span>
				<br />
				<button onClick={this.save} disabled={!this.state.valid}>Сохранить</button>
				<button onClick = {this.cancel}>Выйти</button>
			</div>
		)
	}
}

export default IShopAdd;