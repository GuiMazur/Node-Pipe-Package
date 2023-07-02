import { pipe } from "../src/pipes.js";

console.log(pipe(2).to(($) => $ * 4 + 3).value);
