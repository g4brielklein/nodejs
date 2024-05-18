import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    users.push(user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
