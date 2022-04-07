declare global {
    interface String {
        replaceAll(a: string, b: string): string;
        replaceAt(index: number, textToInsert: string): string;
    }
    interface Map<K, V> {
        toArray(): V[];
        toArrayWithKeys(): Array<[key: K, value: V]>;
    }
    interface Array<T> {
        pushAll(arr: T[]): void;
        get first(): T;
        get last(): T;
        removeInPlace(shouldKeep: (value: T, index: number) => boolean): number;
        toMap(indexKey: keyof T): Map<string, T>;
        toSubArrays(subArrayLength: number): Array<T>[];
        random(): T;
    }
}
export declare function HelperTest(): void;
export {};
