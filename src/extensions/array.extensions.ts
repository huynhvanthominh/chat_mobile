declare global {
    interface Array<T> {
        unique(): Array<T>;
        isEmpty(): boolean;
        // addUnique(item: T, key: string): Array<T>;
        addUnique(items: Array<T>, key: string): Array<T>;
    }
}
Array.prototype.unique = function () {
    return this.filter((value, index, self) => self.indexOf(value) === index);
}
Array.prototype.isEmpty = function () {
    return this.length === 0;
}

// Array.prototype.addUnique = function (item, key) {
//     if (this.find((value) => value[key] === item[key])) {
//         return this;
//     }
//     return [...this, item];
// }

Array.prototype.addUnique = function (items: Array<any>, key: string): Array<any> {
    return items.reduce((acc: Array<any>, item) => {
        if (acc.find((value) => value[key] === item[key])) {
            return acc;
        }
        return [...acc, item];
    }, this);
}

export {

};