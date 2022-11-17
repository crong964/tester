import express, { Request, Response } from "express";
import __dirname, { clearCookie } from "../confi.js";
import {
  hash,
  postRegister,
  sercurity,
  UnknownObject,
  validatedate,
  validateEmail,
} from "../confi.js";
import Account from "../source/model/Account.js";
import Validateuser from "../source/model/Validateuser.js";
import ControllerUser from "../source/controller/CtUsers.js";
import CTvalidateuser from "../source/controller/Ctvalidateuser.js";
import CTBox from "../source/controller/CTBox.js";
import CTAccout from "../source/controller/CtAccout.js";
import CTtemporaryuser from "../source/controller/CTtemporaryuser.js";
import GamiAPI from "../gmail.js";
import temporaryuser from "../source/model/temporaryuser.js";
import io, { Vali } from "../server.js";

var ctAccout = new CTAccout();
var ctUser = new ControllerUser();
var ctvalidateuser = new CTvalidateuser();
var cttemporaryuser = new CTtemporaryuser();
var ctBox = new CTBox();
var gamiAPI = new GamiAPI();

const route: express.Router = express.Router();

setInterval(async () => {
  await cttemporaryuser.fillter();
}, 60000);
route.use((req, res, next) => {
  if (UnknownObject(req.body)) {
    res.json({ err: true, mess: "bạn điền chưa đủ" });
    return;
  }
  next();
});
route.get("/sign", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/font/sign.html");
});
route.post("/sign", async (req: Request, res: Response) => {
  var account = new Account();
  account["setAll"](req.body);

  if (!validateEmail(account.getAccount())) {
    res.status(400).json({mess:"đây không phải email"})
    return
  }
  var err: boolean = false;

  await Promise.all([
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

  validateuser.cookie = hash(
    ctUser.user.account + validateuser.id + data.toUTCString(),
    25
  );
  validateuser.time = data.getTime();
  validateuser.ab = hash(validateuser.cookie + validateuser.time, 25);

  await ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
    err = true;
  });
  if (err) {
    res.json("lỗi ");
    return;
  }
  await ctBox.getAllBoxByIdUser(validateuser.id + "");
  res.cookie("time", validateuser.time, {
    httpOnly: true,
  });
  res.cookie("id", ctUser.user.id, {
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.cookie("ab", validateuser.ab, {
    httpOnly: true,
  });
  res.cookie("sercurity", validateuser.cookie, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.json({mess:"đăng nhập thành công"});
});
route.get("/register", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/font/register.html");
});
route.post("/register", async (req: Request, res: Response) => {
  var body: postRegister = req.body;
  await gamiAPI.loadAll();
  if (!validatedate(body.day, body.month, body.year)) {
    res.status(400).json({ err: true, mess: "sai ngày tháng" });
    return;
  }
  if (!validateEmail(body.account)) {
    res.status(400).json({ err: true, mess: "đây không phải email" });
    return;
  }
  if (body.password.length<=6) {
    res.status(400).json({ err: true, mess: "mật khẩu quá ngắn" });
    return;
  }
  let tem = new temporaryuser();
  
  tem.setAll(body);
  tem.valiCode = hash(JSON.stringify(tem.json()) + gamiAPI.getAccessToken());
  
  var kq = await ctUser.GetUser(body.account);
  if (kq != undefined) {
    res.status(400);
    res.json({ mess: "tài khoản đã đăng ký" });
    return;
  }

  if (cttemporaryuser.getTemporaryuser(body.account) != undefined) {
    res.status(400);
    res.json({ mess: "hãy kiểm tra mail để kích hoạt" });
    return;
  }
  var url = `http://localhost:666/account/ValidateAcc/${body.account}/${tem.valiCode}`;
  await gamiAPI.contentGmail(body.account, url).catch((v) => {
    console.log(v);
    return;
  });

  cttemporaryuser.InsertNew(tem);
  res.status(200).json({ mess: "bạn đã đăng ký thành công hay kích hoạt đi" });
});
route.get("/ValidateAcc/:acc/:vali", async (req: Request, res: Response) => {
  console.log(req.params);
  var s = cttemporaryuser.getTemporaryuser(req.params.acc);

  if (s == undefined) {
    res.status(404).json({ mess: "tài khoản này chưa đăng ký" });
    return;
  }
  var account = new Account();
  account.setAll(s);
  var err = false;
  await ctAccout.InsertAccount(account).catch((v) => {
    console.log(v);
    err = true;
  });
  await ctUser.InsertNewUser(s).catch((v) => {
    console.log(v);
    err = true;
  });
  if (err) {
    console.log(" có lỗi trong việc thêm tài khoản mới ");

    res.end();
    return;
  }

  res.sendFile(__dirname + "/font/sign.html");
});
export default route;
