"use strict";var __classPrivateFieldGet=this&&this.__classPrivateFieldGet||function(e,t,a,n){if("a"===a&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===a?n:"a"===a?n.call(e):n?n.value:t.get(e)},__classPrivateFieldSet=this&&this.__classPrivateFieldSet||function(e,t,a,n,s){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!s)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?s.call(e,a):s?s.value=a:t.set(e,a),a};Object.defineProperty(exports,"__esModule",{value:!0});const https_1=require("https"),tls_1=require("tls");var hitomi;!function(e){var t,a,n,s,i;const l=["artist","group","parody","character"];class r extends Error{constructor(e,t){switch(super("Unknown"),this.code="UNKNOWN",this.code=e,e){case"INVALID_VALUE":this.message="Value of % was not valid";break;case"DUPLICATED_ELEMENT":this.message="Element of % was duplicated";break;case"LACK_OF_ELEMENT":this.message="Elements of % was not enough";break;case"REQEUST_REJECTED":this.message="Request to % was rejected";break;case"INVALID_SEQUENCE":this.message="Must execute % before"}this.message=this.message.replace("%",t.includes("'")?"`%`":"'%'").replace("%",t)}get name(){return"HitomiError ["+this.code+"]"}}function o(e){const t=new DataView(e.buffer),a=t.byteLength/4,n=new Set;for(let e=0;e<a;e++)n.add(t.getInt32(4*e));return n}const c=new class extends https_1.Agent{createConnection(e,t){return(0,tls_1.connect)(Object.assign(e,{servername:void 0}),t)}};function h(e,t={}){return new Promise((function(a,n){const s=new URL(e);(0,https_1.request)({hostname:s.hostname,path:s.pathname,method:"GET",port:443,headers:Object.assign(t,{Accept:"*/*",Connection:"keep-alive",Referer:"https://hitomi.la"}),agent:c},(function(t){const s=[];let i=0;switch(t.statusCode){case 200:case 206:t.on("data",(function(e){s.push(e),i+=e.byteLength})).on("error",(function(){n(new r("REQEUST_REJECTED",e))})).on("end",(function(){a(Buffer.concat(s,i))}));break;default:n(new r("REQEUST_REJECTED",e))}})).on("error",(function(){n(new r("REQEUST_REJECTED",e))})).end()}))}function g(e={}){var t;const a="language"===(null===(t=e.tag)||void 0===t?void 0:t.type);let n="",s="all";if("object"!=typeof e.tag||a)a&&(s=e.tag.name),n=e.orderByPopularityPeriod||"index";else switch(e.tag.type){case"male":case"female":n="tag/"+e.tag.type+":"+e.tag.name.replace(/_/g," ");break;default:n=e.tag.type+"/"+e.tag.name.replace(/_/g," ")}return"https://ltn.hitomi.la/"+("string"!=typeof e.orderByPopularityPeriod?"n":"popular")+"/"+("day"!==n?n:"today")+"-"+s+".nozomi"}function u(e,t={}){const a="language"!==e;if(void 0!==t.startWith===a){let n="ltn.",s="all";if(a){switch(e){case"tag":case"male":case"female":s+="tags";break;case"artist":case"series":case"character":case"group":s+=e+("s"!==e.charAt(e.length-1)?"s":"");break;default:throw new r("INVALID_VALUE","extension")}s+="-"+("0-9"!==t.startWith?t.startWith:"123")+".html"}else n="",s="language_support.js";return"https://"+n+"hitomi.la/"+s}throw new r("INVALID_VALUE","options['startWith']")}e.getNozomiUrl=g,e.getTagUrl=u;a=new WeakMap,n=new WeakMap,s=new WeakMap,t=new WeakSet,i=function e(a,n){let s="";const i=Object.keys(a);if(void 0===n)for(let n=0;n<i.length;n++)s+=__classPrivateFieldGet(this,t,"m",e).call(this,a[i[n]],i[n]);else{s+="|"+n+"(";let l=!1;for(let n=0;n<i.length;n++)""===i[n]?l=!0:0!==Object.keys(a[i[n]]).length&&(s+=__classPrivateFieldGet(this,t,"m",e).call(this,a[i[n]],i[n]));s+=")",l&&(s+="?")}return s},e.ImageUrlResolver=class{constructor(){t.add(this),a.set(this,void 0),n.set(this,void 0),s.set(this,!0)}synchronize(){const e=this;return new Promise((function(l,o){h("https://ltn.hitomi.la/gg.js").then((function(c){var h;const g=c.toString().split("\n"),u=[];for(let t=0;t<g.length;t++)switch(g[t].charAt(0)){case"b":if(__classPrivateFieldSet(e,a,g[t].slice(0,-2).split("'").pop(),"f"),void 0!==__classPrivateFieldGet(e,a,"f"))break;return void o(new r("INVALID_VALUE","ImageUrlResolver['#pathCode']"));case"c":{const e=g[t].split(" ").pop();if("string"!=typeof e)return void o(new r("INVALID_VALUE","subdomainCodes["+t+"]"));u.push(e.slice(0,-1));break}case"o":"1"===(null===(h=g[t].split(" = ").pop())||void 0===h?void 0:h.charAt(0))&&__classPrivateFieldSet(e,s,!1,"f")}const d={};for(let e=0;e<u.length;e++){let t=d;const a=u[e].split("");for(let e=0;e<a.length;e++)"object"!=typeof t[a[e]]&&(t[a[e]]={}),t=t[a[e]],e===a.length-1&&(t[""]={})}const f=__classPrivateFieldGet(e,t,"m",i).call(e,d).replace(/\(\)\?|((?<=\()|^)\||\((?=\|[0-9]\(\)\?\))|(?<=\(\|[0-9]\(\)\?)\)|\|(?=[0-9]\(\))/g,"").split(/\((?=[0-9]{2,}\))|(?<=\([0-9]{2,})\)/);for(let e=0;e<f.length;e++)if(e%2==1){let t=f[e].split(""),a=0;for(let e=0;e<t.length;e++)e+a<t.length&&Number(t[e])+a===Number(t[e+a])?(a++,e--):1!==a&&(t[e]+="-"+t[e+a-1],t=t.slice(0,e+1).concat(t.slice(e+a)),a=0);f[e]="["+t.join("")+"]"}__classPrivateFieldSet(e,n,new RegExp("^("+f.join("")+")$"),"f"),"(?:)"!==__classPrivateFieldGet(e,n,"f").source?l(e):o(new r("INVALID_VALUE","ImageUrlResolver['#subdomainRegularExpression']"))}))}))}getImageUrl(e,t,i={}){if("string"==typeof __classPrivateFieldGet(this,a,"f")&&__classPrivateFieldGet(this,n,"f")instanceof RegExp){switch(i.isThumbnail="boolean"==typeof i.isThumbnail&&i.isThumbnail,i.isSmall="boolean"==typeof i.isSmall&&i.isSmall,t){case"webp":case"avif":if(e["has"+t.charAt(0).toUpperCase()+t.slice(1)])break;default:throw new r("INVALID_VALUE","extension")}if(/^[0-9a-f]{64}$/.test(e.hash)){if(Number.isInteger(e.index)&&e.index>=0){const l=String(Number.parseInt(e.hash.slice(-1)+e.hash.slice(-3,-1),16));let o="a",c=t;if(i.isThumbnail){if(i.isSmall){if("avif"!==t)throw new r("INVALID_VALUE","options['isSmall']");c+="small"}c+="bigtn/"+e.hash.slice(-1)+"/"+e.hash.slice(-3,-1)+"/"+e.hash,o="tn"}else c+="/"+__classPrivateFieldGet(this,a,"f")+"/"+l+"/"+e.hash;return"https://"+(__classPrivateFieldGet(this,n,"f").test(l)===__classPrivateFieldGet(this,s,"f")?"a":"b")+o+".hitomi.la/"+c+"."+t}throw new r("INVALID_VALUE","image['index']")}throw new r("INVALID_VALUE","image['hash']")}throw new r("INVALID_SEQUENCE","synchronize()")}},e.getVideoUrl=function(e){if("anime"===e.type)return"https://streaming.hitomi.la/videos/"+e.title.display.toLowerCase().replace(/\s/g,"-")+".mp4";throw new r("INVALID_VALUE","gallery['type']")},e.getGalleryUrl=function(e){return("https://hitomi.la/"+("artistcg"!==e.type?e.type:"cg")+"/"+encodeURIComponent(Buffer.from(e.title.japanese||e.title.display).slice(0,200).toString("utf-8")).replace(/\(|\)|'|%(2[0235F]|3[CEF]|5[BD]|7[BD])/g,"-")+(null!==e.languageName.local?"-"+encodeURIComponent(e.languageName.local):"")+"-"+e.id+".html").toLocaleLowerCase()},e.getSecondThumbnailIndex=function(e){return Math.ceil((e.files.length-1)/2)},e.getGallery=function(e,t={}){if(Number.isInteger(e)&&e>0)return new Promise((function(a,n){h("https://ltn.hitomi.la/galleries/"+e+".js").then((function(n){const s=JSON.parse(n.toString("utf8").slice(18)),i=JSON.parse('{"id":'+e+',"title":{"display":"'+s.title.replace(/\"/g,'\\"')+'","japanese":'+(null!==s.japanese_title?'"'+s.japanese_title.replace(/\"/g,'\\"')+'"':"null")+'},"type":"'+s.type+'","languageName":{"english":'+(null!==s.language?'"'+s.language+'"':"null")+',"local":'+(null!==s.language_localname?'"'+s.language_localname+'"':"null")+'},"artists":[],"groups":[],"series":[],"characters":[],"tags":[],"files":[],"publishedDate":null,"translations":[],"relatedIds":[]}');for(let e=0;e<l.length;e++){const t=l[e]+"s";if(null!==s[t])for(let a=0;a<s[t].length;a++)i["p"!==t.charAt(0)?t:"series"].push(s[t][a][l[e]])}if(null!==s.tags)for(let e=0;e<s.tags.length;e++){let t="tag";1===s.tags[e].male?t="male":1===s.tags[e].female&&(t="female"),i.tags.push({type:t,name:s.tags[e].tag})}if("boolean"==typeof t.includeFiles&&t.includeFiles)for(let e=0;e<s.files.length;e++)i.files.push({index:e,hash:s.files[e].hash,extension:s.files[e].name.split(".").pop(),hasAvif:Boolean(s.files[e].hasavif),hasWebp:Boolean(s.files[e].haswebp),width:s.files[e].width,height:s.files[e].height});if(i.publishedDate=new Date(s.date),"boolean"==typeof t.includeRelatedIds&&t.includeRelatedIds){for(let e=0;e<s.languages.length;e++)i.translations.push({id:Number(s.languages[e].galleryid),languageName:{english:s.languages[e].name,local:s.languages[e].language_localname}});i.relatedIds=s.related}a(i)})).catch(n)}));throw new r("INVALID_VALUE","id")},e.getIds=function(e={}){return new Promise((function(t,a){var n,s,i,l,c;const u=!Array.isArray(e.tags)||0===e.tags.length;!Number.isInteger(null===(n=e.range)||void 0===n?void 0:n.startIndex)||(null===(s=e.range)||void 0===s?void 0:s.startIndex)>=0?!Number.isInteger(null===(i=e.range)||void 0===i?void 0:i.endIndex)||(null===(l=e.range)||void 0===l?void 0:l.endIndex)>=((null===(c=e.range)||void 0===c?void 0:c.startIndex)||0)?(u?[]:e.tags).reduce((function(e,t){return e.then((function(e){return new Promise((function(a,n){h(g({tag:t})).then((function(n){const s=o(n),i="boolean"==typeof t.isNegative&&t.isNegative;e.forEach((function(t){i===s.has(t)&&e.delete(t)})),a(e)})).catch(n)}))}))}),u||"string"==typeof e.orderByPopularityPeriod||"boolean"==typeof e.tags[0].isNegative&&e.tags[0].isNegative?new Promise((function(t,a){h(g({orderByPopularityPeriod:e.orderByPopularityPeriod}),u?{Range:"bytes="+(4*e.range.startIndex||"0")+"-"+(4*e.range.endIndex+3||"")}:void 0).then((function(e){t(o(e))})).catch(a)})):new Promise((function(t,a){h(g({tag:e.tags.shift()})).then((function(e){t(o(e))})).catch(a)}))).then((function(a){var n,s;let i=Array.from(a);"boolean"==typeof e.reverseResult&&e.reverseResult&&i.reverse(),i=i.slice(null===(n=e.range)||void 0===n?void 0:n.startIndex,null===(s=e.range)||void 0===s?void 0:s.endIndex),t(i)})).catch(a):a(new r("INVALID_VALUE","options['range']['endIndex']")):a(new r("INVALID_VALUE","options['range']['startIndex']"))}))},e.getParsedTags=function(e){const t=e.split(" ");if(0!==t.length){const e=[],a=new Set;for(let n=0;n<t.length;n++){const s=t[n].replace(/^-/,"").split(":");if(2!==s.length||!/^(artist|group|series|tag|(languag|typ|(fe)?mal)e)$/.test(s[0])||!/^[^-_\.][a-z0-9-_.]+$/.test(s[1]))throw new r("INVALID_VALUE","splitTagStrings["+n+"]");{const i=s[0]+":"+s[1];if(a.has(i))throw new r("DUPLICATED_ELEMENT","splitTagStrings["+n+"]");e.push({type:s[0],name:s[1],isNegative:"-"===t[n].charAt(0)}),a.add(i)}}return e}throw new r("LACK_OF_ELEMENT","splitTagStrings")},e.getTags=function(e,t={}){return new Promise((function(a,n){const s="type"===e;void 0===t.startWith!=("language"!==e&&!s)?s?a([{type:"type",name:"anime"},{type:"type",name:"artistcg"},{type:"type",name:"doujinshi"},{type:"type",name:"gamecg"},{type:"type",name:"manga"}]):h(u(e,{startWith:t.startWith})).then((function(t){const n="male"===e||"female"===e,s=t.toString("utf8").match(RegExp("language"===e?'(?<=")(?!all)[a-z]+(?=":)':"(?<=/"+(n?e+"%3A":"")+")[a-z0-9%D]+(?=-all\\.html)","g"))||[],i=[];for(let t=0;t<s.length;t++)i.push({type:e,name:decodeURIComponent(s[t])});a(i)})).catch(n):n(new r("INVALID_VALUE","options['startWith']"))}))}}(hitomi||(hitomi={})),exports.default=hitomi;