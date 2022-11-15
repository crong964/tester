import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import __dirname, { address, content, hash, IP, validate } from "./confi.js";

import route from "./route/account.js";
import routeFriends from "./route/friends.js";

import bodyParser from "body-parser";
import { sercurity } from "./confi.js";
import { Server } from "socket.io";


import Ctvalidateuser from "./source/controller/Ctvalidateuser.js";
import CTHavelistboxchat from "./source/controller/CTHavelistboxchat.js";
import CTMessage from "./source/controller/CTMessage.js";


var ctmessage = new CTMessage();
var cthavelistboxchat = new CTHavelistboxchat();
var ctvalidateuser = new Ctvalidateuser();

var port = 666;
var ip: address ={
  ip:"126.0.0.1",
  port:port
};
const app: express.Express = express();
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));
const io = new Server(server, {});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("access-control-allow-origin", "*");
  next();
});
export async function Vali(req: Request, res: Response, next: NextFunction) {
  if (validate(req)) {
    next();
    return;
  }
  var sercurity: sercurity = req.cookies;
  var s = await ctvalidateuser.GetValidateUser(
    sercurity.id,
    sercurity.sercurity
  );
  if (!s) {
    res.status(402).end();
    return;
  }
  var date = new Date();
  sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
  res.cookie("time", date.getTime(), {
    httpOnly: true,
  });
  res.cookie("ab", sercurity.ab, {
    httpOnly: true,
  });

  next();
}

app.get("/", async (req, res) => {
  if (validate(req)) {
    res.sendFile(__dirname + "/font/client.html");
    return;
  }
  var sercurity: sercurity = req.cookies;
  var s = await ctvalidateuser.GetValidateUser(
    sercurity.id,
    sercurity.sercurity
  );
  if (!s) {
    res.sendFile(__dirname + "/font/sign.html");
    return;
  }
  var date = new Date();
  sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
  res.cookie("time", date.getTime(), {
    httpOnly: true,
  });
  res.cookie("ab", sercurity.ab, {
    httpOnly: true,
  });

  res.sendFile(__dirname + "/font/client.html");
});
app.use("/account", route);
app.use("/friends", Vali, routeFriends);

server.listen(port,async () => {
  console.log(`http://localhost:${666}`);
  await IP(port)
  .then((v:any)=>{
    ip=v;
  })
  console.log(`http://${ip.ip}:${666}` );
});

export default io;
