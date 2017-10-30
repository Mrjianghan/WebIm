var ids;
var globaldomain = 'http://api.zhongxiangim.com/';
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
axios.defaults.withCredentials = true;
var globallocal;
var vm = new Vue({
	el:'#subBody',
	data:{
		rightorwrong1:false,
		rightorwrong2:false,
		rightorwrong3:false,
		rightorwrong4:false,
		firstinputval:'',
		secondinputval:'',
		errshow:false,
		errmsg:'',
		ableornot1:true,
		btncolorswitch2:false,
		ableornot2:true,
	},
	created:function(){
		axios.get(globaldomain+'token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		//获取token
		if ( localStorage['huanxinreg'] ){
			globallocal = JSON.parse( localStorage['huanxinreg'] );
			console.log(globallocal);
		}
	},
	methods:{
		nextstepfinal:function(){
			axios.post(globaldomain+'im/user/register.json?loginName='+globallocal.loginName+'&captcha='+globallocal.captcha+'&smscode='+globallocal.smscode+'&nickname='+globallocal.nickname+'&sex='+globallocal.sex+'&passwd='+vm.firstinputval+'&repasswd='+vm.secondinputval).then(function(res){
				console.log(res.data.code);
				var code = res.data.code;
				switch(code){
					case 2000 :
						vm.errshow = true;
						vm.errmsg = '信息保存成功';
						axios.post(globaldomain+'signin.json?username='+globallocal.loginName+'&password='+vm.firstinputval).then(function(res1){
							var code = res1.data.code;
							console.log(res1.data);
							switch (code){
								case 2000 :
									vm.errshow = true;
									vm.errmsg = '登录成功';
									
									axios.get(globaldomain+'im/user/info.json').then(function(res3){
										console.log(res3.data);
										var code = res3.data.code;
										var data = res3.data.data;
										switch(code){
											case 2000:
												data.psw = vm.firstinputval; 
												var usermaster = JSON.stringify(data);
												localStorage["currentuser"] = usermaster;
												window.location.href="message.html";
												break;
											case 4000:
												return false;
												break;
										}
										
										
										
							
									}).catch(function(err3){
										console.log(err3);
									});
									
									
									return false;
									break;
								case 4000 :
									vm.errshow = true;
									vm.errmsg = '无效的用户名或密码';
									return false;
									break;
								case 4004 :
									vm.errshow = true;
									vm.errmsg = '账户已锁定，请执行找回登录密码后解除锁定';
									return false;
									break;	
							}
							
						}).catch(function( err1 ){
							console.log(err1);
						});
						break;
					case 4000 :
						vm.errshow = true;
						vm.errmsg = '用户已存在、用户名或密码为空、用户名不合法';
						return false;
						break;
					case 4008 :
						vm.errshow = true;
						vm.errmsg = '输入密码不一致';
						return false;
						break;
					case 4009 :
						vm.errshow = true;
						vm.errmsg = '账号（手机号）不是合法的手机号';
						return false;
						break;
					case 4010 :
						vm.errshow = true;
						vm.errmsg = '该登录名已存在';
						return false;
						break;
					case 4011 :
						vm.errshow = true;
						vm.errmsg = '该用户不存在或已删除';
						return false;
						break;
					case 4014 :
						vm.errshow = true;
						vm.errmsg = '图片验证码错误';
						return false;
						break;
					case 4015 :
						vm.errshow = true;
						vm.errmsg = '短信验证码错误';
						return false;
						break;
				}
				
			}).catch(function(errs){
				console.log(errs);
			})
			
			//errshow:false,
			//errmsg:'',
			
		},
		//点击下一步
		checkpsw1:function(){
			var reg1 = /^([a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]·]{6,20})$/img;
			var t1 = vm.firstinputval.match(reg1);
			
			if ( t1 == null ){
				//密码非法状态
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.btncolorswitch2 = false;//不启用
				vm.ableornot2 = true;//不启用
				
				
			} else {
				//密码合法状态
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
				
				if ( vm.firstinputval == vm.secondinputval ) {
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
					vm.rightorwrong3 = true;
					vm.rightorwrong4 = false;
					//vm.rightorwrong1 = false;
					//vm.rightorwrong2 = false;
					
				}else {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
					vm.rightorwrong3 = false;
					vm.rightorwrong4 = true;
					//vm.rightorwrong1 = false;
					//vm.rightorwrong2 = true;
				}
			}
			
		},
		//检查密码
		checkpsw2:function(){
			if ( vm.firstinputval == vm.secondinputval ){
				
				vm.rightorwrong4 = false;
				vm.rightorwrong3 = true;
				vm.btncolorswitch2 = true;//启用
				vm.ableornot2 = false;//启用
				
			}else {
				vm.rightorwrong3 = false;
				vm.rightorwrong4 = true;
				vm.btncolorswitch2 = false;//不启用
				vm.ableornot2 = true;//不启用
				
			}
			
		},
		//检查密码
		clearinput1:function(){
			vm.firstinputval = '';
		},
		clearinput2:function(){
			vm.secondinputval = '';
		},
		
	}
		
});



