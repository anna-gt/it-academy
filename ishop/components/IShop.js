﻿import React, { Fragment } from 'react';

import './IShop.css';

import IShopName from './IShopName';
import IShopItem from './IShopItem';
import IShopHeader from './IShopHeader';

class IShop extends React.Component {

  render() {

    const itemsCode = this.props.items.map( i =>
      <IShopItem key={i.id} name = {i.name} price = {i.price} qt = {i.qt} image = {i.photoUrl} />
    );

    return (
        <table>
          <caption><IShopName name = {this.props.name} /></caption>
          <thead>
            <IShopHeader names = {this.props.names} images = {this.props.images} prices = {this.props.prices} qts = {this.props.qts} />
          </thead>
          <tbody>{itemsCode}</tbody>
          </table>
    )

  }

}

export default IShop;