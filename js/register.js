$(function(){
    
    
    $('.switch a').on('click',function(event){
        event.preventDefault();
        var that = this;
        //console.log(this);
        var shows = $(that).attr('href').slice(1);
        //console.log(shows);
        $(that).addClass('white');
        $(that).parent().siblings().find('a').removeClass('white');
        //console.log('.tabscontainer #'+ shows);
        $('.tabscontainer #'+ shows).css({display:'block'});
        $('.tabscontainer #'+ shows).siblings().css({display:'none'});
    });
    
    
    
    
    
    
    
    
    
    
    
    
    $('.changecode').on('click',function(){
        alert('hi');
    });
    
        
    function able(){
        var judge = $('input[name="check"]').val();
        var pnumber = $('input[name="phonenumber"]').val();
        var pass = $('input[type="password"]').val();
        var judge1 = judge !== '';
        var pnumber1 = pnumber !== '';
        var pass1 = pass !== '';
        
        if (  judge1 && pnumber1 && pass1 ){
            $('[type="submit"]').prop('disabled',false); $('[type="submit"]').css({'backgroundColor':'#278605'});
            $('[type="submit"]').css({'cursor':'pointer'});
        }
    };
    
    $('input').on('change',function(){
        able();
    });
    
    function checkphone (){
        var pnumber = $('input[name="phonenumber"]').val();
        if( !(/^1[0-9]{10}$/.test(pnumber)) ){
            return false;
        }
    };
    
    
    function pop (){
        $('.popout').css({display:'block'});
        $('.popout').animate({display:'block'},1000,function(){
            $('.popout').css({display:'none'})});
    };
    
    $('form').on('submit',function(event){
        event.preventDefault();
        checkphone();
        pop();
    });
    
    
    
    //计时器
    $('.scan a').on('click',function(event){
        event.stopPropagation();
        var timer = setInterval(function(){
            console.log($('#tab2').css('display'));
            },1000);
        $(window).on('click',function(){
            clearInterval(timer);
        });
    });
    
    //计时器
    
})