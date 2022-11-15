import mysql from "mysql";
import { confi } from "../../confi.js";
export function InsertValidateuserBD(p) {
    return new Promise((res, err) => {
        let con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            let sql = "INSERT INTO `validateuser`(`id`, `cookie`, `socket`, `status`) VALUES (?,?,?,?)";
            con.query(sql, [p.id, p.cookie, p.socket, 1], (e, result, fiel) => {
                if (e) {
                    err(e.message);
                }
                res(result);
            });
        });
    });
}
export function UpdateValidateuserBD(id, socket, status) {
    return new Promise((res, err) => {
        let con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e);
            }
            let sql = "UPDATE `validateuser` SET `socket`=?,`status`=? WHERE id=?";
            con.query(sql, [socket, status, id], (e, rt, fiels) => {
                if (e) {
                    err(e);
                }
                res(true);
            });
        });
    });
}
export function GetValidateUserBD(id, cookie) {
    return new Promise((res, rea) => {
        let con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "SELECT `id`, `cookie`, `socket`, `status` FROM `validateuser` WHERE id=? AND cookie=?";
            con.query(query, [id, cookie], (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(rt);
            });
        });
    });
}
export function DeleteValidateDB(id, cookie) {
    return new Promise((res, rea) => {
        let con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "DELETE FROM `validateuser` WHERE id=? and cookie=?";
            con.query(query, [id, cookie], (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(true);
            });
        });
    });
}
export function DeleteValidateAllDB(id) {
    return new Promise((res, rea) => {
        let con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "DELETE FROM `validateuser` WHERE id=?";
            con.query(query, id, (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(true);
            });
        });
    });
}
