class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  append(value) {
    const newNode = Node(value)
    if (!this.head){
        this.head = newNode;
        this.tail = newNode
    } else { 
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  prepend(value) {
    const newNode = Node(value, this.head)
    this.head = newNode; 

    if (!this.tail) {
      this.tail = this.head;
    }
    this.length++
  }

  size() {
    return this.length
  }

  getHead() {
    return this.head
  }

  getTail() {
    return this.tail
  }

  at(index) {
    if (index > this.length - 1) return undefined;
    let current = this.head;
    for (index; index > 0; index--) {
        current = current.next
    }
    return current
  }

  pop() {
    if (!this.head) return null;
    let current = this.head; 
    let newTail = current; 
    while (current.next){
      newTail = current; 
      current = current.next; 
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0){
      this.head = null
      this.tail = null
    }
    return newTail
  }

  contains(value) {
    let current = this.head;
    while (current){
        if (current.value === value){
            return true 
        }
        current = current.next
    }
    return false
  }

  find(value) {
    let current = this.head;
    let index = 0
    while (current){
        if (current.value === value){
            return index
        }
        current = current.next
        index++
    }
    return null
  }

  toString() {
    let result = "";
    let current = this.head; 
    
    while (current) {
        if (current === this.head) {
            result += `(HEAD - ${current.value}) -> `
            current = current.next
        } else if (current === this.tail){
            result += `(TAIL - ${current.value}) -> `
            current = current.next
        } else { 
            result += `(${current.value}) -> `;
            current = current.next
        }
    }
    result += "null"
    return result
  }
  // When you insert or remove a node, consider how it will affect the existing nodes. Some of the nodes will need their nextNode link updated.
  insertAt(value, index) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return this.append(value);
    if (index === 0) return this.prepend(value)
    let newNode = Node(value);
    let prev = this.at(index - 1);
    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++ 
  }

  removeAt(index) {
    if (index < 0 || index > this.length - 1) return false;
    if (index === this.length - 1) return this.pop()
    if (index === 0) {
      let removed = this.head
      this.head = this.head.next
      this.length--
      return removed
    }

    let prev = this.at(index - 1);
    let removed = prev.next 
    prev.next = removed.next
    this.length--;
    return removed
  }
}
// A node only knows about what data it contains, and who its neighbor is.
function Node( value = null, next = null ) {
  return {
    value,
    next,
  };
}
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");


list.prepend("hamster");
list.prepend("snake");
list.append("turtle");

console.log(list.size())
//console.log(list.getHead())
//console.log(list.getTail())

console.log(list.at(4))
console.log(list.pop())
console.log(list.contains("dog"))
console.log(list.find("dog"))
console.log(list.insertAt("axolotl", 3))
console.log(list.removeAt(3))
console.log(list.removeAt(3))
console.log(list.toString())



