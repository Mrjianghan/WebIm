function pop1 (){
    
    $('.popout').css({display:'block'});
    $('.popout').animate({display:'block'},1000,function(){
        $('.popout').css({display:'none'})});
};



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
    
