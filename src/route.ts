import { Router } from "express";

// import { HomeController } from "./controllers/homeController";
import { GetTweetController } from "./controllers/getTweetController";

const route = Router();

// const homeController = new HomeController();
const getTweetController = new GetTweetController();

route.get('/', getTweetController.handle)

export { route }