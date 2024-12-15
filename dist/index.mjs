var e="hitomi.la",t="https://",a="INVALID_VALUE",n="DUPLICATED_ELEMENT",s="LACK_OF_ELEMENT",r="REQUEST_REJECTED",i=" must be ",o=" must have ",l=" must not be ",g="Request error on ",h="valid",c="duplicated",d="more elements",u=new Set(["artist","group","type","language","series","character","tag","male","female"]),f=new Set(["doujinshi","manga","artistcg","gamecg","anime","imageset"]),p=Symbol("isNegative"),m=class extends Error{constructor(e,...t){const a=y[e];if(!a)throw new Error(`Unknown error code: ${e}`);super(a(t)),this.name=`HitomiError[${e}]`}},y={[a]:e=>`${e[0]}${i}${e[1]||h}`,[n]:e=>`${e[0]}${l}${c}`,[s]:e=>`${e[0]}${o}${e[1]||d}`,[r]:e=>`${g}[${e[0]}]${e[1]}`};async function w(a,n,s){const i={method:"GET",headers:{...s||{},Accept:"*/*",Connection:"keep-alive",Referer:`${t}${e}`,Origin:`${t}${e}`}},o=await fetch(`${t}${a}${e}${n}`,i);if(![200,206].includes(o.status))throw new m(r,o.status,n);if(!o?.body)throw new m(r,422,n);return o}async function $(e){const t=await e.arrayBuffer();return new Uint8Array(t)}async function b(e,t){const n=await w("ltn.",`/galleries/${e}.js`,t).then((e=>e.text())).then((e=>JSON.parse(e.replace(/^var +\w+ *= */,""))));return console.log(n),{id:Number.parseInt(n.id),title:{display:n.title,japanese:n.japanese_title},type:n.type,languageName:{english:n.language,local:n.language_localname},artists:n.artists?.map((({artist:e})=>e))||[],groups:n.groups?.map((({group:e})=>e))||[],series:n.parodys?.map((({parody:e})=>e))||[],characters:n.characters?.map((({character:e})=>e))||[],tags:n.tags?.map((({tag:e,male:t,female:n})=>{if(t||n){if(""!=t||1!=n&&"1"!=n){if(""!=n||1!=t&&"1"!=t)throw new m(a,e);return{type:"male",name:e}}return{type:"female",name:e}}return{type:"tag",name:e}}))||[],files:n.files?.map((({hash:e,name:t,hasavif:a,haswebp:n,hasjxl:s,width:r,height:i},o)=>({index:o,hash:e,name:t,hasAvif:Boolean(a),hasWebp:Boolean(n),hasJxl:Boolean(s),width:r,height:i})))||[],publishedDate:new Date(n.date),translations:n.languages?.map((({galleryid:e,language_localname:t,name:a})=>({id:e,languageName:{english:a,local:t}}))),relatedIds:n.related}}function U(a={}){let n,s="";return"language"===a.tag?.type?n=a.popularityOrderBy?`-${a.tag.name}`:`index-${a.tag.name}`:"female"===a.tag?.type||"male"===a.tag?.type?(s="tag/",n=`/${a.tag.type}:${encodeURIComponent(a.tag.name)}-all`):a.tag?(s=`${a.tag?.type}/`,n=`/${encodeURIComponent(a.tag.name)}-all`):n=a.popularityOrderBy?"-all":"index-all",a.popularityOrderBy&&(n="day"===a.popularityOrderBy?`popular/today${n}`:`popular/${a.popularityOrderBy}${n}`),`${t}ltn.${e}/${s}${n}.nozomi`}function v(e,t=!1){const n=e.length;if(3&n)throw new m(a,"buffer length","multiple of 4");const s=new Set;s[p]=t;for(let t=0;t<n;t+=4)s.add(255===e[t]?(e[t+1]<<16|e[t+2]<<8|e[t+3])-16777216:e[t+1]<<16|e[t+2]<<8|e[t+3]);return s}async function E(e){const t=(new TextEncoder).encode(e),a=await crypto.subtle.digest("SHA-256",t);return new Uint8Array(a.slice(0,4))}var B=class{view;offset=0;constructor(e){this.view=new DataView(e)}readInt32BE(){const e=this.view.getInt32(this.offset,!1);return this.offset+=4,e}readBigUInt64BE(){const e=this.view.getBigUint64(this.offset,!1);return this.offset+=8,e}readBytes(e){const t=new Uint8Array(this.view.buffer,this.view.byteOffset+this.offset,e);return this.offset+=e,t}get position(){return this.offset}};async function I(e,t){const a=await w("ltn.",`/galleriesindex/galleries.${t}.index`,new Headers({Range:`bytes=${e}-${e+463n}`}));if(206===a.status){const e=await a.arrayBuffer();if(e.byteLength>0)return function(e){const t=new B(e),a={keys:[],datas:[],subnodeAddresses:[]},n=t.readInt32BE();for(let e=0;e<n;e++){const e=t.readInt32BE();if(!(e>0&&e<32))throw new Error("Invalid keySize: must be between 1 and 31");a.keys.push(t.readBytes(e))}const s=t.readInt32BE();for(let e=0;e<s;e++)a.datas.push([t.readBigUInt64BE(),t.readInt32BE()]);for(let e=0;e<17;e++)a.subnodeAddresses.push(t.readBigUInt64BE());return a}(e)}}function A(e,t){const a=Math.min(e.length,t.length);for(let n=0;n<a;n++)if(e[n]!==t[n])return e[n]<t[n]?-1:1;return e.length-t.length}async function C(e,t,a){if(0===t.keys.length)return;let n=0,s=-1;for(;n<t.keys.length&&(s=A(e,t.keys[n]),!(s<=0));)n++;if(0===s)return t.datas[n];if(0n===t.subnodeAddresses[n])return;if(t.subnodeAddresses.every((e=>0n===e)))return;const r=await I(t.subnodeAddresses[n],a);return r?C(e,r,a):void 0}async function x(e={}){const t=await w("ltn.","/galleriesindex/version"),a=await t.text(),n=new URL(U({popularityOrderBy:e.popularityOrderBy})),s=void 0!==e.range?.start||void 0!==e.range?.end?new Headers({Range:`bytes=${4*(e.range?.start??0)}-${4*(e.range?.end??0)-1}`}):void 0,r=v(await w("ltn.",n.pathname,s).then((e=>$(e))).then((e=>e)));if(e.title?.trim()){const t=e.title.toLowerCase().trim().split(/\s+/);for(const e of t){if(!e)continue;const t=await E(e),n=await I(0n,a);if(!n)continue;const s=await C(t,n,a);if(!s)continue;const[i,o]=s,l=`/galleriesindex/galleries.${a}.data`,g=`bytes=${i+4n}-${i+BigInt(o)-1n}`,h=await w("ltn.",l,new Headers({Range:g})),c=await h.arrayBuffer(),d=v(new Uint8Array(c));for(const e of r)d.has(e)||r.delete(e)}}if(e.tags?.length)for(const t of e.tags){const e=new URL(U({tag:t})),a=v(await w("ltn.",e.pathname).then((e=>$(e))).then((e=>e)),t.isNegative);if(t.isNegative)for(const e of a)r.delete(e);else for(const e of r)a.has(e)||r.delete(e)}let i=Array.from(r);if(e.range&&(e.title||e.tags)){const t=e.range.start||0,a=e.range.end||i.length;i=i.slice(t,a)}return i}function N(e,t){const n=new Set;return e.split(t||/\s+/).forEach((e=>{const t=e.startsWith("-"),[s,r]=(t?e.slice(1):e).split(":").map((e=>e.trim()));if(!u.has(s))throw new m(a,s);n.add({type:s,name:r,isNegative:t})})),n}function R(n,r){if("language"===n)return`${t}ltn.${e}/language_support.js`;if(!r)throw new m(s,"non-language types","startsWith");if("0-9"!==r&&!/^[a-z]$/.test(r))throw new m(a,"startsWith");if(!u.has(n)||"type"===n)throw new m(a,"type");let i="all";return i+="tag"===n||"female"===n||"male"===n?"tags":"series"===n?n:n+"s",i+=`-${"0-9"!==r?r:"123"}.html`,`${t}${e}/${i}`}async function T(e,t){if(!u.has(e))throw new m(a,"type");if("type"===e)return Promise.resolve(Array.from(f,(e=>({type:"type",name:e}))));const n=new URL(R(e,t)).pathname,s=await w("ltn.",n).then((e=>e.text())).then((e=>e));if("language"===e){const e=JSON.parse(s.replace(/^\/(.|\n)*language_localname *= */,"").replace(/;$/,""));return Object.entries(e).map((([,e])=>({type:"language",name:e})))}const r=[],i=new RegExp(("male"===e||"female"===e?`/${e}%3A`:`${e}/`)+"[^-]+","g"),o=s.match(i);return o?(o.map((t=>{"male"===e||"female"===e?r.push({type:e,name:decodeURIComponent(t.replace(`/${e}%3A`,""))}):r.push({type:e,name:decodeURIComponent(t.replace(`${e}/`,""))})})),r):r}function O(n){if("anime"!==n.type)throw new m(a,"type","anime");return`${t}streaming.${e}/videos/${n.title.display.toLowerCase().replace(/\s/g,"-")}.mp4`}function S(a){return`${t}${e}/galleries/${"string"==typeof a||"number"==typeof a?a:a.id}.html`}var L=class{static#e;static#t;static#a=new Set;static#n;static async synchronize(){this.#n=await w("ltn.","/gg.js").then((async e=>await e.text()));let e=0,t=this.#n.indexOf("\n");for(this.#a.clear();-1!==t;){switch(this.#n[e]){case"c":this.#a.add(Number(this.#n.slice(e+5,t-1)));break;case"o":this.#t="0"===this.#n[e+4];break;case"b":this.#e=this.#n.slice(e+4,t-2)}e=t+1,t=this.#n.indexOf("\n",e)}if(this.#a.has(NaN))throw this.#a.clear(),new m(a,"/gg.js")}static getImageUri(n,s,r){if(!r.isThumbnail&&r.isSmall)throw new m(a,"isSmall","used w/ isThumbnail");if(!this.#a.size)throw new m(a,"getImageUri","called after synchronize");if(!n[`has${s[0].toUpperCase()}${s.slice(1)}`])throw new m(a,`${n.name}`,`${s}`);let i=s,o="a";const l=[n.hash.slice(-1),n.hash.slice(-3,-1)],g=Number.parseInt(l[0]+l[1],16);return r.isThumbnail?(i+=`${r.isSmall?"small":""}smalltn/${l[0]}/${l[1]}`,o="tn"):i+=`/${this.#e}/`,`${t}${this.#a.has(g)===this.#t?"a":"b"}${o}.${e}/${i}/${n.hash}.${s}`}},k={getGallery:b,getGalleryIds:x,getParsedTags:N,getTags:T,getNozomiUri:U,getTagUri:R,getVideoUri:O,getGalleryUri:S,ImageUriResolver:L,edgeFetch:w,default:{getGallery:b,getGalleryIds:x,getParsedTags:N,getTags:T,getNozomiUri:U,getTagUri:R,getVideoUri:O,getGalleryUri:S,ImageUriResolver:L,edgeFetch:w}};export{k as default};