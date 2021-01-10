const {
  tableGenerator,
  getReduceFunction,
  chainLength,
} = require("./src/tableGenerator");
const fs = require("fs");
const md5 = require("md5");


var hrstart = process.hrtime();
const vector = [
  "0000",
  "1111",
  "2222",
  "3333",
  "4444",
  "5555",
  "6666",
  "7777",
  "8888",
  "9999",
];

const tables = vector.map((init) => tableGenerator(init));
hrend = process.hrtime(hrstart);

tables.forEach((el, key) => {
  const preparedArray = el.map((chain) => chain.join(" | "));
  const preparedString = preparedArray.join("\n");
  fs.writeFile(`table-${key + 1}`, preparedString, (err) => console.log(err));
});

let testHash = md5("3922");
let reduction = getReduceFunction(0)(testHash.split(""));
let found = "";
for (i = 1; i <= chainLength; i++) {
  if (found) {
    continue;
  }
  tables.forEach((table, id) => {
    if (found) {
      return;
    }
    found = table.find((arr) => arr[1] == reduction);
  });
  if (found) {
    continue;
  }
  const hash = md5(reduction);
  let hashArray = hash.split("");
  reduction = getReduceFunction(i)(hashArray);
}

console.log("found:", found);
if (found === undefined) {
  console.log("nie udało się złamać");
  return;
}

let testPass = found[0];
for (i = 0; i <= chainLength; i++) {
  const hash = md5(testPass);
  if (hash === testHash) {
    console.log("wartość to:", testPass);
    return;
  } else {
    testPass = getReduceFunction(i)(hash.split(""));
  }
}

console.log("nie udało się złamać");
