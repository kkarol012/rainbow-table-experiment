const md5 = require("md5");
const { Reducer } = require("./Reducer");
const chainsCount = 3685;
const chainLength = 8;

function getReduceFunction(i) {
  const reducer = new Reducer();
  reducer.isReversed = i % 2 === 1;
  reducer.getFromEnd = i >= 2 && i <= 5;
  reducer.isSplitGet = i >= 4;
  return reducer.generateFunction();
}

function generateChain(pass) {
  let reduced = pass;
  for (let i = 0; i < chainLength; i++) {
    const hash = md5(reduced);
    let hashArray = hash.split("");
    reduced = getReduceFunction(i)(hashArray);
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

module.exports = { tableGenerator, getReduceFunction, chainLength };
