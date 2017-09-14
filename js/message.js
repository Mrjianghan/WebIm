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

/*var nothing = localStorage.dispear;
ids = JSON.parse( nothing );//登陆必备*/



conn.listen({
    onOpened: function ( message ) {          //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green");
    },  
    onClosed: function ( message ) {
		
	},         //连接关闭回调
    onOnline: function () {
		
	},                  //本机网络连接成功
    onOffline: function () {
		
	},                 //本机网络掉线
    onError: function ( message ) {
		
	},          //失败回调
    
});














Vue.component('currentuser',{
	template:'#current',
	data:function(){
		return {
			currentImg:'imgs/girl.jpg',
			searchshow:false,
		}
	},
	methods:{
		popcurrent:function(){
			
		},//显示当前用户卡片
		mainsearch:function() {
			this.searchshow = true;
			console.log( this.searchshow );
		},//主搜索
	}
})




var vm = new Vue({
	el:"#messagemaster",
	data:{
		
		
	},
	created:function(){
		var options = { 
		  apiUrl: WebIM.config.apiURL,
		  user: 'momoclo',//
		  pwd: '901217',//
		  appKey: WebIM.config.appkey
		};
		conn.open(options);
	},
	methods:{
		clearsearch:function(){
			//vm.searchshow = true;
			console.log('hi');
			console.log(this.$children[0]);
			this.$children[0]._data.searchshow = false;
		},
		
	}
});