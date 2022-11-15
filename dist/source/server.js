var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import route from "./source/route/account.js";
import routeFriends from "./source/route/friends.js";
import Ctvalidateuser from "./source/source/controller/Ctvalidateuser.js";
import __dirname from "./font/init.js";
import { Server } from "socket.io";
var ctvalidateuser = new Ctvalidateuser();
var port = 666;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("access-control-allow-origin", "*");
    next();
});
function Vali(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var s = yield ctvalidateuser.GetValidateUser(req.cookies.id, req.cookies.sercurity);
        if (!s) {
            res.redirect("/acount/sign");
            return;
        }
        next();
    });
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = yield ctvalidateuser.GetValidateUser(req.cookies.id, req.cookies.sercurity);
    if (!s) {
        res.sendFile(__dirname + "/sign.html");
        return;
    }
    res.sendFile(__dirname + "/client.html");
}));
app.use("/account", route);
app.use("/friends", Vali, routeFriends);
server.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
io.on("connection", (socket) => {
    console.log(socket.id);
});
