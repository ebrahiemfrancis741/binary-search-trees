import { mergeSort } from "./mergeSort.js";

class Node {
  #data;
  #left;
  #right;

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  get left() {
    return this.#left;
  }

  set left(left) {
    this.#left = left;
  }

  get right() {
    return this.#right;
  }

  set right(right) {
    this.#right = right;
  }

  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  #root;

  get root() {
    return this.#root;
  }

  set root(root) {
    this.#root = root;
  }

  constructor(array) {
    if (array == undefined) {
      throw new Error("Array undefined");
    }
    array = mergeSort(array);
    // put elements in a set to remove duplicates
    array = [...new Set(array)];
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length == 1) {
      return new Node(array[0]);
    } else if (array.length == 0) {
      return new Node(null);
    } else {
      let midpoint = Math.floor(array.length / 2);
      let root = new Node(array[midpoint]);
      root.left = this.buildTree(array.slice(0, midpoint));
      root.right = this.buildTree(array.slice(midpoint + 1));
      return root;
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

try {
  let bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  prettyPrint(bst.root);
} catch (error) {
  console.log(error.message);
}