function postData(url:string,params:{},cb:Function) {
    fetch(url,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(params)
    })
    .then((v)=>{
        return v.json()
    })
    .then((v)=>{
        cb(JSON.stringify(v));
    })
}
var root=document.getElementById("root")
function render(params:string) {
    root?.innerHTML=""
    root?.append(params)
}

var listAddFriendRequest=document.getElementById("FriendsList")
listAddFriendRequest?.addEventListener("click",()=>{
    postData("http://localhost:666/friends/",
    {},
    (data:string)=>{
        render(data)
    })
})


var findNameFriends=document.getElementById("findNameFriends")
var submitFindNameFriends=document.getElementById("submitFindNameFriends");
submitFindNameFriends?.addEventListener("click",()=>{
    var n=findNameFriends?.value;
   
    postData("http://localhost:666/friends/search",
    {name:n},
    (data:string)=>{
        render(data)
    })
})

var idFriend=document.getElementById("idFriend");
var submitIdFriend=document.getElementById("submitIdFriend")
submitIdFriend?.addEventListener("click",()=>{
    var id=idFriend?.value;
    postData("http://localhost:666/friends/addFriendsRequset",
    {idFriend:id},
    (data:string)=>{
        render(data)
    })
})

var listAddFriendRequest=document.getElementById("listAddFriendRequest")
listAddFriendRequest?.addEventListener("click",()=>{
    postData("http://localhost:666/friends/listAddFriendRequest",
    {},
    (data:string)=>{
        render(data)
    })
})


var CacelAddFriendRequest=document.getElementById("CacelAddFriendRequest");
var SubmitCacelAddFriendRequest=document.getElementById("SubmitCacelAddFriendRequest")
SubmitCacelAddFriendRequest?.addEventListener("click",()=>{
    var n=CacelAddFriendRequest?.value;
    postData("http://localhost:666/friends/cacelAddFriendRequest",
    {idFriend:n},
    (data:string)=>{
        root?.append(data);
    })
})

var AcceptAddFriendRequest=document.getElementById("AcceptAddFriendRequest");
var SubmitAcceptAddFriendRequest=document.getElementById("SubmitAcceptAddFriendRequest")
SubmitAcceptAddFriendRequest?.addEventListener("click",()=>{
    var n=AcceptAddFriendRequest?.value;
    postData("http://localhost:666/friends/acceptAddFriendRequest",
    {idFriend:n},
    (data:string)=>{
        root?.append(data);
    })
})

var SubmitBoxChatList=document.getElementById("SubmitBoxChatList")
SubmitBoxChatList?.addEventListener("click",()=>{
    postData("http://localhost:666/box/",
    {},
    (data:string)=>{
        render(data)
    })
})

var cancelFriends=document.getElementById("cancelFriends");
var SubmitCancelFriends=document.getElementById("SubmitCancelFriends")
SubmitCancelFriends?.addEventListener("click",()=>{
    var n=cancelFriends?.value;
    postData("http://localhost:666/friends/cancelFriends",
    {idFriend:n},
    (data:string)=>{
        render(data)
    })
})

var HiddenBoxChat=document.getElementById("HiddenBoxChat");
var SubmitHiddenBoxChat=document.getElementById("SubmitHiddenBoxChat")
SubmitHiddenBoxChat?.addEventListener("click",()=>{
    var n=HiddenBoxChat?.value;
    postData("http://localhost:666/box/hiddenBoxChat",
    {idBox:n},
    (data:string)=>{
        render(data)
    })
})

var Chat=document.getElementById("Chat");
var SubmitChat=document.getElementById("SubmitChat")
SubmitChat?.addEventListener("click",()=>{
    var n=Chat?.value;
    postData("http://localhost:666/box/chat",
    {idFriend:n},
    (data:string)=>{
        render(data)
    })
})

var SubmitSentFriendRequest=document.getElementById("SubmitSentFriendRequest")
SubmitSentFriendRequest?.addEventListener("click",()=>{
    postData("http://localhost:666/friends/sentFriendRequest",
    {},
    (data:string)=>{
        render(data)
    })
})


var GetContentInBox=document.getElementById("GetContentInBox");
var SubMitGetContentInBox=document.getElementById("SubMitGetContentInBox")
SubMitGetContentInBox?.addEventListener("click",()=>{
    var n=GetContentInBox?.value;
    postData("http://localhost:666/mess/getAllContent",
    {idBox:n},
    (data:string)=>{
        render(data)
    })
})



