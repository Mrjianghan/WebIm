function pop1 (){
    $('.alertinfo').html('手机格式不正确，请重新输入');
    $('.popout').css({display:'block'});
    $('.popout').animate({display:'block'},1000,function(){
        $('.popout').css({display:'none'})});
};
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

