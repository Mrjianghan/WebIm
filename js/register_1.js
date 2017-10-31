axios.defaults.withCredentials = true;
var globaldomain = 'http://api.zhongxiangim.com/';
var globallocal;
var vm = new Vue({
	el:'#subBody',
	data:{
		rightorwrong1:false,
		rightorwrong2:false,
		firstinputval:'',
		secondinputval:3,
		ableornot1:true,
		btncolorswitch2:false,
		ableornot2:true,
	},
	created:function(){
		axios.get(globaldomain+'token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		if ( localStorage['huanxinreg'] ){
			globallocal = JSON.parse( localStorage['huanxinreg'] );
		}
	},
	methods:{
		nextstepfinal:function(){
			globallocal.nickname = vm.firstinputval;
			globallocal.sex = vm.secondinputval;
			localStorage['huanxinreg'] = JSON.stringify( globallocal );
			window.location.href = "register_2.html";
		},
		checknick:function(){
			var reg1 = /^([\u4e00-\u9fa5a-zA-Z]{1})([a-zA-Z\u4e00-\u9fa50-9]{3,19})$/igm;
			var t1 = vm.firstinputval.match(reg1);
			var flag = vm.secondinputval;
			if ( t1 == null ){
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
				return false;
			} else {
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
				if ( ( flag != 3 )&&( t1 != null ) ){
					vm.btncolorswitch2 = true;
					vm.ableornot2 = false;
				} else {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
				}
			}
		},
		clearinput1:function(){
			vm.firstinputval = '';
		},
		select:function(){
			var flag = vm.secondinputval;
			var reg1 = /^([\u4e00-\u9fa5a-zA-Z]{1})([a-zA-Z\u4e00-\u9fa50-9]{3,19})$/igm;
			var t1 = vm.firstinputval.match(reg1);
			if ( ( flag != 3 )&&( t1 != null ) ){
				vm.btncolorswitch2 = true;
				vm.ableornot2 = false;
			} else {
				vm.btncolorswitch2 = false;
				vm.ableornot2 = true;
			}
		},
	}
});