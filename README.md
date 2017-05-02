#  file convert module
pdf, rtf, docx, hwp를 html로 변환을 해주는 모듈입니다.

# 의존모듈

* pdf2htmlex(brew, apt-get)
* pdftohtmljs(npm) : pdf -> html
* mammoth(npm)     : docx -> html
* node-hwp         : hwp -> hwpml -> html
* rtf-reader       : rtf -> rtfml -> html

* pdf2htmlex 설치

```bash
$ brew install pdf2htmlex     #  When mac
$ apt-get install pdf2htmlex  # When ubuntu
```

> Error: You must `brew link python` before pdf2htmlex can be installed

해당에러 발생 시(주로 맥에서 발생) 아래의 명령어를 입력 후 다시 brew를 이용하여 설치를 해준다.
 
```bash
$ brew link --overwrite python
```

* pdftohtmljs 설치

```bash
$ npm install pdftohtmljs
```

* mammoth 설치

```bash
$ npm install -g mammoth
```

위 모듈은 해당 환경에서 설치가 되어있지 않을 경우 에러가 발생할 수 있습니다.

# file path

* index.js 

```javascript
const INPUT_FILE_PATH = './input/',
      OUTPUT_FILE_PATH = './output/';
```

조절하여 path 변환이 가능 합니다.

default값은 해당 디렉토리의 input, output입니다.

---

# release NOTE 

* ### Version 0.1 (2017. 05. 02 Tue)

    * pdf -> html 변환 완료
    - hwp -> hwpml로 변환완료
    - rtf -> rtfml로 변환완료
    - docx은 불안정하게 html로 변환완료. 스타일 적용 X, P tag단위로만 구분지음.

* rtf파일 구조

```bash
newline (/par)
tabs (/tab)
right-aligned tabs (/tqr)
tab-stops (/tx)
left-indent (/li)
colors (/colortbl, /red, /blue, /green, /cf)
font-names (/fonttbl)
font-size (/fs)
bold (/b)
italic (/i)
text-alignment (/gl, /gc, /gr)
paper size (/paperw, /paperh)
margins (/margl, /margr, /margt, /margb)
```

# license

(주)Edipse에서 개발이 진행중입니다.

해당 프로젝트에서 ml파일을 html로 바꾸는 부분에서 상당한 노가다가 예상이 되어 힘이되어 주시는 분들에게 감사를 표하겠습니다.

