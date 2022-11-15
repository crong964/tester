import {
  CancelingFriendRequestDB,
  InAddFriendRequestDB,
  InsertAddFriendRequestDB,
  ListAddFriendRequestDB,
  ListSentFriendRequestDB,
} from "../database/DBAddFriendReques.js";
import AddFriendRequest from "../model/AddFriendRequest.js";

export default class CTAddFriendReques {
  addFriendsList: AddFriendRequest[];
  constructor() {
    this.addFriendsList = [];
  }
  private refesh() {
    this.addFriendsList = [];
  }
  private setList(s: any) {
    this.refesh();
    let addFriendRequest: AddFriendRequest;
    for (let i = 0; i < s.length; i++) {
      const element = s[i];
      addFriendRequest = new AddFriendRequest();
      addFriendRequest.setAll(element);
      this.addFriendsList.push(addFriendRequest.json());
    }
  }
  async InAddFriendRequest(idUser: string, idAddFriends: string) {
    let check: boolean = false;
    await InAddFriendRequestDB(idUser, idAddFriends)
      .then((v) => {
        let s: any = v;
        if (s.length > 0) {
          check = true;
        } else {
          check = false;
        }
      })
      .catch((v) => {
        console.log(v);
        check = true;
      });
    return check;
  }
  async InsertAddFriendRequest(idUser: string, idAddFriends: string) {
    var check: boolean = false;
    await InsertAddFriendRequestDB(idUser, idAddFriends)
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        check = false;
      });
    return check;
  }
  async ListAddFriendRequest(idUser: string) {
    var s: any;
    s = await ListAddFriendRequestDB(idUser);
    this.setList(s);
    return this.addFriendsList;
  }
  async CancelingFriendRequest(idFriendRequest:string,idUser:string) {
    var s = false
    await CancelingFriendRequestDB(idFriendRequest,idUser)
    .then((v)=>{
      s=true
    })
    .catch((v)=>{
      console.log(v)
      s=false
    })
    return s
  }
  async ListSentFriendRequest(idUser:string){
    await ListSentFriendRequestDB(idUser)
    .then((v:any)=>{
      this.setList(v)
    })
    .catch((v)=>{
      console.log(v)
    })
    return this.addFriendsList
  }
}
