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
      return null;
    } else {
      let midpoint = Math.floor(array.length / 2);
      let root = new Node(array[midpoint]);
      root.left = this.buildTree(array.slice(0, midpoint));
      root.right = this.buildTree(array.slice(midpoint + 1));
      return root;
    }
  }

  insert(value) {
    let node = this.root;
    let parentNode;
    while (node != null) {
      // don't add duplicate values
      if (value == node.data) {
        return;
      } else if (value < node.data) {
        // go left
        parentNode = node;
        node = node.left;
        if (node == null) {
          parentNode.left = new Node(value);
        }
      } else {
        // go right
        parentNode = node;
        node = node.right;
        if (node == null) {
          parentNode.right = new Node(value);
        }
      }
    }
  }

  deleteItem(value) {
    let node = this.root;
    let parentNode = null;
    // loop until node == null which means value does not exist
    // or if we find a value, break out of the loop
    while (node != null) {
      if (node.data == value) break;
      else if (value > node.data) {
        parentNode = node;
        node = node.right;
      } else {
        parentNode = node;
        node = node.left;
      }
    }
    if (node != null) {
      if (!node.left && !node.right) {
        // leaf node, 0 children
        if (!parentNode.left) parentNode.right = null;
        else parentNode.left = null;
      } else if ((node.left && !node.right) || (!node.left && node.right)) {
        // 1 child
        if (parentNode.left == node) {
          // target node is on the left
          // if single child node is on the left
          if (node.left) parentNode.left = node.left;
          // if single child node is on the right
          else parentNode.left = node.right;
        } else {
          // target node is on the right
          // if single child node is on the left
          if (node.left) parentNode.right = node.left;
          // if single child node is on the right
          else parentNode.right = node.right;
        }
      } else {
        // 2 children
        /* 
          we will choose the right tree to get the lowest value 
          to replace this node with.
        */
        let replacingNode = node.right;
        let replacingNodeParent;
        // loop until we find the smallest number
        while (replacingNode.left != null) {
          replacingNodeParent = replacingNode;
          replacingNode = replacingNode.left;
        }
        /*
          make the target nodes data equal to the smallest number 
          on the right subtree and remove that smallest number 
        */
        node.data = replacingNode.data;
        replacingNodeParent.left = null;
      }
    } else throw new Error("value not found");
  }

  find(value) {
    let node = this.root;
    while (node != null) {
      if (node.data == value) return node;
      else if (value > node.data) node = node.right;
      else node = node.left;
    }
    return null;
  }

  levelOrder(callback) {
    if (callback == undefined || !(callback instanceof Function))
      throw new Error("callback function is required");
    else {
      let node = this.root;
      let queue = [];
      queue.push(node);
      while (queue.length > 0) {
        callback(queue[0]);
        if (queue[0].left) queue.push(queue[0].left);
        if (queue[0].right) queue.push(queue[0].right);
        queue.shift();
      }
    }
  }

  preOrder(callback) {
    if (callback == undefined || !(callback instanceof Function)) {
      throw new Error("callback function is required");
    } else {
      //nlr
      function traverse(node, callback) {
        if (node == null) {
          return;
        } else {
          callback(node);
          traverse(node.left, callback);
          traverse(node.right, callback);
        }
      }
      traverse(this.root, callback);
    }
  }

  inOrder(callback) {
    if (callback == undefined || !(callback instanceof Function)) {
      throw new Error("callback function is required");
    } else {
      //nlr
      function traverse(node, callback) {
        if (node == null) {
          return;
        } else {
          traverse(node.left, callback);
          callback(node);
          traverse(node.right, callback);
        }
      }
      traverse(this.root, callback);
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
  bst.insert(2);
  prettyPrint(bst.root);
  bst.inOrder((node) => {
    console.log(`node data: ${node.data}`);
  });
  // bst.levelOrder((node) => {
  //   console.log(`node data: ${node.data}`);
  // });
  // let node = bst.find(324);
  // if (node) console.log(`found value: ${node.data}`);
} catch (error) {
  console.log(error.message);
}
