const socket = io()
const toggleGroup = document.querySelectorAll(".up")
const deleteUser = document.querySelectorAll(".delete")

toggleGroup.forEach((group)=>{
 group.addEventListener("click", ()=> {
  group.parentElement.children[1].toggleAttribute("hidden")
 })
})

addEventListener("submit", (form)=> {
 const username = form.path[0].children[1].value
 const groupName = form.path[3].children[0].children[0].children[0].textContent
 const groupUsers = JSON.parse(Cookies.get('groups'))

 if(groupUsers[groupName].indexOf(username) == -1) {
  socket.emit('user', [
   username
  ], (callback)=> {
   if(callback[0]) {
    addUserOnCookie(groupName, username, groupUsers)
    addUserOnContent(callback[0], form)
   }
  })
 }
 form.path[0].reset()
})

deleteUser.forEach((deleteItem)=>{
 deleteItem.addEventListener("click", ()=> {
  const allElement = deleteItem.closest(".all")
  const userElement = deleteItem.closest(".user")
  const groupName = allElement.querySelector(".group-name").textContent
  const username = userElement.querySelector(".arroba").textContent.slice(1)

  deleteUserOfCookie(groupName, username)

  deleteItem.parentElement.remove()
 })
})

function addUserOnCookie(group, user, groupUsers) {
 groupUsers[group].unshift(user)

 Cookies.set("groups", JSON.stringify(groupUsers))
}

function addUserOnContent(info, form) {
 form.path[1].children[1].insertAdjacentHTML('afterBegin' ,`
 <li class="user">
  <img class="profile-picture" src="${info.profile_image_url}">
  <dev class="user-text">
   <span class="name">${info.name}</span>
   <span class="arroba">@${info.username}</span>
  </dev>
  <div class="delete"></div>
 </li>
 `)
}

function deleteUserOfCookie(group, user) {
 const groupUsers = JSON.parse(Cookies.get('groups'))

 groupUsers[group] = groupUsers[group].filter((name) => name != user )

 Cookies.set("groups", JSON.stringify(groupUsers))
}