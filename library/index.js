"use strict";var __classPrivateFieldGet=this&&this.__classPrivateFieldGet||function(e,t,a,n){if("a"===a&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===a?n:"a"===a?n.call(e):n?n.value:t.get(e)},__classPrivateFieldSet=this&&this.__classPrivateFieldSet||function(e,t,a,n,s){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!s)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?s.call(e,a):s?s.value=a:t.set(e,a),a};Object.defineProperty(exports,"__esModule",{value:!0});const https_1=require("https"),tls_1=require("tls");var hitomi;!function(e){var t,a,n,s;const i=["artist","group","parody","character"];class l extends Error{constructor(e,t){super("Unknown"),this.code="UNKNOWN",this.code=e;const a=t.includes("'")?"`":"'";switch(t=a+t+a,e){case"INVALID_VALUE":this.message="Value of "+t+" was not valid";break;case"DUPLICATED_ELEMENT":this.message="Element of "+t+" was duplicated";break;case"LACK_OF_ELEMENT":this.message="Elements of "+t+" was not enough";break;case"REQEUST_REJECTED":this.message="Request to "+t+" was rejected";break;case"INVALID_SEQUENCE":this.message="Must execute "+t+" before"}}get name(){return"HitomiError ["+this.code+"]"}}function r(e){let t=new ArrayBuffer(e.byteLength),a=new Uint8Array(t);for(let t=0;t<e.byteLength;++t)a[t]=e[t];const n=new DataView(t),s=n.byteLength/4;let i=new Set;for(let e=0;e<s;e++)i.add(n.getInt32(4*e));return i}const o=new class extends https_1.Agent{createConnection(e,t){return(0,tls_1.connect)(Object.assign(e,{servername:void 0}),t)}};function c(e,t={}){return new Promise((function(a,n){const s=new URL(e);(0,https_1.request)({hostname:s.hostname,path:s.pathname,method:"GET",port:443,headers:Object.assign(t,{Accept:"*/*",Connection:"keep-alive",Referer:"https://hitomi.la"}),agent:o},(function(t){let s=[],i=0;switch(t.statusCode){case 200:case 206:t.on("data",(function(e){s.push(e),i+=e.byteLength})).on("error",(function(){n(new l("REQEUST_REJECTED",e))})).on("end",(function(){a(Buffer.concat(s,i))}));break;default:n(new l("REQEUST_REJECTED",e))}})).on("error",(function(){n(new l("REQEUST_REJECTED",e))})).end()}))}function h(e={}){var t;const a="language"===(null===(t=e.tag)||void 0===t?void 0:t.type);let n="",s="all";if("object"!=typeof e.tag||a)a&&(s=e.tag.name),n=e.orderByPopularityPeriod||"index";else switch(e.tag.type){case"male":case"female":n="tag/"+e.tag.type+":"+e.tag.name.replace(/_/g," ");break;default:n=e.tag.type+"/"+e.tag.name.replace(/_/g," ")}return"https://ltn.hitomi.la/"+("string"!=typeof e.orderByPopularityPeriod?"n":"popular")+"/"+("day"!==n?n:"today")+"-"+s+".nozomi"}function g(e,t={}){const a="language"!==e;if(void 0!==t.startWith===a){let n="ltn.",s="all";if(a){switch(e){case"tag":case"male":case"female":s+="tags";break;case"artist":case"series":case"character":case"group":s+=e+("s"!==e.charAt(e.length-1)?"s":"");break;default:throw new l("INVALID_VALUE","extension")}s+="-"+("0-9"!==t.startWith?t.startWith:"123")+".html"}else n="",s="language_support.js";return"https://"+n+"hitomi.la/"+s}throw new l("INVALID_VALUE","options['startWith']")}e.getNozomiUrl=h,e.getTagUrl=g;a=new WeakMap,n=new WeakMap,t=new WeakSet,s=function e(a,n){let s="";const i=Object.keys(a);if(void 0===n)for(let n=0;n<i.length;n++)s+=__classPrivateFieldGet(this,t,"m",e).call(this,a[i[n]],i[n]);else{s+="|"+n+"(";let l=!1;for(let n=0;n<i.length;n++)""===i[n]?l=!0:0!==Object.keys(a[i[n]]).length&&(s+=__classPrivateFieldGet(this,t,"m",e).call(this,a[i[n]],i[n]));s+=")",l&&(s+="?")}return s},e.ImageUrlResolver=class{constructor(){t.add(this),a.set(this,void 0),n.set(this,void 0)}synchronize(){const e=this;return new Promise((function(i,r){c("https://ltn.hitomi.la/gg.js").then((function(o){var c;const h=o.toString();if(__classPrivateFieldSet(e,a,(null===(c=h.slice(-64).match(/(?<=b:\s\')[0-9]+(?=\/\')/))||void 0===c?void 0:c[0])||void 0,"f"),void 0!==__classPrivateFieldGet(e,a,"f")){const a=h.match(/(?<=case\s)[0-9]+(?=:)/g)||[];let o={};for(let e=0;e<a.length;e++){let t=o;const n=a[e].split("");for(let e=0;e<n.length;e++)"object"!=typeof t[n[e]]&&(t[n[e]]={}),t=t[n[e]],e===n.length-1&&(t[""]={})}let c=__classPrivateFieldGet(e,t,"m",s).call(e,o).replace(/\(\)\?|((?<=\()|^)\||\((?=\|[0-9]\(\)\?\))|(?<=\(\|[0-9]\(\)\?)\)|\|(?=[0-9]\(\))/g,"").split(/\((?=[0-9]{2,}\))|(?<=\([0-9]{2,})\)/);for(let e=0;e<c.length;e++)if(e%2==1){let t=c[e].split(""),a=0;for(let e=0;e<t.length;e++)e+a<t.length&&Number(t[e])+a===Number(t[e+a])?(a++,e--):1!==a&&(t[e]+="-"+t[e+a-1],t=t.slice(0,e+1).concat(t.slice(e+a)),a=0);c[e]="["+t.join("")+"]"}__classPrivateFieldSet(e,n,new RegExp(c.join("")),"f"),"(?:)"!==__classPrivateFieldGet(e,n,"f").source?i(e):r(new l("INVALID_VALUE","ImageUrlResolver['#subdomainRegularExpression']"))}else r(new l("INVALID_VALUE","ImageUrlResolver['#pathCode']"))}))}))}getImageUrl(e,t,s={}){if("string"==typeof __classPrivateFieldGet(this,a,"f")&&__classPrivateFieldGet(this,n,"f")instanceof RegExp){switch(s.isThumbnail="boolean"==typeof s.isThumbnail&&s.isThumbnail,s.isSmall="boolean"==typeof s.isSmall&&s.isSmall,t){case"webp":case"avif":if(e["has"+t.charAt(0).toUpperCase()+t.slice(1)])break;default:throw new l("INVALID_VALUE","extension")}if(/^[0-9a-f]{64}$/.test(e.hash)){if(Number.isInteger(e.index)&&e.index>=0){const i=String(Number.parseInt(e.hash.slice(-1)+e.hash.slice(-3,-1),16));let r="a",o=t;if(s.isThumbnail){if(s.isSmall){if("avif"!==t)throw new l("INVALID_VALUE","options['isSmall']");o+="small"}o+="bigtn/"+e.hash.slice(-1)+"/"+e.hash.slice(-3,-1)+"/"+e.hash,r="tn"}else o+="/"+__classPrivateFieldGet(this,a,"f")+"/"+i+"/"+e.hash;return"https://"+(__classPrivateFieldGet(this,n,"f").test(i)?"a":"b")+r+".hitomi.la/"+o+"."+t}throw new l("INVALID_VALUE","image['index']")}throw new l("INVALID_VALUE","image['hash']")}throw new l("INVALID_SEQUENCE","synchronize()")}},e.getVideoUrl=function(e){if("anime"===e.type)return"https://streaming.hitomi.la/videos/"+e.title.display.toLowerCase().replace(/\s/g,"-")+".mp4";throw new l("INVALID_VALUE","gallery['type']")},e.getGalleryUrl=function(e){return("https://hitomi.la/"+("artistcg"!==e.type?e.type:"cg")+"/"+encodeURIComponent(Buffer.from(e.title.japanese||e.title.display).slice(0,200).toString("utf-8")).replace(/\(|\)|'|%(2[0235F]|3[CEF]|5[BD]|7[BD])/g,"-")+(null!==e.languageName.local?"-"+encodeURIComponent(e.languageName.local):"")+"-"+e.id+".html").toLocaleLowerCase()},e.getSecondThumbnailIndex=function(e){return Math.ceil((e.files.length-1)/2)},e.getGallery=function(e,t={}){if(Number.isInteger(e)&&e>0)return new Promise((function(a,n){c("https://ltn.hitomi.la/galleries/"+e+".js").then((function(n){const s=JSON.parse(n.toString("utf8").slice(18));let l=JSON.parse('{"id":'+e+',"title":{"display":"'+s.title.replace(/\"/g,'\\"')+'","japanese":'+(null!==s.japanese_title?'"'+s.japanese_title.replace(/\"/g,'\\"')+'"':"null")+'},"type":"'+s.type+'","languageName":{"english":'+(null!==s.language?'"'+s.language+'"':"null")+',"local":'+(null!==s.language_localname?'"'+s.language_localname+'"':"null")+'},"artists":[],"groups":[],"series":[],"characters":[],"tags":[],"files":[],"publishedDate":null,"translations":[],"relatedIds":[]}');for(let e=0;e<i.length;e++){const t=i[e]+"s";if(null!==s[t])for(let a=0;a<s[t].length;a++)l["p"!==t.charAt(0)?t:"series"].push(s[t][a][i[e]])}if(null!==s.tags)for(let e=0;e<s.tags.length;e++){let t="tag";Boolean(s.tags[e].male)?t="male":Boolean(s.tags[e].female)&&(t="female"),l.tags.push({type:t,name:s.tags[e].tag})}if("boolean"==typeof t.includeFiles!==t.includeFiles)for(let e=0;e<s.files.length;e++)l.files.push({index:e,hash:s.files[e].hash,extension:s.files[e].name.split(".").pop(),hasAvif:Boolean(s.files[e].hasavif),hasWebp:Boolean(s.files[e].haswebp),width:s.files[e].width,height:s.files[e].height});if(l.publishedDate=new Date(s.date),"boolean"==typeof t.includeRelatedIds&&t.includeRelatedIds){for(let e=0;e<s.languages.length;e++)l.translations.push({id:Number(s.languages[e].galleryid),languageName:{english:s.languages[e].name,local:s.languages[e].language_localname}});l.relatedIds=s.related}a(l)})).catch(n)}));throw new l("INVALID_VALUE","id")},e.getIds=function(e={}){return new Promise((function(t,a){var n,s,i,o,g;const u=!Array.isArray(e.tags)||0===e.tags.length,[d,f]=[Number.isInteger(null===(n=e.range)||void 0===n?void 0:n.startIndex),Number.isInteger(null===(s=e.range)||void 0===s?void 0:s.endIndex)];!d||(null===(i=e.range)||void 0===i?void 0:i.startIndex)>=0?!f||(null===(o=e.range)||void 0===o?void 0:o.endIndex)>=((null===(g=e.range)||void 0===g?void 0:g.startIndex)||0)?(u?[]:e.tags).reduce((function(e,t){return e.then((function(e){return new Promise((function(a,n){c(h({tag:t})).then((function(n){const s=r(n),i="boolean"==typeof t.isNegative&&t.isNegative;e.forEach((function(t){i===s.has(t)&&e.delete(t)})),a(e)})).catch(n)}))}))}),u||"string"==typeof e.orderByPopularityPeriod||"boolean"==typeof e.tags[0].isNegative&&e.tags[0].isNegative?new Promise((function(t,a){c(h({orderByPopularityPeriod:e.orderByPopularityPeriod}),u?{Range:"bytes="+4*e.range.startIndex+"-"+(f?4*e.range.endIndex+3:"")}:void 0).then((function(e){t(r(e))})).catch(a)})):new Promise((function(t,a){c(h({tag:e.tags.shift()})).then((function(e){t(r(e))})).catch(a)}))).then((function(a){var n,s;let i=Array.from(a);e.reverseResult&&i.reverse(),u||!d&&!f||(i=i.slice(null===(n=e.range)||void 0===n?void 0:n.startIndex,null===(s=e.range)||void 0===s?void 0:s.endIndex)),t(i)})).catch(a):a(new l("INVALID_VALUE","options['range']['endIndex']")):a(new l("INVALID_VALUE","options['range']['startIndex']"))}))},e.getParsedTags=function(e){const t=e.split(" ");if(0!==t.length){let e=[],a=new Set;for(let n=0;n<t.length;n++){const s=t[n].replace(/^-/,"").split(":");if(2!==s.length||!/^(artist|group|series|tag|(languag|typ|mal|femal)e)$/.test(s[0])||!/^[^-_\.][a-z0-9-_.]+$/.test(s[1]))throw new l("INVALID_VALUE","splitTagStrings["+n+"]");{const i=s[0]+":"+s[1];if(a.has(i))throw new l("DUPLICATED_ELEMENT","splitTagStrings["+n+"]");e.push({type:s[0],name:s[1],isNegative:"-"===t[n].charAt(0)}),a.add(i)}}return e}throw new l("LACK_OF_ELEMENT","splitTagStrings")},e.getTags=function(e,t={}){return new Promise((function(a,n){const s="type"===e;void 0===t.startWith!=("language"!==e&&!s)?s?a([{type:"type",name:"anime"},{type:"type",name:"artistcg"},{type:"type",name:"doujinshi"},{type:"type",name:"gamecg"},{type:"type",name:"manga"}]):c(g(e,{startWith:t.startWith})).then((function(t){const n=t.toString("utf8").match(RegExp("language"===e?'(?<=")(?!all)[a-z]+(?=":)':"(?<=/tag/"+("male"===e||"female"===e?e+"%3A":"")+")[a-z0-9%]+(?=-all\\.html)","g"))||[];let s=[];for(let t=0;t<n.length;t++)s.push({type:e,name:decodeURIComponent(n[t])});a(s)})).catch(n):n(new l("INVALID_VALUE","options['startWith']"))}))}}(hitomi||(hitomi={})),exports.default=hitomi;