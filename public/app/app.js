import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil } from './utils/operators.js';

const operation = takeUntil(3, () =>
    service
        .sumItems('2143')
        .then(console.log)
        .catch(console.log)
    );

document
    .querySelector('#myButton')
    .onclick = operation;