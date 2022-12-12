import { io } from "../httpServer";
import { GetTweetService } from "../services/getTweetService";
import { SocketIoRender } from "../controllers/socketIoController";

io.on("connection", (socket:any) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("groups", async (groups: object, callback: any) => {
    // const getTweetService = new GetTweetService();
    // const socketIoRender = new SocketIoRender();
    // const allUsers: Array<string> = []

    // Object.values(groups).forEach((singleGroup: Array<string>) => {
    //   singleGroup.forEach((user: string) => {
    //     allUsers.push(user)
    //   })
    // }); 

    // const result: object = await  getTweetService.getTweets({
    //   usernames: allUsers
    // });

    // callback(result);
  })

  socket.on("disconnect", (reason: any) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

})




// class Socket {
//  handler (socket: any) {
//     console.log(`socket ${socket.id} connected`);

//     socket.on("msg", (msg: any) => { this})
     
//     socket.on("disconnect", (reason: any) => {
//       console.log(`socket ${socket.id} disconnected due to ${reason}`);
//     });
//    };
// }

// export { Socket }