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
			/*axios.post('http://47.95.6.203:8183/im/user/register.json?loginName='+18203817038+'&captcha='+3214+'&smscode='+234561+'&nickname='+32131+'&sex='+1+'&passwd='vm.firstinputval'&repasswd='+vm.secondinputval).then(function(res){
				console.log(res);
				//window.location.href="http://www.baidu.com";
			}).catch(function(err){
				console.log(err);
			})
			console.log('click');
			//window.location.href="";*/
		},
		//点击下一步
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
		checkpsw2:function(){
			if (vm.secondinputval != ''){
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
		switch8:function(){
			vm.switchheader = false;
			vm.headswitch2 = true;
			vm.headswitch1 = false;
		}
		
		
		
		
		
		
		
		
		
	}
		
});



