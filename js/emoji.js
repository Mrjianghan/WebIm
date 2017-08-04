var Emoji = { //首先加载emoji表情
    path: 'faces/',
    map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:-o]': 'ee_4.png',
        '[:p]': 'ee_5.png',
        '[(H)]': 'ee_6.png',
        '[:@]': 'ee_7.png',
        '[:s]': 'ee_8.png',
        '[:$]': 'ee_9.png',
        '[:(]': 'ee_10.png',
        '[:\'(]': 'ee_11.png',
        '[:|]': 'ee_12.png',
        '[(a)]': 'ee_13.png',
        '[8o|]': 'ee_14.png',
        '[8-|]': 'ee_15.png',
        '[+o(]': 'ee_16.png',
        '[<o)]': 'ee_17.png',
        '[|-)]': 'ee_18.png',
        '[*-)]': 'ee_19.png',
        '[:-#]': 'ee_20.png',
        '[:-*]': 'ee_21.png',
        '[^o)]': 'ee_22.png',
        '[8-)]': 'ee_23.png',
        '[(|)]': 'ee_24.png',
        '[(u)]': 'ee_25.png',
        '[(S)]': 'ee_26.png',
        '[(*)]': 'ee_27.png',
        '[(#)]': 'ee_28.png',
        '[(R)]': 'ee_29.png',
        '[({)]': 'ee_30.png',
        '[(})]': 'ee_31.png',
        '[(k)]': 'ee_32.png',
        '[(F)]': 'ee_33.png',
        '[(W)]': 'ee_34.png',
        '[(D)]': 'ee_35.png'
    }
};


WebIM.Emoji = Emoji; //导入emoji表情
parseEmoji: function parseEmoji(msg) { //解析emoji
    if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
        return msg;
    } else {
        var emoji = WebIM.Emoji,
            reg = null;
        for (var face in emoji.map) {
            if (emoji.map.hasOwnProperty(face)) {
                while (msg.indexOf(face) > -1) {
                    msg = msg.replace(face, '<img class="emoji" src="' + emoji.path + emoji.map[face] + '" />');
                }
            }
        }
        return msg;
    }
}; //解析emoji




parseTextMessage: function parseTextMessage(message, faces) { //解析文本消息
    if (typeof message !== 'string') {
        return;
    }
    if (Object.prototype.toString.call(faces) !== '[object Object]') {
        return {
            isemoji: false,
            body: [{
                type: 'txt',
                data: message
            }]
        };
    }
    var receiveMsg = message;
    var emessage = [];
    var expr = /\[[^[\]]{2,3}\]/mg;
    var emoji = receiveMsg.match(expr);
    if (!emoji || emoji.length < 1) {
        return {
            isemoji: false,
            body: [{
                type: 'txt',
                data: message
            }]
        };
    }
    var isemoji = false;
    for (var i = 0; i < emoji.length; i++) {
        var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
            existEmoji = WebIM.Emoji.map[emoji[i]];
        if (tmsg) {
            emessage.push({
                type: 'txt',
                data: tmsg
            });
        }
        if (!existEmoji) {
            emessage.push({
                type: 'txt',
                data: emoji[i]
            });
            continue;
        }
        var emojiStr = WebIM.Emoji.map ? WebIM.Emoji.path + existEmoji : null;
        if (emojiStr) {
            isemoji = true;
            emessage.push({
                type: 'emoji',
                data: emojiStr
            });
        } else {
            emessage.push({
                type: 'txt',
                data: emoji[i]
            });
        }
        var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
        receiveMsg = receiveMsg.substring(restMsgIndex);
    }
    if (receiveMsg) {
        emessage.push({
            type: 'txt',
            data: receiveMsg
        });
    }
    if (isemoji) {
        return {
            isemoji: isemoji,
            body: emessage
        };
    }
    return {
        isemoji: false,
        body: [{
            type: 'txt',
            data: message
        }]
    };
}; //解析文本消息  