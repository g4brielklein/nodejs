import http from 'node:http'
import { Transform } from 'node:stream'

class CreateUniqueNameBasedOnId extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = `item-${Number(chunk)}-identifier`
    console.log(transformed)

    callback(null, Buffer.from(transformed))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }
  
  const fullStreamContent = Buffer.concat(buffers).toString()

  return res.end(fullStreamContent)
})

server.listen(3333)
