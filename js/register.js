$(function(){
    
    
    $('.switch a').on('click',function(){
        var that = $(this);
        that.addClass('white');
        that.parent().siblings().find('a').removeClass('white');
        
    });
    
    
    
    
    
    
    
    
    
    
})