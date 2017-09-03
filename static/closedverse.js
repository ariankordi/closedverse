var splatoon = true
if(innerWidth <= 480) {
   splatoon = false;
}
var pjax_container = '#container'
/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){
"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});
/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
!function(t){
function e(e,a,r){return r=m(a,r),this.on("click.pjax",e,function(e){var a=r;a.container||(a=t.extend({},r),a.container=t(this).attr("data-pjax")),n(e,a)})}function n(e,n,a){a=m(n,a);var i=e.currentTarget,o=t(i);if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==i.protocol||location.hostname!==i.hostname||i.href.indexOf("#")>-1&&h(i)==h(location)||e.isDefaultPrevented())){var c={url:i.href,container:o.attr("data-pjax"),target:i},s=t.extend({},c,a),u=t.Event("pjax:click");o.trigger(u,[s]),u.isDefaultPrevented()||(r(s),e.preventDefault(),o.trigger("pjax:clicked",[s]))}}function a(e,n,a){a=m(n,a);var i=e.currentTarget,o=t(i);if("FORM"!==i.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var c={type:(o.attr("method")||"GET").toUpperCase(),url:o.attr("action"),container:o.attr("data-pjax"),target:i};if("GET"!==c.type&&void 0!==window.FormData)c.data=new FormData(i),c.processData=!1,c.contentType=!1;else{if(o.find(":file").length)return;c.data=o.serializeArray()}r(t.extend({},c,a)),e.preventDefault()}function r(e){function n(n,a,r){r||(r={}),r.relatedTarget=e.target;var i=t.Event(n,r);return c.trigger(i,a),!i.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,r.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var a=f(e.url).hash,i=t.type(e.container);if("string"!==i)throw"expected string value for 'container' option; got "+i;var c=e.context=t(e.container);if(!c.length)throw"the container selector '"+e.container+"' did not match anything";e.data||(e.data={}),t.isArray(e.data)?e.data.push({name:"_pjax",value:e.container}):e.data._pjax=e.container;var s;e.beforeSend=function(t,r){if("GET"!==r.type&&(r.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",e.container),!n("pjax:beforeSend",[t,r]))return!1;r.timeout>0&&(s=setTimeout(function(){n("pjax:timeout",[t,e])&&t.abort("timeout")},r.timeout),r.timeout=0);var i=f(r.url);a&&(i.hash=a),e.requestUrl=d(i)},e.complete=function(t,a){s&&clearTimeout(s),n("pjax:complete",[t,a,e]),n("pjax:end",[t,e])},e.error=function(t,a,r){var i=g("",t,e),c=n("pjax:error",[t,a,r,e]);"GET"==e.type&&"abort"!==a&&c&&o(i.url)},e.success=function(i,s,u){var p=r.state,d="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,h=u.getResponseHeader("X-PJAX-Version"),m=g(i,u,e),v=f(m.url);if(a&&(v.hash=a,m.url=v.href),d&&h&&d!==h)return void o(m.url);if(!m.contents)return void o(m.url);r.state={id:e.id||l(),url:m.url,title:m.title,container:e.container,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(r.state,m.title,m.url);var x=t.contains(c,document.activeElement);if(x)try{document.activeElement.blur()}catch(t){}m.title&&(document.title=m.title),n("pjax:beforeReplace",[m.contents,e],{state:r.state,previousState:p}),c.html(m.contents);var j=c.find("input[autofocus], textarea[autofocus]").last()[0];j&&document.activeElement!==j&&j.focus(),y(m.scripts);var w=e.scrollTo;if(a){var b=decodeURIComponent(a.slice(1)),T=document.getElementById(b)||document.getElementsByName(b)[0];T&&(w=t(T).offset().top)}"number"==typeof w&&t(window).scrollTop(w),n("pjax:success",[i,s,u,e])},r.state||(r.state={id:l(),url:window.location.href,title:document.title,container:e.container,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(r.state,document.title)),u(r.xhr),r.options=e;var h=r.xhr=t.ajax(e);return h.readyState>0&&(e.push&&!e.replace&&(j(r.state.id,[e.container,p(c)]),window.history.pushState(null,"",e.requestUrl)),n("pjax:start",[h,e]),n("pjax:send",[h,e])),r.xhr}function i(e,n){var a={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return r(t.extend(a,m(e,n)))}function o(t){window.history.replaceState(null,"",r.state.url),window.location.replace(t)}function c(e){P||u(r.xhr);var n,a=r.state,i=e.state;if(i&&i.container){if(P&&C==i.url)return;if(a){if(a.id===i.id)return;n=a.id<i.id?"forward":"back"}var c=D[i.id]||[],s=c[0]||i.container,l=t(s),d=c[1];if(l.length){a&&w(n,a.id,[s,p(l)]);var f=t.Event("pjax:popstate",{state:i,direction:n});l.trigger(f);var h={id:i.id,url:i.url,container:s,push:!1,fragment:i.fragment,timeout:i.timeout,scrollTo:!1};if(d){l.trigger("pjax:start",[null,h]),r.state=i,i.title&&(document.title=i.title);var m=t.Event("pjax:beforeReplace",{state:i,previousState:a});l.trigger(m,[d,h]),l.html(d),l.trigger("pjax:end",[null,h])}else r(h);l[0].offsetHeight}else o(location.href)}P=!1}function s(e){var n=t.isFunction(e.url)?e.url():e.url,a=e.type?e.type.toUpperCase():"GET",r=t("<form>",{method:"GET"===a?"GET":"POST",action:n,style:"display:none"});"GET"!==a&&"POST"!==a&&r.append(t("<input>",{type:"hidden",name:"_method",value:a.toLowerCase()}));var i=e.data;if("string"==typeof i)t.each(i.split("&"),function(e,n){var a=n.split("=");r.append(t("<input>",{type:"hidden",name:a[0],value:a[1]}))});else if(t.isArray(i))t.each(i,function(e,n){r.append(t("<input>",{type:"hidden",name:n.name,value:n.value}))});else if("object"==typeof i){var o;for(o in i)r.append(t("<input>",{type:"hidden",name:o,value:i[o]}))}t(document.body).append(r),r.submit()}function u(e){e&&e.readyState<4&&(e.onreadystatechange=t.noop,e.abort())}function l(){return(new Date).getTime()}function p(e){var n=e.clone();return n.find("script").each(function(){this.src||t._data(this,"globalEval",!1)}),n.contents()}function d(t){return t.search=t.search.replace(/([?&])(_pjax|_)=[^&]*/g,"").replace(/^&/,""),t.href.replace(/\?($|#)/,"$1")}function f(t){var e=document.createElement("a");return e.href=t,e}function h(t){return t.href.replace(/#.*/,"")}function m(e,n){return e&&n?(n=t.extend({},n),n.container=e,n):t.isPlainObject(e)?e:{container:e}}function v(t,e){return t.filter(e).add(t.find(e))}function x(e){return t.parseHTML(e,document,!0)}function g(e,n,a){var r={},i=/<html/i.test(e),o=n.getResponseHeader("X-PJAX-URL");r.url=o?d(f(o)):a.requestUrl;var c,s;if(i){s=t(x(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));var u=e.match(/<head[^>]*>([\s\S.]*)<\/head>/i);c=null!=u?t(x(u[0])):s}else c=s=t(x(e));if(0===s.length)return r;if(r.title=v(c,"title").last().text(),a.fragment){var l=s;"body"!==a.fragment&&(l=v(l,a.fragment).first()),l.length&&(r.contents="body"===a.fragment?l:l.contents(),r.title||(r.title=l.attr("title")||l.data("title")))}else i||(r.contents=s);return r.contents&&(r.contents=r.contents.not(function(){return t(this).is("title")}),r.contents.find("title").remove(),r.scripts=v(r.contents,"script[src]").remove(),r.contents=r.contents.not(r.scripts)),r.title&&(r.title=t.trim(r.title)),r}function y(e){if(e){var n=t("script[src]");e.each(function(){var e=this.src,a=n.filter(function(){return this.src===e});if(!a.length){var r=document.createElement("script"),i=t(this).attr("type");i&&(r.type=i),r.src=t(this).attr("src"),document.head.appendChild(r)}})}}function j(t,e){D[t]=e,U.push(t),b(R,0),b(U,r.defaults.maxCacheLength)}function w(t,e,n){var a,i;D[e]=n,"forward"===t?(a=U,i=R):(a=R,i=U),a.push(e),e=i.pop(),e&&delete D[e],b(a,r.defaults.maxCacheLength)}function b(t,e){for(;t.length>e;)delete D[t.shift()]}function T(){return t("meta").filter(function(){var e=t(this).attr("http-equiv");return e&&"X-PJAX-VERSION"===e.toUpperCase()}).attr("content")}function E(){t.fn.pjax=e,t.pjax=r,t.pjax.enable=t.noop,t.pjax.disable=S,t.pjax.click=n,t.pjax.submit=a,t.pjax.reload=i,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:T},t(window).on("popstate.pjax",c)}function S(){t.fn.pjax=function(){return this},t.pjax=s,t.pjax.enable=E,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).off("popstate.pjax",c)}var P=!0,C=window.location.href,A=window.history.state;A&&A.container&&(r.state=A),"state"in window.history&&(P=!1);var D={},R=[],U=[];t.event.props&&t.inArray("state",t.event.props)<0?t.event.props.push("state"):"state"in t.Event.prototype||t.event.addProp("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),t.support.pjax?E():S()}(jQuery);
/*! NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
!function(n,e){
"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():n.NProgress=e()}(this,function(){function n(n,e,t){return n<e?e:n>t?t:n}function e(n){return 100*(-1+n)}function t(n,t,r){var i;return i="translate3d"===c.positionUsing?{transform:"translate3d("+e(n)+"%,0,0)"}:"translate"===c.positionUsing?{transform:"translate("+e(n)+"%,0)"}:{"margin-left":e(n)+"%"},i.transition="all "+t+"ms "+r,i}function r(n,e){return("string"==typeof n?n:s(n)).indexOf(" "+e+" ")>=0}function i(n,e){var t=s(n),i=t+e;r(t,e)||(n.className=i.substring(1))}function o(n,e){var t,i=s(n);r(n,e)&&(t=i.replace(" "+e+" "," "),n.className=t.substring(1,t.length-1))}function s(n){return(" "+(n&&n.className||"")+" ").replace(/\s+/gi," ")}function a(n){n&&n.parentNode&&n.parentNode.removeChild(n)}var u={};u.version="0.2.0";var c=u.settings={minimum:.08,easing:"linear",positionUsing:"",speed:200,trickle:!0,trickleSpeed:200,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};u.configure=function(n){var e,t;for(e in n)void 0!==(t=n[e])&&n.hasOwnProperty(e)&&(c[e]=t);return this},u.status=null,u.set=function(e){var r=u.isStarted();e=n(e,c.minimum,1),u.status=1===e?null:e;var i=u.render(!r),o=i.querySelector(c.barSelector),s=c.speed,a=c.easing;return i.offsetWidth,l(function(n){""===c.positionUsing&&(c.positionUsing=u.getPositioningCSS()),d(o,t(e,s,a)),1===e?(d(i,{transition:"none",opacity:1}),i.offsetWidth,setTimeout(function(){d(i,{transition:"all "+s+"ms linear",opacity:0}),setTimeout(function(){u.remove(),n()},s)},s)):setTimeout(n,s)}),this},u.isStarted=function(){return"number"==typeof u.status},u.start=function(){u.status||u.set(0);var n=function(){setTimeout(function(){u.status&&(u.trickle(),n())},c.trickleSpeed)};return c.trickle&&n(),splatoon!=false?$("body").append('<div id="splatoon"></div>'):'',this},u.done=function(n){return n||u.status?($("#splatoon").remove(),u.inc(.3+.5*Math.random()).set(1)):this},u.inc=function(e){var t=u.status;return t?t>1?void 0:("number"!=typeof e&&(e=t>=0&&t<.2?.1:t>=.2&&t<.5?.04:t>=.5&&t<.8?.02:t>=.8&&t<.99?.005:0),t=n(t+e,0,.994),u.set(t)):u.start()},u.trickle=function(){return u.inc()},function(){var n=0,e=0;u.promise=function(t){return t&&"resolved"!==t.state()?(0===e&&u.start(),n++,e++,t.always(function(){0===--e?(n=0,u.done()):u.set((n-e)/n)}),this):this}}(),u.render=function(n){if(u.isRendered())return document.getElementById("nprogress");i(document.documentElement,"nprogress-busy");var t=document.createElement("div");t.id="nprogress",t.innerHTML=c.template;var r,o=t.querySelector(c.barSelector),s=n?"-100":e(u.status||0),l=document.querySelector(c.parent);return d(o,{transition:"all 0 linear",transform:"translate3d("+s+"%,0,0)"}),c.showSpinner||(r=t.querySelector(c.spinnerSelector))&&a(r),l!=document.body&&i(l,"nprogress-custom-parent"),l.appendChild(t),t},u.remove=function(){o(document.documentElement,"nprogress-busy"),o(document.querySelector(c.parent),"nprogress-custom-parent");var n=document.getElementById("nprogress");n&&a(n)},u.isRendered=function(){return!!document.getElementById("nprogress")},u.getPositioningCSS=function(){var n=document.body.style,e="WebkitTransform"in n?"Webkit":"MozTransform"in n?"Moz":"msTransform"in n?"ms":"OTransform"in n?"O":"";return e+"Perspective"in n?"translate3d":e+"Transform"in n?"translate":"margin"};var l=function(){function n(){var t=e.shift();t&&t(n)}var e=[];return function(t){e.push(t),1==e.length&&n()}}(),d=function(){function n(n){return n.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(n,e){return e.toUpperCase()})}function e(n){var e=document.body.style;if(n in e)return n;for(var t,r=i.length,o=n.charAt(0).toUpperCase()+n.slice(1);r--;)if((t=i[r]+o)in e)return t;return n}function t(t){return t=n(t),o[t]||(o[t]=e(t))}function r(n,e,r){e=t(e),n.style[e]=r}var i=["Webkit","O","Moz","ms"],o={};return function(n,e){var t,i,o=arguments;if(2==o.length)for(t in e)void 0!==(i=e[t])&&e.hasOwnProperty(t)&&r(n,t,i);else r(n,o[1],o[2])}}();return u});
//!Copyright(c) Max Irwin - 2011, 2015, 2016, MIT License
var floodfill=(function(){
function f(p,v,u,l,t,g,B){var k=p.length;var q=[];var o=(v+u*g)*4;var r=o,z=o,s,A,n=g*4;var h=[p[o],p[o+1],p[o+2],p[o+3]];if(!a(o,h,l,p,k,t)){return false}q.push(o);while(q.length){o=q.pop();if(e(o,h,l,p,k,t)){r=o;z=o;A=parseInt(o/n)*n;s=A+n;while(A<z&&A<(z-=4)&&e(z,h,l,p,k,t)){}while(s>r&&s>(r+=4)&&e(r,h,l,p,k,t)){}for(var m=z;m<r;m+=4){if(m-n>=0&&a(m-n,h,l,p,k,t)){q.push(m-n)}if(m+n<k&&a(m+n,h,l,p,k,t)){q.push(m+n)}}}}return p}function a(j,l,h,m,k,g){if(j<0||j>=k){return false}if(m[j+3]===0&&h.a>0){return true}if(Math.abs(l[3]-h.a)<=g&&Math.abs(l[0]-h.r)<=g&&Math.abs(l[1]-h.g)<=g&&Math.abs(l[2]-h.b)<=g){return false}if((l[3]===m[j+3])&&(l[0]===m[j])&&(l[1]===m[j+1])&&(l[2]===m[j+2])){return true}if(Math.abs(l[3]-m[j+3])<=(255-g)&&Math.abs(l[0]-m[j])<=g&&Math.abs(l[1]-m[j+1])<=g&&Math.abs(l[2]-m[j+2])<=g){return true}return false}function e(j,l,h,m,k,g){if(a(j,l,h,m,k,g)){m[j]=h.r;m[j+1]=h.g;m[j+2]=h.b;m[j+3]=h.a;return true}return false}function b(j,n,m,i,k,g,o){if(!j instanceof Uint8ClampedArray){throw new Error("data must be an instance of Uint8ClampedArray")}if(isNaN(g)||g<1){throw new Error("argument 'width' must be a positive integer")}if(isNaN(o)||o<1){throw new Error("argument 'height' must be a positive integer")}if(isNaN(n)||n<0){throw new Error("argument 'x' must be a positive integer")}if(isNaN(m)||m<0){throw new Error("argument 'y' must be a positive integer")}if(g*o*4!==j.length){throw new Error("width and height do not fit Uint8ClampedArray dimensions")}var l=Math.floor(n);var h=Math.floor(m);if(l!==n){console.warn("x truncated from",n,"to",l)}if(h!==m){console.warn("y truncated from",m,"to",h)}k=(!isNaN(k))?Math.min(Math.abs(Math.round(k)),254):0;return f(j,l,h,i,k,g,o)}var d=function(l){var h=document.createElement("div");var g={r:0,g:0,b:0,a:0};h.style.color=l;h.style.display="none";document.body.appendChild(h);var i=window.getComputedStyle(h,null).color;document.body.removeChild(h);var k=/([\.\d]+)/g;var j=i.match(k);if(j&&j.length>2){g.r=parseInt(j[0])||0;g.g=parseInt(j[1])||0;g.b=parseInt(j[2])||0;g.a=Math.round((parseFloat(j[3])||1)*255)}return g};function c(p,n,m,i,o,q,g){var s=this;var k=d(this.fillStyle);i=(isNaN(i))?0:i;o=(isNaN(o))?0:o;q=(!isNaN(q)&&q)?Math.min(Math.abs(q),s.canvas.width):s.canvas.width;g=(!isNaN(g)&&g)?Math.min(Math.abs(g),s.canvas.height):s.canvas.height;var j=s.getImageData(i,o,q,g);var l=j.data;var h=j.width;var r=j.height;if(h>0&&r>0){b(l,p,n,k,m,h,r);s.putImageData(j,i,o)}}if(typeof CanvasRenderingContext2D!="undefined"){CanvasRenderingContext2D.prototype.fillFlood=c}return b})();

function go(a) {
$.pjax({url: a, container: pjax_container});
}
function reload() {
$.pjax.reload(pjax_container);
}
function changesel(a) {
$("li.selected").removeClass("selected");
if(a !== undefined) {
		$("li#global-menu-" + a).addClass("selected");
	}
}
function prlinkConf() {
$('#container').prepend('<div class="dialog linkconfirmsuck none"><div class=dialog-inner><div class=window><h1 class=window-title>Confirm link</h1><div class=window-body><p class=window-body-content>Are you sure you want to visit <b>'+ass+'</b>?</p><div class=form-buttons><button class="olv-modal-close-button gray-button" type=button data-event-type=ok onclick="$(\'.linkconfirmsuck\').remove()">No</button><button class=black-button type=button onclick="go(\''+ass+'\');$(\'.linkconfirmsuck\').remove();">Yes</button></div></div></div></div></div>');
var g = new Olv.ModalWindow($('.linkconfirmsuck'));g.open();
}
function lights() {
$('#darkness').prop('disabled',function(a,b){return !b})
Olv.Form.get('/lights')
}
function setupDrawboard() {
        var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;
    
    function init() {
        canvas = $("#can")[0];
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
        canvas.addEventListener("mousedown",function(e) {findxy("down", e);canvas.addEventListener("mousemove",function(e){findxy("move",e);}, false);},false);canvas.addEventListener("mouseup",function (e){findxy("up", e);},false);canvas.addEventListener("mouseout",function(e){findxy("out",e);},false);
    }
    
    function color(col,size) {
        x = col;
        y = size;
    }
    
    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    
    function erase() {
        ctx.clearRect(0, 0, w, h);
        save();
    }
    
    function save() {
        var dataURL = canvas.toDataURL();
        if(typeof dataURL !== undefined) {
        $("input[type=hidden][name=painting]").attr("value", dataURL.split(",")[1]);
        }
	}
    
    function findxy(res, e) {
        if (res == "down") {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == "up" || res == "out") {
            flag = false;
        }
        if (res == "move") {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
init();
$("canvas").on("mousedown mouseup",function(e){e.type=="mouseup"?save():"";})
// save into a new element when save button is clicked
$(".memo-finish-btn").on("click", function() {
save();
$("#drawing").remove();
var val = $("input[type=hidden][name=painting]").attr("value");
$(".textarea-memo").append("<img id=\"drawing\" src=\"data:image/png;base64," + val + "\" style=\"background:white;\"></img>");
});
$("#setpen1").on("click", function() { color("black", 1); });
$("#setpen2").on("click", function() { color("black", 2); });
$("#setpen3").on("click", function() { color("black", 8); });
$("#seter1").on("click", function() { color("white", 2); });
$("#seter2").on("click", function() { color("white", 5); });
$("#seter3").on("click", function() { color("white", 15); });
$("#clear-can").on("click",  function() { erase(); });
}
var blank = /^[\s\u00A0\u3000]*$/
//!© Nintendo/Hatena 2012-2017 copyright@hatena.com
var Olv = Olv || {};
(function(a, b) {
    b.init || (b.init = a.Deferred(function() {
        a(this.resolve)
    }).promise(),
    b.Router = function() {
        this.routes = [],
        this.guard = a.Deferred()
    }
    ,
    a.extend(b.Router.prototype, {
        connect: function(a, b) {
            a instanceof RegExp || (a = new RegExp(a)),
            this.routes.push([a, b])
        },
        dispatch: function(b) {
            this.guard.resolve(b),
            this.guard = a.Deferred();
            for (var c, d = b.pathname, e = 0; c = this.routes[e]; e++) {
                var f = d.match(c[0]);
                f && c[1].call(this, f, b, this.guard.promise())
            }
        }
    }),
    b.router = new b.Router,
    a(document).on("pjax:end", function(c, d) {
        a(document).trigger("olv:pagechange", [d]),
        b.router.dispatch(location)
    }),
    b.init.done(function() {
        b.init.done(function() {
            b.router.dispatch(location)
        })
    }),
    b.Locale = {
        Data: {},
        text: function(a) {
            var c = Array.prototype.slice.call(arguments);
            return c.splice(1, 0, -1),
            b.Locale.textN.apply(this, c)
        },
        textN: function(a, c) {
            if (b.Cookie.get("plain_msgid"))
                return a;
            c = +c || 0;
            var d = b.Locale.Data[a];
            if (!d)
                return a;
            var e, f, g = d.quanttype || "o", h = "1_o" === g && 1 === c || "01_o" === g && (0 === c || 1 === c);
            if (h ? (e = d.text_value_1 || d.value_1,
            f = d.text_args_1 || d.args_1) : (e = d.text_value || d.value,
            f = d.text_args || d.args),
            !f)
                return e;
            var i = Array.prototype.slice.call(arguments, 2)
              , j = 0;
            return e.replace(/%s/g, function() {
                return i[f[j++] - 1]
            })
        }
    },
    b.loc = b.Locale.text,
    b.loc_n = b.Locale.textN,
    b.print = function(a) {
        "undefined" != typeof console && console.log(a)
    }
    ,
    b.deferredAlert = function(b) {
        var c = a.Deferred();
        return setTimeout(function() {
            alert(b),
            c.resolve()
        }, 0),
        c.promise()
    }
    ,
    b.deferredConfirm = function(b) {
        var c = a.Deferred();
        return setTimeout(function() {
            var a = confirm(b);
            c.resolve(a)
        }, 0),
        c.promise()
    }
    ,
    b.Cookie = {
        set: function(a, b, c) {
            var d = encodeURIComponent(a) + "=" + encodeURIComponent(b) + "; path=/";
            c && (d += "; expires=" + c.toUTCString()),
            document.cookie = d
        },
        get: function(a) {
            if (!a || !document.cookie)
                return void 0;
            for (var b = document.cookie.split("; "), c = 0; c < b.length; c++) {
                var d = b[c].split("=");
                if (a === decodeURIComponent(d[0]))
                    return decodeURIComponent(d[1])
            }
            return void 0
        }
    },
    b.ErrorViewer = {
        open: function(a) {
            a = a || {};
			
			if(!(Number.isInteger(a.error_code))) {
			return b.showMessage(a.error_code, a.message);
			}
            
			var c = +a.error_code
              , d = a.message || a.msgid && b.loc(a.msgid);
            c || (c = 0,
            d = d || b.loc("olv.portal.error.500.for_offdevice"));
            var e = String(c).match(/^([0-9]{3})([0-9]{4})$/);
            e && (c = e[1] + "-" + e[2]);
			if(c == 0) {
			var f = 'Error';
			} else {
            var f = b.loc("olv.portal.error.code", c);
			}
            return b.showMessage(f, d || "")
        }
    },
    b.Net = {
        ajax: function(c) {
            var d = a.ajax(c)
              , e = b.Net._pageId
              , f = d.then(function(c, d, f) {
                var g = b.Net._pageId === e
                  , h = c && "object" == typeof c && !c.success || !g
                  , i = [c, d, f, g];
                return h ? a.Deferred().rejectWith(this, i) : a.Deferred().resolveWith(this, i)
            }, function(c, d) {
                var f = b.Net.getDataFromXHR(c);
                void 0 === f && (f = c.responseText);
                var g = b.Net._pageId === e;
                return a.Deferred().rejectWith(this, [f, d, c, g])
            });
            return f.fail(b.Net.errorFeedbackHandler),
            f.promise(d),
            d
        },
        _pageId: 1,
        getDataFromXHR: function(b) {
            var c = b.responseText
              , d = b.getResponseHeader("Content-Type");
            if (c && d && /^application\/json(?:;|$)/.test(d))
                try {
                    return a.parseJSON(c)
                } catch (e) {}
            return void 0
        },
        getErrorFromXHR: function(a) {
            var c = b.Net.getDataFromXHR(a)
              , d = c && c.errors && c.errors[0];
            if (d && "object" == typeof d)
                return d;
            var e = a.status;
			if(a.responseText.length < 2 && e == 400) {
			return {
				error_code: "Bad Request",
				message: "The request or action sent was invalid. Try again?"
				}
			}
			switch(e) {
			case 404:
				return {
				error_code: "Not Found",
				message: "The resource or action couldn't be found.\n"
				}
			break;
			case 403:
				return {
				error_code: "Not Allowed (Forbidden)",
				message: "Try refreshing the page or logging back in.\n"
				}
			break;
			case 500:
				return {
				error_code: "Internal server error",
				message: "An internal error has occurred, try again later.\n"
				}
			break;
			default:
			return e ? 500 > e ? {
                error_code: 1210902,
                message: b.loc("olv.portal.error.failed_to_connect.for_offdevice")
            } : {
                error_code: 1219999,
                message: b.loc("olv.portal.error.500.for_offdevice")
            } : {
                error_code: 1219998,
                message: b.loc("olv.portal.error.network_unavailable.for_offdevice")
            }
			break;
			}
			
        },
        _isLeavingPage: !1,
        willLeavePage: function() {
            b.Net._isLeavingPage = !0,
            setTimeout(function() {
                b.Net._isLeavingPage = !1
            }, 100)
        },
        errorFeedbackHandler: function(a, c, d, e) {
            if ("abort" !== c && e && (d.status || !b.Net._isLeavingPage)) {
                var f = this
                  , g = arguments;
                setTimeout(function() {
                    b.Net._errorFeedbackHandler.apply(f, g)
                }, d.status ? 0 : 5e3)
            }
        },
        _errorFeedbackHandler: function(c, d, e, f) {
            var g = b.Net.getErrorFromXHR(e);
            this.silent || b.ErrorViewer.open(g),
            a(document).trigger("olv:ajax:error", [g, d, e])
        },
        get: function(a, c, d, e) {
            return b.Net.ajax({
                method: "GET",
                url: a,
                data: c,
                success: d,
                dataType: e,
				beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
            })
        },
        post: function(a, c, d, e) {
            return b.Net.ajax({
                method: "POST",
                url: a,
                data: c,
                success: d,
                dataType: e,
				beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
            })
        }
    },
    b.Browsing = {
        setup: function() {
            a(document).on("click", "[data-href]", this.onDataHrefClick),
            a(window).on("click submit", this.onMayLeavePage)
        },
        onDataHrefClick: function(c) {
            if (!c.isDefaultPrevented() && !a(c.target).closest("a,button").length) {
                var d = a(this);
                if (!d.hasClass("disabled")) {
                    var e = d.attr("data-href");
                    go(e);
                }
            }
        },
        onMayLeavePage: function(c) {
            c.isDefaultPrevented() || "click" === c.type && !a(c.target).closest("[href]").length || b.Net.willLeavePage()
        }
    },
    b.init.done(function() {
        b.Browsing.setup()
    }),
    b.Utils = {},
    b.Utils.toJSONString = "undefined" != typeof JSON ? JSON.stringify : function() {
        function a(a) {
            return "\\u" + (65536 + a.charCodeAt(0)).toString(16).substring(1)
        }
        function b(c) {
            switch (typeof c) {
            case "string":
                return '"' + c.replace(/[\u0000-\u001f\"\\\u2028\u2029]/g, a) + '"';
            case "number":
            case "boolean":
                return "" + c;
            case "object":
                if (!c)
                    return "null";
                var d = Object.prototype.toString.call(c).slice(8, -1);
                switch (d) {
                case "String":
                case "Number":
                case "Boolean":
                    return b(c.valueOf());
                case "Array":
                    for (var e = [], f = 0; f < c.length; f++)
                        e.push(b(c[f]));
                    return "[" + e.join(",") + "]";
                case "Object":
                    var e = [];
                    for (var f in c)
                        c.hasOwnProperty(f) && e.push(b(f) + ":" + b(c[f]));
                    return "{" + e.join(",") + "}"
                }
                return "null"
            }
            return "null"
        }
        return b
    }(),
    b.Utils._staticRoot = null,
    b.Utils.staticURL = function(c) {
        if (/^https?:/.test(c))
            return c;
        var d = b.Utils._staticRoot;
        return null === d && document.getElementById("main-body") && (d = b.Utils._staticRoot = (a("#main-body").attr("data-static-root") || "").replace(/\/$/, "")),
        (d || "") + c.replace(/^(?!\/)/, "/")
    }
    ,
    b.Utils.isIE8AndEarlierStyle = !!document.createStyleSheet && "undefined" == typeof document.documentElement.style.opacity,
    b.Utils.isIEStyle = !!window.TextRange,
    b.Utils.addPlatformClass = function() {
        var c = a(document.documentElement)
          , d = navigator.userAgent
          , e = /\bWin/.test(d) ? "win" : /\bMac/.test(d) ? "mac" : "other";
        c.addClass("os-" + e),
        b.Utils.isIE8AndEarlierStyle && c.addClass("ie8-earlier"),
        b.Utils.isIEStyle && c.addClass("ie")
    }
    ,
    b.Utils.addPlatformClass(),
    b.Utils.fixWebFontLoadTiming = function() {
        var a = document.createStyleSheet();
        a.cssText = ":before, :after { content: none !important; }",
        setTimeout(function() {
            var b = a.owningElement;
            b.parentNode.removeChild(b)
        }, 20)
    }
    ,
    b.Utils.isIE8AndEarlierStyle && b.init.done(b.Utils.fixWebFontLoadTiming),
    b.Utils.triggerHandlers = {
        keypress: function(b) {
            13 !== b.which || b.isDefaultPrevented() || (b.preventDefault(),
            a(this).click())
        },
        mouseup: function(a) {
            this.blur()
        }
    },
    b.init.done(function(a) {
        a(document).on(b.Utils.triggerHandlers, ".trigger")
    }),
    b.Content = {},
    b.Content.autopagerize = function(c, d) {
        function e() {
            if (!(k._disabledCount || h.scrollTop() + h.height() + 200 < f.offset().top + f.outerHeight())) {
                var d = a("<div/>").attr("class", "post-list-loading").append(a("<img/>").attr({
                    src: b.Utils.staticURL("/s/img/loading-image-blue.gif"),
                    alt: ""
                })).appendTo(f);
                i = a.ajax({
                    url: g,
                    headers: {
                        "X-AUTOPAGERIZE": !0
                    }
                }).done(function(b) {
                    var h = a("<div>" + b + "</div>").find(c);
                    g = h.attr("data-next-page-url") || "",
                    g || j.resolve(),
                    f.trigger("olv:autopagerize", [h, g, d]),
                    h.children().each(function() {
                        this.id && a("#" + this.id).length && a(this).detach()
                    }),
                    f.attr("data-next-page-url", g),
                    f.append(h.children()),
                    g && setTimeout(e, 0)
                }).always(function() {
                    d.remove(),
                    i = null
                }),
                k.disable(i)
            }
        }
        var f = a(c)
          , g = f.attr("data-next-page-url");
        if (g) {
            a("#main-body").addClass("is-autopagerized");
            var h = a(window)
              , i = null
              , j = a.Deferred()
              , k = b.Content.autopagerize;
            h.on("scroll", e),
            j.done(function() {
                h.off("scroll", e),
                i && i.abort(),
                a("#main-body").removeClass("is-autopagerized")
            }),
            setTimeout(e, 0),
            d.done(j.resolve)
        }
    }
    ,
    b.Content.autopagerize._disabledCount = 0,
    b.Content.autopagerize.disable = function(a) {
        var c = b.Content.autopagerize;
        c._disabledCount++,
        a.always(function() {
            c._disabledCount--
        })
    }
    ,
    b.Content.preloadImages = function() {
        for (var a = arguments.length, b = a; b--; ) {
            var c = document.createElement("img");
            c.src = arguments[b]
        }
    }
    ,
    b.Form = {
        toggleDisabled: function(c, d) {
            if(typeof mode_post !== 'undefined' && mode_post == 1) {
            d = false;
            }
            var e = void 0 === d;
            return c.each(function() {
                var c = a(this)
                  , f = e ? !b.Form.isDisabled(c) : d;
                if (c.toggleClass("disabled", f),
                "undefined" != typeof this.form)
                    c.prop("disabled", f);
                else {
                    var g = f ? "href" : "data-disabled-href"
                      , h = f ? "data-disabled-href" : "href"
                      , i = c.attr(g);
                    void 0 !== i && (c.removeAttr(g),
                    c.attr(h, i))
                }
            }),
            c
        },
        isDisabled: function(a) {
            return a.length && "undefined" != typeof a[0].form ? a.prop("disabled") : a.hasClass("disabled")
        },
        disable: function(a, c) {
            return b.Form.toggleDisabled(a, !0),
            c.always(function() {
                b.Form.toggleDisabled(a, !1)
            }),
            a
        },
        disableSoon: function(a, c) {
            return setTimeout(function() {
                "pending" === c.state() && b.Form.toggleDisabled(a, !0)
            }, 0),
            c.always(function() {
                b.Form.toggleDisabled(a, !1)
            }),
            a
        },
        emulateInputEvent: function(b, c) {
            if (b.length && "undefined" == typeof b[0].oninput) {
                var d = a.map(b, function(a) {
                    return a.value
                })
                  , e = setInterval(function() {
                    for (var c = 0, e = b.length; e > c; c++) {
                        var f = b[c].value;
                        f !== d[c] && (d[c] = f,
                        a(b[c]).trigger("input"))
                    }
                }, 100);
                c.always(function() {
                    clearInterval(e)
                })
            }
        },
        submit: function(b, c) {
            b.trigger("olv:form:submit", [c || a()]);
            var d = b.serializeArray()
              , e = c && c.is("input, button") && c.prop("name");
            e && d.push({
                name: e,
                value: c.val()
            });
            var f = {
                method: b.prop("method"),
                url: b.attr("action"),
                data: d
            };
            return this.send(f, c)
        },
        get: function(a, b, c) {
            var d = {
                method: "GET",
                url: a,
                data: b
            };
            return this.send(d, c)
        },
        _csrfmiddlewaretoken: null,
        csrfmiddlewaretoken: function() {
            return null === b.Form._csrfmiddlewaretoken && (b.Form._csrfmiddlewaretoken = a("#main-body").attr("csrf-token")),
            b.Form._csrfmiddlewaretoken
        },
        post: function(c, d, e) {
            d || (d = {}),
            a.isArray(d) ? d.push({
                name: "csrfmiddlewaretoken",
                value: b.Form.csrfmiddlewaretoken()
            }) : d.csrfmiddlewaretoken = b.Form.csrfmiddlewaretoken();
            var f = {
                method: "POST",
                url: c,
                data: d
            };
            return this.send(f, e)
        },
        send: function(c, d) {
            var e = b.Net.ajax(c);
            return a(document).trigger("olv:form:send", [e, c, d || a()]),
            d && (b.Form.disableSoon(d, e),
            d.addClass("loading"),
            e.always(function() {
                d.removeClass("loading")
            })),
            e
        },
        updateParentClass: function(c) {
            switch (c.type) {
            case "radio":
                var d = a(c.form ? c.form.elements[c.name] : 'input[name="' + c.name + '"]');
                d.each(function() {
                    a(this).parent().toggleClass("checked", this.checked)
                }),
                b.Utils.isIE8AndEarlierStyle && d.parent().addClass("changing").removeClass("changing");
                break;
            case "checkbox":
                a(c).parent().toggleClass("checked", c.checked)
            }
        },
        setup: function() {
            a(document).on("click", "input", function(a) {
                a.isDefaultPrevented() || b.Form.updateParentClass(this)
            })
        },
        setupForPage: function() {
            a("input:checked").each(function() {
                b.Form.updateParentClass(this)
            })
        },
        reset: function(c) {
            c.each(function() {
                this.reset(),
                a(this).find("input").each(function() {
                    b.Form.updateParentClass(this)
                })
            })
        },
        validateValueLength: function(b) {
            var c = a(this);
            c.find("[minlength], [maxlength]").each(function() {
                var c = a(this)
                  , d = +c.attr("minlength");
                isNaN(d) && (d = -(1 / 0));
                var e = +c.attr("maxlength");
                isNaN(e) && (e = 1 / 0);
                var f = c.val();
                return f.length >= d && f.length <= e ? void 0 : void b.preventDefault()
            })
        }
    },
    b.init.done(b.Form.setup),
    b.router.connect("", b.Form.setupForPage),
    b.Guest = {
        isGuest: function() {
            return a("main-body").hasClass("guest")
        }
    },
    b.DecreasingTimer = function(a, b, c) {
        this.callback_ = a,
        this.initialInterval_ = b || 1e4,
        this.maxInterval_ = c || 1 / 0,
        this.interval_ = this.initialInterval_,
        this.timeouts_ = []
    }
    ,
    b.DecreasingTimer.prototype.resetInterval = function() {
        this.interval_ = this.initialInterval_,
        this.clearAllTimeouts(),
        this.invoke()
    }
    ,
    b.DecreasingTimer.prototype.clearAllTimeouts = function() {
        a(this.timeouts_).each(a.proxy(function(a, b) {
            this.clearTimeout(b)
        }, this))
    }
    ,
    b.DecreasingTimer.prototype.clearTimeout = function(a) {
        for (var b = 0, c = this.timeouts_.length; c > b; ++b)
            if (this.timeouts_[b] == a) {
                clearTimeout(this.timeouts_[b]),
                this.timeouts_.splice(b, 1);
                break
            }
    }
    ,
    b.DecreasingTimer.prototype.invoke = function() {
        this.callback_();
        var b;
        b = setTimeout(a.proxy(function() {
            this.invoke(),
            this.clearTimeout(b)
        }, this), this.interval_),
        this.timeouts_.push(b),
        this.interval_ = Math.min(Math.floor(1.5 * this.interval_), this.maxInterval_)
    }
    ,
    b.UpdateChecker = function(a, c) {
        this._settings = {},
        b.DecreasingTimer.call(this, this.callback_, a, c)
    }
    ,
    b.UpdateChecker.prototype = new b.DecreasingTimer,
    b.UpdateChecker.getInstance = function() {
        return void 0 == b.UpdateChecker.instance && (b.UpdateChecker.instance = new b.UpdateChecker(2e4,18e5)),
        b.UpdateChecker.instance
    }
    ,
    b.UpdateChecker.prototype.callback_ = function() {
		
        var c = {};
        a.each(this._settings, a.proxy(function(d) {
            void 0 != this._settings[d].pathname && this._settings[d].pathname != location.pathname ? delete this._settings[d] : a.each(this._settings[d].params, a.proxy(function(a, d) {
                c[a] = b.Utils.toJSONString(d)
            }, this))
        }, this)),
        b.Net.ajax({
            url: "/notif_count.json",
            silent: !0,
            cache: !1
        }).done(a.proxy(function(b) {
            a(this).triggerHandler("update", [b])
        }, this))
		
    }
    ,
    b.UpdateChecker.prototype.onUpdate = function(a, b, c, d) {
        this._settings[a] = {
            params: b,
            update: c
        },
        d && (this._settings[a].pathname = location.pathname)
    }
    ,
    b.SocialButton = {},
    b.SocialButton.popUpDialog = function(a) {
        window.open(a.attr("data-share-url"), "openverse_share_" + a.attr("data-service-name"), ["width=" + a.attr("data-width"), "height=" + a.attr("data-height"), "location=yes", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=no", "status=no"].join(","))
    }
    ,
    b.SocialButton.onClick = function(c) {
        if (!c.isDefaultPrevented()) {
            c.preventDefault();
            var d = a(this);
            "1" === d.attr("data-is-popup") ? b.SocialButton.popUpDialog(d) : location.href = d.attr("data-share-url")
        }
    }
    ,
    b.SocialButton.setup = function(c) {
        a(document).on("click", ".social-button", b.SocialButton.onClick),
        c.done(function() {
            a(document).off("click", ".social-button", b.SocialButton.onClick)
        })
    }
    ,
    b.CookiePolicyNotice = {},
    b.CookiePolicyNotice.setup = function(c) {
        var d = a("#cookie-policy-notice");
        d.length && d.find(".js-cookie-policy-notice").on("click", function() {
            var a = new Date;
            a.setFullYear(a.getFullYear() + 1),
            b.Cookie.set("cookie_policy_notice_seen", "true", a),
            d.slideUp("fast", function() {
                d.remove()
            })
        })
    }
    ,
    b.OpenTruncatedTextButton = {},
    b.OpenTruncatedTextButton.setup = function(b) {
        var c = a(b);
        c.on("click", ".js-open-truncated-text-button", function(a) {
            a.preventDefault(),
            c.find(".js-truncated-text, .js-open-truncated-text-button").addClass("none"),
            c.find(".js-full-text").removeClass("none")
        })
    }
    ,
    b.ModalWindowManager = {},
    b.ModalWindowManager._windows = [],
    b.ModalWindowManager.currentWindow = null,
    b.ModalWindowManager.closeAll = function() {
        for (; this.currentWindow; )
            this.currentWindow.close()
    }
    ,
    b.ModalWindowManager.closeUntil = function(a) {
        if (a.guard)
            for (var b; (b = this.currentWindow) && (b.close(),
            b !== a); )
                ;
    }
    ,
    b.ModalWindowManager.register = function(a) {
        var b = this._windows;
        b.length ? b[b.length - 1].element.removeClass("active-dialog") : this.toggleMask(!0),
        a.element.addClass("active-dialog"),
        b.push(a),
        this.currentWindow = a
    }
    ,
    b.ModalWindowManager.unregister = function(a) {
        if (this.currentWindow !== a)
            throw new Error("Failed to unregister modal window");
        var b = this._windows;
        b.pop().element.removeClass("active-dialog");
        var c = b.length ? b[b.length - 1] : null;
        c ? c.element.addClass("active-dialog") : this.toggleMask(!1),
        this.currentWindow = c
    }
    ,
    b.ModalWindowManager._mask = null,
    b.ModalWindowManager.toggleMask = function(b) {
                if(a(".mask").length) {
                a(".mask").remove();
                } else {
    a("#main-body").append("<div class=mask>");
                }
    }
    ,
    b.ModalWindowManager.setup = function() {
        a(document).on("click", "[data-modal-open]", function(c) {
            var d = a(this);
            if (!b.Form.isDisabled(d) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var e = a.Event("olv:modalopen");
                if (d.trigger(e),
                !e.isDefaultPrevented()) {
                    var f = a(d.attr("data-modal-open"));
                    f.attr("data-is-template") && (f = f.clone().removeAttr("id"));
                    var g = new b.ModalWindow(f,this);
                    g.open()
                }
            }
        }),
        a(document).on("click", ".olv-modal-close-button", function(a) {
            if (!a.isDefaultPrevented()) {
                a.preventDefault();
                var c = b.ModalWindowManager.currentWindow;
                c && c.close()
            }
        }),
        a(document).on("olv:modal", function(a, c, d) {
            b.Content.autopagerize.disable(d)
        })
    }
    ,
    b.init.done(function() {
        b.ModalWindowManager.setup()
    }),
    a(document).on("olv:pagechange", function() {
        b.ModalWindowManager.closeAll()
    }),
    b.ModalWindow = function(b, c) {
        this.element = a(b),
        this.triggerElement = a(c),
        this.temporary = !this.element.parent().length;
        var d = a.trim(this.element.attr("data-modal-types"));
        this.types = d ? d.split(/\s+/) : [],
        this.guard = null
    }
    ,
    b.ModalWindow.prototype.open = function() {
        return this.guard ? void 0 : (document.activeElement && document.activeElement.blur(),
        b.ModalWindowManager.register(this),
        b.Form.toggleDisabled(this.triggerElement, !0),
        this.element.addClass("modal-window-open").removeClass("none"),
        this.temporary && this.element.appendTo(document.getElementById("main-body")),
        this.triggerOpenHandlers(a.Deferred()),
        this)
    }
    ,
    b.ModalWindow.prototype.triggerOpenHandlers = function(a) {
        this.guard = a;
        for (var b, c = [this, a.promise()], d = 0; b = this.types[d]; d++)
            this.element.trigger("olv:modal:" + b, c);
        this.element.trigger("olv:modal", c)
    }
    ,
    b.ModalWindow.prototype.close = function() {
        return this.guard ? (this.guard.resolve(),
        this.guard = null,
        b.ModalWindowManager.unregister(this),
        this.temporary && this.element.remove(),
        this.element.addClass("none").removeClass("modal-window-open"),
        b.Form.toggleDisabled(this.triggerElement, !1),
        this) : void 0
    }
    ,
    b.SimpleDialog = {
        _element: null,
        element: function() {
            var b = this._element || (this._element = a("<div>", {
                "class": "dialog"
            }).append(a("<div>", {
                "class": "dialog-inner"
            }).append(a("<div>", {
                "class": "window"
            }).append(a("<h1>", {
                "class": "window-title"
            }), a("<div>", {
                "class": "window-body"
            }).append(a("<p>", {
                "class": "window-body-content"
            }), a("<div>", {
                "class": "form-buttons"
            }).append(a("<button>", {
                "class": "cancel-button gray-button",
                type: "button",
                "data-event-type": "cancel"
            }), a("<button>", {
                "class": "ok-button black-button",
                type: "button",
                "data-event-type": "ok"
            })))))));
            return b.clone()
        },
        htmlLineBreak: function(a) {
            var b = {
                "<": "&lt;",
                ">": "&gt",
                "&": "&amp;",
                '"': "&quot"
            };
            return a.replace(/[<>&\"]/g, function(a) {
                return b[a]
            }).replace(/\n|\r\n?/g, function(a) {
                return "<br>" + a
            })
        },
        create: function(c) {
            var d = this.element()
              , e = new b.ModalWindow(d)
              , f = a.trim(c.modalTypes || "");
            e.types = f ? f.split(/\s+/) : [],
            d.find(".window-title").text(c.title || "");
            var g = this.htmlLineBreak(c.body || "");
            d.find(".window-body-content").html(g),
            d.find(".ok-button").text(c.okLabel || b.loc("olv.portal.ok"));
            var h = d.find(".cancel-button");
            c.isConfirm ? h.text(c.cancelLabel || b.loc("olv.portal.cancel")) : h.detach();
            var i = a.Deferred()
              , j = {
                ok: !0,
                cancel: !1
            };
            return d.find("button").on("click", function(b) {
                if (!b.isDefaultPrevented()) {
                    b.preventDefault();
                    var c = a(this).attr("data-event-type")
                      , d = a.Event(c);
                    a(e).trigger(d),
                    d.isDefaultPrevented() || (e.close(),
                    i.resolveWith(e, [j[c]]))
                }
            }),
            i.promise(e),
            e
        },
        show: function(a) {
            var b = this.create(a);
            return b.open(),
            b.element.find(".ok-button")[0].focus(),
            b
        }
    },
    b.showMessage = function(c, d, e) {
        var f = a.extend({
            title: c,
            body: d
        }, e);
        return b.SimpleDialog.show(f)
    }
    ,
    b.showConfirm = function(c, d, e) {
        var f = a.extend({
            title: c,
            body: d,
            isConfirm: !0
        }, e);
        return b.SimpleDialog.show(f)
    }
    ,
    b.Entry = {},
    b.Entry.incrementReplyCount = function(b) {
        var c = a("div.post-meta div.reply");
        if (0 !== !c.length && void 0 != b && 0 != b) {
            var d = c.find(".reply-count")
              , e = +d.text() + b;
            d.text(e),
            a(".no-reply-content").toggleClass("none", 0 !== e)
        }
    }
    ,
    b.Entry.setupEditButtons = function(c) {
        function d(c) {
            var d = b.Form.post(c.action, {
                format: "html"
            }, c.button).done(function(b) {
                a("#main-body").replaceWith(a(a.parseHTML(b)).find("#main-body"))
            });
            return c.modal.element.trigger("olv:entry:post:delete", c),
            d
        }
        function e(c) {
            var d = b.Form.post(c.action, null, c.button).done(function() {
                var b = a("#post-content, #post-permalink-comments");
                c.option.prop("disabled", !0);
                var d = function() {
                    b.find(".spoiler-status").fadeIn(400, function() {
                        a(this).addClass("spoiler")
                    })
                };
                c.modal.guard.done(function() {
                    setTimeout(d, 0)
                })
            });
            return d
        }
        function f(a) {
            a.modal.close();
            var c = b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.confirm_update"), {
                okLabel: b.loc("olv.portal.profile_post.confirm_update.yes"),
                cancelLabel: b.loc("olv.portal.cancel")
            }).done(function(c) {
                if (c) {
                    var d = this;
                    d.element.find("button").prop("disabled", !0),
                    b.Form.post(a.action, null, a.button, !0).done(function() {
                        a.modal.triggerElement.trigger("olv:entry:profile-post:set"),
                        d.close(),
                        b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.done"), {
                            okLabel: b.loc("olv.portal.user.search.go"),
                            cancelLabel: b.loc("olv.portal.close")
                        }).done(function(a) {
                            a && (go("/users/@me"))
                        })
                    })
                }
            });
            return c
        }
        function g(a, c, g) {
            function h() {
                var a = k.find(":selected");
                l.text(a.text());
                var c = a.attr("data-action");
                j.attr("action", c),
                b.Form.toggleDisabled(m, !c)
            }
            function i(a) {
                if (!b.Form.isDisabled(m) && !a.isDefaultPrevented()) {
                    a.preventDefault();
                    var g, h = {
                        action: j.attr("action"),
                        button: m,
                        modal: c,
                        option: k.find(":selected")
                    }, i = k.val();
                    g = "delete" == i ? d(h) : "painting-profile-post" === i || "screenshot-profile-post" === i ? f(h) : e(h),
                    g.always(function() {
                        c.close()
                    })
                }
            }
            var j = (c.triggerElement,
            c.element.find("form.edit-post-form"))
              , k = j.find('select[name="edit-type"]')
              , l = j.find("span.select-button-content")
              , m = j.find(".post-button");
            k.val(""),
            h(),
            k.on("change", h),
            m.on("click", i),
            g.done(function() {
                k.off("change", h),
                m.off("click", i)
            })
        }
        a(document).on("olv:modal:edit-post", g),
        c.done(function() {
            a(document).off("olv:modal:edit-post", g)
        })
    }
    ,
    b.Entry.setupMoreRepliesButtons = function(c) {
        function d(c) {
            c.preventDefault();
            var d = a(this);
            if (!f && !b.Form.isDisabled(d)) {
                var g = d.text();
                d.text("").append(a("<img/>").attr({
                    src: b.Utils.staticURL("/s/img/loading-image-blue.gif"),
                    alt: ""
                })),
                f = b.Form.get(d.attr("data-fragment-url"), null, d).done(function(b) {
                    var c = a(a.parseHTML(b));
                    if (d.hasClass("newest-replies-button") || d.hasClass("oldest-replies-button"))
                        return e.find(".more-button, .reply-list, .info-reply-list").remove(),
                        void e.append(c);
                    var f = c.filter(".reply-list").children().filter(function() {
                        return !a("#" + this.id).length
                    });
                    if (d.hasClass("all-replies-button") && (d.remove(),
                    e.find(".reply-list:not(.info-reply-list)").prepend(f)),
                    d.hasClass("newer-replies-button") || d.hasClass("older-replies-button")) {
                        var g = d.hasClass("newer-replies-button") ? "newer" : "older"
                          , h = c.filter("." + g + "-replies-button");
                        h.length ? d.replaceWith(h) : e.find(".more-button").remove(),
                        e.find(".reply-list:not(.info-reply-list)")["newer" == g ? "append" : "prepend"](f)
                    }
                }).always(function() {
                    d.text(g),
                    f = null
                }),
                d.trigger("olv:entry:reply:button")
            }
        }
        var e = a("#reply-content")
          , f = null;
        a(document).on("click", ".more-button", d),
        c.done(function() {
            a(document).off("click", ".more-button", d),
            f && f.abort()
        })
    }
    ,
    b.Entry.setupHiddenContents = function(b) {
        function c(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this)
                  , d = (!!c.closest(".post").length,
                c.closest(".hidden"));
                d.removeClass("hidden"),
                d.filter("[data-href-hidden]").add(d.find("[data-href-hidden]")).each(function() {
                    var b = a(this);
                    b.attr(b.is("a") ? "href" : "data-href", b.attr("data-href-hidden"))
                }),
                c.closest(".hidden-content").remove()
            }
        }
        a(document).on("click", ".hidden-content-button", c),
        b.done(function() {
            a(document).off("click", ".hidden-content-button", c)
        })
		$('.link-confirm').on('click', function(b) {
		ass = a(this).attr('href');
		b.preventDefault();
		prlinkConf()
		});
    }
    ,
    b.Entry.toggleEmpathy = function(a) {
        var c = b.Entry.isEmpathyAdded(a)
          , d = !c
          , e = a.attr("data-action");
        c && (e += ".delete"),
        a.trigger("olv:entry:empathy:toggle", [d]);
        var f = b.Form.post(e, null, a).done(function() {
            a.trigger("olv:entry:empathy:toggle:done", [d])
        }).fail(function() {
            a.trigger("olv:entry:empathy:toggle:fail", [c])
        });
        return f
    }
    ,
    b.Entry.isEmpathyAdded = function(a) {
        return a.hasClass("empathy-added")
    }
    ,
    b.Entry.onEmpathyClick = function(c) {
        if (!c.isDefaultPrevented()) {
            c.preventDefault();
            var d = a(this);
            b.Form.isDisabled(d) || b.Entry.toggleEmpathy(d)
        }
    }
    ,
    b.Entry.onEmpathyToggle = function(c, d) {
        var e = a(this);
        e.toggleClass("empathy-added", d);
        var f = e.attr("data-feeling") || "normal";
        e.find(".empathy-button-text").text(b.loc("olv.portal.miitoo." + f + (d ? ".delete" : "")));
        var g;
        g = +e.attr("data-is-in-reply-list") ? e.closest(".reply-meta").find(".empathy-count") : e.closest(".post-meta").find(".empathy-count"),
        g.text(+g.text() + (d ? 1 : -1));
        var h = a(document).find("#js-my-empathy-count");
        if (h[0] && h.text(+h.text() + (d ? 1 : -1)),
        b.Utils.isIE8AndEarlierStyle) {
            var i = e.closest(".post-meta").find(".empathy");
            i.addClass("changing"),
            setTimeout(function() {
                i.removeClass("changing")
            }, 0)
        }
    }
    ,
    b.Entry.setupEmpathyButtons = function(c) {
        a(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", b.Entry.onEmpathyToggle),
        a(document).on("click", ".empathy-button", b.Entry.onEmpathyClick),
        c.done(function() {
            a(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", b.Entry.onEmpathyToggle),
            a(document).off("click", ".empathy-button", b.Entry.onEmpathyClick)
        })
    }
    ,
    b.Entry.setupPostEmpathyButton = function(c) {
        function d(c, d) {
            b.Entry.onEmpathyToggle.apply(this, arguments);
            var e = a(c.target);
            if (!+e.attr("data-is-in-reply-list")) {
                var f = a("#empathy-content")
                  , g = +e.closest(".post-meta").find(".empathy-count").text();
                f.find(".visitor").toggle(d),
                f.find(".extra").toggle(!d),
                f.toggleClass("none", 0 === g)
            }
        }
        a(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", d),
        a(document).on("click", ".empathy-button", b.Entry.onEmpathyClick),
        c.done(function() {
            a(document).off("click", ".empathy-button", b.Entry.onEmpathyClick),
            a(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", d)
        })
    }
    ,
    b.Entry.setupBodyLanguageSelector = function(b) {
        function c(b) {
            var c = a(b.target)
              , d = c.val();
            a("#body-language-" + d).toggleClass("none", !1).siblings(".multi-language-body").toggleClass("none", !0)
        }
        a(document).on("change", "#body-language-selector", c),
        b.done(function() {
            a(document).off("change", "#body-language-selector", c)
        })
    }
    ,
    b.Entry.setupMoreContentButton = function(c) {
        function d(b) {
            b.preventDefault();
            var c = a(b.target);
            c.prev().find(".wrapped").removeClass("none"),
            c.remove()
        }
        var e = a("#post-content.official-user.post-subtype-default .post-content-text");
        e && 0 != e.length && (e.each(function() {
            var c = a(this)
              , d = c.text().match(/([\s\S]+)(\n+---+\n[\s\S]+)/);
            if (d) {
                c.text(d[1]);
                var e = a('<span class="wrapped none"></span>').text(d[2]);
                c.append(e);
                var f = a('<a href="#" class="more-content-button"></a>');
                f.text(b.loc("olv.portal.read_more_content")),
                c.after(f)
            }
        }),
        a(document).on("click", ".more-content-button", d),
        c.done(function() {
            a(document).off("click", ".more-content-button", d)
        }))
    }
    ,
    a(document).on("olv:modal:report", function(a, c, d) {
        var e = c.element.find("form")
          , f = e.find(".post-button");
        f.on("click", function(a) {
            b.Form.isDisabled(f) || a.isDefaultPrevented() || (a.preventDefault(),
            b.Form.submit(e, f).done(function() {
                c.close(),
                c.triggerElement.trigger("olv:report:done");
                var a = e.attr("action");
                /\/violations$/.test(a) ? b.showMessage("", b.loc("olv.portal.dialog.report_violation_done")) : /\/violators$/.test(a) && b.showMessage("", b.loc("olv.portal.dialog.report_violation_done"))
            }))
        }),
        d.done(function() {
            f.off("click")
        })
    }),
    a(document).on("olv:modal:report-violator", function(a, c, d) {
        function e() {
            var a = !!f.val();
            g.css("display", a ? "" : "none"),
            b.Form.toggleDisabled(h, !a),
            "" == g.val() && g.val(" ").val("")
        }
        var f = c.element.find('select[name="type"]')
          , g = c.element.find('textarea[name="body"]')
          , h = c.element.find(".post-button");
        e(),
        f.on("change", e),
        d.done(function() {
            f.off("change", e)
        })
    }),
    a(document).on("olv:modal:report-violation", function(c, d, e) {
        function f() {
            var b = a(m[0].options[m[0].selectedIndex]);
            p.text(b.text());
            var c = !!m.val();
            n.css("display", c ? "" : "none")
        }
        function g() {
            var c = a(m[0].options[m[0].selectedIndex])
              , d = !!c.attr("data-body-required")
              , e = !!m.val()
              , f = d && /^\s*$/.test(n.val()) || !e;
            b.Form.toggleDisabled(o, f)
        }
        var h = !!d.triggerElement.attr("data-is-post")
          , i = !!d.triggerElement.attr("data-is-message")
          , j = b.loc(h ? "olv.portal.report.report_violation" : i ? "olv.portal.report.report_violation_message" : "olv.portal.report.report_violation_comment", d.triggerElement.attr("data-screen-name"))
          , k = b.loc(h ? "olv.portal.report.report_post_id" : i ? "olv.portal.report.report_message_id" : "olv.portal.report.report_comment_id", d.triggerElement.attr("data-support-text"));
        d.element.find(".window-title").text(j),
        d.element.find(".post-id").text(k),
        d.element.find("form").attr("action", d.triggerElement.attr("data-action"));
        var l = "1" === d.triggerElement.attr("data-can-report-spoiler")
          , m = l ? d.element.find("select.can-report-spoiler") : d.element.find("select.cannot-report-spoiler");
        d.element.find('select[name="type"]').hide().prop("disabled", !0),
        m.show().prop("disabled", !1);
        var n = d.element.find('textarea[name="body"]')
          , o = d.element.find(".post-button")
          , p = d.element.find("span.select-button-content");
        n.attr("placeholder", n.attr("data-placeholder")),
        f(),
        g(),
        n.on("input", g),
        m.on("change", f),
        m.on("change", g),
        b.Form.emulateInputEvent(n, e),
        e.done(function() {
            n.off("input", g),
            m.off("change", f),
            m.off("change", g)
        })
    }),
    a(document).on("olv:modal:album-detail", function(a, c, d) {
        var e = c.element.find("form")
          , f = e.find(".js-album-delete-button");
        f.on("click", function(a) {
            b.Form.isDisabled(f) || a.isDefaultPrevented() || (a.preventDefault(),
            b.showConfirm(null, b.loc("olv.portal.album.delete_confirm")).done(function(a) {
                a && b.Form.submit(e, f, !0).done(function() {
                    c.close(),
                    location.reload()
                })
            }))
        }),
        d.done(function() {
            f.off("click")
        })
    }),
    b.Entry.setupCloseTopicPostButton = function(c) {
        var d = a(document).find(".js-close-topic-post-form")
          , e = d.find(".js-close-topic-post-button");
        e.on("click", function(c) {
            b.Form.isDisabled(e) || c.isDefaultPrevented() || (c.preventDefault(),
            b.showConfirm(b.loc("olv.portal.edit.action.close_topic_post"), b.loc("olv.portal.edit.action.close_topic_post.confirm"), {
                okLabel: b.loc("olv.portal.yes"),
                cancelLabel: b.loc("olv.portal.stop")
            }).done(function(c) {
                c && (b.Form.post(d.attr("action"), null, e, !0).done(function() {
                    a(document).find(".js-topic-answer-accepting-status").removeClass("accepting").addClass("not-accepting"),
                    d.remove()
                }),
                this.close())
            }))
        }),
        c.done(function() {
            e.off("click")
        })
    }
    ,
    b.EntryForm = {},
    b.EntryForm.setupAlbumImageSelector = function(b, c) {
        function d(a) {
            g.toggleClass("none")
        }
        function e(a) {
            g.addClass("none")
        }
        function f(c) {
            var d = a(c.target)
              , e = d.attr("data-album-image-preview-src");
            b.find('input[name="album_image_id"]').val(d.attr("data-album-image-id")),
            b.find(".js-album-image-preview").attr("src", e),
            b.find(".js-album-preview-wrapper").toggleClass("none", 0 == e.length),
            b.find('textarea[name="body"]').toggleClass("with-image", e.length > 0),
            b.trigger("olv:entryform:updatescreenshot")
        }
        if (b.length) {
            var g = b.find(".js-album-image-selector")
              , h = b.find(".js-album-list-pager");
            if (h.length) {
                var i = function(a) {
                    var c = parseInt(h.attr("data-max-page-number"));
                    a > c || 1 > a || (b.find(".js-album-selector-page[data-page-number=" + a + "]").removeClass("none").siblings(".js-album-selector-page").addClass("none"),
                    h.toggleClass("back-button-disabled", 1 === a),
                    h.toggleClass("next-button-disabled", a === c),
                    h.attr("data-current-page-number", a),
                    h.find(".js-curent-page-number").text(a))
                }
                  , j = function(a) {
                    h.hasClass("back-button-disabled") || i(parseInt(h.attr("data-current-page-number")) - 1)
                }
                  , k = function(a) {
                    h.hasClass("next-button-disabled") || i(parseInt(h.attr("data-current-page-number")) + 1)
                }
                  , l = b.find(".js-page-back-button");
                l.on("click", j);
                var m = b.find(".js-page-next-button");
                m.on("click", k),
                i(1),
                c.done(function() {
                    l.off("click", j),
                    m.off("click", k)
                })
            }
            var n = b.find(".js-toggle-album-image-selector");
            n.on("click", d);
            var o = g.find(".js-close-album-image-selector");
            o.on("click", e);
            var p = b.find(".js-album-image-link");
            p.on("click", f);
            var q = function(a) {
                b.find('input[name="album_image_id"]').val(""),
                b.find(".js-album-image-preview").attr("src", ""),
                b.find(".js-album-preview-wrapper").addClass("none"),
                b.find('textarea[name="body"]').removeClass("with-image")
            };
            b.on("reset", q),
            c.done(function() {
                n.off("click", d),
                o.off("click", e),
                p.off("click", f),
                b.off("reset", q)
            })
        }
    }
    ,
    b.EntryForm.setupSubmission = function(c, d) {
        function e(d) {
            var e = a(this);
            b.Form.isDisabled(e) || d.isDefaultPrevented() || (d.preventDefault(),
            b.Form.submit(c, e).done(function(a) {
                if (b.Form.reset(c),
                "topic" === c.attr("data-post-subtype") && !c.attr("data-is-identified")) {
                    var d = c.find('textarea[name="body"]');
                    d.prop("disabled", !0),
                    d.attr("placeholder", d.attr("data-open-topic-post-existing-placeholder"))
                }
                e.trigger("olv:entryform:post:done", arguments)
            }).fail(function() {
                e.trigger("olv:entryform:post:fail", arguments)
            }).always(function() {
                c.find('textarea[name="body"]').trigger("input")
            }))
        }
        function f(a) {
            return 13 !== a.which
        }
        function g(a) {
            b.Form.isDisabled(h) && a.preventDefault()
        }
        if (c.length) {
            c.on("keypress", "input:not(.allow_submit)", f);
            var h = c.find('input[type="submit"], button[type="submit"]');
            h.on("click", e),
            c.on("submit", g),
            d.done(function() {
                c.off("keypress", "input:not(.allow_submit)", f),
                h.off("click", e),
                c.off("submit", g)
            })
        }
    }
    ,
    b.EntryForm.onTopicPostCreated = function(b, c) {
        var d = a(".js-post-list").children(".post").attr("data-href");
        b.find(".js-existing-open-topic-post-link").attr("href", d);
        var e = a("#post-form");
        e.hasClass("for-identified-user") || (b.find(".js-cannnot-topic-post").removeClass("none"),
        b.find(".js-feeling-selector").addClass("none"),
        b.find(".js-topic-categories-container").addClass("none"),
        b.find(".js-post-form-spoiler").addClass("none"),
        b.find('input[type="text"],textarea').prop("readonly", !0)),
        b.toggleClass("folded")
    }
    ,
    b.EntryForm.setupFormStatus = function(c, d) {
        function e(b) {
            var d = b.filter(function() {
                return !blank.test(a(this).val())
            });
            return d.length === b.length
        }
        function f(c) {
            var d = h.filter("[data-required]:visible")
              , f = d.length > 0 && e(d)
              , g = i.filter(function() {
                return !a(this).val()
            }).length > 0;
            //Olv.Form.toggleDisabled will make the disabled button disabled IF parameter #2 equals true, will make it un-disabled if it's false (first parameter is the send button)
            b.Form.toggleDisabled(k, !f && !j.val() || g)
        }
        function g(a) {
            c.trigger("olv:entryform:reset")
        }
        if (c.length) {
            var h = c.find('input[type="text"], textarea')
              , i = c.find("select[data-required]")
              , j = c.find('input[name="painting"]').siblings("input:file")
              , k = c.find('input[type="submit"], button[type="submit"]');
            h.on("input", f),
            j.on("change", f),
            i.on("change", f),
            c.on("reset", g);
            var l = h.filter(":visible").first();
            b.Form.emulateInputEvent(l, d),
            h.filter(":visible").first().trigger("input"),
            d.done(function() {
                h.off("input", f),
                j.off("change", f),
                c.off("reset", g),
                i.off("change", f)
            })
        }
    }
    ,
    b.EntryForm.setupFoldedForm = function(a, b) {
        function c(b) {
            var c = d.offset().top;
            a.removeClass("folded");
            var e = d.offset().top - c;
            window.scrollBy(0, e)
        }
        if (a.hasClass("folded")) {
            var d = a.find("[data-open-folded-form]");
            if (d.is(document.activeElement) || d.val() !== d.prop("defaultValue"))
                return void a.removeClass("folded");
            if ("#js_open_post_form" == location.hash)
                return location.hash = "",
                void a.removeClass("folded");
            d.one("focus", c),
            b.done(function() {
                d.off("focus", c)
            })
        }
    }
    ,
    b.EntryForm.setupIdentifiedUserForm = function(c, d) {
        function e() {
            c.find('textarea[name="body"]').trigger("input")
        }
        function f(a) {
            var d = "1" == c.find('input[name="is_multi_language"]:checked').val();
            b.Form.reset(c),
            c.find('input[name="is_multi_language"]').val([d ? "1" : "0"]),
            c.find(".language-id-selector").toggleClass("none", !d),
            c.find(".language-bodies").toggleClass("none", !d),
            c.find('input[name="painting"]').parent().toggleClass("none", d),
            c.find('textarea[name="body"]').toggleClass("none", d),
            g(),
            e()
        }
        function g(b) {
            l.each(function(b, d) {
                c.find(".js-language-body-" + a(d).val()).toggleClass("none", !d.checked)
            }),
            e()
        }
        function h(d) {
            var e = a(d.target).siblings().filter("input")
              , f = d.target.files[0];
            if (!f)
                return void e.val("");
            var g = new FileReader;
            g.onload = function(a) {
                var b = a.target.result.split(",")[1];
                e.val(b),
                e.trigger("olv:entryform:fileselect", c),
                c.find('textarea[name="body"]').trigger("input")
            }
            ,
            b.Form.toggleDisabled(j, !0),
            g.readAsDataURL(f)
        }
        function i(a) {
            k.siblings().filter("input[type=hidden]").val(""),
            f()
        }
        var j = c.find('input[type="submit"]')
          , k = c.find(".file-button")
          , l = c.find('input[name="language_ids"]')
          , m = c.find('input[name="is_multi_language"]');
        "undefined" == typeof FileReader && b.Form.toggleDisabled(k, !0),
        k.on("change", h),
        l.on("change", g),
        m.on("change", f),
        c.on("olv:entryform:post:done", i),
        f(),
        d.done(function() {
            k.off("change", h),
            l.off("change", g),
            m.off("change", f),
            c.off("olv:entryform:post:done", b.Form.reset(c))
        })
    }
    ,
	-1 != navigator.userAgent.indexOf("iPhone;") && b.init.done(function(a) {
        setTimeout(function() {
            0 === window.pageYOffset && window.scrollBy(0, 1)
        }, 100)
    }),
    b.Community = {},
    b.Community.setupFavoriteButtons = function(c) {
        function d(a, c) {
            a.toggleClass("checked", c),
            b.Utils.isIEStyle && a.addClass("changing").removeClass("changing")
        }
        function e(c) {
            var e = a(this);
            if (!b.Form.isDisabled(e) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var f = e.hasClass("checked");
                d(e);
                var g = e.attr(f ? "data-action-unfavorite" : "data-action-favorite");
                b.Form.post(g, null, e).done(function() {
                    f = !f,
                    e.trigger("olv:community:favorite:toggle", [f])
                }).fail(function() {
                    d(e, f)
                })
            }
        }
        a(document).on("click", ".favorite-button", e),
        c.done(function() {
            a(document).off("click", ".favorite-button", e)
        })
    }
    ,
    b.Community.setupAgeGateDialog = function(c) {
        function d(a, b, c) {
            if (isNaN(a) || isNaN(b) || isNaN(c))
                return !1;
            var d = new Date(a,b - 1,c);
            return d.getFullYear() !== a || d.getMonth() + 1 !== b || d.getDate() !== c ? !1 : !0
        }
        function e(a, b, c) {
            var d = new Date
              , e = 100 * b + c > 100 * (d.getMonth() + 1) + d.getDate() ? 1 : 0;
            return d.getFullYear() - a - e
        }
        function f(a, b, c) {
            return e(a, b, c) >= 18
        }
        function g(b, c) {
            var d = r[c]
              , e = a(b[0].options[b[0].selectedIndex]);
            isNaN(e.val()) && (b.find('[value="' + d + '"]').prop("selected", !0),
            b.trigger("change"),
            i(),
            e.remove())
        }
        function h(b) {
            var c = a(b.currentTarget);
            g(c, c.attr("name"))
        }
        function i() {
            var b = +o.val()
              , c = +p.val()
              , d = +q.val();
            if (!isNaN(c)) {
                var e = new Date(d,c,0).getDate()
                  , f = +o.find("option").last().val();
                if (f > e)
                    o.find("option").slice(e - f).remove();
                else if (e > f)
                    for (var g = f + 1; e >= g; g++)
                        o.append(a("<option>").val(g).text(g));
                !isNaN(b) && b > e && (o.find('[value="' + e + '"]').prop("selected", !0),
                o.trigger("change"))
            }
        }
        function j() {
            a(".age-gate-dialog").remove(),
            a("#main-body").children().show(),
            b.Cookie.set("age_gate_done", "1")
        }
        function k(a) {
            i()
        }
        function l(c) {
            var e = +q.val()
              , g = +p.val()
              , h = +o.val();
            b.Cookie.get("age_gate_done") ? j() : d(e, g, h) ? f(e, g, h) ? j() : (a(".age-gate").addClass("none"),
            a(".back-dialog").removeClass("none")) : b.deferredAlert(b.loc("olv.portal.age_gate.select_label"))
        }
        function m(a) {
            history.back()
        }
        a("#main-body").children().filter(function() {
            return !a(this).hasClass("age-gate-dialog")
        }).hide();
        var n = a(".age-gate-dialog")
          , o = n.find(".day")
          , p = n.find(".month")
          , q = n.find(".year")
          , r = {
            year: 1990,
            month: 1,
            day: 1
        };
        a(document).on("click", ".age-confirm-button", l),
        a(document).on("mousedown", ".age-gate select", h),
        a(document).on("change", ".age-gate select", k),
        a(document).on("click", ".cancel-button", m),
        c.done(function() {
            a(document).off("click", ".age-confirm-button", l),
            a(document).off("mousedown", ".age-gate select", h),
            a(document).off("change", ".age-gate select", k),
            a(document).off("click", ".cancel-button", m)
        })
    }
    ,
    b.Community.setupHotDiaryPostSlideShow = function(b) {
        function c(a, b) {
            var c = 0;
            return function() {
                function d(a, b, d) {
                    var e = b + d;
                    if (b >= a.length)
                        return c = 0,
                        a[0];
                    if (e < a.length) {
                        var f = a[e];
                        return f
                    }
                    return a[0]
                }
                for (var e = [], f = 0; a > f; f++)
                    e = e.concat(d(b, c, f));
                return c++,
                e
            }
        }
        function d(a, b) {
            setTimeout(function() {
                a.addClass(g)
            }, 0),
            setTimeout(function() {
                b.removeClass(g)
            }, 0)
        }
        function e(b) {
            var c = b()
              , e = a(c[0])
              , f = a(c[1]);
            d(e, f)
        }
        function f(c, d) {
            a(document).on("transitionend", c, function(a) {
                e(d)
            })
        }
        var g = "invisible"
          , h = a("#community-eyecatch-main")
          , i = h.find(".js-eyecatch-diary-post")
          , j = c(2, i.get())
          , k = [".js-eyecatch-diary-post", ":not(." + g + ")"].join("");
        setTimeout(function() {
            e(j)
        }, 1e3),
        f(k, j)
    }
    ,
    b.Community.setupCommunitySidebar = function(a) {
        b.Community.setupFavoriteButtons(a),
        b.OpenTruncatedTextButton.setup(".js-community-description")
    }
    ,
    b.Community.setupPostFilter = function(b) {
        function c(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this).find('select[name="post"]').val();
                window.location.href = c
            }
        }
        var d = a("#post-filter-select-page form");
        d.on("submit", c),
        b.done(function() {
            d.off("submit", c)
        })
    }
    ,
    b.User = {},
    b.User.setupFollowButton = function(c, d) {
        function e(c) {
            var e = a(this);
            b.Form.isDisabled(e) || (b.Form.post(e.attr("data-action"), null, e).done(function(b) {
                e.addClass("none").siblings().removeClass("none"),
                e.hasClass("relationship-button") && (d.noReloadOnFollow && b.can_follow_more === !0 || location.reload()),
                "following_count"in b && a(e).trigger("olv:visitor:following-count:change", [b.following_count])
            }),
            c.preventDefault())
        }
        function f(c) {
            var d = a(this)
              , e = d.siblings();
            if (!b.Form.isDisabled(d)) {
                var f = b.showConfirm(b.loc("olv.portal.unfollow"), b.loc("olv.portal.followlist.confirm_unfollow_with_name", d.attr("data-screen-name")), {
                    cancelLabel: b.loc("olv.portal.cancel"),
                    okLabel: b.loc("olv.portal.button.remove"),
                    modalTypes: "unfollow"
                });
                f.done(function(a) {
                    a && b.Form.post(d.attr("data-action"), null, d).done(function() {
                        d.hasClass("relationship-button") ? location.reload() : (d.addClass("none"),
                        e.removeClass("none"),
                        b.Form.toggleDisabled(e, !1))
                    })
                }),
                c.preventDefault()
            }
        }
        d = a.extend({
            noReloadOnFollow: !1,
            container: document
        }, d);
        var g = a(d.container);
        g.on("click", ".toggle-button .follow-button", e),
        g.on("click", ".toggle-button .unfollow-button", f),
        c.done(function() {
            g.off("click", ".toggle-button .follow-button", e),
            g.off("click", ".toggle-button .unfollow-button", f)
        })
    }
    ,
    b.User.setupUserSidebar = function(a) {
        b.OpenTruncatedTextButton.setup(".profile-comment"),
        b.User.setupFollowButton(a, {
            container: "#sidebar"
        })

    }
    ,
    b.Global = {},
    b.Global.atOutsideOfMyMenu = function(b) {
        var c = a(b);
        return !c.hasClass("js-open-global-my-menu") && "global-my-menu" !== c.attr("id")
    }
    ,
    b.Global.setupMyMenu = function() {
        var c = a("#global-my-menu");
        a(".js-open-global-my-menu").on("click", function(a) {
			a.preventDefault(),
            c.toggleClass("none");
        }),
        a(document).on("click", function(a) {
            !c.hasClass("none") && b.Global.atOutsideOfMyMenu(a.target) && c.addClass("none")
        })
		
		// Thing
		a('.my-menu-white-power').on('click', function(e) {
		e.preventDefault()
				$('#wrapper').prepend('<div class="dialog feedback-dialog none"><div class=dialog-inner><div class=window><h1 class=window-title>Feedback</h1><div class=window-body><form id=feedback-form><p class=window-body-content>What\'s this?<br><input type=radio name=a value=0 checked>Issue/bug report<input type=radio name=a value=1>Suggestion<input type=radio name=a value=2>I want something<div class=textarea-container><textarea name=b id=feedbackbody class="textarea-text textarea" maxlength="5000" placeholder="Write your feedback, suggestions, bug report, whatever you want here." required></textarea></div><p>What are you?<br><input type=radio name=c value=1>Male<input type=radio name=c value=0>Female<input type=radio name=c value=2>Please don\'t ask me</p></p></form><div class=form-buttons><button class="olv-modal-close-button gray-button" type=button data-event-type=ok onclick="$(\'.feedback-dialog\').remove()">Cancel</button><button class="black-button d-send disabled" disabled type=button>Send it</button></div></div></div></div></div>');
		var g = new b.ModalWindow($('.feedback-dialog'));g.open();
		$('#feedbackbody').on('input', function() {
				b.Form.toggleDisabled($('.d-send'), !$(this).length < 0 || (blank.test($(this).val())))
        });
		$('.d-send').on('click', function() {
			b.Form.post('/complaints', $('#feedback-form').serializeArray()).done(function() { 
				g.close();$('.feedback-dialog').remove()
				b.showMessage("", "That was successfully submitted, and hopefully someone will see it. Thank you!")
			})
		})
		})
		// Unthing
    }
    ,
    b.init.done(function() {
		$('#wrapper').attr('class', $('#main-body').attr('class'));
        b.Global.setupMyMenu()
    }),
    b.init.done(function(a) {
        if (a("#global-menu-news").length) {
            a("#global-menu-news").on("click", function(b) {
                a(b.currentTarget).find(".badge").hide()
            });
            var c = b.UpdateChecker.getInstance();
            a(c).on("update", function(b, d) {
                a.each(c._settings, function(b, c) {
                    var e = !0;
                    a.each(c.params, function(a, b) {
                        void 0 === d[a] && (this.success = !1)
                    }),
                    e && c.update.call(void 0, d, c.params)
                })
            }),
            c.onUpdate("check_update", {
                n: {},
				msg: {}
            }, function(b, c) {
                var d = a("#global-menu-news")
                  , e = d.find(".badge");
                0 === e.length && (e = a("<span>", {
                    "class": "badge"
                }),
                e.hide().appendTo(d.find("a")));
                var f = 0;
                    f += b['n']
                e.text(f),
                e.toggle(f > 0)
				
				
			    var g = a("#global-menu-message")
                  , h = g.find(".badge");
                0 === h.length && (h = a("<span>", {
                    "class": "badge"
                }),
                h.hide().appendTo(g.find("a")));
                var j = 0;
                    j += b['msg']
                h.text(j),
                h.toggle(j > 0)
            },
			
			function(b, c) {
                var d = a("#global-menu-message")
                  , e = d.find(".badge");
                0 === e.length && (e = a("<span>", {
                    "class": "badge"
                }),
                e.hide().appendTo(d.find("a")));
                var f = 0;
                    f += b['msg']
                e.text(f),
                e.toggle(f > 0)
            }),
            a("#main-body").on("pjax:complete", function(a) {
                c.resetInterval()
            }),
            c.invoke()
        }
    }),
    b.router.connect("^/activity$", function(c, d, e) {
		changesel("feed");
        function f() {
            var c = a("#post-form");
            b.Form.setupForPage(),
            b.EntryForm.setupSubmission(c, e),
            b.EntryForm.setupFormStatus(c, e),
            b.EntryForm.setupFoldedForm(c, e),
            b.User.setupFollowButton(e),
            c.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(c, e),
            b.Content.autopagerize(".js-post-list", e),
            c.on("olv:entryform:post:done", g),
            e.done(function() {
                c.off("olv:entryform:post:done", g),
                a("form.search").off("submit", b.Form.validateValueLength)
            })
        }
        function g(b, c) {
            var d = a(".js-post-list");
            d.length || (d = a("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var e = a(a.parseHTML(c)).filter("*");
            e.hide().fadeIn(400).prependTo(d);
            var f = a(window);
            f.scrollTop(e.offset().top + e.outerHeight() / 2 - f.height() / 2)
        }
		$('form.search').on('submit', function() {
			go($(this).attr('action') + '?'+$(this).serialize())
		})
        b.Content.autopagerize(".js-post-list", e),
        b.Entry.setupEmpathyButtons(e),
        b.Entry.setupHiddenContents(e),
        a("form.search").on("submit", b.Form.validateValueLength);
        var h, i, j = a(".content-loading-window");
        if (j.length) {
            var k = d.search.substring(1);
            k && (k = "&" + k),
            h = b.Net.ajax({
                type: "GET",
				url: window.location.href,/*
                url: d.pathname + "?" + a.param({
                    fragment: "activityfeed"
                }) + k,*/
                silent: !0, beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()},
            }).done(function(b) {
                a("#js-main").html(b),
                a(document).trigger("olv:activity:success", [b, c, d])
            }).fail(function() {
                setTimeout(function() {
                    j.remove(),
                    a(".content-load-error-window").removeClass("none")
                }, 5e3)
            });
			/* G
            var l = "friend" !== b.Cookie.get("view_activity_filter");
			i = l ? b.Net.ajax({
                type: "GET",
                url: "/my/latest_following_related_profile_posts",
                silent: !0
            }) : a.Deferred().resolve().promise()
			*/
        } else
            h = a.Deferred().resolve().promise(),
            i = a.Deferred().resolve().promise();
        h.then(function() {
            f()
        }),
		//a.when(h, i).done(function(b, c)) {
        a.when(h).done(function(b, c) {
            var d = a(a.parseHTML(a.trim(c[0])))
              , e = a("[data-latest-following-relation-profile-post-placeholder]")
              , f = [];
            e.each(function(b, c) {
                var e = d.get(b);
                e && (a(c).html(e),
                f.push(c))
            }),
            a(f).removeClass("none")
        }),
        e.done(function() {
            h.abort && h.abort()
        })
	
	$('input[type=checkbox]').on('click', function() {
		go(d.pathname + "?&my=" + $(this).attr('value'))
	})
    }),
    b.router.connect("^(?:/|/communities)$", function(c, d, e) {
		changesel("community");
		/*
			if(a("#header-news").length) {
			o = a("#header-news");
			l = a(".header-news-button").attr("href") + "/read.json";
				a(".close-button").on("click", function(s) {
				s.preventDefault();
				a.post(o);
				alert("POSTed to " + l);
				o.remove();
				});
				o.on("click", function(){
				a.post(o);
				alert("POSTed to " + l);
				go(o.attr("href"));
				});
			}
		*/
        function f(b) {
            a(".tab-body").addClass("none"),
            a("#tab-" + b + "-body").removeClass("none"),
            a(".platform-tab a").removeClass("selected"),
            a("#tab-" + b).addClass("selected")
        }
        function g(c) {
            var d = a(this);
            if (!b.Form.isDisabled(d) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var e = a(this).attr("data-platform");
                f(e),
                b.Cookie.set("view_platform", e)
            }
        }
        function h(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this).find('select[name="category"]').val();
                window.location.href = c
            }
        }
        var i = b.Cookie.get("view_platform");
        i && f(i),
        b.Community.setupHotDiaryPostSlideShow(e),
        a(".platform-tab a").on("click", g),
        a(".filter-select-page form").on("submit", h),
        a("form.search").on("submit", b.Form.validateValueLength),
        e.done(function() {
            a(".platform-tab a").off("click", g),
            a(".filter-select-page form").off("submit", h),
            a("form.search").off("submit", b.Form.validateValueLength)
        })
    }),
    b.router.connect("^/communities/categories/[a-z0-9\\-_]+$", function(c, d, e) {
		changesel("community");
        function f(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this).find('select[name="category"]').val();
                window.location.href = c
            }
        }
        b.Content.autopagerize(".community-list", e),
        a("#filter-select-page form").on("submit", f),
        e.done(function() {
            a("#filter-select-page form").off("submit", f)
        })
    }),
    b.router.connect("^/(identified_user_posts|notifications)+$", function(a, c, d) {
        b.Guest.isGuest() || b.User.setupFollowButton(d),
        b.Content.autopagerize(".js-post-list", d)
    }),
	b.router.connect("/notifications(\/)?$", function(a, c, d) {
	   changesel("news");
	   if($('div.notify').length) {
			b.Form.post("/notifications/set_read")
	   }
	   $('button.rm').on('click', function() {
		   $(this).parent().parent().remove()
		   b.Form.post('/notifications/' + $(this).parent().parent().attr('id') + '.rm')
	   })
	}),
	b.router.connect('/notifications/friend_requests(\/)?$', function(a, c, d) {
		changesel("news");
		b.Form.post("/notifications/set_read?fr=1")
		$('.received-request-button').on('click', function(a) {
			a.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=accept-friend-request][uuid='+ $(this).parent().parent().attr('id') +']'));fr.open();
		})
		$('div[data-modal-types=accept-friend-request] .ok-button.post-button').on('click', function(a){
					a.preventDefault();
				b.Form.post($(a.target).parents().eq(4).attr('data-action')).done(function(){
								fr.close();
								reload();
								
							})
			})
		$('div[data-modal-types=accept-friend-request] .cancel-button').on('click', function(a){
					a.preventDefault();
				b.showConfirm('Reject Friend Request', 'Are you sure you really want to reject '+ b.SimpleDialog.htmlLineBreak($(a.target).parents().eq(4).attr('data-screen-name')) +'\'s friend request?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function() {
							b.Form.post($(a.target).parents().eq(4).attr('data-reject-action')).done(function(){
								fr.close();
								reload()
							})
					})
			})
	}),
	b.router.connect("^/messages(\/)?$", function(a, c, d) {
	   changesel("message");
	}),
	b.router.connect("^/messages/([A-Za-z0-9-._]+)/?$", function(a, c, d) {
		changesel("message");
		b.Form.post($('input[type=hidden][message-read]').attr('message-read'))
		b.Content.autopagerize(".list.messages", d)
			var ff = $('#post-form')
		    b.EntryForm.setupSubmission(ff, d),
            b.EntryForm.setupFormStatus(ff, d),
            b.EntryForm.setupFoldedForm(ff, d),
            b.EntryForm.setupIdentifiedUserForm(ff, d)
			ff.on("olv:entryform:post:done", g)
        function g(k, c) {
            var p = $(".list.messages");
            p.length || (p = $("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var e = $($.parseHTML(c)).filter("*");
            e.hide().fadeIn(400).prependTo(p);
            var f = $(window);
            f.scrollTop(e.offset().top + e.outerHeight() / 2 - f.height() / 2)
        }

			        if($("#post-form").length) {
var mode_post = 0;
$("label.textarea-menu-memo").on("click", function() {
var menu = $("div.textarea-with-menu");
var memo = $("div.textarea-memo");
var text = $("div.textarea-container");
    if(menu.hasClass("active-text")) {
        menu.removeClass("active-text");
        menu.addClass("active-memo");
        memo.removeClass("none");
        text.addClass("none");
    }
b.Form.toggleDisabled($("input.post-button"), false);
mode_post = 1;

setupDrawboard();
});
$("label.textarea-menu-text").on("click", function() {
    if($("input[name=\"painting\"]").val()) {
    $("input[name=\"painting\"]").attr("value", "");
    }
switchtext();
});

$(".post-button").on("click", function() { switchtext(); $("#can")[0].getContext("2d").clearRect(0, 0, 320, 120); $("input[name=\"painting\"]").attr("value", ""); $("img[id=\"drawing\"]").attr("src", ""); });

function switchtext() {
var menu = $("div.textarea-with-menu");
        menu.removeClass("active-memo");
        menu.addClass("active-text");
        $("div.textarea-container").removeClass("none");
        $("div.textarea-memo").addClass("none");
mode_post = 0;
    }
}
			
	}),
    b.router.connect("^/communities/(?:favorites|played)$", function(a, c, d) {
		changesel("community");
        b.Content.autopagerize(".community-list", d)
    }),
    b.router.connect("^/communities/search$", function(c, d, e) {
		changesel("community");
        a("form.search").on("submit", b.Form.validateValueLength),
        e.done(function() {
            a("form.search").off("submit", b.Form.validateValueLength)
        })
    }),
    b.router.connect("^/communities/[0-9]+(/diary|/new|/hot|/in_game|/old)?$", function(c, d, e) {
		changesel("community");
        function f() {
            var b = a(".multi_timeline-topic-filter");
            b.addClass("open")
        }
        function g(b, c) {
            var d = a(b.currentTarget).attr("data-post-list-container-selector")
              , e = !!d
              , f = e ? d + " .js-post-list" : ".js-post-list"
              , g = a(f);
            e ? g.hasClass("empty") && g.removeClass("empty").children().remove() : g.length || (g = a("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var h = a(a.parseHTML(c)).filter("*");
            h.hide().fadeIn(400).prependTo(g);
            var i = a(window);
            i.scrollTop(h.offset().top + h.outerHeight() / 2 - i.height() / 2)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e),
        b.Community.setupPostFilter(e);
        var h = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(h, e),
        b.EntryForm.setupFormStatus(h, e),
        b.EntryForm.setupFoldedForm(h, e),
        b.EntryForm.setupAlbumImageSelector(h, e),
        h.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(h, e),
        a(".toggle-button").length && b.User.setupFollowButton(e),
        a(document).on("click", ".js-topic-post-button", f),
        e.done(function() {
            a(document).off("click", ".js-topic-post-button", f)
        })),
        a(".age-gate-dialog").length && b.Community.setupAgeGateDialog(e),
        h.on("olv:entryform:post:done", g),
        e.done(function() {
            h.off("olv:entryform:post:done", g)
        })
    }),
    b.router.connect("^/communities/[0-9]+(/artwork(/hot|/new)?|/topic(/new|/open)?)$", function(c, d, e) {
		changesel("community");
        function f(d, f) {
            var h = a(".js-post-list");
            h.length || (h = a("<div>", {
                "class": "list multi-timeline-post-list js-post-list"
            }).replaceAll(".no-content"));
            var i = a(a.parseHTML(f)).filter("*");
            i.hide().fadeIn(400).prependTo(h),
            /^\/topic(?:\/(?:new|open))?$/.test(c[1]) && (b.EntryForm.onTopicPostCreated(g, e),
            b.EntryForm.setupFoldedForm(g, e));
            var j = a(window);
            j.scrollTop(i.offset().top + i.outerHeight() / 2 - j.height() / 2)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e),
        b.Community.setupPostFilter(e);
        var g = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(g, e),
        b.EntryForm.setupFormStatus(g, e),
        b.EntryForm.setupFoldedForm(g, e),
        b.EntryForm.setupAlbumImageSelector(g, e),
        g.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(g, e),
        a(".toggle-button").length && b.User.setupFollowButton(e)),
        a(".age-gate-dialog").length && b.Community.setupAgeGateDialog(e),
        g.on("olv:entryform:post:done", f),
        e.done(function() {
            g.off("olv:entryform:post:done", f)
        })
    }),
    b.router.connect(/^\/posts\/([0-9A-Za-z\-_]+)$/, function(c, d, e) {
        function f(c, d) {
            var e = a(window)
              , f = a(a.parseHTML(d)).filter("*");
            f.hide().fadeIn(400).appendTo(".reply-list"),
            e.scrollTop(f.offset().top + f.outerHeight() / 2 - e.height() / 2),
            b.Entry.incrementReplyCount(1)
        }
        function g(c, d) {
            var e = a(c.target);
            e.attr("data-is-post") ? b.Form.toggleDisabled(e, !0) : e.remove()
        }
        b.Entry.setupHiddenContents(e),
        b.Entry.setupMoreRepliesButtons(e),
        b.SocialButton.setup(e);
        var h = a("#reply-form");
        b.Guest.isGuest() || (b.Entry.setupPostEmpathyButton(e),
        b.Entry.setupEditButtons(e),
        b.EntryForm.setupSubmission(h, e),
        b.EntryForm.setupFormStatus(h, e),
        b.EntryForm.setupAlbumImageSelector(h, e),
        h.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(h, e),
        b.Entry.setupCloseTopicPostButton(e)),
        b.Entry.setupBodyLanguageSelector(e),
        b.Entry.setupMoreContentButton(e),
        a(document).on("olv:entryform:post:done", f),
        a(document).on("olv:report:done", g),
        e.done(function() {
            a(document).off("olv:entryform:post:done", f),
            a(document).off("olv:report:done", g)
        })
/*
function add(a, b){
	return a + b;
}
function recalculateVotes(pollOptions){
	var voteArray = [];
	for(var j = 0; j < pollOptions.length; j++) {
		var votes = parseInt(pollOptions.eq(j).attr('votes'));
		if(pollOptions.eq(j).hasClass('selected')) {
    	voteArray.push(votes + 1);
    }	else {
    	voteArray.push(votes);
    }
  }
	pollOptions.siblings('.poll-votes').text(voteArray.reduce(add, 0) + ' votes');
	for(var i = 0; i < pollOptions.length; i++) {
		var voteArrayCopy = voteArray;
		voteArrayCopy.slice(i, 1);
		var otherNumbers = voteArrayCopy.reduce(add, 0);
		var percentage = Math.abs(100 - (((otherNumbers - voteArray[i]) / otherNumbers) * 100));
		pollOptions.eq(i).children('.poll-background').attr('style', 'width:' + percentage + '%');
		pollOptions.eq(i).children('.percentage').text(Math.round(percentage) + '%');
  }
}

function pollSuccess(response) {
	var pollOptions = $('.post-poll[post-id=114] .poll-option');
	for(i = 0; i < response.votes.length; i++) {
		pollOptions.eq(i).attr('votes', response.votes[i]);
  }
	recalculateVotes(pollOptions);
}
function pollError(response) {
	Olv.showMessage("Error", "There was an error trying to update your vote. Please try again.");
}

$('.post-poll .poll-option').on('click', function() {
	if(!$(this).hasClass('selected')) {
		$(this).siblings('.poll-option').removeClass('selected');
		$(this).addClass('selected');
		recalculateVotes($(this).siblings('.poll-option').addBack());
		$(this).parent().addClass('selected');	
    $.ajax('/posts/' + $(this).parent().attr('post-id') + '/vote/' + parseInt($(this).index()), {
			method: 'post',
			dataType: 'json',
    	success: pollSuccess,
			error: pollError
    });
  } else {
  	$(this).parent().removeClass('selected');
		$(this).removeClass('selected');
		recalculateVotes($(this).siblings('.poll-option').addBack());
		$.ajax('/posts/' + $(this).parent().attr('post-id') + '/vote/0', {
			method: 'post',
    	dataType: 'json',
    	success: pollSuccess,
			error: pollError
		});
  }
});
$('.post-poll .poll-votes').on('click', function() {
	b.showMessage("Poll Voters", "Insert list of poll voters here.");
});
*/

	if($('.edit-post-button').length) {
		var t = $("#edit-form");
		var submit_btn = $('#edit-form div.form-buttons button.post-button.black-button')
		function et() {
						$('#post-edit').toggleClass('none')
						$('#the-post').toggleClass('none')
					}
		$('.cancel-button').click(function(){et()})
				b.EntryForm.setupFormStatus(t, e);
		$('.edit-post-button').click(function(){
			if($('.post-content-memo').length) {
				b.showMessage("", "You can't edit a drawing at this time.")
			} else {
					et();
					b.Form.toggleDisabled(submit_btn, true)
			}
		})
		submit_btn.click(function(a) {
			a.preventDefault()
			b.Form.toggleDisabled($(this), true)
			cereal = t.serializeArray()
			b.Form.post(t.attr('data-action'), cereal).done(function() {
				$('.post-content-text').html(cereal.body); reload()
			})
		})
	}
	rm_btn = $('.rm-post-button')
	if(rm_btn.length) {
		rm_btn.click(function(){
			b.showConfirm("Delete post", "Really delete this post?")
				$('.ok-button').click(function(){
					b.Form.post(rm_btn.attr('data-action')).done(b.showMessage("", "Deleted."))
				})
		})
	}
	fav_btn = $('.profile-post-button')
	if(fav_btn.length) {
			if(fav_btn.hasClass('done')) {
				fav_btn.click(function(){
					b.showConfirm("Profile post unset", "Unset your profile picture?")
						$('.ok-button').click(function(){
							b.Form.post(fav_btn.attr('data-action')).done(reload())
						})
				})
			}
			else {
				fav_btn.click(function(){
					b.showConfirm("Profile post", "Set this as your profile picture?")
						$('.ok-button').click(function(){
							b.Form.post(fav_btn.attr('data-action')).done(reload())
						})
				})
			}
	}
		
if($("#reply-form").length) {
var mode_post = 0;
$("label.textarea-menu-memo").on("click", function() {
var menu = $("div.textarea-with-menu");
var memo = $("div.textarea-memo");
var text = $("div.textarea-container");
    if(menu.hasClass("active-text")) {
        menu.removeClass("active-text");
        menu.addClass("active-memo");
        memo.removeClass("none");
        text.addClass("none");
    }
b.Form.toggleDisabled($("input.reply-button"), false);
mode_post = 1;

setupDrawboard();
});
$("label.textarea-menu-text").on("click", function() {
    if($("input[name=\"painting\"]").val()) {
    $("input[name=\"painting\"]").attr("value", "");
    }
switchtext();
});

$(".reply-button").on("click", function() { switchtext(); $("#can")[0].getContext("2d").clearRect(0, 0, 320, 120); $("input[name=\"painting\"]").attr("value", ""); $("img[id=\"drawing\"]").attr("src", ""); });

function switchtext() {
var menu = $("div.textarea-with-menu");
        menu.removeClass("active-memo");
        menu.addClass("active-text");
        $("div.textarea-container").removeClass("none");
        $("div.textarea-memo").addClass("none");
mode_post = 0;
    }
}
    }),
    b.router.connect(/^\/comments\/([0-9A-Za-z\-_]+)$/, function(c, d, e) {
        function f(c, d) {
            var e = a(c.target);
            e.attr("data-is-post") ? b.Form.toggleDisabled(e, !0) : e.remove()
        }
        b.SocialButton.setup(e);
        var g = a("#reply-form");
        b.Guest.isGuest() || (b.Entry.setupPostEmpathyButton(e),
        b.Entry.setupEditButtons(e),
        b.EntryForm.setupSubmission(g, e),
        b.EntryForm.setupFormStatus(g, e)),
        b.Entry.setupBodyLanguageSelector(e),
        a(document).on("olv:report:done", f),
        e.done(function() {
            a(document).off("olv:report:done", f)
        })
		
				if($('.edit-post-button').length) {
			var t = $("#edit-form");
			var submit_btn = $('#edit-form div.form-buttons button.post-button.black-button')
			function et() {
							$('#post-edit').toggleClass('none')
							$('#the-post').toggleClass('none')
						}
			$('.cancel-button').click(function(){et()})
					b.EntryForm.setupFormStatus(t, e);
			$('.edit-post-button').click(function(){
				if($('.reply-content-memo').length) {
					b.showMessage("", "You can't edit a drawing at this time.")
				} else {
						et();
						b.Form.toggleDisabled(submit_btn, true)
				}
			})
			submit_btn.click(function(a) {
				a.preventDefault()
				b.Form.toggleDisabled($(this), true)
				cereal = t.serializeArray()
				b.Form.post(t.attr('data-action'), cereal).done(function() {
					$('.post-content-text').html(cereal.body); reload()
				})
			})
		}
			rm_btn = $('.rm-post-button')
			if(rm_btn.length) {
				rm_btn.click(function(){
					b.showConfirm("Delete post", "Really delete this post?")
						$('.ok-button').click(function(){
							b.Form.post(rm_btn.attr('data-action')).done(b.showMessage("", "Deleted."))
						})
				})
			}
    }),
    b.router.connect("^/users\.search$", function(c, d, e) {
		changesel("feed");
        b.Content.autopagerize("#searched-user-list", e),
        b.Guest.isGuest() || b.User.setupFollowButton(e),
        a("form.search").on("submit", function() {
		b.Form.validateValueLength,
		go($(this).attr('action') + '?'+$(this).serialize())
		}),
        e.done(function() {
            a("form.search").off("submit", b.Form.validateValueLength)
        })
    }),
    b.router.connect("^/users/[0-9a-zA-Z\\-_.]+/(yeahs|posts)$", function(a, c, d) {
        b.Content.autopagerize(".js-post-list", d)
    }),
    b.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers)$", function(a, c, d) {
        b.Content.autopagerize("#friend-list-content", d)
    }),
    b.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/diary)$", function(c, d, e) {
        function f(b, c) {
            var e = a(".js-post-list");
            e.find(".no-content").addClass("none");
            var f = a(a.parseHTML(c)).filter("*");
            f.hide().fadeIn(400).prependTo(e),
            i.remove(),
            window.history.replaceState(window.history.state, "", d.href.replace(/\?.*/, ""));
            var g = a(document).find("#js-my-post-count");
            g[0] && g.text(+g.text() + 1);
            var h = a(window);
            h.scrollTop(f.offset().top + f.outerHeight() / 2 - h.height() / 2)
        }
        function g(a, b) {
            i.remove()
        }
        function h(c, d) {
            b.Form.toggleDisabled(a(c.target), !0)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e);
        var i = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(i, e),
        b.EntryForm.setupFormStatus(i, e),
        i.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(i, e)),
        a(document).on("olv:report:done", h),
        i.on("olv:entryform:post:done", f);
        var j = i.find(".cancel-button");
        j.on("click", g),
        e.done(function() {
            //showButton.off("click"),
            a(document).off("olv:report:done", h),
            i.off("olv:entryform:post:done", f),
            j.off("click", g)
        })
    }),
    b.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers|/yeahs|/posts)?$", function(c, d, e) {
		if($("body").attr("sess-usern") == (c[0].split('/users/')[1])) {
		changesel('mymenu');
		}
        function f(c, d) {
            b.Form.toggleDisabled(a(c.target), !0)
        }
        function g(b, c) {
            a("#user-content.is-visitor").length && a("#js-following-count").text(c)
        }
        b.User.setupFollowButton(e, {
            container: ".main-column",
            noReloadOnFollow: !0
        }),
		$('.friend-button.create').on('click', function(a) {
			a.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=post-friend-request]'));fr.open();
		})
		$('div[data-modal-types=post-friend-request] input.post-button').on('click', function(a){
					a.preventDefault();
					b.Form.post($('.friend-button.create').attr('data-action'), $('div[data-modal-types=post-friend-request] form').serializeArray()).done(function() {
					fr.close();
					reload()
				})
			})
		
		$('.friend-button.accept').on('click', function(a) {
			a.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=accept-friend-request]'));fr.open();
		})
		$('div[data-modal-types=accept-friend-request] .ok-button.post-button').on('click', function(a){
					a.preventDefault();
				b.Form.post($('div[data-modal-types=accept-friend-request]').attr('data-action')).done(function(){
								fr.close();
								reload();
								
							})
			})
		$('div[data-modal-types=accept-friend-request] .cancel-button').on('click', function(a){
					a.preventDefault();
				b.showConfirm('Reject Friend Request', 'Are you sure you really want to reject '+ b.SimpleDialog.htmlLineBreak($('div[data-modal-types=accept-friend-request]').attr('data-screen-name')) +'\'s friend request?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(a) {
							b.Form.post($('div[data-modal-types=accept-friend-request]').attr('data-reject-action')).done(function(){
								fr.close();
								reload()
							})
					})
			})
		$('.friend-button.cancel').on('click', function(a) {
			a.preventDefault()
			b.showConfirm('Cancel Friend Request', 'Are you sure you really want to cancel your friend request to '+ b.SimpleDialog.htmlLineBreak($('.friend-button.cancel').attr('data-screen-name')) +'?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(a) {
							b.Form.post($('.friend-button.cancel').attr('data-action')).done(function(){
								reload()
							})
					})
		})
		$('.friend-button.delete').on('click', function(a) {
			a.preventDefault()
			b.showConfirm('Unfriend', 'Are you sure you really want to unfriend '+ b.SimpleDialog.htmlLineBreak($('.friend-button.delete').attr('data-screen-name')) +"? Your messages will not be deleted.", {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(a) {
							b.Form.post($('.friend-button.delete').attr('data-action')).done(function(){
								reload()
							})
					})
		})
		b.User.setupUserSidebar(e)
        b.Entry.setupHiddenContents(e),
        a(document).on("olv:report:done", f),
        a(document).on("olv:visitor:following-count:change", g),
        e.done(function() {
            //showButton.off("click"),
            a(document).off("olv:report:done", f),
            a(document).off("olv:visitor:following-count:change", g)
        }),
        b.Entry.setupEmpathyButtons(e)
    }),
    b.router.connect("^/users/[0-9a-zA-Z\\-_.]+/favorites$", function(a, c, d) {
        b.Content.autopagerize(".community-list", d)
    }),
	b.router.connect("^/login/$|^/signup/$", function() {
		function lfinish(b) {
		window.location.href=b
		//a('body').attr('sess-usern', a('input[name=username]').val())
		//go(b)
		}
		cac = function (){$.ajax({type:'POST',url:window.location.href,data:$('form').serialize(),success:function(e){lfinish(e)},error:function(e){$('p.red').text(e.responseText)},beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}})};
		a("form[method=post]").on("submit", function(e) {
			e.preventDefault();
				a.ajax({
				type: 'POST', url: window.location.href, data: a("form").serialize(),
				success: function(s) {
				lfinish(s);
				},
				error: function(s) {
				$("p.red").text(s.responseText)
				},
				beforeSend: function() {
				NProgress.start();
				},
				complete: function() {
				NProgress.done();
				}
				});
		})
	}),
    b.router.connect("^/settings/(?:account|profile)$", function(c, d, e) {
		changesel('mymenu')
			// If we are on profile settings..
			if(c[0][10] == 'p') {
			$('.get-ipinfo').on('click', function(e){
					e.preventDefault();
					$.ajax({url: 'https://ipinfo.io/region',
					beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()},
					success: function(a) {
						$('input[name=country]').val($.trim(a))
						b.showMessage('', "Your region has been recieved from ipinfo.io as \"" + $.trim(a) + "\". Please note that this was recieved by your browser. If it's inaccurate, you might be using a proxy.\n\nThis has not been saved. Please be sure you want to share your region when you save.")
						}, error: function() {
						b.showMessage('', "Failed to get your region from ipinfo.io for some reason.")
						}
					})
				})
			}
		b.User.setupUserSidebar(e)
        function f(c) {
            var d = a(this)
              , e = d.closest("form");
            b.Form.isDisabled(d) || c.isDefaultPrevented() || (c.preventDefault(),
            b.Form.submit(e, d).done(function(a) {
                reload()
            }))
        }
        function g(c) {
            var d = a(this);
            b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.confirm_remove"), {
                okLabel: b.loc("olv.portal.button.remove"),
                cancelLabel: b.loc("olv.portal.stop")
            }).done(function(a) {
                a && b.Form.post("/settings/profile_post.unset.json", null, d).done(function() {
                    d.trigger("olv:entry:profile-post:remove"),
                    d.remove()
                })
            })
        }
        function h(b) {
            var c = a()
              , d = a()
              , e = a("#favorite-game-genre select");
            e.each(function() {
                var b = a(this)
                  , d = b.find("option[value=" + b.val() + "]").attr("data-is-configurable")
                  , f = null != d && "0" != d;
                if (f) {
                    var g = e.filter(function() {
                        return !a(this).is(b)
                    });
                    g.each(function() {
                        var d = a(this)
                          , e = d.find("option[value=" + b.val() + "]");
                        c = c.add(e)
                    })
                }
            }),
            d = e.find("option").filter(function() {
                return !a(this).is(c)
            }),
            c.prop("disabled", !0),
            d.prop("disabled", !1)
        }
        h(),
        a(document).on("click", ".apply-button", f),
        a(document).on("click", "#profile-post", g),
        a(document).on("change", "#favorite-game-genre select", h),
        e.done(function() {
            a(document).off("click", ".apply-button", f),
            a(document).off("click", "#profile-post", g),
            a(document).off("change", "#favorite-game-genre select", h)
        })
    }),
    b.router.connect("^(/users/[0-9a-zA-Z\\-_.]+/communities/(favorites|played)|/my_menu)", function(a, c, d) {
		changesel('community');
        b.User.setupUserSidebar(d)
    }),
    b.router.connect("^/communities/[0-9]+", function(a, c, d) {
		changesel("community");
        if($("#post-form").length) {
var mode_post = 0;
$("label.textarea-menu-memo").on("click", function() {
var menu = $("div.textarea-with-menu");
var memo = $("div.textarea-memo");
var text = $("div.textarea-container");
    if(menu.hasClass("active-text")) {
        menu.removeClass("active-text");
        menu.addClass("active-memo");
        memo.removeClass("none");
        text.addClass("none");
    }
b.Form.toggleDisabled($("input.post-button"), false);
mode_post = 1;

setupDrawboard();
});
$("label.textarea-menu-text").on("click", function() {
    if($("input[name=\"painting\"]").val()) {
    $("input[name=\"painting\"]").attr("value", "");
    }
switchtext();
});

$(".post-button").on("click", function() { switchtext(); $("#can")[0].getContext("2d").clearRect(0, 0, 320, 120); $("input[name=\"painting\"]").attr("value", ""); $("img[id=\"drawing\"]").attr("src", ""); });

function switchtext() {
var menu = $("div.textarea-with-menu");
        menu.removeClass("active-memo");
        menu.addClass("active-text");
        $("div.textarea-container").removeClass("none");
        $("div.textarea-memo").addClass("none");
mode_post = 0;
    }
}
        b.Community.setupCommunitySidebar(d),
        b.SocialButton.setup(d)
    }),
	b.router.connect("^/news/.*$", function(c, d, e) {
	changesel("news");
	}),
    b.init.done(function() {
        b.CookiePolicyNotice.setup()
    }),
    b.init.done(function(a) {
        a(document).on("olv:modal:report-violation olv:modal:report-violator", function(a, b, c) {
            function d() {
                var a = g.find("option:selected").attr("data-track-action");
                e.attr("data-track-action", a)
            }
            var e = b.element.find(".post-button")
              , f = b.triggerElement.attr("data-can-report-spoiler")
              , g = "1" === f ? b.element.find("select.can-report-spoiler") : "0" === f ? b.element.find("select.cannot-report-spoiler") : b.element.find('select[name="type"]')
              , h = b.triggerElement.attr("data-track-label")
              , i = b.triggerElement.attr("data-url-id") || "";
            e.attr("data-track-label", h),
            e.attr("data-url-id", i),
            g.on("change", d),
            c.done(function() {
                g.off("change", d)
            })
        });
        var c = function(a) {
            var b = a.find("input[type=submit]")
              , c = a.find('input[name="album_image_id"]').length && a.find('input[name="album_image_id"]').val().length > 0
              , d = a.find('input[name="screenshot"]').length && a.find('input[name="screenshot"]').val().length > 0;
            b.attr("data-post-with-screenshot", c || d ? "screenshot" : "nodata")
        };
        a(document).on("olv:entryform:updatescreenshot", function(b) {
            var d = a(b.target);
            c(d)
        }),
        a(document).on("olv:entryform:fileselect", function(b, c) {
            var d = a(b.target)
              , e = a(c).find('input[type="submit"]');
            "screenshot" === d.attr("name") ? e.attr("data-post-with-screenshot", "screenshot") : "painting" === d.attr("name") && e.attr("data-post-content-type", "draw")
        }),
        a(document).on("olv:entryform:reset", function(b) {
            var d = a(b.target)
              , e = d.find("input[type=submit]");
            e.attr("data-post-content-type", "text"),
            setTimeout(function() {
                c(d)
            }, 0)
        })
    }))
}
).call(this, jQuery, Olv);
Olv.Locale.Data={
"olv.portal.age_gate.select_label":{value:"Please enter your date of birth."},"olv.portal.album.delete_confirm":{value:"Are you sure you want to delete this?"},"olv.portal.button.remove":{value:"Yes"},"olv.portal.cancel":{value:"Cancel"},"olv.portal.close":{value:"Close"},"olv.portal.dialog.apply_settings_done":{value:"Settings saved."},"olv.portal.dialog.report_spoiler_done":{value:"Spoiler reported. Thank you for your help!"},"olv.portal.dialog.report_violation_done":{value:"Violation reported. Thank you for your help!"},"olv.portal.edit.action.close_topic_post":{value:"Close for Comments"},"olv.portal.edit.action.close_topic_post.confirm":{value:"It will no longer be possible to post comments on this discussion. Is that OK? (This action cannot be reversed.)"},"olv.portal.edit.edit_post":{value:"Edit Post"},"olv.portal.edit.edit_reply":{value:"Edit Comment"},"olv.portal.error.500.for_offdevice":{value:"An error occurred.\nPlease try again later."},"olv.portal.error.album_limit_exceeded":{value:"Unable to save because the maximum number of screenshots that can be saved has been reached. Please delete some saved screenshots, and then try again."},"olv.portal.error.code":{args:[1],value:"Error Code: %s"},"olv.portal.error.code %1":{args:[1],value:"Error Code: %s"},"olv.portal.error.code [_1]":{args:[1],value:"Error Code: %s"},"olv.portal.error.daily_post_limit_exceeded":{value:"You have already exceeded the number of posts that you can contribute in a single day. Please try again tomorrow."},"olv.portal.error.failed_to_connect.for_offdevice":{value:"An error occurred."},"olv.portal.error.network_unavailable.for_offdevice":{value:"Cannot connect to the Internet. Please check your network connection and try again."},"olv.portal.error.post_time_restriction":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.error.post_time_restriction %1":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.error.post_time_restriction [_1]":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.followlist.confirm_unfollow_with_name":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.followlist.confirm_unfollow_with_name %1":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.followlist.confirm_unfollow_with_name [_1]":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.miitoo.frustrated":{value:"Yeah..."},"olv.portal.miitoo.frustrated.delete":{value:"Unyeah"},"olv.portal.miitoo.happy":{value:"Yeah!"},"olv.portal.miitoo.happy.delete":{value:"Unyeah"},"olv.portal.miitoo.like":{value:"Yeah♥"},"olv.portal.miitoo.like.delete":{value:"Unyeah"},"olv.portal.miitoo.normal":{value:"Yeah!"},"olv.portal.miitoo.normal.delete":{value:"Unyeah"},"olv.portal.miitoo.puzzled":{value:"Yeah..."},"olv.portal.miitoo.puzzled.delete":{value:"Unyeah"},"olv.portal.miitoo.surprised":{value:"Yeah!?"},"olv.portal.miitoo.surprised.delete":{value:"Unyeah"},"olv.portal.ok":{value:"OK"},"olv.portal.post.delete_confirm":{value:"Delete this post?"},"olv.portal.profile_post":{value:"Favorite Post"},"olv.portal.profile_post.confirm_remove":{value:"Remove this post from your profile?\nThe original post will not be deleted."},"olv.portal.profile_post.confirm_update":{value:"Set this post as your favorite?\nPlease note, it will replace any existing favorite post."},"olv.portal.profile_post.confirm_update.yes":{value:"OK"},"olv.portal.profile_post.done":{value:"Your favorite post has been set.\nWould you like to view your profile?"},"olv.portal.read_more_content":{value:"Read More"},"olv.portal.reply.delete_confirm":{value:"Delete this comment?"},"olv.portal.report.report_comment_id":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_comment_id %1":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_comment_id [_1]":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_post_id":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_post_id %1":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_post_id [_1]":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_spoiler":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler %1":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler [_1]":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment %1":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment [_1]":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_violation":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.setup":{value:"Set Up"},"olv.portal.show_more_content":{value:"View Entire Post"},"olv.portal.stop":{value:"Cancel"},"olv.portal.unfollow":{value:"Unfollow"},"olv.portal.user.search.go":{value:"View Profile"},"olv.portal.yes":{value:"Yes"}};
$(document).pjax("a",pjax_container),$(document).on('pjax:timeout',function(){return false}),/*$(document).on('pjax:error',function(){return false}),*/
$(document).on('pjax:send',function(){NProgress.start()});$(document).on('pjax:complete',function(){$('#wrapper').attr('class', $('#main-body').attr('class')),NProgress.done();Olv.init.done()});