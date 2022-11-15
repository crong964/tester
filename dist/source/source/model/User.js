import { formatDate } from "../../confi.js";
var sex;
(function (sex) {
    sex[sex["nu"] = 0] = "nu";
    sex[sex["nam"] = 1] = "nam";
})(sex || (sex = {}));
export default class User {
    constructor() {
        this.id = "";
        this.accout = "";
        this.nameUser = "";
        this.status = 0;
        this.avatar = "anh";
        this.birthday = "";
        this.sex = "";
    }
    setAll(d) {
        this.id = d.id ? d.id : "";
        this.accout = d.account ? d.account : "";
        this.nameUser = d.nameUser ? d.nameUser : "";
        this.status = d.status ? d.status : "";
        this.avatar = d.avatar ? d.avatar : "anh";
        this.birthday = d.birthday ? formatDate(d.birthday) : "";
        this.sex = d.sex ? d.sex : 0;
    }
}
