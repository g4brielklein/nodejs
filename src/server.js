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
      .end(JSON.stringify(users))
  }

  return res.end()
})

server.listen(3333)
