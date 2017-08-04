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
        $('.matchtab2').css({display:'none'});
        $('.matchtab3').css({display:'none'});
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