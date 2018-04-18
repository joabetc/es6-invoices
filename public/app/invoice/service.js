import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromInvoices = invoices => invoices.$flatMap(invoice => invoice.items);
const filterItemsByCode = (code, items) => items.filter(item => item.id == code);
const sumItemsValue = items => items.reduce((total, item) => total + item.value, 0);

export const invoiceService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(invoices => {
                if (invoices) return invoices;
                return [];
            })
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
            .then(sumItems);
    }
};