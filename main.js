'use strict';

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  push(data) {
    const obj = {data};
    obj.next = null;

    if (this.first === null) {
      this.first = obj;
      this.last = obj;
      this.length++;
    } else {
      obj.prev = this.last;
      this.last.next = obj;
      this.last = obj;
      this.length++;
    }
  }

  pop() {
    if (this.last === null) return null;
    if (this.last.prev === null) {
      this.first = null;
      this.last = null;
      this.length--;
    } else {
      this.last.prev.next = null;
      this.last = this.last.prev;
      this.length--;
    }
  }

  unshift(data) {
    const obj = {data};
    this.length++;
    obj.next = null;

    if (this.first === null) {
      this.first = obj;
      this.last = obj;
    }else {
      this.first.prev = obj;
      obj.next = this.first;
      this.first = obj;
    }
  }

  shift() {
    if (this.first === null) return null;
    else {
      this.first.next.prev = null;
      this.first = this.first.next;
      this.length--;
    }
  }

  insert(index, data) {
    if (index >= this.length) {
      this.push(data);
      return;
    } else if (index <= 0) {
      this.unshift(data);
      return;
    }
    
    let elem = this.first;
    for (let i = 0; i < index; i++) {
      elem = elem.next;
    }

    const obj = {data};
    obj.prev = elem.prev;
    obj.next = elem;
    elem.prev.next = obj;
    elem.prev = obj;
    this.length++;
  }

  delete(index) {
    if (index >= this.length || index < 0) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let elem = this.first;
    for (let i = 0; i < index; i++) {
      elem = elem.next
    }

    elem.prev.next = elem.next;
    elem.next.prev = elem.prev;
    this.length--;
  }

  append(...params) {
    for (let i = 0; i < params.length; i++) {
      this.push(params[i]);
    }
  }

  prepend(...params) {
    for (let i = params.length - 1; i >= 0; i--) {
      this.unshift(params[i]);
    }
  }

  clone() {
    return Array.from(this);
  }

  compare(arr) {
    if (arr.length !== this.length) return false;
    let i = 0;
    for (const elem of this) {
      if (elem === arr[i]) {
        i++;
        continue;
      };
      return false
    }
    return true;
  }

  indexOf(data) {
    let index = 0;
    for (let elemData of this) {
      if (elemData === data) return index;
      index++;
    }
    return null;
  }

  includes(data) {
    for (let elemData of this) {
      if (elemData === data) return true;
    }
    return false;
  }

  find(expression) {
    if (typeof expression !== 'function') return null;
    for (const elem of this) {
      if (expression(elem)) return elem;
    }
    return null;
  }

  filter(expression) {
    if (typeof expression !== 'function') return null;
    const arr = [];
    for (const elem of this) {
      if (expression(elem)) arr.push(elem);
    }
    return arr;
  }

  map(func) {
    if (typeof func !== 'function') return null;
    const arr = [];
    for (const elem of this) {
      arr.push(func(elem));
    }
    return arr;
  }

  [Symbol.iterator]() {
    this.curent = this.first;
    return {
      next: () => {
        if (this.curent === null) {
          return {done: true}; 
        }else {
          const res = {value: this.curent.data, done: false};
          this.curent = this.curent.next;
          return res;
        }
      }
    }
  }
}
