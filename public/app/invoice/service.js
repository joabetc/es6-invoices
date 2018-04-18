import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js'

const API = 'http://localhost:3000/notas';

const getItemsFromInvoices = invoicesM => invoicesM.map(invoices => invoices.$flatMap(invoice => invoice.items));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.id == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.value, 0));

export const invoiceService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(invoices => Maybe.of(invoices))
            .catch(err => {
                console.log(err);
                return Promise.reject('It was not possible to retrieve invoices data');
            });
    },
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        
        const sumItems = pipe(
            getItemsFromInvoices, 
            filterItems, 
            sumItemsValue
        );

        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
};