var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import io from "../../server.js";
class CTListSocket {
    constructor() {
        this.list = {};
    }
    addSocket(id, socketId) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = this.list[id]["listSocket"];
            if (!list) {
                this.list[id]["listSocket"] = [];
                this.list[id]["listSocket"].push(socketId);
            }
            else {
                this.list[id]["listSocket"].push(socketId);
                const sockets = yield io.in(this.getSocketIdStringFirst(id)).fetchSockets();
                io.in(socketId).socketsJoin(sockets[0].id);
            }
        });
    }
    getSocketIdStringFirst(id) {
        return this.list[id]["listSocket"][0];
    }
}
export default new CTListSocket();
