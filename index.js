console.log("start");
const { tableGenerator } = require("./src/tableGenerator");
fs = require("fs");

var hrstart = process.hrtime();
const vector = [0000, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999];

const tables = vector.map((init) => tableGenerator(init));
hrend = process.hrtime(hrstart);

console.log(`performance: ${hrend[1] / 1000000}ms`);
tables.forEach((el, key) => {
  const preparedArray = el.map((chain) => chain.join(" | "));
  const preparedString = preparedArray.join("\n");
  fs.writeFile(`table-${key + 1}`, preparedString, (err) => console.log(err));
});
console.log("end");
