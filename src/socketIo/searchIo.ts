import { io } from "../httpServer";
import { UsersData } from "../../API/usersData";

io.on("connection", (socket: any)=> {
 const userData = new UsersData();

 socket.on("user", async (user: any, callback: any) => {
  const data = await userData.hook({
   usernames: user,
   fields: 'profile_image_url'
  })

  callback(data)
 })
})