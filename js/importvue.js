var vm = new Vue({
    el:"#firstvue",
    data:{
        list:[],
        room:'',
        ht1:'',
        list2:[],
        list3:[],
        showinfo:false,
        groupmaster:'',
        cardname:'',
    },
    methods:{
        showorhide:function(){
            if( !$('.transparent1 .groupcontainer2 input').is(":checked") ){
               return false; 
            }else {
                return true;
            }
           
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
        listGroups3:function(){
            var option = {
                success: function (rooms) {
                    console.log(rooms);
                    vm.list = rooms;
                    console.log(vm.list);
                },
                error: function () {
                    console.log('List chat rooms error');
                }
            };
            conn.listRooms(option);
        },
        
        queryroommember1:function (event) {
            console.log(event);
            console.log(event.path[1]);
            var parent = event.path[1]; 
            var bid = $(parent).attr('data-id');
            console.log(bid);
            var member = '';
            var blankarr=[];
            conn.queryRoomMember({
                roomId: bid,
                success: function (members) {
                    var membername = '';
                    console.log(members);
                    console.log(members.length);
                    for (var o in members) {
                        member = members[o];
                        console.log(member);
                        //console.log(member.jid);
                        console.log(member.jid.slice(24,-12));
                        membername = membername + member.jid.slice(24,-12);
                        blankarr.push(member.jid.slice(24,-12));
                    }
                    console.log( blankarr );
                    vm.list3 = blankarr;
                }
            });
            
        },
        querygroupinfo1 : function () {
            var parent = event.path[1]; 
            var bid = $(parent).attr('data-id');
            conn.queryRoomInfo({
                roomId: bid,
                success: function (settings, members, fields) {
                    console.log('settings: ', settings);
                    console.log('members: ', members);
                    console.log('fields: ', fields);
                    console.log(fields.owner);
                    vm.groupmaster = fields.owner;

                },
                error: function () {
                    console.log('Error!');
                }
            });
        },
        closethis1:function(){
            $('.matchtab1 .slideinfo').slideUp(300);
        },
        addpeople2:function(){
            
        },
        showinformation:function(event){
            this.showinfo = true;
            console.log(event);
            console.log(event.path[1].getAttribute('data-id'));
            var id = event.path[1].getAttribute('data-id');
            vm.cardname = id;
            var x = event.clientX-150;
            var y = event.clientY+30;
            $('.peoplesinfo').css({left:x});
            $('.peoplesinfo').css({top:y});
        },
        clear:function(){
            this.showinfo = false;
            $('.matchtab1 .slideinfo').slideUp(300);
        }
       
    },
   
    
    
        
           
    
    
})
/*vm.$emit('click',function(){
    vm.showinfo = false;
})*/




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
