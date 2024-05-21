import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    url: buildRoutePath('/users'),
    handler: (req, res) => {
      const filters = req.query
      const targetTable = 'users'
      const users = database.select(targetTable, filters)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    url: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body
      const targetTable = 'users'

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert(targetTable, user)
      
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    url: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const data = {
        id: req.params.id,
        name: req.body?.name,
        email: req.body?.email,
      }
      const targetTable = 'users'

      database.update(targetTable, data)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    url: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const targetTable = 'users'

      database.delete(targetTable, id)
      
      return res.writeHead(204).end()
    }
  }
]
