axios.defaults.withCredentials = true;
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
			axios.post('http://47.95.6.203:8183/im/sms/captcha/reg.json?mobile='+vm.firstinputval+'&captcha='+vm.secondinputval).then(function(res){
				console.log(res);
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
		//发送手机验证码
		useragreeinfo(){
			vm.rightorwrong5 = !vm.rightorwrong5;
			if ( vm.rightorwrong5 == false ){
				if ( ( vm.firstinputval != '' )&&( vm.secondinputval != '' )&&( vm.thirdinputval != '' ) ){
					console.log('hi');
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
			if ( (vm.firstinputval != '')&&(vm.secondinputval != '') ) {
				vm.ableornot1 = false;
				vm.btncolorswitch = true;
			}else {
				vm.ableornot1 = true;
				vm.btncolorswitch = false;
			}
		},
		//启用发送手机短信
		nextstepfinal:function(){
			axios.post('http://47.95.6.203:8183/im/sms/captcha/validate.json?mobile='+vm.firstinputval+'&captcha='+vm.secondinputval).then(function(res){
				console.log(res);
				//window.location.href="http://www.baidu.com";
			}).catch(function(err){
				console.log(err);
			})
			
			
			
		},
		//点击下一步
		checksms:function(){
			//console.log( vm.thirdinputval.length );
			
			/*if ( vm.thirdinputval.length==6 ){
				vm.rightorwrong3 = true;
			}else {
				vm.rightorwrong3 = false;
			}*/
		},
		//检查短信
		
		
		
		
		
		
		
		
	}
		
});



