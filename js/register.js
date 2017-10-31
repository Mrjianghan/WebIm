axios.defaults.withCredentials = true;
var globaldomain = 'http://api.zhongxiangim.com/';
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
		var what = Math.random();
		axios.get(globaldomain+'token.json').then(function(res){
			vm.validatecode = globaldomain+'/captcha/build?'+Math.random();
		}).catch(function(err){
			console.log(err);
		});
	},
	methods:{
		nextpic:function(){
			vm.validatecode = '';
			vm.validatecode = globaldomain+'/captcha/build?'+Math.random();
		},
		sendphonevalidate:function(){
			axios.post(globaldomain+'im/sms/captcha/reg.json?mobile='+vm.firstinputval+'&captcha='+vm.secondinputval).then(function(res){
				var code = res.data.code;
				switch (code){
					case 2000 :
						vm.errormessage = '发送成功';
						vm.errorshow = true;
						return false;
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
						vm.errormessage = 'mobile不是合法的手机号';
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
		useragreeinfo:function(){
			vm.rightorwrong5 = !vm.rightorwrong5;
			if ( vm.rightorwrong5 == false ){
				if ( ( vm.firstinputval != '' )&&( vm.secondinputval != '' )&&( vm.thirdinputval != '' ) ){
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
				}
			}else {
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
			}
		},
		checkphone:function(){
			var input1 = vm.firstinputval;
			if ( !(/^1[0-9]{10}$/.test( input1 )) ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.ableornot1 = true;
				vm.btncolorswitch = false;
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
				return false;
			} else {
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
			}
		},
		clearinput1:function(){
			vm.firstinputval = '';
		},
		checkvalidate:function(){
			axios.get(globaldomain+'captcha/validate.json?captcha='+vm.secondinputval).then(function(res){
				var data1 = res.data.data;
				if ( (data1)&&(vm.rightorwrong1)   ) {
					vm.ableornot1 = false;
					vm.btncolorswitch = true;
				} else {
					vm.ableornot1 = true;
					vm.btncolorswitch = false;
				}
			}).catch(function(err){
				console.log(err);
			});
		},
		nextstepfinal:function(){
			axios.get(globaldomain+'im/sms/captcha/validate.json?mobile='+vm.firstinputval+'&captcha='+vm.thirdinputval).then(function(res){
				var code = res.data.code;
				switch( code ){
					case 2000 :
						var jsonobj = {
							'loginName':vm.firstinputval,
							'captcha':vm.secondinputval,
							'smscode':vm.thirdinputval,
						};
						var storage = JSON.stringify(jsonobj);
						localStorage['huanxinreg'] = storage;
						window.location.href="register_1.html";
						break;
					case 4000 :
						vm.errormessage = '短信验证码错误';
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
				console.log(err);
			})
		},
		checksms:function(){
			if ( vm.thirdinputval.length==6 ){
				vm.rightorwrong3 = true;
				vm.rightorwrong4 = false;
			}else {
				vm.rightorwrong3 = false;
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
				vm.rightorwrong3 = false;
				vm.rightorwrong4 = true;
			}
		},
	}
});


