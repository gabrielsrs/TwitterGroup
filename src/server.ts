import express from "express";
import { route } from "./route";
import path  = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use(route);

app.listen(5000, () => console.log("ON!!"))