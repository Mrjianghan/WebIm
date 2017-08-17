var vm = new Vue({
    el:"#firstvue",
    data:{
        list:[],
        arr1:[],
        groupnames:'',
        groupnumber:'',
        htmlall:'',
    },
    methods:{
        showorhide:function(){
           return false; 
        },
        listGroups3:function(){
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
            
        },
        ale:function(){
            alert('hi');
        }
        
        
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
