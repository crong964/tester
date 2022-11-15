import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dns from "dns";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;
export const confi = {
    host: "localhost",
    user: "root",
    password: "",
    database: "zalo",
};
export function hash(params, length) {
    var salt = "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";
    return createHash("shake256", { outputLength: length ? length : 190 })
        .update(params + salt, "utf-8")
        .digest("base64url");
}
export function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
export function validatedate(day, month, year) {
    try {
        var dd = parseInt(day);
        var mm = parseInt(month);
        var yy = parseInt(year);
    }
    catch (error) {
        return false;
    }
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm == 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
            return false;
        }
    }
    if (mm == 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
        }
        if (lyear == false && dd >= 29) {
            return false;
        }
        if (lyear == true && dd > 29) {
            return false;
        }
    }
    return true;
}
export function UnknownString(p) {
    if (p == undefined || p.length == 0) {
        return true;
    }
    return false;
}
export function UnknownObject(p) {
    for (const key in p) {
        if (Object.prototype.hasOwnProperty.call(p, key)) {
            const element = p[key];
            if (UnknownString(element)) {
                return true;
            }
        }
    }
    return false;
}
export function formatDate(d) {
    var date = new Date(d);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
// (async function name() {
//   http
//     .request(
//       {
//         method: "GET",
//         path: "/s",
//         host: "localhost:666",
//         hostname: "localhost",
//         port: 666,
//         headers: {
//           cookies: "dasdas",
//           connection: "keep-ave",
//         },
//       },
//       (res) => {
//         console.log(res.headers["set-cookie"]);
//         res.on("data", (c) => {
//           console.log(c.toString("utf8"));
//         });
//       }
//     )
//     .end();
// });
function equalDate(params) {
    var now = new Date();
    if (now.getDate() !== params.getDate()) {
        return false;
    }
    return true;
}
export function validate(req) {
    var sercurity = req.cookies;
    var date = new Date(Number.parseInt(sercurity.time + ""));
    if (!equalDate(date)) {
        return false;
    }
    var tempAb = hash(sercurity.sercurity + sercurity.time, 25);
    if (tempAb === sercurity.ab) {
        return true;
    }
    return false;
}
export function clearCookie(res) {
    res.clearCookie("id");
    res.clearCookie("sercurity");
    res.clearCookie("ab");
    res.clearCookie("time");
}
export function IP(port) {
    return new Promise((res, rej) => {
        var ip = {
            ip: "126.0.0.1",
            port: port
        };
        dns.lookupService("127.0.0.1", port, (err, hostname, service) => {
            if (err) {
                rej(ip);
            }
            dns.lookup(hostname, 4, (err, address, family) => {
                ip.ip = address;
                ip.port = port;
                res(ip);
            });
        });
    });
}
//# sourceMappingURL=confi.js.map