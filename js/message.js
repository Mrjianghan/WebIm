axios.defaults.withCredentials = true;
var ids;
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










const store = new Vuex.Store({
	state:{
		user:ids,
		
	},
	mutations:{
		
	},
});



Vue.component('currentuser',{
	template:'#current',
	data:function(){
		return {
			currentImg:this.$store.state.user.avatar ? 'http://47.95.6.203:8189/zxupl/'+this.$store.state.user.avatar :'imgs/default.png',
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
		}
	},
	created:function(){
		console.log(this.$store.state.user);
		console.log(this.$store.state.user.signature);
		
	},
	methods:{
		popcurrent:function($event){
			this.currentusershow = true;
			this.showslidebars = false;
			this.top1 = $event.y+"px";
			this.left1 = $event.x -300 +"px";
		},//显示当前用户卡片
		mainsearch:function() {
			this.searchshow = true;
			console.log( this.searchshow );
		},//主搜索
		startchat:function(){
			this.$parent.readychatshow = true;
		},//发起聊天
		feedbackpop:function(){
			console.log(this);
			var thiscom = this.$parent;
			console.log(thiscom);
			thiscom.feedbackshow = true;
		},//发起反馈
		exit:function(){
			conn.close();
			//http://47.95.6.203:8183/signout.json
			axios.get('http://47.95.6.203:8183/signout.json').then((res)=>{
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
	}
})




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
		
		
	},
	created:function(){
		var options = { 
		  apiUrl: WebIM.config.apiURL,
		  user: ids.id,//b14660c2713c44b0aa79e86ae73661b2
		  pwd: ids.psw,//momoclo901217
		  appKey: WebIM.config.appkey
		};
		conn.open(options);
	},
	methods:{
		clearsearch:function(){
			this.$children[0]._data.searchshow = false;
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
		},//点击发起聊天的选择好友
		sel2action:function(){
			vm.sel1 = false;
			vm.sel2 = true;
			vm.slebossswicth = false;
		},//点击发起聊天的选择群聊
		selectbossornot:function(){
			vm.selectallornot = !vm.selectallornot;
			
		},//发起聊天全部选择或取消
		
	}
});