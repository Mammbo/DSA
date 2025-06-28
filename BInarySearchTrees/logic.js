class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  removeDuplicates(array) {
    const seen = new Set();
    const result = [];

    for (let num of array) {
      if (!seen.has(num)) {
        seen.add(num);
        result.push(num);
      }
    }
    return result;
  }

  mergeSort(array) {
    if (array.length <= 1) return array;
    else {
      let middle = Math.floor(array.length / 2);
      let left = this.mergeSort(array.slice(0, middle));
      let right = this.mergeSort(array.slice(middle));

      const result = [];
      let i = 0,
        j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return result.concat(left.slice(i)).concat(right.slice(j));
    }
  }

  buildTree(arr) {
    // remove duplicates
    let arrayNoDups = this.removeDuplicates(arr);
    // sorting function using merge sort
    let array = this.mergeSort(arrayNoDups);

    let nodes = array.length;

    // edge case, in case the input array is empty
    if (nodes === 0) return null;

    // Create the root node
    // find the middle index
    let mid = Math.floor((nodes - 1) / 2);
    // set that as the root
    let root = new Node(array[mid]);

    // initialize a queue to simulate recursion
    let queue = [{ node: root, range: [0, nodes - 1] }];
    let frontIndex = 0;

    // loop over the queue like BFS
    while (frontIndex < queue.length) {
      let front = queue[frontIndex];
      let curr = front.node;
      let [startIndex, endIndex] = front.range;
      //this is the middle index for the current range (s to e, its where curr node got its value)
      let index = startIndex + Math.floor((endIndex - startIndex) / 2);

      // If left subtree exists
      if (startIndex < index) {
        let midLeft = startIndex + Math.floor((index - 1 - startIndex) / 2);
        let left = new Node(array[midLeft]);
        curr.left = left;
        // addes this node to the queue so it can later be processed along with its children
        queue.push({ node: left, range: [startIndex, index - 1] });
      }

      // If right subtree exists
      if (endIndex > index) {
        let midRight = index + 1 + Math.floor((endIndex - index - 1) / 2);
        let right = new Node(array[midRight]);
        curr.right = right;
        queue.push({ node: right, range: [index + 1, endIndex] });
      }

      frontIndex++;
    }

    return root;
  }

  insert(value) {
    this.root = this._insertRecursively(this.root, value);
  }

  _insertRecursively(node, value) {
    if (node === null) return new Node(value);
    if (value === node.data) return node;
    if (value < node.data) {
      node.left = this._insertRecursively(node.left, value);
    } else {
      node.right = this._insertRecursively(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    function getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }

    function deleteNode(root, value) {
      if (root === null) return root;

      if (root.data > value) {
        root.left = deleteNode(root.left, value);
      } else if (root.data < value) {
        root.right = deleteNode(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }

        let successor = getSuccessor(root);
        root.data = successor.data;
        root.right = deleteNode(root.right, successor.data);
      }
      return root;
    }

    deleteNode(this.root, value);
  }

  find(value) {
    function findNode(root, value) {
      if (root === null) return root;

      if (root.data > value) {
        return findNode(root.left, value);
      } else if (root.data < value) {
        return findNode(root.right, value);
      } else {
        return root;
      }
    }

    return findNode(this.root, value);
  }

  levelOrderIteration(callback) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }

    try {
      if (this.root === null) return;
      let queue = [this.root];

      while (queue.length > 0) {
        let current = queue.shift();

        if (callback) callback(current.data);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    } catch (e) {
      console.error(e);
    }
  }

  levelOrderRecursion(callback, queue = [this.root]) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }

    try {
      if (this.root === null) return;

      let current = queue.shift();
      if (!current) return;

      callback(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      this.levelOrderRecursion(callback, queue);
    } catch (e) {
      console.log(e);
    }
  }

  inOrderIteration(callback) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }
    try {
      if (!this.root) return [];

      const stack = [];
      let current = this.root;

      while (current || stack.length) {
        while (current !== null) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        if (callback) callback(current.data);
        current = current.right;
      }
    } catch (e) {
      console.log(e);
    }
  }

  inOrderRecursion(callback) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }
    try {
      function traverse(node) {
        if (node === null) return;

        traverse(node.left);
        if (callback) callback(node.data);
        traverse(node.right);
      }
      traverse(this.root);
    } catch (e) {
      console.log(e);
    }
  }

  preOrderIteration(callback) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }
    try {
      if (!this.root) return [];

      let stack = [this.root];

      while (stack.length) {
        let node = stack.pop();
        if (node !== null) {
          if (callback) callback(node.data);

          if (node.right) stack.push(node.right);
          if (node.left) stack.push(node.left);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("No callback Provided!");
    }
    try {
      if (!this.root) return [];
      const stack = [];
      let current = this.root;
      let lastVisted = null;

      while (stack.length || current) {
        if (current !== null) {
          stack.push(current);
          current = current.left;
        } else {
          const peekNode = stack[stack.length - 1];
          if (peekNode.right !== null && lastVisted !== peekNode.right) {
            current = peekNode.right;
          } else {
            callback(peekNode.data);
            lastVisted = stack.pop();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  height(value) {
    const node = this.find(value);
    if (!node) return -1;

    function getHeight(n) {
      if (!n) return -1;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    }
    return getHeight(node);
  }

  depth(value) {
    let current = this.root;
    let depth = 0;

    while (current !== null) {
      if (value === current.data) return depth;
      current = value < current.data ? current.left : current.right;
      depth++;
    }

    return -1; // not found
  }

  isBalanced() {
    function check(node) {
      if (!node) return [true, -1];

      const [leftBalanced, leftHeight] = check(node.left);
      const [rightBalanced, rightHeight] = check(node.right);

      const balanced =
        leftBalanced &&
        rightBalanced &&
        Math.abs(leftHeight - rightHeight) <= 1;

      return [balanced, 1 + Math.max(leftHeight, rightHeight)];
    }

    return check(this.root)[0];
  }

  rebalance() {
    let values1 = []; 
    this.inOrderRecursion((data) => values1.push(data))
    let values = this.mergeSort(values1)
    this.root=this.buildTree(values)
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
    return;
  }
  if (node.right !== null) {
    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
  }
}
module.exports = Tree; 

