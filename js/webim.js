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
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
        console.log("%c [opened] 连接已成功建立", "color: green");
        $('.containers').css({ display: 'none' });
        $('.containermain').css({ display: 'block' });
        $('.matchtab1').css({display:'block'});
        $('.matchtab2').css({display:'none'});
        $('.matchtab3').css({display:'none'});
        
        var str = '<img class="firstscreen" src="imgs/u13.jpg">';
        
        $('.matchtab1').html(str);
    },


    onOnline: function() {
        console.log("本机网络连接成功"); //本机网络连接成功
        getRoasters1();
        listGroups();

    }, //本机网络掉线                  

    onError: function(message) {
        console.log(message);
        console.log("%c 失败回调", 'color:red');

    }, //失败回调

    onTextMessage: function(message) {
        console.log( message );
        var gettype = message.type;
        var msg_to = message.to;
        var msg_from = message.from;
        
        
        
        console.log( gettype );
        console.log( msg_from );
        console.log( msg_to );
        //console.log( message.delay );
        //console.log(message.data);
        var part = message.data;
        var delay = message.delay;
        //console.log( delay );
        //var time = delay.slice(11,16);
        
        
        
        /*if ( delay ){
            alert(delay);
        }*/
        
        
        //console.log(time1);
        var strs = '';

        $( '#'+ msg_from + ' ' + '.messagesContainer' ).append(strs);
        if ( gettype == 'chatroom' ) {
            
            //var time1 = String((parseInt(delay.slice(11,13))+8));
            //var time2 = delay.slice(13,16);
            //var time = time1 + time2;
            
            //<div class="timer">'+ time +'</div>
            var str1 = '<div class="messagecontainer"><div class="messageleft"><div class="headpic1"><img src="imgs/dsad-1.jpg"></div><div class="infocontainer"><div class="nickname1">'+ msg_from +'</div><div class="messagecontent">'+ part +'</div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
            $('.messagecontents'+' '+'#'+ msg_to ).append( str1 );
            
        }else if ( gettype == 'chat' ){
            var str2 = '<div class="messagecontainer"><div class="messageleft"><div class="headpic1"><img src="imgs/dsad-1.jpg"></div><div class="infocontainer"><div class="nickname1">'+ msg_from +'</div><div class="messagecontent">'+ part +'</div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
            $('.messagecontents'+' '+'#'+ msg_from ).append( str2 );
        }
        
        
        
        
        
        
        
    }, //收到文本消息

    onEmojiMessage: function(message) {
        var emotype = message.type;
        console.log(emotype);
        console.log(message);
        console.log(message.data);
        
        for (var i = 0; i < message.data.length; i++) {
            var img = message.data[i];
            var string;
            if (img.type == 'txt') { string = string + img.data; } else { string = string + '<img ' + 'src="' + img.data + '" />'; }
        }
        string = string.replace('undefined', '');
        
        
       
        //console.log('<img src="'+ emojidata +'">');
        
        var private_to = message.to;
        
        
        
        
        
        var private_from = message.from;
        var datas = message.data;
        var emojiarr = [];//暂未用到
        
        
        
        parseEmoji(datas);
        
        
        
        var str = '';
        
        
        var str = '<div class="messagecontainer"><div class="messageleft"><div class="headpic1"><img src="imgs/dsad-1.jpg"></div><div class="infocontainer"><div class="nickname1">'+ private_from +'</div><div class="messagecontent">'+ string +'</div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
       
       $( '.messagecontents '+'#'+ private_from).append( str ); 
        
        
        
        

    }, //收到表情消息

    onPictureMessage: function(message) {
        
        console.log(message);

        //console.log('picture');

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
    









//获取好友列表注射进入.lists



// 获取好友列表
var getRoasters1 = function () {
    var option = {
        success: function (roster) {
            var str2 = '';
            var o;
            var l = roster.length;
            for ( o = 0; o < l; o++ ) {
                var names = roster[o].name;
                if ( names != 'undefined' ){
                    //console.log(names);
                    str2 = str2 + '<div id="'+names+'" class="friendcontainer"><div class="friendinfo"><div class="friendinfo-left"><img src="imgs/zhaoyun-1.jpg"></div><div class="friendinfo-right"><div class="friendifrightcontainer"><div class="friendtop"><div class="friendtopleft">' + names +'</div><div class="friendtopright">10:00</div><div class="clearfix"></div></div><div class="friendbottom"><div class="friendbottomleft"> 占位符 </div><div class="friendbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';
                };
            }     //for 循环
            
            $('.friendlists').html(str2);
            
        }//success
        
    };//option
    
    conn.getRoster(option);
    
};            //getRoster1获取列表


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
            
            $('.onlyfriendlists').html(str3);
            
        }//success
        
    };//option
    
    conn.getRoster(option);
    
};  


//点击tab3加载列表
$('.icons3').on('click',function(){
    if( $('.onlygrouplists').html()=='' ){
        
        getRoasters3();
    
        listGroups2();
        $('.matchtab3').css({display:'block'});
        $('.matchtab2').css({display:'none'});
        $('.matchtab1').css({display:'none'});
    }
    
});
//点击tab3加载列表




//getRoster3获取列表

$('.icons1').on('click',function(){
    $('.matchtab1').css({display:'block'});
    $('.matchtab2').css({display:'none'});
    $('.matchtab3').css({display:'none'});
});





//获取好友列表注射进入.lists







//获取已加入的群组
var listGroups = function () {
        var option = {
            success: function (rooms) {
                //console.log(rooms);
                var str4 = '';
                for ( var i in rooms ){
                    var groupnames = rooms[i].name;
                    str4 = str4 + '<div id="'+ groupnames +'" class="groupcontainer"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + groupnames + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';
                }
                $('.grouplists').html( str4 );
            },
            error: function () {
                console.log('List chat rooms error');
            }
        };
        conn.listRooms(option);
};
//获取已加入的群组
$('.iconcenter').on('click',function(){
    if ($('.chatroomlists').html()==''){
    
        listRooms();
        
    var str = '<img class="firstscreen" src="imgs/u13.jpg">';
        
    $('.matchtab2 .chatroomcontainer').html(str);
        $('.matchtab2').css({display:'block'});
        $('.matchtab3').css({display:'none'});
        $('.matchtab1').css({display:'none'});
    }/*else {
              
    }*/
              
});




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
                $('.onlygrouplists').html( str5 );
                
            },
            error: function () {
                console.log('List chat rooms error');
            }
        };
        conn.listRooms(option);
    
    
};
//获取已加入的群组












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
    
    $('.slidedownmenu li:last-child').on('click', function() {

        conn.close();
        
        $('.containers').css({ display: 'block' });

        $('.containermain').css({ display: 'none' });

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
        console.log(this);
    });

    $('.a2').on('click', function() {
        $('.nickname').css({ display: 'none' });
        $('h2').text('登录');
        $('.third').css({ display: 'none' });
        $('.h2').addClass('hide').siblings('h4').removeClass('hide');
        $('.submit').text('登录');
        console.log(this);
    });

});
/* 登录注册页面切换，实际上已废弃 */







$('.lists').on('click','.friendcontainer',function(){
    var that1 = $(this);
    that1.addClass('listsactive');
    that1.siblings().removeClass('listsactive'); that1.parents('.lists').find('.groupcontainer').removeClass('listsactive');
    $('.sendmessage').css({display:'block'});
    $('.receivemessage').css({display:'block'}); 
    var idvalue = $(that1)[0].id;
    console.log(that1);
    var str = '';
    str = str + idvalue + '<span></span><i class="fa fa-caret-down"></i>';
    $('.headername').html(str);
    
});
$('.lists').on('click','.groupcontainer',function(){
    var that2 = $(this);
    console.log(that2);
    that2.addClass('listsactive');
    that2.siblings().removeClass('listsactive'); that2.parents('.lists').find('.friendcontainer').removeClass('listsactive');
    $('.sendmessage').css({display:'block'});
    $('.receivemessage').css({display:'block'});
    console.log($(that2)[0].id);
    var idvalue = $(that2)[0].id;
    console.log(that2);
    var str = '';
    str = str + idvalue + '<span></span><i class="fa fa-caret-down"></i>';
    $('.headername').html(str);
});




$('.lists').on('click','.onlygroupcontainer',function(){
    var that3 = $(this);
    that3.addClass('listsactive');
    that3.siblings().removeClass('listsactive'); that3.parents('.lists').find('.onlyfriendcontainer').removeClass('listsactive');
    $('.receivemessage').css({display:'block'});
    $('.sendmessage').css({display:'none'});
    console.log(that3);
    var str = '';
    str = str + '详细信息' + '<span></span>';
    $('.headername').html(str);
    $('.receiveheader .fa-plus').remove();
    console.log($(that3)[0].id);
    var idvalue = $(that3)[0].id;
    var str2 = '';
    str2 = str2 + '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"><div class="justname">'+ idvalue +'</div><button type="button">发消息</button></div>';
    
    $('.chatroomcontainer').html(str2);
    
});




$('.lists').on('click','.onlyfriendcontainer',function(){
    var that4 = $(this);
    that4.addClass('listsactive');
    that4.siblings().removeClass('listsactive'); that4.parents('.lists').find('.onlygroupcontainer').removeClass('listsactive');
    $('.receivemessage').css({display:'block'});
    $('.sendmessage').css({display:'none'});
    var idvalue = $(that4)[0].id;
    console.log(that4);
    var str = '';
    str = str + '详细信息' + '<span></span>';
    $('.headername').html(str);
    $('.receiveheader .fa-plus').remove();
    var idvalue = $(that4)[0].id;
    var str2 = '';
    str2 = str2 + '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"><div class="justname">'+ idvalue +'</div><button id="'+ idvalue +'" type="button" class="friendbtn">发消息</button></div>';
    
    $('.chatroomcontainer').html(str2);
});


$('.lists').on('click','.chatcontainer',function(){
    
    var that5 = $(this);
    
    that5.addClass('listsactive');
    
    $('.matchtab1').css({display:'none'});
    
    that5.siblings().removeClass('listsactive');
    
    $('.receivemessage').css({display:'block'});
    
    $('.sendmessage').css({display:'none'});
    
    var idvalue = $(that5)[0].id;
    
    console.log(that5);
    
    //console.log(that5[0].firstChild.className);
    var ids = that5[0].firstChild.className;
    
    var str = '';
    
    str = str + '详细信息' + '<span></span>';
    
    $('.headername').html(str);
    
    $('.receiveheader .fa-plus').remove();
    
    var idvalue = $(that5)[0].id;
    
    var str2 = '';
    
    str2 = '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"><div id="'+ idvalue +'" class="justname">'+ idvalue +'</div><button class="joinchatroom" id ="'+ ids +'" type="button">加入此聊天室</button></div>';
    
    $('.chatroomcontainer').html( str2 );
    
    
});







//获取聊天室
var listRooms = function() {
        var option = {
            apiUrl: 'https://a1.easemob.com',
            pagenum: 1, // 页数
            pagesize: 40, // 每页个数
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
                $('.chatroomlists').html(str);
            },
            error: function() {
                console.log('List chat room error');
            }
        };
        conn.getChatRooms(option);
};
//获取聊天室    

//点击聊天室加入

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
            // 聊天室id,此处测试为固定值，实际项目中，是变量
        });
        
    };
    //加入聊天室
    joinRoom();
    
    var nstr = getname +'<span></span><i class="fa fa-caret-down"></i>';
    $('.headername').html(nstr);
    
    $('.sendmessage').css({display:'block'});
    
    $('.chatroomcontainer').html('');
        
    $('.send').attr('id',ids);
    
    $('.chatroomcontainer').attr('id',ids);
    $('.receiveheader').css({display:'block'});
    
    
    //退出该聊天室
    var quitbtn = '<button class="quitchatroom" type="button">退出该聊天室</button>';
    
    $('.slidecontainer').html(quitbtn);
    
    var quitRoom = function () {
        // 退出聊天室
        conn.quitChatRoom({
            roomId: ids // 聊天室id
        });
    };
    
    $('.quitchatroom').on('click',function(){
        quitRoom();
        $('.chatroomcontainer').attr('id','');
    });
    
    
    
    
    
    
    
    
    
    //退出该聊天室 
});


//单人好友聊天


$('.receivemessage').on('click','.friendbtn',function(){
    var that7 = this;
    console.log(that7);
    var idname = $(that7).attr('id');
    
    
    var nstr = idname +'<span></span><i class="fa fa-caret-down"></i>';
    $('.headername').html(nstr);
    $('.sendmessage').css({display:'block'});
    $('.chatroomcontainer').html('');
    $('.send').attr('id',idname);
    $('.chatroomcontainer').attr('id',idname);
    
    var quitbtn = '<button class="deletefriend" type="button">好友</button>';
    
    $('.slidecontainer').html(quitbtn);
    
    $('.receiveheader').css({display:'block'});
    
});


//单人好友聊天




$('.sendmessage').on('click','.send',function(){
    
    
    
    if ( $('.chatcontainer').hasClass('listsactive') ){
        var ids = $('.send').attr('id');
        
        var chatroommsg = $('.writein')[1].value;
        console.log(ids); 
        console.log(chatroommsg);
                // 聊天室发送文本消息
        var sendRoomText = function () {
            var id = conn.getUniqueId();         // 生成本地消息id
            var msg = new WebIM.message('txt', id); // 创建文本消息
            var option = {
                msg: chatroommsg,          // 消息内容
                to: ids,               // 接收消息对象(聊天室id)
                roomType: true,
                chatType: 'chatRoom',
                success: function () {
                    console.log('send room text success');
                    $('.writein')[1].value = '';
                    var str3 = '';
                    str3 = '<div class="messagecontainer"><div class="messageright"><div class="headpic2"><img src="imgs/girl.jpg"></div><div class="messagecontent1">'+chatroommsg+'</div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
                    $('.chatroomcontainer').append( str3 );
                    
                },
                fail: function () {
                    console.log('failed');
                }
            };
            msg.set(option);
            msg.setGroup('groupchat');
            conn.send(msg.body);
        };
        // 聊天室发送文本消息
        sendRoomText();
    }else if ($('.onlyfriendcontainer').hasClass('listsactive')  ){
        var chatroommsg = $('.writein')[1].value;
        var friendname = $('.send').attr('id');
                      // 单聊发送文本消息
        var sendPrivateText = function () {
            var id = conn.getUniqueId();                 // 生成本地消息id
            var msg = new WebIM.message('txt', id);      // 创建文本消息
            msg.set({
                msg: chatroommsg,                  // 消息内容
                to: friendname,                          // 接收消息对象（用户id）
                roomType: false,
                success: function (id, serverMsgId) {
                    console.log('send private text Success');
                    $('.writein')[1].value = '';
                    var str3 = '';
                    str3 = '<div class="messagecontainer"><div class="messageright"><div class="headpic2"><img src="imgs/girl.jpg"></div><div class="messagecontent1">'+chatroommsg+'</div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
                    $('.chatroomcontainer').append( str3 );
                }
            });
            msg.body.chatType = 'singleChat';
            conn.send(msg.body);
        };
        sendPrivateText();
    }
    
});














//点击聊天室加入










var flag = 2;       //点击汉堡包图标消失或显示
$('.fa-bars').on('click',function( event ){
    $('.infoslidemenu').css({display:'none'});
    $('.slideinfo').css({display:'none'});
    $('.headername .fa').attr('class','fa fa-caret-down');
    event.stopPropagation();
    if ( flag == 2 ){
        $('.slidedownmenu').css({display:'block'});
        flag = 3;
    } else if ( flag == 3 ) {
        $('.slidedownmenu').css({display:'none'});
        flag = 2;
    };
    $(document).on('click',function(){
        $('.slidedownmenu').css({display:'none'});
        flag = 2;
    });
});                 //点击汉堡包图标消失或显示









//聊天页面三角形变化
var target1 = 2;
$('.receiveheader').on('click','.headername .fa',function( event ){
    event.stopPropagation();
    if( target1 == 2 ){
       $(this).attr('class','fa fa-caret-up');
        target1 = 3;
        $('.slideinfo').slideDown(300);
    }else if ( target1 == 3 ){
       $(this).attr('class','fa fa-caret-down');
        $('.slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click',function(){
        $('.slideinfo').slideUp(500);
        $('.headername .fa').attr('class','fa fa-caret-down');
        target1 = 2;
});



//聊天页面三角形变化






//tab切换

$('.floor3 a').on('click',function( event ){
    event.preventDefault();
    let that = $(this);
    let track = that.attr('href');
    let str1 = track.slice(1);
    that.find('.fa').addClass('greenactive');
    that.siblings().find('.fa').removeClass('greenactive');
    $('#' + str1).css({display:'block'});
    $('#' + str1).siblings().css({display:'none'});
});

//tab切换


//点击头像弹出
$('.userimg').on('click',function( event ){
    $('.slidedownmenu').css({display:'none'});
    $('.slideinfo').css({display:'none'});
    $('.headername .fa').attr('class','fa fa-caret-down');
    event.stopPropagation();
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

