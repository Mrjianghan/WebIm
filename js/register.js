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
			
			
		},
		//发送手机验证码
		useragreeinfo(){
			vm.rightorwrong5 = !vm.rightorwrong5;
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
		
	}
});











var checkphone = function checkphone (){
    var pnumber = $('input[name="phonenumber"]').val();
    if( !(/^1[0-9]{10}$/.test(pnumber)) ){
        pop1();
        return false;
    }else {
        var num = 60;
        var str = '';
        $('.getphone').prop('disabled',true);
        var timer = setInterval(function(){
            num = num - 1;
            console.log(num);
            str = num +'s';
            $('.getphone').html(str);
            if (num <= 0){
                $('.getphone').html('发送验证');
                clearInterval(timer);
                $('.getphone').prop('disabled',false);
            }
        },1000);
    }
};

var checkphone1 = function checkphone (){
    var pnumber = $('input[name="phonenumber"]').val();
    if( !(/^1[0-9]{10}$/.test(pnumber)) ){
        pop1();
        return false;
    }else {
        $('.reg1container a').attr('href','register_1.html');
    }
};

function able1(){
    var pass = $('input[name="passnumber"]').val();
    var pnumber = $('input[name="phonenumber"]').val();
    var phonenumber = $('.phonecode').val();
    var phonenumber1 = phonenumber !== '';
    var pnumber1 = pnumber !== '';
    var pass1 = pass !== '';
        
    if (  phonenumber1 && pnumber1 && pass1 ){
        $('.reg1container a').prop('disabled',false);
        $('.reg1container a').css({'backgroundColor':'#278605'});
        $('.reg1container a').css({'cursor':'pointer'});
    }
};
    
    $('input').on('change',function(){
        able1();
    });

function able2(){
        
    var pnumber = $('input[name="phonenumber"]').val();
    var pass = $('input[name="passnumber"]').val();
    var pnumber1 = pnumber !== '';
    var pass1 = pass !== '';
        
    if ( pnumber1 && pass1 ){
        $('.getphone').prop('disabled',false); $('.getphone').css({'backgroundColor':'#278605'});
        $('.getphone').css({'cursor':'pointer'});
    }
};
    
$('input').on('change',function(){
    able2();
});
$('.getphone').on('click',function(){
    checkphone();
});
$('.reg1container a').on('click',function(){
    checkphone1();
})

