
const pdftohtml = require('pdftohtmljs'),
      fs = require('fs'),
      mammoth = require("mammoth"),
      hwp = require("./node-hwp"),
      rtfParse = require( './rtf-parse' ),
      RTFReader = require('./rtf-reader');


const INPUT_FILE_PATH = './input/',
      OUTPUT_FILE_PATH = './output/';


module.exports.pdf = function(filename) {

    return new Promise((resolve, reject)=>{
        let createdHtmlFileName = filename.split('.')[0] + '.html';
        let converter = new pdftohtml(INPUT_FILE_PATH + filename, OUTPUT_FILE_PATH + createdHtmlFileName);

        converter.convert('ipad').then( () => {
            fs.readFile(OUTPUT_FILE_PATH + createdHtmlFileName, 'utf8', (err, htmlText) => {
                resolve(htmlText)
            })
        }).catch( (err) => {
            reject( err);
        });
    })
};


module.exports.rtf = function(filename) {

    return new Promise( (resolve, reject) => {
        // rtfParse.parseFile( INPUT_FILE_PATH + filename ).then(doc => {
        fs.readFile(INPUT_FILE_PATH + filename, 'utf8', (err, data) => {
            if (err) {
                console.log("File Not Found : " + err);
                reject("File Not Found : " + err);
            }
            let reader = new RTFReader(data);
            reader.read();

            let rtfTypeData = reader.write();

            // fs.writeFile(__dirname + '/test1.html',
            //     '<html><body style="font-size:20px;">' + reader.write() + '</body></html>');
            resolve(rtfTypeData);
        });
    })
}


module.exports.docx = function(filename) {
    return new Promise((resolve, reject) => {
        let options = {
            // styleMap: [
                // "u => em",
                // "p[style-name='Section Title'] => h1:fresh",
                // "p[style-name='Subsection Title'] => h2:fresh"
            // ],
            // includeDefaultStyleMap: false
        };

        mammoth.convertToHtml(
            {
                path: INPUT_FILE_PATH + filename
            },
            options
        ).then( result => {

            let htmlText = result.value;
            let message = result.messages;
            resolve(htmlText);

        }, err => {
            console.error("Conversion error : " + err);
            reject("Conversion error: " + err);
        })
    })
};


module.exports.hwp = function(filename) {
    return new Promise((resolve, reject) => {

        hwp.open(INPUT_FILE_PATH + filename, (err, doc) => {
            if(err){
                console.error("Conversion error : " + err);
                reject('Conversion error : ' + err);
            }
            let hwpml = doc.toHML();
            resolve(hwpml);

        });
    })
};