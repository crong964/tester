import mysql from "mysql";
import { confi } from "../../confi.js";
export function InsertAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "INSERT INTO `listaddfriends`(`idUser`, `idAddFriends`) VALUES (?,?)";
            con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                res(ru);
            });
        });
    });
}
export function InAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "SELECT * FROM listaddfriends WHERE idUser=? AND idAddFriends=? ";
            con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                res(ru);
            });
        });
    });
}
