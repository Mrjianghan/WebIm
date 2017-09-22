axios.defaults.withCredentials = true;
var ids;//登陆成功后当前用户的信息
var myfriends;//全局变量我的所有好友
var mygroups;//全局变量我的所有群组


var templatearr=[];//全局数组

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
    onOpened: function ( message ) {          //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green");
    },  
    onClosed: function ( message ) {
		console.log(message);
		console.log("onClosed");
	},         //连接关闭回调
    onOnline: function () {
		console.log('本机网络连接成功');
	},                  //本机网络连接成功
    onOffline: function () {
		console.log('本机网络掉线');
		window.location.href="index.html";
	},                 //本机网络掉线
    onError: function ( message ) {
		console.log(message);
		console.log('失败回调');
		window.location.href="index.html";
	},          //失败回调
    
});










var store = new Vuex.Store({
	state:{
		user:ids,
		userfriends:myfriends,
		usergroups:mygroups,
		showgroupsright:true,
		right3groupid:'',
		right3friendid:'',
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
		setright3groupid:function(state,idnumber){
			return state.right3groupid = idnumber;
		},
		setright3friendid:function(state,idnumber){
			return state.right3friendid = idnumber;
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
		getright3groupid:function(state){
			return state.right3groupid;
		},
		getright3friendid:function(state){
			return state.right3friendid;
		},
	},
	actions:{
		
	},
});



Vue.component('currentuser',{
	template:'#current',
	data:function(){
		return {
			currentImg:this.$store.state.user.avatar ? 'http://47.95.6.203:8189/zxupl/'+this.$store.state.user.avatar :'imgs/default1.png',
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
			picsrc:'http://47.95.6.203:8189/zxupl/',
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
				axios.post('http://47.95.6.203:8183/im/buddy/find.json?key='+keywords).then(function(res){
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
				
				axios.post('http://47.95.6.203:8183/im/group/find.json?name='+keywords).then(function(res){
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
			axios.post('http://47.95.6.203:8183/im/buddy/find.json').then(function(res){
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
			axios.get('http://47.95.6.203:8183/signout.json').then(function(res){
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
		},//改变icon1 颜色
		
		addbluecolor2:function(){
			this.icons1 = false;
			this.icons2 = true;
			this.icons3 = false;
			vm.currentView = 'comlistcomTwo';
			vm.currentView1 = 'rightcomTwo';
			vm.showleft1 = false;
			vm.showleft2 = true;
			//聊天室获取
			
			axios.post('http://47.95.6.203:8183/im/room/area/find.json').then(function(res){
				console.log(res.data.data);//聊天室地区数组
				
			}).catch(function(err){
				console.log(err);
			});
			
			axios.post('http://47.95.6.203:8183/im/room/trade/find.json').then(function(res){
				console.log(res.data.data);//聊天室行业数组
				
			}).catch(function(err){
				console.log(err);
			})
			
			
		},//改变icon2 颜色
		
		addbluecolor3:function(){
			this.icons1 = false;
			this.icons2 = false;
			this.icons3 = true;
			vm.currentView = 'comlistcomThree';
			vm.currentView1 = 'rightcomThree';
			
			var listimer1 = setTimeout(function(){
				initials1();
				clearTimeout('listimer1');
			},90);
			vm.showleft1 = false;
			vm.showleft2 = false;
		},//改变icon3 颜色
		
	}
})


/*var comlistcomOne = {
	template:'#comlistcomOne',
	computed:{
		
	},
};
var comlistcomTwo = {
	template:'#comlistcomTwo',
};
var comlistcomThree = {
	template:'#comlistcomThree',
	data:function(){
		return {
			picsrc:'http://47.95.6.203:8189/zxupl/',
			defaultpic:'imgs/default1.png',
			whiteon:'',
			indexstrange:'',
			indexstrange2:false,
			
		}
	},
	created:function(){
		console.log(this);
		console.log(this.friendsarrOne);
		console.log(this.groupsarrOne);
		//初始化生成好友列表
		var listimer1 = setTimeout(function(){
			initials1();
			clearTimeout('listimer1');
		},90);
		
		
		//console.log(this.indexstrange);
		
	},
	computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
		groupsarrOne:'groupsarrOne',
	}),
	methods:{
		changelistcolor1:function($event){
			this.indexstrange = $event.currentTarget.attributes[0].value;
			console.log(this.indexstrange);
			this.indexstrange2 = true;
			vm.$store.commit('showgroupsinfo',true);
			//console.log($event.currentTarget.id);
			var idnumber =  $event.currentTarget.id;
			vm.$store.commit('setright3groupid',idnumber);
			
			console.log(vm.$children[2].name);
			console.log( vm.$children[2] );
			
		},
		changelistcolor2:function($event){
			//console.log($event.currentTarget);
			this.indexstrange = 'string';
			//console.log($event.currentTarget.attributes[0].value == i);
			this.indexstrange2 = $event.currentTarget.attributes[0].value;
			
			console.log( this.indexstrange2 );
			//console.log( -1 - this.indexstrange2 );
			this.indexstrange2 = -1 - this.indexstrange2;
			
			var idnumber =  $event.currentTarget.id;
			console.log(idnumber);
			vm.$store.commit('showgroupsinfo',false);
			
			vm.$store.commit('setright3friendid',idnumber);
			
			console.log(vm.$children[2].namef);
		},
	},
};*/
var rightcomOne = {
	template:'#rightcomOne',
};
var rightcomTwo = {
	template:'#rightcomTwo',
	data:function(){
		return {
			placeholder2show:true,
			
		}
	}
};
var rightcomThree = {
	template:'#rightcomThree',
	data:function(){
		return {
			name:'群组',
			id:'',
			avatar:'',
			defaultpic:'imgs/default1.png',
			picsrc:'http://47.95.6.203:8189/zxupl/',
			level:30,
			idf:'',
			namef:'人员',
			girl:false,
			gender:'',
			signature:'',
			remark:'',
			areaId:'',
			avatar1:'',
		}
		
	},
	computed:Vuex.mapGetters({
		showgroupsright:'showgroupsinfo',
		getright3friendid:'getright3friendid',
		getright3groupid:'getright3groupid',
		
	}),
	watch:{
		
		getright3groupid:function(){
			//console.log(this);
			//console.log(vm.$children[2]);
			console.log(this.getright3groupid);
			//console.log(this.getright3groupid);
			axios.get('http://47.95.6.203:8183/im/group/info.json?id='+this.getright3groupid).then(function(res){
				console.log(res.data.data);
				console.log(res.data.data.name);
				console.log(res.data.data.id);
				console.log(res.data.data.avatar);
				
				console.log(res.data.data.genre);
				
				vm.$children[1].name = res.data.data.name;
				vm.$children[1].id = res.data.data.id;
				vm.$children[1].avatar = res.data.data.avatar;
				
				console.log( vm.$children[1] );
				
				

			}).catch(function(err){
				console.log(err);
			});
			
		},
		name:function(){
			console.log( vm.$children[1].name );
		},
		
		getright3friendid:function(){
			console.log(this);
			console.log(this.getright3friendid);
			
			axios.get('http://47.95.6.203:8183/im/user/detail.json?id='+this.getright3friendid).then(function(res){
				var data = res.data.data;
				vm.$children[1].idf = res.data.data.id;
				vm.$children[1].namef = res.data.data.nickname;
				vm.$children[1].gender = res.data.data.sex;
				vm.$children[1].signature = res.data.data.signature;
				vm.$children[1].level = res.data.data.genre;
				vm.$children[1].remark = res.data.data.remark;
				vm.$children[1].areaId = res.data.data.areaId;
				vm.$children[1].avatar1 = res.data.data.avatar;
				
				console.log( vm.$children[1].gender );
				if ( vm.$children[1].gender == 0 ){
					vm.$children[1].girl = true; 
				} else if ( vm.$children[1].gender == 1 ) {
					vm.$children[1].girl = false; 
				}
				console.log(data);
				
			}).catch(function(err){
				console.log(err);
			});
		},
		
		
	},
	
	
};
	
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
		currentView:'comlistcomOne',
		currentView1:'rightcomOne',
		
		
		
		
		
		picsrc:'http://47.95.6.203:8189/zxupl/',
		defaultpic:'imgs/default1.png',
		whiteon:'',
		indexstrange:'',
		indexstrange2:false,
		showleft1:true,
		showleft2:false,
		
		
		
		
		
	},
	/*computed:{
		friendsarrOne:function(){
			return vm.$store.getters.userfriends;
		},
		groupsarrOne:function(){
			return vm.$store.getters.usergroups;
		},
	},*/
	components:{
		/*comlistcomOne:comlistcomOne,
		comlistcomTwo:comlistcomTwo,
		comlistcomThree:comlistcomThree,*/
		rightcomOne:rightcomOne,
		rightcomTwo:rightcomTwo,
		rightcomThree:rightcomThree,
	},
	/*data:{
		currentView:'comlist1',
	},*/
	computed:Vuex.mapGetters({
		friendsarrOne:'friendsarrOne',
		groupsarrOne:'groupsarrOne',
	}),
	
	
	
	created:function(){
		var options = { 
		  apiUrl: WebIM.config.apiURL,
		  user: ids.id,//b14660c2713c44b0aa79e86ae73661b2
		  pwd: ids.psw,//momoclo901217
		  appKey: WebIM.config.appkey
		};
		conn.open(options);
		
		axios.post('http://47.95.6.203:8183/im/buddy/find.json').then(function(res){
			 
			
			myfriends = res.data.data;
			console.log(myfriends);
			vm.$store.state.userfriends = myfriends;
			
			//console.log(vm.$store.state.userfriends);
			
			console.log(vm.$store.state.userfriends);
			
		}).catch(function(err){
			console.log(err);
		});//获取所有好友
		
		
		axios.post('http://47.95.6.203:8183/im/group/find.json').then(function(res){
			mygroups = res.data.data;
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
			axios.post('http://47.95.6.203:8183/im/feedback/append.json?content='+vm.feedbacktext+'&name='+ids.nickname+'&contact='+ids.loginName).then(function(res){
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
			
			
			
			
			axios.post('http://47.95.6.203:8183/im/buddy/find.json').then(function(res){
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
			
			axios.post('http://47.95.6.203:8183/im/group/find.json').then(function(res){
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
			axios.post('http://47.95.6.203:8183/im/group/create.json?name=自动生成&descr=自行添加&maxUsers=500&openable=1&joinConfirm=1&inviteConfirm=1&allowInvites=1').then(function(res){
				
				var code = res.data.code;
				console.log(res.data);
				if ( code==2000 ){
					var groupid = res.data.data;
					console.log(groupid);
					
					var members = templatearr.join(',');
					console.log(templatearr);
					console.log(members);
					axios.post('http://47.95.6.203:8183/im/group/member/join.json?groupId='+groupid+'&memberIds='+members).then(function(res){
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
			this.indexstrange = $event.currentTarget.attributes[0].value;
			console.log(this.indexstrange);
			this.indexstrange2 = true;
			vm.$store.commit('showgroupsinfo',true);
			//console.log($event.currentTarget.id);
			var idnumber =  $event.currentTarget.id;
			vm.$store.commit('setright3groupid',idnumber);
			
			console.log(vm.$children[1].name);
			console.log( vm.$children[1] );
			
		},
		changelistcolor2:function($event){
			//console.log($event.currentTarget);
			this.indexstrange = 'string';
			//console.log($event.currentTarget.attributes[0].value == i);
			this.indexstrange2 = $event.currentTarget.attributes[0].value;
			
			console.log( this.indexstrange2 );
			//console.log( -1 - this.indexstrange2 );
			this.indexstrange2 = -1 - this.indexstrange2;
			
			var idnumber =  $event.currentTarget.id;
			console.log(idnumber);
			vm.$store.commit('showgroupsinfo',false);
			
			vm.$store.commit('setright3friendid',idnumber);
			
			console.log(vm.$children[1].namef);
		},
		
	}
});
















/*追加jquery*/


$('#messagemaster ').on('click','.sel1con .sort_box input',function(){
	console.log(this);
	console.log(this.value);
	//console.log($(this).parent());
	//console.log($(this).parent()[0]);
	//console.log($(this).parent()[0].childNodes);
	var img1 = $(this).parent()[0].childNodes[0];
	var img2 = $(this).parent()[0].childNodes[1];
	//console.log(img1);
	//console.log(img2);
	if ( img1.style.display == 'none' ) {
		img1.style.display = 'block';
		img2.style.display = 'none';
		
	}else if( img1.style.display == 'block' ){
		img1.style.display = 'none';
		img2.style.display = 'block';
		
	}
	
	
	var control = $('#messagemaster .sel1con .sort_box input:checked');
	
	if ($('#messagemaster .sel1con .sort_box input:checked').length>0){
		//有被选中的
		vm.btnswitchmaster = true;
		vm.beginchatbtnable = false;
		
		if ( $('#messagemaster .sel1con .sort_box input:checked').length==1 ){
			
			console.log(1+"选中");
			console.log($('#messagemaster .sel1con .sort_box input:checked'));
			
			templatearr= [];
			templatearr.push(this.value);
			
			
			console.log( templatearr );//待处理
			
		}else {
			console.log($('#messagemaster .sel1con .sort_box input:checked'));
			templatearr= [];
			console.log("多个选中");
			
			var length1 = $('#messagemaster .sel1con .sort_box input:checked').length;
			console.log($('#messagemaster .sel1con .sort_box input:checked').length);
			
			for (var i=0;i<length1;i++){
				console.log( $('#messagemaster .sel1con .sort_box input:checked')[i].value );
				templatearr.push( $('#messagemaster .sel1con .sort_box input:checked')[i].value );
			}
			
			console.log(templatearr);
			vm.creategroup2 = templatearr;
			console.log(vm.creategroup2);
			
		}
		
		
		
		
		
	}else {
		vm.btnswitchmaster = false;
		vm.beginchatbtnable = true;
	}
})













