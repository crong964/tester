export default class Account {
    constructor() {
        this.account = "",
            this.password = "";
    }
    setAll(d) {
        this.account = d.account ? d.account : "";
        this.password = d.password ? d.password : "";
        return this;
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
}
