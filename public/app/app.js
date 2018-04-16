import { handleStatus, log } from './utils/promise-helpers.js';

document
    .querySelector('#myButton')
    .onclick = () => 
        fetch('http://localhost:3000/notas')
            .then(handleStatus)
            .then(invoices => invoices.reduce((array, invoice) => array.concat(invoice.items), []))
            .then(log)
            .then(items => items.filter(item => item.id == '2143'))
            .then(log)
            .then(items => items.reduce((total, item) => total + item.value, 0))
            .then(console.log)
            .catch(console.log);