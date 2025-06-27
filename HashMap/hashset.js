class Node {
  constructor(key, next = null) {
    this.key = key;
    this.next = next;
  }
}

class HashSet {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.table = new Array(capacity).fill(null);
    this.capacity = capacity;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  resize() { 
    const oldTable = this.table; 
    this.capacity *= 2; 
    this.table = new Array(this.capacity).fill(null);
    this.size = 0; 

    for ( let bucket of oldTable) {
        let current = bucket; 
        while ( current ){
            this.set(current.key);
            current = current.next
        }
    }
  }

  set(key) { 
    const index = this.hash(key)
    const headBucket = this.table[index]

    let current = headBucket;

    while (current) {
        if ( current.key === key) {
            current.key = key; 
            return
        }
        current = current.next
    }

    const newNode = new Node(key, headBucket);
    this.table[index] = newNode;
    this.size++

    if ( this.size / this.capacity > this.loadFactor) this.resize();
  }

  get(key) {
    const index = this.hash(key)
    let currentBucket = this.table[index]

    while ( currentBucket )  {
        if(currentBucket.key === key) return currentBucket.key
        currentBucket = currentBucket.next;
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined
  }

  remove(key) {
    const index = this.hash(key)
    let current = this.table[index]
    let prev = null;

    while ( current ) {
         if (current.key === key) {
            if (prev === null ){
                this.table[index] = current.next
            } else { 
                prev.next = current.next; 
            }
            this.size--
            return true;
        }
        prev = current 
        current = current.next
    }
    return false
  }

  length() {
    return this.size;
  }

  clear() { 
    this.table = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() { 
    const keys = []
    for ( let bucket of this.table) {
        let current = bucket;
        while (current) {
            keys.push([current.key])
            current = current.next
        } 
    }
    return keys
  }
}


const test = new HashSet();
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("god");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
console.log(test.length());
console.log(test.get("lion"));
console.log(test.has("lion"));
console.log(test.remove("lion"));
console.log(test.remove("lion"));
console.log(test.length());
console.log(test.clear());
console.log(test.length());
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("god");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
console.log(test.get("lion"));
test.set("not lion")
console.log(test.keys());
console.log(test.length());
