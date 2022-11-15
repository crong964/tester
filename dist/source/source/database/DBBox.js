import mysql from "mysql";
import { confi } from "../../confi.js";
export function getAllBoxByIdInBD(idUser) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "SELECT hb2.idUser,us.nameUser,us.avatar FROM `havelistboxchat` hb1, `havelistboxchat` hb2, `user` us WHERE hb1.idUser= ? AND hb2.idUser <> ? AND hb1.idBox=hb2.idBox AND us.id=hb2.idUser";
            con.query(sql, [idUser, idUser], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
            });
        });
    });
}
