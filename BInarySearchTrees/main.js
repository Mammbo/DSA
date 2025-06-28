function getRandomArray(length, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

// Print utility using a traversal
function printTraversal(name, traversalFn) {
  const result = [];
  traversalFn((value) => result.push(value));
  console.log(`${name}:`, result.join(', '));
}

// Main driver
function main() {
  const Tree = require('./logic'); // Adjust path if needed
  const tree = new Tree(getRandomArray(15));

  console.log("Initial Tree:");
    tree.prettyPrint(tree.root)
  console.log("Balanced?", tree.isBalanced());

  printTraversal("Level Order", tree.levelOrderIteration.bind(tree));
  printTraversal("Pre Order", tree.preOrderIteration.bind(tree));
  printTraversal("Post Order", tree.postOrder.bind(tree));
  printTraversal("In Order", tree.inOrderRecursion.bind(tree));

  // Unbalance the tree by adding big numbers
  [101, 150, 120, 130, 200, 180].forEach(num => tree.insert(num));

  console.log("\nAfter Inserting Large Numbers:");
    tree.prettyPrint(tree.root)
  console.log("Balanced?", tree.isBalanced());

  // Rebalance the tree
  tree.rebalance();

  console.log("\nAfter Rebalancing:");
    tree.prettyPrint(tree.root)
  console.log("Balanced?", tree.isBalanced());

  printTraversal("Level Order", tree.levelOrderIteration.bind(tree));
  printTraversal("Pre Order", tree.preOrderIteration.bind(tree));
  printTraversal("Post Order", tree.postOrder.bind(tree));
  printTraversal("In Order", tree.inOrderRecursion.bind(tree));
}

main();
