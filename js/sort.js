
function initials() { 
    var SortList = $(".sort_list");
    var SortBox = $(".sort_box");
    SortList.sort(asc_sort).appendTo('.sort_box'); 
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};



function initials1() { 
    var SortList = $(".sort_list1");
    var SortBox = $(".sort_box1");
    SortList.sort(asc_sort).appendTo('.sort_box1'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name1').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name1').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name1').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter1" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter1" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name1').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};


function initials2() { 
    var SortList = $(".sort_list2");
    var SortBox = $(".sort_box2");
    SortList.sort(asc_sort).appendTo('.sort_box2'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name2').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name2').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name2').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter2" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter2" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name2').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};




function initials3() { 
    var SortList = $(".sort_list3");
    var SortBox = $(".sort_box3");
    SortList.sort(asc_sort).appendTo('.sort_box3'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name3').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name3').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name3').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter3" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter3" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name3').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};

function initials4() { 
    var SortList = $(".sort_list4");
    var SortBox = $(".sort_box4");
    SortList.sort(asc_sort).appendTo('.sort_box4'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name4').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name4').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name4').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter4" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter4" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name4').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};


function initials8() { 
    var SortList = $(".sort_list8");
    var SortBox = $(".sort_box8");
    SortList.sort(asc_sort).appendTo('.sort_box8'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name8').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name8').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name8').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter8" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter8" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name8').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};

function initials9() { 
    var SortList = $(".sort_list9");
    var SortBox = $(".sort_box9");
    SortList.sort(asc_sort).appendTo('.sort_box9'); //按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name9').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name9').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num = 0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name9').text().charAt(0))[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        } else {
            num++;
        }

    });

    $.each(initials, function(index, value) { //添加首字母标签
        SortBox.append('<div class="sort_letter9" id="' + value + '">' + value + '</div>');
    });
    if (num != 0) { SortBox.append('<div class="sort_letter9" id="default">#</div>'); }

    for (var i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
        var letter = makePy(SortList.eq(i).find('.num_name9').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
};