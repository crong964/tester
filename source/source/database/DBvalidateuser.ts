import mysql from "mysql"
import { confi } from "../../confi.js";
import validateuser from "../model/Validateuser.js";

export function InsertValidateuserBD(p:validateuser) {
    return new Promise((res,err)=>{
        let con =mysql.createConnection(confi)
        con.connect((e)=>{
            if (e) {
                err(e.message)
            }
            let sql="INSERT INTO `validateuser`(`id`, `cookie`, `socket`, `status`) VALUES (?,?,?,?)"
            con.query(sql,[p.id,p.cookie,p.socket,1],(e,result,fiel)=>{
                if (e) {
                    err(e.message)
                }
                res(result)
            })
        })
    })
}
export function UpdateStatusInValidateuserBD(id:string,status:number) {
    return new Promise((res,err)=>{
        let con=mysql.createConnection(confi);
        con.connect((e)=>{
            if (e) {
                err(e)
            }
            let sql="UPDATE `validateuser` SET `status`=? WHERE id=?"
            con.query(sql,[status,id],(e,rt,fiels)=>{
                if (e) {
                    err(e)
                }
                res(true)
            })
        })
    })
}
export function GetValidateUserBD(id:string,cookie:string) {
    return new Promise((res,rea)=>{
        let con=mysql.createConnection(confi);
        con.connect((err)=>{
            if (err) {
                rea(err)
            }
            let query="SELECT `id`, `cookie`, `socket`, `status` FROM `validateuser` WHERE id=? AND cookie=?"
            con.query(query,[id,cookie],(err,rt,fiels)=>{
                if (err) {
                    rea(err)
                }
                res(rt);
            })
        })
    })
}
export function DeleteValidateDB(id:string,cookie:string) {
    return new Promise((res,rea)=>{
        let con=mysql.createConnection(confi);
        con.connect((err)=>{
            if (err) {
                rea(err)
            }
            let query="DELETE FROM `validateuser` WHERE id=? and cookie=?"
            con.query(query,[id,cookie],(err,rt,fiels)=>{
                if (err) {
                    rea(err)
                }
                res(true);
            })
        })
    })
}
export function DeleteValidateAllDB(id:string) {
    return new Promise((res,rea)=>{
        let con=mysql.createConnection(confi);
        con.connect((err)=>{
            if (err) {
                rea(err)
            }
            let query="DELETE FROM `validateuser` WHERE id=?"
            con.query(query,id,(err,rt,fiels)=>{
                if (err) {
                    rea(err)
                }
                res(true);
            })
        })
    })
}