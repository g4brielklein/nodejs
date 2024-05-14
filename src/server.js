import http from 'node:http'
import { randomUUID } from 'node:crypto'

const users = []

const server = http.createServer((req, res) => {
const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const user = {
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
    }

    users.push(user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
