axios.defaults.withCredentials = true;
var currentid;//当前用户登录密码
var timerlonger;//全局计时器
var globaldomain = 'http://api.zhongxiangim.com/';

/*var conn = new WebIM.connection({
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
    
});*/




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
		get2dimention:'',
	},
	created:function(){
		axios.get(globaldomain+'token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		//获取token
	},
	methods:{
		
		nextstepfinal:function(){
			
			axios.post(globaldomain+'signin.json?username='+vm.firstinputval+'&password='+vm.secondinputval).then(function(res){
				console.log(res);
				var code = res.data.code;
				switch (code){
					case 2000 :
						console.log(2000);
						axios.get(globaldomain+'im/user/info.json').then(function(res){
							
							var code = res.data.code;
							var data = res.data.data;
							console.log(code);
							console.log(data);
							currentid = data.id;//考虑全局变量
								switch(code){
									case 2000:
										data.psw = vm.secondinputval; 
										var usermaster = JSON.stringify(data);
										localStorage["currentuser"] = usermaster;
										window.location.href="message.html";
										break;
									case 4000:
										return false;
										break;
								}
							
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
			clearInterval(timerlonger);
		},
		//标题切换1清理扫码计时器
		switch8:function(){
			vm.switchheader = false;
			vm.headswitch2 = true;
			vm.headswitch1 = false;
			var id2d;
			axios.get(globaldomain+'qrcode.json').then(function(res){
					var code = res.data.code;
					var data = res.data.data;
					var path = res.data.data.path;
					
					vm.get2dimention = globaldomain+'zxupl'+path;
					var idbridge = res.data.data.id;
					var trans = JSON.parse(idbridge);
					
					id2d = trans.id;
					console.log(trans);
					console.log(id2d);
				
			}).catch(function(err){
				console.log(err);
			});
				
			timerlonger = window.setInterval(function(){
				console.log(timerlonger);
				axios.post(globaldomain+'login.json?qrcode='+id2d).then(function(res){
					console.log(res.data);
					var code = res.data.code;
					switch (code){
						case 2000 :
							
							//window.location.href = "message.html";
							break;
						case 4000 :
							return false;
							break;
					}
				}).catch(function(err){
					console.log(err);
				});
					
					
				
			},2000);
			
		},
		//标题切换2加上扫码计时器
		
	}
		
});

