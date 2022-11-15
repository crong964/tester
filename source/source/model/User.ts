import { formatDate } from "../../confi.js";
import entity from "./interface/entity.js";

enum sex {
  nu = 0,
  nam,
}
export default class User extends entity {
  id: number;
  account: string;
  nameUser: string;
  status: number;
  avatar: string;
  sex: string;
  birthday: string | undefined;
  constructor() {
    super();
    this.id = 0;
    this.account = "";
    this.nameUser = "";
    this.status = 0;
    this.avatar = "anh";
    this.birthday = "";
    this.sex = "";
  }
  setAll(d: any) {
    super.setAll(d);
    if (d.year != undefined) {
      this.birthday = `${d.year}-${d.month}-${d.day}`;
    }
  }
  json() {
    var s: any = {};
    s=super.json()
    s["account"] = undefined;
    if (s["birthday"]) {
      s["birthday"] = formatDate(s["birthday"]);
    } else {
      s["birthday"] = undefined;
    }
    return s;
  }
}
