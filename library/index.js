"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const https_1=require("https"),tls_1=require("tls");var hitomi;!function(e){const t=["artist","group","series","character"];class n extends Error{constructor(e,...t){super(function(e,...t){switch(e){case"INVALID_VALUE":return"Value of '"+t[0]+"' was not valid";case"DUPLICATED_ELEMENT":return"Element of '"+t[0]+"' was duplicated";case"LACK_OF_ELEMENT":return"Elements of '"+t[0]+"' was not enough";case"REQEUST_REJECTED":return"Request to '"+t[0]+"' was rejected"}}(e,t)),this.code=e}get name(){return"HitomiError ["+this.code+"]"}}class a extends https_1.Agent{createConnection(e,t){return e.servername=void 0,(0,tls_1.connect)(e,t)}}function i(e){return!(Number.parseInt(e)!==Number(e)||!Number.isFinite(e)||"object"==typeof e)}function s(e,t){const n=(null==t?void 0:t.splitBy)||4;let a=new ArrayBuffer(e.byteLength),i=new Uint8Array(a);for(let t=0;t<e.byteLength;++t)i[t]=e[t];const s=new DataView(a),l=s.byteLength/n;let o=new Set;for(let e=0;e<l;e++)o.add(s.getInt32(e*n,!1));return o}const l=new a({rejectUnauthorized:!1,keepAlive:!0});function o(e,t){return new Promise((function(a,i){const s=new URL(e);(0,https_1.request)({hostname:s.hostname,path:s.pathname,method:"GET",port:443,headers:Object.assign({Accept:"*/*",Connection:"keep-alive"},t),agent:l},(function(t){let s=[],l=0;200===t.statusCode||206===t.statusCode?t.on("data",(function(e){s.push(e),l+=e.byteLength})).on("error",(function(t){i(new n("REQEUST_REJECTED",e))})).on("end",(function(){a(Buffer.concat(s,l))})):i(new n("REQEUST_REJECTED",e))})).on("error",(function(t){i(new n("REQEUST_REJECTED",e))})).end()}))}function r(e){return("https://hitomi.la/"+("artistcg"!==e.type?e.type:"cg")+"/"+encodeURIComponent(Buffer.from(e.title.japanese||e.title.display).slice(0,200).toString("utf-8")).replace(/\(|\)|'|%(2(0|2|3|5|F)|3(C|E|F)|5(B|D)|7(B|D))/g,"-")+(null!==e.languageName.local?"-"+encodeURIComponent(e.languageName.local):"")+"-"+e.id+".html").toLocaleLowerCase()}function c(e,t){if("language"!==e.type&&void 0!==(null==t?void 0:t.orderBy))throw new n("INVALID_VALUE","option['orderBy']");{const n=(null==t?void 0:t.orderBy)||"index";let a="",i="",s="all";switch(e.type){case"male":case"female":a="tag/",i=e.type+":"+e.name.replace(/_/g," ");break;case"language":i=n,s=e.name;break;default:a=e.type+"/",i=e.name.replace(/_/g," ")}return"https://ltn.hitomi.la/n/"+a+i+"-"+s+".nozomi"}}function u(e,t){const n=t.startWith;let a="hitomi.la/";switch(e){case"tag":case"male":case"female":a+="alltags-";break;case"artist":a+="allartists-";break;case"series":a+="allseries-";break;case"character":a+="allcharacters-";break;case"group":a+="allgroups-";break;case"language":a="ltn."+a+"language_support.js"}return a="https://"+a,"language"!==e?(a+="male"===e?"m":"female"===e?"f":"0-9"!==n?n:"123",a+".html"):a}function h(e,t){return new Promise((function(a,l){var r;if(!i(e.startIndex)||i(e.startIndex)&&e.startIndex<0)l(new n("INVALID_VALUE","range['startIndex']"));else if(void 0!==e.endIndex&&(!i(e.endIndex)||i(e.endIndex)&&e.endIndex<=e.startIndex))l(new n("INVALID_VALUE","range['endIndex']"));else{const n=4*e.startIndex,i=n+4*((null==e?void 0:e.endIndex)||NaN)+3||"",c=(null==t?void 0:t.orderBy)||"index",u=null!==(r=null==t?void 0:t.reverseResult)&&void 0!==r&&r;o("https://ltn.hitomi.la/"+c+"-all.nozomi",{Range:"bytes="+n+"-"+i}).then((function(e){let t=Array.from(s(e));a(u?t:t.reverse())})).catch(l)}}))}e.getImageUrl=function(e,t,a){var s;const l=null!==(s=null==a?void 0:a.isThumbnail)&&void 0!==s&&s;switch(t){case"jpg":if("jpg"!==e.extension)throw new n("INVALID_VALUE","extension");break;case"png":if(l||"png"!==e.extension)throw new n("INVALID_VALUE","extension");break;case"avif":if(e.hasAvif)break;throw new n("INVALID_VALUE","extension");case"webp":if(l||!e.hasWebp)throw new n("INVALID_VALUE","extension");break;case"gif":if(l||"gif"!==e.extension)throw new n("INVALID_VALUE","extension")}if(/^[0-9a-f]{64}$/.test(e.hash)){if(!i(e.index)||e.index<0)throw new n("INVALID_VALUE","image['index']");{const n=e.hash.slice(-1)+"/"+e.hash.slice(-3,-1)+"/"+e.hash;let a="",i="";if(l)a="tn",i=("avif"===t?"avif":"")+"bigtn";else{let n=Number.parseInt(e.hash.slice(-3,-1),16);a=String.fromCharCode(n<122?98:97),"jpg"===t||"png"===t?(a+="b",i="images"):(a+="a",i=t)}return"https://"+a+".hitomi.la/"+i+"/"+n+"."+t}}throw new n("INVALID_VALUE","image['hash']")},e.getVideoUrl=function(e){return"https://streaming.hitomi.la/videos/"+e.title.display.toLowerCase().replace(/\s/g,"-")+".mp4"},e.getGalleryUrl=r,e.getNozomiUrl=c,e.getTagUrl=u,e.getSecondThumbnailIndex=function(e){return Math.ceil((e.files.length-1)/2)},e.getGallery=function(e,a){var s,l;if(!i(e)||i(e)&&e<1)throw new n("INVALID_VALUE","id");{const n=null===(s=null==a?void 0:a.includeFiles)||void 0===s||s,i=null===(l=null==a?void 0:a.includeFullData)||void 0===l||l;return new Promise((function(a,s){o("https://ltn.hitomi.la/galleries/"+e+".js").then((function(e){const l=JSON.parse(e.toString("utf8").slice(18));let c=JSON.parse('{ "id": '+l.id+', "title": { "display": "'+l.title.replace(/\"/g,'\\"')+'", "japanese": '+(null!==l.japanese_title?'"'+l.japanese_title.replace(/\"/g,'\\"')+'"':"null")+' }, "type": "'+l.type+'", "languageName": { "english": '+(null!==l.language?'"'+l.language+'"':"null")+', "local": '+(null!==l.language_localname?'"'+l.language_localname+'"':"null")+' }, "artists": [], "groups": [], "series": [], "characters": [], "tags": [], "files": [], "publishedDate": null }');if(c.publishedDate=new Date(l.date),null!==l.tags)for(let e=0;e<l.tags.length;e++){let t="tag";Boolean(l.tags[e].male)?t="male":Boolean(l.tags[e].female)&&(t="female"),c.tags.push({type:t,name:l.tags[e].tag})}if(n)for(let e=0;e<l.files.length;e++)c.files.push({index:e,hash:l.files[e].hash,extension:l.files[e].name.split(".").pop(),hasAvif:Boolean(l.files[e].hasavif),hasWebp:Boolean(l.files[e].haswebp),width:l.files[e].width,height:l.files[e].height});i?o(r(c)).then((function(e){const n=e.toString("utf8").split('content">')[1];if(void 0!==n)for(let e=0;e<t.length;e++){const a=n.match(RegExp("(?<=/"+t[e]+"/)[A-z0-9%]+(?=-all\\.html)","g"))||[];for(let n=0;n<a.length;n++)c["series"!==t[e]?t[e]+"s":"series"].push(decodeURIComponent(a[n]))}a(c)})).catch(s):a(c)})).catch(s)}))}},e.getIds=h,e.getParsedTags=function(e){const t=e.split(" ");if(t.length<1)throw new n("LACK_OF_ELEMENT","splitTagStrings");{let e=[],a=[];for(let i=0;i<t.length;i++){const s=t[i].replace(/^-/,"").split(":");if(2!==s.length||void 0===s[0]||void 0===s[1]||""===s[0]||""===s[1]||!/^(artist|group|type|language|series|tag|male|female)$/.test(s[0])||!/^[^-_\.][a-z0-9-_.]+$/.test(s[1]))throw new n("INVALID_VALUE","splitTagStrings["+i+"]");{const l=s[0]+":"+s[1];if(a.includes(l))throw new n("DUPLICATED_ELEMENT","tags");e.push({type:s[0],name:s[1],isNegative:t[i].startsWith("-")}),a.push(l)}}return e}},e.getQueriedIds=function(e){return new Promise((function(t,a){var i;if(e.length<1)throw new n("LACK_OF_ELEMENT","tags");{e.sort((function(e,t){var n,a;const[i,s]=[null!==(n=null==e?void 0:e.isNegative)&&void 0!==n&&n,null!==(a=null==t?void 0:t.isNegative)&&void 0!==a&&a];return i||s?i?1:-1:0}));let n=new Set,l=[];for(let t=0;t<e.length;t++)l.push(new Promise((function(n,a){o(c(e[t])).then((function(e){n(s(e))})).catch(a)})));return l.push(new Promise((function(e,t){e(new Set)}))),null!==(i=e[0].isNegative)&&void 0!==i&&i&&(e.unshift({type:"female",name:"yandere"}),l.unshift(new Promise((function(e,t){h({startIndex:0}).then((function(t){e(new Set(t))})).catch(t)})))),void l.reduce((function(t,a,i,s){return t.then((function(t){var s;const l=i-1;if(0===l)n=t;else{const a=null!==(s=e[l].isNegative)&&void 0!==s&&s;n.forEach((function(e,i,s){a===t.has(e)&&n.delete(e)}))}return a}))})).then((function(e){t(Array.from(n))})).catch(a)}}))},e.getTags=function(e,t){return new Promise((function(a,i){if("language"!==e&&"type"!==e&&void 0===(null==t?void 0:t.startWith)||("language"===e||"type"===e)&&void 0!==(null==t?void 0:t.startWith))i(new n("INVALID_VALUE","startingCharacter"));else if("type"===e)a([{type:"type",name:"doujinshi"},{type:"type",name:"manga"},{type:"type",name:"artistcg"},{type:"type",name:"gamecg"},{type:"type",name:"anime"}]);else{const n=t.startWith;o(u(e,{startWith:n})).then((function(t){let i="";i="language"===e?'(?<=")(?!all)[a-z]+(?=":)':"(?<=/tag/"+("male"===e||"female"===e?e+"%3A":"")+")[a-z0-9%]+(?=-all\\.html)";const s=t.toString("utf8").match(RegExp(i,"g"))||[],l=RegExp("^(?=["+n+"])[a-z0-9%]+$");let o=[];for(let t=0;t<s.length;t++){const n=decodeURIComponent(s[t]);l.test(s[t])&&o.push({type:e,name:n})}a(o)})).catch(i)}}))}}(hitomi||(hitomi={})),exports.default=hitomi;