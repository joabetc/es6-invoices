if (!Array.prototype.$flatMap) {

    Array.prototype.$flatMap = function(cb) {
        return this.map(cb).reduce((resultArray, array) => 
            resultArray.concat(array), []);
    };
}