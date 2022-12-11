const socket = io()

// function read_cookie(name) {
//  var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
//  result && (result = JSON.parse(result[1]));
//  return result;
// }

// const groupsCookie = read_cookie("groups")




// addEventListener("load", (event) => {
//   socket.emit("groups", 
//    groupsCookie
//   )
//  }, (response) => {
//   console.log(response)
// })

// socket.on("tweets", () => {
 
// })


// Make one cookie
// let groups = { elite: ['Casimiro', 'elonmusk'], eu: ['GueibrisuelReis'], CR7:['CR7Brasil']}
// document.cookie = 'groups=' + JSON.stringify(groups) + '; expires=Thu, 18 Dec 2022 12:00:00 UTC';