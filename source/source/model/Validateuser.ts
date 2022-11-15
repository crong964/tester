import entity from "./interface/entity.js";

enum status {
  offline = 0,
  online = 1,
}
export default class Validateuser extends entity {
   id: number;
   cookie: string;
   socket: string;
   status: status;
   ab:string
   time:number
  constructor() {
    super()
    this.time=0
    this.id = 0
    this.cookie = "";
    this.socket = "";
    this.status = 1;
    this.ab=""
  }
  public setAll(p: any) {
    super.setAll(p)
  }
  public Json() {
    var s: any = super.json()
    return s;
  }
}
