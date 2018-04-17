import { handleStatus, log } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { invoiceService as service } from './invoice/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';

const p1 = new Promise((resolve, reject) => 
    setTimeout(() => resolve('Promise 1 finished'), 2000));

const p2 = new Promise((resolve, reject) => 
    setTimeout(() => reject('Promise 2 canceled'), 1000));

Promise.race([p1, p2])
    .then(console.log)
    .catch(console.log);

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