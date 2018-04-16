import { handleStatus } from '../utils/promise-helpers.js';

const API = 'http://localhost:3000/notas';

export const invoiceService = {
    listAll() {
        return fetch(API).then(handleStatus);
    }
};