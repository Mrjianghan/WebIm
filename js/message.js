axios.defaults.withCredentials = true;
var ids;//登陆成功后当前用户的信息
var myfriends;//全局变量我的所有好友
var mygroups;//全局变量我的所有群组
var globaldomain = 'http://api.zhongxiangim.com/';
var globalimg = 'http://assets.zhongxiangim.com/zxupl';



var templatearr=[];//全局数组
var templatearr1=[];//全局数组
var templatearr2=[];//全局数组
var globaltextmsgarr=[];//文本消息数组
var globaltextmsgarrcopy1=[];//文本消息数组
var globaltextmsgarrbridge=[];//文本消息数组
var globaltextmsgarrcopy2=[];//文本消息数组

var unreadlength=[];//未读消息数

var allmessagecontainer=[];//所有消息容器

function getCurrentTime(){
	var globaltime = new Date();
	var getglobaltime = globaltime.toTimeString();
	var now = getglobaltime.slice(0,5);
	console.log(now);
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
	console.log(ids.id);
	console.log(ids.psw);
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
		
		console.log('文本消息');
		
		allmessagecontainer.push(message);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		
		
		
		
		vm.$store.dispatch('pushmessage');
		
		
		
		switch (message.type) {
			case "groupchat":
				console.log('群组文本消息');
				console.log(vm.chathistoryarr1);
				console.log(globaltextmsgarr);
				console.log(message);
				
				
				
				
				
				
				break;
			case "chat":
				console.log('单聊文本消息');
				console.log(vm.chathistoryarr1);
				
				console.log(message);
				
				console.log(message.ext);
				
				//console.log(message.ext.mingpian);//是否为名片
				//是否为名片
				
				
				
				
				var from = message.from;
				var id = message.id;
				var to = message.to;
				var type = message.type;
				
				
				
				
				axios.get(globaldomain+'im/user/detail.json?id='+from).then(function(res){
					
					
					
					
					
					var data1 = res.data.data;
					
					console.log(data1);
					
					var ava = data1.avatar;
					
					var name = data1.nickname;
					
					var obj1 = {};
					
					
					var finaltime = getCurrentTime();
					
					
					console.log(finaltime);
					
					
					
					
					if ( message.ext.mingpian ) {
						var data = '[名片]';
						var cardinfo = message.ext;
						console.log(cardinfo);
						obj1.mingpian = cardinfo;



					} else {
						var data = message.data;
					}
					
					
					
					
					obj1.time = finaltime;
					obj1.name = name;
					obj1.avatar = ava;//从回掉里抓数据
					
					obj1.data = data;//从消息里抓数据
					obj1.from = from;
					obj1.id = id;
					obj1.to = to;
					obj1.type = type;//从消息里抓数据
					obj1.msgtype = "text";
				
					console.log(obj1);
					
					
					
					
					
					/*为了生成消息列表*/
					
					
					
					var localgetter = vm.chathistoryarr1;//抓取已存在的聊天列表里的数据
				
					console.log(localgetter);

					localgetter.unshift(obj1);

					var localarr2 =[];

					localarr2 = _.uniqBy(localgetter, 'from');//整合接收消息生成列表与发消息按钮生成的列表

					console.log(localarr2);

					vm.chathistoryarr1 = localarr2; //重设聊天列表数组

					console.log(vm.chathistoryarr1);
					
					
					
					
					
					/*为了生成消息列表*/
					
					
					
					
					
					/*为了存储消息*/
					
					/*globaltextmsgarrbridge.push(obj1);
					
					
				
					console.log(globaltextmsgarrbridge);
					
					
					var transdata = JSON.stringify(globaltextmsgarrbridge);
					
					console.log(transdata);
					
					localStorage[to+":"+from] = transdata;
					
					var parsemsg = JSON.parse(transdata);*/
					
					
					
					
					
					//vm.$refs.rightone.messagearr = parsemsg;
					
					//console.log(vm.$refs.rightone.messagearr);
					
					
					
					
					
					
					/*为了存储消息*/
					
					/*为了侦测未读条目数*/
					
					
					
					
					
					
					obj1.count = parsemsg.length;
					
					console.log(obj1);
					
					
					
					
					/*为了侦测未读条目数*/
					
					
				}).catch(function(err){
					console.log(err);
				})
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				break;
			case "chatroom":
				console.log('聊天室文本消息');
				console.log(vm.chathistoryarr1);
				console.log(globaltextmsgarr);
				console.log(message);
				
				
				
			
				
			
				
				
				break;
		}
		
		
		
		
		
	},    //收到文本消息
    onEmojiMessage: function ( message ) {
		console.log('表情消息');
		console.log(message);
		
		allmessagecontainer.push(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');
		
		
	},   //收到表情消息
    onPictureMessage: function ( message ) {
		console.log('图片消息');
		console.log(message);
		allmessagecontainer.push(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');
		
	}, //收到图片消息
    
    onAudioMessage: function ( message ) {
		console.log('音频消息');
		console.log(message);
		allmessagecontainer.push(message);
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		vm.$store.dispatch('pushmessage');
		
		
		
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
		console.log('位置消息');
		console.log(message);
		allmessagecontainer.push(message);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		vm.$store.dispatch('pushmessage');
		
	},//收到位置消息
	
    onFileMessage: function ( message ) {
		console.log('文件消息');
		console.log(message);
		allmessagecontainer.push(message);
		
		JSON.stringify(allmessagecontainer);
		
		localStorage['allmessage'] = JSON.stringify(allmessagecontainer);
		
		console.log( localStorage['allmessage'] );
		
		vm.$store.dispatch('pushmessage');
		
	},    //收到文件消息
	
    onVideoMessage: function (message) {
		console.log('视频消息');
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
		message:[],
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
		storemsg:function(state){
			
			if (localStorage['allmessage']) {
				var parsemsg = JSON.parse( localStorage['allmessage'] );
				return state.message = parsemsg ;
			}
			
		}
		
		
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
		}
		
	},
	actions:{
		pushmessage:function(context){
			context.commit('storemsg');
		}
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
			isgirl:ids.sex == 2? true: false,
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
			//var temparrcontainer2 =[];
			//console.log(this);
//			console.log( this.searchshow );
//			console.log(this.friendsarrOne);
//			console.log(this.groupsarrOne);
			
			if ( this.mainsearchval =='' ){
				
				this.serachingornot = true;
				vm.$children[0].tempfriendsarrcon = [];
				vm.$children[0].tempgroupsarrcon = [];
				
			} else {
				this.serachingornot = false;
				
				console.log(this.mainsearchval);
				var keywords = this.mainsearchval;
				console.log( keywords );
				axios.post(globaldomain +'im/buddy/find.json?key='+keywords).then(function(res){
					var data = res.data.data;
					var length = res.data.data.length;
					
					if ( length>0 ){
						vm.$children[0].tempfriendsarrcon.push(data);
						
						console.log(vm.$children[0].tempfriendsarrcon);
						
						console.log('好友有结果');
						
						vm.$children[0].haveresult = true;
						
					} else {
						
						console.log('好友无结果');
						
					}
				}).catch(function(err){
					
					console.log(err);
					
				});//获取关键字好友
				
				axios.post(globaldomain+'im/group/find.json?name='+keywords).then(function(res){
					var data = res.data.data;
					
					var length = res.data.data.length;
					if ( length>0 ){
						vm.$children[0].tempgroupsarrcon.push(data);
						
						console.log('群组有结果');
						
						vm.$children[0].haveresult = true;
						
					} else {
						console.log('群组无结果');
					}
					
				}).catch(function(err){
					//console.log(err);
				});//获取关键字的群组
				
				
			}
			
			
		},//主搜索
		startchat:function(){
			this.$parent.readychatshow = true;
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				var friendsarr = res.data.data;
				myfriends = friendsarr;
				vm.$store.commit('showfriends');
				var timer1 = setTimeout(function(){
					$('.scrollbar-macosx').scrollbar();
					clearTimeout(timer1);
				},20);//显示滚动条
				var str1 ='';
				console.log(friendsarr);
				
				for ( var i in friendsarr ){
					console.log( friendsarr[i] );
					str1 = str1 + '<div id="'+friendsarr[i].nickname+'" class="sort_list"><div class="friendseveryOne" id="'+friendsarr[i].id+'"><div class="selectOnly1"><img class="under1" src="imgs/selected.png"><img class="under2"  src="imgs/unselected.png"><input  value="'+friendsarr[i].id+'" type="checkbox"></div><img class="friendsimg" src="http://47.95.6.203:8189/zxupl/'+friendsarr[i].avatar+'"><div class="num_name">'+ friendsarr[i].nickname +'</div></div></div>';
				}
				
				$('#messagemaster .sort_box').html(str1);
				
				$('#messagemaster .sort_box .under1').css({display:'none'});
			
				
				
				initials();
				
				
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
			vm.mainrightone = true;
			vm.mainrighttwo = false;
			vm.specialthree = false;
			
			console.log(vm);
			
		},//改变icon1 颜色
		
		addbluecolor2:function(){
			this.icons1 = false;
			this.icons2 = true;
			this.icons3 = false;
			vm.currentView = 'comlistcomTwo';
			vm.currentView1 = 'rightcomTwo';
			vm.showleft1 = false;
			vm.showleft2 = true;
			vm.mainrightone = false;
			console.log(vm);
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
				console.log(data);
				vm.chatroomclass = data;
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			axios.post(globaldomain+'im/room/all.json?sPageNoTR=1&sPageSizeTR=500').then(function(res){
				
				var data = res.data.data;
				console.log(data);
				var content = data.content;
				console.log(content);
				
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
			console.log(vm);
			
			var listimer1 = setTimeout(function(){
				initials1();
				clearTimeout('listimer1');
			},90);
			
			vm.showleft1 = false;
			vm.showleft2 = false;
			vm.mainrightone = false;
			vm.mainrighttwo = false;
			vm.specialthree = true;
		},//改变icon3 颜色
		
	}
})




Vue.component('rightcomone',{
	template:'#rightcomOne',
	data:function(){
		return {
			showgroupcontrol:false,
			name:'暂无消息',
			isgroupmaster:false,
			isgroupleader:false,
			notgroupleader:false,
			defaulthide:false,
			switchbindid:'',
			messagearr:[],
			defaultpic:'imgs/default1.png',
			picsrc:globalimg,
			
		}
	},
	created:function(){
		var msgtimer1 = setTimeout(function(){
			$('.scrollbar-macosx').scrollbar();
		},500);
	},
});
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
	created:function(){
		console.log('created');
		console.log(this);
		console.log(this.$parent);
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
				console.log(vm);
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
			
			axios.get(globaldomain+'im/group/info.json?id='+groupid).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;
				
				var obj1 ={};
				obj1.avatar = avatar;
				obj1.name = name;
				obj1.to = ids.id;
				obj1.from = id;
				
				console.log(obj1);
				
				templatearr1.push(obj1);
				
				console.log( templatearr1 );
				
				vm.chathistoryarr1 = _.uniqBy(templatearr1, 'from');
				
				console.log(vm.chathistoryarr1);
				
				console.log(vm.$refs);
				
				
				
				
				/*页面跳转*/
				vm.$refs.current.icons1 = true;
				vm.$refs.current.icons2 = false;
				vm.$refs.current.icons3 = false;
				
				vm.specialthree = false;
				vm.mainrightone = true;
				
				vm.showleft1 = true;
				vm.showleft2 = false;
				
				
				
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
			
			axios.get(globaldomain+'im/user/detail.json?id='+friendid).then(function(res){
				var data = res.data.data;
				console.log(data);
				var id = data.id;
				var name = data.nickname;
				var avatar = data.avatar;
				
				var obj2 = {};
				
				obj2.name = name;
				obj2.avatar = avatar;
				obj2.to = ids.id;
				obj2.from = id;
				
				
				templatearr1.push(obj2);
				
				
				console.log(templatearr1);
				
				vm.chathistoryarr1 = _.uniqBy(templatearr1, 'from');
				
				console.log(vm.chathistoryarr1);
				
				
				
				/*页面跳转*/
				vm.$refs.current.icons1 = true;
				vm.$refs.current.icons2 = false;
				vm.$refs.current.icons3 = false;
				
				vm.specialthree = false;
				vm.mainrightone = true;
				
				vm.showleft1 = true;
				vm.showleft2 = false;
				
				
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
		slebossswicth:true,
		selectallornot:false,
		beginchatbtnable:true,
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
		cardmingzi:false,
		
		
		
		listoneadd:'',
		
		
		count:0,
		
		chatroomarea:[],
		chatroomclass:[],
		chatroominfo:[],
		
		
		
		
	},
	
	computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
		groupsarrOne:'groupsarrOne',
		getallmessage:'getallmessage',//所有的消息
	}),
	
	
	
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
			console.log(myfriends);
			vm.$store.state.userfriends = myfriends;
			
			//console.log(vm.$store.state.userfriends);
			
			console.log(vm.$store.state.userfriends);
			
		}).catch(function(err){
			console.log(err);
		});//获取所有好友
		
		
		axios.post(globaldomain+'im/group/find.json?sPageNoTR=1&sPageSizeTR=5000').then(function(res){
			mygroups = res.data.data.content;
			console.log(mygroups);
			
			vm.$store.state.usergroups = mygroups;
			console.log(vm.$store.state.usergroups);
			
		}).catch(function(err){
			console.log(err);
		});//获取加入的群组
		
	},
	methods:{
		clearsearch:function(){
			
			this.$children[0]._data.searchshow = false;
			vm.$children[0].tempfriendsarrcon = [];
			vm.$children[0].tempgroupsarrcon = [];
			
			console.log(vm.getallmessage);
			
		},//关闭搜索框
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
		},//关闭发起聊天窗口
		sel1action:function(){
			vm.sel1 = true;
			vm.sel2 = false;
			vm.slebossswicth = true;
			
			
			
			
			axios.post(globaldomain+'im/buddy/find.json').then(function(res){
				var friendsarr = res.data.data;
				myfriends = friendsarr;
				vm.$store.commit('showfriends');
				
				var str1 ='';
				console.log(friendsarr);
				
				for ( var i in friendsarr ){
					console.log( friendsarr[i] );
					str1 = str1 + '<div id="'+friendsarr[i].nickname+'" class="sort_list"><div class="friendseveryOne" id="'+friendsarr[i].id+'"><div class="selectOnly1"><img class="under1" src="imgs/selected.png"><img class="under2"  src="imgs/unselected.png"><input  value="'+friendsarr[i].id+'" type="checkbox"></div><img class="friendsimg" src="http://47.95.6.203:8189/zxupl/'+friendsarr[i].avatar+'"><div class="num_name">'+ friendsarr[i].nickname +'</div></div></div>'
				}
				
				$('#messagemaster .sort_box').html(str1);
				
				$('#messagemaster .sort_box .under1').css({display:'none'});
			
				
				
				initials();
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		},//点击发起聊天的选择好友
		sel2action:function(){
			vm.sel1 = false;
			vm.sel2 = true;
			vm.slebossswicth = false;
			
			axios.post(globaldomain+'im/group/find.json').then(function(res){
				var groupsarr = res.data.data;
				//console.log(data);
				mygroups = groupsarr;
				console.log(mygroups);
				
				vm.$store.commit('showgroups');
				
				console.log(vm.$store.state.usergroups);
			}).catch(function(err){
				console.log(err);
			});
			
		},//点击发起聊天的选择群聊
		selectbossornot:function(){
			vm.selectallornot = !vm.selectallornot;
			
			
		},//发起聊天全部选择或取消
		
		creategroupOne:function(){
			axios.post(globaldomain+'im/group/create.json?name=自动生成&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
				
				var code = res.data.code;
				console.log(res.data);
				if ( code==2000 ){
					var groupid = res.data.data;
					console.log(groupid);
					
					var members = templatearr.join(',');
					console.log(templatearr);
					console.log(members);
					axios.post(globaldomain+'im/group/member/join.json?groupId='+groupid+'&memberIds='+members).then(function(res){
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
			console.log(vm);
			//console.log(vm.$children[1]);
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
		
		listoneaddcolor:function($event){
			console.log($event);
			
			console.log(vm.chathistoryarr1);
			
			
			
			
			console.log(vm.chathistoryarr1);
			console.log($event.currentTarget);
			console.log($event.currentTarget.getAttribute('data-index'));
			var idall = $event.currentTarget.getAttribute('id');
			
			console.log(idall);
			
			this.listoneadd = $event.currentTarget.getAttribute('data-index');
			
			
			axios.get(globaldomain+'im/user/detail.json?id='+idall).then(function(res){
				var data = res.data.data;
				console.log(data);
				var id = data.id;
				var name = data.nickname;
				var avatar = data.avatar;
				
				
				//console.log(id);
				//console.log(name);
				//console.log(avatar);
				
				if (data) {
					console.log( '好友详情' );
					
					console.log(vm);
					console.log(vm.$children[2]);
					vm.$children[2].name = name;
					vm.$refs.rightone.defaulthide = true;
					console.log(data);
					
					vm.$refs.rightone.isgroupleader = false;
					vm.$refs.rightone.notgroupleader = true;
					
					vm.$refs.rightone.switchbindid = id;
					
					
					console.log(vm.$refs.rightone.messagearr);
					
					
					
					var getdata = localStorage[ids.id+":"+idall];
					
					console.log(JSON.parse(getdata));
					
					vm.$refs.rightone.messagearr = JSON.parse(getdata);
					
					console.log(vm.$refs.rightone.messagearr);
					
					
					
					
					
					
				}
				
				
				
				
				
			
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			axios.get(globaldomain+'im/group/info.json?id='+idall).then(function(res){
				var data = res.data.data;
				var avatar = data.avatar;
				var name = data.name;
				var id = data.id;
				var genre = data.genre;
				
				
				
				//console.log(data);
				//console.log(avatar);
				//console.log(name);
				//console.log(id);
				if ( data ){
					console.log( '群组详情' );
					//console.log(vm);
					//console.log(vm.$children[2]);
					
					vm.$children[2].name = name;
					
					vm.$refs.rightone.defaulthide = true;
					console.log(data);
					console.log(genre);
					
					if (genre == 30){
						vm.$refs.rightone.isgroupleader = false;
						vm.$refs.rightone.notgroupleader = true;
					} else if ( genre==20 ){
						vm.$refs.rightone.isgroupleader = true;
						vm.$refs.rightone.notgroupleader = false;	   
					} else if ( genre==10 ) {
						vm.$refs.rightone.isgroupleader = true;
						vm.$refs.rightone.notgroupleader = false;
					}
					
					
					console.log(vm.$refs.rightone);
					console.log(vm.$refs.rightone.isgroupleader);
					console.log(vm.$refs.rightone.notgroupleader);
					
					vm.$refs.rightone.switchbindid = id;
					
					
				}
				
				
				
				
				
				
				
				
			}).catch(function(err){
				console.log(err);
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		},//点击主页聊天列表	
	}
});






























