import http from 'node:http'
import { Transform } from 'node:stream'

class getFakeUploadStream extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(String(chunk))
    callback(null, Buffer.from(String(chunk)))
  }
}

const server = http.createServer((req, res) => {
  return req
    .pipe(new getFakeUploadStream())
    .pipe(res)
})

server.listen(3333)
