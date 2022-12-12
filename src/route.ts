import { Router } from "express";

// import { HomeController } from "./controllers/homeController";
import { GetTweetController } from "./controllers/getTweetController";
import { GroupSettingsController } from "./controllers/groupSettingsController";

const route = Router();

// const homeController = new HomeController();
const getTweetController = new GetTweetController();
const groupSettingsController = new GroupSettingsController();

route.get('/', getTweetController.handle)
route.get('/groups/settings', groupSettingsController.handle)
// getTweetController.handle

export { route }