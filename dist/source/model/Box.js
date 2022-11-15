import entity from "./interface/entity.js";
export default class Box extends entity {
    constructor() {
        super();
        this.idBox = "";
        this.idUser = 0;
        this.nameUser = "";
        this.avatar = "";
        this.status = "";
    }
    setAll(p) {
        super.setAll(p);
    }
    json() {
        var s = super.json();
        return s;
    }
}
//# sourceMappingURL=Box.js.map