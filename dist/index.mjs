var e="hitomi.la",t="https://",a="INVALID_VALUE",n="DUPLICATED_ELEMENT",s="LACK_OF_ELEMENT",r="REQUEST_REJECTED",i=" must be ",o=" must have ",l=" must not be ",h="Request error on ",c="valid",g="duplicated",d="more elements",u=new Set(["artist","group","type","language","series","character","tag","male","female"]),f=new Set(["doujinshi","manga","artistcg","gamecg","anime","imageset"]),p=Symbol("isNegative"),m=class extends Error{constructor(e,...t){const a=y[e];if(!a)throw new Error(`Unknown error code: ${e}`);super(a(t)),this.name=`HitomiError[${e}]`}},y={[a]:e=>`${e[0]}${i}${e[1]||c}`,[n]:e=>`${e[0]}${l}${g}`,[s]:e=>`${e[0]}${o}${e[1]||d}`,[r]:e=>`${h}[${e[0]}]: ${e[1]}`};async function $(a,n){const s={method:"GET",headers:{...n||{},Accept:"*/*",Connection:"keep-alive",Referer:`${t}${e}`,Origin:`${t}${e}`}},i=await fetch(a,s);if(![200,206].includes(i.status))throw new m(r,i.status,a);if(!i?.body)throw new m(r,422,a);return i}async function w(e){const t=await e.arrayBuffer();return new Uint8Array(t)}async function b(n,s){const r=await $(`${t}ltn.${e}/galleries/${n}.js`,s).then((e=>e.text())).then((e=>JSON.parse(e.replace(/^var +\w+ *= */,""))));return console.log(r),{id:Number.parseInt(r.id),title:{display:r.title,japanese:r.japanese_title},type:r.type,languageName:{english:r.language,local:r.language_localname},artists:r.artists?.map((({artist:e})=>e))||[],groups:r.groups?.map((({group:e})=>e))||[],series:r.parodys?.map((({parody:e})=>e))||[],characters:r.characters?.map((({character:e})=>e))||[],tags:r.tags?.map((({tag:e,male:t,female:n})=>{if(t||n){if(""!=t||1!=n&&"1"!=n){if(""!=n||1!=t&&"1"!=t)throw new m(a,e);return{type:"male",name:e}}return{type:"female",name:e}}return{type:"tag",name:e}}))||[],files:r.files?.map((({hash:e,name:t,hasavif:a,haswebp:n,hasjxl:s,width:r,height:i},o)=>({index:o,hash:e,name:t,hasAvif:Boolean(a),hasWebp:Boolean(n),hasJxl:Boolean(s),width:r,height:i})))||[],publishedDate:new Date(r.date),translations:r.languages?.map((({galleryid:e,language_localname:t,name:a})=>({id:e,languageName:{english:a,local:t}}))),relatedIds:r.related}}function v(a={}){let n,s="";return"language"===a.tag?.type?n=a.popularityOrderBy?`-${a.tag.name}`:`index-${a.tag.name}`:"female"===a.tag?.type||"male"===a.tag?.type?(s="tag/",n=`/${a.tag.type}:${encodeURIComponent(a.tag.name)}-all`):a.tag?(s=`${a.tag?.type}/`,n=`/${encodeURIComponent(a.tag.name)}-all`):n=a.popularityOrderBy?"-all":"index-all",a.popularityOrderBy&&(n="day"===a.popularityOrderBy?`popular/today${n}`:`popular/${a.popularityOrderBy}${n}`),`${t}ltn.${e}/${s}${n}.nozomi`}function E(e,t=!1){const n=e.length;if(3&n)throw new m(a,"buffer length","multiple of 4");const s=new Set;s[p]=t;for(let t=0;t<n;t+=4)s.add(255===e[t]?(e[t+1]<<16|e[t+2]<<8|e[t+3])-16777216:e[t+1]<<16|e[t+2]<<8|e[t+3]);return s}async function B(e){const t=(new TextEncoder).encode(e),a=await crypto.subtle.digest("SHA-256",t);return new Uint8Array(a.slice(0,4))}var I=class{view;offset=0;constructor(e){this.view=new DataView(e)}readInt32BE(){const e=this.view.getInt32(this.offset,!1);return this.offset+=4,e}readBigUInt64BE(){const e=this.view.getBigUint64(this.offset,!1);return this.offset+=8,e}readBytes(e){const t=new Uint8Array(this.view.buffer,this.view.byteOffset+this.offset,e);return this.offset+=e,t}get position(){return this.offset}};async function U(a,n){const s=await $(`${t}ltn.${e}/galleriesindex/galleries.${n}.index`,{Range:`bytes=${a}-${a+463n}`});if(206===s.status){const e=await s.arrayBuffer();if(e.byteLength>0)return function(e){const t=new I(e),a={keys:[],datas:[],subnodeAddresses:[]},n=t.readInt32BE();for(let e=0;e<n;e++){const e=t.readInt32BE();if(!(e>0&&e<32))throw new Error("Invalid keySize: must be between 1 and 31");a.keys.push(t.readBytes(e))}const s=t.readInt32BE();for(let e=0;e<s;e++)a.datas.push([t.readBigUInt64BE(),t.readInt32BE()]);for(let e=0;e<17;e++)a.subnodeAddresses.push(t.readBigUInt64BE());return a}(e)}}function A(e,t){const a=Math.min(e.length,t.length);for(let n=0;n<a;n++)if(e[n]!==t[n])return e[n]<t[n]?-1:1;return e.length-t.length}async function C(e,t,a){if(0===t.keys.length)return;let n=0,s=-1;for(;n<t.keys.length&&(s=A(e,t.keys[n]),!(s<=0));)n++;if(0===s)return t.datas[n];if(0n===t.subnodeAddresses[n])return;if(t.subnodeAddresses.every((e=>0n===e)))return;const r=await U(t.subnodeAddresses[n],a);return r?C(e,r,a):void 0}async function x(a={}){const n=await $(`${t}ltn.${e}/galleriesindex/version`),s=await n.text();let r;const i=v({popularityOrderBy:a.popularityOrderBy}),o=void 0!==a.range?.start||void 0!==a.range?.end?{Range:`bytes=${4*(a.range?.start??0)}-${4*(a.range?.end??0)-1}`}:void 0;if(r=E(await $(i,o).then((e=>w(e))).then((e=>e))),a.title?.trim()){const n=a.title.toLowerCase().trim().split(/\s+/);for(const a of n){if(!a)continue;const n=await B(a),i=await U(0n,s);if(!i)continue;const o=await C(n,i,s);if(!o){r=E(new Uint8Array(0));break}const[l,h]=o,c=`${t}ltn.${e}/galleriesindex/galleries.${s}.data`,g=`bytes=${l+4n}-${l+BigInt(h)-1n}`,d=E(await $(c,{Range:g}).then((e=>w(e))).then((e=>e))),u=E(new Uint8Array(0));u[p]=r[p];for(const e of r)d.has(e)&&u.add(e);if(r=u,0===r.size)break}}if(a.tags?.length)for(const e of a.tags){const t=v({tag:e}),a=E(await $(t).then((e=>w(e))).then((e=>e)),e.isNegative);if(e.isNegative)for(const e of a)r.delete(e);else for(const e of r)a.has(e)||r.delete(e)}let l=Array.from(r);if(a.range&&(a.title||a.tags)){const e=a.range.start||0,t=a.range.end||l.length;l=l.slice(e,t)}return l}function N(e,t){const n=new Set;return e.split(t||/\s+/).forEach((e=>{const t=e.startsWith("-"),[s,r]=(t?e.slice(1):e).split(":").map((e=>e.trim()));if(!u.has(s))throw new m(a,s);n.add({type:s,name:r,isNegative:t})})),n}function O(n,r){if("language"===n)return`${t}ltn.${e}/language_support.js`;if(!r)throw new m(s,"non-language types","startsWith");if("0-9"!==r&&!/^[a-z]$/.test(r))throw new m(a,"startsWith");if(!u.has(n)||"type"===n)throw new m(a,"type");let i="all";return i+="tag"===n||"female"===n||"male"===n?"tags":"series"===n?n:n+"s",i+=`-${"0-9"!==r?r:"123"}.html`,`${t}${e}/${i}`}async function S(e,t){if(!u.has(e))throw new m(a,"type");if("type"===e)return Promise.resolve(Array.from(f,(e=>({type:"type",name:e}))));const n=O(e,t),s=await $(n).then((e=>e.text())).then((e=>e));if("language"===e){const e=JSON.parse(s.replace(/^\/(.|\n)*language_localname *= */,"").replace(/;$/,""));return Object.entries(e).map((([e])=>({type:"language",name:e})))}const r=[],i=new RegExp(("male"===e||"female"===e?`/${e}%3A`:`${e}/`)+"[^-]+","g"),o=s.match(i);return o?(o.map((t=>{"male"===e||"female"===e?r.push({type:e,name:decodeURIComponent(t.replace(`/${e}%3A`,""))}):r.push({type:e,name:decodeURIComponent(t.replace(`${e}/`,""))})})),r):r}function R(n){if("anime"!==n.type)throw new m(a,"type","anime");return`${t}streaming.${e}/videos/${n.title.display.toLowerCase().replace(/\s/g,"-")}.mp4`}function T(a){return`${t}${e}/galleries/${"string"==typeof a||"number"==typeof a?a:a.id}.html`}var k=class{static#e;static#t;static#a=new Set;static#n;static async synchronize(){this.#n=await $(`${t}ltn.${e}/gg.js`).then((async e=>await e.text()));let n=0,s=this.#n.indexOf("\n");for(this.#a.clear();-1!==s;){switch(this.#n[n]){case"c":this.#a.add(Number(this.#n.slice(n+5,s-1)));break;case"o":this.#t="0"===this.#n[n+4];break;case"b":this.#e=this.#n.slice(n+4,s-2)}n=s+1,s=this.#n.indexOf("\n",n)}if(this.#a.has(NaN))throw this.#a.clear(),new m(a,"/gg.js")}static getImageUri(n,s,r){if(!r?.isThumbnail&&r?.isSmall)throw new m(a,"isSmall","used w/ isThumbnail");if(!this.#a.size)throw new m(a,"getImageUri","called after synchronize");if(!n[`has${s[0].toUpperCase()}${s.slice(1)}`])throw new m(a,`${n.name}`,`${s}`);let i=s,o="a";const l=[n.hash.slice(-1),n.hash.slice(-3,-1)],h=Number.parseInt(l[0]+l[1],16);return r?.isThumbnail?(i+=`${r.isSmall?"small":""}smalltn/${l[0]}/${l[1]}`,o="tn"):i+=`/${this.#e}/${h}`,`${t}${this.#a.has(h)===this.#t?"a":"b"}${o}.${e}/${i}/${n.hash}.${s}`}},_={getGallery:b,getGalleryIds:x,getParsedTags:N,getTags:S,getNozomiUri:v,getTagUri:O,getVideoUri:R,getGalleryUri:T,ImageUriResolver:k,edgeFetch:$};export{k as ImageUriResolver,_ as default,$ as edgeFetch,b as getGallery,x as getGalleryIds,T as getGalleryUri,v as getNozomiUri,N as getParsedTags,O as getTagUri,S as getTags,R as getVideoUri};