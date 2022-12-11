import express from "express";
import cookieParser from "cookie-parser";
import { route } from "./route";
import path  = require("path");
import { Server } from "socket.io";
import http from "http";

export const app = express();

const httpServer = http.createServer(app)

const io = new Server(httpServer)

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use(cookieParser())

app.use(route);

export { httpServer, io }
