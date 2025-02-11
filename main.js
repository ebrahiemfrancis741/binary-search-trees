import { Tree, prettyPrint } from "./binarySearchTree.js";

function generateRandom() {
  let array = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

try {
  let bst = new Tree(generateRandom());

  if (bst.isBalanced()) {
    console.log("Tree is balanced");
  } else {
    console.log("Tree is not balanced");
  }

  // print node data using different methods
  bst.levelOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.preOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.inOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.postOrder((node) => {
    console.log(`node data: ${node.data}`);
  });

  // add a bunch of random numbers
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    bst.insert(Math.floor(Math.random() * 1000));
  }

  if (bst.isBalanced()) {
    console.log("Tree is balanced");
  } else {
    console.log("Tree is not balanced");
  }

  bst.rebalance();

  if (bst.isBalanced()) {
    console.log("Tree is balanced");
  } else {
    console.log("Tree is not balanced");
  }

  // print node data using different methods
  bst.levelOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.preOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.inOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  bst.postOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
} catch (error) {
  console.log(error.message);
}
