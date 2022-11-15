import { createHash } from "crypto";
export const confi = {
    host: "localhost",
    user: "root",
    password: "",
    database: "zalo",
};
export function hash(params) {
    return createHash("md5").update(params, "utf-8").digest("base64");
}
export function google() {
    return {
        web: {
            client_id: "817413775067-rq5397mfi6jtpc3lnps5uam9ahelcgui.apps.googleusercontent.com",
            project_id: "totemic-rig-362011",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_secret: "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",
        },
    };
}
export function validateEmail(email) {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
