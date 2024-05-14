import http from 'node:http'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com'
  }
]

const server = http.createServer((req, res) => {
const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  return res.writeHead(404).end()
})

server.listen(3333)
