'use strict';
class ObjStorageClass {
  constructor() {
    this.store = {};
  }
  
  addValue (key, value) {
    this.store[key] = value;
  }
  
  getValue (key) {
      return this.store[key];
  }
  
  deleteValue (key) {
    if (!(key in this.store))
      return false;
    else {
        delete this.store[key];
        return true;
    } 
  }
  getKeys () {
    return Object.keys(this.store);
  }
}

const drinkStorage = new ObjStorageClass();

drinkStorage.addValue ('Отвертка', {isAlcohol: true, recipe: 'сок+водка'});
console.log(drinkStorage.getKeys);
console.log(drinkStorage.getValue('Отвертка'));

function addDrink () {
  const name = prompt('Введите название напитка');
  const isAlcohol = confirm('Напиток алкогольный? (Нажмите ОК если да)');
  const recipe = prompt('Введите рецепт напитка');
  drinkStorage.addValue(name, {isAlcohol:isAlcohol, recipe:recipe});
  console.log('Добавлен напиток:', name, drinkStorage.getValue(name));
};

function getDrink () {
  const name = prompt('Введите название напитка');
  const result = drinkStorage.getValue(name);
  if (!result)
    alert ('напиток не найден');
  else {
    const alco = (result.isAlcohol)?'да':'нет';
    alert (`Название напитка: ${name} \n 
            напиток алкогольный: ${alco} \n
            рецепт напитка: ${result.recipe}`);
  }
};

function deleteDrink () {
  const name = prompt('Введите название напитка');
  const result = drinkStorage.deleteValue(name);
  alert (result?'напиток удален':'напиток не найден');
};

function drinkList () {
  const list = drinkStorage.getKeys();
  alert (list.join("\n"));
}