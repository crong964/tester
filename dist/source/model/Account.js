import entity from "./interface/entity.js";
export default class Account extends entity {
    constructor() {
        super();
        this.account = "",
            this.password = "";
    }
    setAll(d) {
        super.setAll(d);
    }
    getAccount() {
        return this.account;
    }
    getPassword() {
        return this.password;
    }
    setAccount(v) {
        this.account = v;
    }
    setPassord(v) {
        this.password = v;
    }
    json() {
        return super.json();
    }
}
//# sourceMappingURL=Account.js.map