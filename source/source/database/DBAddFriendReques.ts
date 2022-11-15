import mysql from "mysql";
import { confi } from "../../confi.js";


export function InsertAddFriendRequestDB(idUser: string, idAddFriends: string) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql =
        "INSERT INTO `listaddfriends`(`idUser`, `idAddFriends`) VALUES (?,?)";
      con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
      });
    });
  });
}
export function InAddFriendRequestDB(idUser: string, idAddFriends: string){
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql ="SELECT * FROM listaddfriends WHERE idUser=? AND idAddFriends=? ";
      con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
      });
    });
  });
}

export async function ListAddFriendRequestDB(idUser:string) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql ="SELECT user.id,user.nameUser,user.avatar,user.birthday,user.sex FROM listaddfriends, user WHERE listaddfriends.idAddFriends=? AND listaddfriends.idUser=user.id";
      con.query(sql,idUser, (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
      });
    });
  });
}

export async function CancelingFriendRequestDB(idFriendRequest:string,idUser:string) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql ="DELETE FROM listaddfriends WHERE listaddfriends.idUser=? AND listaddfriends.idAddFriends=?";
      con.query(sql,[idFriendRequest,idUser], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
      });
    });
  });
}


export async function ListSentFriendRequestDB(idUser:string) {
  return new Promise((res, error) => {
    var con = mysql.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql ="SELECT u.nameUser, u.id,u.avatar,u.sex FROM listaddfriends l, user u WHERE l.idUser = ? AND u.id=l.idAddFriends";
      con.query(sql,idUser, (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
      });
    });
  });
}