import { Readable } from 'node:stream'

class SendIdsStream extends Readable {
  idIndex = 1

  _read() {
    const index = this.idIndex++;
    
    setTimeout(() => {
      if (index > 100) {
        this.push(null)
      } else {
        this.push(Buffer.from(String(index)))
      }
    }, 10)
  }  
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new SendIdsStream(),
  duplex: 'half',
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})
