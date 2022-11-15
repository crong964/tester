import { formatDate } from "../../confi.js";
import entity from "./interface/entity.js";
export enum typeMess{
    content="0",
    image="1"
}
export default class message extends entity {
  
  idBox: string;
  idUser: string;
  content: string;
  type: typeMess;
  idMess: string;
  ngay: string;
  constructor() {
    super()
    this.idBox=""
    this.idUser=""
    this.content=""
    this.type=typeMess.content
    this.idMess=""
    this.ngay=""
  }
  setAll(d: any) {
    super.setAll(d)
  }
  json() {
    var s: any = super.json();
    if (s["ngay"]) {
      s["ngay"]=formatDate(s["ngay"])
    }
    if (this.type==typeMess.content) {
      s["type"]==0
    }
    return s;
  }
}
