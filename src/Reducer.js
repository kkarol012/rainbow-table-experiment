class Reducer {
  isReversed = false;
  getFromEnd = false;
  isSplitGet = false;

  reducer(acu, value) {
    if (acu.length === 4) {
      return acu;
    }
    const parsedNum = parseInt(value);
    if (Number.isInteger(parsedNum)) {
      acu.push(parsedNum);
    }
    return acu;
  }

  updateIndex(i, isReversed = false) {
    if (this.getFromEnd) {
      i += isReversed ? 1 : -1;
    } else {
      i += isReversed ? -1 : 1;
    }
    return i;
  }

  generateFunction() {
    return (hashArray) => {
      let reduced = [];
      let i = this.getFromEnd ? hashArray.length - 1 : 0;
      while (reduced.length !== 4 || i < 0 || i >= hashArray.length) {
        const parsedNum = parseInt(hashArray[i]);
        if (Number.isInteger(parsedNum)) {
          reduced.push(parsedNum);
          if (this.isSplitGet && reduced.length === 2) {
            if (this.getFromEnd) {
              i = 0;
            } else {
              i = hashArray.length - 1;
            }
            continue;
          }
        }

        if (this.isSplitGet && reduced.length >= 2) {
          i = this.updateIndex(i, true);
        } else {
          i = this.updateIndex(i);
        }
      }

      if (this.isReversed) {
        reduced = reduced.reverse();
      }
      return reduced.join("");
    };
  }
}
module.exports = { Reducer };
