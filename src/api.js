import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3002')


function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp))
    socket.emit('subscribeToTimer', 1000)
}

function emitLogin(loginData) {
    socket.emit('emitLogin', loginData)
}

export { subscribeToTimer, emitLogin }
