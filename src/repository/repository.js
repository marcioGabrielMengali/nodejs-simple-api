import fs from "node:fs/promises";

export class Repository {
  #filePath = new URL("../db/db.json", import.meta.url);
  #database = {};

  constructor() {
    fs.readFile(this.#filePath, "utf-8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(this.#filePath, JSON.stringify(this.#database));
  }

  select(table, sort) {
    const data = this.#database[table] ?? [];
    if(sort && data.length > 0){
      data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      return data
    }
    
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data){
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if(rowIndex > -1){
      this.#database[table][rowIndex] = {id, ...data};
      this.#persist()
    }
  }
}
