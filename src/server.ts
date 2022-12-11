import { httpServer } from "./httpServer"
import "./socketIo/socketIo"
import "./socketIo/searchIo"

httpServer.listen(5000, () => console.log("ON!!"))



