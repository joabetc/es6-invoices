import { handleStatus } from '../utils/promise-helpers.js';

const API = 'http://localhost:3000/notas';

const sumItems = code => invoices => invoices
    .$flatMap(invoice => invoice.items)
    .filter(item => item.id == code)
    .reduce((total, item) => total + item.value, 0);

export const invoiceService = {
    listAll() {
        return fetch(API).then(handleStatus);
    },
    sumItems(code) {
        return this.listAll().then(sumItems(code));
    }
};