var vm = new Vue({
    el:"#firstvue",
    data:{
        list:[],
        room:'',
        index:{},
    },
    methods:{
        showorhide:function(){
           return this.list.length; 
        },
        listGroups3:function(){
            var bridge;
            var ano;
            var option = {
                success: function (rooms) {
                    console.log(rooms);
                    
                },
                error: function () {
                    console.log('List chat rooms error');
                }
            };
            conn.listRooms(option);
        },
        check:function(){
            if ( $('.transparent1 .groupcontainer2 input').is(":checked") ){
                $('.confirm2').css({backgroundColor:'rgb(39, 134, 5)'});
                $('.confirm2').prop({"disabled":false});
            }else {
                $('.confirm2').css({backgroundColor:'#a1a1a1'});
                $('.confirm2').prop({"disabled":true});
            }
            
        },
    },
        
           
    
    
})





/*var listGroups3 = function () {
    var option = {
        success: function (rooms) {
            //console.log(rooms);
            for (var i in rooms) {
            
                this.groupnames = rooms[i].name;
                this.groupnumber = rooms[i].roomId;
                
            }
        },
        error: function () {
            console.log('List chat rooms error');
        }
    };
    conn.listRooms(option);
};*/


/*<div data-id="' + groupnumber + '" id="' + groupnames + '" class="onlygroupcontainer"><input class="groupcheck" type="checkbox" value="'+ groupnames +'"><img src="imgs/group-1.jpg"><div class="onlyname">' + groupnames + '</div><div class="clearfix"></div></div>*/
