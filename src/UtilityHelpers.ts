declare global {

    interface String {
        replaceAll(a: string, b: string): string;
        replaceAt(index: number, textToInsert: string): string;
    }
    interface Map<K, V> {
        toArray(): V[]
        toArrayWithKeys(): Array<[key: K,value: V]>
    }
    interface Array<T> {
        pushAll(arr: T[]): void;
        get first(): T
        get last(): T
        removeInPlace(shouldKeep: (value: T, index: number) => boolean): number
        toMap(indexKey: keyof T): Map<string, T>
        toSubArrays(subArrayLength: number): Array<T>[]
        random(): T
    }
   

}

export function HelperTest(){}
String.prototype.replaceAt = function (index: number, textToInsert: string) {
    return this.substr(0, index) + textToInsert + this.substr(index + textToInsert.length);
}

Map.prototype.toArray = function <K, V>() {
    if (this == null || (this as Map<K, V>).size == 0) { return [] }
    let out: V[] = [];
    (this as Map<K, V>).forEach((val: V, key: K) => {
        out.push(val);
    })
    return out;
}
Map.prototype.toArrayWithKeys = function <K, V>() {
    let out: Array<[key: K, value: V]> = [];
    (this as Map<K, V>).forEach((val: V, key: K) => {
        out.push([key, val]);
    })
    return out;
}
Array.prototype.random = function <T>() {
    return this[Math.round(Math.random() * (this.length - 1))]
}
Array.prototype.toSubArrays = function <T>(subArrayLength: number): Array<T>[] {
    let out: Array<T>[] = [];
    let current: Array<T> = [];
    for (let i = 0; i < this.length; i++) {
        if (current.length < subArrayLength) {
            current.push(this[i]);
        } else {
            out.push(current);
            current = [this[i]];
        }
    }
    if (current.length > 0) {
        out.push(current);
    }
    return out;
}

Array.prototype.toMap = function <T>(indexKey: keyof T) {
    let out = new Map<string, T>();
    let current;
    for (let i = 0; i < this.length; i++) {
        current = this[i];
        out.set(current[indexKey], current)//; = current;
    }
    return out;
}
Array.prototype.removeInPlace = function <T>(shouldKeep: (value: T, index: number) => boolean) {
    let count = 0;

    for (let i = 0; i < this.length; i++) {
        if (!shouldKeep(this[i], i)) {
            this.splice(i, 1);
            count++;
        }
    }
    return count;
}
Array.prototype.pushAll = function <T>(arr: T[]) {
    if (arr == null || typeof arr == 'undefined') {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
}
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a: string, b: string) {
        return this.split(a).join(b);
    };
}
if (typeof Array.prototype.first == 'undefined') {
    console.log('Shimming array.first')
    Object.defineProperty(Array.prototype, "first", {
        get: function first() {
            return this.length == 0 ? null : this[0]
        }
    })
}
if (typeof Array.prototype.last == 'undefined') {
    console.log('Shimming array.last')
    Object.defineProperty(Array.prototype, "last", {
        get: function last() {
            return this.length == 0 ? null : this[this.length - 1]
        }
    })
}

export {}