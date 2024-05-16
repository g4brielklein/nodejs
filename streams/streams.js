import { Readable, Writable, Transform } from 'node:stream';

class countingStream extends Readable {
  index = 1

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = new Buffer.from(String(i))
        this.push(buf)
      }
    }, 10)
  }
}

class getCountingStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk))
    callback()
  }
}

class addPlusOneStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk) + 1

    callback(null, Buffer.from(String(transformed)))
  }
}

new countingStream()
  .pipe(new addPlusOneStream())
  .pipe(new getCountingStream())
