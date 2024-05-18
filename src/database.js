export class Database {
  #database = {}

  select(table) {
    return this.#database[table] ?? []
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      return this.#database[table].push(data)
    }

    this.#database[table] = [data]
  }
}
