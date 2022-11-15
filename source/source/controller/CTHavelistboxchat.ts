import {
  GetIdBoxbyIdUserAndIdFriendDB,
  GetIdUserOnlineInBoxDB,
  InsertIdToNewBoxDB,
  IsIdUserInBoxDB,
  SetNotSeenInBoxDB,
  UpdateStatusBox,
} from "../database/DBHavelistboxchat.js";
import Box from "../model/Box.js";
export enum statusBox {
  hidden = "0",
  visual = "1",
}

export default class CTHavelistboxchat {
  listBox: Box[];

  constructor() {
    this.listBox = [];
  }
  async hiddenBoxChat(idUser: string, idBox: string) {
    var s = false;
    await UpdateStatusBox(idUser, idBox, statusBox.hidden)
      .then((v: any) => {
        if (v.changedRows == 1) {
          s = true;
        }
      })
      .catch((v) => {
        console.log(v);
      });
    return s;
  }
  async GetIdBoxbyIdUserAndIdFriend(idUser: string, idFriend: string) {
    await GetIdBoxbyIdUserAndIdFriendDB(idUser, idFriend)
      .then((v) => {
        this.setlsBox(v as []);
      })
      .catch((v) => {
        console.log(v);
        this.Refesh();
      });
    return this.listBox;
  }
  private setlsBox(any: []) {
    this.Refesh();

    let box: Box;
    for (let i = 0; i < any.length; i++) {
      const element = any[i];
      box = new Box();
      box.setAll(element);
      this.listBox.push(box.json());
    }
  }
  private Refesh() {
    this.listBox = [];
  }
  async InsertIdToNewBox(idUser: string, idBox: string) {
    await InsertIdToNewBoxDB(idUser, idBox)
      .then((v) => {})
      .catch((v) => {
        console.log("ok");
        console.log(v);
      });
    return true;
  }
  async visualBoxChat(idUser: string, idBox: string, status: string) {
    var s = false;
    await UpdateStatusBox(idUser, idBox, status)
      .then((v: any) => {
        s = true;
      })
      .catch((v) => {
        console.log(v);
      });
    return s;
  }
  async GetIdUserOnlineInBox(idUser: string, idBox: string) {
    await GetIdUserOnlineInBoxDB(idBox, idUser).then((v: any) => {
      this.setlsBox(v);
    }).catch((v)=>{
      console.log(v);
      
    })
    return this.listBox;
  }
  async IsIdUserInBox(idUser: string, idBox: string) {
    let check: boolean = false;
    await IsIdUserInBoxDB(idUser, idBox)
      .then((v: any) => {
        if (v.length > 0) {
          check = true;
        }
      })
      .catch((v) => {
        console.log(v);
      });
    return check;
  }
  async SetNotSeenInBox(idUser: string, idBox: string) {
    let check=false;
    await SetNotSeenInBoxDB(idUser, idBox)
    .then((v:any)=>{
      if (v.changedRows>0) {
        check=true
      }
    })
    .catch((v)=>{
      console.log(v)
    })
    return check
  }
  
}
