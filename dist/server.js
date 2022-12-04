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
import __dirname, { hash, IP, validate } from "./confi.js";
import route from "./route/account.js";
import routeFriends from "./route/friends.js";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import Ctvalidateuser from "./source/controller/Ctvalidateuser.js";
import CTHavelistboxchat from "./source/controller/CTHavelistboxchat.js";
import CTMessage from "./source/controller/CTMessage.js";
var ctmessage = new CTMessage();
var cthavelistboxchat = new CTHavelistboxchat();
var ctvalidateuser = new Ctvalidateuser();
var port = 666;
var ip = {
    ip: "126.0.0.1",
    port: port
};
const app = express();
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
export function Vali(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validate(req)) {
            next();
            return;
        }
        var sercurity = req.cookies;
        var s = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
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
    });
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (validate(req)) {
        res.sendFile(__dirname + "/font/table.html");
        return;
    }
    var sercurity = req.cookies;
    var s = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
    if (!s) {
        res.sendFile(__dirname + "/font/index.html");
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
    res.sendFile(__dirname + "/font/table.html");
}));
app.use("/account", route);
app.use("/friends", Vali, routeFriends);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`http://localhost:${666}`);
    yield IP(port)
        .then((v) => {
        ip = v;
    });
    console.log(`http://${ip.ip}:${666}`);
}));
export default io;
//# sourceMappingURL=server.js.map