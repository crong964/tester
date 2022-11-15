var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBoxByIdInBD } from "../database/DBBox.js";
import Box from "../model/Box.js";
export default class DBBox {
    constructor() {
        this.lsBox = [];
    }
    Refesh() {
        this.lsBox = [];
    }
    getAllBoxByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Refesh();
            yield getAllBoxByIdInBD(idUser)
                .catch((v) => {
                console.log(v);
            })
                .then((v) => {
                console.log(v);
                this.setlsBox(v);
            });
            return true;
        });
    }
    setlsBox(any) {
        this.lsBox = [];
        let box;
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            box = new Box();
            box.setAll(element);
            this.lsBox.push(box);
        }
    }
}
