import React from 'react';

export default function LinkedLis() {
  return <div></div>;
}

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  insetAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error('range out');
    }

    let newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    this.count++;
  }

  insertLast(data) {
    this.insetAt(this.count, data);
  }

  getNodeAt(index) {
    if (index < 0) {
      console.error("can't be less than zero");
      return;
    }
    if (index >= this.count) {
      console.error(`can't be greater than or equal to ${this.count}`);
      return;
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  deleteAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error('index unknwon');
    }
    let currentNode = this.head;
    if (index === 0) {
      const deleteNode = currentNode;
      this.head = currentNode.next;
      this.count--;
      return deleteNode;
    } else {
      let deleteNode = null;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      deleteNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      this.count--;
      return deleteNode.data;
    }
  }
  deleteLast() {
    if (this.count === 0) {
      console.warn('not data');
      return;
    }
    this.deleteAt(this.count - 1);
  }

  printAll() {
    let currentNode = this.head;
    let text = '[';

    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode !== null) {
        text += ', ';
      }
    }
    text += ']';
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }
}

const linkedList = new LinkedList();

linkedList.insetAt(0, 0);
linkedList.insetAt(1, 1);
linkedList.insetAt(2, 2);
linkedList.insetAt(3, 3);
linkedList.insetAt(4, 4);

console.log(linkedList.getNodeAt(2));
linkedList.printAll();
