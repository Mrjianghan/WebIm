var vm = new Vue({
    el:"#firstvue",
    data:{
        list:[],
        room:'',
        ht1:'',
        list2:[],
        list3:[],
        list4:[],
        list5:[],
        showinfo:false,
        groupmaster:'',
        cardname:'',
        ifornot:false,
        emojishow:false,
        emojilist:[],
        trans2:false,
        trans3:false,
        timer1:{},
        timer2:{},
        sendfileid:'',
    },
    
    methods:{
        showorhide:function(){
            if( !$('.transparent1 .groupcontainer2 input').is(":checked") ){
               return false; 
            }else {
                return true;
            }
        },
        showorhide2:function(){
            if( !$('.transparent2 .friendcontainer2-2 input').is(":checked") ){
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
        addfriends:function($event){
            vm.trans2 = true;
            vm.timer1 = setTimeout(function(){
                $('.scrollbar-macosx').scrollbar();
            },100);
            console.log(vm.timer1);
            console.log( typeof(vm.timer1) );
        },
        deletefiends:function($event){
            vm.trans3 = true;
            vm.timer2 = setTimeout(function(){
                $('.scrollbar-macosx').scrollbar();
            },100);
            console.log(vm.timer2);
            console.log( typeof(vm.timer2) );
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
            this.emojishow = false;
            $('.matchtab1 .slideinfo').slideUp(300);
        },
        closetrans2:function(){
            vm.trans2 = false;
            clearTimeout( vm.timer1 );
            console.log( vm.timer1 );
        },
        closetrans3:function(){
            vm.trans3 = false;
            clearTimeout( vm.timer2 );
            console.log( vm.timer2 );
        },
        getRoasters1:function () {
            var option = {
                success: function (roster) {
                    var o;
                    var arrin=[];
                    var l = roster.length;
                    console.log(roster);
                    for (o = 0; o < l; o++) {
                        var state = roster[o].subscription;
                        var names = roster[o].name;
                        if ( state == 'both' ) {
                            arrin.push(names);
                        };
                    }
                    console.log(arrin);
                    vm.list5 = arrin;
                } //success
            }; //option
            conn.getRoster(option);
            //initials();
        },
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
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
