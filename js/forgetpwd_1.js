axios.defaults.withCredentials = true;
if ( localStorage['forgetpsw'] ){
	var getvalue = JSON.parse( localStorage['forgetpsw'] );
	console.log(getvalue);
	
} else {
	
}
var vm = new Vue({
	el:'#subBody',
	data:{
		rightorwrong1:false,
		rightorwrong2:false,
		rightorwrong3:false,
		rightorwrong4:false,
		firstinputval:'',
		secondinputval:'',
		ableornot1:true,
		btncolorswitch2:false,
		ableornot2:true,
		errshow:false,
		errmsg:'',
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
			var loginName = getvalue.loginName;
			var captcha = getvalue.captcha;
			var smscode = getvalue.smscode;
					
			axios.post('http://47.95.6.203:8183/im/user/reset/passwd.json?loginName='+loginName+'&captcha='+captcha+'&smscode='+smscode+'&passwd='+vm.firstinputval+'&repasswd='+vm.secondinputval).then(function(res){
				var code = res.data.code;		
				console.log(code);
				switch(code) {
					case 2000:
						vm.errshow = true;
						vm.errmsg = '修改成功';
						
						
						
						axios.post('http://47.95.6.203:8183/signin.json?username='+loginName+'&password='+vm.firstinputval).then(function(res1){
							var code = res1.data.code;
							console.log(res1.data);
							switch (code){
								case 2000 :
									vm.errshow = true;
									vm.errmsg = '登录成功';
									
									axios.get('http://47.95.6.203:8183/im/user/info.json').then(function(res3){
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
						
						
						
						
					case 4000:
						vm.errshow = true;
						vm.errmsg = '用户不存在';
						return false;
						break;
					case 4001:
						vm.errshow = true;
						vm.errmsg = '登录名不允许为空';
						return false;
						break;
					case 4002:
						vm.errshow = true;
						vm.errmsg = '图片验证码不允许为空';
						return false;
						break;
					case 4003:
						vm.errshow = true;
						vm.errmsg = '短信验证码不允许为空';
						return false;
						break;
					case 4006:
						vm.errshow = true;
						vm.errmsg = '密码不一致';
						return false;
						break;
					case 4007:
						vm.errshow = true;
						vm.errmsg = '图片验证码错误';
						return false;
						break;
					case 4008:
						vm.errshow = true;
						vm.errmsg = '登录名不是合法手机号';
						return false;
						break;
					case 4009:
						vm.errshow = true;
						vm.errmsg = '短信验证码错误';
						return false;
						break;
					case 4010:
						vm.errshow = true;
						vm.errmsg = '重置环信用户密码失败';
						return false;
						break;
						
				}
						
						
						
			}).catch(function(err){
				console.log(err);
			})
		},
		//点击下一步
		checkpsw1:function(){
			var reg1 = /^([a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]·]{6,20})$/img;
			var t1 = vm.firstinputval.match(reg1);
			console.log(t1);
			if ( t1 == null ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.btncolorswitch2 = false;//禁用
				vm.ableornot2 = true;//禁用
				return false;
			} else {
				//如果匹配到正确格式密码的时候
				if ( vm.firstinputval == vm.secondinputval ){
					//相等
					vm.btncolorswitch2 = true;//
					vm.ableornot2 = false;//
					vm.rightorwrong2 = false;
					vm.rightorwrong1 = true;
					
					
					
					
				}else {
					//不等
					vm.btncolorswitch2 = false;//禁用
					vm.ableornot2 = true;//禁用
					vm.rightorwrong2 = true;
					vm.rightorwrong1 = false;
				}
				
			}
			
		},
		//检查密码
		checkpsw2:function(){
			if ( vm.firstinputval == vm.secondinputval ){
				console.log( vm.secondinputval );
				if ( vm.secondinputval == '' ){
					vm.btncolorswitch2 = false;//禁用
					vm.ableornot2 = true;//禁用
				} else {
					
					vm.btncolorswitch2 = true;//
					vm.ableornot2 = false;//
					vm.rightorwrong4 = false;
					vm.rightorwrong3 = true;
				}
				
				
				
				
			}else {
				vm.rightorwrong3 = false;
				vm.rightorwrong4 = true;
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
				return false;
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



