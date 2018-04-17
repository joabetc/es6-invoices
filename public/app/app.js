import { log, timeoutPromise, delay } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);

const action = operations(() =>
    timeoutPromise(200, service.sumItems('2143'))
        .then(delay(5000))
        .then(console.log)
        .catch(console.log)
);

document
    .querySelector('#myButton')
    .onclick = action;