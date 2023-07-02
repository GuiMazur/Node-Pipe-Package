import { pipe } from "../src/pipes";

const double = (value: number) => value * 2;
const encapsulate = <T>(value: T) => [value, 0];
const stringify = (value: number) => value.toString();

const ret = pipe(2).to(double).to(stringify).to(encapsulate).value;
console.log(ret);
