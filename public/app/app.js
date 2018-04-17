import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);

const action = operations(() =>
    service
        .sumItems('2143')
        .then(console.log)
        .catch(console.log)
);

const operation2 = debounceTime(500, operation1);

document
    .querySelector('#myButton')
    .onclick = action;