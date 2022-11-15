export default class Box {
    constructor() {
        this.idBox = "";
        this.idUser = "";
        this.nameUser = "";
        this.avatar = "";
    }
    setAll(p) {
        this.idBox = p.idBox;
        this.idUser = p.idUser;
        this.nameUser = p.nameUser;
        this.avatar = p.avatar;
    }
}
