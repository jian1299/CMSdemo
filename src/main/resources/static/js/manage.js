//tools
// $.extend({
//     myTime:{
//         CurTime: function(){
//             return Date.parse(new Date())/1000;
//         },
//         DateToUnix: function(string) {
//             var f = string.split(' ', 2);
//             var d = (f[0] ? f[0] : '').split('-', 3);
//             var t = (f[1] ? f[1] : '').split(':', 3);
//             return (new Date(
//                 parseInt(d[0], 10) || null,
//                 (parseInt(d[1], 10) || 1) - 1,
//                 parseInt(d[2], 10) || null,
//                 parseInt(t[0], 10) || null,
//                 parseInt(t[1], 10) || null,
//                 parseInt(t[2], 10) || null
//             )).getTime() / 1000;
//         },
//         UnixToDate: function(unixTime, isFull, timeZone) {
//             if (typeof (timeZone) == 'number'){
//                 unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
//             }
//             var time = new Date(unixTime * 1000);
//             var ymdhis = "";
//             ymdhis += time.getUTCFullYear() + "-";
//             ymdhis += (time.getUTCMonth()+1) + "-";
//             ymdhis += time.getUTCDate();
//             if (isFull === true){
//                 ymdhis += "" + time.getUTCHours() + ":";
//                 ymdhis += time.getUTCMinutes() + ":";
//                 ymdhis += time.getUTCSeconds();
//             }
//             return ymdhis;
//         }
//     }
// });
var twokuan=function (value) {
    return value<10?"0"+value:value;

}
var timeFormatter=function (value) {

    var da = new Date(value);

    return da.getFullYear() + "-" + twokuan(da.getMonth() + 1) + "-" + twokuan(da.getDate()) + " " + twokuan(da.getHours()) + ":" + twokuan(da.getMinutes()) + ":" + twokuan(da.getSeconds());

}
//defined
$.post("/searchUser",function(res){
    var list=res.data;
    $("#userbody").html("");
    $.each(list,function(idx,user){
        $("#userbody").append("<tr>" +
            "<td>"+user.loginId+"</td>" +
            "<td>"+user.username+"</td>" +
            "<td>"+timeFormatter(user.createTime)+"</td>" +
            "<td>"+timeFormatter(user.updateTime)+"</td>" +
            "<td>" +
            "<button id='eubtn" + user.loginId +"' class='btn btn-xs btn-info' value='Edit' data-toggle='modal' data-target='#EditUser' onclick='edituser(this)'> " +
            "Edit" +
            "</button>&nbsp;" +
            "<button class='btn btn-xs btn-danger' onclick=''>" +
            "Delete" +
            "</button> " +
            "</td>" +
            "</tr>");
    });
});

function edituser(t) {
    var chids =  $(t).closest('td').closest('tr').find("td");
    var userid = chids.eq(0).text();
    var username = chids.eq(1).text();
    var ct = chids.eq(2).text();
    var ut = chids.eq(3).text();
    $("#euid").val(userid);
    $("#eusername").val(username);
    $("#eucreateTime").val(ct);
    $("#euupdateTime").val(ut);
}

$("#submiteu").click(function () {
    alert("11111");
    var formData = new FormData($('#euform'));
    alert("22222");
    // $.post("/updateUser",formData,function (res) {
    //     alert("333333");
    //    if(res.code==200){
    //        location.reload();
    //    }else{
    //        alert(res.msg);
    //    }
    // });
    $.ajax({
        type: 'post',
        url: '/updateUser',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
                alert("333333");
               if(res.code==200){
                   alert(res.msg);
                   location.reload();
               }else{
                   alert(res.msg);
               }
        }
    });
});

function deluser() {

}


