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

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
        this.#database[table].push(data)
    }else{
        this.#database[table] = [data]
    }
    this.#persist()
  }
}