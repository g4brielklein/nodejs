import { Readable } from 'node:stream'

class fakeUploadStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        this.push(Buffer.from(String(i)))
      }
    }, 10)
  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new fakeUploadStream(),
  duplex: 'half',
})
