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
    .then(() => {
      console.log('File writen successfully')
    })
    .catch(err => {
      console.log('Error writing file', err)
    })
  }
  
  select(table) {
    return this.#database[table] ?? []
  }
  
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    
    this.#saveOnFile()
  }

  delete(table, id) {
    const userToDelete = this.#database[table].find(user => user.id === id)
    const userToDeleteIndex = this.#database.users.indexOf(userToDelete)

    this.#database.users.splice(userToDeleteIndex, 1)

    this.#saveOnFile()
  }
}
