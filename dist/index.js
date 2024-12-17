"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e="hitomi.la",t="https://",a="INVALID_VALUE",s="DUPLICATED_ELEMENT",n="LACK_OF_ELEMENT",r="REQUEST_REJECTED",i=" must be ",o=" must have ",l=" must not be ",g="Request error on ",h="valid",c="duplicated",d="more elements",u=new Set(["artist","group","type","language","series","character","tag","male","female"]),p=new Set(["doujinshi","manga","artistcg","gamecg","anime","imageset"]),f=Symbol("isNegative"),m=class extends Error{constructor(e,...t){const a=y[e];if(!a)throw new Error(`Unknown error code: ${e}`);super(a(t)),this.name=`HitomiError[${e}]`}},y={[a]:e=>`${e[0]}${i}${e[1]||h}`,[s]:e=>`${e[0]}${l}${c}`,[n]:e=>`${e[0]}${o}${e[1]||d}`,[r]:e=>`${g}[${e[0]}]: ${e[1]}`};async function $(a,s){const n={method:"GET",headers:{...s||{},Accept:"*/*",Connection:"keep-alive",Referer:`${t}${e}`,Origin:`${t}${e}`}},i=await fetch(a,n);if(![200,206].includes(i.status))throw new m(r,i.status,a);if(!i?.body)throw new m(r,422,a);return i}async function w(e){const t=await e.arrayBuffer();return new Uint8Array(t)}async function b(s,n){const r=await $(`${t}ltn.${e}/galleries/${s}.js`,n).then((e=>e.text())).then((e=>JSON.parse(e.replace(/^var +\w+ *= */,""))));return console.log(r),{id:Number.parseInt(r.id),title:{display:r.title,japanese:r.japanese_title},type:r.type,languageName:{english:r.language,local:r.language_localname},artists:r.artists?.map((({artist:e})=>e))||[],groups:r.groups?.map((({group:e})=>e))||[],series:r.parodys?.map((({parody:e})=>e))||[],characters:r.characters?.map((({character:e})=>e))||[],tags:r.tags?.map((({tag:e,male:t,female:s})=>{if(t||s){if(""!=t||1!=s&&"1"!=s){if(""!=s||1!=t&&"1"!=t)throw new m(a,e);return{type:"male",name:e}}return{type:"female",name:e}}return{type:"tag",name:e}}))||[],files:r.files?.map((({hash:e,name:t,hasavif:a,haswebp:s,hasjxl:n,width:r,height:i},o)=>({index:o,hash:e,name:t,hasAvif:Boolean(a),hasWebp:Boolean(s),hasJxl:Boolean(n),width:r,height:i})))||[],publishedDate:new Date(r.date),translations:r.languages?.map((({galleryid:e,language_localname:t,name:a})=>({id:e,languageName:{english:a,local:t}}))),relatedIds:r.related}}function v(a={}){let s,n="";return"language"===a.tag?.type?s=a.popularityOrderBy?`-${a.tag.name}`:`index-${a.tag.name}`:"female"===a.tag?.type||"male"===a.tag?.type?(n="tag/",s=`/${a.tag.type}:${encodeURIComponent(a.tag.name)}-all`):a.tag?(n=`${a.tag?.type}/`,s=`/${encodeURIComponent(a.tag.name)}-all`):s=a.popularityOrderBy?"-all":"index-all",a.popularityOrderBy&&(s="day"===a.popularityOrderBy?`popular/today${s}`:`popular/${a.popularityOrderBy}${s}`),`${t}ltn.${e}/${n}${s}.nozomi`}function x(e,t=!1){const s=e.length;if(3&s)throw new m(a,"buffer length","multiple of 4");const n=new Set;n[f]=t;for(let t=0;t<s;t+=4)n.add(255===e[t]?(e[t+1]<<16|e[t+2]<<8|e[t+3])-16777216:e[t+1]<<16|e[t+2]<<8|e[t+3]);return n}async function U(e){const t=(new TextEncoder).encode(e),a=await crypto.subtle.digest("SHA-256",t);return new Uint8Array(a.slice(0,4))}var E=class{view;offset=0;constructor(e){this.view=new DataView(e)}readInt32BE(){const e=this.view.getInt32(this.offset,!1);return this.offset+=4,e}readBigUInt64BE(){const e=this.view.getBigUint64(this.offset,!1);return this.offset+=8,e}readBytes(e){const t=new Uint8Array(this.view.buffer,this.view.byteOffset+this.offset,e);return this.offset+=e,t}get position(){return this.offset}};async function B(a,s){const n=await $(`${t}ltn.${e}/galleriesindex/galleries.${s}.index`,{Range:`bytes=${a}-${a+463n}`});if(206===n.status){const e=await n.arrayBuffer();if(e.byteLength>0)return function(e){const t=new E(e),a={keys:[],datas:[],subnodeAddresses:[]},s=t.readInt32BE();for(let e=0;e<s;e++){const e=t.readInt32BE();if(!(e>0&&e<32))throw new Error("Invalid keySize: must be between 1 and 31");a.keys.push(t.readBytes(e))}const n=t.readInt32BE();for(let e=0;e<n;e++)a.datas.push([t.readBigUInt64BE(),t.readInt32BE()]);for(let e=0;e<17;e++)a.subnodeAddresses.push(t.readBigUInt64BE());return a}(e)}}function I(e,t){const a=Math.min(e.length,t.length);for(let s=0;s<a;s++)if(e[s]!==t[s])return e[s]<t[s]?-1:1;return e.length-t.length}async function A(e,t,a){if(0===t.keys.length)return;let s=0,n=-1;for(;s<t.keys.length&&(n=I(e,t.keys[s]),!(n<=0));)s++;if(0===n)return t.datas[s];if(0n===t.subnodeAddresses[s])return;if(t.subnodeAddresses.every((e=>0n===e)))return;const r=await B(t.subnodeAddresses[s],a);return r?A(e,r,a):void 0}async function C(a={}){const s=await $(`${t}ltn.${e}/galleriesindex/version`),n=await s.text();let r;const i=v({popularityOrderBy:a.popularityOrderBy}),o=void 0!==a.range?.start||void 0!==a.range?.end?{Range:`bytes=${4*(a.range?.start??0)}-${4*(a.range?.end??0)-1}`}:void 0;if(r=x(await $(i,o).then((e=>w(e))).then((e=>e))),a.title?.trim()){const s=a.title.toLowerCase().trim().split(/\s+/);for(const a of s){if(!a)continue;const s=await U(a),i=await B(0n,n);if(!i)continue;const o=await A(s,i,n);if(!o){r=x(new Uint8Array(0));break}const[l,g]=o,h=`${t}ltn.${e}/galleriesindex/galleries.${n}.data`,c=`bytes=${l+4n}-${l+BigInt(g)-1n}`,d=x(await $(h,{Range:c}).then((e=>w(e))).then((e=>e))),u=x(new Uint8Array(0));u[f]=r[f];for(const e of r)d.has(e)&&u.add(e);if(r=u,0===r.size)break}}if(a.tags?.length)for(const e of a.tags){const t=v({tag:e}),a=x(await $(t).then((e=>w(e))).then((e=>e)),e.isNegative);if(e.isNegative)for(const e of a)r.delete(e);else for(const e of r)a.has(e)||r.delete(e)}let l=Array.from(r);if(a.range&&(a.title||a.tags)){const e=a.range.start||0,t=a.range.end||l.length;l=l.slice(e,t)}return l}function N(e,t){const s=new Set;return e.split(t||/\s+/).forEach((e=>{const t=e.startsWith("-"),[n,r]=(t?e.slice(1):e).split(":").map((e=>e.trim()));if(!u.has(n))throw new m(a,n);s.add({type:n,name:r,isNegative:t})})),s}function O(s,r){if("language"===s)return`${t}ltn.${e}/language_support.js`;if(!r)throw new m(n,"non-language types","startsWith");if("0-9"!==r&&!/^[a-z]$/.test(r))throw new m(a,"startsWith");if(!u.has(s)||"type"===s)throw new m(a,"type");let i="all";return i+="tag"===s||"female"===s||"male"===s?"tags":"series"===s?s:s+"s",i+=`-${"0-9"!==r?r:"123"}.html`,`${t}${e}/${i}`}async function T(e,t){if(!u.has(e))throw new m(a,"type");if("type"===e)return Promise.resolve(Array.from(p,(e=>({type:"type",name:e}))));const s=O(e,t),n=await $(s).then((e=>e.text())).then((e=>e));if("language"===e){const e=JSON.parse(n.replace(/^\/(.|\n)*language_localname *= */,"").replace(/;$/,""));return Object.entries(e).map((([,e])=>({type:"language",name:e})))}const r=[],i=new RegExp(("male"===e||"female"===e?`/${e}%3A`:`${e}/`)+"[^-]+","g"),o=n.match(i);return o?(o.map((t=>{"male"===e||"female"===e?r.push({type:e,name:decodeURIComponent(t.replace(`/${e}%3A`,""))}):r.push({type:e,name:decodeURIComponent(t.replace(`${e}/`,""))})})),r):r}function R(s){if("anime"!==s.type)throw new m(a,"type","anime");return`${t}streaming.${e}/videos/${s.title.display.toLowerCase().replace(/\s/g,"-")}.mp4`}function S(a){return`${t}${e}/galleries/${"string"==typeof a||"number"==typeof a?a:a.id}.html`}var k=class{static#e;static#t;static#a=new Set;static#s;static async synchronize(){this.#s=await $(`${t}ltn.${e}/gg.js`).then((async e=>await e.text()));let s=0,n=this.#s.indexOf("\n");for(this.#a.clear();-1!==n;){switch(this.#s[s]){case"c":this.#a.add(Number(this.#s.slice(s+5,n-1)));break;case"o":this.#t="0"===this.#s[s+4];break;case"b":this.#e=this.#s.slice(s+4,n-2)}s=n+1,n=this.#s.indexOf("\n",s)}if(this.#a.has(NaN))throw this.#a.clear(),new m(a,"/gg.js")}static getImageUri(s,n,r){if(!r?.isThumbnail&&r?.isSmall)throw new m(a,"isSmall","used w/ isThumbnail");if(!this.#a.size)throw new m(a,"getImageUri","called after synchronize");if(!s[`has${n[0].toUpperCase()}${n.slice(1)}`])throw new m(a,`${s.name}`,`${n}`);let i=n,o="a";const l=[s.hash.slice(-1),s.hash.slice(-3,-1)],g=Number.parseInt(l[0]+l[1],16);return r?.isThumbnail?(i+=`${r.isSmall?"small":""}smalltn/${l[0]}/${l[1]}`,o="tn"):i+=`/${this.#e}/${g}`,`${t}${this.#a.has(g)===this.#t?"a":"b"}${o}.${e}/${i}/${s.hash}.${n}`}},_={getGallery:b,getGalleryIds:C,getParsedTags:N,getTags:T,getNozomiUri:v,getTagUri:O,getVideoUri:R,getGalleryUri:S,ImageUriResolver:k,edgeFetch:$};exports.ImageUriResolver=k,exports.default=_,exports.edgeFetch=$,exports.getGallery=b,exports.getGalleryIds=C,exports.getGalleryUri=S,exports.getNozomiUri=v,exports.getParsedTags=N,exports.getTagUri=O,exports.getTags=T,exports.getVideoUri=R;