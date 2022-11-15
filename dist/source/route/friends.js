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
import CTAddFriendReques from "../source/controller/CTAddFriendReques.js";
import CTHaveListFriends from "../source/controller/CThaveLsitFriend.js";
import CTUsers from "../source/controller/CtUsers.js";
var cthaveLsitFriend = new CTHaveListFriends();
var ctAddFriendReques = new CTAddFriendReques();
var ctUser = new CTUsers();
const routeFriends = express.Router();
routeFriends.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    yield cthaveLsitFriend
        .GetHaveListFriendsByIdUser(sercurity.id)
        .catch((v) => { });
    res.json({
        listFirends: cthaveLsitFriend.HaveListFriends,
    });
}));
routeFriends.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var nameUser = req.body.name;
    var s = req.cookies;
    console.log(nameUser);
    var listUser = [];
    var haveListFriends = [];
    yield Promise.all([
        ctUser.SearchListUserByName(s.id, nameUser),
        cthaveLsitFriend.SearchFirendsByName(s.id, nameUser),
    ])
        .then((v) => {
        listUser = v[0];
        haveListFriends = v[1];
    })
        .catch((v) => {
        console.log(v);
    });
    res.json({
        err: false,
        listUser: listUser,
        listFriends: haveListFriends,
    });
}));
routeFriends.post("/addFriends", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idFriend = req.body.idFriend;
    var check = false;
    yield Promise.all([
        cthaveLsitFriend.InFriendInList(s.id, idFriend),
        ctAddFriendReques.InAddFriendRequest(s.id, idFriend),
    ]).then((v) => {
        if (v[0] || v[1]) {
            check = true;
        }
        else {
            check = false;
        }
    }).catch((v) => {
        check = true;
    });
    if (check) {
        res.end();
        return;
    }
    yield ctAddFriendReques.InsertAddFriendRequest(s.id, idFriend);
    res.json({ err: false });
}));
export default routeFriends;
