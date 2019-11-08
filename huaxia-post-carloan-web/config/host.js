const os = require('os')

function getHost() {
  let ifaces = os.networkInterfaces(), host = ""
  for (let dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
        host = details.address
      }
    })
  }
  return host
}

module.exports = getHost()
