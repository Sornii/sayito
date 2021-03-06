/** global: localStorage */

class ThreadPasswords {
  constructor() {
    if (!localStorage.threads) {
      this._threads = {};
    } else {
      this.loadFromStorage();
    }
  }

  savePassword(thread, password) {
    this._threads[thread] = password;
    this.saveToStorage();
  }

  retrievePassword(thread) {
    return this._threads[thread];
  }

  retrieveAllPasswords() {
    return this._threads;
  }

  deleteThread(thread) {
    delete this._threads[thread];
  }

  loadFromStorage() {
    this._threads = JSON.parse(localStorage.threads);
  }

  saveToStorage() {
    localStorage.threads = JSON.stringify(this._threads);
  }
}

export default new ThreadPasswords();
