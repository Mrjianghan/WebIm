axios.defaults.withCredentials = true;
var globallocal;
var vm = new Vue({
	el:'#subBody',
	data:{
		rightorwrong1:false,
		rightorwrong2:false,
		firstinputval:'',
		secondinputval:'0',
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
		console.log(localStorage['huanxinreg']);
		
		if ( localStorage['huanxinreg'] ){
			
			globallocal = JSON.parse( localStorage['huanxinreg'] );
		
			console.log(globallocal);
			
		}
		
	},
	methods:{
		
		nextstepfinal:function(){
			console.log(globallocal);
			globallocal.nickname = vm.firstinputval;
			globallocal.sex = vm.secondinputval;
			console.log(globallocal);
			localStorage['huanxinreg'] = JSON.stringify( globallocal );
			console.log( localStorage['huanxinreg'] );
			window.location.href = "register_2.html";
		},
		//点击下一步
		checknick:function(){
			var reg1 = /^([\u4e00-\u9fa5a-zA-Z]{1})([a-zA-Z\u4e00-\u9fa50-9]{3,19})$/igm;
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
		//检查昵称
		clearinput1:function(){
			vm.firstinputval = '';
		},
		//清理昵称
		select:function(){
			var flag = vm.secondinputval;
			var reg1 = /^([\u4e00-\u9fa5a-zA-Z]{1})([a-zA-Z\u4e00-\u9fa50-9]{3,19})$/igm;
			var t1 = vm.firstinputval.match(reg1);
			
			if ( ( flag != 0 )&&( t1 != null ) ){
				console.log('hi');
				vm.btncolorswitch2 = true;
				vm.ableornot2 = false;
			} else {
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
			}
		},
		//性别选择
		
		
		
		
		
		
		
	}
		
});



