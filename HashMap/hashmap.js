class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}
class HashMap {
  constructor(loadFactor = 0.75, capcity = 16) {
    this.loadfactor = loadFactor;
    this.table = new Array(capcity).fill(null);
    this.capcity = capcity;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capcity;
    }
    return hashCode;
  }

  resize() {
    const oldTable = this.table;
    this.capcity *= 2;
    this.table = new Array(this.capacity).fill(null);
    this.size = 0; // reset size and re-increment as we re-add
    
    for (let bucket of oldTable) {
      let current = bucket;
      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  set(key, value) {
    const index = this.hash(key);
    const headBucket = this.table[index];

    let current = headBucket;
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    const newNode = new Node(key, value, headBucket);
    this.table[index] = newNode;
    this.size++;

    if (this.size / this.capcity > this.loadfactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    let currentBucket = this.table[index];

    while (currentBucket) {
      if (currentBucket.key === key) return currentBucket.value;
      currentBucket = currentBucket.next;
    }

    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.table[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev === null) {
          this.table[index] = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.table = new Array(this.capcity).fill(null);
    this.size = 0;
  }

  keys() {
    const keys = []
    for (let bucket of this.table) {
        let current = bucket
        while ( current ) {
          keys.push(current.key) 
          current = current.next
        }
    }
    return keys
  }

  values() {
    const values = []
    for (let bucket of this.table) {
        let current = bucket
        while ( current ) {
          values.push(current.value) 
          current = current.next
        }
    }
    return values
  }

  entries() {
    const all = []
    for (let bucket of this.table) {
        let current = bucket
        while ( current ) {
          all.push([current.key, current.value]) 
          current = current.next
        }
    }
    return all
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("god", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.length());
console.log(test.get("lion"));
console.log(test.has("lion"));
console.log(test.remove("lion"));
console.log(test.remove("lion"));
console.log(test.length());
console.log(test.clear());
console.log(test.length());
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.keys());
test.set("lion", "not golden");
test.set("kite", "not pink");
test.set("fortnite", "bad");
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.length());
