import entity from "./interface/entity.js";
var status;
(function (status) {
    status[status["offline"] = 0] = "offline";
    status[status["online"] = 1] = "online";
})(status || (status = {}));
export default class Validateuser extends entity {
    constructor() {
        super();
        this.time = 0;
        this.id = 0;
        this.cookie = "";
        this.socket = "";
        this.status = 1;
        this.ab = "";
    }
    setAll(p) {
        super.setAll(p);
    }
    Json() {
        var s = super.json();
        return s;
    }
}
//# sourceMappingURL=Validateuser.js.map