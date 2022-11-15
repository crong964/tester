import { formatDate } from "../../confi.js";
import entity from "./interface/entity.js";
export var typeMess;
(function (typeMess) {
    typeMess["content"] = "0";
    typeMess["image"] = "1";
})(typeMess || (typeMess = {}));
export default class message extends entity {
    constructor() {
        super();
        this.idBox = "";
        this.idUser = "";
        this.content = "";
        this.type = typeMess.content;
        this.idMess = "";
        this.ngay = "";
    }
    setAll(d) {
        super.setAll(d);
    }
    json() {
        var s = super.json();
        if (s["ngay"]) {
            s["ngay"] = formatDate(s["ngay"]);
        }
        if (this.type == typeMess.content) {
            s["type"] == 0;
        }
        return s;
    }
}
//# sourceMappingURL=message.js.map