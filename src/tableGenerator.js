const md5 = require("md5");
const chainsCount = 2972;
const chainLength = 10;

function reduceFunction(acu, value) {
  if (acu.length === 4) {
    return acu;
  }
  const parsedNum = parseInt(value);
  if (Number.isInteger(parsedNum)) {
    acu.push(parsedNum);
  }
  return acu;
}

function generateChain(pass) {
  let reduced = pass;
  for (let i = 0; i < chainLength; i++) {
    const hash = md5(reduced);
    const hashArray = hash.split("");
    reduced = hashArray.reduce(reduceFunction, []).join("");
  }
  return reduced;
}

function tableGenerator(init) {
  let pass = init;
  const chains = [];
  for (let i = 0; i < chainsCount; i++) {
    let generatedChain = generateChain(pass);
    chains.push([pass, generatedChain]);
    pass = generatedChain;
  }
  return chains;
}

module.exports = { tableGenerator };
