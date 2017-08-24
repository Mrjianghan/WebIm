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
    onOpened: function (message) {
        //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green");
        $('.containermain').css({
            display: 'block'
        });
        $('.containers').css({
            display: 'none'
        });
        $('.matchtab1').css({
            display: 'block'
        });
        $('.sendmessage').css({
            display: 'none'
        });
        var str = '<img class="firstscreen" src="imgs/u13.png">';
        $('.matchtab1 .placesholder').html(str);
        $('.matchtab1  .getmessage').css({
            display: 'none'
        });
        $('.matchtab3').css({
            display: 'none'
        });
        $('.matchtab2').css({
            display: 'none'
        });
        $('#tab1').css({
            display: 'block'
        });
        $('#tab2').css({
            display: 'none'
        });
        $('#tab3').css({
            display: 'none'
        });
       

    },
    onOnline: function () {
        console.log("本机网络连接成功"); //本机网络连接成功

    }, //本机网络掉线                  

    onError: function (message) {
        console.log('失败回调'+message);
        console.log("%c 失败回调", 'color:red');

    }, //失败回调

    onTextMessage: function (message) {
        var gettype = message.type;
        var msg_to = message.to;
        var msg_from = message.from;
        var textcontent = message.data;
        var delay = message.delay;
        console.log(message);

        if (gettype == 'chatroom') {
            //console.log(msg_from);
            //console.log(msg_to);
            //console.log(delay);
            //console.log(gettype);

            if ($('#' + msg_to + '.everychatroom  .mainmessagecontainer1').css('display') === 'block') {
                


                var str1 = '<div id="'+textcontent+'" class="messagecontainer"><img src="imgs/dsad-1.jpg" class="leftpic"><div class="nickname1">' + msg_from + '</div><div class=" messagecontent messagecontent1">' + textcontent + '</div><div class="clearfix"></div><div class="messagecontrol"><div class="message1 messagebor">复制</div><div class="message1 messagebor" >转发</div><div class="message1">删除</div></div></div></div>';


                $('#' + msg_to + '.everychatroom .mainmessagecontainer1').append(str1);
                
                
                
                
                var str2 = msg_from +':'+ textcontent;
                $('.lists [data-nid="'+msg_to+'"].groupcontainer .groupbottomleft').html(str2);
                
                
                function messagetobottom (){
                    var obj1 = $('.matchtab2  .exists.scrollbar-macosx')[0];
                    
                    //var hei = obj1.scrollHeight;
                    var cli = obj1.clientHeight;
                    
                    var hei = $('.matchtab2'+' #'+msg_to+'.everychatroom')[0].scrollHeight;
                    $('.matchtab2  .exists.scrollbar-macosx').scrollTop( hei-cli );
                }
                //接收消息滚到最下面
                messagetobottom();
            }








        }






    }, //收到文本消息

    onEmojiMessage: function (message) {
        var emotype = message.type;
        console.log('emoji');
        console.log(message);
        console.log(emotype);
        
        var msg_to = message.to;
        var datas = message.data;
        
        
        
        
        
        
        console.log(message.data);
        
        if (emotype == 'chatroom') { 
        
        
        
            for (var i = 0; i < message.data.length; i++) {

                var img = message.data[i];

                var string;

                if (img.type == 'txt') {
                    string = string + img.data;
                } else {
                    string = string + '<img ' + 'src="' + img.data + '" />';
                }



            }
            string = string.replace('undefined', '');

            console.log( string );

            parseEmoji(datas);

            console.log( parseEmoji(datas) );

            console.log( string );
        
        
            var str3 = '<div id="11" class="messagecontainer">'+  string +'</div>';


            $('#' + msg_to + '.everychatroom .mainmessagecontainer1').append(str3);
        
            var strsss = '<div id="'+textcontent+'" class="messagecontainer"><img src="imgs/dsad-1.jpg" class="leftpic"><div class="nickname1">' + msg_from + '</div><div class=" messagecontent messagecontent1">' + textcontent + '</div><div class="clearfix"></div><div class="messagecontrol"><div class="message1 messagebor">复制</div><div class="message1 messagebor" >转发</div><div class="message1">删除</div></div></div></div>';
        
        }
        
        
        
        
        
        
        
        
        
        
        
   


    }, //收到表情消息

    onPictureMessage: function (message) {



    }, //收到图片消息

    onCmdMessage: function (message) {}, //收到命令消息

    onAudioMessage: function (message) {

        //console.log('audio');

    }, //收到音频消息

    onLocationMessage: function (message) {}, //收到位置消息

    onPresence: function (message) { //收到联系人订阅请求、处理群组、聊天室被踢解散等消息

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
                    success: function (option) {
                        console.log('Create Group Succeed');
                    }
                });
                break;
        }
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
            var con1 = caller.slice(24, -12);
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
var wrapper1 = function () {
    var name = $('#username').val();
    var psw = $('#psw').val();
    var nname = $('.nickname').val();
    var signin = function () {
        var options = {
            apiUrl: WebIM.config.apiURL,
            user: name,
            pwd: psw,
            appKey: WebIM.config.appkey
        };
        conn.open(options);
        console.log('登录');
        console.log(name);
        $('.username').html(name);
        $('.username').attr('id',name);
    };
    signin();
};
$('input').on('keydown', function (event) {
    if (event.keyCode == 13) {
        wrapper1();
    }
});
$('.submit').on('click', function () {
    var name = $('#username').val();
    var psw = $('#psw').val();
    var nname = $('.nickname').val();
    if ($('.submit').text() == '注册') {
        var reg = function () {
            var options = {
                username: name,
                password: psw,
                nickname: nname,
                appKey: WebIM.config.appkey,
                success: function () {
                    console.log('注册成功');
                },
                error: function () {
                    console.log('注册失败');
                },
                apiUrl: WebIM.config.apiURL
            };
            conn.registerUser(options);
        };
        reg();
    } else if ($('.submit').text() == '登录') {
        var wrapper = function () {
            var signin = function () {
                var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: name,
                    pwd: psw,
                    appKey: WebIM.config.appkey
                };
                conn.open(options);
                console.log('登录');
                $('.username').html(name);
                $('.username').attr('id',name);
            };
            signin();
        };
        wrapper();
    }
});



/* 登录注册功能，实际上已废弃  */



/* 登录注册页面切换，实际上已废弃 */

$(function () {
    $('.a1').on('click', function (event) {
        event.preventDefault();
        $('.h1').addClass('hide').siblings('h4').removeClass('hide');
        $('.nickname').css({
            display: 'block'
        });
        $('h2').text('注册');
        $('.third').css({
            display: 'block'
        });
        $('.submit').text('注册');
    });

    $('.a2').on('click', function () {
        $('.nickname').css({
            display: 'none'
        });
        $('h2').text('登录');
        $('.third').css({
            display: 'none'
        });
        $('.h2').addClass('hide').siblings('h4').removeClass('hide');
        $('.submit').text('登录');
    });
});
/* 登录注册页面切换，实际上已废弃 */



/*点击显示.关闭*/

/*汉堡图标点击退出登录*/


$('.slidedownmenu li:last-child').on('click', function () {
    conn.close();
    $('.containermain').css({
        display: 'none'
    });
    $('.containers').css({
        display: 'block'
    });
});
/*退出登录*/

//汉堡图标点击后显示的内容
$('.slidedownmenu li:first-child').on('click', function () {
    $('.transparent').css({
        display: 'block'
    });
});


$('.transparent .fa-times').on('click', function () {
    $('.transparent').css({
        display: 'none'
    });
});
//汉堡图标点击后显示的内容



$('.userimg').on('click', function (event) {
    event.stopPropagation();
    $('.slidedownmenu').css({
        display: 'none'
    });
    $('.slideinfo').css({
        display: 'none'
    });
    var offX = event.offsetX;
    var offY = event.offsetY;
    console.log(offX);
    console.log(offY);
    $('.infoslidemenu').css({
        display: 'block'
    });
    $('.infoslidemenu').css({
        left: offX
    });
    $('.infoslidemenu').css({
        top: offY
    });
    $(window).on('click', function () {
        $('.infoslidemenu').css({
            display: 'none'
        });
    });
});

//点击头像弹出




var flag = 2; //点击汉堡包图标消失或显示
$('.floor1 .fa-bars').on('click', function (event) {
    event.stopPropagation();
    $('.infoslidemenu').css({
        display: 'none'
    });
    if (flag == 2) {
        $('.slidedownmenu').css({
            display: 'block'
        });
        flag = 3;
    } else if (flag == 3) {
        $('.slidedownmenu').css({
            display: 'none'
        });
        flag = 2;
    }
    $(window).on('click', function () {
        $('.slidedownmenu').css({
            display: 'none'
        });
        flag = 2;
    });
}); //点击汉堡包图标消失或显示




//切换tab
$('.floor3 a').on('click', function (event) {
    event.preventDefault();
    let that = $(this);
    let track = that.attr('href');
    let str1 = track.slice(1);
    that.find('.fa').addClass('greenactive');
    that.siblings().find('.fa').removeClass('greenactive');
    $('#' + str1).css({
        display: 'block'
    });
    $('#' + str1).siblings().css({
        display: 'none'
    });
    $('.main-right .match' + str1).css({
        display: 'block'
    });
    $('.main-right .match' + str1).siblings().css({
        display: 'none'
    });
});


//切换tab






//获取聊天室列表
//获取聊天室
var listRooms = function () {
    var option = {
        apiUrl: 'https://a1.easemob.com',
        pagenum: 1, // 页数
        pagesize: 100, // 每页个数
        success: function (list) {
            //console.log(list);
            var i = 0;
            var str = '';
            for (i in list.data) {
                let name2 = list.data[i].name;
                //console.log(name2);
                let ids = list.data[i].id;
                //console.log(ids);
                str = str + '<div id="' + name2 + '" class="chatcontainer"><img class=' + ids + ' src="imgs/group-1.jpg"><div class="onlyname">' + name2 + '</div><div class="clearfix"></div></div>';
            };
            $('.chatrooms').html(str);
        },
        error: function () {
            console.log('List chat room error');
        }
    };
    conn.getChatRooms(option);
};
//获取聊天室 

















//获取聊天室列表


// 获取好友列表






// 获取好友列表


//获取已加入的群组
var listGroups2 = function () {
    var option = {
        success: function (rooms) {
            //console.log(rooms);
            var str5 = '';
            for (var i in rooms) {
                //console.log(rooms[i].roomId);
                var groupnames = rooms[i].name;
                var groupnumber = rooms[i].roomId;
                str5 = str5 + '<div data-id="' + groupnumber + '" id="' + groupnames + '" class="onlygroupcontainer"><img src="imgs/group-1.jpg"><div class="onlyname">' + groupnames + '</div><div class="clearfix"></div></div>';
            }
            $('.groups .groupinner').html(str5);
        },
        error: function () {
            console.log('List chat rooms error');
        }
    };
    conn.listRooms(option);


};
//获取已加入的群组








function getRoasters1() {
    var option = {
        success: function (roster) {
            var o;
            var arrin=[];
            var l = roster.length;
            console.log(roster);
            var str = '';
            for (o = 0; o < l; o++) {
                var state = roster[o].subscription;
                var names = roster[o].name;
                
                if ( state == 'both' ) {
                    arrin.push(names);
                    
                    str = str + '<div id="'+names+'" class="sort_list"><div class="num_logo"><img src="imgs/zhaoyun-1.jpg" alt=""></div><div class="num_name">'+ names +'</div></div>';
                    
                };
            }
            console.log(str);
            $('.friends .sort_box').html(str);
            initials();
           
            
        } //success
        
         
    }; //option
    conn.getRoster(option);
    //initials();
    
    
};
        





$('.icons3').on('click', function () {
    var str = '<img class="firstscreen" src="imgs/u13.png">';
    $('.matchtab3 .placesholder').html(str);
    $('.matchtab3  .getmessage').css({
        display: 'none'
    });
    $('.sendmessage').css({
        display: 'none'
    });
    
    getRoasters1();
    
});



function getRoasters2() {
        var option = {
            success: function (roster) {
                var o;
                var l = roster.length;
                console.log(roster);
                var str10 = '';
                
                for (o = 0; o < l; o++) {
                    var state = roster[o].subscription;
                    var names = roster[o].name;

                    if ( state == 'both' ) {
                        
                        
                        

                        str10 = str10 +'<div id="'+names+'" class="sort_list1"><input @click="alert5" class="trans2input" type="checkbox" ><div class="num_logo"><img src="imgs/zhaoyun-1.jpg" alt=""></div><div class="num_name">'+ names +'</div></div>';

                    };
                }
                
                console.log(str10);

                $('.friendcontainer2-2 .sort_box1').html(str10);
                
                
                initials1();
                
                

            } //success
        }; //option
        conn.getRoster(option);
        //initials1();
    
    
    };



$('.tab1peoples').on('click','.plushumans',function(){
    getRoasters2();
    
});



$('.deletehumans').on('click',function(){
    console.log(this);
    var that = this;
    console.log($(that).parents('.scroll-wrapper.slideinfo'));
    console.log($(that).parents('.scroll-wrapper.slideinfo').siblings('.groupmanager1').attr('id'));
    var idnumber = $(that).parents('.scroll-wrapper.slideinfo').siblings('.groupmanager1').attr('id');
    
    function queryroommember3() {
        var member = '';
        var blankarr=[];
        conn.queryRoomMember({
            roomId: idnumber,
            success: function (members) {
                var membername = '';
                console.log(members);
                console.log(members.length);
                for (var o in members) {
                    member = members[o];
                    console.log(member);
                    //console.log(member.jid);
                    console.log(member.jid.slice(24,-12));
                    membername = membername + member.jid.slice(24,-12);
                    blankarr.push(member.jid.slice(24,-12));
                }
            console.log( blankarr );
            //vm.list3 = blankarr;
            vm.trans3=true;
                
            
                
            }
        });
            
    };
    queryroommember3();
    
    
});








var listRooms2 = function () {
    var option = {
        apiUrl: 'https://a1.easemob.com',
        pagenum: 2, // 页数
        pagesize: 100, // 每页个数
        success: function (list) {
            //console.log(list);
            var i = 0;
            var str = '';
            for (i in list.data) {
                let name2 = list.data[i].name;
                //console.log(name2);
                let ids = list.data[i].id;
                //console.log(ids);
                str = str + '<div id="' + name2 + '" class="chatcontainer"><img class=' + ids + ' src="imgs/group-1.jpg"><div class="onlyname">' + name2 + '</div><div class="clearfix"></div></div>';
            };
            $('.chatrooms').html(str);
            
            return false;
            
        },
        error: function () {
            console.log('List chat room error');
        }
    };
    conn.getChatRooms(option);
};









//切换加载

$('.iconcenter').on('click', function () {
    if ($('.chatrooms').html() === '') {
        listRooms();
        var str = '<img class="firstscreen" src="imgs/u13.png">';
        $('.matchtab2 .placesholder').html(str);
        $('.matchtab2  .getmessage').css({
            display: 'none'
        });

    } else {
        /*$('.sendmessage').css({display:'none'});*/
    }
    
    //console.log($('#tab2 .chatrooms'));
    //console.log( $('#tab2 .chatrooms').html()=='' );
    var outer = $('.lists.scroll-content')[0];
    //console.log(outer);
    
    
    
    //AJAX加载聊天室列表


    $('.lists.scroll-content').on('scroll',function(){
        var jqtop1 = $('.lists.scroll-content').scrollTop();
        var cli2 = $('.lists.scroll-content')[0].clientHeight;
        var hei2 = $('.lists.scroll-content')[0].scrollHeight;
        //console.log( cli2 );
        //console.log( hei2 );
        if ( jqtop1 == hei2-cli2 ){
            //listRooms2();
            //有问题暂时保留
        }
    });

    //AJAX加载聊天室列表
    
});
//切换加载



//发送消息




$('.send').on('click',function(){
    
    
    
    function messagetobottom (){
        var obj1 = $('.matchtab2  .exists.scrollbar-macosx')[0];
        
        var cli = obj1.clientHeight;
                    
        var hei = $('.matchtab2'+' #'+chatroomid+'.everychatroom')[0].scrollHeight;
                    
        //console.log( $('.matchtab2'+' #'+msg_to+'.everychatroom') );
                    
        //console.log( hei );
        //console.log( cli );
        $('.matchtab2  .exists.scrollbar-macosx').scrollTop( hei-cli );
                    
    };
    
    
    
    
    var mes1 = $('.writein.scrollbar-macosx')[1].value;
    if ( mes1!='' ){
        
        var chatroomid = $('.send').attr('id');
        
        var sendRoomText = function () {
            var id = conn.getUniqueId();         // 生成本地消息id
            var msg = new WebIM.message('txt', id); // 创建文本消息
            var option = {
                msg: mes1,          // 消息内容
                to: chatroomid,               // 接收消息对象(聊天室id)
                roomType: true,
                chatType: 'chatRoom',
                success: function () {
                    console.log('send room text success');
                    var str1 = '<div id="' + mes1 + '" class="messagecontainer"><img src="imgs/dsad-1.jpg" class="rightpic"><div class=" messagecontent messagecontent2">' + mes1 + '</div><div class="clearfix"></div><div class="messagecontrol"><div class="message1 messagebor">复制</div><div class="message1 messagebor">转发</div><div class="message1">删除</div></div></div></div>';


                    $('.matchtab2  #'+chatroomid+'.everychatroom  .mainmessagecontainer1').append(str1);
                    $('.writein.scrollbar-macosx').val('');
                    messagetobottom();


                    var str2 = mes1;
                    $('.lists [data-nid="'+ chatroomid +'"].groupcontainer .groupbottomleft').html(str2);



                },
                fail: function () {
                    console.log('failed');
                }
            };
            msg.set(option);
            msg.setGroup('groupchat');
            conn.send(msg.body);
        };
        
        var sendGroupText = function () {
            var id = conn.getUniqueId();            // 生成本地消息id
            var msg = new WebIM.message('txt', id); // 创建文本消息
            var option = {
                msg: mes1,             // 消息内容
                to: 'group id',                     // 接收消息对象(群组id)
                roomType: false,
                chatType: 'chatRoom',
                success: function () {
                    console.log('send room text success');
                },
                fail: function () {
                    console.log('failed');
                }
            };
            msg.set(option);
            msg.setGroup('groupchat');
            conn.send(msg.body);
        };
        
        
        
        
        
        
        
        
        
        
        
        
        // 群组发送文本消息
    

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if ( $('.matchtab2 '+'#'+chatroomid+'.everychatroom'+'  .mainmessagecontainer1').css('display') == 'block' ) {
            sendRoomText();
        }
    }
});












//发送消息














$('.icons1').on('click', function () {
    var str = '<img class="firstscreen" src="imgs/u13.png">';
    $('.matchtab1 .placesholder').html(str);
    $('.matchtab1  .getmessage').css({
        display: 'none'
    });
    $('.sendmessage').css({
        display: 'none'
    });
});



$('.lists').on('click', '.sort_list', function () {
    var that2 = this;
    
    console.log(that2);
    console.log($(that2).attr('id'));
    var ids = $(that2).attr('id');
    $(that2).addClass('listsactive');
    $(that2).siblings().removeClass('listsactive');
    $(that2).parents('.friends').siblings().find('.onlygroupcontainer').removeClass('listsactive');
    $('.matchtab3 .placesholder').css({
        display: 'none'
    });
    $('.matchtab3 .getmessage').css({
        display: 'block'
    });


    var str2 = '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"> <div class="justname">' + ids + '</div><button id ="' + ids + '"  type="button">发消息</button></div>';

    $('.matchtab3 .getmessage').html(str2);

});

$('.matchtab3').on('click', 'button', function () {
    //console.log(this);
    var that4 = this;
    var ids = $(that4).attr('id');//名字 
    var cid = $(that4).attr('data-bid');//数字
    $('.matchtab3').css({
        display: 'none'
    });
    $('.matchtab1').css({
        display: 'block'
    });
    $('#tab1').css({
        display: 'block'
    });
    $('#tab3').css({
        display: 'none'
    });
    $('.icons .fa-commenting').addClass('greenactive');
    $('.floor3 .fa-users').removeClass('greenactive');
    $('.matchtab1 .placesholder').css({
        display: 'none'
    });
    $('.sendmessage').css({
        display: 'block'
    });
    $('.send').attr('id',cid);


    if ($('.allchatmessages [data-nid="' + cid + '"]').length < 1) {

        //判断是否有重复

        var str2 = '';
        str2 = str2 + '<div data-nid="' + cid + '" id="' + ids + '" class="groupcontainer listsactive"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + ids + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';

        $('.allchatmessages').prepend(str2);

        $('[data-nid="' + cid + '"]').siblings().removeClass('listsactive');
        
        
        
        var str4 ='';
        
        str4 = str4 + '<div data-id="' + ids + '" id="' + cid + '" class="receiveheader"><div class="headername">' + ids + '</div><i class="fa fa-plus"></i><div class="clearfix"></div></div>';
        $('.matchtab1 .headers').prepend(str4);
        $('.matchtab1 #' + cid + '.receiveheader').css({display:'block'});
        $('.matchtab1 #'+ cid + '.receiveheader').siblings().css({display:'none'});
        var str5 = '<div id="' + cid + '" class="everychatroom"><div class="chatroominfo"></div><div class="mainmessagecontainer1"></div></div>';
        $('.matchtab1 .exists.scroll-content').prepend(str5);
        $('.matchtab1 #' + cid + '.everychatroom').css({display:'block'});
        $('.matchtab1 #'+ cid + '.everychatroom').siblings().css({display:'none'});
        
        
        
        
        
        
        
        
        


    } else {
        $('.allchatmessages [data-nid="' + cid + '"]').remove();
        var str3 = '';
        str3 = str3 + '<div data-nid="' + cid + '" id="' + ids + '" class="groupcontainer listsactive"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + ids + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';
        $('.allchatmessages').prepend(str3);
        $('[data-nid="' + cid + '"]').siblings().removeClass('listsactive');
    }
});



$('.lists').on('click', '.onlygroupcontainer', function () {
    var that3 = this;
    //console.log(that3);
    var ids = $(that3).attr('id');
    console.log(ids);
    var bid = $(that3).attr('data-id');
    $(that3).addClass('listsactive');
    $(that3).siblings().removeClass('listsactive'); $(that3).parents('.groups').siblings().find('.sort_list').removeClass('listsactive');
    var str2 = '<div class="justtowatch"><div class="groupmember3"></div> <div class="justname">' + ids + '</div><button data-bid="' + bid + '" id ="' + ids + '" class="groupbtn"  type="button">发消息</button></div>';
    $('.matchtab3 .getmessage').html(str2);
    $('.matchtab3 .placesholder').css({
        display: 'none'
    });
    $('.matchtab3 .getmessage').css({
        display: 'block'
    });
    
   
    
});


//获取群组成员团


$('.matchtab3').on('click','.groupbtn',function(){
    var that1 = this; 
    var idnumber = $(that1).attr('data-bid');
    var idname = $(that1).attr('id');
    console.log( idnumber );
    console.log( idname );
    
    $('.groupmanager1').attr('id',idnumber);
    
    function querygroupinfo3() {
        conn.queryRoomInfo({
            roomId: idnumber,
            success: function (settings, members, fields) {
                console.log('settings: ', settings);
                console.log('members: ', members);
                console.log('fields: ', fields);
                console.log(fields.owner);
                if ( fields.owner== $('.username').attr('id') ){
                    //$('[data-id="'+ ids +'"] i').attr('class','fa fa-plus');
                    
                    //console.log( $('[id="'+ idnumber +'"].receiveheader .fa') );
                    
                    vm.ifornot = true;
                    
                    $('[id="'+ idnumber +'"].receiveheader .fa').attr('class','fa fa-cog');
                }else {
                    vm.ifornot = false;
                }
                
                
            },
            error: function () {
                console.log('Error!');
            }
        });
    };
    
    querygroupinfo3();
  
    
});
//获取群组成员团

var target1 = 2;
$('.matchtab1').on('click','.fa-plus',function(event){
    event.stopPropagation();
    if (target1 == 2) {
        target1 = 3;
        $('.matchtab1 .slideinfo').slideDown(300);
    } else if (target1 == 3) {

        $('.matchtab1 .slideinfo').slideUp(300);
        target1 = 2;
    }
    
    
    
});










//清屏聊天信息


$('.matchtab2').on('contextmenu','.mainmessagecontainer1',function(event){
    event.preventDefault();
    event.stopPropagation();
    var that3 = this;
    var idd= $(that3).parents('.everychatroom').attr('id');
    
    var x = event.clientX-150;
    var y = event.clientY;
    console.log(event);
    $('.clearmessages').css({display:'block'});
    $('.clearmessages').css({left:x});
    $('.clearmessages').css({top:y});
    $('.clearmessages').attr('id',idd);
    
    $(window).on('click',function(){
        $('.clearmessages').css({display:'none'});
    });
    
});

$('.clearmessages').on('click',function(){
    console.log( $(this).attr('id') );
    var idnumber =  $(this).attr('id');
    $('#'+idnumber+'.everychatroom  .messagecontainer').remove();
})


//清屏聊天信息





//处理聊天消息

$('.matchtab2').on('click','.messagecontent',function(event){
    //console.log(event);
    event.stopPropagation();
    //console.log(this);
    
    //console.log($(this).html());
    $(this).parents('.messagecontainer').find('.messagecontrol').css({display:'block'});
    
    $(this).parents('.messagecontainer').siblings().find('.messagecontrol').css({display:'none'});
    
    
    
    var x = event.screenX+50;
    var y = event.screenY-100;
    
    $(this).parents('.messagecontainer').find('.messagecontrol').css({left:x});
    $(this).parents('.messagecontainer').find('.messagecontrol').css({top:y});
    $(window).on('click',function(){
        $('.messagecontrol').css({display:'none'});
    });
    
    
});


//删除消息
$('.matchtab2').on('click','.message1:last-child',function(){
    console.log( $(this).parents('.messagecontainer') );
    $(this).parents('.messagecontainer').remove();
    
    
    
    
});



var listGroups3 = function () {
    var option = {
        success: function (rooms) {
            //console.log(rooms);
            var str5 = '';
            for (var i in rooms) {
                //console.log(rooms[i].roomId);
                var groupnames = rooms[i].name;
                var groupnumber = rooms[i].roomId;
                str5 = str5 + '<div data-id="' + groupnumber + '" id="' + groupnames + '" class="onlygroupcontainer"><input  class="groupcheck" type="checkbox" value="'+ groupnames +'"><img src="imgs/group-1.jpg"><div class="onlyname">' + groupnames + '</div><div class="clearfix"></div></div>';
                
            }
           
            $('.transparent1 .groupcontainer2').append(str5);
            
            $('input.groupcheck').attr('v-model',"list");
            





        },
        error: function () {
            console.log('List chat rooms error');
        }
    };
    conn.listRooms(option);


};
//获取已加入的群组




















//转发消息
$('.matchtab2').on('click','.message1:nth-child(2)',function(){
    $('.transparent1').css({display:'block'});
    //listGroups3();
    //getRoasters3();
    //$('.transferselect.scroll-content').html();
    
    
    
});


 


$('.transparent1').on('click','.fa-times',function(){
    $('.transparent1').css({display:'none'});
    
});




//处理聊天消息

$('.matchtab2').on('click',' .receiveheader .fa-cog',function(event){
    event.stopPropagation();
    console.log(this);
    $('.chatroommanager').css({display:'block'});
    $(window).on('click',function(){
        $('.chatroommanager').css({display:'none'});
    });
});





$('.lists').on('click', '.chatcontainer', function () {
    var that5 = $(this);
    that5.addClass('listsactive');
    that5.siblings().removeClass('listsactive');
    var idvalue = $(that5)[0].id;
    //console.log(that5);
    var ids = that5[0].firstChild.className;
    //console.log(idvalue);
    //console.log(ids);

    //$('.send').attr('id',ids);
    $('.writein').val('');

    $('.matchtab2 .placesholder').css({
        display: 'none'
    });




    var str1 = '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"><div id="' + idvalue + '" class="justname">' + idvalue + '</div><button class="joinchatroom" data-id="' + idvalue + '" id ="' + ids + '" type="button">加入此聊天室</button></div>';



    var str2 = '<div data-id="' + idvalue + '" id="' + ids + '" class="receiveheader"><div class="headername">' + idvalue + '</div><i class="fa fa-plus"></i><div class="clearfix"></div></div>';




    var str3 = '<div id="' + ids + '" class="everychatroom"><div class="chatroominfo"></div><div class="mainmessagecontainer1"></div></div>';


    if ($('.exists #' + ids + '.everychatroom').length < 1) {
        //第一次点击
        $('.matchtab2 .exists.scroll-content').append(str3);

        $('#' + ids + '.everychatroom').css({
            display: 'block'
        });

        $('#' + ids + '.everychatroom').siblings().css({
            display: 'none'
        });

        $('.matchtab2 #' + ids + ' .chatroominfo').html(str1);

        $('#' + ids + ' .mainmessagecontainer1').css({
            display: 'none'
        });

        $('.receiveheader').css({
            display: 'none'
        });

        $('.sendmessage').css({
            display: 'none'
        });

        //$('.send').attr('id',ids);

        //console.log($('#' + ids + ' .chatroominfo'));

        //console.log($('.mainmessagecontainer1').css('display'));



    } else {

        //第二次点击
        //$('.send').attr('id',ids);

        $('#' + ids + '.everychatroom').css({
            display: 'block'
        });

        $('#' + ids + '.everychatroom').siblings().css({
            display: 'none'
        });

        console.log($('#' + ids + '.everychatroom' + ' .mainmessagecontainer1').css('display'));


        if ($('#' + ids + '.everychatroom' + ' .mainmessagecontainer1').css('display') == 'block') {
            //发起了会话


            $('#' + ids + '.receiveheader').css({
                display: 'block'
            });
            $('.sendmessage').css({
                display: 'block'
            });
            $('#' + ids + '.receiveheader').siblings().css({
                display: 'none'
            });

        } else {
            //未发起会话

            $('.sendmessage').css({
                display: 'none'
            });
            $('.receiveheader').css({
                display: 'none'
            });
        }


    }









    //标题的长度

    if ($('.matchtab2 .headers #' + ids+'.receiveheader').length < 1) {
        //第一次点击
        $('.matchtab2 .headers').prepend(str2);
    }
    









});






$('.receivemessage').on('click', '.joinchatroom', function () {
    var that3 = this;

    var ids = $(that3).attr('id');
    var name = $(that3).attr('data-id');
    //console.log(ids);
    //console.log(name);
    
    var joinRoom = function () {
        // 加入聊天室
        conn.joinChatRoom({
            roomId: ids // 聊天室id
        });
    };
    joinRoom();
    
    
    


    $('.matchtab2  #' + ids + '.receiveheader').css({
        display: 'block'
    });
    $('.matchtab2  #' + ids + '.receiveheader').siblings().css({
        display: 'none'
    });

    $('.sendmessage').css({
        display: 'block'
    });

    $(that3).parents('.chatroominfo').css({
        'display': 'none'
    });
    $('.send').attr('id', ids);

    $('#' + ids + '.everychatroom' + ' .mainmessagecontainer1').css({
        'display': 'block'
    });
    
    
    
    
    
    
    if ($('.allchatmessages [data-nid="' + ids + '"]').length < 1) {

        //判断是否有重复

        

        var str2 = '';
        str2 = str2 + '<div data-nid="' + ids + '" id="' + name + '" class="groupcontainer listsactive"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + name + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';

        $('.allchatmessages').prepend(str2);

        //$('#'+ids).siblings().removeClass('listsactive');

        $('[data-nid="' + ids + '"]').siblings().removeClass('listsactive');


    } else {
        $('.allchatmessages [data-nid="' + ids + '"]').remove();
        var str3 = '';
        str3 = str3 + '<div data-nid="' + ids + '" id="' + name + '" class="groupcontainer listsactive"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + name + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';
        
        $('.allchatmessages').prepend(str3);

        $('[data-nid="' + ids + '"]').siblings().removeClass('listsactive');
    }
    
    
    
    
    
    
    
    
    
    
    
    

});








//tab1下点击事件
$('.lists').on('click', '.groupcontainer', function (event) {
    var that4 = this;
    $(that4).addClass('listsactive');
    $(that4).siblings().removeClass('listsactive');
    var idnumber = $(this).attr('data-nid');
    var idname = $(this).attr('id');
    console.log( idnumber );
    console.log( idname );
    $('.groupmanager1').attr('id',idnumber);
    $('.send').attr('id',idnumber);
    $('.matchtab1 '+'#'+idnumber+'.receiveheader').css({display:'block'});
    $('.matchtab1 '+'#'+idnumber+'.receiveheader').siblings().css({display:'none'});
    $('.matchtab1 '+'#'+idnumber+'.everychatroom').css({display:'block'});
    $('.matchtab1 '+'#'+idnumber+'.everychatroom').siblings().css({display:'none'});
    
    
    $('.sendmessage').css({display:'block'});
    $('.emojicontainer').css({display:'none'});
    
    function querygroupinfo2 () {
        conn.queryRoomInfo({
            roomId: idnumber,
            success: function (settings, members, fields) {
                console.log('settings: ', settings);
                console.log('members: ', members);
                console.log('fields: ', fields);
                console.log(fields.owner);
                vm.groupmaster = fields.owner;
                if ( fields.owner == $('.username').attr('id') ) {
                    vm.ifornot = true;
                } else {
                    vm.ifornot = false;
                }
            },
            error: function () {
                console.log('Error!');
            }
        });
    };
    
    querygroupinfo2 ();
    
    function queryroommember2() {
        var member = '';
        var blankarr=[];
        conn.queryRoomMember({
            roomId: idnumber,
            success: function (members) {
                var membername = '';
                console.log(members);
                console.log(members.length);
                for (var o in members) {
                    member = members[o];
                    console.log(member);
                    //console.log(member.jid);
                    console.log(member.jid.slice(24,-12));
                    membername = membername + member.jid.slice(24,-12);
                    blankarr.push(member.jid.slice(24,-12));
                }
            console.log( blankarr );
            vm.list3 = blankarr;
            }
        });
            
    };
    queryroommember2();
});




//tab1下点击事件

$('.gmanager1').on('click',function(event){
    event.stopPropagation();
    console.log( $(this).parent().attr('id') );
    $('.matchtab1 .slideinfo').slideDown(300);
    
    $(window).on('click',function(){
        $('.matchtab1 .slideinfo').slideUp(300);
    });
    
    $('.matchtab1 .slideinfo').on('click',function(){
        $(this).css({display:'block'});
    })
    $('.groupmanager1').css({display:'none'});
    
    
    
});




$('.sendicons li:first-child').on('click',function(){
    
    var emojilist =[];
    $.each(WebIM.Emoji.map,function(i,ele){
        //console.log(i+":"+ele);
        emojilist.push( '<div  class="emojievery" data-emoji="' + i + '"><img src="faces/'+ ele +'"></div>' );
    })
    //console.log(emojilist);
    
    var all = emojilist.join('');
    
    var first = emojilist.slice(0,7).join('');
    
    $('.emojicontainer').html(all);
    
    
    
});

$('.emojicontainer').on('click','.emojievery',function(){
    
    console.log(this);
    var emo =  $(this).attr('data-emoji');
    console.log(emo);
    var text = $('.writein.scrollbar-macosx')[1].value;
    text = text + emo;
    $('.writein.scrollbar-macosx')[1].value = text;
   
    
});



$('.gmanager2').on('click',function(event){
    event.stopPropagation();
    var idnumber = $(this).parent().attr('id');
    
    $('.changegroupinfo').attr("id",idnumber);
    
});


// 修改群信息
    
    
$('.changegroupinfo button').on('click',function(){
    
    var idnumber = $(this).parent().attr('id');
    var groupname =$('.changegroup1').val();
    var groupdes = $('.changegroup2').val();
    
    var changeGroupInfo = function () {
        var option = {
            roomId: idnumber,
            subject: groupname,    // 群组名称
            description: groupdes,  // 群组简介
            success: function () {
                console.log('Change Group Names Success!');
            }
        };
        conn.changeGroupSubject(option);
    };
    changeGroupInfo();
});




$('.lists').on('contextmenu', '.groupcontainer', function (event) {
    var that5 = this;
    console.log($(that5).attr('data-nid'));
    var target = $(that5).attr('data-nid');
    event.stopPropagation();
    console.log(event);
    event.preventDefault();
    $(that5).addClass('listsactive');
    $(that5).siblings().removeClass('listsactive');
    $('.listscontronller').css({
        display: 'block'
    });
    var tx = event.clientX - 160;
    var ty = event.clientY;
    $('.listscontronller').attr('id', target);
    $('.listscontronller').css({
        top: ty
    });
    $('.listscontronller').css({
        left: tx
    });
    $(window).on('click', function () {
        $('.listscontronller').css({
            display: 'none'
        });
    });
});



//删除置顶按钮



$('.listscontronller .contronller:first-child').on('click', function () {



    $('.listscontronller').css({
        display: 'none'
    });
    var up1 = this;
    console.log($(up1).parent().attr('id'));
    var bridge1 = $(up1).parent().attr('id');



    $('[data-nid="' + bridge1 + '"]').prependTo('.allchatmessages');
});

$('.listscontronller .contronller:nth-child(2)').on('click', function () {



    $('.listscontronller').css({
        display: 'none'
    });

    var up2 = this;
    console.log($(up2).parent().attr('id'));
    var bridge2 = $(up2).parent().attr('id');
    $('[data-nid="' + bridge2 + '"]').remove();

});






//删除置顶按钮








//点击锯齿
var target1 = 2;
$('.matchtab1').on('click', '.fa-cog', function (event) {
    event.stopPropagation();
    if (target1 == 2) {
        target1 = 3;
        $('.matchtab1 .groupmanager1').css({display:'block'});
    } else if (target1 == 3) {
        $('.matchtab1 .groupmanager1').css({display:'none'});
        target1 = 2;
    }
});
$(window).on('click', function () {
    $('.matchtab1 .groupmanager1').css({display:'none'});
    target1 = 2;
});





var target2 = 2;
$('.matchtab2').on('click', '.fa-cog', function (event) {
    event.stopPropagation();
    if (target1 == 2) {

        target1 = 3;
        $('.matchtab2 .slideinfo').slideDown(300);
    } else if (target1 == 3) {

        $('.matchtab2 .slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click', function () {
    $('.matchtab2 .slideinfo').slideUp(500);
    target1 = 2;
});


$(window).on('click', function () {
    $('.matchtab3 .slideinfo').slideUp(300);
    target1 = 2;
});
//点击锯齿


$('.selector a').on('click', function () {
    var that = this;
    var an = $(that).attr('href');
    console.log(an);
    $(an).css({
        display: 'block'
    });
    $(an).siblings().css({
        display: 'none'
    });
});
