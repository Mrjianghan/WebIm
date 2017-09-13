var currentid;//当前用户登录密码
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

conn.listen({
    onOpened: function ( message ) {          //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green");
		window.location.href = "message.html";
		console.log(currentid);
		var hide = JSON.stringify( currentid );
		localStorage["dispear"] = hide;
		console.log( localStorage["dispear"] );
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


axios.defaults.withCredentials = true;
var vm = new Vue({
	el:'#subBody',
	data:{
		switchheader:true,
		rightorwrong1:false,
		rightorwrong2:false,
		rightorwrong3:false,
		rightorwrong4:false,
		firstinputval:'',
		secondinputval:'',
		ableornot1:true,
		btncolorswitch2:false,
		ableornot2:true,
		headswitch1:true,
		headswitch2:false,
		errorshow:false,
		errormessage:'',
	},
	created:function(){
		axios.get('http://47.95.6.203:8183/token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		//获取token
	},
	methods:{
		
		nextstepfinal:function(){
			axios.post('http://47.95.6.203:8183/signin.json?username='+vm.firstinputval+'&password='+vm.secondinputval).then(function(res){
				console.log(res);
				var code = res.data.code;
				switch (code){
					case 2000 :
						console.log(2000);
						axios.get('http://47.95.6.203:8183/im/user/info.json').then(function(res){
							console.log(res.data.data);
							var data = res.data.data;
							currentid = data.id;//考虑全局变量
							var currentloginName = data.loginName;//考虑全局变量
							var currentnickname = data.nickname;//考虑全局变量
							var currentgender = data.sex;//考虑全局变量
							//console.log( currentid );
							var options = { 
							  apiUrl: WebIM.config.apiURL,
							  user: currentid,
							  pwd: currentid,
							  appKey: WebIM.config.appkey
							};
							conn.open(options);
							
						}).catch(function(err){
							console.log(err);
						})
						
						
						break;
					case 4000 :
						vm.errorshow = true,
						vm.errormessage = '无效的用户名或密码';
						return false;
						break;
					case 4004 :
						vm.errorshow = true,
						vm.errormessage = '账户已锁定，请执行找回登录密码后解除锁定';
						return false;
						break;
				}
				
				
				
			}).catch(function(err){
				console.log(err);
			})
			
		},
		//点击下一步
		checkphone:function(){
			var input1 = vm.firstinputval;
			if ( !(/^1[0-9]{10}$/.test( input1 )) ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				
				if ( (vm.secondinputval != '')&&( vm.rightorwrong1 ) ) {
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
				}else {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
				}
				
				return false;
				
				
				
			} else {
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
				
				if ( (vm.secondinputval != '')&&( vm.rightorwrong1 == true ) ) {
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
				}else {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
				}
				
			}
		},
		//检查手机号码正确与否
		checkpsw2:function(){
			
			if ( (vm.secondinputval != '')&&( vm.rightorwrong1 == true ) ) {
				vm.btncolorswitch2 = true;
				vm.ableornot2 = false;
			}else {
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
			}
			
		},
		//检查密码
		clearinput1:function(){
			vm.firstinputval = '';
		},
		clearinput2:function(){
			vm.secondinputval = '';
		},
		switch6:function(){
			vm.switchheader = true;
			vm.headswitch1 = true;
			vm.headswitch2 = false;
		},
		//标题切换1
		switch8:function(){
			vm.switchheader = false;
			vm.headswitch2 = true;
			vm.headswitch1 = false;
		},
		//标题切换2
		
	}
		
});

