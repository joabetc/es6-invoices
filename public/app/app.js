import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil, debounceTime } from './utils/operators.js';

const action = debounceTime(500, 
    takeUntil(3, () =>
        service
            .sumItems('2143')
            .then(console.log)
            .catch(console.log)
    )
);

const operation2 = debounceTime(500, operation1);

document
    .querySelector('#myButton')
    .onclick = action;