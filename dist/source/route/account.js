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
import __dirname from "../../font/init.js";
import { hash, UnknownObject, validatedate } from "../confi.js";
import Account from "../source/model/Account.js";
import Validateuser from "../source/model/Validateuser.js";
import ControllerUser from "../source/controller/CtUsers.js";
import CTvalidateuser from "../source/controller/Ctvalidateuser.js";
import CTBox from "../source/controller/CTBox.js";
import CTAccout from "../source/controller/CtAccout.js";
var ctAccout = new CTAccout();
var ctUser = new ControllerUser();
var ctvalidateuser = new CTvalidateuser();
var ctBox = new CTBox();
const route = express.Router();
route.use((req, res, next) => {
    if (UnknownObject(req.body)) {
        res.json({ err: true, mess: "bạn điền chưa đủ" });
        return;
    }
    next();
});
route.get("/sign", (req, res) => {
    res.sendFile(__dirname + "/sign.html");
});
route.post("/sign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    var account = new Account();
    account["setAll"](req.body);
    var err = false;
    if (account.getAccount().length == 0) {
        res.json({ err: true, mess: "Chưa nhập tài khoản" });
        return;
    }
    if (account.getPassword().length == 0) {
        res.json({ err: true, mess: "Chưa nhập mật khẩu" });
        return;
    }
    yield Promise.all([
        ctAccout.GetAccout(account),
        ctUser.GetUser(account.getAccount()),
    ]).catch((v) => {
        err = true;
    });
    if (err) {
        res.send("lỗi");
        return;
    }
    if (ctUser.user != undefined && ctAccout.account == undefined) {
        res.json({ err: true, mess: "Sai Mật Khẩu" });
        return;
    }
    if (ctUser.user == undefined) {
        res.json({ err: true, mess: "Sai Tài Khoản" });
        return;
    }
    var data = new Date();
    var validateuser = new Validateuser();
    validateuser.id = ctUser.user.id;
    validateuser.cookie = hash(ctUser.user.accout + validateuser.id + data.toUTCString());
    yield ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
        err = true;
    });
    if (err) {
        res.json("lỗi ");
        return;
    }
    yield ctBox.getAllBoxByIdUser(validateuser.id);
    res.cookie("id", (_a = ctUser.user) === null || _a === void 0 ? void 0 : _a.id);
    res.cookie("sercurity", validateuser.cookie, { maxAge: 1000 * 60 * 60 * 24 * 356 });
    res.json({
        err: false,
        user: {
            id: ctUser.user.id,
            avatar: ctUser.user.avatar,
            nameUser: ctUser.user.nameUser,
            birthday: ctUser.user.birthday,
            sex: ctUser.user.sex,
        },
        lsBox: ctBox.lsBox,
    });
}));
route.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});
route.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var body = req.body;
    var err = false;
    if (!validatedate(body.day, body.month, body.year)) {
        res.json({ err: true, mess: "sai ngày tháng" });
        return;
    }
    // if (!validateEmail(body.account)) {
    //   res.json({ err: true, mess: "sai email" });
    //   return;
    // }
    var user = yield ctUser.GetUser(body.account).catch((v) => {
        err = true;
    });
    if (err) {
        res.end();
        return;
    }
    if (user) {
        res.json({ err: true, mess: "Tài khoản đã tồn tại" });
        return;
    }
    var account = new Account();
    account.setAll(body);
    yield ctAccout.InsertAccount(account).catch((v) => {
        err = true;
    });
    if (err) {
        res.end();
        return;
    }
    yield ctUser.InsertNewUser(body).catch((v) => {
        err = true;
    });
    if (err) {
        res.end();
        return;
    }
    res.sendFile(__dirname + "/register.html");
}));
route.post("/createAccount", (req, res) => { });
route.get("/logOut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    console.log(req.cookies);
    yield ctvalidateuser.DeleteValidate(sercurity.id, sercurity.sercurity)
        .catch((v) => {
    });
    res.clearCookie("id");
    res.clearCookie("sercurity");
    res.redirect("/account/sign");
}));
route.get("/logOutAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    console.log(req.cookies);
    var validatedate = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
    if (!validatedate) {
        res.json("ok");
        return;
    }
    yield ctvalidateuser.DeleteValidateAll(sercurity.id)
        .catch((v) => {
    });
    res.clearCookie("id");
    res.clearCookie("sercurity");
    res.redirect("/account/sign");
}));
export default route;
