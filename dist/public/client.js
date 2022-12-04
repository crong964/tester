"use strict";

function postData(url, params, cb) {
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(params),
        })
        .then((v) => {
            return v.json();
        })
        .then((v) => {
            cb(JSON.stringify(v));
        });
}

function render(params) {
    var s = JSON.parse(params);
    var list = s.listUser;
    var table = document.getElementById("tableRender");
    while (table === null || table === void 0 ? void 0 : table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        td1.innerText = element.id + "";
        td2.innerText = element.nameUser;
        td3.innerText = element.status + "";
        td4.innerText = element.birthday;
        td5.innerText = element.sex ? "nam" : "nữ";
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        table === null || table === void 0 ? void 0 : table.append(tr);
    }
}
//hello
var findNameFriends = (document.getElementById("findNameFriends"));
var submitFindNameFriends = document.getElementById("submitFindNameFriends");
submitFindNameFriends === null || submitFindNameFriends === void 0 ? void 0 : submitFindNameFriends.addEventListener("click", () => {
    var n = findNameFriends === null || findNameFriends === void 0 ? void 0 : findNameFriends.value;
    postData("http://localhost:666/friends/search", { name: n }, (data) => {
        render(data);
    });
});
//# sourceMappingURL=client.js.map