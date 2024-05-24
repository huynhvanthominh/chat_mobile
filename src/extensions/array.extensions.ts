declare global {
    interface Array<T> {
        unique(): Array<T>;
        isEmpty(): boolean;
    }
}
Array.prototype.unique = function () {
    return [...new Set(this)];
}
Array.prototype.isEmpty = function () {
    return this.length === 0;
}
export { 
    
};