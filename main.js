'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi;
  // * each key is an array of Numbers:
    // * A is the far-left,
    // * B is the middle,
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens:
        // * 4 is the largest,
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // get last item index
  let startStackLastItem = stacks[startStack].length -1;
  // assign piece
  let piece = stacks[startStack][startStackLastItem];
  // remove last piece from start stack
  stacks[startStack].pop();
  // add piece to end stack
  stacks[endStack].push(piece);
}


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  if (startStack != "a" && startStack != "b" && startStack != "c" || endStack != "a" && endStack != "b" && endStack != "c") {
    // If start stack or end stack are different from options a, b or c
    return false;
  } else if (stacks[startStack].length == 0 && stacks[endStack].length == 0) {
    // If both stacks are empty, movement is not valid
    return false;
  } else if (stacks[startStack].length == 0 && stacks[endStack].length > 0) {
    // If start stack is empty and end stack is not empty, movement is not valid
    return false;
  } else if (stacks[startStack].length > 0 && stacks[endStack].length == 0) {
    // If sratr stack is not empty and end stack is empty, movement is valid
    return true;
  }
 
  // Declare variables for last item of each stack
  let startStackLastItem = stacks[startStack].length -1;
  let endStackLastItem = stacks[endStack].length -1;

  // Check if start stack last item is smaller than end stack last item
  if (stacks[startStack][startStackLastItem] < stacks[endStack][endStackLastItem]) {
    return true;
  } else {
    return false;
  }

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // if stack b or c are complete
  if (stacks.b[0] == 4 && stacks.b[1] == 3 && stacks.b[2] == 2 && stacks.b[3] == 1) {
    return true;
  } else if (stacks.c[0] == 4 && stacks.c[1] == 3 && stacks.c[2] == 2 && stacks.c[3] == 1) {
    return true;
  } else {
    return false;
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    console.log("movement is legal")
    movePiece(startStack, endStack)
    if (checkForWin() == true) {
      return true;
    }
  } else {
    console.log("Movement is not legal")
  }
  return false;
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      if (towersOfHanoi(startStack, endStack) == true) {
        console.log("game over, you won")
      } else {
        getPrompt();
      }
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });

    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
    });
  });

} else {

  getPrompt();

}

