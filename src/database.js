import fs from 'node:fs/promises'
const filePath = new URL('data.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(filePath)
      .then(file => {
        this.#database = JSON.parse(file)
      })
      .catch(() => {
        this.#saveOnFile()
      })
  }

  #saveOnFile() {
    fs.writeFile(filePath, JSON.stringify(this.#database, null, 2))
    .catch(err => {
      console.log('Error writing file', err)
    })
  }

  select(table, searchOptions) {
    if (!this.#database[table]) return []

    if (searchOptions) {
      return this.#database[table].filter(item => {
        return Object.entries(searchOptions).some(([key, value]) => item[key].toLowerCase().includes(value.toLowerCase()))
      })
    }
  
    return this.#database[table]
  }
  
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    
    this.#saveOnFile()
  }

  update(table, data) {
    const { id, name, email } = data

    const itemIndex = this.#database[table].findIndex(item => item.id === id)

    if (itemIndex > -1) {
      if (name) {
        this.#database[table][itemIndex].name = name
      }

      if (email) {
        this.#database[table][itemIndex].email = email
      }

      if (name || email) {
        this.#saveOnFile()
      }
    }
  }

  delete(table, id) {
    const itemIndex = this.#database[table].findIndex(item => item.id === id)
    
    if (itemIndex > -1) {
      this.#database[table].splice(itemIndex, 1)
      this.#saveOnFile()
    }
  }
}
