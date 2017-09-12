axios.defaults.withCredentials = true;
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
		checkpsw1:function(){
			var reg1 = /^([a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]·]{6,20})$/img;
			var t1 = vm.firstinputval.match(reg1);
			console.log(t1);
			if ( t1 == null ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				return false;
			} else {
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
			}
			
		},
		//检查密码
		checkpsw2:function(){
			if ( vm.firstinputval == vm.secondinputval ){
				vm.rightorwrong4 = false;
				vm.rightorwrong3 = true;
				vm.btncolorswitch2 = true;
				vm.ableornot2 = false;
				
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



