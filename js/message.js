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
			currentImg:this.$store.state.user.avatar ? this.$store.state.user.avatar :'imgs/default.png',
			searchshow:false,
			showslidebars:false,
			mainsearchval:'',
			username:this.$store.state.user.nickname,
			
		}
	},
	methods:{
		popcurrent:function(){
			
		},//显示当前用户卡片
		mainsearch:function() {
			this.searchshow = true;
			console.log( this.searchshow );
		},//主搜索
		startchat:function(){
			
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
		},//弹出汉堡菜单
	}
})




var vm = new Vue({
	el:"#messagemaster",
	store,
	data:{
		feedbacktext:'用户体验很好!',
		feedbackshow:false,
		readychatshow:true,
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
			console.log('hi');
			console.log(this.$children[0]);
			this.$children[0]._data.searchshow = false;
		},//关闭搜索框
		exitfeedback:function(){
			this.feedbackshow = false;
		},//关闭反馈框
		sendfeedback:function(){
			
		},//发送反馈
		exitreadychat:function(){
			
		},//发起聊天窗口
		
	}
});