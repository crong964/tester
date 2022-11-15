import mysql from "mysql";
import { confi } from "../../confi.js";
export function GetkUserDatabase(account) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e);
            }
            var sql = "SELECT * FROM `user` WHERE user.account=?";
            con.query(sql, account, (e, rt, fiels) => {
                if (e) {
                    err(e);
                }
                res(rt);
            });
        });
    });
}
export function InsertNewUserDB(p) {
    return new Promise((res, rej) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                rej(e);
            }
            var sql = " INSERT INTO `user`( `account`, `nameUser`, `birthday`, `sex`,`avatar`) VALUES (?,?,?,?,?)";
            con.query(sql, [p.accout, p.nameUser, p.birthday, p.sex, p.avatar], (e, rt, fi) => {
                if (e) {
                    rej(e);
                }
                res(true);
            });
        });
    });
}
export function ListUserByNameDB(idUser, name) {
    return new Promise((res, rej) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                rej(e);
            }
            var sql = "SELECT u.id,u.nameUser,u.avatar,u.birthday,u.sex FROM user u WHERE u.nameUser LIKE ? and u.id NOT IN (SELECT h.idFriends FROM havelistfriends h WHERE h.idUser = ?) ";
            con.query(sql, [`%${name}%`, idUser], (e, rt, fi) => {
                if (e) {
                    rej(e);
                }
                res(rt);
            });
        });
    });
}
