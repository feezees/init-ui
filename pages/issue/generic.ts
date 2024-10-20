type BarType<T extends number | string> = T extends number ? 'number' : 'string';

function bar(a:number|string):BarType<number|string> {
    return typeof a === 'number' ? 'number' : 'string';
}

type ExampleType = BarType<number>; // 'number'
type AnotherExampleType = BarType<string>; // 'string'
