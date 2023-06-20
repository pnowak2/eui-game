export class InMemoryStorage {
  constructor() {
    this.data = {};
  }

  getItem(key) {
    const value = this.data[key];
    return value !== undefined ? JSON.parse(value) : null;
  }

  setItem(key, value) {
    this.data[key] = JSON.stringify(value);
  }

  removeItem(key) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
}

