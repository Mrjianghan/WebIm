/* 初始化 */
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval
});
conn.listen({
    onOpened: function(message) {
        //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green");
        $('.containermain').css({display:'block'});
        $('.containers').css({display:'none'});
        $('.matchtab1').css({display:'block'});
        $('.sendmessage').css({display:'none'});
        var str = '<img class="firstscreen" src="imgs/u13.jpg">';
        $('.matchtab1 .placesholder').html(str);
        $('.matchtab1  .getmessage').css({display:'none'});
        $('.matchtab3').css({display:'none'});
        $('.matchtab2').css({display:'none'});
    },
    onOnline: function() {
        console.log("本机网络连接成功"); //本机网络连接成功
       
    }, //本机网络掉线                  

    onError: function(message) {
        console.log(message);
        console.log("%c 失败回调", 'color:red');

    }, //失败回调

    onTextMessage: function(message) {
        
    }, //收到文本消息

    onEmojiMessage: function(message) {
        

    }, //收到表情消息

    onPictureMessage: function(message) {
        
        

    }, //收到图片消息

    onCmdMessage: function(message) {}, //收到命令消息

    onAudioMessage: function(message) {
        
        console.log('audio');
        
    }, //收到音频消息

    onLocationMessage: function(message) {}, //收到位置消息

    onPresence: function(message) { //收到联系人订阅请求、处理群组、聊天室被踢解散等消息

        switch (message.type) {
            case 'subscribe': // 对方请求添加好友
                break;
            case 'subscribed': // 对方同意添加好友，已方同意添加好友
                break;
            case 'unsubscribe': // 对方删除好友
                console.log('对方刚刚删除了你');
                break;
            case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
                break;
            case 'joinChatRoomSuccess': // 成功加入聊天室
                console.log('join chat room success');
                break;

            case 'joinChatRoomFaild': // 加入聊天室失败
                console.log('join chat room faild');
                break;

            case 'joinPublicGroupSuccess': // 意义待查
                console.log('join public group success', message.from);
                break;
            case 'createGroupACK':
                conn.createGroupAsync({
                    from: message.from,
                    success: function(option) {
                        console.log('Create Group Succeed');
                    }
                });
                break;
        };
    },
}); /* 初始化 */
// 初始化WebRTC Call
    var rtcCall = null;
    
        rtcCall = new WebIM.WebRTC.Call({
            connection: conn,
            mediaStreamConstaints: {
                audio: true,
                video: true
            },
            listener: {
                onAcceptCall: function (from, options) {
                    console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
                },
                onGotRemoteStream: function (stream, streamType) {
                    console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
                    console.log(streamType);
                },
                onGotLocalStream: function (stream, streamType) {
                    console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
                },
                onRinging: function (caller) {
                    //console.log('onRinging::', 'caller:', caller);
                    console.log(caller);
                    var con1 = caller.slice(24,-12);
                    console.log(con1);
                },
                onTermCall: function (reason) {
                    console.log('onTermCall::');
                    console.log('reason:', reason);
                },
                onIceConnectionStateChange: function (iceState) {
                    console.log('onIceConnectionStateChange::', 'iceState:', iceState);
                },
                onError: function (e) {
                    console.log(e);
                }
            }
        });

/* 登录注册功能，退出登录.实际上已废弃  */
    var wrapper1 = function(){
        var name = $('#username').val();
        var psw = $('#psw').val();
        var nname = $('.nickname').val();
        var signin = function() { 
            var options = {
                apiUrl: WebIM.config.apiURL,
                user: name,
                pwd: psw,
                appKey: WebIM.config.appkey
            };
            conn.open(options);
            console.log('登录');
            console.log( name );
            $('.username').html( name );
        };
        signin();
    };
    $('input').on('keydown',function(event){
        if ( event.keyCode==13 ){
            wrapper1();
        }
    });
    $('.submit').on('click', function() {
        var name = $('#username').val();
        var psw = $('#psw').val();
        var nname = $('.nickname').val();
        if ($('.submit').text() == '注册') {
            var reg = function() {
                var options = {
                    username: name,
                    password: psw,
                    nickname: nname,
                    appKey: WebIM.config.appkey,
                success: function() {
                    console.log('注册成功');
            },
            error: function() {
                console.log('注册失败');
            },
            apiUrl: WebIM.config.apiURL
            };
        conn.registerUser(options);
    };   
            reg();
        } else if ($('.submit').text() == '登录') {
            var wrapper = function(){
                var signin = function() {  
                    var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: name,
                    pwd: psw,
                    appKey: WebIM.config.appkey
                    };
                    conn.open(options);
                    console.log('登录');
                    $('.username').html( name );
                };
                signin();
            };
            wrapper();
        }
    });
    
    

 /* 登录注册功能，实际上已废弃  */



/* 登录注册页面切换，实际上已废弃 */

$(function() {
    $('.a1').on('click', function(event) {
        event.preventDefault();
        $('.h1').addClass('hide').siblings('h4').removeClass('hide');
        $('.nickname').css({ display: 'block' });
        $('h2').text('注册');
        $('.third').css({ display: 'block' });
        $('.submit').text('注册');
    });

    $('.a2').on('click', function() {
        $('.nickname').css({ display: 'none' });
        $('h2').text('登录');
        $('.third').css({ display: 'none' });
        $('.h2').addClass('hide').siblings('h4').removeClass('hide');
        $('.submit').text('登录');
    });
});
/* 登录注册页面切换，实际上已废弃 */



/*点击显示.关闭*/

/*退出登录*/

$('.slidedownmenu li:last-child').on('click',function(){
    conn.close();
    $('.containermain').css({display:'none'});
    $('.containers').css({display:'block'});
});


/*退出登录*/


$('.userimg').on('click',function( event ){
    event.stopPropagation();
    $('.slidedownmenu').css({display:'none'});
    $('.slideinfo').css({display:'none'});
    var offX = event.offsetX;
    var offY = event.offsetY;
    console.log( offX );
    console.log( offY );
    $('.infoslidemenu').css({display:'block'});
    $('.infoslidemenu').css({left:offX});
    $('.infoslidemenu').css({top:offY});
    $(window).on('click',function(){
        $('.infoslidemenu').css({display:'none'});
    });
});

//点击头像弹出




var flag = 2;       //点击汉堡包图标消失或显示
$('.floor1 .fa-bars').on('click',function( event ){
    $('.infoslidemenu').css({display:'none'});
    event.stopPropagation();
    if ( flag == 2 ){
        $('.slidedownmenu').css({display:'block'});
        flag = 3;
    } else if ( flag == 3 ) {
        $('.slidedownmenu').css({display:'none'});
        flag = 2;
    };
    $(window).on('click',function(){
        $('.slidedownmenu').css({display:'none'});
        flag = 2;
    });
});                 //点击汉堡包图标消失或显示




//切换tab
$('.floor3 a').on('click',function( event ){
    event.preventDefault();
    let that = $(this);
    let track = that.attr('href');
    let str1 = track.slice(1);
    that.find('.fa').addClass('greenactive');
    that.siblings().find('.fa').removeClass('greenactive');
    $('#' + str1).css({display:'block'});
    $('#' + str1).siblings().css({display:'none'});
    $('.main-right .match' + str1).css({display:'block'});
    $('.main-right .match' + str1).siblings().css({display:'none'});
});


//切换tab






//获取聊天室列表
//获取聊天室
var listRooms = function() {
        var option = {
            apiUrl: 'https://a1.easemob.com',
            pagenum: 1, // 页数
            pagesize: 20, // 每页个数
            success: function(list) {
                //console.log(list);
                var i = 0;
                var str = '';
                for (i in list.data) {
                    let name2 = list.data[i].name; 
                    //console.log(name2);
                    let ids = list.data[i].id;
                    //console.log(ids);
                    str = str + '<div id="'+ name2 +'" class="chatcontainer"><img class='+ ids +' src="imgs/group-1.jpg"><div class="onlyname">'+ name2 +'</div><div class="clearfix"></div></div>';
                };
                $('.chatrooms').html(str);
            },
            error: function() {
                console.log('List chat room error');
            }
        };
        conn.getChatRooms(option);
};
//获取聊天室 


//获取聊天室列表


// 获取好友列表
var getRoasters3 = function () {
    var option = {
        success: function (roster) {
            var str3 = '';
            
            var o;
            
            var l = roster.length;
            
            for ( o = 0; o < l; o++ ) {
                
                var names = roster[o].name;
                
                if ( names != 'undefined' ){
                    
                    //console.log(names);
                    
                    str3 = str3 + '<div id="'+ names +'" class="onlyfriendcontainer"><img src="imgs/zhaoyun-1.jpg"><div class="onlyname">' + names + '</div><div class="clearfix"></div></div>';
                    
                    
                    
                    
                };
            }     //for 循环
            
            $('.friends').html(str3);
            
        }//success
        
    };//option
    
    conn.getRoster(option);
    
};






// 获取好友列表


//获取已加入的群组
var listGroups2 = function () {
        var option = {
            success: function (rooms) {
                //console.log(rooms);
                var str5 = '';
                for ( var i in rooms ){
                    
                    var groupnames = rooms[i].name;
                    
                    str5 = str5 + '<div id="'+ groupnames +'" class="onlygroupcontainer"><img src="imgs/group-1.jpg"><div class="onlyname">' + groupnames + '</div><div class="clearfix"></div></div>';
                }
                $('.groups').html( str5 );
                
            },
            error: function () {
                console.log('List chat rooms error');
            }
        };
        conn.listRooms(option);
    
    
};
//获取已加入的群组

$('.icons3').on('click',function(){
    if ( $('.groups').html()===''||$('.friends').html()==='' ){
        listGroups2();
        getRoasters3();
        var str = '<img class="firstscreen" src="imgs/u13.jpg">';
        $('.matchtab3 .placesholder').html(str);
        $('.matchtab3  .getmessage').css({display:'none'});
    };
});



//切换加载

$('.iconcenter').on('click',function(){
    if ( $('.chatrooms').html()==='' ){
        listRooms();
        var str = '<img class="firstscreen" src="imgs/u13.jpg">';
        $('.matchtab2 .placesholder').html(str);
        $('.matchtab2  .getmessage').css({display:'none'});
        $('.matchtab2 .placesholder').css({display:'block'});
    }
    
    
});
//切换加载

$('.icons1').on('click',function(){
    var str = '<img class="firstscreen" src="imgs/u13.jpg">';
    $('.matchtab1 .placesholder').html(str);
    $('.matchtab1  .getmessage').css({display:'none'});
    $('.sendmessage').css({display:'none'});
});





$('.lists').on('click', '.chatcontainer',function(){
    var that5 = $(this);
    that5.addClass('listsactive');
    that5.siblings().removeClass('listsactive');
    $('.matchtab2 .placesholder').css({display:'none'});
    $('.matchtab2 .getmessage').css({display:'block'});
    var idvalue = $(that5)[0].id;
    
    console.log(that5);
    
    //console.log(that5[0].firstChild.className);
    var ids = that5[0].firstChild.className;
    
    /*var str = '';
    
    str = str + '详细信息' + '<span></span>';
    
    $('.headername').html(str);*/
    
    
    var idvalue = $(that5)[0].id;
    $('.matchtab2 .receiveheader').css({display:'none'});
    
    var str2 = '';
    
    str2 = '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"><div id="'+ idvalue +'" class="justname">'+ idvalue +'</div><button class="joinchatroom" id ="'+ ids +'" type="button">加入此聊天室</button></div>';
    
    $('.chatroomcontainer').html( str2 );
});








$('.receivemessage').on('click','.joinchatroom',function(){
    var that3 = this;
    //console.log(that3);
    
    var ids = $(that3).attr('id');
    //console.log( typeof( ids ) );
    //console.log( $(that3).siblings('.justname').attr('id') );
    var getname = $(that3).siblings('.justname').attr('id');
    var joinRoom = function() {
        // 加入聊天室
        conn.joinChatRoom({
            roomId: ids 
            // 聊天室id,
        });
    };
    //加入聊天室
    joinRoom();
    var nstr = getname +'<span></span>';
    $('.headername').html(nstr);
    $('.sendmessage').css({display:'block'});
    $('.chatroomcontainer').html('');
    $('.send').attr('id',ids);
    $('.chatroomcontainer').attr('id',ids);
    $('.receiveheader').css({display:'block'});
    
    var str2 = '' ;
    str2 = str2 + '<div id="'+ getname +'" class="groupcontainer"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + getname + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';
    
    $('.allchatmessages').prepend(str2);
    
});



//点击锯齿
var target1 = 2;
$('.matchtab1').on('click','.fa-cog',function( event ){
    event.stopPropagation();
    if( target1 == 2 ){
       
        target1 = 3;
        $('.matchtab1 .slideinfo').slideDown(300);
    }else if ( target1 == 3 ){
       
        $('.matchtab1 .slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click',function(){
        $('.matchtab1 .slideinfo').slideUp(500);
        target1 = 2;
});

var target2 = 2;
$('.matchtab2').on('click','.fa-cog',function( event ){
    event.stopPropagation();
    if( target1 == 2 ){
       
        target1 = 3;
        $('.matchtab2 .slideinfo').slideDown(300);
    }else if ( target1 == 3 ){
       
        $('.matchtab2 .slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click',function(){
        $('.matchtab2 .slideinfo').slideUp(500);
        target1 = 2;
});

var target3 = 2;
$('.matchtab3').on('click','.fa-cog',function( event ){
    event.stopPropagation();
    if( target1 == 2 ){
       
        target1 = 3;
        $('.matchtab3 .slideinfo').slideDown(300);
    }else if ( target1 == 3 ){
       
        $('.matchtab3 .slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click',function(){
        $('.matchtab3 .slideinfo').slideUp(300);
        target1 = 2;
});
//点击锯齿








