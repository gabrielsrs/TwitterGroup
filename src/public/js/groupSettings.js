const socket = io()

function getUserInfo(){
 socket.emit('user', [
  'casemiro',
  'CR7Brasil'
 ])
}

// getUserInfo()