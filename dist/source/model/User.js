import { formatDate } from "../../confi.js";
import entity from "./interface/entity.js";
var sex;
(function (sex) {
    sex[sex["nu"] = 0] = "nu";
    sex[sex["nam"] = 1] = "nam";
})(sex || (sex = {}));
export default class User extends entity {
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
    setAll(d) {
        super.setAll(d);
        if (d.year != undefined) {
            this.birthday = `${d.year}-${d.month}-${d.day}`;
        }
    }
    json() {
        var s = {};
        s = super.json();
        s["account"] = undefined;
        if (s["birthday"]) {
            s["birthday"] = formatDate(s["birthday"]);
        }
        else {
            s["birthday"] = undefined;
        }
        return s;
    }
}
//# sourceMappingURL=User.js.map