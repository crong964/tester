function postData(url: string, params: {}, cb: Function) {
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
interface friends {
  id: number;
  nameUser: string;
  status: number;
  birthday: string;
  sex: number;
  avatar: string;
}
interface res {
  err: boolean;
  listUser: friends[];
}
function render(params: string) {
  var s: res = JSON.parse(params);

  var list: friends[] = s.listUser;
  var table = document.getElementById("tableRender");
  while (table?.firstChild) {
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
    td5.innerText = element.sex?"nam":"nữ"

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    table?.append(tr);
  }
}

var findNameFriends = <HTMLInputElement>(
  document.getElementById("findNameFriends")
);
var submitFindNameFriends = document.getElementById("submitFindNameFriends");
submitFindNameFriends?.addEventListener("click", () => {
  var n = findNameFriends?.value;
  
  postData("http://localhost:666/friends/search", { name: n }, (data: any) => {
    render(data);
  });
});
