import { handleStatus } from '../utils/promise-helpers.js';
import { partialize } from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromInvoices = invoices => invoices.$flatMap(invoice => invoice.items);
const filterItemsByCode = (code, items) => items.filter(item => item.id == code);
const sumItemsValue = items => items.reduce((total, item) => total + item.value, 0);

export const invoiceService = {
    listAll() {
        return fetch(API).then(handleStatus);
    },
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        return this.listAll()
            .then(invoices => 
                sumItemsValue(
                    filterItems(
                        getItemsFromInvoices(invoices)
                    )
                )
            );
    }
};