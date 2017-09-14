axios.defaults.withCredentials = true;
var findpsw;
var vm = new Vue({
	el:'#subBody',
	data:{
		errormessage:'该手机号',
		errorshow:false,
		rightorwrong1:false,
		rightorwrong2:false,
		rightorwrong3:false,
		rightorwrong4:false,
		rightorwrong5:true,
		firstinputval:'',
		validatecode:'',
		secondinputval:'',
		ableornot1:true,
		btncolorswitch:false,
		btntext:'发送验证码',
		countshow:false,
		countnumber:60,
		thirdinputval:'',
		btncolorswitch2:false,
		ableornot2:true,
	},
	created:function(){
		axios.get('http://47.95.6.203:8183/token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		//获取token
		axios.get('http://47.95.6.203:8183//captcha/build').then(function(res){
			vm.validatecode = 'http://47.95.6.203:8183//captcha/build';
		}).catch(function(err){
			console.log(err);
		});
		//获取验证码
	},
	methods:{
		nextpic:function(){
			axios.get('http://47.95.6.203:8183//captcha/build').then(function(res){
				vm.validatecode = '';
				var timer1 = setTimeout(function(){
					vm.validatecode = 'http://47.95.6.203:8183//captcha/build';
				},10);
				vm.secondinputval = '';
			}).catch(function(err){
				console.log(err);
			})
		},
		//切换验证码
		sendphonevalidate:function(){
			
			axios.post('http://47.95.6.203:8183/im/sms/captcha/repwd.json?mobile='+vm.firstinputval+'&captcha='+vm.secondinputval).then(function(res){
				var code = res.data.code;
				console.log(code);
				switch ( code ){
					case 2000 :
						vm.errormessage = '发送成功';
						vm.errorshow = true;
						
						break;
					case 4000 :
						vm.errormessage = '发送失败';
						vm.errorshow = true;
						return false;
						break;
					case 4001 :
						vm.errormessage = '1分钟内只能发送1条短信';
						vm.errorshow = true;
						return false;
						break;
					case 4002 :
						vm.errormessage = '1小时内只能发送3条短信';
						vm.errorshow = true;
						return false;
						break;
					case 4003 :
						vm.errormessage = '1天内只能发送6条短信';
						vm.errorshow = true;
						return false;
						break;
					case 4005 :
						vm.errormessage = '不是合法的手机号';
						vm.errorshow = true;
						return false;
						break;
					case 4007 :
						vm.errormessage = '图片验证码错误';
						vm.errorshow = true;
						return false;
						break;
				}
				
			}).catch(function(err){
				console.log(err);
			});
			vm.ableornot1 = true;
			vm.btncolorswitch = false;
			vm.btntext = '重新发送';
			vm.countshow = true;
			var timer2 = window.setInterval(function(){
				vm.countnumber = vm.countnumber - 1;
				if ( vm.countnumber <= 0 ) {
					vm.ableornot1 = false;
					vm.btncolorswitch = true;
					vm.countnumber = 60;
					vm.countshow = false;
					vm.btntext = '重新发送';
					window.clearInterval(timer2);
				}
			},1000);
			
		},
		//发送重置密码手机验证码
		useragreeinfo(){
			vm.rightorwrong5 = !vm.rightorwrong5;
			if ( vm.rightorwrong5 == false ){
				if ( ( vm.rightorwrong1 )&&( vm.secondinputval != '' )&&( vm.thirdinputval.length == 6  ) ){
					
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
				}
			}else {
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
			}
		},
		//协议切换
		checkphone:function(){
			var input1 = vm.firstinputval;
			if ( !(/^1[0-9]{10}$/.test( input1 )) ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.ableornot1 = true;//禁用
				vm.btncolorswitch = false;//禁用
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
				return false;
			} else {
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
			}
		},
		//检查手机号码正确与否
		clearinput1:function(){
			vm.firstinputval = '';
		},
		//清空手机号
		checkvalidate:function(){
			axios.get('http://47.95.6.203:8183/captcha/validate.json?captcha='+vm.secondinputval).then(function(res){
				var data1 = res.data.data;
				if ( (data1)&&(vm.rightorwrong1)   ) {
					console.log('验证');
					console.log(data1);
					vm.ableornot1 = false;
					vm.btncolorswitch = true;
				} else {
					vm.ableornot1 = true;
					vm.btncolorswitch = false;
					console.log('错误');
				}
				
			}).catch(function(err){
				console.log(err);
			});
			
			
		},
		//启用发送手机短信
		nextstepfinal:function(){
			//检查验证码
			axios.get('http://47.95.6.203:8183/im/sms/captcha/validate.json?mobile='+vm.firstinputval+'&captcha='+vm.thirdinputval).then(function(res){
				console.log( res.data );
				var code = res.data.data;
				console.log(code);
				switch( code ){
					case 2000 :
						vm.errormessage = '验证成功';
						vm.errorshow = true;
						//window.location.href = "forgetpwd_1.html";
						
						
						break;
					case 4000 :
						vm.errormessage = '验证失败';
						vm.errorshow = true;
						return false;
						break;
					case 4005 :
						vm.errormessage = '不是合法的手机号';
						vm.errorshow = true;
						return false;
						break;
				}
			}).catch(function(err){
				console.log()
			});
				
			
		},
		//点击下一步
		
		
		
		
		
		/**/
		
		
		
	},//methods	
});



