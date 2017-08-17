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
        //console.log(message);

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
        pagesize: 50, // 每页个数
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
var getRoasters3 = function () {
    var option = {
        success: function (roster) {
            var str3 = '';
            var o;
            var l = roster.length;
            for (o = 0; o < l; o++) {
                var names = roster[o].name;
                if (names != 'undefined') {
                    //console.log(names);
                    /*str3 = str3 + '<div id="'+ names +'" class="onlyfriendcontainer"><img src="imgs/zhaoyun-1.jpg"><div class="onlyname">' + names + '</div><div class="clearfix"></div></div>';*/
                    str3 = str3 + '<div id = "' + names + '" class="sort_list"><div class="num_logo"><img src="imgs/zhaoyun-1.jpg" alt=""></div><div class="num_name">' + names + '</div></div>';
                };
            } //for 循环

            $('.friends .sort_box').html(str3);




            function makePy(str) {
                if (typeof (str) != "string")
                    throw new Error(-1, "函数makePy需要字符串类型参数!");
                var arrResult = new Array(); //保存中间结果的数组  
                for (var i = 0, len = str.length; i < len; i++) {
                    //获得unicode码  
                    var ch = str.charAt(i);
                    //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理  
                    arrResult.push(checkCh(ch));
                }
                //处理arrResult,返回所有可能的拼音首字母串数组  
                return mkRslt(arrResult);
            }

            function checkCh(ch) {
                var uni = ch.charCodeAt(0);
                //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数  
                if (uni > 40869 || uni < 19968)
                    return ch; //dealWithOthers(ch);  
                //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母  
                return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
            }

            function mkRslt(arr) {
                var arrRslt = [""];
                for (var i = 0, len = arr.length; i < len; i++) {
                    var str = arr[i];
                    var strlen = str.length;
                    if (strlen == 1) {
                        for (var k = 0; k < arrRslt.length; k++) {
                            arrRslt[k] += str;
                        }
                    } else {
                        var tmpArr = arrRslt.slice(0);
                        arrRslt = [];
                        for (k = 0; k < strlen; k++) {
                            //复制一个相同的arrRslt  
                            var tmp = tmpArr.slice(0);
                            //把当前字符str[k]添加到每个元素末尾  
                            for (var j = 0; j < tmp.length; j++) {
                                tmp[j] += str.charAt(k);
                            }
                            //把复制并修改后的数组连接到arrRslt上  
                            arrRslt = arrRslt.concat(tmp);
                        }
                    }
                }
                return arrRslt;
            }








            $(function () {
                var Initials = $('.initials');
                var LetterBox = $('#letter');
                Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
                initials();

                $(".initials ul li").click(function () {
                    var _this = $(this);
                    var LetterHtml = _this.html();
                    LetterBox.html(LetterHtml).fadeIn();

                    Initials.css('background', 'rgba(145,145,145,0.6)');

                    setTimeout(function () {
                        Initials.css('background', 'rgba(145,145,145,0)');
                        LetterBox.fadeOut();
                    }, 1000);

                    var _index = _this.index()
                    if (_index == 0) {
                        $('html,body').animate({
                            scrollTop: '0px'
                        }, 300); //点击第一个滚到顶部
                    } else if (_index == 27) {
                        var DefaultTop = $('#default').position().top;
                        $('html,body').animate({
                            scrollTop: DefaultTop + 'px'
                        }, 300); //点击最后一个滚到#号
                    } else {
                        var letter = _this.text();
                        if ($('#' + letter).length > 0) {
                            var LetterTop = $('#' + letter).position().top;
                            $('html,body').animate({
                                scrollTop: LetterTop - 45 + 'px'
                            }, 300);
                        }
                    }
                })

                var windowHeight = $(window).height();
                var InitHeight = windowHeight - 45;
                Initials.height(InitHeight);
                var LiHeight = InitHeight / 28;
                Initials.find('li').height(LiHeight);
            })

            function initials() { //公众号排序
                var SortList = $(".sort_list");
                var SortBox = $(".sort_box");
                SortList.sort(asc_sort).appendTo('.sort_box'); //按首字母排序
                function asc_sort(a, b) {
                    return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
                }

                var initials = [];
                var num = 0;
                SortList.each(function (i) {
                    var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
                    if (initial >= 'A' && initial <= 'Z') {
                        if (initials.indexOf(initial) === -1)
                            initials.push(initial);
                    } else {
                        num++;
                    }

                });

                $.each(initials, function (index, value) { //添加首字母标签
                    SortBox.append('<div class="sort_letter" id="' + value + '">' + value + '</div>');
                });
                if (num != 0) {
                    SortBox.append('<div class="sort_letter" id="default">#</div>');
                }

                for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
                    var letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
                    switch (letter) {
                        case "A":
                            $('#A').after(SortList.eq(i));
                            break;
                        case "B":
                            $('#B').after(SortList.eq(i));
                            break;
                        case "C":
                            $('#C').after(SortList.eq(i));
                            break;
                        case "D":
                            $('#D').after(SortList.eq(i));
                            break;
                        case "E":
                            $('#E').after(SortList.eq(i));
                            break;
                        case "F":
                            $('#F').after(SortList.eq(i));
                            break;
                        case "G":
                            $('#G').after(SortList.eq(i));
                            break;
                        case "H":
                            $('#H').after(SortList.eq(i));
                            break;
                        case "I":
                            $('#I').after(SortList.eq(i));
                            break;
                        case "J":
                            $('#J').after(SortList.eq(i));
                            break;
                        case "K":
                            $('#K').after(SortList.eq(i));
                            break;
                        case "L":
                            $('#L').after(SortList.eq(i));
                            break;
                        case "M":
                            $('#M').after(SortList.eq(i));
                            break;
                        case "O":
                            $('#O').after(SortList.eq(i));
                            break;
                        case "P":
                            $('#P').after(SortList.eq(i));
                            break;
                        case "Q":
                            $('#Q').after(SortList.eq(i));
                            break;
                        case "R":
                            $('#R').after(SortList.eq(i));
                            break;
                        case "S":
                            $('#S').after(SortList.eq(i));
                            break;
                        case "T":
                            $('#T').after(SortList.eq(i));
                            break;
                        case "U":
                            $('#U').after(SortList.eq(i));
                            break;
                        case "V":
                            $('#V').after(SortList.eq(i));
                            break;
                        case "W":
                            $('#W').after(SortList.eq(i));
                            break;
                        case "X":
                            $('#X').after(SortList.eq(i));
                            break;
                        case "Y":
                            $('#Y').after(SortList.eq(i));
                            break;
                        case "Z":
                            $('#Z').after(SortList.eq(i));
                            break;
                        default:
                            $('#default').after(SortList.eq(i));
                            break;
                    }
                };
            }









        } //success

    }; //option

    conn.getRoster(option);

};






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

$('.icons3').on('click', function () {
    if ($('.groups .sort_box').html() === '' || $('.friends .sort_box').html() === '') {
        listGroups2();
        getRoasters3();
        var str = '<img class="firstscreen" src="imgs/u13.png">';
        $('.matchtab3 .placesholder').html(str);
        $('.matchtab3  .getmessage').css({
            display: 'none'
        });
        $('.sendmessage').css({
            display: 'none'
        });
    } else {
        $('.sendmessage').css({
            display: 'none'
        });
    };
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
            listRooms2();
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
    console.log(this);
    var that4 = this;
    var ids = $(that4).attr('id');
    var cid = $(that4).attr('data-bid');
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
    $('.matchtab1 .receiveheader').css({display:'block'});

    $('.icons .fa-commenting').addClass('greenactive');
    $('.floor3 .fa-users').removeClass('greenactive');
    $('.matchtab1 .placesholder').css({
        display: 'none'
    });
    $('.matchtab1 .getmessage').css({
        display: 'block'
    });
    $('.sendmessage').css({
        display: 'block'
    });
    $('.matchtab1 .headername').html(ids);







    if ($('.allchatmessages [data-nid="' + cid + '"]').length < 1) {

        //判断是否有重复

        console.log($('.allchatmessages [data-nid="' + cid + '"]').length);

        var str2 = '';
        str2 = str2 + '<div data-nid="' + cid + '" id="' + ids + '" class="groupcontainer listsactive"><div class="groupinfo"><div class="groupinfo-left"><img src="imgs/group-1.jpg"></div><div class="groupinfo-right"><div class="groupifrightcontainer"><div class="grouptop"><div class="grouptopleft">' + ids + '</div><div class="grouptopright">10:00</div><div class="clearfix"></div></div><div class="groupbottom"><div class="groupbottomleft">昵称：消息信息</div><div class="groupbottomright"><i class="fa fa-bell-slash"></i></div><div class="clearfix"></div></div></div></div><div class="clearfix"></div></div></div>';

        $('.allchatmessages').prepend(str2);

        //$('#'+ids).siblings().removeClass('listsactive');

        $('[data-nid="' + cid + '"]').siblings().removeClass('listsactive');


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
    console.log(that3);
    var ids = $(that3).attr('id');
    var bid = $(that3).attr('data-id');
    $(that3).addClass('listsactive');
    $(that3).siblings().removeClass('listsactive');
    $(that3).parents('.groups').siblings().find('.sort_list').removeClass('listsactive');
    var str2 = '<div class="justtowatch"><img src="imgs/zhaoyun-1.jpg"> <div class="justname">' + ids + '</div><button data-bid="' + bid + '" id ="' + ids + '"  type="button">发消息</button></div>';
    $('.matchtab3 .getmessage').html(str2);
    $('.matchtab3 .placesholder').css({
        display: 'none'
    });
    $('.matchtab3 .getmessage').css({
        display: 'block'
    });
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
                str5 = str5 + '<div data-id="' + groupnumber + '" id="' + groupnames + '" class="onlygroupcontainer"><input class="groupcheck" type="checkbox" value="'+ groupnames +'"><img src="imgs/group-1.jpg"><div class="onlyname">' + groupnames + '</div><div class="clearfix"></div></div>';
                
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



var getRoasters4 = function () {
    var option = {
        success: function (roster) {
            var str3 = '';
            var o;
            var l = roster.length;
            for (o = 0; o < l; o++) {
                var names = roster[o].name;
                if (names != 'undefined') {
                    //console.log(names);
                    /*str3 = str3 + '<div id="'+ names +'" class="onlyfriendcontainer"><img src="imgs/zhaoyun-1.jpg"><div class="onlyname">' + names + '</div><div class="clearfix"></div></div>';*/
                    str3 = str3 + '<div id = "' + names + '" class="sort_list"><div class="num_logo"><img src="imgs/zhaoyun-1.jpg" alt=""></div><div class="num_name">' + names + '</div></div>';
                };
            } //for 循环

            $('.friends .sort_box').html(str3);




            function makePy(str) {
                if (typeof (str) != "string")
                    throw new Error(-1, "函数makePy需要字符串类型参数!");
                var arrResult = new Array(); //保存中间结果的数组  
                for (var i = 0, len = str.length; i < len; i++) {
                    //获得unicode码  
                    var ch = str.charAt(i);
                    //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理  
                    arrResult.push(checkCh(ch));
                }
                //处理arrResult,返回所有可能的拼音首字母串数组  
                return mkRslt(arrResult);
            }

            function checkCh(ch) {
                var uni = ch.charCodeAt(0);
                //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数  
                if (uni > 40869 || uni < 19968)
                    return ch; //dealWithOthers(ch);  
                //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母  
                return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
            }

            function mkRslt(arr) {
                var arrRslt = [""];
                for (var i = 0, len = arr.length; i < len; i++) {
                    var str = arr[i];
                    var strlen = str.length;
                    if (strlen == 1) {
                        for (var k = 0; k < arrRslt.length; k++) {
                            arrRslt[k] += str;
                        }
                    } else {
                        var tmpArr = arrRslt.slice(0);
                        arrRslt = [];
                        for (k = 0; k < strlen; k++) {
                            //复制一个相同的arrRslt  
                            var tmp = tmpArr.slice(0);
                            //把当前字符str[k]添加到每个元素末尾  
                            for (var j = 0; j < tmp.length; j++) {
                                tmp[j] += str.charAt(k);
                            }
                            //把复制并修改后的数组连接到arrRslt上  
                            arrRslt = arrRslt.concat(tmp);
                        }
                    }
                }
                return arrRslt;
            }








            $(function () {
                var Initials = $('.initials');
                var LetterBox = $('#letter');
                Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
                initials();

                $(".initials ul li").click(function () {
                    var _this = $(this);
                    var LetterHtml = _this.html();
                    LetterBox.html(LetterHtml).fadeIn();

                    Initials.css('background', 'rgba(145,145,145,0.6)');

                    setTimeout(function () {
                        Initials.css('background', 'rgba(145,145,145,0)');
                        LetterBox.fadeOut();
                    }, 1000);

                    var _index = _this.index()
                    if (_index == 0) {
                        $('html,body').animate({
                            scrollTop: '0px'
                        }, 300); //点击第一个滚到顶部
                    } else if (_index == 27) {
                        var DefaultTop = $('#default').position().top;
                        $('html,body').animate({
                            scrollTop: DefaultTop + 'px'
                        }, 300); //点击最后一个滚到#号
                    } else {
                        var letter = _this.text();
                        if ($('#' + letter).length > 0) {
                            var LetterTop = $('#' + letter).position().top;
                            $('html,body').animate({
                                scrollTop: LetterTop - 45 + 'px'
                            }, 300);
                        }
                    }
                })

                var windowHeight = $(window).height();
                var InitHeight = windowHeight - 45;
                Initials.height(InitHeight);
                var LiHeight = InitHeight / 28;
                Initials.find('li').height(LiHeight);
            })

            function initials() { //公众号排序
                var SortList = $(".sort_list");
                var SortBox = $(".sort_box");
                SortList.sort(asc_sort).appendTo('.sort_box'); //按首字母排序
                function asc_sort(a, b) {
                    return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
                }

                var initials = [];
                var num = 0;
                SortList.each(function (i) {
                    var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
                    if (initial >= 'A' && initial <= 'Z') {
                        if (initials.indexOf(initial) === -1)
                            initials.push(initial);
                    } else {
                        num++;
                    }

                });

                $.each(initials, function (index, value) { //添加首字母标签
                    SortBox.append('<div class="sort_letter" id="' + value + '">' + value + '</div>');
                });
                if (num != 0) {
                    SortBox.append('<div class="sort_letter" id="default">#</div>');
                }

                for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
                    var letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
                    switch (letter) {
                        case "A":
                            $('#A').after(SortList.eq(i));
                            break;
                        case "B":
                            $('#B').after(SortList.eq(i));
                            break;
                        case "C":
                            $('#C').after(SortList.eq(i));
                            break;
                        case "D":
                            $('#D').after(SortList.eq(i));
                            break;
                        case "E":
                            $('#E').after(SortList.eq(i));
                            break;
                        case "F":
                            $('#F').after(SortList.eq(i));
                            break;
                        case "G":
                            $('#G').after(SortList.eq(i));
                            break;
                        case "H":
                            $('#H').after(SortList.eq(i));
                            break;
                        case "I":
                            $('#I').after(SortList.eq(i));
                            break;
                        case "J":
                            $('#J').after(SortList.eq(i));
                            break;
                        case "K":
                            $('#K').after(SortList.eq(i));
                            break;
                        case "L":
                            $('#L').after(SortList.eq(i));
                            break;
                        case "M":
                            $('#M').after(SortList.eq(i));
                            break;
                        case "O":
                            $('#O').after(SortList.eq(i));
                            break;
                        case "P":
                            $('#P').after(SortList.eq(i));
                            break;
                        case "Q":
                            $('#Q').after(SortList.eq(i));
                            break;
                        case "R":
                            $('#R').after(SortList.eq(i));
                            break;
                        case "S":
                            $('#S').after(SortList.eq(i));
                            break;
                        case "T":
                            $('#T').after(SortList.eq(i));
                            break;
                        case "U":
                            $('#U').after(SortList.eq(i));
                            break;
                        case "V":
                            $('#V').after(SortList.eq(i));
                            break;
                        case "W":
                            $('#W').after(SortList.eq(i));
                            break;
                        case "X":
                            $('#X').after(SortList.eq(i));
                            break;
                        case "Y":
                            $('#Y').after(SortList.eq(i));
                            break;
                        case "Z":
                            $('#Z').after(SortList.eq(i));
                            break;
                        default:
                            $('#default').after(SortList.eq(i));
                            break;
                    }
                };
            }









        } //success

    }; //option

    conn.getRoster(option);

};


























//转发消息
$('.matchtab2').on('click','.message1:nth-child(2)',function(){
    $('.transparent1').css({display:'block'});
    
    //listGroups3();
    
    
    //getRoasters3();
    
    $('.transferselect.scroll-content').html();
});


$('.transparent1 .fa-times').on('click', function(){
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



    var str2 = '<div data-id="' + idvalue + '" id="' + ids + '" class="receiveheader"><div class="headername">' + idvalue + '</div><i class="fa fa-cog"></i><div class="clearfix"></div></div>';




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
    
    
    


    $('#' + ids + '.receiveheader').css({
        display: 'block'
    });
    $('#' + ids + '.receiveheader').siblings().css({
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

});



//tab1下点击事件


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
        $('.matchtab1 .slideinfo').slideDown(300);
    } else if (target1 == 3) {

        $('.matchtab1 .slideinfo').slideUp(300);
        target1 = 2;
    }
});
$(window).on('click', function () {
    $('.matchtab1 .slideinfo').slideUp(500);
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

var target3 = 2;
$('.matchtab3').on('click', '.fa-cog', function (event) {
    event.stopPropagation();
    if (target1 == 2) {

        target1 = 3;
        $('.matchtab3 .slideinfo').slideDown(300);
    } else if (target1 == 3) {

        $('.matchtab3 .slideinfo').slideUp(300);
        target1 = 2;
    }
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
