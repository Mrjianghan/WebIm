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
	ids = JSON.parse( nothing );//登陆必备*/
	console.log(ids);
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
	},         //连接关闭回调
	
    onOnline: function () {
		console.log('本机网络连接成功');
	},                  //本机网络连接成功
	
    onOffline: function () {
		console.log('本机网络掉线');
		window.location.href="index.html";
		localStorage.clear();
	},                 //本机网络掉线
	
    onError: function ( message ) {
		console.log(message);
		console.log('失败回调');
		//window.location.href="index.html";
		localStorage.clear();
	},          //失败回调
	
	
	
			
	onTextMessage: function ( message ) {
		vm.nomessage = false;
		console.log('文本消息');
		
		message.time = getCurrentTime();
		
		console.log(message);
		var type = message.type;
		
		switch ( type ) {
			case 'chat':
				axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
					var data = res.data.data;
					console.log(data);
					var name = data.nickname;
					var avatar = data.avatar;
					var msgfrom = message.from;
					
					message.name = name;
					message.avatar = avatar;
					
					console.log(message);
					/*消息记录*/
					var str = '';
					
					str = str + '<div id="'+message.from+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+message.data+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					
				
				
					
					if ( $('.mainleft .comlist1  #'+message.from).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.from).remove();
						$('.mainleft .comlist1').prepend(str);
					}
					
					/*消息记录*/
					
					
					
					/*消息内容容器*/
					var str1 = '';
					str1 = str1 + '<div id="'+message.from+'" class="msgconmaster hidden"><div class="msgmasterinner"><div class="msgcontainer"><div class="msgmarginlr">'+message.from+'</div></div></div></div>';	





					if ( $('.mainright .rightonechatcon  #'+message.from+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

					}
					
					/*消息内容容器*/

					
					
					
				
					
				
					
					
					
					



				}).catch(function(err){
					console.log(err);
				});
				
				
				break;
			case 'groupchat':
				axios.get(globaldomain+'im/group/info.json?id='+message.to).then(function(res){
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
					/*消息记录*/
					var str = '';
					
					str = str + '<div id="'+message.to+'" class="listOnecon"><img src="'+( message.avatar ? vm.$refs.rightthree.picsrc+message.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+message.name+'</div><div class="listOnebottomleft shenglue">'+message.data+'</div></div><div class="listOneconright"><div class="listOnetopright">'+message.time+'</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
					
					
					
					if ( $('.mainleft .comlist1  #'+message.to).length < 1 ){
						$('.mainleft .comlist1').prepend(str);
					} else {
						$('.mainleft .comlist1  #'+message.to).remove();
						$('.mainleft .comlist1').prepend(str);
					}
					/*消息记录*/
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					axios.get(globaldomain+'im/user/detail.json?id='+message.from).then(function(res){
						
						var data = res.data.data;
						console.log(data);
						var avatar = data.avatar;
						var nickname = data.nickname;
						
						
						
						
						
					/*消息内容容器*/
					var str1 = '';
						
					str1 = str1 + '<div id="'+message.to+'" class="msgconmaster hidden"><div class="msgmasterinner"><div class="msgcontainer"><div class="msgmarginlr">'+'<div id="'+message.id+'" class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div></div>';	
					
					
					var str2 ='';
						
					/*str2 ='<div class="msgcontainer"><div class="msgmarginlr">'+'<div id="'+message.id+'" class="leftmsg"><div class="imgcontainer"><img id="message.from" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div></div>';*/
						
					str2 ='<div class="msgmarginlr">'+'<div id="'+message.id+'" class="leftmsg"><div class="imgcontainer"><img id="message.from" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div>';





					if ( $('.mainright .rightonechatcon  #'+message.to+'.msgconmaster').length < 1 ){

						$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);

					} else {
						
						$('.mainright .rightonechatcon  #'+message.to+'.msgconmaster .msgmasterinner  .msgcontainer').append( str2 );
						
						
						
					}
					
					/*消息内容容器*/
						
						
						
						
						
						
						
						
						
						
						
						
						
						
					}).catch(function(err){
						console.log(err);
					});
					
					
					
					



				}).catch(function(err){
					console.log(err);
				});
		
				
				
				break;
			case 'chatroom':
				
				
				
				break;
		}
		
		
		
		
		
		
		
	
		
		
		
		
		
		
		/*存储消息*/
		/*allmessagecontainer.push(message);
		
		
		
		
		
		
		
		
		
		
		
		
		console.log(allmessagecontainer);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		vm.$store.dispatch('pushmessage');
		
		
		console.log(vm.$store.getters);*/
		
		/*getchat:'getchat',单人聊天
		getgroupchat:'getgroupchat',群组聊天
		getchatroom:'getchatroom',*/
		
		/*console.log(vm.getchat);
		console.log(vm.getgroupchat);
		console.log(vm.getchatroom);
		
		
		
		console.log(vm.getallmessage);*/
		
		
		/*_.find(vm.getchat, function(o){
			console.log(o.from);
		});*/
		
		
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		/*console.log(message.from);
		
		globalmsgarr.push(message.from);*/
		
		
		
		/*存储消息*/
		
		
		
		
		
		
		
		
		
		
		
		
		console.log(vm.$store.getters.getchatroom);
		
		console.log(vm.$store.getters.getgroupchat);

				
				
			
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
	
		
		
	},    //收到文本消息
    onEmojiMessage: function ( message ) {
		console.log('表情消息');
		vm.nomessage = false;
		message.time = getCurrentTime();
		console.log(message);
		
		/*allmessagecontainer.push(message);
		allmsgreverse.unshift(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');*/
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},   //收到表情消息
    onPictureMessage: function ( message ) {
		vm.nomessage = false;
		console.log('图片消息');
		message.time = getCurrentTime();
		console.log(message);
		
		/*allmessagecontainer.push(message);
		allmsgreverse.unshift(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');*/
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}, //收到图片消息
    
    onAudioMessage: function ( message ) {
		vm.nomessage = false;
		console.log('音频消息');
		message.time = getCurrentTime();
		console.log(message);
		
		/*allmessagecontainer.push(message);
		allmsgreverse.unshift(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');*/
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var options = { url: message.url };
    
		options.onFileDownloadComplete = function ( response ) { 
			  //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
			var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
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
		vm.nomessage = false;
		console.log('位置消息');
		message.time = getCurrentTime();
		console.log(message);
		/*allmessagecontainer.push(message);
		allmsgreverse.unshift(message);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		vm.$store.dispatch('pushmessage');*/
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},//收到位置消息
	
    onFileMessage: function ( message ) {
		vm.nomessage = false;
		console.log('文件消息');
		message.time = getCurrentTime();
		console.log(message);
		/*allmessagecontainer.push(message);
		allmsgreverse.unshift(message);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		vm.$store.dispatch('pushmessage');*/
		
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},    //收到文件消息
	
    onVideoMessage: function (message) {
		vm.nomessage = false;
		console.log('视频消息');
		message.time = getCurrentTime();
		
		//聊天记录列表 vm.chathistoryarr1
		
		
		
		
		
		
		
		
		
		
		
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
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
		console.log('消息送达服务器回执');
		console.log(message);
	},   //收到消息送达服务器回执
	
    onReadMessage: function(message){
		console.log('收到消息已读回执');
		console.log(message);
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
		message:[
			
		],
		
		chat:[
			
		],
		groupchat:[
			
		],
		chatroom:[
			
		],
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
	actions:{
		
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
		}
	},
	
	created:function(){
		
	},
	
	computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
		groupsarrOne:'groupsarrOne',
		
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
	
			
			if ( this.mainsearchval =='' ){
				
				this.serachingornot = true;
				vm.$refs.current.tempfriendsarrcon = [];
				vm.$refs.current.tempgroupsarrcon = [];
				
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
			
			
			
			
			obj2.name = nick;
			obj2.avatar = avatar;
				
			obj2.type="chat";
			obj2.id = id;
				
			console.log(obj2);
				
			var str ='';
				
			str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
			if ( $('.mainleft .comlist1  #'+obj2.id).length < 1 ){
				$('.mainleft .comlist1').prepend(str);
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		},//没有关键字点击搜索结果中好友列表触发
		nosearchgrouptalking:function($event){
			
			vm.nomessage = false;
			
			var that = $event.currentTarget;
			var name = $(that).attr('data-nick');
			var avatar = $(that).attr('data-avatar');
			var id = $(that).attr('id');
			
			
			
			var obj1 ={};
			obj1.avatar = avatar;
			obj1.name = name;
			obj1.to = id;
				
				
			obj1.type="groupchat";
			var str = '';
			str = '<div id="'+obj1.to+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
				
			if ( $('.mainleft .comlist1  #'+obj1.to).length < 1 ){
				$('.mainleft .comlist1').prepend(str);
			}
			
			
		
		},//没有关键字点击搜索结果中群组列表触发
		searchgrouptalking:function($event){
			
			vm.nomessage = false;
			
			var that = $event.currentTarget;
			
			var name = $(that).attr('data-nick');
			var avatar = $(that).attr('data-avatar');
			var id = $(that).attr('id');
			
			console.log(id);
			
			var obj1 ={};
			obj1.avatar = avatar;
			obj1.name = name;
			obj1.to = id;
				
				
			obj1.type="groupchat";
			var str = '';
			str = '<div id="'+obj1.to+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
				
			if ( $('.mainleft .comlist1  #'+obj1.to).length < 1 ){
				$('.mainleft .comlist1').prepend(str);
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
			
			
			
			
			obj2.name = nick;
			obj2.avatar = avatar;
				
			obj2.type="chat";
			obj2.id = id;
				
			console.log(obj2);
				
			var str ='';
				
			str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
			if ( $('.mainleft .comlist1  #'+obj2.id).length < 1 ){
				$('.mainleft .comlist1').prepend(str);
			}
			
			
			
			
		},//关键字搜索好友触发
		
		
		
		
		
		startchat:function(){
			
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
				
				
				
				
				//vm.mainstartgroupchatarr 
				
				
				
				
				
				
				/*var str1 ='';
				console.log(friendsarr);
				
				for ( var i in friendsarr ){
					console.log( friendsarr[i] );
					str1 = str1 + '<div id="'+friendsarr[i].nickname+'" class="sort_list"><div class="friendseveryOne" id="'+friendsarr[i].id+'"><div class="selectOnly1"><img class="under1" src="imgs/selected.png"><img class="under2"  src="imgs/unselected.png"><input  value="'+friendsarr[i].id+'" type="checkbox"></div><img class="friendsimg" src="http://47.95.6.203:8189/zxupl/'+friendsarr[i].avatar+'"><div class="num_name">'+ friendsarr[i].nickname +'</div></div></div>';
				}
				
				$('#messagemaster .sort_box').html(str1);
				
				$('#messagemaster .sort_box .under1').css({display:'none'});
			
				*/
				
				//initials();
				
				
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
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=500').then(function(res){
				
				var data = res.data.data;
				
				var content = data.content;
				
				
				vm.chatroominfo = content;
				
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
		},//改变icon2 颜色
		
		addbluecolor3:function(){
			this.icons1 = false;
			this.icons2 = false;
			this.icons3 = true;
			//vm.currentView = 'comlistcomThree';
			//vm.currentView1 = 'rightcomThree';
			
			
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





Vue.component('rightcomtwo',{
	template:'#rightcomTwo',
	data:function(){
		return {
			placeholder2show:true,
			
		}
	}
});

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
		/*id:function(){
				axios.get(globaldomain+'im/group/info.json?id='+this.right3groupid).then(function(res){
				console.log(res);
			}).catch(function(err){
				console.log(err);
			});
			
		},*/
		
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
			
			axios.get(globaldomain+'im/group/info.json?id='+groupid).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;//群组特别标识
				
				console.log(data);
				
				var obj1 ={};
				obj1.avatar = avatar;
				obj1.name = name;
				obj1.to = id;
				
				
				obj1.type="groupchat";
				
				console.log(obj1);
				
				var str = '';
				
				/*str = str + '<div id="'+obj1.to+'" class="listOnecon"><img src="'+ obj1.avatar ? this.picsrc+obj1.avatar : this.defaultpic+'"><div v-if="arr1.count" class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue">{{ arr1.data }}</div></div><div class="listOneconright"><div class="listOnetopright">{{ arr1.time }}</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';*/
				
				
				/*str = str + '<div id="'+obj1.to+'" class="listOnecon"><img src="'+ obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic+'"><div v-if="arr1.count" class="circle"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue">{{ arr1.data }}</div></div><div class="listOneconright"><div class="listOnetopright">{{ arr1.time }}</div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';*/
				
				str = str + '<div id="'+obj1.to+'" class="listOnecon"><img src="'+( obj1.avatar ? vm.$refs.rightthree.picsrc+obj1.avatar : vm.$refs.rightthree.defaultpic)+'"><div  class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj1.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
				
				if ( $('.mainleft .comlist1  #'+obj1.to).length < 1 ){
					$('.mainleft .comlist1').prepend(str);
				}
				
				console.log(this);
				
				console.log(vm.$refs.rightthree);
				
				console.log( $('.mainleft .comlist1  #'+obj1.to) );
				
				
				
				
				
				
			
				//vm.comlist1
			
				
				
				
				
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
				
				
				
				//console.log(data);
				//console.log(avatar);
				//console.log(name);
				//console.log(id);
				
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
				
				str = str + '<div id="'+obj2.id+'" class="listOnecon"><img src="'+( obj2.avatar ? vm.$refs.rightthree.picsrc+obj2.avatar : vm.$refs.rightthree.defaultpic)+'"><div class="transparentone"></div><div class="listOnedetails"><div class="listOneconleft"><div class="listOnetopleft shenglue">'+obj2.name+'</div><div class="listOnebottomleft shenglue"></div></div><div class="listOneconright"><div class="listOnetopright"></div><div class="listOnebottomright"><i class="fa fa-bell-slash-o"></i><i class="fa fa-eye-slash"></i></div></div><div class="clearfix"></div></div></div>';
				
				
				if ( $('.mainleft .comlist1  #'+obj2.id).length < 1 ){
					$('.mainleft .comlist1').prepend(str);
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
	store,
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
		isgroupleader:false,
		notgroupleader:false,
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
		
		
		
	},
	
	/*computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
		groupsarrOne:'groupsarrOne',
		getallmessage:'getallmessage',//所有的消息
		getchat:'getchat',
		getgroupchat:'getgroupchat',
		getchatroom:'getchatroom',
		getselectallstate:'getselectallstate',//发起群聊全选与否
		
	}),*/
	
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
		  user: ids.id,//b14660c2713c44b0aa79e86ae73661b2
		  pwd: ids.psw,//momoclo901217
		  appKey: WebIM.config.appkey
		};
		conn.open(options);
		
		axios.post(globaldomain+'im/buddy/find.json').then(function(res){
			 
			
			myfriends = res.data.data;
			vm.$store.state.userfriends = myfriends;
			console.log(vm.$store.state.userfriends);
			
			
			
			
			
			
			
			
			
			
			
			
		}).catch(function(err){
			console.log(err);
		});//获取所有好友
		
		
		axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
			mygroups = res.data.data.content;
			vm.$store.state.usergroups = mygroups;
			console.log(vm.$store.state.usergroups);
			
		}).catch(function(err){
			console.log(err);
		});//获取加入的群组
		
	},
	
	methods:{
		clearsearch:function(){
			
			this.$refs.current._data.searchshow = false;
			vm.$refs.current.tempfriendsarrcon = [];
			vm.$refs.current.tempgroupsarrcon = [];
			
		},//关闭搜索框
		selectcurrentinput:function($event){
			console.log($event);
			
			console.log($event.currentTarget);
			var selectnow  = $event.currentTarget;
			
			console.log($(selectnow));
			
			
			
			//console.log($(selectnow).siblings().find('.under1'));
			/*if ( $(in1).css('display')=='block' ){
				
				$(in1).css({display:'none'});
				$(in2).css({display:'block'});
			} else {
				$(in2).css({display:'none'});
				$(in1).css({display:'block'});
			}*/
			
			if ( $(selectnow).is(':checked') ){
				
				console.log('选中');
				
			} else {
				//console.log(vm.$refs.in1);
				
				//$(vm.$refs.in1).prop("checked",false);
				//console.log( $('.selectallcon input').prop("checked") );
				
				console.log('没选中');
				
				console.log($('.selectallcon input').prop('checked'));
				
				$('.selectallcon input').attr("checked",false);
				
				
				
				
			}
			
			
			
			
			
			
		},//选择主搜索好友列表*/
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
		selectbossornot:function($event){
			
			console.log(vm.selectmaingrouparr);
			
			var that = $event.currentTarget;
			
			//vm.selectallstate1
			
			
			
			//console.log($(that).find('input'));
			
			//console.log($(that).find('input').prop('checked'));
			
			var subinput = $('.transreadychat .sort_box input');
			
			console.log( subinput );
			
			//console.log( subinput[0] );
			
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
			
			
			
			
			
			
		
			
			
			
			
			/*if (  ) {
				
			} else {
				
			}*/
			
			/*$('.transreadychat .sort_box input').prop(; , true);
			
			
			console.log( $('.transreadychat .sort_box input').prop('checked') );
			
			
			
			
			console.log( $('.transreadychat .sort_box input') );
			
			console.log(vm.mainstartgroupchatarr);*/
			
			
			
			
			
		},//发起聊天全部选择或取消
		
		creategroupOne:function(){
			axios.post(globaldomain+'im/group/create.json?name=自动生成&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
				
				var code = res.data.code;
				console.log(res.data);
				
				if ( code==2000 ){
					var groupid = res.data.data;
					console.log(groupid);
					
					
					
					var members = tempcreategroup;
					 
					
					console.log(members);
					
					axios.post(globaldomain+'im/group/apply/pull.json?groupId='+groupid+'&groupIds='+members+'&descr=pc端').then(function(res){
						console.log(res.data);
						
						
					}).catch(function(err){
						console.log(err);
					})
					
				}
				
				
			}).catch(function(err){
				console.log(err);
				
			});
		},//确定创建群聊
		
		
		
		
		
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
		changelistcolor2:function($event){
			var idnumber = $event.currentTarget.getAttribute('id');
			var indexinner = $event.currentTarget.getAttribute('data-index');
			this.indexstrange2 = indexinner;
			//console.log(this.indexstrange2);
			this.indexstrange = 'string';
			this.indexstrange2 = -1-this.indexstrange2;
			//console.log(vm.$children[1]);
			vm.$children[1].showgroupsright = false;
			vm.$store.commit('rightfriendbtn',idnumber);
			vm.$children[1].showgroupsright1 = true;
		},//点击好友列表
		
			
	}
});



//追加jQuery代码






//点击聊天列表
$('.mainleft .comlist1').on('click','.listOnecon',function(){
	
	console.log(this);
	var that = this;
	var listid = $(that).attr('id');
	console.log(listid);
	$(that).addClass('backgroundcolor').siblings().removeClass('backgroundcolor');
	
	//console.log( $(that+' .circle') );
	
	console.log($(that).find( '.circle' ));
	
	$(that).find( '.circle' ).removeClass('circle').addClass('transparentone');
	
	
	
	
	
	
	
	
	$('.mainright .rightonechatcon   #'+listid+'.msgconmaster').removeClass('hidden').siblings().addClass('hidden');
	
	
	
	console.log( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster') );
	
	
	var str1 = '';
	
	str1 = str1 + '<div id="'+listid+'" class="msgconmaster hidden">'+'</div>';	
	
	
	if ( $('.mainright .rightonechatcon  #'+listid+'.msgconmaster').length < 1 ){
		
		$('.mainright .rightonechatcon   .manywindowcon.scroll-content').append(str1);
		
	} else {
		
		
		
	}
	
	/*'<div class="msgmasterinner"><div class="msgcontainer"><div class="msgmarginlr">'+'<div id="'+message.id+'" class="leftmsg"><div class="imgcontainer"><img id="'+message.from+'" src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'" class="headpic"></div><div class="rightcon"><div class="name">'+nickname+'</div><div class="wordscontent"><span>'+message.data+'</span></div></div><div class="clearfix"></div></div>'+'</div></div></div>'*/
	
	
	
	
	
	
	
	axios.get(globaldomain+'im/user/detail.json?id='+listid).then(function(res){
		
		var data =res.data.data;
		
		console.log(data);
		var name = data.nickname;
		vm.rightoneheaderobj.name = name;
		vm.targetid = listid;
		
		//$('.mainright .rightonechatcon   #'+listid+'.msgconmaster')
		
		
		
		
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});
	
	axios.get(globaldomain+'im/group/info.json?id='+listid).then(function(res){
		
		var data = res.data.data;
		
		console.log(data);
		var name = data.name;
		var genre = data.genre;
		var groupnumber = data.count;
		
		vm.rightoneheaderobj.name = name;
		vm.rightoneheaderobj.groupnumber = groupnumber;
		vm.targetid = listid;
		
		
		
		
		
		
		
	}).catch(function(err){
		console.log(err);
	});
	
	
});
//点击聊天列表







//发送消息按钮点击













$('.mainright .rightonesend button').on('click',function(){
	var that = this;
	
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
				vm.sendbtncontent = '';
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+sendtarget).then(function(res){
		
					var data =res.data.data;

					console.log(data);
					
					var avatarss = data.avatar;
					
					//$('.mainright .rightonechatcon   #'+listid+'.msgconmaster')
					
					
					var str4 = '';
				
					str4 = str4 + '<div class="msgmarginlr"><div class="rightmsg"><div class="wordscontent"><span>'+content+'</span></div><div class="imgcontainer"><img src="'+(avatarss ? vm.$refs.rightthree.picsrc+ avatarss : vm.$refs.rightthree.defaultpic)+'"></div></div></div>';

					$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster .msgcontainer').append(str4);
					
					
					





				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				
				
				
				
				
				
				
				
				



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
				vm.sendbtncontent = '';
				
				
				axios.get(globaldomain+'im/group/info.json?id='+sendtarget).then(function(res){
		
					var data = res.data.data;

					console.log(data);
					var name = data.name;
					var genre = data.genre;
					var groupnumber = data.count;
					var avatar = data.avatar;

					
					/*'<div class="msgmarginlr">
						<div class="rightmsg">
							<div class="rightmaxwidth">
								<div class="imgcontainer">
									<img src="'+(avatar ? vm.$refs.rightthree.picsrc+ avatar : vm.$refs.rightthree.defaultpic)+'">

								</div>
							
							
							<div class="rightcon">
								<div class="wordscontent"><span>'+content+'</span></div>
							</div>
							</div>
							<div class="clearfix"><div>
						</div>
						
					</div>'*/
					
					
					
					
					var str4 = '';
				
					
					
					str4 ='<div class="msgmarginlr"><div class="rightmsg"><div class="rightmaxwidth"><div class="imgcontainer"><img src="'+(ids.avatar ? vm.$refs.rightthree.picsrc+ ids.avatar : vm.$refs.rightthree.defaultpic)+'"></div><div class="rightcon"><div class="wordscontent"><span>'+content+'</span></div></div></div><div class="clearfix"><div></div></div>';

					$('.mainright .rightonechatcon  #'+sendtarget+'.msgconmaster .msgcontainer').append(str4);
					
					
					
					
					
					
					
					
					
					







				}).catch(function(err){
					console.log(err);
				});
				
				
				
				
				
				
				
				
				
				
				
				
				







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
	
	
	
	
	
});












//发送消息按钮点击







