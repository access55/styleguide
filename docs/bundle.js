var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function a(t){t.forEach(n)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e,n){if(t){const o=s(t,e,n);return t[0](o)}}function s(t,n,o){return t[1]?e({},e(n.$$scope.ctx,t[1](o?o(n):{}))):n.$$scope.ctx}function c(t,n,o,a){return t[1]?e({},e(n.$$scope.changed||{},t[1](a?a(o):{}))):n.$$scope.changed||{}}function u(t){return null==t?"":t}function f(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function m(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function v(){return g(" ")}function y(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function b(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function $(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let x;function k(t){x=t}const E=[],_=[],S=[],j=[],T=Promise.resolve();let A=!1;function O(t){S.push(t)}function L(){const t=new Set;do{for(;E.length;){const t=E.shift();k(t),q(t.$$)}for(;_.length;)_.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];t.has(n)||(n(),t.add(n))}S.length=0}while(E.length);for(;j.length;)j.pop()();A=!1}function q(t){t.fragment&&(t.update(t.dirty),a(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(O))}const C=new Set;let F;function M(){F={r:0,c:[],p:F}}function R(){F.r||a(F.c),F=F.p}function z(t,e){t&&t.i&&(C.delete(t),t.i(e))}function B(t,e,n,o){if(t&&t.o){if(C.has(t))return;C.add(t),F.c.push(()=>{C.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function H(t,e,o){const{fragment:i,on_mount:l,on_destroy:s,after_update:c}=t.$$;i.m(e,o),O(()=>{const e=l.map(n).filter(r);s?s.push(...e):a(e),t.$$.on_mount=[]}),c.forEach(O)}function P(t,e){t.$$.fragment&&(a(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function I(t,e){t.$$.dirty||(E.push(t),A||(A=!0,T.then(L)),t.$$.dirty=o()),t.$$.dirty[e]=!0}function N(e,n,r,i,l,s){const c=x;k(e);const u=n.props||{},f=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:o(),dirty:null};let d=!1;var p;f.ctx=r?r(e,u,(t,n,o=n)=>(f.ctx&&l(f.ctx[t],f.ctx[t]=o)&&(f.bound[t]&&f.bound[t](o),d&&I(e,t)),n)):u,f.update(),d=!0,a(f.before_update),f.fragment=i(f.ctx),n.target&&(n.hydrate?f.fragment.l((p=n.target,Array.from(p.childNodes))):f.fragment.c(),n.intro&&z(e.$$.fragment),H(e,n.target,n.anchor),L()),k(c)}class D{$destroy(){P(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}var U="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function X(t,e){return t(e={exports:{}},e.exports),e.exports}var Y,G=X(function(t,e){var n;n=function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=s(n(1)),i=s(n(3)),l=s(n(4));function s(t){return t&&t.__esModule?t:{default:t}}var c=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default),a(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===o(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,l.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new r.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return u("action",t)}},{key:"defaultTarget",value:function(t){var e=u("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return u("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}();function u(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=c},function(t,e,n){var o,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),i=n(2),l=(o=i)&&o.__esModule?o:{default:o};var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.resolveOptions(e),this.initSelection()}return r(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,l.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,l.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":a(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=s},function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),a=document.createRange();a.selectNodeContents(t),o.removeAllRanges(),o.addRange(a),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function a(){o.off(t,a),e.apply(n,arguments)}return a._=e,this.on(t,a,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,a=n.length;o<a;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],a=[];if(o&&e)for(var r=0,i=o.length;r<i;r++)o[r].fn!==e&&o[r].fn._!==e&&a.push(o[r]);return a.length?n[t]=a:delete n[t],this}},t.exports=n},function(t,e,n){var o=n(5),a=n(6);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!o.string(e))throw new TypeError("Second argument must be a String");if(!o.fn(n))throw new TypeError("Third argument must be a Function");if(o.node(t))return function(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}(t,e,n);if(o.nodeList(t))return function(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}(t,e,n);if(o.string(t))return function(t,e,n){return a(document.body,t,e,n)}(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var o=n(7);function a(t,e,n,a,r){var i=function(t,e,n,a){return function(n){n.delegateTarget=o(n.target,e),n.delegateTarget&&a.call(t,n)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?a.apply(null,arguments):"function"==typeof n?a.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return a(t,e,n,o,r)}))}},function(t,e){var n=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var o=Element.prototype;o.matches=o.matchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector}t.exports=function(t,e){for(;t&&t.nodeType!==n;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}}])},t.exports=n()});const V=new((Y=G)&&Y.__esModule&&Object.prototype.hasOwnProperty.call(Y,"default")?Y.default:Y)(".clipboard");V.on("success",function(t){const e=t.trigger.parentNode;e.classList.add("--copied"),setTimeout(()=>{e.classList.remove("--copied")},1300),t.clearSelection()}),V.on("error",function(t){console.error("Action:",t.action),console.error("Trigger:",t.trigger)});const W=t=>{t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,n,o){return e+e+n+n+o+o});const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null};function J(e){var n,o,a,r,i,l,s,c,u,m,y,x,k,E=e.color.name+"";return{c(){n=h("div"),o=h("div"),a=g(E),r=v(),i=h("span"),l=g("hex"),c=v(),u=h("span"),m=g("rgb"),x=v(),(k=h("span")).textContent="copiado!",b(o,"class","name svelte-1nyit0g"),b(i,"data-clipboard-text",s=e.color.hex),b(i,"class","clipboard svelte-1nyit0g"),b(u,"data-clipboard-text",y=e.rgb(e.color.hex)),b(u,"class","clipboard svelte-1nyit0g"),b(k,"class","copied svelte-1nyit0g"),b(n,"class","color svelte-1nyit0g"),w(n,"background-color",e.color.hex),w(n,"color",e.color.color)},m(t,e){d(t,n,e),f(n,o),f(o,a),f(n,r),f(n,i),f(i,l),f(n,c),f(n,u),f(u,m),f(n,x),f(n,k)},p(t,e){t.color&&E!==(E=e.color.name+"")&&$(a,E),t.color&&s!==(s=e.color.hex)&&b(i,"data-clipboard-text",s),t.color&&y!==(y=e.rgb(e.color.hex))&&b(u,"data-clipboard-text",y),t.color&&(w(n,"background-color",e.color.hex),w(n,"color",e.color.color))},i:t,o:t,d(t){t&&p(n)}}}function K(t,e,n){let{color:o}=e;return t.$set=(t=>{"color"in t&&n("color",o=t.color)}),{color:o,rgb:function(t){const{r:e,g:n,b:o}=W(t);return`rgb(${[e,n,o].join(",")})`}}}class Q extends D{constructor(t){super(),N(this,t,K,J,i,["color"])}}function Z(t,e,n){const o=Object.create(t);return o.color=e[n],o}function tt(t){var e,n,o,a=new Q({props:{color:t.color}});return{c(){e=h("div"),a.$$.fragment.c(),n=v(),b(e,"class","item svelte-17e7tvl")},m(t,r){d(t,e,r),H(a,e,null),f(e,n),o=!0},p(t,e){var n={};t.data&&(n.color=e.color),a.$set(n)},i(t){o||(z(a.$$.fragment,t),o=!0)},o(t){B(a.$$.fragment,t),o=!1},d(t){t&&p(e),P(a)}}}function et(t){var e,n;let o=t.data,a=[];for(let e=0;e<o.length;e+=1)a[e]=tt(Z(t,o,e));const r=t=>B(a[t],1,1,()=>{a[t]=null});return{c(){e=h("div");for(let t=0;t<a.length;t+=1)a[t].c();b(e,"class","colors svelte-17e7tvl")},m(t,o){d(t,e,o);for(let t=0;t<a.length;t+=1)a[t].m(e,null);n=!0},p(t,n){if(t.data){let i;for(o=n.data,i=0;i<o.length;i+=1){const r=Z(n,o,i);a[i]?(a[i].p(t,r),z(a[i],1)):(a[i]=tt(r),a[i].c(),z(a[i],1),a[i].m(e,null))}for(M(),i=o.length;i<a.length;i+=1)r(i);R()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)z(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)B(a[t]);n=!1},d(t){t&&p(e),m(a,t)}}}function nt(t,e,n){let{data:o}=e;return t.$set=(t=>{"data"in t&&n("data",o=t.data)}),{data:o}}class ot extends D{constructor(t){super(),N(this,t,nt,et,i,["data"])}}function at(t,e,n){const o=Object.create(t);return o.icon=e[n],o}function rt(t){var e,n,o,a,r,i,l,s,c,u=t.icon.name+"",m=t.icon.purpose+"";return{c(){e=h("div"),n=h("div"),o=h("a"),a=g(u),i=v(),l=h("div"),s=g(m),c=v(),b(o,"href",r=t.icon.source),b(o,"target","_blank"),b(n,"class","name svelte-1is479e"),b(l,"class","purpose svelte-1is479e"),b(e,"class","item svelte-1is479e")},m(t,r){d(t,e,r),f(e,n),f(n,o),f(o,a),f(e,i),f(e,l),f(l,s),f(e,c)},p(t,e){t.data&&u!==(u=e.icon.name+"")&&$(a,u),t.data&&r!==(r=e.icon.source)&&b(o,"href",r),t.data&&m!==(m=e.icon.purpose+"")&&$(s,m)},d(t){t&&p(e)}}}function it(e){var n;let o=e.data,a=[];for(let t=0;t<o.length;t+=1)a[t]=rt(at(e,o,t));return{c(){n=h("div");for(let t=0;t<a.length;t+=1)a[t].c();b(n,"class","icons svelte-1is479e")},m(t,e){d(t,n,e);for(let t=0;t<a.length;t+=1)a[t].m(n,null)},p(t,e){if(t.data){let r;for(o=e.data,r=0;r<o.length;r+=1){const i=at(e,o,r);a[r]?a[r].p(t,i):(a[r]=rt(i),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=o.length}},i:t,o:t,d(t){t&&p(n),m(a,t)}}}function lt(t,e,n){let{data:o}=e;return t.$set=(t=>{"data"in t&&n("data",o=t.data)}),{data:o}}class st extends D{constructor(t){super(),N(this,t,lt,it,i,["data"])}}var ct=X(function(t,e){!function(){function e(t,e,n){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){r(o.response,e,n)},o.onerror=function(){console.error("could not download file")},o.send()}function n(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function o(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(n){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof U&&U.global===U?U:void 0,r=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype?function(t,r,i){var l=a.URL||a.webkitURL,s=document.createElement("a");r=r||t.name||"download",s.download=r,s.rel="noopener","string"==typeof t?(s.href=t,s.origin===location.origin?o(s):n(s.href)?e(t,r,i):o(s,s.target="_blank")):(s.href=l.createObjectURL(t),setTimeout(function(){l.revokeObjectURL(s.href)},4e4),setTimeout(function(){o(s)},0))}:"msSaveOrOpenBlob"in navigator?function(t,a,r){if(a=a||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(t,e){return void 0===e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,r),a);else if(n(t))e(t,a,r);else{var i=document.createElement("a");i.href=t,i.target="_blank",setTimeout(function(){o(i)})}}:function(t,n,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof t)return e(t,n,o);var i="application/octet-stream"===t.type,l=/constructor/i.test(a.HTMLElement)||a.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent);if((s||i&&l)&&"object"==typeof FileReader){var c=new FileReader;c.onloadend=function(){var t=c.result;t=s?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=t:location=t,r=null},c.readAsDataURL(t)}else{var u=a.URL||a.webkitURL,f=u.createObjectURL(t);r?r.location=f:location.href=f,r=null,setTimeout(function(){u.revokeObjectURL(f)},4e4)}});a.saveAs=r.saveAs=r,t.exports=r}()});function ut(e){var n,o,a,r,i,l,s,c,u,m,$,w;return{c(){n=h("div"),o=h("img"),r=v(),i=h("span"),l=g("copiar"),s=v(),c=h("span"),u=g("baixar"),m=v(),($=h("span")).textContent="copiado!",b(o,"src",a=e.placeholder||e.src),b(o,"alt",e.alt),b(o,"class","svelte-uq4efq"),b(i,"class","clipboard svelte-uq4efq"),b(i,"data-clipboard-text",e.src),b(c,"data-target",e.src),b(c,"data-filename",e.filename),b(c,"class","svelte-uq4efq"),b($,"class","copied svelte-uq4efq"),b(n,"class","image svelte-uq4efq"),w=y(c,"click",ft)},m(t,e){d(t,n,e),f(n,o),f(n,r),f(n,i),f(i,l),f(n,s),f(n,c),f(c,u),f(n,m),f(n,$)},p(t,e){(t.placeholder||t.src)&&a!==(a=e.placeholder||e.src)&&b(o,"src",a),t.alt&&b(o,"alt",e.alt),t.src&&(b(i,"data-clipboard-text",e.src),b(c,"data-target",e.src)),t.filename&&b(c,"data-filename",e.filename)},i:t,o:t,d(t){t&&p(n),w()}}}function ft(){const t=this.dataset.target,e=this.dataset.filename;t&&ct.saveAs(t,e)}function dt(t,e,n){let{src:o,placeholder:a=!1,filename:r,alt:i,classlist:l}=e;return t.$set=(t=>{"src"in t&&n("src",o=t.src),"placeholder"in t&&n("placeholder",a=t.placeholder),"filename"in t&&n("filename",r=t.filename),"alt"in t&&n("alt",i=t.alt),"classlist"in t&&n("classlist",l=t.classlist)}),{src:o,placeholder:a,filename:r,alt:i,classlist:l}}class pt extends D{constructor(t){super(),N(this,t,dt,ut,i,["src","placeholder","filename","alt","classlist"])}}function mt(t,e,n){const o=Object.create(t);return o.i=e[n],o}function ht(t){var n,o,a,r,i=[t.i];let l={};for(var s=0;s<i.length;s+=1)l=e(l,i[s]);var c=new pt({props:l});return{c(){n=h("div"),c.$$.fragment.c(),o=v(),b(n,"class",a=u(t.i.classlist)+" svelte-17u2dnj")},m(t,e){d(t,n,e),H(c,n,null),f(n,o),r=!0},p(t,e){var o,l=t.data?function(t,e){const n={},o={},a={$$scope:1};let r=t.length;for(;r--;){const i=t[r],l=e[r];if(l){for(const t in i)t in l||(o[t]=1);for(const t in l)a[t]||(n[t]=l[t],a[t]=1);t[r]=l}else for(const t in i)a[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(i,[(o=e.i,"object"==typeof o&&null!==o?o:{})]):{};c.$set(l),r&&!t.data||a===(a=u(e.i.classlist)+" svelte-17u2dnj")||b(n,"class",a)},i(t){r||(z(c.$$.fragment,t),r=!0)},o(t){B(c.$$.fragment,t),r=!1},d(t){t&&p(n),P(c)}}}function gt(t){var e,n;let o=t.data,a=[];for(let e=0;e<o.length;e+=1)a[e]=ht(mt(t,o,e));const r=t=>B(a[t],1,1,()=>{a[t]=null});return{c(){e=h("div");for(let t=0;t<a.length;t+=1)a[t].c();b(e,"class","images svelte-17u2dnj")},m(t,o){d(t,e,o);for(let t=0;t<a.length;t+=1)a[t].m(e,null);n=!0},p(t,n){if(t.data){let i;for(o=n.data,i=0;i<o.length;i+=1){const r=mt(n,o,i);a[i]?(a[i].p(t,r),z(a[i],1)):(a[i]=ht(r),a[i].c(),z(a[i],1),a[i].m(e,null))}for(M(),i=o.length;i<a.length;i+=1)r(i);R()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)z(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)B(a[t]);n=!1},d(t){t&&p(e),m(a,t)}}}function vt(t,e,n){let{data:o}=e;return t.$set=(t=>{"data"in t&&n("data",o=t.data)}),{data:o}}class yt extends D{constructor(t){super(),N(this,t,vt,gt,i,["data"])}}var bt="1.0.0";function $t(t){var e,n,o,a,r,i,u,m,y,x,k,E,_;const S=t.$$slots.default,j=l(S,t,null);return{c(){e=h("header"),n=h("nav"),o=h("a"),a=g(t.website),r=v(),i=h("h1"),u=g("Styleguide "),m=h("small"),y=g("v"),x=g(bt),k=v(),E=h("ul"),j&&j.c(),b(o,"href",t.website),b(o,"title","Website"),b(o,"target","_blank"),w(o,"background-image","url("+t.logo+")"),b(o,"class","svelte-1txvz0y"),b(m,"class","svelte-1txvz0y"),b(i,"class","svelte-1txvz0y"),b(E,"class","svelte-1txvz0y"),b(n,"class","svelte-1txvz0y"),b(e,"class","svelte-1txvz0y")},l(t){j&&j.l(ul_nodes)},m(t,l){d(t,e,l),f(e,n),f(n,o),f(o,a),f(n,r),f(n,i),f(i,u),f(i,m),f(m,y),f(m,x),f(n,k),f(n,E),j&&j.m(E,null),_=!0},p(t,e){_&&!t.website||($(a,e.website),b(o,"href",e.website)),_&&!t.logo||w(o,"background-image","url("+e.logo+")"),j&&j.p&&t.$$scope&&j.p(c(S,e,t,null),s(S,e,null))},i(t){_||(z(j,t),_=!0)},o(t){B(j,t),_=!1},d(t){t&&p(e),j&&j.d(t)}}}function wt(t,e,n){let{logo:o,website:a}=e,{$$slots:r={},$$scope:i}=e;return t.$set=(t=>{"logo"in t&&n("logo",o=t.logo),"website"in t&&n("website",a=t.website),"$$scope"in t&&n("$$scope",i=t.$$scope)}),{logo:o,website:a,$$slots:r,$$scope:i}}class xt extends D{constructor(t){super(),N(this,t,wt,$t,i,["logo","website"])}}function kt(t){var e,n,o,a;const r=t.$$slots.default,i=l(r,t,null);return{c(){e=h("li"),n=h("a"),i&&i.c(),b(n,"href",t.anchor),b(n,"class","svelte-5zmr5"),b(e,"class","svelte-5zmr5"),a=y(n,"click",t.handle_click,{once:!0})},l(t){i&&i.l(a_nodes)},m(t,a){d(t,e,a),f(e,n),i&&i.m(n,null),o=!0},p(t,e){i&&i.p&&t.$$scope&&i.p(c(r,e,t,null),s(r,e,null))},i(t){o||(z(i,t),o=!0)},o(t){B(i,t),o=!1},d(t){t&&p(e),i&&i.d(t),a()}}}function Et(t,e,n){let{path:o}=e;const a=`#${o}`;let{$$slots:r={},$$scope:i}=e;return t.$set=(t=>{"path"in t&&n("path",o=t.path),"$$scope"in t&&n("$$scope",i=t.$$scope)}),{path:o,anchor:a,handle_click:async function(t){t.preventDefault();const e=this.getAttribute("href"),n=document.querySelector(e);try{await n.scrollIntoView({behavior:"smooth",block:"start",inline:"start"}),window.location.hash=e}catch(t){console.log("can't find target: ",e)}},$$slots:r,$$scope:i}}class _t extends D{constructor(t){super(),N(this,t,Et,kt,i,["path"])}}function St(t,e,n){const o=Object.create(t);return o.domain=e[n],o}function jt(t){var e,n,o,a,r,i,l,s,c,u,m,y,w=t.domain.name+"",x=t.domain.domain+"";return{c(){e=h("div"),n=h("div"),o=h("a"),a=g(w),i=g(" | "),l=h("small"),c=v(),u=h("div"),m=g(x),y=v(),b(o,"href",r=t.domain.domain),b(o,"target","_blank"),b(l,"data-clipboard-text",s=t.domain.domain),b(l,"class","clipboard svelte-qobutn"),b(n,"class","name svelte-qobutn"),b(u,"class","details svelte-qobutn"),b(e,"class","item svelte-qobutn")},m(t,r){d(t,e,r),f(e,n),f(n,o),f(o,a),f(n,i),f(n,l),f(e,c),f(e,u),f(u,m),f(e,y)},p(t,e){t.data&&w!==(w=e.domain.name+"")&&$(a,w),t.data&&r!==(r=e.domain.domain)&&b(o,"href",r),t.data&&s!==(s=e.domain.domain)&&b(l,"data-clipboard-text",s),t.data&&x!==(x=e.domain.domain+"")&&$(m,x)},d(t){t&&p(e)}}}function Tt(e){var n;let o=e.data,a=[];for(let t=0;t<o.length;t+=1)a[t]=jt(St(e,o,t));return{c(){n=h("div");for(let t=0;t<a.length;t+=1)a[t].c();b(n,"class","domains svelte-qobutn")},m(t,e){d(t,n,e);for(let t=0;t<a.length;t+=1)a[t].m(n,null)},p(t,e){if(t.data){let r;for(o=e.data,r=0;r<o.length;r+=1){const i=St(e,o,r);a[r]?a[r].p(t,i):(a[r]=jt(i),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=o.length}},i:t,o:t,d(t){t&&p(n),m(a,t)}}}function At(t,e,n){let{data:o}=e;return t.$set=(t=>{"data"in t&&n("data",o=t.data)}),{data:o}}class Ot extends D{constructor(t){super(),N(this,t,At,Tt,i,["data"])}}function Lt(t){var e,n,o,a,r;const i=t.$$slots.default,u=l(i,t,null);return{c(){e=h("section"),n=h("h3"),o=g(t.title),a=v(),u&&u.c(),b(n,"id",t.target),b(n,"class","svelte-60kwhl"),b(e,"class","svelte-60kwhl")},l(t){u&&u.l(section_nodes)},m(t,i){d(t,e,i),f(e,n),f(n,o),f(e,a),u&&u.m(e,null),r=!0},p(t,e){r&&!t.title||$(o,e.title),r&&!t.target||b(n,"id",e.target),u&&u.p&&t.$$scope&&u.p(c(i,e,t,null),s(i,e,null))},i(t){r||(z(u,t),r=!0)},o(t){B(u,t),r=!1},d(t){t&&p(e),u&&u.d(t)}}}function qt(t,e,n){let{title:o,target:a}=e,{$$slots:r={},$$scope:i}=e;return t.$set=(t=>{"title"in t&&n("title",o=t.title),"target"in t&&n("target",a=t.target),"$$scope"in t&&n("$$scope",i=t.$$scope)}),{title:o,target:a,$$slots:r,$$scope:i}}class Ct extends D{constructor(t){super(),N(this,t,qt,Lt,i,["title","target"])}}function Ft(e){var n,o,a,r,i,l,s,c,u,m,y,w,x,k,E,_,S,j,T,A,O=e.family.name+"",L=e.family.desc+"";return{c(){n=h("div"),o=h("div"),a=g(O),r=h("br"),i=v(),l=h("small"),s=g("("),c=g(L),u=g(")"),m=v(),y=h("span"),w=g("copiar"),k=v(),E=h("span"),_=h("a"),S=g("ver"),T=v(),(A=h("span")).textContent="copiado!",b(r,"class","svelte-1jqs7fw"),b(l,"class","svelte-1jqs7fw"),b(o,"class","name svelte-1jqs7fw"),b(y,"class","clipboard svelte-1jqs7fw"),b(y,"data-clipboard-text",x=e.family.name),b(_,"href",j=e.family.href),b(_,"target","_blank"),b(_,"class","svelte-1jqs7fw"),b(E,"class","svelte-1jqs7fw"),b(A,"class","copied svelte-1jqs7fw"),b(n,"class","family svelte-1jqs7fw")},m(t,e){d(t,n,e),f(n,o),f(o,a),f(o,r),f(o,i),f(o,l),f(l,s),f(l,c),f(l,u),f(n,m),f(n,y),f(y,w),f(n,k),f(n,E),f(E,_),f(_,S),f(n,T),f(n,A)},p(t,e){t.family&&O!==(O=e.family.name+"")&&$(a,O),t.family&&L!==(L=e.family.desc+"")&&$(c,L),t.family&&x!==(x=e.family.name)&&b(y,"data-clipboard-text",x),t.family&&j!==(j=e.family.href)&&b(_,"href",j)},i:t,o:t,d(t){t&&p(n)}}}function Mt(t,e,n){let{family:o}=e;return t.$set=(t=>{"family"in t&&n("family",o=t.family)}),{family:o}}class Rt extends D{constructor(t){super(),N(this,t,Mt,Ft,i,["family"])}}function zt(t,e,n){const o=Object.create(t);return o.family=e[n],o}function Bt(t){var e,n,o,a=new Rt({props:{family:t.family}});return{c(){e=h("div"),a.$$.fragment.c(),n=v(),b(e,"class","item svelte-v283h1")},m(t,r){d(t,e,r),H(a,e,null),f(e,n),o=!0},p(t,e){var n={};t.data&&(n.family=e.family),a.$set(n)},i(t){o||(z(a.$$.fragment,t),o=!0)},o(t){B(a.$$.fragment,t),o=!1},d(t){t&&p(e),P(a)}}}function Ht(t){var e,n;let o=t.data,a=[];for(let e=0;e<o.length;e+=1)a[e]=Bt(zt(t,o,e));const r=t=>B(a[t],1,1,()=>{a[t]=null});return{c(){e=h("div");for(let t=0;t<a.length;t+=1)a[t].c();b(e,"class","typography svelte-v283h1")},m(t,o){d(t,e,o);for(let t=0;t<a.length;t+=1)a[t].m(e,null);n=!0},p(t,n){if(t.data){let i;for(o=n.data,i=0;i<o.length;i+=1){const r=zt(n,o,i);a[i]?(a[i].p(t,r),z(a[i],1)):(a[i]=Bt(r),a[i].c(),z(a[i],1),a[i].m(e,null))}for(M(),i=o.length;i<a.length;i+=1)r(i);R()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)z(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)B(a[t]);n=!1},d(t){t&&p(e),m(a,t)}}}function Pt(t,e,n){let{data:o}=e;return t.$set=(t=>{"data"in t&&n("data",o=t.data)}),{data:o}}class It extends D{constructor(t){super(),N(this,t,Pt,Ht,i,["data"])}}function Nt(t,e,n){const o=Object.create(t);return o.item=e[n],o}function Dt(t,e,n){const o=Object.create(t);return o.item=e[n],o}function Ut(t){var e,n,o=t.item.name+"";return{c(){e=g(o),n=v()},m(t,o){d(t,e,o),d(t,n,o)},p(t,n){t.menu&&o!==(o=n.item.name+"")&&$(e,o)},d(t){t&&(p(e),p(n))}}}function Xt(t){var e,n=new _t({props:{path:t.item.target,$$slots:{default:[Ut]},$$scope:{ctx:t}}});return{c(){n.$$.fragment.c()},m(t,o){H(n,t,o),e=!0},p(t,e){var o={};t.menu&&(o.path=e.item.target),(t.$$scope||t.menu)&&(o.$$scope={changed:t,ctx:e}),n.$set(o)},i(t){e||(z(n.$$.fragment,t),e=!0)},o(t){B(n.$$.fragment,t),e=!1},d(t){P(n,t)}}}function Yt(t){var e,n;let o=t.menu,a=[];for(let e=0;e<o.length;e+=1)a[e]=Xt(Dt(t,o,e));const r=t=>B(a[t],1,1,()=>{a[t]=null});return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=g("")},m(t,o){for(let e=0;e<a.length;e+=1)a[e].m(t,o);d(t,e,o),n=!0},p(t,n){if(t.menu){let i;for(o=n.menu,i=0;i<o.length;i+=1){const r=Dt(n,o,i);a[i]?(a[i].p(t,r),z(a[i],1)):(a[i]=Xt(r),a[i].c(),z(a[i],1),a[i].m(e.parentNode,e))}for(M(),i=o.length;i<a.length;i+=1)r(i);R()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)z(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)B(a[t]);n=!1},d(t){m(a,t),t&&p(e)}}}function Gt(t){var e,n,o=t.item.component;function a(t){return{props:{data:t.item.data}}}if(o)var r=new o(a(t));return{c(){r&&r.$$.fragment.c(),e=v()},m(t,o){r&&H(r,t,o),d(t,e,o),n=!0},p(t,n){if(o!==(o=n.item.component)){if(r){M();const t=r;B(t.$$.fragment,1,0,()=>{P(t,1)}),R()}o?((r=new o(a(n))).$$.fragment.c(),z(r.$$.fragment,1),H(r,e.parentNode,e)):r=null}},i(t){n||(r&&z(r.$$.fragment,t),n=!0)},o(t){r&&B(r.$$.fragment,t),n=!1},d(t){r&&P(r,t),t&&p(e)}}}function Vt(t){var e,n=new Ct({props:{title:t.item.title,target:t.item.target,$$slots:{default:[Gt]},$$scope:{ctx:t}}});return{c(){n.$$.fragment.c()},m(t,o){H(n,t,o),e=!0},p(t,e){var o={};t.$$scope&&(o.$$scope={changed:t,ctx:e}),n.$set(o)},i(t){e||(z(n.$$.fragment,t),e=!0)},o(t){B(n.$$.fragment,t),e=!1},d(t){P(n,t)}}}function Wt(t){var e,n,o,a,r=new xt({props:{website:t.domains[0].domain,logo:t.images[3].src,$$slots:{default:[Yt]},$$scope:{ctx:t}}});let i=t.main,l=[];for(let e=0;e<i.length;e+=1)l[e]=Vt(Nt(t,i,e));const s=t=>B(l[t],1,1,()=>{l[t]=null});return{c(){e=h("div"),r.$$.fragment.c(),n=v(),o=h("main");for(let t=0;t<l.length;t+=1)l[t].c();b(o,"class","svelte-1liuo1h"),b(e,"class","styleguide svelte-1liuo1h")},m(t,i){d(t,e,i),H(r,e,null),f(e,n),f(e,o);for(let t=0;t<l.length;t+=1)l[t].m(o,null);a=!0},p(t,e){var n={};if(t.domains&&(n.website=e.domains[0].domain),t.images&&(n.logo=e.images[3].src),(t.$$scope||t.menu)&&(n.$$scope={changed:t,ctx:e}),r.$set(n),t.main){let n;for(i=e.main,n=0;n<i.length;n+=1){const a=Nt(e,i,n);l[n]?(l[n].p(t,a),z(l[n],1)):(l[n]=Vt(a),l[n].c(),z(l[n],1),l[n].m(o,null))}for(M(),n=i.length;n<l.length;n+=1)s(n);R()}},i(t){if(!a){z(r.$$.fragment,t);for(let t=0;t<i.length;t+=1)z(l[t]);a=!0}},o(t){B(r.$$.fragment,t),l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)B(l[t]);a=!1},d(t){t&&p(e),P(r),m(l,t)}}}function Jt(t,e,n){let{menu:o,images:a,colors:r,typography:i,icons:l,domains:s}=e;const c=[{component:yt,data:a,title:"Imagens",target:"images"},{component:ot,data:r,title:"Cores",target:"colors"},{component:It,data:i,title:"Tipografia",target:"typography"},{component:st,data:l,title:"Ícones",target:"icons"},{component:Ot,data:s,title:"Domínios",target:"domains"}];return t.$set=(t=>{"menu"in t&&n("menu",o=t.menu),"images"in t&&n("images",a=t.images),"colors"in t&&n("colors",r=t.colors),"typography"in t&&n("typography",i=t.typography),"icons"in t&&n("icons",l=t.icons),"domains"in t&&n("domains",s=t.domains)}),{menu:o,images:a,colors:r,typography:i,icons:l,domains:s,main:c}}const Kt={menu:[{target:"images",name:"Imagens"},{target:"colors",name:"Cores"},{target:"typography",name:"Tipografia"},{target:"icons",name:"Ícones"},{target:"domains",name:"Domínios"}],images:[{src:"https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_logo_99x43_2019.png",filename:"logo-a55.png",alt:"Logo A55",classlist:"item"},{src:"https://cdn-a55.s3-sa-east-1.amazonaws.com/apple-touch-icon.png",filename:"icone-a55.png",alt:"Ícone A55",classlist:"item"},{src:"https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone.svg",filename:"icone-a55.svg",alt:"Ícone A55 (.svg)",classlist:"item svg"},{src:"https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone_branco.svg",filename:"icone-branco-a55.svg",alt:"Ícone Branco A55 (.svg)",classlist:"item svg alt"},{src:"https://cdn-a55.s3-sa-east-1.amazonaws.com/favicon-pack.zip",placeholder:"https://via.placeholder.com/400/0096FF/FFFFFF?text=%20",filename:"favicon.zip",alt:"Pacote de favicons",classlist:"item fav"}],colors:[{name:"primary",hex:"#0096FF",color:"white"},{name:"secondary",hex:"#1262FF",color:"white"},{name:"error",hex:"#FB0D1B",color:"black"},{name:"success",hex:"#35D110",color:"white"},{name:"warning",hex:"#FFCC00",color:"black"},{name:"grey1",hex:"#333132",color:"white"},{name:"grey2",hex:"#58595B",color:"white"},{name:"grey3",hex:"#8A8C8E",color:"black"},{name:"grey4",hex:"#DCDDDE",color:"black"},{name:"grey5",hex:"#F1F2F2",color:"black"}],typography:[{name:"Open Sans",href:"https://fonts.google.com/specimen/Open+Sans",desc:"titles"},{name:"Roboto",href:"https://fonts.google.com/specimen/Roboto",desc:"copy"}],icons:[{name:"Element UI",purpose:"uso geral",source:"https://element.eleme.io/#/en-US/component/icon"},{name:"Material Design",purpose:"menu de navegação",source:"https://material.io/resources/icons/?style=baseline"}],domains:[{name:"Site Institucional",gifs:"",domain:"https://a55.tech"},{name:"Metabase (Investidor)",gifs:"",domain:"https://metabase.a55.tech"},{name:"Apply (Formulário de aplicação)",gifs:"",domain:"https://apply.a55.tech"},{name:"App (Cliente)",gifs:"",domain:"https://app.a55.tech"},{name:"Midgard (Backoffice)",gifs:"",domain:"https://midgard.a55.tech"},{name:"Assinatura de email",gifs:"",domain:"https://email-signature.a55.tech"}]};return new class extends D{constructor(t){super(),N(this,t,Jt,Wt,i,["menu","images","colors","typography","icons","domains"])}}({target:document.body,props:Kt})}();
//# sourceMappingURL=bundle.js.map
