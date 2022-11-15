var status;
(function (status) {
    status[status["offline"] = 0] = "offline";
    status[status["online"] = 1] = "online";
})(status || (status = {}));
export default class Validateuser {
    constructor() {
        this.id = "";
        this.cookie = "";
        this.socket = "";
        this.status = 1;
    }
    setAll(p) {
        this.cookie = p.cookie ? p.cookie : "";
        this.id = p.id ? p.id : "";
        this.socket = p.socket ? p.socket : "";
        this.status = p.status ? p.status : "";
    }
    Json() {
        return {
            id: this.id,
            cookie: this.cookie,
            socket: this.socket,
            status: this.status
        };
    }
}
