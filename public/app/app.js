import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil } from './utils/operators.js';

const showMessage = () => console.log('Hi');
const operation = takeUntil(3, showMessage);

let counter = 10;
while(counter--) operation();

document
    .querySelector('#myButton')
    .onclick = () => 
        service
            .sumItems('2143')
            .then(console.log)
            .catch(console.log);