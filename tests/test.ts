import { pipe } from "../src/pipes";

console.log(pipe(2).to(($) => $ * 4 + 3).value);
