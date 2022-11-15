import { sign, confi, result } from "../../confi.js";
import mysql from "mysql";
import Account from "../model/Account.js";

export function GetAccoutDatabase(p: Account) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql =
        "SELECT * FROM `account` WHERE account.account=? AND account.password=?";
      con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
        if (e) {
          error(e);
        } else {
          res(ru);
        }
      });
    });
  });
}
export function InsertAccountDB(p: Account) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = "INSERT INTO `account`(`account`, `password`) VALUES (?,?)";
      con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
        if (e) {
          error(e);
        } else {
          res(ru);
        }
      });
    });
  });
}
export function UpdatePasswordDB(account: string, password: string) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = `UPDATE account SET password = ? WHERE account = ?`;
      con.query(sql,[password,account], (e, ru, field) => {
        if (e) {
          error(e);
        } else {
          res(ru);
        }
      });
    });
  });
}

export function GetAccoutByIdDB(id:string){
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = `SELECT *
      from account
      WHERE account IN (SELECT account FROM user WHERE user.id= ? )`;
      con.query(sql,id, (e, ru, field) => {
        if (e) {
          error(e);
        } else {
          res(ru);
        }
      });
    });
  });
}
