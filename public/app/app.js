import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';

document
    .querySelector('#myButton')
    .onclick = () => 
        service
            .sumItems('2143')
            .then(console.log)
            .catch(console.log);