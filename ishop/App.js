import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/IShop';

const iShopName='Товары для питомцев';
const names = 'Наименование';
const images = 'Изображение';
const prices = 'Цена, р';
const qts = 'Остаток, шт';

import itemsArr from './items.json';

ReactDOM.render(
  <IShop 
    name = {iShopName}
    items = {itemsArr}
    names = {names}
    images = {images}
    prices = {prices}
    qts = {qts}
  />
  , document.getElementById('container') 
);
