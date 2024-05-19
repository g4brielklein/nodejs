import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => route.method === method && route.url.test(url))

  if (!route) {
    return res.writeHead(404).end()
  }

  req.params = JSON.parse(JSON.stringify(req.url.match(route.url).groups))

  console.log(req.params)

  return route.handler(req, res)
})

server.listen(3333)
