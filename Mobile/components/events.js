import {EventEmitter} from "events";

let mobileEvents = new EventEmitter();
// в потоке mobileEvents будут все события, связанные с изменениями клиентов мобильной компании
// событие 'EClientChanged' - кликнута кнопка сохранения изменений у клиента, его сэмиттирует MobileClient и примет MobileCompany
// событие 'EDeleteClient' - кликнута кнопка удаления клиента, его сэмиттирует MobileClient и примет MobileCompany
// событие 'EClientAdded' - добавлен новый клиент, его сэмиттирует AddClient и примет MobileCompany
// событие 'ECancelAdding' - выход из меню добавления клиента, его сэмиттирует AddClient и примет MobileCompany

export {mobileEvents};