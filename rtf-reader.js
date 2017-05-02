/**
 * Created by bagjeongtae on 2017. 4. 30..
 */
var fs = require('fs');

var RTFReader = function (data) {
    this.data = data.split('');
    this.ignoreTill = [];
    this.braceCounter = 0;
    this.markup = {};
    this.plainText = [];
    this.tagStack = [];
    this.__fileposition = [];
};

RTFReader.lookup = {
    'par' : '<br />',
    'tx' : '&nbsp;',
    'b' : '<strong>',
    'i' : '<em>',
    'fs' : '<span style="font-size:??px;">',
    'scaps' : '<span style="font-variant:small-caps">',
    'strike' : '<span style="text-decoration: line-through;">',
    'ul' : '<span style="text-decoration: underline;">',
    'stylesheet' : '<style>',
    's' : '<span class="??">',
};

RTFReader.closable = {
    'b' : '</strong>',
    'i' : '</em>',
    'fs' : '</span>',
    'scaps' : '</span>',
    'strike' : '</span>',
    'ul' : '</span>',
    'stylesheet' : '</style>',
    's' : '</span>'
}

RTFReader.prototype = {

    parseKeyWord : function (position) {
        var i = position,
            keyWord = '',
            lookup = RTFReader.lookup,
            match,
            param = -1;
        while (this.data[i] !== ' ' && this.data[i] !== '\\' &&
            this.data[i] !== '{' && this.data[i] !== '}') {
            if (this.data[i] !== '\r' && this.data[i] !== '\n') {
                keyWord += this.data[i];
            }
            if (this.data[i] === '*') {
                this.ignoreTill.push(this.braceCounter);
            }
            i += 1;
        }
        i += this.data[i] === ' ' ? 1 : 0;

        //Temporarily disable this groups
        if (keyWord === 'stylesheet' || keyWord === 'fonttbl' || keyWord === 'info') {
            this.ignoreTill.push(this.braceCounter);
        }

        match = keyWord.search(/-?\d+$/gi);
        if (match !== -1) {
            param = parseInt(keyWord.substr(match));
            keyWord = keyWord.substr(0, match);
        }

        if (lookup.hasOwnProperty(keyWord) && param !== 0 && this.ignoreTill.length === 0) {
            this.__fileposition.push(position)
            if (!this.markup.hasOwnProperty(this.plainText.length)) {
                this.markup[this.plainText.length] = [];
            }
            this.markup[this.plainText.length].push(param === -1 ? lookup[keyWord] : lookup[keyWord].replace('??', param));
            if (RTFReader.closable.hasOwnProperty(keyWord)) {
                this.tagStack.push(keyWord);
            }
        }
        return i;
    },

    read : function () {
        var i = 0;
            len = this.data.length;

        while(this.data[i]) {
            switch (this.data[i]) {
                case '\r':
                    i += 1;
                break;
                case '\n':
                    i += 1;
                break;
                case '\\':
                    i += 1;
                    if (this.data[i] !== '\\') {
                        i = this.parseKeyWord(i);
                    } else {
                        this.plainText.push(this.data[i]);
                        i += 1;
                    }
                break;
                case '{':
                    this.braceCounter += 1;
                    i += 1;
                break;
                case '}':
                    if (this.braceCounter === this.ignoreTill[this.ignoreTill.length - 1]) {
                        this.ignoreTill.pop();
                    }
                    if (this.tagStack.length) {
                        if (!this.markup.hasOwnProperty(this.plainText.length)) {
                            this.markup[this.plainText.length] = []
                        }
                        while (this.tagStack.length !== 0) {
                            this.markup[this.plainText.length].push(RTFReader.closable[this.tagStack.pop()]);
                        }
                    }
                    this.braceCounter -= 1;
                    i += 1;
                break;
                default:
                    if (!this.ignoreTill.length) {
                        this.plainText.push(this.data[i])
                    }
                    i += 1;
                break;
            }
        }
    },

    write : function () {
        var i = 0,
            len = this.plainText.length,
            output = [];
        for (;i <= len; i += 1) {
            if (this.markup.hasOwnProperty(i)) {
                while (this.markup[i].length !== 0) {
                    output.push(this.markup[i].shift());
                }
            }
            if (i < len) {
                output.push(this.plainText[i]);
            }
        }
        return output.join('');
    }
};

module.exports = RTFReader;
// fs.readFile(__dirname + '/test.rtf', 'utf8', function (err, data) {
//     console.log(__dirname + '/test.rtf')
//     if (err) {
//         console.log('File Not Found');
//         return;
//     }
//     var reader = new RTFReader(data);
//     reader.read();
//     console.log(data)
//     fs.writeFile(__dirname + '/test.html',
//         '<html><body style="font-size:20px;">' + reader.write() + '</body></html>');
// });

