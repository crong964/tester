import { getAllBoxByIdInBD, GetEmptyBoxDB, insertNewBoxDB, UpdateBoxTypeDB } from "../database/DBBox.js";
import Box from "../model/Box.js";
enum type{
  noFriend ="0",
  Friend="1"
}
export default class CTBox {
  lsBox: Box[];

  
   gettype() {
    return type
  }
  constructor() {
    this.lsBox = [];
  }
  private Refesh() {
    this.lsBox = [];
  }
  async getAllBoxByIdUser(idUser: string) {
    await getAllBoxByIdInBD(idUser)
      .catch((v) => {
        console.log(v);
      })
      .then((v) => {
       
        this.setlsBox(v as []);
      });
    return true;
  }
  async insertNewBox(){
    await insertNewBoxDB()
    .catch((v)=>{
        console.log(v)
    })
    return true
  }
  
  private setlsBox(any: []) {
    this.Refesh();
    this.lsBox = [];
    let box: Box;
    for (let i = 0; i < any.length; i++) {
      const element = any[i];
      box = new Box();
      box.setAll(element);
      this.lsBox.push(box);
    }
  }

  
  async UpdateBoxType(idBox: string, type: string){
    await UpdateBoxTypeDB(idBox,type)
    .catch((v)=>{
      console.log(v)
    })
    return true
  }
  async GetEmptyBox(){
    await GetEmptyBoxDB()
    .then((v)=>{
      this.setlsBox(v as [])
    })
    return this.lsBox
  }
}
