/**
 *
 * Created by bagjeongtae on 2017. 5. 2..
 */

const fileConverter = require('../file_converter');

let pdfFileName = 'test.pdf';
let hwpFileName = 'test.hwp';
let docxFileName = 'test.docx';
let rtfFileName = 'test.rtf';

fileConverter.pdf(pdfFileName).then(html =>{
    console.log(html);
}, err => {
    console.log(err);
});

fileConverter.hwp(hwpFileName).then(hwpml =>{
    console.log(hwpml);
}, err => {
    console.log(err);
});

fileConverter.docx(docxFileName).then(docx =>{
    console.log(docx);
}, err => {
    console.log(err);
});

fileConverter.rtf(rtfFileName).then(rtf =>{
    console.log(rtf);
}, err => {
    console.log(err);
});

