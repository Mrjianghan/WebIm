axios.defaults.withCredentials = true;
var ids;//登陆成功后当前用户的信息
var myfriends;//全局变量我的所有好友
var mygroups;//全局变量我的所有群组
var globaldomain = 'http://api.zhongxiangim.com/';
var globalimg = 'http://assets.zhongxiangim.com/zxupl';
var templatearr=[];//全局数组
var templatearr1=[];//全局数组
var templatearr2=[];//全局数组
var globalmsgarr=[];//消息数组
var globaltextmsgarrcopy1=[];//文本消息数组
var globaltextmsgarrbridge=[];//文本消息数组
var globaltextmsgarrcopy2=[];//文本消息数组
var unreadlength=[];//未读消息数
var tempcreategroup = '';
var allmessagecontainer=[];//所有消息容器
var allmsgreverse = [];
var globalemojitrack='';//全局emoji表情消息的id
var groupemojisrc='';//全局群组emoji消息的路径
var chatemojitrack='';//全局emoji表情消息的id
var chatemojisrc='';//全局聊天室emoji消息的路径
var globalarea='';
var globaltrade = '';
var globalcurrentchatroom1 = '';//点击当前聊天室的id
var globalcurrentchatroom2 = '';//搜索结果点击当前聊天室的id
var globalpicindex='';
var globalpicturelength = '';


function getCurrentTime(){
	var globaltime = new Date();
	var getglobaltime = globaltime.toTimeString();
	var now = getglobaltime.slice(0,5);
	return now;
};//获取当前时间

var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl:WebIM.config.apiURL,
});

if ( localStorage.currentuser ){
	var nothing = localStorage.currentuser;
	ids = JSON.parse( nothing );//登陆必备
}else {
	window.location.href = "index.html";
}
conn.listen({
    onOpened: function ( message ) {         
        console.log("%c [opened] 连接已成功建立", "color: green");
    },   //连接成功回调
    onClosed: function ( message ) {
		console.log(message);
		console.log("onClosed");
		localStorage.clear();
		window.location.href="index.html";
	},         //连接关闭回调
    onOnline: function () {
		console.log('本机网络连接成功');
	},        //本机网络连接成功
    onOffline: function () {
		console.log('本机网络掉线');
		window.location.href="index.html";
		localStorage.clear();
	},                 //本机网络掉线
    onError: function ( message ) {
		console.log(message);
		console.log('失败回调');
		window.location.href="index.html";
		localStorage.clear();
	},          //失败回调
	onTextMessage: function ( message ) {
		vm.nomessage = false;
		console.log('文本消息');
		message.time = getCurrentTime();
		console.log(message);
		
		console.log(message.ext.fire_flag);
		var fire = message.ext.fire_flag;
		
		
		
		
		
		
		
		var type = message.type;
		switch ( type ) {
			case 'chat':
				
				
				
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					message.name = name;
					message.avatar = avatar;
					
					
					
					
					
					
					if (fire){
						//即焚
						//消息列表记录
						var str = '';
						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[请到移动端查看]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
						if ( $('.mainleft  #'+message.from+'.listOnecon').length < 1 ){
							$('.mainleft .comlist1').prepend(str);
						} else {
							console.log($('.mainleft .doublefirst #'+message.from+'.listOnecon').html() );
							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								$('.mainleft .doublefirst').html( str );//有置顶
							}else {
								$('.mainleft .comlist1  #'+message.from).remove();//没有置顶
								$('.mainleft .comlist1').prepend(str);
							}
						}

						//消息列表记录
						
						
						
						textmessagetransfer = message.data;

							var str1 = '';

							str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

							'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'

							+'</div></div></div>';


							var str2 ='';


							str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						//消息内容容器

						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}

						//消息内容容器
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						







					}else {
						//非即焚
						//消息列表记录
						var str = '';
						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+message.data+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
						if ( $('.mainleft  #'+message.from+'.listOnecon').length < 1 ){
							$('.mainleft .comlist1').prepend(str);
						} else {
							console.log($('.mainleft .doublefirst #'+message.from+'.listOnecon').html() );
							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								$('.mainleft .doublefirst').html( str );//有置顶
							}else {
								$('.mainleft .comlist1  #'+message.from).remove();//没有置顶
								$('.mainleft .comlist1').prepend(str);
							}
						}

						//消息列表记录
						
						
						
						var textmessagetransfer = '';
						if (message.ext.mingpian){
							var mingpianid = message.ext.userId;
							console.log( mingpianid );
							console.log( message.ext.userName );
							console.log( message.ext.userPic );
							var picsrc = message.ext.userPic;

							textmessagetransfer = '<div class="mingup"><img src="'+(picsrc? globalimg+picsrc: vm.defaultpic )+'"><div class="mingpianname">'+message.ext.userName+'</div></div><div class="mingdown">个人名片</div>';
							var str1 = '';

							str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

							'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

							+'</div></div></div>';


							var str2 ='';

							str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';







						}else {
							textmessagetransfer = message.data;

							var str1 = '';

							str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

							'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

							+'</div></div></div>';


							var str2 ='';


							str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						}

						//消息内容容器

						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}

						//消息内容容器
						
						
						
						


					}
					
					
					
					
					
					
					
				/*	var textmessagetransfer = '';
					if (message.ext.mingpian){
						var mingpianid = message.ext.userId;
						console.log( mingpianid );
						console.log( message.ext.userName );
						console.log( message.ext.userPic );
						var picsrc = message.ext.userPic;
						
						textmessagetransfer = '<div class="mingup"><img src="'+(picsrc? globalimg+picsrc: vm.defaultpic )+'"><div class="mingpianname">'+message.ext.userName+'</div></div><div class="mingdown">个人名片</div>';
						var str1 = '';
					
						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';
						
						
						var str2 ='';
						
						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						
						
						
						
						
						
						
					}else {
						textmessagetransfer = message.data;
						
						var str1 = '';
					
						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';
						
						
						var str2 ='';
					
						
						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					}
					
					//消息内容容器

					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
						messagetobottom();

					} else {
						$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
						messagetobottom();
					}
					
					//消息内容容器
					
					
					*/


				}).catch(function(err){
					console.log(err);
				});
				
				
				break;
			case 'groupchat':
				
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					//消息列表记录
					var str = '';
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+message.data+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);
								
							} else {
								
								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
									//有置顶
									$('.mainleft .doublefirst').html( str );

								}else {
									//没有置顶
									$('.mainleft .comlist1  #'+message.to).remove();
									$('.mainleft .comlist1').prepend(str);
								}
							}
							
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+message.data+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);
								
							} else {
								
								
								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
									//有置顶
									$('.mainleft .doublefirst').html( str );

								}else {
									//没有置顶
									$('.mainleft .comlist1  #'+message.to).remove();
									$('.mainleft .comlist1').prepend(str);
								}
								
							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					//消息列表记录
					
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						//生成的消息内容容器
						
						
						var textmessagetransfer = '';
						
						
						
						
						
						if (message.ext.mingpian){
						
						
							var mingpianid = message.ext.userId;
							console.log( mingpianid );
							console.log( message.ext.userName );
							console.log( message.ext.userPic );
							var picsrc = message.ext.userPic;




							textmessagetransfer = '<div class="mingup"><img src="'+(picsrc? globalimg+picsrc: vm.defaultpic )+'"><div class="mingpianname">'+message.ext.userName+'</div></div><div class="mingdown">个人名片</div>';


							var str1 = '';

							str1 =  '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

							'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

							+'</div></div></div>';


							var str2 ='';

							str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="mingpianspans" id="'+mingpianid+'">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';







						}else {
							textmessagetransfer = message.data;

							var str1 = '';

							str1 =  '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

							'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'

							+'</div></div></div>';


							var str2 ='';


							str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="words">'+textmessagetransfer+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						}
						
						
						
						
						
						
						/*
						
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="words">'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="words">'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						
						*/

						
						
						
						
						
						
						
						
						
						
						
						
						
						
						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();
						}
						//生成的消息内容容器
						
					}).catch(function(err){
						console.log(err);
					});
				}).catch(function(err){
					console.log(err);
				});
				break;
			case 'chatroom':
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						//生成的消息内容容器
						
						var str2 ='';
						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div>';

						

						$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

						messagetobottom();
						
						//生成的消息内容容器
						
					}).catch(function(err){
						console.log(err);
					});
				
				
				break;
			
		}
		
		
	},    //收到文本消息
    onEmojiMessage: function ( message ) {
		
		
		console.log('表情消息');
		vm.nomessage = false;
		message.time = getCurrentTime();
		console.log(message);
		var messagetype = message.type;
		
		//var transemoji = WebIM.utils.parseEmoji(message.data);
		
		
		for(var i=0;i<message.data.length;i++  ){
			var img = message.data[i];
			console.log(img);
			var string;
			if (img.type == "txt"){
				string = string+img.data;
			}else {
				string = string + '<img class="emoji" ' + 'src="' + img.data + '" />';
			}
					
		}
		string = string.replace('undefined','');
		
		console.log(string);
		
		switch (messagetype){
			case 'chat':
				
			axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
				//console.log(res);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
					var hei = main.scrollHeight;
					$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				var data = res.data.data;
				console.log(data);
				var name = data.nickname;
				var avatar = data.avatar;
				var msgfrom = message.from;
					
				message.name = name;
				message.avatar = avatar;
					
				console.log(message);
					
					
				/*消息列表记录*/
				var str = '';
					
				str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+string+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
					
					
				if ( $('.mainleft   #'+message.from).length < 1 ){
					$('.mainleft .comlist1').prepend(str);
						
				} else {
					
					if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
						//有置顶
						$('.mainleft .doublefirst').html( str );

					}else {
						//没有置顶
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);
					}
						
				}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
					
				/*消息列表记录*/
				
				
				/*消息内容容器*/
					var str1 = '';
					
					str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+
						
					'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span  class="picwords">'+string+'</span></div></div><div class="clearfix"></div></div>'
						
					+'</div></div></div>';
					
					
					var str2 ='';
					
						
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="picwords">'+string+'</span></div></div><div class="clearfix"></div></div>'+'</div>';





					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
						messagetobottom();

					} else {
						$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
						messagetobottom();
					}
					
					/*消息内容容器*/
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			}).catch(function(err){
				console.log(err);
			})
			
				
				
			break;
			case 'groupchat':
				
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					/*消息列表记录*/
					var str = '';
					
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+string+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
									//有置顶
									$('.mainleft .doublefirst').html( str );

								}else {
									//没有置顶
									$('.mainleft .comlist1  #'+message.to).remove();
									$('.mainleft .comlist1').prepend(str);
								}
							}
							
							
							
							
							
							
							
							
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+string+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
									//有置顶
									$('.mainleft .doublefirst').html( str );

								}else {
									//没有置顶
									$('.mainleft .comlist1  #'+message.to).remove();
									$('.mainleft .comlist1').prepend(str);
								}
							}
							
							
							
							
							
							
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					
					
					
					
					
					
					
					/*str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[表情]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}*/
					/*消息列表记录*/
					
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span  class="picwords">'+string+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span  class="picwords">'+string+'</span></div></div><div class="clearfix"></div></div>'+'</div>';


						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
				}).catch(function(err){
					console.log(err);
				});
					
				break;
			case 'chatroom':
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+string+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				break;
			case 'error':
				console.log('special');
				console.log(string);
				console.log(message.to);
				//console.log(message.from);
				
				console.log(globalemojitrack);
				
				
				
				$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster .msgcontainer  #'+ globalemojitrack+'.msgmarginlr .wordscontent span').html(string);
				
				
				break;
		}
		
		
	},   //收到表情消息
    onPictureMessage: function ( message ) {
		
		
		vm.pictureviewarr=[];
		
		
		vm.nomessage = false;
		console.log('图片消息');
		message.time = getCurrentTime();
		console.log(message);
		var msgtype = message.type;
		var fire = message.ext.fire_flag;
		
		switch( msgtype ){
			case 'chat':
				
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					console.log(res);
					
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
				
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					console.log(message.url);
					console.log(fire);
					
					
					
					
					if (fire){
						//即焚
						
						console.log('即焚');
						
						
						/*消息列表记录*/
						var str = '';

						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[请到移动端查看]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';



						if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
									$('.mainleft .comlist1').prepend(str);
						} else {
							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

							}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.from).remove();
								$('.mainleft .comlist1').prepend(str);
							}
						}



						/*消息列表记录*/
						
						
						/*消息内容容器*/
						
						
						
						
						var str1 = '';

						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						
						
						
						/*var str1 = '';

						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="picspan">'+ '[请到移动端查看]' +'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="picspan">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';


						*/


						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}

						/*消息内容容器*/
						






					}else {
						//非即焚
						console.log('非即焚');
						/*消息列表记录*/
						var str = '';

						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[图片]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';



						if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
									$('.mainleft .comlist1').prepend(str);
						} else {
							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

							}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.from).remove();
								$('.mainleft .comlist1').prepend(str);
							}
						}



						/*消息列表记录*/
						
						/*消息内容容器*/
						var str1 = '';

						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="picspan">'+ '<img src="'+message.url+'" class="picmessagelock">' +'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="picspan">'+'<img src="'+message.url+'" class="picmessagelock">'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';





						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}

						/*消息内容容器*/
						
						
						
						
						
						
						
						
						
						
						
						
						
					}
				
					
					
					
					
					
					
					
					
					
					/*消息列表记录*/
					/*var str = '';

					str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[图片]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


					/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
						$('.mainleft .comlist1').prepend(str);

					} else {
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);

					}*/
					
					
					/*if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);
					} else {
						if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
							//有置顶
							$('.mainleft .doublefirst').html( str );

						}else {
							//没有置顶
							$('.mainleft .comlist1  #'+message.from).remove();
							$('.mainleft .comlist1').prepend(str);
						}
					}
					
					

					/*消息列表记录*/
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				})
				
				break;
			case 'groupchat':
			
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					
					
					/*消息列表记录*/
					var str = '';
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[图片]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[图片]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					/*str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[图片]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}*/
					/*消息列表记录*/
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span  class="picspan">'+'<img src="'+message.url+'" class="picmessagelock">'+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span  class="picspan">'+'<img src="'+message.url+'" class="picmessagelock">'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';




						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
					
					}).catch(function(err){
						console.log(err);
					});
					
					
					
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				
				break;
			case 'chatroom':
				
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span  class="picspan">'+'<img src="'+message.url+'" class="picmessagelock">'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
			break;
		}
		
		
		
	}, //收到图片消息
    
    onAudioMessage: function ( message ) {
		
		/*var bodyId = message.id;         // 需要发送已读回执的消息id
		var msg = new WebIM.message('read', msgId);
		msg.set({
			id: bodyId
			,to: message.from
		});
		Demo.conn.send(msg.body);
		对方收到已送达回执的回调函数是onReadMessage*/
		
		vm.nomessage = false;
		console.log('音频消息');
		message.time = getCurrentTime();
		console.log(message);
		
		var options = { url: message.url };
    
		options.onFileDownloadComplete = function ( response ) { 
			  //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
			var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
			console.log(objectURL);
			console.log(response);
			
			console.log(conn);
			var size = response.size;
			console.log(size);
			
			var sizestr= String(size);
			
			console.log(sizestr);
			var finalsize = sizestr.substring(0,1);
			
			
			console.log(finalsize);
			
			var msgtype = message.type;
		
		switch( msgtype ){
			case 'chat':
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					console.log(res);
					
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
				
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					
					
					/*消息列表记录*/
					var str = '';

					str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[语音]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


					/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
						$('.mainleft .comlist1').prepend(str);

					} else {
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);

					}*/
					
					if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

					} else {


						if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

						}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.from).remove();
								$('.mainleft .comlist1').prepend(str);
								}

					}
					
					

					/*消息列表记录*/
					
					
					/*消息内容容器*/
					var str1 = '';
					
					str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+
						
					'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="audiospan">'+'<i class="length">'+finalsize+'"</i>'+'<i class="redspot"></i>'+'<audio  src="'+objectURL+'" ></audio>'+'<i class="fa fa-volume-up"></i>' +'</span></div></div><div class="clearfix"></div></div>'
						
					+'</div></div></div>';
					
					
					var str2 ='';
					
						
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="audiospan ">'+'<i class="length">'+finalsize+'"</i>'+'<i class="redspot"></i>'+'<audio  src="'+objectURL+'" ></audio>'+'<i class="fa fa-volume-up"></i>'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';





					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
						messagetobottom();

					} else {
						$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
						messagetobottom();
					}
					
					/*消息内容容器*/
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				})
				
				
				
				break;
			case 'groupchat':
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					
					
					/*消息列表记录*/
					var str = '';
					
					
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[语音]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[语音]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					
					
					
					
					
					
					
					
					
					/*str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[语音]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}*/
					/*消息列表记录*/
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="audiospan ">'+'<i class="length">'+finalsize+'"</i>'+'<i class="redspot"></i>'+'<audio  src="'+objectURL+'" ></audio>'+'<i class="fa fa-volume-up"></i>'+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';
						
						str2 = '<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="audiospan ">'+'<i class="length">'+finalsize+'"</i>'+'<i class="redspot"></i>'+'<audio  src="'+objectURL+'" ></audio>'+'<i class="fa fa-volume-up"></i>'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';




						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
						
						
						
						
						
						
						
						
						
						
					
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					
					
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				break;
			case 'chatroom':
				
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 = '<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="audiospan ">'+'<i class="length">'+finalsize+'"</i>'+'<i class="redspot"></i>'+'<audio  src="'+objectURL+'" ></audio>'+'<i class="fa fa-volume-up"></i>'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				break;
		}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		};  

			options.onFileDownloadError = function () {
			  //音频下载失败 
			};  

			//通知服务器将音频转为mp3
			options.headers = { 
			  'Accept': 'audio/mp3'
			};

			WebIM.utils.download.call(conn, options);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},   //收到音频消息
	
    onLocationMessage: function ( message ) {
		
		
		/*var bodyId = message.id;         // 需要发送已读回执的消息id
		var msg = new WebIM.message('read', msgId);
		msg.set({
			id: bodyId
			,to: message.from
		});
		Demo.conn.send(msg.body);
		对方收到已送达回执的回调函数是onReadMessage*/
		
		vm.nomessage = false;
		console.log('位置消息');
		message.time = getCurrentTime();
		
		
		var msgtype = message.type;
		switch( msgtype ){
			case 'chat':
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					console.log(res);
					
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
				
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					
					
					/*消息列表记录*/
					var str = '';

					str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[位置]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


					/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
						$('.mainleft .comlist1').prepend(str);

					} else {
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);

					}*/
					
					
					if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

					} else {


						if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

						}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.from).remove();
								$('.mainleft .comlist1').prepend(str);
								}

					}

					/*消息列表记录*/
					
					/*消息内容容器*/
					var str1 = '';
					
					str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+
						
					'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="locationspan">'+
						'<a href="map.html?v1='+message.lng+'&v2='+message.lat+'" target="_blank"><img class="mapimg" src="http://api.map.baidu.com/staticimage/v2?ak=HIpuFBetnp1KKYrfcleBipO6x31IeI63&mcode=666666&center='+message.lng+','+message.lat+'&width=400&height=300&zoom=16">'+'<div class="mapaddr">'+message.addr+'</div></a>'
						+'</span></div></div><div class="clearfix"><div></div>'
						
					+'</div></div></div>';
					
					
					var str2 ='';
					
						
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="locationspan ">'+
						'<a href="map.html?v1='+message.lng+'&v2='+message.lat+'" target="_blank"><img class="mapimg" src="http://api.map.baidu.com/staticimage/v2?ak=HIpuFBetnp1KKYrfcleBipO6x31IeI63&mcode=666666&center='+message.lng+','+message.lat+'&width=400&height=300&zoom=16">'+'<div class="mapaddr">'+message.addr+'</div></a>'
						+'</span></div></div><div class="clearfix"><div></div>'+'</div>';





					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
						messagetobottom();

					} else {
						$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
						messagetobottom();
					}
					
					/*消息内容容器*/
					
					
					
					
					
					
					
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				})
				
				
				
				break;
			case 'groupchat':
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					
					
					/*消息列表记录*/
					var str = '';
					
					
					
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[位置]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );

								}else {
										//没有置顶
										$('.mainleft .comlist1  #'+message.to).remove();
										$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[位置]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );

								}else {
										//没有置顶
										$('.mainleft .comlist1  #'+message.to).remove();
										$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					
					
					
					
					
					
					
					
					/*str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[地理位置]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}*/
					/*消息列表记录*/
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'"  class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="locationspan">'+
							'<a href="map.html?v1='+message.lng+'&v2='+message.lat+'" target="_blank"><img class="mapimg" src="http://api.map.baidu.com/staticimage/v2?ak=HIpuFBetnp1KKYrfcleBipO6x31IeI63&mcode=666666&center='+message.lng+','+message.lat+'&width=400&height=300&zoom=16">'+'<div class="mapaddr">'+message.addr+'</div></a>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="locationspan">'+'<a href="map.html?v1='+message.lng+'&v2='+message.lat+'" target="_blank"><img class="mapimg" src="http://api.map.baidu.com/staticimage/v2?ak=HIpuFBetnp1KKYrfcleBipO6x31IeI63&mcode=666666&center='+message.lng+','+message.lat+'&width=400&height=300&zoom=16">'+'<div class="mapaddr">'+message.addr+'</div></a>'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';







						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
						
						
						
						
						
					
					}).catch(function(err){
						console.log(err);
					})
					
					
					
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				break;
			case 'chatroom':
				
				
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="locationspan">'+'<a href="map.html?v1='+message.lng+'&v2='+message.lat+'" target="_blank"><img class="mapimg" src="http://api.map.baidu.com/staticimage/v2?ak=HIpuFBetnp1KKYrfcleBipO6x31IeI63&mcode=666666&center='+message.lng+','+message.lat+'&width=400&height=300&zoom=16">'+'<div class="mapaddr">'+message.addr+'</div></a>'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				
				
				
				
				
				break;
		
		}
		
		
		
		
	},//收到位置消息
	
    onFileMessage: function ( message ) {
		
		/*var bodyId = message.id;         // 需要发送已读回执的消息id
		var msg = new WebIM.message('read', msgId);
		msg.set({
			id: bodyId
			,to: message.from
		});
		Demo.conn.send(msg.body);
		对方收到已送达回执的回调函数是onReadMessage*/
		
		vm.nomessage = false;
		console.log('文件消息');
		message.time = getCurrentTime();
		console.log(message);
		
		var msgtype = message.type;
		
		switch( msgtype ){
			case 'chat':
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
				
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					console.log(message.url);
					console.log(message.filename);
					
					
					/*消息列表记录*/
					var str = '';

					str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[文件]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


					/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
						$('.mainleft .comlist1').prepend(str);

					} else {
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);

					}*/
					
					
					
					if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
						$('.mainleft .comlist1').prepend(str);

					} else {


						if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
						//有置顶
						$('.mainleft .doublefirst').html( str );

						}else {
						//没有置顶
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);
						}

					}

					/*消息列表记录*/
					
					
					/*消息内容容器*/
					var str1 = '';
					
					str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+
						
					'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="filespan">'+
						'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
						+'</span></div></div><div class="clearfix"><div></div>'
						
					+'</div></div></div>';
					
					
					var str2 ='';
					
						
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="filespan ">'+
						'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
						+'</span></div></div><div class="clearfix"><div></div>'+'</div>';





					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
						messagetobottom();

					} else {
						$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
						messagetobottom();
					}
					
					/*消息内容容器*/
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				})
					
				break;
			case 'groupchat':
				
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					
					/*消息列表记录*/
					var str = '';
					
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[文件]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[文件]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					
					
					
					
					
					
					
					
					
					/*str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[文件]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}*/
					/*消息列表记录*/
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+ 
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div>';







						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
						
					
					}).catch(function(err){
						console.log(err);
					});
					
				
				}).catch(function(err){
					console.log(err);
				});
				
				
				break;
			case 'chatroom':
				
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+ 
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				
				
				break;
		
		
		
		}
		
		
	},    //收到文件消息
	
    onVideoMessage: function (message) {
		
		/*var bodyId = message.id;         // 需要发送已读回执的消息id
		var msg = new WebIM.message('read', msgId);
		msg.set({
			id: bodyId
			,to: message.from
		});
		WebIM.conn.send(msg.body);
		//对方收到已送达回执的回调函数是onReadMessage*/
		
		vm.nomessage = false;
		console.log('视频消息');
		message.time = getCurrentTime();
		console.log(message);
		var msgtype = message.type;
		
		var fire = message.ext.fire_flag;
				
		
		switch( msgtype ){
			case 'chat':
				
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.from +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
				
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					console.log(message.url);
					console.log(message.filename);
					
					
					
					
					if (fire){
						//即焚
						
						//消息列表记录
						var str = '';

						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[请到移动端查看]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


						/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
							$('.mainleft .comlist1').prepend(str);

						} else {
							$('.mainleft .comlist1  #'+message.from).remove();
							$('.mainleft .comlist1').prepend(str);

						}*/


						if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
							$('.mainleft .comlist1').prepend(str);

						} else {


							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
							//有置顶
							$('.mainleft .doublefirst').html( str );

							}else {
							//没有置顶
							$('.mainleft .comlist1  #'+message.from).remove();
							$('.mainleft .comlist1').prepend(str);
							}

						}

						//消息列表记录
						
						
						var str1 = '';

						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'

						+'</div></div></div>';


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="words">'+'[请到移动端查看]'+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
						

						
						
						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}
						



					}else {
						//非即焚
						
						
						//消息列表记录
						var str = '';

						str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[视频]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';


						/*if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
							$('.mainleft .comlist1').prepend(str);

						} else {
							$('.mainleft .comlist1  #'+message.from).remove();
							$('.mainleft .comlist1').prepend(str);

						}*/


						if ( $('.mainleft   #'+message.from+'.listOnecon').length < 1 ){
							$('.mainleft .comlist1').prepend(str);

						} else {


							if ( $('.mainleft .doublefirst #'+message.from+'.listOnecon').html() ){
							//有置顶
							$('.mainleft .doublefirst').html( str );

							}else {
							//没有置顶
							$('.mainleft .comlist1  #'+message.from).remove();
							$('.mainleft .comlist1').prepend(str);
							}

						}

						//消息列表记录
						
						
						//消息内容容器
						var str1 = '';

						str1 =  '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+

						'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="filespan">'+
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"><div></div>'

						+'</div></div></div>';


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(message.avatar ? vm.$refs.rightthree.picsrc+ message.avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+message.name+'</div><div class="wordscontent"><span class="filespan ">'+
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'">下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"><div></div>'+'</div>';





						if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
							messagetobottom();

						} else {
							$('.mainright .rightonechatcon  #'+message.from+'.msgconmaster  .msgcontainer').append( str2 );
							messagetobottom();
						}

						//消息内容容器

						
						
						
						
						
						
						
					}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}).catch(function(err){
					console.log(err);
				})
					
				break;
			case 'groupchat':
				
				
				
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
					console.log(res);
					
					function messagetobottom (){
						var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
						var cli = scroll1.clientHeight;
						var main = $('.mainright .rightcomOne  #'+ message.to +".msgconmaster" )[0];
						var hei = main.scrollHeight;
						$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
					};
					
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var name = data.name;
					var genre =data.genre;
					var msgfrom = message.from;//群组内部发送消息的人
					
					message.avatar = avatar;
					message.name = name;
					message.genre = genre;
					
					console.log(message);
					
					/*消息列表记录*/
					var str = '';
					
					
					
					
					axios.get(globaldomain+'im/group/conf/info.json?groupId='+message.to).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						
						
						
						
						if (hinder){
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[视频]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}else {
							
							str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+'[视频]'+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+message.to+'"></i><i id="'+message.to+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							
							
							/*if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
								$('.mainleft .comlist1').prepend(str);
							} else {
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
							}*/
							
							
							if ( $('.mainleft   #'+message.to+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+message.to+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+message.to).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					/*消息列表记录*/
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						//获取群组聊天里发送人的详细信息
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						
						
						/*生成的消息内容容器*/
						var str1 = '';

						str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgcontainer"><div id="'+message.id+'"  class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>';	


						var str2 ='';


						str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+ 
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div>';







						if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

							$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

							messagetobottom();

						} else {

							$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster  .msgcontainer').append( str2 );

							messagetobottom();


						}

						/*生成的消息内容容器*/
						
						
						
						
						
					
					}).catch(function(err){
						console.log(err);
					});
					
				
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				break;
			case 'chatroom':
				
				console.log(message);
				
				function messagetobottom (){
					var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
					var cli = scroll1.clientHeight;
					var main = $('.mainright .rightTwo .chatroommessageid')[0];
					var hei = main.scrollHeight;
					$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
				};
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					//获取群组聊天里发送人的详细信息
					var data = res.data.data;
					console.log(data);
					var avatar = data.avatar;
					var nickname = data.nickname;
						
						
					//生成的消息内容容器
						
					var str2 ='';
					
					
					str2 ='<div id="'+message.id+'" class="msgmarginlr">'+'<div class="timernow">'+message.time+'</div>'+'<div  class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span class="filespan">'+ 
							'<div class="fileconleft"><div class="filename">'+message.filename+'</div><div class="filedownload"><a href="'+message.url+'" target=_blank>下载</a></div></div><div class="fileconright"><img src="imgs/document.png"></div><div class="clearfix"></div>'
							+'</span></div></div><div class="clearfix"></div></div>'+'</div>';
					
						

					$('.mainright .rightTwo .righttwochatcon  .chatroommessageid  .msgcontainer').append( str2 );

					messagetobottom();
						
					//生成的消息内容容器
						
				}).catch(function(err){
					console.log(err);
				});
				
				
				
				break;
		
		
		
		}
        
        var option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(conn, option);
    },   //收到视频消息
	
	onPresence: function ( message ) {
		console.log('处理“广播”或“发布-订阅”消息');
		console.log(message);
		
	},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
	
	onBlacklistUpdate: function (list) {       
        console.log('黑名单变动');
		
        console.log(list);
		
		
    },// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
	//黑名单变动
	
    onReceivedMessage: function(message){
		console.log('收到消息送达客户端回执');
		console.log(message);
	},    //收到消息送达客户端回执
	
    onDeliveredMessage: function(message){
		console.log('消息送达服务器回执，pc发送的消息已经发送到了环信！');
		console.log(message);
		
	},   //收到消息送达服务器回执
	
    onReadMessage: function(message){
	},        //收到消息已读回执
	
    onCreateGroup: function(message){
		console.log('创建群组成功回执');
		console.log(message);
	},        //创建群组成功回执（需调用createGroupNew）
	
    onMutedMessage: function(message){
		console.log('用户在A群组被禁言');
		console.log(message);
	}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    
});

var store = new Vuex.Store({
	state:{
		user:ids,
		userfriends:myfriends,
		usergroups:mygroups,
		showgroupsright:true,
		right3groupid:'',
		right3friendid:'',
		message:[],
		chat:[],
		groupchat:[],
		chatroom:[],
		mainchatselectall:false,
	},
	mutations:{
		showfriends:function(state){
			return state.userfriends = myfriends;
		},
		showgroups:function(state){
			return state.usergroups = mygroups;
		},
		showgroupsinfo:function(state,value){
			return state.showgroupsright = value;
		},
		rightgroupbtn:function(state,value){
			return state.right3groupid = value; 
		},
		rightfriendbtn:function(state,value){
			return state.right3friendid = value;
		},
		
		selectallaction:function(state,value){
			return state.mainchatselectall = value;
		},
	},
	getters:{
		friendsarrOne:function(state){
			return state.userfriends;
		},
		groupsarrOne:function(state){
			return state.usergroups;
		},
		showgroupsinfo:function(state){
			return state.showgroupsright;
		},
		right3groupid:function(state){
			return state.right3groupid;
		},
		right3friendid:function(state){
			return state.right3friendid;
		},
		getallmessage:function(state){
			return state.message;
		},
		getselectallstate:function(state){
			return state.mainchatselectall;
		},
	},
});   

Vue.component('currentuser',{
	template:'#current',
	data:function(){
		return {
			currentImg:this.$store.state.user.avatar ? globalimg + this.$store.state.user.avatar :'imgs/default1.png',
			searchshow:false,
			showslidebars:false,
			mainsearchval:'',
			username:this.$store.state.user.nickname,
			isboy:ids.sex == 1? true: false,
			isgirl:ids.sex == 0? true: false,
			currentusershow: false,
			areaId:this.$store.state.user.areaId ?this.$store.state.user.areaId:' ',
			signature: this.$store.state.user.signature ?this.$store.state.user.signature:' ',
			top1:'',
			left1:'',
			serachingornot:true,
			picsrc:globalimg,
			defaultpic:'imgs/default1.png',
			haveresult:false,
			tempfriendsarrcon:[],
			tempgroupsarrcon:[],
			icons1:true,
			icons2:false,
			icons3:false,
			avatar:'',
			groupsarrOne1:[],
		}
	},
	created:function(){
	},
	computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
	}),
	methods:{
		popcurrent:function($event){
			this.currentusershow = true;
			this.showslidebars = false;
			this.top1 = $event.y+"px";
			this.left1 = $event.x -300 +"px";
			
			
		},//显示当前用户卡片
		mainsearch:function() {
			this.searchshow = true;
			
			axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
				var data = res.data.data.content;
					
				vm.$refs.current.groupsarrOne1 = data;
					
					
				console.log(vm.$refs.current.groupsarrOne1);
					
				console.log(data);
			}).catch(function(err){
				console.log(err);
			}); 
			
			
			if ( this.mainsearchval =='' ){
				
				this.serachingornot = true;
				vm.$refs.current.tempfriendsarrcon = [];
				vm.$refs.current.tempgroupsarrcon = [];
				//vm.groupsarrOne1 = 
				
				
				
					
				
			} else {
				this.serachingornot = false;
				
				console.log(this.mainsearchval);
				var keywords = this.mainsearchval;
				console.log( keywords );
				axios.post(globaldomain +'im/buddy/query.json?key='+keywords).then(function(res){
					
					var content = res.data.data;
					var length = res.data.data.length;
					
					console.log(content);
					
					if ( length>0 ){
						vm.$refs.current.tempfriendsarrcon.push(content);
						
						console.log(vm.$refs.current.tempfriendsarrcon);
						
						console.log('好友有结果');
						
						vm.$refs.current.haveresult = true;
						
					} else {
						
						console.log('好友无结果');
						
					}
				}).catch(function(err){
					
					console.log(err);
					
				});//获取关键字好友
				
				axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000&name='+keywords).then(function(res){
					var data = res.data.data;
					var content = res.data.data.content;
					console.log(content);
					
					var length = res.data.data.content.length;
					if ( length>0 ){
						vm.$refs.current.tempgroupsarrcon.push(content);
						
						console.log(vm.$refs.current.tempgroupsarrcon);
						
						console.log('群组有结果');
						
						vm.$refs.current.haveresult = true;
						
					} else {
						console.log('群组无结果');
					}
					
				}).catch(function(err){
					//console.log(err);
				});//获取关键字的群组
				
				
			}
			
			
		},//主搜索
		
		nosearchfriendtalking:function($event){
			
			vm.nomessage = false;
			
			console.log($event.currentTarget);
			var that = $event.currentTarget;
			var id = $(that).attr("id");
			var avatar = $(that).attr("data-avatar");
			var nick = $(that).attr("data-nick");
			var obj2={};
			
			var friendid = id;
			
			
			axios.get(globaldomain+'im/user/detail.json?id='+friendid).then(function(res){
				var data = res.data.data;
				console.log(data);
				
				
				
				vm.groupnumbershow = false;
				var data =res.data.data;
				console.log(data);
				var name = data.nickname;
				vm.rightoneheaderobj.name = name;
				vm.targetid = friendid;


				vm.isgroupleader= false;
				vm.isgroupmanager = false;//管理员
				vm.notgroupmanager = false;//不是管理员
				vm.justoneman = true;//只是个人
				vm.shouldshow = false;
				vm.strangeroff = false;
				vm.strangeron = false;
				
			}).catch(function(err){
				console.log(err);
			});

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			obj2.name = nick;
			obj2.avatar = avatar;
				
			obj2.type="chat";
			obj2.id = id;
				
			console.log(obj2);
			console.log(obj2.id);
				
			var str ='';
			
			var str1 = '<div id="'+obj2.id+'" class="msgconmaster hidden"><div class="msgcontainer"></div></div>';
			
			
			
			
			
				
			str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
			
				
			if ( $('.mainleft  #'+obj2.id+'.listOnecon').length < 1 ){
				$('.mainleft .comlist1').prepend(str);
				$('.mainright .rightonechatcon .manywindowcon.scroll-content').append(str1); 
				$('#'+obj2.id+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}else {
				//有置顶
				console.log($('.mainleft .doublefirst  #'+obj2.id+'.listOnecon').html() );
				
				$('#'+obj2.id+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
				
				
				
				//没置顶
			}
			
			
			
			
		},//没有关键字点击搜索结果中好友列表触发
		nosearchgrouptalking:function($event){
			
			vm.nomessage = false;
			
			var that = $event.currentTarget;
			var name = $(that).attr('data-nick');
			var avatar = $(that).attr('data-avatar');
			var id = $(that).attr('id');
			var groupid = id;
			console.log(id);
			
			
			
			
			
			
			var obj1 ={};
			obj1.avatar = avatar;
			obj1.name = name;
			obj1.to = id;
				
			
			
			var str1 = '<div id="'+obj1.to+'" class="msgconmaster hidden"><div class="msgcontainer"></div></div>';

			$('#'+obj1.to+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
				
			obj1.type="groupchat";
			var str = '';
			str = '<div id="'+obj1.to+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
				
				
			console.log($('.mainleft .comlist1  #'+obj1.to+'.listOnecon').length);
				
			if ( $('.mainleft   #'+obj1.to+'.listOnecon').length < 1 ){
				$('.mainleft .comlist1').prepend(str);
				$('.mainright .rightonechatcon .manywindowcon.scroll-content').append(str1); 
				
				$('#'+obj1.to+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}else {
				//是否置顶
				$('#'+obj1.to+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
				
			}
			
			
		
		},//没有关键字点击搜索结果中群组列表触发
		searchgrouptalking:function($event){
			
			vm.nomessage = false;
			
			var that = $event.currentTarget;
			
			var name = $(that).attr('data-nick');
			var avatar = $(that).attr('data-avatar');
			var id = $(that).attr('id');
			
			var groupid = id;
			
			
			
			axios.get(globaldomain+'im/group/info.json?id='+groupid).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;//群组特别标识
				console.log(data);


				vm.isgroupleader= false;
				vm.isgroupmanager = false;//管理员
				vm.notgroupmanager = false;//不是管理员
						//vm.justoneman = true;//只是个人
				vm.shouldshow = false;
				vm.groupidbindminus = groupid;

					//var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;

				vm.rightoneheaderobj.name = name;
				vm.rightoneheaderobj.groupnumber = groupnumber;
				vm.targetid = groupid;

				vm.groupnumbershow = true;


				axios.get(globaldomain+'im/group/member/genre.json?groupId='+groupid+'&memberId='+ids.id).then(function(res){
					console.log(res.data);
					var level = res.data.data;
					console.log(level);

					console.log(  typeof(level));
					switch (level) {
						case '10':
							console.log(10);
							vm.isgroupleader= true;
							vm.isgroupmanager = false;//管理员
							vm.notgroupmanager = false;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = true;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
						case '20':
							vm.isgroupleader= false;
							vm.isgroupmanager = true;//管理员
							vm.notgroupmanager = false;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = true;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
						case '30':
							vm.isgroupleader= false;
							vm.isgroupmanager = false;//管理员
							vm.notgroupmanager = true;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = false;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
					}



				}).catch(function(err){
					console.log(err);
				});




				axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+groupid).then(function(res){
					console.log(res);
					var arrgg = res.data.data.content;
					console.log(arrgg);
					vm.slidechagearr = arrgg;






				}).catch(function(err){
					console.log(err);
				});



			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			console.log(id);
			
			var obj1 ={};
			obj1.avatar = avatar;
			obj1.name = name;
			obj1.to = id;
			
			var str1 = '<div id="'+obj1.to+'" class="msgconmaster hidden"><div class="msgcontainer"></div></div>';
				
			obj1.type="groupchat";
			var str = '';
			str = '<div id="'+obj1.to+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
				
				
			console.log( $('.mainleft .comlist1  #'+obj1.to+'.listOnecon').length );
				
			if ( $('.mainleft   #'+obj1.to+'.listOnecon').length < 1 ){
				$('.mainleft .comlist1').prepend(str);
				$('.mainright .rightonechatcon .manywindowcon.scroll-content').append(str1);
				
				
				$('#'+obj1.to+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}else {
				$('#'+obj1.to+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}
			
			
			
			
		},//关键字搜索群组触发
		searchfriendtalking:function($event){
			
			vm.nomessage = false;
			
			console.log($event.currentTarget);
			var that = $event.currentTarget;
			var id = $(that).attr("id");
			var avatar = $(that).attr("data-avatar");
			var nick = $(that).attr("data-nick");
			var obj2={};
			var friendid = id;
			
			
			axios.get(globaldomain+'im/user/detail.json?id='+friendid).then(function(res){
				var data = res.data.data;
				console.log(data);
				
				
				
				vm.groupnumbershow = false;
				var data =res.data.data;
				console.log(data);
				var name = data.nickname;
				vm.rightoneheaderobj.name = name;
				vm.targetid = friendid;


				vm.isgroupleader= false;
				vm.isgroupmanager = false;//管理员
				vm.notgroupmanager = false;//不是管理员
				vm.justoneman = true;//只是个人
				vm.shouldshow = false;
				vm.strangeroff = false;
				vm.strangeron = false;
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			
			
			obj2.name = nick;
			obj2.avatar = avatar;
				
			obj2.type="chat";
			obj2.id = id;
				
			console.log(obj2);
				
			var str ='';
			
			var str1 = '<div id="'+obj2.id+'" class="msgconmaster hidden"><div class="msgcontainer"></div></div>';
			
			
			$('#'+obj2.id+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
				
			str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
				
			console.log( $('.mainleft .comlist1  #'+obj2.id+'.listOnecon').length );
			
				
			if ( $('.mainleft   #'+obj2.id+'.listOnecon').length < 1 ){
				$('.mainleft .comlist1').prepend(str);
				$('.mainright .rightonechatcon .manywindowcon.scroll-content').append(str1);
				$('#'+obj2.id+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}else {
				$('#'+obj2.id+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
			}
			
			
			
			
		},//关键字搜索好友触发
		
		startchat:function(){
			tempcreategroup = '';
			vm.readychatshow = true;
			
			vm.slebossswicth = true;
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				var friendsarr = res.data.data;
				
				myfriends = friendsarr;
				
				vm.$store.commit('showfriends');
				
				var timer1 = setTimeout(function(){
					
					initials();
					clearTimeout(timer1);
				},20);//显示滚动条
				console.log(myfriends);
				
				vm.mainstartgroupchatarr = myfriends;
				
				
				
				
			}).catch(function(err){
				console.log(err);
			});
			
		},//发起聊天弹框初始化
		feedbackpop:function(){
			console.log(this);
			var thiscom = this.$parent;
			console.log(thiscom);
			thiscom.feedbackshow = true;
		},//发起反馈
		exit:function(){
			conn.close();
			//http://47.95.6.203:8183/signout.json
			axios.get(globaldomain+'signout.json').then(function(res){
				console.log(res);
				window.location.href="index.html";
			}).catch(function(err){
				console.log(err);
			})
		},//退出
		changebar:function(){
			this.showslidebars = !this.showslidebars;
			this.currentusershow = false;
		},//弹出汉堡菜单
		addbluecolor1:function(){
			this.icons1 = true;
			this.icons2 = false;
			this.icons3 = false;
			vm.currentView = 'comlistcomOne';
			vm.currentView1 = 'rightcomOne';
			vm.showleft1 = true;
			vm.showleft2 = false;
			vm.showleft3 = false;
			vm.mainrightone = true;
			vm.mainrighttwo = false;
			vm.specialthree = false;
			
			
		},//改变icon1 颜色
		
		addbluecolor2:function(){
			this.icons1 = false;
			this.icons2 = true;
			this.icons3 = false;
			vm.currentView = 'comlistcomTwo';
			vm.currentView1 = 'rightcomTwo';
			vm.showleft1 = false;
			vm.showleft2 = true;
			vm.showleft3 = false;
			vm.mainrightone = false;
			vm.mainrighttwo = true;
			
			
			vm.specialthree = false;
			//聊天室获取
			
			axios.post(globaldomain+'im/room/area/find.json').then(function(res){
				//聊天室地区数组
				var data = res.data.data;
				console.log(data);
				
				
				
				vm.chatroomarea = data;
				 
				
				
				
				//chatroomarea:[],
				//chatroomclass:[],
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			axios.post(globaldomain+'im/room/trade/find.json').then(function(res){
				//聊天室行业数组
				var data = res.data.data;
				
				vm.chatroomclass = data;
				console.log(data);
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
				
				var data = res.data.data;
				
				var content = data.content;
				
				
				vm.chatroominfo = content;
				
				console.log(vm.chatroominfo);
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
		},//改变icon2 颜色
		
		addbluecolor3:function(){
			this.icons1 = false;
			this.icons2 = false;
			this.icons3 = true;
			
			axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
				var data = res.data.data.content;
				vm.groupsarrOne1 = data;
				console.log(data);
			}).catch(function(err){
				console.log(err);
			})
			var listimer1 = setTimeout(function(){
				initials1();
				clearTimeout('listimer1');
			},90);
			vm.showleft1 = false;
			vm.showleft2 = false;
			vm.showleft3 = true;
			vm.mainrightone = false;
			vm.mainrighttwo = false;
			vm.specialthree = true;
		},//改变icon3 颜色
		
	}
})



Vue.component('rightcomthree',{
	template:'#rightcomThree',
	data:function(){
		return {
			name:'群组',
			id:'',
			avatar:'',
			defaultpic:'imgs/default1.png',
			picsrc:globalimg,
			level:30,
			idf:'',
			namef:'人员',
			girl:false,
			gender:'',
			signature:'',
			remark:'',
			areaId:'',
			avatar1:'',
			showgroupsright:true,
			showgroupsright1:false,
			showowner:false,
			
		}
		
	},
	computed:{
		right3groupid:function(){
			return this.$parent.$store.getters.right3groupid;
		},
		right3friendid:function(){
			return this.$parent.$store.getters.right3friendid;
		},
		
	},
	watch:{
		right3groupid:function(){
			axios.get(globaldomain+'im/group/info.json?id='+this.right3groupid).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;
				var level = data.genre;
				
				vm.$children[1].name = name;
				vm.$children[1].level = level;
				vm.$children[1].id = id;
				vm.$children[1].avatar = avatar;
				
				console.log(data);
				
				
				
				var pageNum = 1,
					pageSize = 5000;
					var options = {
						pageNum: pageNum,
						pageSize: pageSize,
						groupId: id,
						success: function (resp) {
							console.log(resp);
							console.log(resp.data);
							var arr = resp.data;
							console.log(arr);
							
							var getlast = _.find(arr,'owner');
							
							var owner = getlast.owner;
							
							console.log(owner);
							if ( owner == ids.id ) {
								vm.$refs.rightthree.showowner= true;
							} else {
								vm.$refs.rightthree.showowner= false;
							}
							
							
						},
						error: function(e){
							console.log(e);
						}
					};
				conn.listGroupMember(options);
				
				
				
				
				
				
				
				
				
				
				
			}).catch(function(err){
				console.log(err);
			});
		},
		right3friendid:function(){
			axios.get(globaldomain+'im/user/detail.json?id='+this.right3friendid).then(function(res){
				var data = res.data.data;
				console.log(data);
				var idf = data.id;
				var namef = data.nickname;
				var gender = data.sex;
				if ( gender == 1 ){
					vm.$children[1].girl = false;
				}else {
					vm.$children[1].girl = true;
				}
				var signature = data.signature;
				var remark = data.remark;
				var areaId = data.areaId;
				var avatar1 = data.avatar;
				
				vm.$children[1].idf = idf;
				vm.$children[1].namef = namef;
				vm.$children[1].signature = signature;
				vm.$children[1].remark = remark;
				vm.$children[1].areaId = areaId;
				vm.$children[1].avatar1 = avatar1;
				
			}).catch(function(err){
				console.log(err);
			})
		},
		
		
		
		
		
		
		
		
	},
	methods:{
		addchatlistg:function($event){
			
			var groupid = $event.currentTarget.getAttribute('id');
			console.log(vm.chathistoryarr1);
			console.log(groupid);
			vm.nomessage = false;
			vm.targetid = groupid;
			
			axios.get(globaldomain+'im/group/info.json?id='+groupid).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;//群组特别标识
				console.log(data);
				vm.isgroupleader= false;
				vm.isgroupmanager = false;//管理员
				vm.notgroupmanager = false;//不是管理员
						//vm.justoneman = true;//只是个人
				vm.shouldshow = false;
				vm.groupidbindminus = groupid;

					//var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;

				vm.rightoneheaderobj.name = name;
				vm.rightoneheaderobj.groupnumber = groupnumber;
				vm.targetid = groupid;

				vm.groupnumbershow = true;
				
				
				axios.get(globaldomain+'im/group/member/genre.json?groupId='+groupid+'&memberId='+ids.id).then(function(res){
					console.log(res.data);
					var level = res.data.data;
					console.log(level);

					console.log(  typeof(level));
					switch (level) {
						case '10':
							console.log(10);
							vm.isgroupleader= true;
							vm.isgroupmanager = false;//管理员
							vm.notgroupmanager = false;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = true;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
						case '20':
							vm.isgroupleader= false;
							vm.isgroupmanager = true;//管理员
							vm.notgroupmanager = false;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = true;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
						case '30':
							vm.isgroupleader= false;
							vm.isgroupmanager = false;//管理员
							vm.notgroupmanager = true;//不是管理员
							vm.justoneman = false;//只是个人
							vm.shouldshow = false;
							vm.strangeroff = false;
							vm.strangeropen = false;
							break;
					}



				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+groupid).then(function(res){
					console.log(res);
					var arrgg = res.data.data.content;
					console.log(arrgg);
					vm.slidechagearr = arrgg;






				}).catch(function(err){
					console.log(err);
				});
		
			
				
				var obj1 ={};
				obj1.avatar = avatar;
				obj1.name = name;
				obj1.to = id;
				
				obj1.type="groupchat";
				
				console.log(obj1);
				
				var str = '';

				var str1 = '<div id="'+groupid+'" class="msgconmaster hidden"><div class="msgcontainer"></div></div>';
				
				
				$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
				
				axios.get(globaldomain+'im/group/conf/info.json?groupId='+groupid).then(function(res){
						var data = res.data.data;
						console.log( data );
						var hinder = data.hinder;
						console.log(hinder);
						if (hinder){
							//被屏蔽
							str = str + '<div id="'+groupid+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue">'+''+'</div></div><div class="listOneconright"><div class="listOnetopright">'+''+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o" id="'+groupid+'"></i><i id="'+groupid+'" class="fa fa-bell hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
							
							if ( $('.mainleft   #'+groupid+'.listOnecon').length < 1 ){
								//会话列表中不存在
								$('.mainleft .comlist1').prepend(str);
								
								$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
								
								$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
								
								
								
								
								
							} else {
								//会话列表存在
								
								
								/*var html = $('.mainleft .comlist1  #'+groupid).html();
								console.log(html);
								
								
								$('.mainleft .comlist1  #'+groupid).remove();
								$('.mainleft .comlist1').prepend(str);
								
								$('.mainleft .comlist1  #'+groupid).html( html );
								
								$('.mainleft .comlist1  #'+groupid).addClass( 'backgroundcolor' );*/
								
								
								
								//不在置顶框
								
								
								
								$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
								console.log( $('.mainleft .doublefirst  #'+groupid+'.listOnecon') );
								console.log($('.mainleft .doublefirst  #'+groupid+'.listOnecon').html());
								
								if ( $('.mainleft .doublefirst  #'+groupid+'.listOnecon').html()=='' ){
									//置顶中不存在
									var html = $('.mainleft .comlist1  #'+groupid).html();
									console.log(html);

									$('.mainleft .comlist1  #'+groupid).remove();
									$('.mainleft .comlist1').prepend(str);

									$('.mainleft .comlist1  #'+groupid).html( html );

									$('.mainleft .comlist1  #'+groupid).addClass('backgroundcolor');$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
									
									
								}else {
									//置顶中存在
									$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
									
								}
								
								
								//在置顶框
								
								
								
								
								
								
								
							}
							
							
						}else {
							//未屏蔽
							str = str + '<div id="'+groupid+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue">'+''+'</div></div><div class="listOneconright"><div class="listOnetopright">'+''+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+groupid+'"></i><i id="'+groupid+'" class="fa fa-bell"></i></div></div><div class="clearfix"></div></div></div>';
							
							$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
							
							if ( $('.mainleft   #'+groupid+'.listOnecon').length < 1 ){
								//列表中不存在
								$('.mainleft .comlist1').prepend(str);
								$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
								
							} else {
								//列表中存在
								
								console.log( $('.mainleft .doublefirst  #'+groupid+'.listOnecon') );
								console.log($('.mainleft .doublefirst  #'+groupid+'.listOnecon').html());
								
								if ( $('.mainleft .doublefirst  #'+groupid+'.listOnecon').html()=='' ){
									//不在置顶框
									var html = $('.mainleft .comlist1  #'+groupid).html();
									console.log(html);

									$('.mainleft .comlist1  #'+groupid).remove();
									$('.mainleft .comlist1').prepend(str);

									$('.mainleft .comlist1  #'+groupid).html( html );

									$('.mainleft .comlist1  #'+groupid).addClass( 'backgroundcolor' );
									
									$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
									
									
								}else {
									//在置顶框
									
									$('#'+groupid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
									
								}
								
								
								//在置顶框
								
								
								
							}
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					});
				
			
				
				/*页面跳转*/
				vm.$refs.current.icons1 = true;
				vm.$refs.current.icons2 = false;
				vm.$refs.current.icons3 = false;
				vm.specialthree = false;
				vm.mainrightone = true;
				vm.showleft1 = true;
				vm.showleft2 = false;
				vm.showleft3 = false;
				
				/*页面跳转*/
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
		},//发起群组聊天按钮
		addchatlistf:function($event){
			
			console.log(vm.chathistoryarr1);
			var friendid = $event.currentTarget.getAttribute('id');
			vm.nomessage = false;
			axios.get(globaldomain+'im/user/detail.json?id='+friendid).then(function(res){
				var data = res.data.data;
				console.log(data);
				
				
				
				vm.groupnumbershow = false;
				var data =res.data.data;
				console.log(data);
				var name = data.nickname;
				vm.rightoneheaderobj.name = name;
				vm.targetid = friendid;


				vm.isgroupleader= false;
				vm.isgroupmanager = false;//管理员
				vm.notgroupmanager = false;//不是管理员
				vm.justoneman = true;//只是个人
				vm.shouldshow = false;
				vm.strangeroff = false;
				vm.strangeron = false;


				
				
				var name = data.nickname;
				var avatar = data.avatar;
				var id = data.id;//好友个人标识
				var obj2 = {};
				
				obj2.name = name;
				obj2.avatar = avatar;
				
				obj2.type="chat";
				obj2.id = id;
				
				console.log(obj2);
				
				
				
				console.log( friendid );
				console.log(obj2.id);
				
				var str1 = '<div id="'+friendid+'" class="msgconmaster"><div class="msgcontainer"></div></div>';
				
				
				
				
				console.log( str1 );
				
				var str ='';
				
				str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
				
				
				if ( $('.mainleft   #'+friendid+'.listOnecon').length < 1 ){
					//消息记录里面没
					$('.mainleft .comlist1').prepend(str);
					
					$('.mainright .rightonechatcon .manywindowcon.scroll-content').append(str1);
					
					$('#'+friendid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
					
					
				}else {
					
					//消息记录有
					
					$('#'+friendid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
					
					
					if ( $('.mainleft .doublefirst  #'+obj2.id+'.listOnecon').html() ){
						//被置顶
						
						$('#'+friendid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
						
						
						
					}else {
						//没有置顶
						var html = $('.mainleft .comlist1  #'+obj2.id).html();
						$('.mainleft .comlist1  #'+obj2.id).remove();
						$('.mainleft .comlist1').prepend( str );
						$('.mainleft .comlist1  #'+obj2.id).html( html );
						
						$('#'+friendid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden'); 
					}
					
				}
				
				
				/*页面跳转*/
				vm.$refs.current.icons1 = true;
				vm.$refs.current.icons2 = false;
				vm.$refs.current.icons3 = false;
				vm.specialthree = false;
				vm.mainrightone = true;
				vm.showleft1 = true;
				vm.showleft2 = false;
				vm.showleft3 = false;
				/*页面跳转*/
			}).catch(function(err){
				console.log(err);
			})
			
			
			
		},//发起好友聊天按钮
	}
	
});


	
var vm = new Vue({
	el:"#messagemaster",
	store:store,
	data:{
		feedbacktext:'',
		feedbackshow:false,
		readychatshow:false,
		placeholderfeed:'用户体验很好！',
		sel1:true,
		sel2:false,
		slebossswicth:false,
		slebossswicth1:false,
		
		selectallornot:false,
		beginchatbtnable:false,
		selectOnly1ornot:false,
		selectOnly2ornot:true,
		createarr1:[],
		btnswitchmaster:false,
		creategroup2:[],
		mainrightone:true,
		mainrighttwo:false,
		specialthree:false,
		
		
		chathistoryarr1:[],
		chathistoryarr1copy:[],
		
		
		
		
		picsrc:globalimg,
		defaultpic:'imgs/default1.png',
		whiteon:'',
		indexstrange:'',
		indexstrange2:false,
		showleft1:true,
		showleft2:false,
		showleft3:false,
		cardmingzi:false,
		
		
		
		listoneadd:'',
		
		
		count:0,
		
		chatroomarea:[],
		chatroomclass:[],
		chatroominfo:[],
		
		
		comlist1:'',
		
		nomessage:true,
		
		
		
		showgroupcontrol:false,
		name:'暂无消息',
		isgroupmaster:false,
		
		isgroupleader:false,//等着追踪是否为群主
		isgroupmanager:false,//管理员
		notgroupmanager:false,//不是管理员
		justoneman:false,//只是个人
		shouldshow:false,
		isgroupmanagermenu1:false,
		
		defaulthide:false,
		switchbindid:'',
		messagearr:[],
		
		
		
		redcount:false,
		
		rightoneheaderobj:{
			name:'',
			groupnumber:'',
		},
		groupnumbershow:false,
		targetid:'',
		
		
		
		
		sendbtncontent:'',
		
		
		mainstartgroupchatarr:[],
		
		selectmaingrouparr:[],
		selectall:[],
		
		selectallstate1:false,
		
		bridgeindex2:'',
		
		alertinfoshow:false,
		alertinfocon:'请到移动端进行相关操作',
		
		slidechagearr:[],//下拉列表好友基群组容器
		
		
		
		onlyonelistmenushow:false,
		onlyonelistmenushow1:false,
		addmyfriendshow:false,
		removemembershow:false,
		
		repeatmyfriendsarr:[],
		groupidbindminus:'',
		deletegrouparr:[],
		addselesctallarr:[],
		removeselectallarr:[],
		addgrouparr:[],
		allusershow:false,
		top2:'',
		left2:'',
		isboys:true,
		usernames:'',
		areaIds:'',
		signatures:'',
		isgirls:false,
		addonname:'',
		selectavatar2:'',
		
		emojishow:false,
		emojiobj: {
			'[):]': 'ee_1.png',
			'[:D]': 'ee_2.png',
			'[;)]': 'ee_3.png',
			'[:-o]': 'ee_4.png',
			'[:p]': 'ee_5.png',
			'[(H)]': 'ee_6.png',
			'[:@]': 'ee_7.png',
			'[:s]': 'ee_8.png',
			'[:$]': 'ee_9.png',
			'[:(]': 'ee_10.png',
			'[:\'(]': 'ee_11.png',
			'[:|]': 'ee_12.png',
			'[(a)]': 'ee_13.png',
			'[8o|]': 'ee_14.png',
			'[8-|]': 'ee_15.png',
			'[+o(]': 'ee_16.png',
			'[<o)]': 'ee_17.png',
			'[|-)]': 'ee_18.png',
			'[*-)]': 'ee_19.png',
			'[:-#]': 'ee_20.png',
			'[:-*]': 'ee_21.png',
			'[^o)]': 'ee_22.png',
			'[8-)]': 'ee_23.png',
			'[(|)]': 'ee_24.png',
			'[(u)]': 'ee_25.png',
			'[(S)]': 'ee_26.png',
			'[(*)]': 'ee_27.png',
			'[(#)]': 'ee_28.png',
			'[(R)]': 'ee_29.png',
			'[({)]': 'ee_30.png',
			'[(})]': 'ee_31.png',
			'[(k)]': 'ee_32.png',
			'[(F)]': 'ee_33.png',
			'[(W)]': 'ee_34.png',
			'[(D)]': 'ee_35.png'
    	},
		emojisrc:'faces/',
		sendtextcontent:'',
		//chatroompublic:true,
		nosearchchatroom:true,
		searchchatroom:false,
		chatroomsearching:[],
		twoplaceholder:true,
		privatechatroompass:false,
		publicchatnow:false,
		thischatroomindex:'str',
		thischatroomindex1:'str',
		chatroomindex1:'str',
		chatroomindex2:'str',
		
		chatroomprivatename:'',
		chatroomprivateid:'',
		chatroomprivateavatar:'',
		chatroompopshow:false,
		chatroompopwindowinfo:'',
		//chatroomstatus:'',
		chatroomtitlename:'',
		ischatmaster:false,
		ischatmanager:false,
		showchatcontrol1:false,
		showchatcontrol2:false,
		
		all1:true,
		all2:true,
		
		
		chattargetid:'',
		chattextcontent:'',
		chatbtncontent:'',
		
		poppicviewer:false,
		piccurrentviewsrc:'',
		pictureviewarr:[],
		
		
		rightclickthreeshow:false,
		leftthree1:'',
		topthree1:'',
		clearscreenshow:false,
		clearid:'',
		leftthree2:'',
		topthree2:'',
		msgthreeshow:false,
		msgthreeshow2:false,
		msgthreeshow3:false,
		leftthree3:'',
		topthree3:'',
		leftthree4:'',
		topthree4:'',
		
		getmsgid:'',
		msgthreeshow4:false,
		leftthree5:'',
		topthree5:'',
		retweetshow:false,
		popleftlists:false,
		popleftlists1:false,
		popleft11:'',
		poptop11:'',
		popleft1:'',
		poptop1:'',
		
		managechatlistmenuid:'',
		messageusershow:false,
		msgtop1:'',
		msgleft1:'',
		meisgirl:false,
		meisboy:false,
		myname:'',
		myareaId:'',
		mysignature:'',
		mycurrentImg:'',
		
		msgusershow:false,
		msgtop2:'',
		msgleft2:'',
		selectavatar3:'',
		msgusernames:'',
		otherisgirls:'',
		otherisboys:'',
		msgaddonname:'',
		msgareaIds:'',
		msgsignatures:'',
		
		mingpianshow:false,
		msgtop3:'',
		msgleft3:'',
		selectavatar4:'',
		msgage:'',
		msgunit:'',
		msglevel:'',
		msgtruename:'',
		mingpianisboys:'',
		mingpianisgirls:'',
		mingpiannames:'',
		
		friendlistmenushow:false,
		addavatar:'',
		addnickname:'',
		createmyfriendshow:false,
		
		pleasemobileshow:false,
		changegroupinfoshow:false,
		changegroupinfoshow1:false,
		groupnamea:'',
		groupbroada:'',
		
		judgefriendid:'',
		strangeroff:false,
		strangeropen:false,
		firstshow:false,
		groupsarrOne1:[],
		showall1:false,
		chatroomnamea:'',
		chatroombroada:'',
		chatroomnumershow:false,
		chatcounter:'',
		slidechatarr:[],
		chatshouldshow:false,
		chataddmyfriendshow:false,
		chatremovemembershow:false,
		chatrepeatmyfriendsarr:[],
		chatdeletegrouparr:[],
		chataddgrouparr:[],
		targetid1:'',
	},
	
	computed:{
		friendsarrOne:function(){
			return vm.$store.getters.friendsarrOne;
		},
		groupsarrOne:function(){
			return vm.$store.getters.groupsarrOne;
		},
		getallmessage:function(){
			return vm.$store.getters.getallmessage;
		},
		getchat:function(){
			return vm.$store.getters.getchat;
		},
		getgroupchat:function(){
			return vm.$store.getters.getgroupchat;
		},
		getchatroom:function(){
			return vm.$store.getters.getchatroom;
		},
		getselectallstate:function(){
			return vm.$store.getters.getselectallstate;
		}
		
	},
	created:function(){
		var options = { 
		  apiUrl: WebIM.config.apiURL,
		  user: ids.id,
		  pwd: ids.psw,
		  appKey: WebIM.config.appkey
		};
		conn.open(options);
		axios.post(globaldomain+'im/buddy/find.json').then(function(res){
			myfriends = res.data.data;
			vm.$store.state.userfriends = myfriends;
		}).catch(function(err){
			console.log(err);
		});//获取所有好友
		axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
			mygroups = res.data.data.content;
			
			vm.$store.state.usergroups = mygroups;
			
		}).catch(function(err){
			console.log(err);
		});//获取加入的群组
		
	},
	
	methods:{
		exitalert:function(){
			vm.alertinfoshow = false;
			
		},//关闭警告框
		exitalert1:function(){
			vm.alertinfoshow = false;
		},//关闭警告框
		clearsearch:function(){
			
			vm.$refs.current._data.searchshow = false;
			vm.$refs.current.tempfriendsarrcon = [];
			vm.$refs.current.tempgroupsarrcon = [];
			vm.isgroupmaster = false;
			vm.allusershow = false;
			vm.clearscreenshow = false;
			vm.msgthreeshow = false;
			vm.msgthreeshow2 = false;
			vm.msgthreeshow3 = false;
			vm.msgthreeshow4 = false;
			vm.messageusershow = false;
			vm.msgusershow = false;
			vm.popleftlists = false;
			vm.mingpianshow = false;
			vm.isgroupmanagermenu1 = false;
			vm.popleftlists1 = false;
			vm.showchatcontrol1 = false;
			vm.showchatcontrol2 = false;
			vm.emojishow = false;
			vm.emojishow1 = false;
		},//关闭搜索框
		selectcurrentinput:function($event){
			console.log($event);
			
			console.log($event.currentTarget);
			var selectnow  = $event.currentTarget;
			
			console.log($(selectnow));
			
			
			if ( $(selectnow).is(':checked') ){
				
				
				
			} else {
				
				
				console.log($('.selectallcon input').prop('checked'));
				
				$('.selectallcon input').attr("checked",false);
				
				
				
				
			}
			
			
			
			
			
			
		},//选择主搜索好友列表*/
		pleasegotomoblie:function(){
			vm.chatroompopshow = true;
			vm.chatroompopwindowinfo = '禁言操作请到移动端执行!';
			
			
		},//提示到移动端操作
		delmanyinput:function($event){
			var that = $event.currentTarget;
			console.log(that.checked);
			console.log(vm.$refs.delselall);
			
			var checkstate = that.checked;
			if ( checkstate ){
				
			}else {
				vm.$refs.delselall.checked = false; 
			}
			
			
		},//删除会话成员里面的单个input
		addmanyinput:function($event){
			var that = $event.currentTarget;
			console.log(vm.$refs);
			var checkstate = that.checked;
			if (checkstate){
				
			}else {
				vm.$refs.addselall.checked = false;
			}
		},//添加会话成员的单个input
		deletepeoplefromgroup:function($event){
			var id = $event.currentTarget.id;
			console.log(id);
			console.log(vm.deletegrouparr);
			var middle = vm.deletegrouparr;
			
			var transstring = middle.join(",");
			console.log(transstring);
			axios.post(globaldomain+'im/group/member/kick.json?groupId='+id+'&memberIds='+transstring).then(function(res){
				
				var data = res.data;
				console.log(data);
				var success = data.success;
				if (success){
					vm.removemembershow = false;
					vm.deletegrouparr = [];
				}else {
					vm.deletegrouparr = [];
				}
			}).catch(function(err){
				console.log(err);
			})
		},//删除会话成员确定按钮
		addpeoplefromfriends:function($event){
			console.log($event);
			var that = $event.currentTarget;
			console.log(that.id);
			var id = that.id;
			var arrtostring = vm.addgrouparr.join(",");
			
			//vm.addgrouparr = ;
			console.log(arrtostring);
			axios.post(globaldomain+'im/group/member/join.json?groupId='+id+'&memberIds='+arrtostring).then(function(res){
				var data = res.data;
				console.log(data);
				var success = data.success;
				if (success){
					vm.addmyfriendshow = false;
					vm.addgrouparr = [];
				}else {
					vm.addgrouparr = [];
				}
				
			}).catch(function(err){
				console.log(err);
			})
			
		},//添加会话成员确定按钮
		grouprightsel1:function($event){
			var that = $event.currentTarget;
			var index =  $(that).attr('data-index');
			var id = $(that).attr('id');
			
			console.log(id);
			
			vm.bridgeindex2 = index;
			console.log(vm.bridgeindex2);
			
			tempcreategroup = id;//选定的群组
			
			
			console.log( tempcreategroup );
			
			
		},//发起聊天群组被点击
		clearslidebars:function(){
			this.$children[0].showslidebars = false;
		},//关闭汉堡菜单
		clearcurrentinfo:function(){
			this.$children[0].currentusershow = false;
		},//关闭用户卡片
		exitfeedback:function(){
			this.feedbackshow = false;
			
		},//关闭反馈框
		sendfeedback:function(){
			axios.post(globaldomain+'im/feedback/append.json?content='+vm.feedbacktext+'&name='+ids.nickname+'&contact='+ids.loginName).then(function(res){
				console.log(res.data);
				var code = res.data.code;
				console.log(code);
				switch (code) {
					case 2000:
						vm.feedbackshow = false;
						console.log(vm.feedbacktext);
						break;
					case 4001:
						vm.placeholderfeed = '内容不能为空';
						return false;
						break;
				}
				
			}).catch(function(err){
				console.log(err);
			});
		},//发送反馈
		exitreadychat:function(){
			vm.readychatshow = false;
			vm.slebossswicth = false;
			vm.slebossswicth1 = false;
			vm.sel1 = true;
			vm.sel2 = false;
		},//关闭发起聊天窗口
		sel1action:function(){
			vm.sel1 = true;
			vm.sel2 = false;
			vm.slebossswicth = true;
			
			vm.slebossswicth1 = false;
			
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				var friendsarr = res.data.data;
				
				myfriends = friendsarr;
				
				vm.$store.commit('showfriends');
				
				var str1 ='';
				
				console.log(friendsarr);
				
				
				
				//vm.mainstartgroupchatarr
				
			
				var timer1 = setTimeout(function(){
					
					initials();
					clearTimeout(timer1);
				},20);//显示滚动条
				
				//initials();
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
		},//点击发起聊天的选择好友
		sel2action:function(){
			vm.sel1 = false;
			vm.sel2 = true;
			vm.slebossswicth = false;
			vm.slebossswicth1 = true;
			
			axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
				var groupsarr = res.data.data.content;
				
				
				
				
				
				//console.log(data);
				mygroups = groupsarr;
				console.log(mygroups);
				
				vm.$store.commit('showgroups');
				
				console.log(vm.$store.state.usergroups);
			}).catch(function(err){
				console.log(err);
			});
			
		},//点击发起聊天的选择群聊
		getemojisrc:function($event){
			var that = $event.currentTarget;
			//console.log(that);
			groupemojisrc = $(that).attr("src");
			console.log(groupemojisrc);
			
			console.log($(that).attr("src"));
			console.log($(that).attr("id"));
			var emojitrack = $(that).attr("id");
			
			
			
			
			
			//console.log(vm.sendtextcontent);暂时为空
			console.log(vm.sendbtncontent);
			vm.sendbtncontent = vm.sendbtncontent + emojitrack;
			
			
			
			//vm.sendbtncontent = ;
			//vm.sendtextcontent = ;
			
			
			
		},//点击emoji表情，抓取路径
		selectbossornot:function($event){
			console.log(vm.selectmaingrouparr);
			var that = $event.currentTarget;
			var subinput = $('.transreadychat .sort_box input');
			console.log( subinput );
			if ( $(that).find('input').prop('checked') ) {
				subinput.prop("checked", true);
				console.log(vm.selectall);
				console.log(vm.selectmaingrouparr);
				var temparr1 = [];
				for (var i = 0; i < subinput.length; i++){
					console.log(i);
					console.log(subinput.eq(i)[0].value );
					temparr1.push(subinput.eq(i)[0].value);
				}
				console.log(temparr1);
				vm.selectmaingrouparr = temparr1;
			} else {
				$('.transreadychat .sort_box input').prop("checked", false);
				vm.selectmaingrouparr=[];
			}
			
		},//发起聊天全部选择或取消
		showtheoneinfos:function($event){
			vm.allusershow = true;
			var that = $event.currentTarget;
			
			var id = that.id;
			console.log(that.id);
			
			vm.judgefriendid = id;
			
			vm.left2 = $event.clientX-200 +"px";
			vm.top2 = $event.clientY +"px";
			console.log(vm.left2);
			console.log(vm.top2);
			
			axios.get(globaldomain+'im/user/detail.json?id='+id).then(function(res){
				
				var data = res.data.data;
				console.log(data);
				var areaId = data.areaId;
				var avatar = data.avatar;
				var isBuddy = data.isBuddy;
				var nickname = data.nickname;
				var remark = data.remark;
				var sex = data.sex;
				var signature = data.signature;
				
				vm.areaIds = areaId;
				vm.signatures = signature;
				vm.addonname = remark;
				vm.usernames = nickname;
				if (sex == '1'){
					vm.isboys = true;
					vm.isgirls = false;
				}else {
					vm.isgirls = true;
					vm.isboys = false;
				}
				vm.selectavatar2 = avatar;
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
		},//显示出当前用户信息卡片
		creategroupOne:function(){
			
			if (vm.selectmaingrouparr.length > 1 ){
				
				axios.post(globaldomain+'im/group/create.json?name=群聊&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
				
					var code = res.data.code;
					console.log(res.data);

					if ( code == 2000 ){
						var groupid = res.data.data;
						console.log(groupid);
						var members = tempcreategroup;
						console.log(typeof (members));


						console.log(members);
						if ( members == "" ) {
							//没有选择群的话，将好友向群里面拉入
							
							console.log(vm.selectmaingrouparr);
							var bri = vm.selectmaingrouparr;
							var transferstr = bri.join(",");
							console.log(transferstr);
							console.log( groupid );
							
							axios.post(globaldomain+'im/group/member/join.json?groupId='+groupid+'&memberIds='+transferstr).then(function(res){
								console.log(res.data);
								
								
								axios.get(globaldomain+'im/group/info.json?id='+groupid).then(function(res){
									var data = res.data.data;
									console.log(data);
									
									var getavatar = data.avatar;
									var getname = data.name;
									var groupid = data.id;//群组特别标识
									
									var str = '';
									
									str = str + '<div id="'+groupid+'" class="listOnecon"><img src="'+( getavatar ? vm.$refs.rightthree.picsrc+getavatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+getname+'</div><div class="listOnebottomleft shenglue">'+''+'</div></div><div class="listOneconright"><div class="listOnetopright">'+''+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o hidden" id="'+groupid+'"></i><i id="'+groupid+'" class="fa fa-bell "></i></div></div><div class="clearfix"></div></div></div>';
									
									vm.nomessage = false;
									$('.mainleft .comlist1').prepend( str );
									
									
									
									
									/*页面跳转*/
									vm.$refs.current.icons1 = true;
									vm.$refs.current.icons2 = false;
									vm.$refs.current.icons3 = false;
									vm.specialthree = false;
									vm.mainrightone = true;
									vm.showleft1 = true;
									vm.showleft2 = false;
									vm.showleft3 = false;

									/*页面跳转*/ 
									
									
									
									
									
									
									
									
									
									
									
								}).catch(function(err){
									console.log(err);
								})
								
								
								
								
								
								
							}).catch(function(err){
								console.log(err);
							});
							
							

							vm.readychatshow = false;
							vm.slebossswicth = false;
							vm.slebossswicth1 = false;
							vm.sel1 = true;
							vm.sel2 = false;
							//关闭发起聊天界面

							console.log('没群组，直接关闭界面');

						}else {



							axios.post(globaldomain+'im/group/apply/pull.json?groupId='+groupid+'&groupIds='+members+'&descr=pc端').then(function(res){
								console.log(res.data);
								var success = res.data.success;
								console.log(success);
								if ( success ) {
									vm.readychatshow = false;
									vm.slebossswicth = false;
									vm.slebossswicth1 = false;
									vm.sel1 = true;
									vm.sel2 = false;
									vm.alertinfoshow = true;
									
									/*页面跳转*/
									vm.$refs.current.icons1 = true;
									vm.$refs.current.icons2 = false;
									vm.$refs.current.icons3 = false;
									vm.specialthree = false;
									vm.mainrightone = true;
									vm.showleft1 = true;
									vm.showleft2 = false;
									vm.showleft3 = false;

									/*页面跳转*/ 
									//关闭发起聊天界面
								}else {
									
									
									/*页面跳转*/
									vm.$refs.current.icons1 = true;
									vm.$refs.current.icons2 = false;
									vm.$refs.current.icons3 = false;
									vm.specialthree = false;
									vm.mainrightone = true;
									vm.showleft1 = true;
									vm.showleft2 = false;
									vm.showleft3 = false;

									/*页面跳转*/ 

								}



							}).catch(function(err){
								console.log(err);
							})


						}






					}


				}).catch(function(err){
					console.log(err);

				});
				
			} else {
				
				
				
				
				vm.nomessage = false;
				
				console.log(vm.selectmaingrouparr);
				var friendid = vm.selectmaingrouparr[0];
				console.log(friendid);
				
				var members = tempcreategroup;
				console.log(typeof (members));
				
				
				if( members != '' ){
				   //选中群组
					
					axios.post(globaldomain+'im/group/create.json?name=群聊&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
						
						var code = res.data.code;
						console.log(res.data);

						if ( code == 2000 ){
							var groupid = res.data.data;
							console.log(groupid);
							
							axios.post(globaldomain+'im/group/apply/pull.json?groupId='+groupid+'&groupIds='+members+'&descr=pc端').then(function(res){
								console.log(res.data);
								var success = res.data.success;
								console.log(success);
								if ( success ) {
									vm.readychatshow = false;
									vm.slebossswicth = false;
									vm.slebossswicth1 = false;
									vm.sel1 = true;
									vm.sel2 = false;
									vm.alertinfoshow = true;
									
									
									
									

									//页面跳转
									vm.$refs.current.icons1 = true;
									vm.$refs.current.icons2 = false;
									vm.$refs.current.icons3 = false;
									vm.specialthree = false;
									vm.mainrightone = true;
									vm.showleft1 = true;
									vm.showleft2 = false;
									vm.showleft3 = false;

									//页面跳转
									//关闭发起聊天界面
								}else {
									
									
									//页面跳转
									vm.$refs.current.icons1 = true;
									vm.$refs.current.icons2 = false;
									vm.$refs.current.icons3 = false;
									vm.specialthree = false;
									vm.mainrightone = true;
									vm.showleft1 = true;
									vm.showleft2 = false;
									vm.showleft3 = false;

									//页面跳转

								}



							}).catch(function(err){
								console.log(err);
							})
							
							
							
						}
						
						
					}).catch(function(err){
						console.log(err);
					})
					
					
					
					
					
				}else {
				   //未选
					axios.get(globaldomain+'im/user/detail.json?id='+friendid).then(function(res){
						var data = res.data.data;
						console.log(data);
						var name = data.nickname;
						var avatar = data.avatar;
						var id = data.id;//好友个人标识
						var obj2 = {};
						obj2.name = name;
						obj2.avatar = avatar;
						obj2.type="chat";
						obj2.id = id;
						console.log(obj2);
						var str ='';
						str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
						if ( $('.mainleft   #'+obj2.id).length < 1 ){
							$('.mainleft .comlist1').prepend(str);
						}else {
							
							
							
						}

						//页面跳转
						vm.$refs.current.icons1 = true;
						vm.$refs.current.icons2 = false;
						vm.$refs.current.icons3 = false;
						vm.specialthree = false;
						vm.mainrightone = true;
						vm.showleft1 = true;
						vm.showleft2 = false;
						vm.showleft3 = false;
						//页面跳转
						vm.readychatshow = false;
						vm.slebossswicth = false;
						vm.slebossswicth1 = false;
						vm.sel1 = true;
						vm.sel2 = false;
						//关闭发起聊天界面














					}).catch(function(err){
							console.log(err);	
					});
				}
				
				
				
			}
			
		},//确定创建群聊
		offuserlist2:function(){
			vm.onlyonelistmenushow = false;
		},//关闭群组成员列表
		
		
		
		
		changelistcolor1:function($event){
			//console.log(vm);
			//console.log(vm.$children[1]);
			//console.log($event.currentTarget);
			var indexinner = $event.currentTarget.getAttribute('data-index');
			this.indexstrange = indexinner;
			//console.log(this.indexstrange);
			this.indexstrange2 = indexinner;
			var idnumber = $event.currentTarget.getAttribute('id');
			//console.log(vm.$children[1]);
			
			vm.$children[1].showgroupsright = true;
			vm.$store.commit('rightgroupbtn',idnumber);
			vm.$children[1].showgroupsright1 = false;
			
			
			
			
		},//点击群组列表
		controlchatroommember:function($event){
			vm.onlyonelistmenushow1 = true;
			
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			
			axios.get(globaldomain+'im/room/member/is/owner.json?roomId='+getid+'&memberId='+ids.id).then(function(res){
				var data = res.data.data;
				console.log(data);
				if (data){
					//是超级管理
					
					vm.chatshouldshow = true;
				}
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			axios.get(globaldomain+'im/room/member/is/admin.json?roomId='+getid+'&memberId='+ids.id).then(function(res){
				var data = res.data.data;
				console.log(data);
				if (data){
					//是普通管理
					vm.chatshouldshow = false;
					
				}
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			axios.get(globaldomain+'im/room/member/all.json?sPageNoTR=1&sPageSizeTR=10000&roomId='+getid).then(function(res){
				var data = res.data.data.content;
				console.log(data);
				vm.slidechatarr = data;
			}).catch(function(err){
				console.log(err);
			})
			
			
			
			
			//vm.slidechatarr = '';
			
			
		},//管理聊天室人员
		chatdeleteallcheck:function($event){
			var that = $event.currentTarget;
			
			console.log(that.checked);
			console.log(vm.removeselectallarr);
			var checkstate = that.checked;
			
			if ( checkstate ){
				
				console.log( $('.sort_box9 input') );
				
				var length = vm.chatrepeatmyfriendsarr.length;
				console.log($('.sort_box9 input').prop("checked"));
				var arrtemp = [];
				
				for ( var i=0; i<length;i++ ){
					//console.log($('.sort_box9 input').eq(i)[0].value);
					arrtemp.push($('.sort_box9 input').eq(i)[0].value);
				}
				console.log(arrtemp);
				vm.chatdeletegrouparr = arrtemp;
			} else {
				vm.chatdeletegrouparr =[];
			}
			
		},//聊天室删除会话成员的全选
		chataddallcheck:function($event){
			
			var that = $event.currentTarget;
			console.log(that.checked);
			var checkstate = that.checked;
			
			if (checkstate){
				var arr = [];
				var length = vm.chatrepeatmyfriendsarr.length;
				for ( var i=0;i<length;i++ ){
					arr.push($('.sort_box8 input').eq(i)[0].value);
				}
				vm.chataddgrouparr = arr;
			}else {
				vm.chataddgrouparr = [];
			}
		},//聊天室添加会话成员全选
		deletepeoplefromgroup1:function($event){
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			
			var trans = vm.chatdeletegrouparr;
			var dot = trans.join(',');
			console.log(dot);
			
			axios.post(globaldomain+'im/room/member/kick.json?roomId='+getid+'&memberIds='+dot).then(function(res){
				console.log(res);
				vm.chatremovemembershow = false;
				
			}).catch(function(err){
				console.log(err);
			})
			
			
			
		},//删除聊天室成员按钮
		chataddconpop:function($event){
			vm.chataddmyfriendshow = true;
			vm.chatrepeatmyfriendsarr = [];
			var that = $event.currentTarget;
			
			var getid = $(that).attr('id');
			
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				var data = res.data.data;
				console.log(data);
				vm.chatrepeatmyfriendsarr = data;
				var timer89 = setTimeout(function(){
					
					initials8();
					clearTimeout(timer89);
				},400);
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
		},//聊天室加号
		chatdelmanyinput:function($event){
			var that = $event.currentTarget;
			console.log(that.checked);
			console.log(vm.$refs.delselall);
			
			var checkstate = that.checked;
			if ( checkstate ){
				
			}else {
				vm.$refs.chatdelselall.checked = false; 
			}
			
			
		},//聊天室删除会话成员里面的单个input
		chataddmanyinput:function($event){
			var that = $event.currentTarget;
			console.log(vm.$refs);
			var checkstate = that.checked;
			if (checkstate){
				
			}else {
				vm.$refs.chataddselall.checked = false;
			}
		},//聊天室添加会话成员的单个input
		chatreduceconpop1:function($event){
			vm.chatremovemembershow = true;
			vm.chatdeletegrouparr = [];
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			axios.get(globaldomain+'im/room/member/membership.json?roomId='+getid).then(function(res){
				
				var data = res.data.data[0].members;
				console.log(data);
				vm.chatrepeatmyfriendsarr = data;
				
				var timer90 = setTimeout(function(){
					initials9();
					clearTimeout( timer90 );
				},400);
				
				
			}).then(function(err){
				console.log(err);
			});
			
			
		},//聊天室减号
		
		addpeoplefromfriends1:function($event){
			
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			console.log(vm.chataddgrouparr);
			var trans = vm.chataddgrouparr;
			var dot = trans.join(',');
			console.log(dot);
			
			axios.post(globaldomain+'im/room/member/join.json?roomId='+getid+'&memberIds='+dot).then(function(res){
				console.log(res);
				vm.chataddmyfriendshow = false;
				
			}).catch(function(err){
				console.log(err);
			});//拉人函数
			
			
		},//聊天室加人
		
		
		controlchatroominfo:function($event){
			vm.changegroupinfoshow1 = true;
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			
			axios.get(globaldomain+'im/room/info.json?id='+getid).then(function(res){
				var data = res.data.data;
				console.log(data);
				var getname = data.name;
				var getinfo = data.notice;
				
				vm.chatroomnamea = getname;
				vm.chatroombroada = getinfo;
				
				
				
			}).catch(function(err){
				console.log(err);
			})
			
			
		},//查看聊天室公告
		changechatinfo:function($event){
			
			var that = $event.currentTarget;
			var getid = $(that).attr('id');
			
			axios.post(globaldomain+'im/room/set/notice.json?id='+getid+'&notice='+vm.chatroombroada).then(function(res){
				var data = res.data;
				console.log(data);
				vm.changegroupinfoshow1 = false;
			}).catch(function(err){
				console.log(err);
			})
		},//修改聊天室公告
		changegroupinfoaction:function(){
			vm.changegroupinfoshow = true;
			axios.get(globaldomain+'im/group/info.json?id='+vm.targetid).then(function(res){
				var data = res.data.data;
				vm.groupnamea = data.name;
				vm.groupbroada = data.descr;
				
			}).catch(function(err){
				console.log(err);
			});
		},//修改群组信息
		changetwogroup:function($event){
			var getid = $( $event.currentTarget ).attr('id');
			axios.post(globaldomain+'im/group/set/name.json?id='+getid+'&name='+vm.groupnamea).then(function(res){
				var data = res.data;
				console.log( data );
				/*axios.get(globaldomain+'im/group/info.json?id='+getid).then(function(res){
					var data = res.data.data;
					console.log(data);
				}).catch(function(err){
					console.log(err);
				})*/
				console.log(vm.groupnamea);
				$('.mainleft .threepiecelists .comlistouter1 #'+getid+'.listOnecon .listOnetopleft').text(vm.groupnamea);
				
				vm.rightoneheaderobj.name = vm.groupnamea;
				
				
				
				
			}).catch(function(err){
				console.log(err);
			});
			axios.post(globaldomain+'im/group/set/notice.json?id='+getid+'&notice='+vm.groupbroada).then(function(res){
				var data = res.data;
			}).catch(function(err){
				console.log(err);
			});
			vm.changegroupinfoshow = false;
		},//修改群组信息
		changelistcolor2:function($event){
			var idnumber = $event.currentTarget.getAttribute('id');
			var indexinner = $event.currentTarget.getAttribute('data-index');
			this.indexstrange2 = indexinner;
			this.indexstrange = 'string';
			this.indexstrange2 = -1-this.indexstrange2;
			vm.$children[1].showgroupsright = false;
			vm.$store.commit('rightfriendbtn',idnumber);
			vm.$children[1].showgroupsright1 = true;
		},//点击好友列表
		isgroupleadermenu:function(){
			vm.isgroupmaster = !vm.isgroupmaster;
			
			
			
		},//是群主时弹出菜单
		isgroupmanagermenu:function(){
			vm.isgroupmanagermenu1 = true;
			
		},//是群管理员时弹出列表
		notgroupmanagermenu:function(){
			vm.onlyonelistmenushow = true;
		},//不是管理员时弹出列表
		onlyusermenu:function($event){
			vm.friendlistmenushow = true;
			vm.slidechagearr = [];
			console.log($event.currentTarget);
			var getid = $($event.currentTarget).attr('id');
			
			axios.get(globaldomain+'im/user/detail.json?id='+getid).then(function(res){
				
				var data = res.data.data;
				console.log(data);
				
				vm.addavatar = data.avatar;
				vm.addnickname = data.nickname;
				
				console.log( vm.addavatar );
				console.log( vm.addnickname );
				
			}).catch(function(err){
				console.log(err);
			});
			
			
		},//只是单人时弹出列表
		shutonlyonelist:function(){
			vm.onlyonelistmenushow = false;
		},//关闭名单列表
		popourmenu:function(){
			vm.onlyonelistmenushow = true;
			
		},//群主时，点击管理群组按钮
		/*popourmenu:function(){
			vm.onlyonelistmenushow1 = true;
			
		},//群主时，点击管理群组按钮*/
		addconpop:function(){
			vm.addmyfriendshow = true;
			vm.removemembershow = false;
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				
				var data = res.data.data;
				console.log(data);
				vm.repeatmyfriendsarr = data;
				console.log( vm.repeatmyfriendsarr );
				
				var addtimer4 = setTimeout(function(){
					initials2();
					clearTimeout(addtimer4);
				},400);
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
		},//加号图标
		addconpop1:function(){
			vm.createmyfriendshow = true;
			vm.removemembershow = false;
			
			
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				
				var data = res.data.data;
				console.log(data);
				vm.repeatmyfriendsarr = data;
				console.log( vm.repeatmyfriendsarr );
				
				var addtimer4 = setTimeout(function(){
					initials2();
					clearTimeout(addtimer4);
				},400);
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
		},//单人加号图标
		createnewgroup6:function(){
			console.log(vm.addgrouparr);
			var getid = $('.addmyfriends .feedhead div').attr('id');
			if (vm.addgrouparr.length > 1 ){
				
				console.log( 'length > 1' );
				
				axios.post(globaldomain+'im/group/create.json?name=群聊&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
				
					var code = res.data.code;
					console.log(res.data);

					if ( code == 2000 ){
						var groupid = res.data.data;
						console.log(groupid);
						
							//没有选择群的话，将好友向群里面拉入
							console.log(vm.addgrouparr);
							var bri = vm.addgrouparr;
							var transferstr = bri.join(",");
							console.log(transferstr);
							console.log( groupid );
						
							axios.post(globaldomain+'im/group/member/join.json?groupId='+groupid+'&memberIds='+transferstr).then(function(res){
								console.log(res.data);
							}).catch(function(err){
								console.log(err);
							});

							/*vm.readychatshow = false;
							vm.slebossswicth = false;
							vm.slebossswicth1 = false;
							vm.sel1 = true;
							vm.sel2 = false;*/
							vm.createmyfriendshow = false;
							//关闭发起聊天界面

					}


				}).catch(function(err){
					console.log(err);

				});
				
			} else {
				console.log( 'length = 1' );
				var getarr = vm.addgrouparr;
				var arrtostr = getarr.join('');
				console.log(arrtostr);
				if ( getid == arrtostr ){
					console.log(vm.addgrouparr);
					vm.createmyfriendshow = false;
					return false;
				}else {
					//之选中一个人，三人群组
					vm.addgrouparr.push(getid);
					console.log(vm.addgrouparr);
				}
		};
			
			
		},//单人聊天创建群组
		reduceconpop:function($event){
			vm.addmyfriendshow = false;
			vm.removemembershow = true;
			var id = $event.currentTarget.getAttribute('id');
			console.log(id);
			axios.get(globaldomain+'im/group/member/find.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+id).then(function(res){
				console.log(res);
				var data = res.data.data.content;
				console.log(data);
				
				vm.repeatmyfriendsarr = data;
				console.log( vm.repeatmyfriendsarr );
				
				var addtimer5 = setTimeout(function(){
					initials3();
					clearTimeout(addtimer5);
				},400);
				
				
			}).catch(function(err){
				console.log(err);
			});
			
		},//移除群内成员减号图标
		
		
		chatreduceconpop:function($event){
			vm.addmyfriendshow = false;
			vm.removemembershow = true;
			var id = $event.currentTarget.getAttribute('id');
			console.log(id);
			axios.get(globaldomain+'im/group/member/find.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+id).then(function(res){
				console.log(res);
				var data = res.data.data.content;
				console.log(data);
				
				vm.repeatmyfriendsarr = data;
				console.log( vm.repeatmyfriendsarr );
				
				var addtimer5 = setTimeout(function(){
					initials3();
					clearTimeout(addtimer5);
				},400);
				
				
			}).catch(function(err){
				console.log(err);
			});
			
		},//移除聊天室内成员减号图标
		
		
		deleteallcheck:function($event){
			var that = $event.currentTarget;
			console.log(that.checked);
			console.log(vm.removeselectallarr);
			var checkstate = that.checked;
			
			if ( checkstate ){
				
				console.log( $('.sort_box3 input') );
				
				var length = vm.repeatmyfriendsarr.length;
				console.log($('.sort_box3 input').prop("checked"));
				var arrtemp = [];
				for ( var i=0; i<length;i++ ){
					console.log($('.sort_box3 input').eq(i)[0].value);
					arrtemp.push($('.sort_box3 input').eq(i)[0].value);
				}
				console.log(arrtemp);
				vm.deletegrouparr = arrtemp;
			} else {
				vm.deletegrouparr =[];
			}
			
		},//删除会话成员的全选
		addallcheck:function($event){
			var that = $event.currentTarget;
			console.log(that.checked);
			var checkstate = that.checked;
			if (checkstate){
				var arr = [];
				var length = vm.repeatmyfriendsarr.length;
				for ( var i=0;i<length;i++ ){
					arr.push($('.sort_box2 input').eq(i)[0].value);
				}
				vm.addgrouparr = arr;
			}else {
				vm.addgrouparr = [];
			}
		},//添加会话成员全选
		showemojicontainer:function(){
			vm.emojishow = !vm.emojishow;
		},//点击弹出表情容器
		
		uploadimg:function($event){
			var that = $event.currentTarget;
			console.log(that);
			var imgid = $(that).attr("id");
			console.log(imgid);
			console.log($(that).val());
			axios.get(globaldomain+'im/user/detail.json?id='+imgid).then(function(res){
				console.log(res.data.data);
				var data = res.data.data;
				var avatar = data.avatar;
				var str4 = '';
				if ( data ){
					var sendPrivateImg = function () {
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('img', id);        // 创建图片消息
									//var input = document.getElementById('image');  // 选择图片的input
						var input = that;  // 选择图片的input
						var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
						var allowType = {
							'jpg': true,
							'gif': true,
							'png': true,
							'bmp': true
						};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: imgid,                       // 接收消息对象
								roomType: false,
								chatType: 'singleChat',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！';
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('Success');
									console.log(file);
									console.log(file.url);
									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span class="selfpicspan">'+

									'<img  src="'+file.url+'" class="picmessagelock">'

									+'</span></div></div></div><div class="clearfix"><div></div></div>';
									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster .msgcontainer').append(str4);
									console.log(imgid);
									//聊天记录列表
									$('.mainleft   #'+imgid+' .listOnebottomleft').text('[图片]');
									var sendtime = getCurrentTime();
									$('.mainleft   #'+imgid+' .listOnetopright').text(sendtime);
									
									
									var gethtml = $('#'+imgid+'.listOnecon').html();
							
									console.log(gethtml);
									var str = '<div class="listOnecon" id="'+imgid+'">'+gethtml+'</div>';

									if ( $('.mainleft   #'+imgid+'.listOnecon').length < 1 ){
										$('.mainleft .comlist1').prepend(str);

									} else {


										if ( $('.mainleft .doublefirst #'+imgid+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );

										}else {
										//没有置顶
										$('.mainleft .comlist1  #'+imgid).remove();
										$('.mainleft .comlist1').prepend(str);
										}

									}
									
									
									//聊天记录列表
									function sendmessagetobottom1 (){
										var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightcomOne  #'+ imgid +".msgconmaster" )[0];
										var hei = main.scrollHeight;
										$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
									};
									sendmessagetobottom1();
									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster').removeClass('hidden');//对话显示
									console.log( $('.mainright .rightonechatcon  #'+imgid+'.msgconmaster') );
									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示	


									$(that).val('');
								},
							flashUpload: WebIM.flashUpload
						};
							msg.set(option);
							conn.send(msg.body);
						}
					};
					
					sendPrivateImg();
				}
		

			}).catch(function(err){
				console.log(err);
			});
			
			
			axios.get(globaldomain+'im/group/info.json?id='+imgid).then(function(res){
		
				var data = res.data.data;
				console.log(data);
				var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;
				var avatar = data.avatar;
				
				if (data){
					var sendGroupImg = function () {
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('img', id);        // 创建图片消息
						var input = that;  // 选择图片的input
						var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
						var allowType = {
							'jpg': true,
							'gif': true,
							'png': true,
							'bmp': true
							};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: imgid,                       // 接收消息对象
								roomType: false,
								chatType: 'chatRoom',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！';
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('群组图片Success');
									
									var str4 = '';

									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span class="selfpicspan">'+'<img src="'+file.url+'" class="picmessagelock">'+'</span></div></div></div><div class="clearfix"><div></div></div>';

									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster .msgcontainer').append(str4);





									//聊天记录列表
									$('.mainleft  #'+imgid+' .listOnebottomleft').text('[图片]'); 

									var sendtime = getCurrentTime();

									$('.mainleft   #'+imgid+' .listOnetopright').text(sendtime);
									
									var gethtml = $('#'+imgid+'.listOnecon').html();
							
									console.log(gethtml);
									var str = '<div class="listOnecon" id="'+imgid+'">'+gethtml+'</div>';

									if ( $('.mainleft   #'+imgid+'.listOnecon').length < 1 ){
										$('.mainleft .comlist1').prepend(str);

									} else {


										if ( $('.mainleft .doublefirst #'+imgid+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );

										}else {
										//没有置顶
										$('.mainleft .comlist1  #'+imgid).remove();
										$('.mainleft .comlist1').prepend(str);
										}

									}
									
									
									
									//聊天记录列表



									function sendmessagetobottom (){
										var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightcomOne  #'+ imgid +".msgconmaster" )[0];
										var hei = main.scrollHeight;
										$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
									};
									//发送消息滚到最下面

									sendmessagetobottom();

									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster').removeClass('hidden');//对话显示

									$('.mainright .rightonechatcon  #'+imgid+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示

									$(that).val('');
								},
							flashUpload: WebIM.flashUpload
							};
							msg.set(option);
							msg.setGroup('groupchat');
							conn.send(msg.body);
						}
					};
					sendGroupImg();
				}
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			// 群组发送图片消息
			
			
		},//上传图片
		uploadfile:function($event){
			var that = $event.currentTarget;
			console.log(that);
			var fileid = $(that).attr("id");
			console.log(fileid);
			console.log($(that).val());
			
			axios.get(globaldomain+'im/user/detail.json?id='+fileid).then(function(res){
				
				console.log(res.data.data);
				
				var data = res.data.data;

				var avatar = data.avatar;

				var str4 = '';
				
				if ( data ){
					// 单聊发送文件消息
					var sendPrivateFile = function () {
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('file', id);        // 创建文件消息
						var input = that;  // 选择文件的input
						var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
						var allowType = {
							'zip': true,
							'txt': true,
							'doc': true,
							'pdf': true,
							'mp3': true,
							'amr': true,
							'wmv': true,
							'mp4': true,
							'avi': true,
							'rmvb': true,
							'mkv': true
						};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: fileid,                       // 接收消息对象
								roomType: false,
								chatType: 'singleChat',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！';
									$(that).val('');
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('Success');
									console.log(file);
									
									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent filefix"><span class="selffilespan">'+

									'<div class="fileconleft"><div class="filename">'+file.filename+'</div><div class="filedownload"><a href="'+file.url+'" target="_blank">下载</a></div></div><div class="fileconright"><img src="imgs/document1.png"></div><div class="clearfix"></div>'

									+'</span></div></div></div><div class="clearfix"><div></div></div>';


									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster .msgcontainer').append(str4);

									console.log(fileid);



									//聊天记录列表
									$('.mainleft   #'+fileid+' .listOnebottomleft').text('[文件]'); 

									var sendtime = getCurrentTime();

									$('.mainleft   #'+fileid+' .listOnetopright').text(sendtime);
									
									
									
									
									var gethtml = $('#'+fileid+'.listOnecon').html();
							
									console.log(gethtml);
									var str = '<div class="listOnecon" id="'+fileid+'">'+gethtml+'</div>';

									if ( $('.mainleft   #'+fileid+'.listOnecon').length < 1 ){
										$('.mainleft .comlist1').prepend(str);

									} else {


										if ( $('.mainleft .doublefirst #'+fileid+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );

										}else {
										//没有置顶
										$('.mainleft .comlist1  #'+fileid).remove();
										$('.mainleft .comlist1').prepend(str);
										}

									}
									//聊天记录列表


									function sendmessagetobottom1 (){
										var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightcomOne  #'+ fileid +".msgconmaster" )[0];
										var hei = main.scrollHeight;
										$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
									};

									sendmessagetobottom1();

									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster').removeClass('hidden');//对话显示

									console.log( $('.mainright .rightonechatcon  #'+fileid+'.msgconmaster') );



									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示	
									

									$(that).val('');
								},
								flashUpload: WebIM.flashUpload
							};
							msg.set(option);
							conn.send(msg.body);
						}
					};
					
					sendPrivateFile();
					
					
				}
			
			}).catch(function(err){
				console.log(err);
			});
			
			
			axios.get(globaldomain+'im/group/info.json?id='+fileid).then(function(res){
		
				var data = res.data.data;
				console.log(data);
				var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;
				var avatar = data.avatar;
				
				if (data){
					
					
					var sendGroupFile = function () {
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('file', id);        // 创建文件消息
						var input = that;  // 选择文件的input
						var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
						var allowType = {
							'zip': true,
							'txt': true,
							'doc': true,
							'pdf': true,
							'mp3': true,
							'amr': true,
							'wmv': true,
							'mp4': true,
							'avi': true,
							'rmvb': true,
							'mkv': true
						};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: fileid,                       // 接收消息对象
								roomType: false,
								chatType: 'chatRoom',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！';
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('群组文件Success');
									
									
									var str4 = '';

									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent filefix"><span class="selffilespan">'
										+'<div class="fileconleft"><div class="filename">'+file.filename+'</div><div class="filedownload"><a href="'+file.url+'" target="_blank">下载</a></div></div><div class="fileconright"><img src="imgs/document1.png"></div><div class="clearfix"></div>'+
										'</span></div></div></div><div class="clearfix"><div></div></div>';

									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster .msgcontainer').append(str4);





									//聊天记录列表
									$('.mainleft   #'+fileid+' .listOnebottomleft').text('[文件]'); 

									var sendtime = getCurrentTime();

									$('.mainleft   #'+fileid+' .listOnetopright').text(sendtime);
									
									
									var gethtml = $('#'+fileid+'.listOnecon').html();
							
									console.log(gethtml);
									var str = '<div class="listOnecon" id="'+fileid+'">'+gethtml+'</div>';

									if ( $('.mainleft   #'+fileid+'.listOnecon').length < 1 ){
										$('.mainleft .comlist1').prepend(str);
									} else {
										if ( $('.mainleft .doublefirst #'+fileid+'.listOnecon').html() ){
										//有置顶
										$('.mainleft .doublefirst').html( str );
										}else {
										//没有置顶
										$('.mainleft .comlist1  #'+fileid).remove();
										$('.mainleft .comlist1').prepend(str);
										}
									}
									//聊天记录列表
									function sendmessagetobottom (){
										var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightcomOne  #'+ fileid +".msgconmaster" )[0];
										var hei = main.scrollHeight;
										$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
									};
									//发送消息滚到最下面

									sendmessagetobottom();

									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster').removeClass('hidden');//对话显示

									$('.mainright .rightonechatcon  #'+fileid+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示

									$(that).val('');
									
									
									
								},
							flashUpload: WebIM.flashUpload
							};
							msg.set(option);
							msg.setGroup('groupchat');
							conn.send(msg.body);
						}
					};
					
					sendGroupFile();
				}
			
			}).catch(function(err){
				console.log(err);
			});
			
			
		},//上传文件
		upleftslide:function(){
			$('.chatroomarea').scrollLeft($('.chatroomarea').scrollLeft()-200);
		},//上左三角
		uprightslide:function(){
			$('.chatroomarea').scrollLeft($('.chatroomarea').scrollLeft()+ 200);
			//console.log($('.chatroomarea').scrollRight);
			
			console.log($('.chatroomarea').scrollLeft() );
			console.log($('.chatroomarea')[0].scrollWidth );
			console.log($('.chatroomarea')[0].clientWidth);
			
			var sl = $('.chatroomarea').scrollLeft();
			var sw = $('.chatroomarea')[0].scrollWidth;
			var cw = $('.chatroomarea')[0].clientWidth;
			//sw - cw = sl
			
			/*if ( sw - cw == sl ){
				$('.mainleft .fa2').css({opacity:0});
			}else {
				var sl1 = $('.chatroomarea').scrollLeft();
				var sw1 = $('.chatroomarea')[0].scrollWidth;
				var cw1 = $('.chatroomarea')[0].clientWidth;
				console.log($('.chatroomarea').scrollLeft() );
				console.log($('.chatroomarea')[0].scrollWidth );
				console.log($('.chatroomarea')[0].clientWidth);
				
				if (sw1 - cw1 != sl1){
					
					$('.mainleft .fa2').css({opacity:0.3});
					
					
				}else {
					
				}
				
				
			}*/
			
		},//上右三角
		downleftslide:function(){
			$('.chatroomtrade').scrollLeft($('.chatroomtrade').scrollLeft()-200);
		},//左下三角
		downrightslide:function(){
			$('.chatroomtrade').scrollLeft($('.chatroomtrade').scrollLeft()+200);
			//console.log(  $('.chatroomtrade').scrollLeft()  ) ;
		},//右下三角
		chatuploadfile:function($event){
			var that = $event.currentTarget;
			console.log(that);
			var imgid = $(that).attr("id");
			console.log(imgid);
			console.log($(that).val());
			axios.get(globaldomain+'im/room/info.json?id='+imgid).then(function(res){
				var data = res.data.data;
				console.log(data);
				var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;
				var avatar = data.avatar;
				if (data){
					var sendchatroomfile = function () {
						
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('file', id);        // 创建文件消息
						var input = that;  // 选择文件的input
						var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
						var allowType = {
							'zip': true,
							'txt': true,
							'doc': true,
							'pdf': true,
							'mp3': true,
							'amr': true,
							'wmv': true,
							'mp4': true,
							'avi': true,
							'rmvb': true,
							'mkv': true
						};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: imgid,                       // 接收消息对象
								roomType: true,
								chatType: 'chatRoom',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！'; 
									$(that).val('');
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('群组图片Success');
									
									var str4 = '';

									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent filefix"><span class="selffilespan">'
										+'<div class="fileconleft"><div class="filename">'+file.filename+'</div><div class="filedownload"><a href="'+file.url+'" target="_blank">下载</a></div></div><div class="fileconright"><img src="imgs/document1.png"></div><div class="clearfix"></div>'+
										'</span></div></div></div><div class="clearfix"><div></div></div>';

									$('.mainright .rightTwo .msgcontainer').append(str4);

									
									function sendmessagetobottom (){
										var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightTwo .chatroommessageid')[0];
										var hei = main.scrollHeight;
										$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
									};
									
									
									//发送消息滚到最下面

									sendmessagetobottom();


									$(that).val('');
								},
							flashUpload: WebIM.flashUpload
							};
							msg.set(option);
							msg.setGroup('groupchat');
							conn.send(msg.body);
						}
					};
					sendchatroomfile();
				}
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			// 发送图片消息
			
			
			
		},//聊天室发送文件
		chatuploadimg:function($event){
			
			
			
			var that = $event.currentTarget;
			console.log(that);
			var imgid = $(that).attr("id");
			console.log(imgid);
			console.log($(that).val());
			
			axios.get(globaldomain+'im/room/info.json?id='+imgid).then(function(res){
		
				var data = res.data.data;
				console.log(data);
				var name = data.name;
				var genre = data.genre;
				var groupnumber = data.count;
				var avatar = data.avatar;
				
				if (data){
					var sendchatroomImg = function () {
						var id = conn.getUniqueId();                   // 生成本地消息id
						var msg = new WebIM.message('img', id);        // 创建图片消息
						var input = that;  // 选择图片的input
						var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
						var allowType = {
							'jpg': true,
							'gif': true,
							'png': true,
							'bmp': true
							};
						if (file.filetype.toLowerCase() in allowType) {
							var option = {
								apiUrl: WebIM.config.apiURL,
								file: file,
								to: imgid,                       // 接收消息对象
								roomType: true,
								chatType: 'chatRoom',
								onFileUploadError: function () {      // 消息上传失败
									console.log('onFileUploadError');
									vm.alertinfoshow = true;
									vm.alertinfocon = '上传文件必须小于10M！'; 
									$(that).val('');
								},
								onFileUploadComplete: function () {   // 消息上传成功
									console.log('onFileUploadComplete');
								},
								success: function () {                // 消息发送成功
									console.log('群组图片Success');
									
									var str4 = '';

									str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span class="selfpicspan">'+'<img src="'+file.url+'" class="picmessagelock">'+'</span></div></div></div><div class="clearfix"><div></div></div>';

									$('.mainright .rightTwo .msgcontainer').append(str4);

									
									function sendmessagetobottom (){
										var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
										var cli = scroll1.clientHeight;
										var main = $('.mainright .rightTwo .chatroommessageid')[0];
										var hei = main.scrollHeight;
										$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
									};
									
									
									//发送消息滚到最下面

									sendmessagetobottom();


									$(that).val('');
								},
							flashUpload: WebIM.flashUpload
							};
							msg.set(option);
							msg.setGroup('groupchat');
							conn.send(msg.body);
						}
					};
					sendchatroomImg();
				}
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			// 发送图片消息
			
			
		},//聊天室发送图片
		chatsendmsg:function($event){
			
			var that = $event.currentTarget;
			var chatid = $(that).attr("id");
			console.log( chatid );
			console.log( vm.chatbtncontent );
			
			
			
			// 聊天室发送文本消息
			var sendRoomText = function () {
				var id = conn.getUniqueId();         // 生成本地消息id
				var msg = new WebIM.message('txt', id); // 创建文本消息
				var option = {
					msg: vm.chatbtncontent,          // 消息内容
					to: chatid,               // 接收消息对象(聊天室id)
					roomType: true,
					chatType: 'chatRoom',
					success: function () {
						console.log('send room text success');
						
						var transferstr = WebIM.utils.parseEmoji( vm.chatbtncontent )
						console.log( transferstr ); 
						
						
						
						
						var str4 = '';
						str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span>'+ transferstr + '</span></div></div></div><div class="clearfix"><div></div></div>';
						
						$('.mainright .rightTwo .msgcontainer').append(str4);

									
						function sendmessagetobottom (){
							var scroll1 = $('.mainright .rightTwo .scroll-wrapper.manywindowcon')[0];
							var cli = scroll1.clientHeight;
							var main = $('.mainright .rightTwo .chatroommessageid')[0];
							var hei = main.scrollHeight;
							$('.mainright .rightTwo .scroll-content.manywindowcon').scrollTop( hei-cli );
						};
						
						sendmessagetobottom();
						
						vm.chatbtncontent ='';
						
						
					},
					fail: function () {
						console.log('failed');
					}
				};
				msg.set(option);
				msg.setGroup('groupchat');
				conn.send(msg.body);
			};
			
			if ( vm.chatbtncontent ){
				sendRoomText();
			}
			
			
			
			
		},//聊天室发送文本表情
		chatroomouterlist:function($event){
			var that = $event.currentTarget;
			var getindex = $(that).attr("data-index");
			var openstatus = $(that).attr("data-open");
			var chatroomid = $(that).attr("id");
			var privatestatus = $(that).attr("data-status");
			var membership = $(that).attr("data-membership");
			
			vm.thischatroomindex = getindex;
			vm.showchatcontrol1 = false;
			vm.showchatcontrol2 = false;
			vm.twoplaceholder = false;
			vm.chattargetid = chatroomid;
			
			console.log( getindex );
			
			vm.thischatroomindex = getindex;
			
			
			
			
			if ( globalcurrentchatroom1 ){
				console.log(globalcurrentchatroom1);
				console.log('globalcurrentchatroom1存在');
				
				if ( globalcurrentchatroom1 != chatroomid ){
					//点击前后不一致
					webquitchatroom();
					webjoinchatroom();
				}else {
					//点击前后一致
					webjoinchatroom();
				}
				
				globalcurrentchatroom1 = chatroomid;
				console.log(globalcurrentchatroom1);
				console.log(chatroomid);
				
				
			}else {
				console.log(globalcurrentchatroom1);
				console.log('globalcurrentchatroom1不存在');
				
				globalcurrentchatroom1 = chatroomid;
				console.log(globalcurrentchatroom1);
				console.log(chatroomid);
				
				webjoinchatroom();
				
			}
			
			
			function webquitchatroom(){
				var quitRoom = function () {
					// 退出聊天室
					conn.quitChatRoom({
						roomId: globalcurrentchatroom1 // 聊天室id
					});
				};
				quitRoom();
				$('.mainright .rightTwo .righttwochatcon  .chatroommessageid .msgcontainer').html("");
				
			}
			
			
			
			
			
			
			
			
			
			
			
			function webjoinchatroom (){
				
				

				var chatroomtimer1 = setTimeout(function(){
					$('.scrollbar-macosx').scrollbar();
					clearTimeout(chatroomtimer1);
				},400);


				console.log(membership);
				
				
				axios.get(globaldomain+'im/room/member/all.json?sPageNoTR=1&sPageSizeTR=10000&roomId='+chatroomid).then(function(res){
					var data = res.data.data.content;
					console.log(data);
					var lengths = data.length;
					
					vm.chatcounter = lengths;
					
				}).catch(function(err){
					console.log(err);
				});
				
				


				axios.get(globaldomain+'im/room/info.json?id='+chatroomid).then(function(res){
					var data = res.data.data;
					console.log(data);
					var id = data.id;
					var name = data.name;
					var avatar = data.avatar;

					if ( openstatus == "1" ){
						//开放聊天室
						vm.publicchatnow = true;
						vm.privatechatroompass = false;

						var joinRoom = function () {
							conn.joinChatRoom({
								roomId: chatroomid // 聊天室id
							});
						};
						// 环信加入聊天室
						joinRoom();
						
						axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
							//后台加入聊天室
							console.log(res.data);

							vm.chatroomtitlename = name;

							console.log(vm.chatroomtitlename);


							axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
								//用户在后台的身份
								var genre = res.data.data;
								console.log(genre);

								switch ( genre ){
									case '10':
										//超级管理员

										vm.ischatmaster = true;
										vm.ischatmanager = false;
										vm.chatroomnumershow = true;


										break;
									case '20':
										//管理员
										vm.ischatmaster = false;
										vm.ischatmanager = true;
										vm.chatroomnumershow = true;


										break;
									case '30':
										//成员
										vm.ischatmaster = false;
										vm.ischatmanager = false;
										
										vm.chatroomnumershow = false;


										break;
								}



							}).catch(function(err){
								console.log(err);
							})





						}).catch(function(err){
							console.log(err);
						})



					}else {

						vm.privatechatroompass = true;
								//私有聊天室需要更多逻辑
						vm.chatroomprivatename = name;
						vm.chatroomprivateid = id;
						vm.chatroomprivateavatar = avatar;

						switch( privatestatus ){
							case '10':
								
								
								vm.publicchatnow = true;
								vm.privatechatroompass = false;

								var joinRoom = function () {
									conn.joinChatRoom({
										roomId: chatroomid // 聊天室id
									});
								};
								// 环信加入聊天室
								joinRoom();

								axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
									//后台加入聊天室
									console.log(res.data);

									vm.chatroomtitlename = name;

									console.log(vm.chatroomtitlename);


									axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
										//用户在后台的身份
										var genre = res.data.data;
										console.log(genre);

										switch ( genre ){
											case '10':
												//超级管理员

												vm.ischatmaster = true;
												vm.ischatmanager = false;
												vm.chatroomnumershow = true;


												break;
											case '20':
												//管理员
												vm.ischatmaster = false;
												vm.ischatmanager = true;
												vm.chatroomnumershow = true;


												break;
											case '30':
												//成员
												vm.ischatmaster = false;
												vm.ischatmanager = false;
												vm.chatroomnumershow = false;


												break;
										}



									}).catch(function(err){
										console.log(err);
									})





								}).catch(function(err){
									console.log(err);
								})






								
								
								
								
								break;
								
								
							case '20':
								vm.chatroompopshow = true;
								vm.chatroompopwindowinfo = "申请处理中。";


								break;
							case '30':
								vm.chatroompopshow = true;
								vm.chatroompopwindowinfo = "申请通过。";
								vm.privatechatroompass = false;
								vm.publicchatnow = true;

								var joinRoom = function () {
									conn.joinChatRoom({
										roomId: chatroomid // 聊天室id
									});
								};
								// 环信加入聊天室
								joinRoom();



								axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
									//后台加入聊天室
									console.log(res.data);

									vm.chatroomtitlename = name;

									console.log(vm.chatroomtitlename);


									axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
										//用户在后台的身份
										var genre = res.data.data;
										console.log(genre);




										switch ( genre ){
											case '10':
												//超级管理员
												vm.ischatmaster = true;
												vm.ischatmanager = false;
												vm.chatroomnumershow = true;


												break;
											case '20':
												//管理员
												vm.ischatmaster = false;
												vm.ischatmanager = true;
												vm.chatroomnumershow = true;


												break;
											case '30':
												//成员
												vm.ischatmaster = false;
												vm.ischatmanager = false;
												vm.chatroomnumershow = false;
												break;
										}



									}).catch(function(err){
										console.log(err);
									})





								}).catch(function(err){
									console.log(err);
								})








								break;
							case '40':
								vm.chatroompopshow = true;
								vm.chatroompopwindowinfo = "申请被拒绝。";
								break;
							case '50':
								vm.privatechatroompass = false;
								vm.publicchatnow = true;

								var joinRoom = function () {
									conn.joinChatRoom({
										roomId: chatroomid // 聊天室id
									});
								};
								// 环信加入聊天室
								joinRoom();



								axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
									//后台加入聊天室
									console.log(res.data);

									vm.chatroomtitlename = name;

									console.log(vm.chatroomtitlename);


									axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
										//用户在后台的身份
										var genre = res.data.data;
										console.log(genre);




										switch ( genre ){
											case '10':
												//超级管理员
												vm.ischatmaster = true;
												vm.ischatmanager = false;


												break;
											case '20':
												//管理员
												vm.ischatmaster = false;
												vm.ischatmanager = true;


												break;
											case '30':
												//成员
												vm.ischatmaster = false;
												vm.ischatmanager = false;
												vm.chatroomnumershow = false;


												break;
										}



									}).catch(function(err){
										console.log(err);
									})





								}).catch(function(err){
									console.log(err);
								})






								break;
						}



					}



















				}).catch(function(err){
					console.log(err);
				});

				
				
			};
			
			
			
			
			
			
			
			
			
		},//聊天室列表被点击
		chatroomouterlist1:function($event){
			
			console.log(globalcurrentchatroom2);
			
			var that = $event.currentTarget;
			var getindex = $(that).attr("data-index");
			var openstatus = $(that).attr("data-open");
			var chatroomid = $(that).attr("id");
			var privatestatus = $(that).attr("data-status");
			var membership = $(that).attr("data-membership");
			
			vm.thischatroomindex1 = getindex;
			
			console.log( getindex );
			
			console.log( vm.thischatroomindex1 );
			
			
			axios.get(globaldomain+'im/room/member/all.json?sPageNoTR=1&sPageSizeTR=10000&roomId='+chatroomid).then(function(res){
				var data = res.data.data.content;
				console.log(data);
				var lengths = data.length;
					
				vm.chatcounter = lengths;
					
			}).catch(function(err){
				console.log(err);
			});
				
			
			
			
			
			
			vm.thischatroomindex = getindex;
			vm.showchatcontrol1 = false;
			vm.showchatcontrol2 = false;
			vm.twoplaceholder = false;
			vm.chattargetid = chatroomid;
			
			var chatroomtimer1 = setTimeout(function(){
				$('.scrollbar-macosx').scrollbar();
				clearTimeout(chatroomtimer1);
			},400);
			
			console.log(chatroomid);
			console.log(membership);
			
			
			axios.get(globaldomain+'im/room/info.json?id='+chatroomid).then(function(res){
				var data = res.data.data;
				console.log(data);
				var id = data.id;
				var name = data.name;
				var avatar = data.avatar;
				
				if ( openstatus == "1" ){
					//开放聊天室
					vm.publicchatnow = true;
					vm.privatechatroompass = false;
					
					var joinRoom = function () {
						conn.joinChatRoom({
							roomId: chatroomid // 聊天室id
						});
					};
					// 环信加入聊天室
					joinRoom();
					
					axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
						//后台加入聊天室
						console.log(res.data);
						
						vm.chatroomtitlename = name;
						
						console.log(vm.chatroomtitlename);
						
						
						axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
							//用户在后台的身份
							var genre = res.data.data;
							console.log(genre);
							
							
							
							
							switch ( genre ){
								case '10':
									
									vm.ischatmaster = true;
									vm.ischatmanager = false;
									vm.chatroomnumershow = true;
									
									break;
								case '20':
									
									vm.ischatmaster = false;
									vm.ischatmanager = true;
									vm.chatroomnumershow = true;
									
									break;
								case '30':
									vm.ischatmaster = false;
									vm.ischatmanager = false;
									vm.chatroomnumershow = false;
									
									break;
							}
							


						}).catch(function(err){
							console.log(err);
						})
						
						
						
						
						
					}).catch(function(err){
						console.log(err);
					})
					
					
				
				}else {
					
					vm.privatechatroompass = true;
							//私有聊天室需要更多逻辑
					vm.chatroomprivatename = name;
					vm.chatroomprivateid = id;
					vm.chatroomprivateavatar = avatar;
					
					switch( privatestatus ){
							
						case '10':
								
								
								vm.publicchatnow = true;
								vm.privatechatroompass = false;

								var joinRoom = function () {
									conn.joinChatRoom({
										roomId: chatroomid // 聊天室id
									});
								};
								// 环信加入聊天室
								joinRoom();

								axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
									//后台加入聊天室
									console.log(res.data);

									vm.chatroomtitlename = name;

									console.log(vm.chatroomtitlename);


									axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
										//用户在后台的身份
										var genre = res.data.data;
										console.log(genre);

										switch ( genre ){
											case '10':
												//超级管理员

												vm.ischatmaster = true;
												vm.ischatmanager = false;
												vm.chatroomnumershow = true;


												break;
											case '20':
												//管理员
												vm.ischatmaster = false;
												vm.ischatmanager = true;
												vm.chatroomnumershow = true;


												break;
											case '30':
												//成员
												vm.ischatmaster = false;
												vm.ischatmanager = false;

												vm.chatroomnumershow = false;


												break;
										}



									}).catch(function(err){
										console.log(err);
									})





								}).catch(function(err){
									console.log(err);
								})






								
								
								
								
						break;
						case '20':
							vm.chatroompopshow = true;
							vm.chatroompopwindowinfo = "申请处理中。";
							
							
							break;
						case '30':
							vm.chatroompopshow = true;
							vm.chatroompopwindowinfo = "申请通过。";
							vm.privatechatroompass = false;
							vm.publicchatnow = true;
							
							var joinRoom = function () {
								conn.joinChatRoom({
									roomId: chatroomid // 聊天室id
								});
							};
							// 环信加入聊天室
							joinRoom();
							
							
							
							axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
								//后台加入聊天室
								console.log(res.data);

								vm.chatroomtitlename = name;

								console.log(vm.chatroomtitlename);


								axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
									//用户在后台的身份
									var genre = res.data.data;
									console.log(genre);




									switch ( genre ){
										case '10':

											vm.ischatmaster = true;
											vm.ischatmanager = false;
											vm.chatroomnumershow = true;


											break;
										case '20':

											vm.ischatmaster = false;
											vm.ischatmanager = true;
											vm.chatroomnumershow = true;


											break;
										case '30':
											vm.ischatmaster = false;
											vm.ischatmanager = false;
											vm.chatroomnumershow = false;


											break;
									}



								}).catch(function(err){
									console.log(err);
								})





							}).catch(function(err){
								console.log(err);
							})
							
							
							
							
							
							
							
							
							break;
						case '40':
							vm.chatroompopshow = true;
							vm.chatroompopwindowinfo = "申请被拒绝。";
							break;
						case '50':
							vm.privatechatroompass = false;
							vm.publicchatnow = true;
							
							var joinRoom = function () {
								conn.joinChatRoom({
									roomId: chatroomid // 聊天室id
								});
							};
							// 环信加入聊天室
							joinRoom();
							
							
							
							axios.post(globaldomain+'im/room/member/join.json?roomId='+chatroomid+'&memberIds='+ids.id).then(function(res){
								//后台加入聊天室
								console.log(res.data);

								vm.chatroomtitlename = name;

								console.log(vm.chatroomtitlename);


								axios.get(globaldomain+'im/room/member/genre.json?roomId='+chatroomid+'&memberId='+ids.id).then(function(res){
									//用户在后台的身份
									var genre = res.data.data;
									console.log(genre);




									switch ( genre ){
										case '10':

											vm.ischatmaster = true;
											vm.ischatmanager = false;
											vm.chatroomnumershow = true;


											break;
										case '20':

											vm.ischatmaster = false;
											vm.ischatmanager = true;
											vm.chatroomnumershow = true;


											break;
										case '30':
											vm.ischatmaster = false;
											vm.ischatmanager = false;
											vm.chatroomnumershow = false;


											break;
									}



								}).catch(function(err){
									console.log(err);
								})





							}).catch(function(err){
								console.log(err);
							})
							
							
							
							
							
							
							break;
					}
					
					

				}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
		},////搜索结果的聊天列表被点击
		getemojisrc1:function($event){
			
			var that = $event.currentTarget;
			//console.log(that);
			groupemojisrc = $(that).attr("src");
			console.log(groupemojisrc);
			
			var thisemojisrc = $(that).attr("src");
			var thisemojiid = $(that).attr("id");
			
			console.log(thisemojisrc);
			console.log(thisemojiid);
			
			var emojitrack = $(that).attr("id");
			
			var mixsrc = '<img class="emoji" src="'+groupemojisrc+'">';
			
			//mixsrc = chatemojisrc + chatemojisrc;
			
			chatemojisrc = chatemojisrc + mixsrc;
			
			console.log(chatemojisrc);
			
			console.log( mixsrc );
			
			vm.chatbtncontent = vm.chatbtncontent + emojitrack;
			
			console.log(vm.chatbtncontent);//model绑定内容
			
			var middel = vm.chatbtncontent;
			
			
			console.log(thisemojisrc);
			console.log(thisemojiid);
			console.log( middel );
			
			console.log(WebIM.Emoji);
			//console.log(vm.emojiobj);
			
			
			
			//console.log(vm.chattextcontent);//html内容
			
			
		},//聊天室emoji点击
		askforjoinchatroom:function($event){
			var that = $event.currentTarget;
			console.log(that);
			
			var sendid = $(that).attr("id");
			
			
			axios.post(globaldomain+'im/room/apply/join.json?roomId='+sendid+'&descr=WEB端发送申请').then(function(res){
				console.log(res.data);
				var success = res.data.success;
				console.log(success);
				if ( success ){
					console.log(success);
					vm.chatroompopshow = true;
					vm.chatroompopwindowinfo = "已经发起申请，相关操作请到移动端执行。";
					
				}
				
			}).catch(function(err){
				console.log(err);
			});
			
		},//申请加入聊天室
	
		ischatmastermenu:function(){
			vm.showchatcontrol1 = !vm.showchatcontrol1;
			
			
		},//聊天室身份为超级管理员
		ischatmanagermenu:function(){
			vm.showchatcontrol2 = !vm.showchatcontrol2;
		},//聊天室身份为管理员
		
		areasearch:function($event){
			var that = $event.currentTarget;
			vm.all1 = false;
			var id = $(that).attr("id");
			globalarea = id;
			var index = $(that).attr("data-index");
			
			vm.nosearchchatroom = false;
			vm.searchchatroom = true;
			vm.twoplaceholder = true;
			
			console.log(globalarea);
			console.log(globaltrade);
			vm.chatroomindex1 = index;
			console.log(vm.chatroomindex1);
			if ( globaltrade ){
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&areaId='+globalarea+'&tradeId='+globaltrade).then(function(res){
					console.log(res);
					var data = res.data.data;
					console.log(data);
					
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
				}).catch(function(err){
					console.log(err);
				});
			}else {
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&areaId='+globalarea).then(function(res){
					console.log(res);
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
					
				}).catch(function(err){
					console.log(err);
				});
			}
			
		},//聊天室按区域搜索
		allclick1:function($event){
			vm.all1 = true;
			vm.chatroomindex1 ='str';
			globalarea = '';
			console.log(globalarea);
			console.log(globaltrade);
			if ( globaltrade ){
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&tradeId='+globaltrade).then(function(res){
					var data = res.data.data;
					console.log(data);
					
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
					
				}).catch(function(err){
					console.log(err);
				})
			}else {
				
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
				}).catch(function(err){
					console.log(err);
				})
				
			}
		},//区域全部
		allclick2:function($event){
			vm.all2 = true;
			vm.chatroomindex2 = 'str';
			globaltrade = '';
			console.log(globalarea);
			console.log(globaltrade);
			
			if ( globalarea ){
				
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&areaId='+globalarea).then(function(res){
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
				}).catch(function(err){
					console.log(err);
				})
				
			}else {
				
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
					
				}).catch(function(err){
					console.log(err);
				})
				
			}
		},//行业全部
		tradesearch:function($event){
			var that = $event.currentTarget;
			vm.all2 = false;
			var id = $(that).attr("id");
			globaltrade = id;
			
			vm.nosearchchatroom = false;
			vm.searchchatroom = true;
			vm.twoplaceholder = true;	
			var index = $(that).attr("data-index");
			console.log(globalarea);
			console.log(globaltrade);
			vm.chatroomindex2 = index;
			console.log(vm.chatroomindex2);
			
			if ( globalarea ){
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&areaId='+globalarea+'&tradeId='+globaltrade).then(function(res){
					console.log(res);
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
					
				}).catch(function(err){
					console.log(err);
				});
			}else {
				axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=5000&tradeId='+globaltrade).then(function(res){
					console.log(res);
					var data = res.data.data;
					console.log(data);
					var content = data.content;
					vm.chatroomsearching = content;
					console.log(vm.chatroominfo);
					
				}).catch(function(err){
					console.log(err);
				});
			}
			
		},//聊天室按行业搜索
		leftroll:function(){
			if (globalpicindex == 0){
				globalpicindex = 0;
				console.log(globalpicindex);
			}else {
				globalpicindex = globalpicindex - 1;
				console.log(globalpicindex);
			}
			
			vm.piccurrentviewsrc = vm.pictureviewarr[globalpicindex]; 
		},//图片左滚
		rightroll:function(){
			if (globalpicindex == globalpicturelength - 1){
				globalpicindex = globalpicturelength -1 ;
				console.log(globalpicturelength);
			}else {
				globalpicindex = globalpicindex + 1;
				console.log(globalpicturelength);
			}
			vm.piccurrentviewsrc = vm.pictureviewarr[globalpicindex]; 
		},//图片右滚
		closepicview:function(){
			vm.poppicviewer=false;
			vm.pictureviewarr=[];
			console.log(vm.pictureviewarr);
		},//关闭图片浏览
		clearmsgbtn:function($event){
			var that = $event.currentTarget;
			var cleartargetid = $(that).attr('id');
			$('.mainright .rightcomOne #'+cleartargetid+'.msgconmaster').remove();
			vm.clearscreenshow = false;
			
		},//聊天消息清屏按钮
		msgthree:function($event){
			
		},//三条信息处理
		copytext:function($event){
			
		},//复制文本消息
		deletethis:function($event){
			console.log($event);
			console.log($event.currentTarget);
			var getid = vm.getmsgid;
			console.log( getid );
			$('#'+getid+'.msgmarginlr').remove();
			
		},//删除消息
		
		copytext2:function($event){
			
		},//复制消息2
		retweet:function(){
			vm.retweetshow = true;
			
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){

				var data = res.data.data;
				console.log(data);
				vm.repeatmyfriendsarr = data;
				console.log( vm.repeatmyfriendsarr );

				var addtimer8 = setTimeout(function(){
					
					initials4();
					
					clearTimeout(addtimer8);
				},400);


			}).catch(function(err){
				console.log(err);
			});
			
			
		},//转发消息
		retweetallcheck:function($event){
			console.log($event.currentTarget);
			var that = $event.currentTarget;
			console.log(that.checked);
			var checkstate = that.checked;
			if (checkstate){
				var arr = [];
				var length = vm.repeatmyfriendsarr.length;
				for ( var i=0;i<length;i++ ){
					arr.push($('.sort_box4 input').eq(i)[0].value);
				}
				console.log(arr);
				vm.addgrouparr = arr;
				
			}else {
				vm.addgrouparr = [];
			}
		},//转发消息全选
		retweetfromfriends:function($event){
			console.log(vm.addgrouparr);
			var that = $event.currentTarget;
			var getid = $(that).attr("id");
			var getarr = vm.addgrouparr;
			console.log($('#'+getid+'.msgmarginlr .words').text() );
			var messagecontent = $('#'+getid+'.msgmarginlr .words').text();
			_(getarr).forEach(function(value) {
				// 单聊发送文本消息
				var sendPrivateText = function (messagecontent,value) {
					var id = conn.getUniqueId();                 // 生成本地消息id
					var msg = new WebIM.message('txt', id);      // 创建文本消息
					msg.set({
						msg: messagecontent,                  // 消息内容
						to: value,                          // 接收消息对象（用户id）
						roomType: false,
						success: function (id, serverMsgId) {
							console.log('send private text Success');
							vm.retweetshow = false;
						},
						fail: function(e){
							console.log("Send private text error");
						},
					});
					
					msg.body.chatType = 'singleChat';
					conn.send(msg.body);
				};
				sendPrivateText(messagecontent,value);
			});
			},//确定按钮点击
		topchat:function($event){
			var that = $event.currentTarget;
			console.log(that);
			var getid = $(that).attr("id");
			vm.firstshow = true;
			var innerhtml = $('.comlist1 #'+getid+'.listOnecon').html();
			var str = '';
			str = str + '<div id="'+getid+'" class="listOnecon">'+innerhtml+'</div>';
			//$('.threepiecelists .doublefirst').html( str );
			//$('.comlist1 #'+getid +'.listOnecon').remove();
			console.log( $('.threepiecelists .doublefirst').html() );
			if ( $('.threepiecelists .doublefirst').html() ){
				var gettopcontent = $('.threepiecelists .doublefirst').html();
				$('.threepiecelists .comlist1').prepend( gettopcontent );
				$('.threepiecelists .doublefirst').html(str);
				$('.comlist1 #'+getid +'.listOnecon').remove();
			}else {
				$('.threepiecelists .doublefirst').html( str );
				$('.comlist1 #'+getid +'.listOnecon').remove();
			}
			
			
			
			
			
		},//置顶聊天信息
		killchat:function($event){
			var that = $event.currentTarget;
			console.log(that);
			var getid = $(that).attr("id");
			$('#'+getid +'.listOnecon').remove();
			$('#'+getid+'.msgconmaster').remove();
			vm.popleftlists = false;
			vm.targetid = '';
			vm.rightoneheaderobj.name = '';
			vm.rightoneheaderobj.groupnumber = '';
			vm.groupnumbershow = false;
			vm.isgroupleader = false;
			vm.isgroupmanager = false;
			vm.notgroupmanager = false;
			vm.justoneman = false;
			vm.strangeropen = false;
			vm.strangeroff = false;
			vm.popleftlists1 = false;
		},//关闭消息记录
		judgeisfriend:function($event){
			console.log($event);
			vm.nomessage = false;
			console.log( $event.currentTarget );
			var getid = $( $event.currentTarget ).attr('id');
			console.log(getid);
			//页面跳转
			vm.$refs.current.icons1 = true;
			vm.$refs.current.icons2 = false;
			vm.$refs.current.icons3 = false;
				vm.specialthree = false;
				vm.mainrightone = true;
				vm.showleft1 = true;
				vm.showleft2 = false;
				vm.showleft3 = false;
			//页面跳转
			
			
			axios.post(globaldomain+'im/buddy/is/buddy.json?destId='+getid).then(function(res){
				var isfriend = res.data.data;
				console.log(isfriend);
				
				var transferavatar ='';
				var transfername = '';
				
				axios.get(globaldomain+'im/user/detail.json?id='+getid).then(function(res){
						var data = res.data.data;
						console.log(data);
					var isblack = data.isBlacklist;
					
					var name = data.nickname;
					var getavatar = data.avatar;
					
					console.log(isblack);
					console.log(name);
					console.log(getavatar);
					transferavatar = getavatar;
					transfername = name;
					if (isfriend){
						console.log( transferavatar );
						console.log( transfername );
						str = str + '<div id="'+getid+'" class="listOnecon"><img src="'+( transferavatar ? vm.$refs.rightthree.picsrc+transferavatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+transfername+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"></div></div><div class="clearfix"></div></div></div>';
						if ( $('.mainleft   #'+getid).length < 1 ){
							$('.mainleft .comlist1').prepend(str);
							
						}else {
							
						}
					}else {
						//不是好友，是否加入黑名单的情况
						console.log(isblack);
						if( isblack ){
							
							str = str + '<div data-not="not" id="'+getid+'" class="listOnecon"><img src="'+( transferavatar ? vm.$refs.rightthree.picsrc+transferavatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+transfername+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-eye hidden"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
							
							if ( $('.mainleft .comlist1  #'+getid).length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							}else {
								//会话列表存在的状态
								
								//不在置顶位
								
								
								//处于置顶位置
								
								
								
							}
						   
						}else {
						   
							str = str + '<div data-not="not" id="'+getid+'" class="listOnecon"><img src="'+( transferavatar ? vm.$refs.rightthree.picsrc+transferavatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+transfername+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-eye"></i><i class="fa fa-eye-slash hidden"></i></div></div><div class="clearfix"></div></div></div>';
							
							if ( $('.mainleft   #'+getid).length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							}else {
								//会话列表存在的状态
								
								//不在置顶位
								
								
								//处于置顶位置
							}
							
						}
						
						
						
						


						

					}
				
						

				


					}).catch(function(err){
						console.log(err);
					})
				
				var str ='';
				
				
				
				
			}).catch(function(err){
				console.log(err);
			})
			
		},//点击判断是否为好友
		twowaysend:function($event){
			var that = $($event.currentTarget);
			var sendtarget = $(that).attr('id');
			console.log(sendtarget);
			var sendPrivateText = function (content,targetone) {
				var id = conn.getUniqueId();                 // 生成本地消息id
				var msg = new WebIM.message('txt', id);      // 创建文本消息
				msg.set({
					msg: content,                  // 消息内容
					to: targetone,                          // 接收消息对象（用户id）
					roomType: false,
					success: function (id, serverMsgId) {
						console.log('send private text Success');
						var transferstr = WebIM.utils.parseEmoji( content );
						console.log( transferstr ); 
						axios.get(globaldomain+'im/user/detail.json?id='+sendtarget).then(function(res){
							var data =res.data.data;
							var avatar = data.avatar;
							var str4 = '';
							str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span   class="selfwords">'+transferstr+'</span></div></div></div><div class="clearfix"><div></div></div>';
							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster .msgcontainer').append(str4);
							globalemojitrack = id;
							
							
							//聊天记录列表
							$('.mainleft  .comlistouter1  #'+sendtarget+'.listOnecon  .listOnebottomleft').html(transferstr);
							
							var sendtime = getCurrentTime();
							
							$('.mainleft  .comlistouter1  #'+sendtarget+'.listOnecon  .listOnetopright').text(sendtime);
							
							
							var gethtml = $('#'+sendtarget+'.listOnecon').html();
							
							console.log(gethtml);
							var str = '<div class="listOnecon" id="'+sendtarget+'">'+gethtml+'</div>';
							
							if ( $('.mainleft   #'+sendtarget+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+sendtarget+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+sendtarget).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							//聊天记录列表
							
							
							
							function sendmessagetobottom1 (){
								var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
								var cli = scroll1.clientHeight;
								var main = $('.mainright .rightcomOne  #'+ sendtarget +".msgconmaster" )[0];
								var hei = main.scrollHeight;
								$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
							};

							sendmessagetobottom1();

							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster').removeClass('hidden');//对话显示

							console.log( $('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster') );



							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示	







						}).catch(function(err){
							console.log(err);
						});







						vm.sendbtncontent = '';








					},
					fail: function(e){
						console.log("Send private text error");
					}
				});
				msg.body.chatType = 'singleChat';
				conn.send(msg.body);
			};




			// 群组发送文本消息
			var sendGroupText = function (content,targetone) {
				var id = conn.getUniqueId();            // 生成本地消息id
				var msg = new WebIM.message('txt', id); // 创建文本消息
				var option = {
					msg: content,           // 消息内容
					to: targetone,                       // 接收消息对象(群组id)
					roomType: false,
					chatType: 'chatRoom',
					success: function () {
						console.log('send room text success');

						var transferstr = WebIM.utils.parseEmoji( content );

						console.log( transferstr ); 



						axios.get(globaldomain+'im/group/info.json?id='+sendtarget).then(function(res){

							var data = res.data.data;

							console.log(data);
							var name = data.name;
							var genre = data.genre;
							var groupnumber = data.count;
							var avatar = data.avatar;





							globalemojitrack = id;

							console.log(globalemojitrack);
							console.log(groupemojisrc);
							console.log(content);


							var str4 = '';

							str4 ='<div id="'+id+'" class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img class="myuserpic" src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span   class="selfwords">'+transferstr+'</span></div></div></div><div class="clearfix"><div></div></div>';

							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster .msgcontainer').append(str4);


							//聊天记录列表
							$('.mainleft   #'+sendtarget+' .listOnebottomleft').html(transferstr); 

							var sendtime = getCurrentTime();

							$('.mainleft   #'+sendtarget+' .listOnetopright').text(sendtime);
							
							
							
							
							
							var gethtml = $('#'+sendtarget+'.listOnecon').html();
							
							console.log(gethtml);
							var str = '<div class="listOnecon" id="'+sendtarget+'">'+gethtml+'</div>';
							
							if ( $('.mainleft   #'+sendtarget+'.listOnecon').length < 1 ){
								$('.mainleft .comlist1').prepend(str);

							} else {


								if ( $('.mainleft .doublefirst #'+sendtarget+'.listOnecon').html() ){
								//有置顶
								$('.mainleft .doublefirst').html( str );

								}else {
								//没有置顶
								$('.mainleft .comlist1  #'+sendtarget).remove();
								$('.mainleft .comlist1').prepend(str);
								}

							}
							
							
							
							
							//聊天记录列表



							function sendmessagetobottom (){
								var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
								var cli = scroll1.clientHeight;
								var main = $('.mainright .rightcomOne  #'+ sendtarget +".msgconmaster" )[0];
								var hei = main.scrollHeight;
								$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
							};
							//发送消息滚到最下面

							sendmessagetobottom();

							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster').removeClass('hidden');//对话显示

							$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster').siblings().addClass('hidden');//同胞关闭显示

						}).catch(function(err){
							console.log(err);
						});


						vm.sendbtncontent = '';
					},
					fail: function () {
						console.log('failed');
					}
				};
				msg.set(option);
				msg.setGroup('groupchat');
				conn.send(msg.body);
			};


			if ( vm.sendbtncontent != ''&& sendtarget != ''){

				sendPrivateText(vm.sendbtncontent,sendtarget);
				sendGroupText(vm.sendbtncontent,sendtarget);

			}

			
		},//发送消息
		blockpeople:function($event){
			var getid = $($event.currentTarget).attr('id');
			console.log( getid );
			axios.post(globaldomain+'im/blacklist/pull.json?buddyIds='+getid).then(function(res){
				var data = res.data;
				console.log(data);
				vm.strangeropen = false;
				vm.strangeroff = true;
			}).catch(function(err){
				console.log(err);
			});
			axios.post(globaldomain+'im/blacklist/find.json').then(function(res){
				console.log(res);
				
			}).catch(function(err){
				console.log(err);
			})
		},//拉黑陌生人
		unblockpeople:function($event){
			var getid = $($event.currentTarget).attr('id');
			console.log(getid);
			axios.post(globaldomain+'im/blacklist/kick.json?buddyId='+getid).then(function(res){
				var data = res.data;
				console.log(data);
				vm.strangeropen = true;
				vm.strangeroff = false;
			}).catch(function(err){
				console.log(err);
			});
			axios.post(globaldomain+'im/blacklist/find.json').then(function(res){
				console.log(res);
				
			}).catch(function(err){
				console.log(err);
			})
			
		},//解除拉黑陌生人
			
		
			
	}
});



//追加jQuery代码

new Clipboard('.copybtn1',{
	target:function(trigger){
		console.log(trigger);
		var getid = $(trigger).attr('id');
		console.log(getid);
		console.log($('#'+getid+'.msgmarginlr .words') );
		return $('#'+getid+'.msgmarginlr .words')[0];
	}
})




//右键点击聊天列表
$('.mainleft .comlist1').on('contextmenu','.listOnecon',function(event){
	var that = this;
	console.log(that);
	var getid = $(that).attr('id');
	console.log(getid);
	vm.popleftlists = true;
	
	
	function messagetobottom (){
		var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
		var cli = scroll1.clientHeight;
		var main = $('.mainright .rightcomOne  #'+ getid +".msgconmaster" )[0];
		var hei = main.scrollHeight;
		$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
	};
	
	
	var timermessage4 = setTimeout(function(){
		messagetobottom ();
		clearTimeout( timermessage4 );
	},400);
	
	vm.managechatlistmenuid = getid;
	
	console.log(event.offsetX);
	console.log(event.offsetY);
	
	event.preventDefault();
	vm.popleft1 = event.offsetX+100 +'px';
	vm.poptop1 = event.offsetY+300 +'px';
	
	vm.isgroupmaster = false;
	vm.isgroupmanagermenu1 = false;
	vm.popleftlists1 = false;
	
	$('.mainleft .doublefirst .listOnecon').removeClass( 'backgroundcolor' );
	
	$(that).addClass('backgroundcolor').siblings().removeClass('backgroundcolor');
	
	$(that).find( '.circle' ).removeClass('circle').addClass('transparentone');
	
	$('.mainright .rightonechatcon   #'+getid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
	
	
	
	axios.get(globaldomain+'im/user/detail.json?id='+getid).then(function(res){
		vm.groupnumbershow = false;
		var data =res.data.data;
		
		console.log(data);
		var name = data.nickname;
		vm.rightoneheaderobj.name = name;
		vm.targetid = getid;
		
		
		if ( $(that).attr('data-not') ){
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = false;//不是好友
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = true;
			
			
			
		} else {
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = true;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = false;
			
		} 
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为好友，获取用户详细信息
	
	
	
	
	axios.get(globaldomain+'im/group/info.json?id='+getid).then(function(res){
		
		var data = res.data.data;
		
		vm.isgroupleader= false;
		vm.isgroupmanager = false;//管理员
		vm.notgroupmanager = false;//不是管理员
		//vm.justoneman = true;//只是个人
		vm.shouldshow = false;
		vm.groupidbindminus = getid;
		
		console.log(data);
		var name = data.name;
		var genre = data.genre;
		var groupnumber = data.count;
		
		vm.rightoneheaderobj.name = name;
		vm.rightoneheaderobj.groupnumber = groupnumber;
		vm.targetid = getid;
		
		vm.groupnumbershow = true;
		
		
		//vm.slidegenre
		
		
		axios.get(globaldomain+'im/group/member/genre.json?groupId='+getid+'&memberId='+ids.id).then(function(res){
			console.log(res.data);
			var level = res.data.data;
			console.log(level);
			
			console.log(  typeof(level));
			switch (level) {
				case '10':
					console.log(10);
					vm.isgroupleader= true;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '20':
					vm.isgroupleader= false;
					vm.isgroupmanager = true;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '30':
					vm.isgroupleader= false;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = true;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = false;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
			}
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
	
		
		
		axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+getid).then(function(res){
			console.log(res);
			var arrgg = res.data.data.content;
			console.log(arrgg);
			vm.slidechagearr = arrgg;
			 
			
			
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为群组，获取群组详细信息
	
	
});

//点击聊天列表



$('.mainleft .doublefirst').on('contextmenu','.listOnecon',function(event){
	var that = this;
	console.log(that);
	var listid = $(that).attr('id');
	console.log(listid);
	vm.popleftlists1 = true;
	vm.popleftlists = false;
	
	
	function messagetobottom (){
		var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
		var cli = scroll1.clientHeight;
		var main = $('.mainright .rightcomOne  #'+ listid +".msgconmaster" )[0];
		var hei = main.scrollHeight;
		$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
	};
	
	
	var timermessage3 = setTimeout(function(){
		messagetobottom ();
		clearTimeout( timermessage3 );
	},400);
	
	
	
	vm.managechatlistmenuid = listid;
	
	console.log(event.offsetX);
	console.log(event.offsetY);
	
	event.preventDefault();
	vm.popleft11 = event.offsetX+100 +'px';
	vm.poptop11 = event.offsetY+300 +'px';
	
	vm.isgroupmaster = false;
	vm.isgroupmanagermenu1 = false;
	
	
	$(that).addClass('backgroundcolor');
	
	
	$('.mainleft .comlist1 .listOnecon').removeClass('backgroundcolor');
	
	$(that).find( '.circle' ).removeClass('circle').addClass('transparentone');
	
	$('.mainright .rightonechatcon   #'+listid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
	
	var str1 = '';
	
	str1 = str1 + '<div id="'+listid+'" class="msgconmaster hidden">'+'<div class="msgcontainer"></div>'+'</div>';	
	
	
	if ( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster').length < 1 ){
		$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
	} else {
	}
	
	axios.get(globaldomain+'im/user/detail.json?id='+listid).then(function(res){
		vm.groupnumbershow = false;
		var data =res.data.data;
		console.log(data);
		var name = data.nickname;
		vm.rightoneheaderobj.name = name;
		vm.targetid = listid;
		
		
		if ( $(that).attr('data-not') ){
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = false;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = true;
			
		} else {
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = true;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = false;
			
		} 
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为好友，获取用户详细信息
	
	
	
	
	axios.get(globaldomain+'im/group/info.json?id='+listid).then(function(res){
		
		var data = res.data.data;
		
		vm.isgroupleader= false;
		vm.isgroupmanager = false;//管理员
		vm.notgroupmanager = false;//不是管理员
		//vm.justoneman = true;//只是个人
		vm.shouldshow = false;
		vm.groupidbindminus = listid;
		
		
		console.log(data);
		var name = data.name;
		var genre = data.genre;
		var groupnumber = data.count;
		
		vm.rightoneheaderobj.name = name;
		vm.rightoneheaderobj.groupnumber = groupnumber;
		vm.targetid = listid;
		
		vm.groupnumbershow = true;
		
		axios.get(globaldomain+'im/group/member/genre.json?groupId='+listid+'&memberId='+ids.id).then(function(res){
			console.log(res.data);
			var level = res.data.data;
			console.log(level);
			
			console.log(  typeof(level));
			switch (level) {
				case '10':
					console.log(10);
					vm.isgroupleader= true;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '20':
					vm.isgroupleader= false;
					vm.isgroupmanager = true;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '30':
					vm.isgroupleader= false;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = true;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = false;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
			}
		
			
		}).catch(function(err){
			console.log(err);
		});
		
		axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+listid).then(function(res){
			console.log(res);
			var arrgg = res.data.data.content;
			console.log(arrgg);
			vm.slidechagearr = arrgg;
			 
			
			
		}).catch(function(err){
			console.log(err);
		});
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为群组，获取群组详细信息
	
	
	
	
});//置顶右点击

$('.mainleft .doublefirst').on('click','.listOnecon',function(){
	vm.isgroupmaster = false;
	vm.isgroupmanagermenu1 = false;
	console.log(this);
	var that = this;
	var listid = $(that).attr('id');
	console.log(listid);
	
	
	function messagetobottom (){
		var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
		var cli = scroll1.clientHeight;
		var main = $('.mainright .rightcomOne  #'+ listid +".msgconmaster" )[0];
		var hei = main.scrollHeight;
		$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
	};
	
	
	var timermessage2 = setTimeout(function(){
		messagetobottom ();
		clearTimeout( timermessage2 );
	},400);
	
	
	
	
	$(that).addClass('backgroundcolor');
	
	$('.mainleft .comlist1 .listOnecon').removeClass('backgroundcolor');
	
	$(that).find( '.circle' ).removeClass('circle').addClass('transparentone');
	
	$('.mainright .rightonechatcon   #'+listid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
	
	var str1 = '';
	
	str1 = str1 + '<div id="'+listid+'" class="msgconmaster hidden">'+'<div class="msgcontainer"></div>'+'</div>';	
	
	
	if ( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster').length < 1 ){
		$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
	} else {
	}
	
	axios.get(globaldomain+'im/user/detail.json?id='+listid).then(function(res){
		vm.groupnumbershow = false;
		var data =res.data.data;
		console.log(data);
		var name = data.nickname;
		vm.rightoneheaderobj.name = name;
		vm.targetid = listid;
		
		
		if ( $(that).attr('data-not') ){
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = false;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = true;
			
		} else {
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = true;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = false;
			
		} 
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为好友，获取用户详细信息
	
	
	
	
	axios.get(globaldomain+'im/group/info.json?id='+listid).then(function(res){
		
		var data = res.data.data;
		
		vm.isgroupleader= false;
		vm.isgroupmanager = false;//管理员
		vm.notgroupmanager = false;//不是管理员
		//vm.justoneman = true;//只是个人
		vm.shouldshow = false;
		vm.groupidbindminus = listid;
		
		
		console.log(data);
		var name = data.name;
		var genre = data.genre;
		var groupnumber = data.count;
		
		vm.rightoneheaderobj.name = name;
		vm.rightoneheaderobj.groupnumber = groupnumber;
		vm.targetid = listid;
		
		vm.groupnumbershow = true;
		
		
		//vm.slidegenre
		
		
		axios.get(globaldomain+'im/group/member/genre.json?groupId='+listid+'&memberId='+ids.id).then(function(res){
			console.log(res.data);
			var level = res.data.data;
			console.log(level);
			
			console.log(  typeof(level));
			switch (level) {
				case '10':
					console.log(10);
					vm.isgroupleader= true;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '20':
					vm.isgroupleader= false;
					vm.isgroupmanager = true;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '30':
					vm.isgroupleader= false;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = true;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = false;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
			}
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
	
		
		
		axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+listid).then(function(res){
			console.log(res);
			var arrgg = res.data.data.content;
			console.log(arrgg);
			vm.slidechagearr = arrgg;
			 
			
			
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为群组，获取群组详细信息
	
	
	
	
});//置顶左点击



$('.mainleft .comlist1').on('click','.listOnecon',function(){
	
	vm.isgroupmaster = false;
	vm.isgroupmanagermenu1 = false;
	console.log(this);
	var that = this;
	var listid = $(that).attr('id');
	console.log(listid);
	
	
	
	
	function messagetobottom (){
		var scroll1 = $('.mainright .rightcomOne .scroll-wrapper.manywindowcon')[0];
		var cli = scroll1.clientHeight;
		var main = $('.mainright .rightcomOne  #'+ listid +".msgconmaster" )[0];
		var hei = main.scrollHeight;
		$('.mainright .rightcomOne .scroll-content.manywindowcon').scrollTop( hei-cli );
	};
	
	
	var timermessage1 = setTimeout(function(){
		messagetobottom ();
		clearTimeout( timermessage1 );
	},400);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$(that).addClass('backgroundcolor').siblings().removeClass('backgroundcolor');
	
	
	$('.mainleft .doublefirst .listOnecon').removeClass( 'backgroundcolor' );
	
	
	
	console.log($(that).find( '.circle' ));
	
	$(that).find( '.circle' ).removeClass('circle').addClass('transparentone');
	
	$('.mainright .rightonechatcon   #'+listid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
	
	console.log( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster') );
	
	var str1 = '';
	
	str1 = str1 + '<div id="'+listid+'" class="msgconmaster hidden">'+'<div class="msgcontainer"></div>'+'</div>';	
	
	
	if ( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster').length < 1 ){
		$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
	} else {
	}
	
	axios.get(globaldomain+'im/user/detail.json?id='+listid).then(function(res){
		vm.groupnumbershow = false;
		var data =res.data.data;
		console.log(data);
		var name = data.nickname;
		vm.rightoneheaderobj.name = name;
		vm.targetid = listid;
		
		
		if ( $(that).attr('data-not') ){
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = false;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = true;
			
		} else {
			vm.isgroupleader= false;
			vm.isgroupmanager = false;//管理员
			vm.notgroupmanager = false;//不是管理员
			vm.justoneman = true;//只是个人
			vm.shouldshow = false;
			vm.strangeroff = false;
			vm.strangeropen = false;
			
		} 
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为好友，获取用户详细信息
	
	
	
	
	axios.get(globaldomain+'im/group/info.json?id='+listid).then(function(res){
		
		var data = res.data.data;
		
		vm.isgroupleader= false;
		vm.isgroupmanager = false;//管理员
		vm.notgroupmanager = false;//不是管理员
		//vm.justoneman = true;//只是个人
		vm.shouldshow = false;
		vm.groupidbindminus = listid;
		
		
		console.log(data);
		var name = data.name;
		var genre = data.genre;
		var groupnumber = data.count;
		
		vm.rightoneheaderobj.name = name;
		vm.rightoneheaderobj.groupnumber = groupnumber;
		vm.targetid = listid;
		
		vm.groupnumbershow = true;
		
		
		//vm.slidegenre
		
		
		axios.get(globaldomain+'im/group/member/genre.json?groupId='+listid+'&memberId='+ids.id).then(function(res){
			console.log(res.data);
			var level = res.data.data;
			console.log(level);
			
			console.log(  typeof(level));
			switch (level) {
				case '10':
					console.log(10);
					vm.isgroupleader= true;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '20':
					vm.isgroupleader= false;
					vm.isgroupmanager = true;//管理员
					vm.notgroupmanager = false;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = true;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
				case '30':
					vm.isgroupleader= false;
					vm.isgroupmanager = false;//管理员
					vm.notgroupmanager = true;//不是管理员
					vm.justoneman = false;//只是个人
					vm.shouldshow = false;
					vm.strangeroff = false;
					vm.strangeropen = false;
					break;
			}
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
	
		
		
		axios.get(globaldomain+'im/group/member/all.json?sPageNoTR=1&sPageSizeTR=5000&groupId='+listid).then(function(res){
			console.log(res);
			var arrgg = res.data.data.content;
			console.log(arrgg);
			vm.slidechagearr = arrgg;
			 
			
			
			
			
			
		}).catch(function(err){
			console.log(err);
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});//是否为群组，获取群组详细信息
	
	
});
//点击聊天列表


//播放语音消息
$('.mainright').on('click','.audiospan',function(){
	var that = this;
	console.log(that);
	var audio = $(that).find('audio')[0];
	var redspot = $(that).find('.redspot')[0];
	$(redspot).css({ borderColor:'#f5f5f5'});
	audio.play();
});
//播放语音消息


//点击图片消息

$('.mainright').on('click','.picmessagelock',function(){
	var that = this;
	console.log(that);
	console.log( $(that).attr('src') );
	
	//vm.piccurrentviewsrc = $(that).attr('src');
	var currentsrc = $(that).attr('src');
	
	var par = $(that).parents('.msgcontainer');
	
	//console.log( par );
	
	
	var totalpic = par.find('.picmessagelock');
	console.log( totalpic );
	vm.poppicviewer = true;
	
	for ( var i=0;i<totalpic.length;i++ ){
		vm.pictureviewarr.push(totalpic[i].src);
		//console.log( vm.pictureviewarr[i] );
	}
	
	globalpicturelength = vm.pictureviewarr.length;
	console.log(vm.pictureviewarr.length);
	console.log(currentsrc);
	
	
	var current = _.findIndex(vm.pictureviewarr, function(o) { return o == currentsrc; });
	console.log( current );
	
	
	vm.piccurrentviewsrc = vm.pictureviewarr[current]; 
	globalpicindex = current;
	
	
	
});
//点击图片消息

//聊天消息清屏
$('.mainright .rightcomOne ').on('contextmenu','.msgcontainer',function(event){
	var that = this;
	console.log(that);
	console.log(event);
	event.preventDefault();
	event.stopPropagation();
	vm.clearscreenshow = true;
	vm.leftthree1 = event.offsetX +'px';
	vm.topthree1 = event.offsetY+100 +'px';
	
	console.log($(that).parent());
	var getid = $(that).parent().attr('id');
	console.log( getid );
	vm.clearid = getid;
	
});
//聊天消息清屏
//文本消息处理
$('.mainright .rightcomOne ').on('contextmenu','.words',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	
	
	
	vm.msgthreeshow = true;
	vm.leftthree2 = event.offsetX+140 + 'px';
	vm.topthree2 = event.offsetY+150 + 'px';
});
//文本消息处理

//表情消息处理
$('.mainright .rightcomOne ').on('contextmenu','.picwords',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	
	
	
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//表情消息处理

//文件消息处理
$('.mainright .rightcomOne ').on('contextmenu','.filespan',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	
	
	
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//文件消息处理

//位置消息处理
$('.mainright .rightcomOne ').on('contextmenu','.locationspan',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	
	
	
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//位置消息处理

//声音消息处理
$('.mainright .rightcomOne ').on('contextmenu','.audiospan',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//声音消息处理

//图片消息处理
$('.mainright .rightcomOne ').on('contextmenu','.picspan',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//图片消息处理

//名片消息处理
$('.mainright .rightcomOne ').on('contextmenu','.mingpianspans',function(event){
	//console.log(this);
	console.log($(this).parents('.msgmarginlr'));
	
	
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+150 + 'px';
	vm.topthree5 = event.offsetY+150 + 'px';
});
//名片消息处理

//名片消息点击查看
$('.mainright .rightcomOne ').on('click','.mingpianspans',function(event){
	event.stopPropagation();
	//console.log( $(this).attr("id") );
	var mingpianid = $(this).attr("id");
	console.log(event.offsetX);
	console.log(event.offsetY);
	vm.mingpianshow = true;
	vm.msgtop3 = event.offsetY+ 0+'px';
	vm.msgleft3 = event.offsetX + 200+'px';
	axios.get(globaldomain+'im/user/detail.json?id='+mingpianid).then(function(res){
		var data = res.data.data;
		vm.selectavatar4 = data.avatar;
		vm.msgage = data.age;
		vm.msgunit = data.inc;
		vm.msglevel = data.position;
		vm.mingpiannames = data.nickname;
		vm.msgtruename = data.name;
		if(data.sex == '1' ) {
			vm.mingpianisboys = true;
			vm.mingpianisgirls = false;
		}else {
			vm.mingpianisboys = false;
			vm.mingpianisgirls = true;
		}				
	}).catch(function(err){
		console.log(err);
	});
});
//名片消息点击查看



//自身发送文本消息处理
$('.mainright .rightcomOne ').on('contextmenu','.selfwords',function(event){
	
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+550 + 'px';
	vm.topthree5 = event.offsetY+250 + 'px';
});
//自身发送文本消息处理



//自身发送图片消息处理
$('.mainright .rightcomOne ').on('contextmenu','.selfpicspan',function(event){
	
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+350 + 'px';
	vm.topthree5 = event.offsetY+250 + 'px';
});
//自身发送图片消息处理

//自身发送文件消息处理
$('.mainright .rightcomOne ').on('contextmenu','.selffilespan',function(event){
	
	console.log($(this).parents('.msgmarginlr'));
	
	console.log($(this).parents('.msgmarginlr').attr('id'));
	vm.getmsgid = $(this).parents('.msgmarginlr').attr('id');
	console.log(event);
	console.log(event.offsetX);
	console.log(event.offsetY);
	event.stopPropagation();
	event.preventDefault();
	vm.msgthreeshow4 = true;
	vm.leftthree5 = event.offsetX+200 + 'px';
	vm.topthree5 = event.offsetY+250 + 'px';
});
//自身发送文件消息处理

//点击自己的头像
	$('.mainright').on('click','.myuserpic',function(event){
		event.stopPropagation();
		vm.messageusershow = true;
		console.log(ids);
		vm.mycurrentImg = ids.avatar;
		console.log(ids.sex);
		if(ids.sex){
			vm.meisboy = true;
			vm.meisgirl = false;
		}else {
			vm.meisgirl = true;
			vm.meisboy = false;
		}
		vm.myareaId = ids.areaId; 
		vm.mysignature = ids.signature;
		//console.log(event);
		console.log(event.offsetX);
		console.log(event.offsetY);
		vm.myname = ids.nickname;
		vm.msgtop1 = event.offsetY+150+'px';
		vm.msgleft1 = event.offsetX+350+'px';
		
	});
//点击自己的头像

//点击消息里面别人的头像
	$('.mainright').on('click','.headpic',function(event){
		event.stopPropagation();
		vm.msgusershow = true;
		console.log(event);
		var that = this;
		var getid = $(that).attr('id');
		vm.judgefriendid = getid;
		
		console.log(getid);
		vm.msgusernames = '';
		vm.msgaddonname = '';
		vm.msgareaIds = '';
		vm.msgsignatures = '';
		vm.mycurrentImg = ids.avatar;
		axios.get(globaldomain+'im/user/detail.json?id='+getid).then(function(res){
			var data = res.data.data;
			console.log(data);
			
			vm.msgareaIds = data.areaId;
			vm.selectavatar3 = data.avatar;
			vm.msgusernames = data.nickname;
			vm.msgaddonname = data.remark;
			vm.msgsignatures = data.signature;
			
			if(data.sex == '1'){
				vm.otherisboys = true;
				vm.otherisgirls = false;
			}else {
				vm.otherisboys = false;
				vm.otherisgirls = true;
			}
			
		}).catch(function(err){
			console.log(err);
		})
		vm.msgtop2 = event.offsetY+150+'px';
		vm.msgleft2 = event.offsetX+150+'px';
		
	});
//点击消息里面别人的头像

//点击群组免打扰图标
$('.ultimate').on('click','.fa-bell',function(event){
	event.stopPropagation();
	var that = this;
	$(that).addClass('hidden').siblings('.fa-bell-slash-o').removeClass('hidden');
	var getid = $(that).attr('id');
	console.log(getid);
	
	axios.post(globaldomain+'im/group/conf/set/hinder.json?groupId='+getid+'&hinder=1').then(function(res){
		var data = res.data;
		
		console.log(data);
	}).catch(function(err){
		console.log(err);
	});
	
})

//点击群组免打扰图标

//点击解除群组免打扰图标
$('.ultimate').on('click','.fa-bell-slash-o',function(event){
	event.stopPropagation();
	var that = this;
	$(that).addClass('hidden').siblings('.fa-bell').removeClass('hidden');
	var getid = $(that).attr('id');
	console.log(getid);
	
	axios.post(globaldomain+'im/group/conf/set/hinder.json?groupId='+getid+'&hinder=0').then(function(res){
		var data = res.data;
		
		console.log(data);
	}).catch(function(err){
		console.log(err);
	});
	
})

//点击解除群组免打扰图标
