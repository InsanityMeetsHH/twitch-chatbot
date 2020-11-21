/*!
  * vue-router v3.4.9
  * (c) 2020 Evan You
  * @license MIT
  */
var t,e;t=this,e=function(){"use strict";function t(t,e){for(var r in e)t[r]=e[r];return t}var e=/[!'()*]/g,r=function(t){return"%"+t.charCodeAt(0).toString(16)},n=/%2C/g,o=function(t){return encodeURIComponent(t).replace(e,r).replace(n,",")};function i(t){try{return decodeURIComponent(t)}catch(t){}return t}var a=function(t){return null==t||"object"==typeof t?t:String(t)};function s(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach((function(t){var r=t.replace(/\+/g," ").split("="),n=i(r.shift()),o=r.length>0?i(r.join("=")):null;void 0===e[n]?e[n]=o:Array.isArray(e[n])?e[n].push(o):e[n]=[e[n],o]})),e):e}function u(t){var e=t?Object.keys(t).map((function(e){var r=t[e];if(void 0===r)return"";if(null===r)return o(e);if(Array.isArray(r)){var n=[];return r.forEach((function(t){void 0!==t&&(null===t?n.push(o(e)):n.push(o(e)+"="+o(t)))})),n.join("&")}return o(e)+"="+o(r)})).filter((function(t){return t.length>0})).join("&"):null;return e?"?"+e:""}var c=/\/?$/;function p(t,e,r,n){var o=n&&n.options.stringifyQuery,i=e.query||{};try{i=f(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:d(e,o),matched:t?l(t):[]};return r&&(a.redirectedFrom=d(r,o)),Object.freeze(a)}function f(t){if(Array.isArray(t))return t.map(f);if(t&&"object"==typeof t){var e={};for(var r in t)e[r]=f(t[r]);return e}return t}var h=p(null,{path:"/"});function l(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function d(t,e){var r=t.path,n=t.query;void 0===n&&(n={});var o=t.hash;return void 0===o&&(o=""),(r||"/")+(e||u)(n)+o}function v(t,e){return e===h?t===e:!!e&&(t.path&&e.path?t.path.replace(c,"")===e.path.replace(c,"")&&t.hash===e.hash&&y(t.query,e.query):!(!t.name||!e.name)&&t.name===e.name&&t.hash===e.hash&&y(t.query,e.query)&&y(t.params,e.params))}function y(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var r=Object.keys(t).sort(),n=Object.keys(e).sort();return r.length===n.length&&r.every((function(r,o){var i=t[r];if(n[o]!==r)return!1;var a=e[r];return null==i||null==a?i===a:"object"==typeof i&&"object"==typeof a?y(i,a):String(i)===String(a)}))}function m(t){for(var e=0;e<t.matched.length;e++){var r=t.matched[e];for(var n in r.instances){var o=r.instances[n],i=r.enteredCbs[n];if(o&&i){delete r.enteredCbs[n];for(var a=0;a<i.length;a++)o._isBeingDestroyed||i[a](o)}}}}var g={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,r){var n=r.props,o=r.children,i=r.parent,a=r.data;a.routerView=!0;for(var s=i.$createElement,u=n.name,c=i.$route,p=i._routerViewCache||(i._routerViewCache={}),f=0,h=!1;i&&i._routerRoot!==i;){var l=i.$vnode?i.$vnode.data:{};l.routerView&&f++,l.keepAlive&&i._directInactive&&i._inactive&&(h=!0),i=i.$parent}if(a.routerViewDepth=f,h){var d=p[u],v=d&&d.component;return v?(d.configProps&&w(v,a,d.route,d.configProps),s(v,a,o)):s()}var y=c.matched[f],g=y&&y.components[u];if(!y||!g)return p[u]=null,s();p[u]={component:g},a.registerRouteInstance=function(t,e){var r=y.instances[u];(e&&r!==t||!e&&r===t)&&(y.instances[u]=e)},(a.hook||(a.hook={})).prepatch=function(t,e){y.instances[u]=e.componentInstance},a.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==y.instances[u]&&(y.instances[u]=t.componentInstance),m(c)};var b=y.props&&y.props[u];return b&&(t(p[u],{route:c,configProps:b}),w(g,a,c,b)),s(g,a,o)}};function w(e,r,n,o){var i=r.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}(n,o);if(i){i=r.props=t({},i);var a=r.attrs=r.attrs||{};for(var s in i)e.props&&s in e.props||(a[s]=i[s],delete i[s])}}function b(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var s=i[a];".."===s?o.pop():"."!==s&&o.push(s)}return""!==o[0]&&o.unshift(""),o.join("/")}function x(t){return t.replace(/\/\//g,"/")}var k=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},R=function t(e,r,n){return k(r)||(n=r||n,r=[]),n=n||{},e instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return T(t,e)}(e,r):k(e)?function(e,r,n){for(var o=[],i=0;i<e.length;i++)o.push(t(e[i],r,n).source);return T(new RegExp("(?:"+o.join("|")+")",L(n)),r)}(e,r,n):function(t,e,r){return q(_(t,r),e,r)}(e,r,n)},E=_,C=S,A=q,O=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function _(t,e){for(var r,n=[],o=0,i=0,a="",s=e&&e.delimiter||"/";null!=(r=O.exec(t));){var u=r[0],c=r[1],p=r.index;if(a+=t.slice(i,p),i=p+u.length,c)a+=c[1];else{var f=t[i],h=r[2],l=r[3],d=r[4],v=r[5],y=r[6],m=r[7];a&&(n.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===y||"*"===y,b="?"===y||"*"===y,x=r[2]||s,k=d||v;n.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:k?P(k):m?".*":"[^"+$(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function j(t){return encodeURI(t).replace(/[\/?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function S(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",L(e)));return function(e,n){for(var o="",i=e||{},a=(n||{}).pretty?j:encodeURIComponent,s=0;s<t.length;s++){var u=t[s];if("string"!=typeof u){var c,p=i[u.name];if(null==p){if(u.optional){u.partial&&(o+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(k(p)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var f=0;f<p.length;f++){if(c=a(p[f]),!r[s].test(c))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(c)+"`");o+=(0===f?u.prefix:u.delimiter)+c}}else{if(c=u.asterisk?encodeURI(p).replace(/[?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})):a(p),!r[s].test(c))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+c+'"');o+=u.prefix+c}}else o+=u}return o}}function $(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function P(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function T(t,e){return t.keys=e,t}function L(t){return t&&t.sensitive?"":"i"}function q(t,e,r){k(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var s=t[a];if("string"==typeof s)i+=$(s);else{var u=$(s.prefix),c="(?:"+s.pattern+")";e.push(s),s.repeat&&(c+="(?:"+u+c+")*"),i+=c=s.optional?s.partial?u+"("+c+")?":"(?:"+u+"("+c+"))?":u+"("+c+")"}}var p=$(r.delimiter||"/"),f=i.slice(-p.length)===p;return n||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&f?"":"(?="+p+"|$)",T(new RegExp("^"+i,L(r)),e)}R.parse=E,R.compile=function(t,e){return S(_(t,e),e)},R.tokensToFunction=C,R.tokensToRegExp=A;var U=Object.create(null);function I(t,e,r){e=e||{};try{var n=U[t]||(U[t]=R.compile(t));return"string"==typeof e.pathMatch&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function M(e,r,n,o){var i="string"==typeof e?{path:e}:e;if(i._normalized)return i;if(i.name){var u=(i=t({},e)).params;return u&&"object"==typeof u&&(i.params=t({},u)),i}if(!i.path&&i.params&&r){(i=t({},i))._normalized=!0;var c=t(t({},r.params),i.params);if(r.name)i.name=r.name,i.params=c;else if(r.matched.length){var p=r.matched[r.matched.length-1].path;i.path=I(p,c,r.path)}return i}var f=function(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var o=t.indexOf("?");return o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),{path:t,query:r,hash:e}}(i.path||""),h=r&&r.path||"/",l=f.path?b(f.path,h,n||i.append):h,d=function(t,e,r){void 0===e&&(e={});var n,o=r||s;try{n=o(t||"")}catch(t){n={}}for(var i in e){var u=e[i];n[i]=Array.isArray(u)?u.map(a):a(u)}return n}(f.query,i.query,o&&o.options.parseQuery),v=i.hash||f.hash;return v&&"#"!==v.charAt(0)&&(v="#"+v),{_normalized:!0,path:l,query:d,hash:v}}var V,B=function(){},H={name:"RouterLink",props:{to:{type:[String,Object],required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:[String,Array],default:"click"}},render:function(e){var r=this,n=this.$router,o=this.$route,i=n.resolve(this.to,o,this.append),a=i.location,s=i.route,u=i.href,f={},h=n.options.linkActiveClass,l=n.options.linkExactActiveClass,d=null==h?"router-link-active":h,y=null==l?"router-link-exact-active":l,m=null==this.activeClass?d:this.activeClass,g=null==this.exactActiveClass?y:this.exactActiveClass,w=s.redirectedFrom?p(null,M(s.redirectedFrom),null,n):s;f[g]=v(o,w),f[m]=this.exact?f[g]:function(t,e){return 0===t.path.replace(c,"/").indexOf(e.path.replace(c,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}(o,w);var b=f[g]?this.ariaCurrentValue:null,x=function(t){F(t)&&(r.replace?n.replace(a,B):n.push(a,B))},k={click:F};Array.isArray(this.event)?this.event.forEach((function(t){k[t]=x})):k[this.event]=x;var R={class:f},E=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:u,route:s,navigate:x,isActive:f[m],isExactActive:f[g]});if(E){if(1===E.length)return E[0];if(E.length>1||!E.length)return 0===E.length?e():e("span",{},E)}if("a"===this.tag)R.on=k,R.attrs={href:u,"aria-current":b};else{var C=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(C){C.isStatic=!1;var A=C.data=t({},C.data);for(var O in A.on=A.on||{},A.on){var _=A.on[O];O in k&&(A.on[O]=Array.isArray(_)?_:[_])}for(var j in k)j in A.on?A.on[j].push(k[j]):A.on[j]=x;var S=C.data.attrs=t({},C.data.attrs);S.href=u,S["aria-current"]=b}else R.on=k}return e(this.tag,R,this.$slots.default)}};function F(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var N="undefined"!=typeof window;function z(t,e,r,n){var o=e||[],i=r||Object.create(null),a=n||Object.create(null);t.forEach((function(t){!function t(e,r,n,o,i,a){var s=o.path,u=o.name,c=o.pathToRegexpOptions||{},p=function(t,e,r){return r||(t=t.replace(/\/$/,"")),"/"===t[0]?t:null==e?t:x(e.path+"/"+t)}(s,i,c.strict);"boolean"==typeof o.caseSensitive&&(c.sensitive=o.caseSensitive);var f={path:p,regex:D(p,c),components:o.components||{default:o.component},instances:{},enteredCbs:{},name:u,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};if(o.children&&o.children.forEach((function(o){var i=a?x(a+"/"+o.path):void 0;t(e,r,n,o,f,i)})),r[f.path]||(e.push(f.path),r[f.path]=f),void 0!==o.alias)for(var h=Array.isArray(o.alias)?o.alias:[o.alias],l=0;l<h.length;++l){var d={path:h[l],children:o.children};t(e,r,n,d,i,f.path||"/")}u&&(n[u]||(n[u]=f))}(o,i,a,t)}));for(var s=0,u=o.length;s<u;s++)"*"===o[s]&&(o.push(o.splice(s,1)[0]),u--,s--);return{pathList:o,pathMap:i,nameMap:a}}function D(t,e){return R(t,[],e)}function K(t,e){var r=z(t),n=r.pathList,o=r.pathMap,i=r.nameMap;function a(t,r,a){var u=M(t,r,!1,e),c=u.name;if(c){var p=i[c];if(!p)return s(null,u);var f=p.regex.keys.filter((function(t){return!t.optional})).map((function(t){return t.name}));if("object"!=typeof u.params&&(u.params={}),r&&"object"==typeof r.params)for(var h in r.params)!(h in u.params)&&f.indexOf(h)>-1&&(u.params[h]=r.params[h]);return u.path=I(p.path,u.params),s(p,u,a)}if(u.path){u.params={};for(var l=0;l<n.length;l++){var d=n[l],v=o[d];if(J(v.regex,u.path,u.params))return s(v,u,a)}}return s(null,u)}function s(t,r,n){return t&&t.redirect?function(t,r){var n=t.redirect,o="function"==typeof n?n(p(t,r,null,e)):n;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return s(null,r);var u=o,c=u.name,f=u.path,h=r.query,l=r.hash,d=r.params;return h=u.hasOwnProperty("query")?u.query:h,l=u.hasOwnProperty("hash")?u.hash:l,d=u.hasOwnProperty("params")?u.params:d,c?(i[c],a({_normalized:!0,name:c,query:h,hash:l,params:d},void 0,r)):f?a({_normalized:!0,path:I(function(t,e){return b(t,e.parent?e.parent.path:"/",!0)}(f,t),d),query:h,hash:l},void 0,r):s(null,r)}(t,n||r):t&&t.matchAs?function(t,e,r){var n=a({_normalized:!0,path:I(r,e.params)});if(n){var o=n.matched,i=o[o.length-1];return e.params=n.params,s(i,e)}return s(null,e)}(0,r,t.matchAs):p(t,r,n,e)}return{match:a,addRoutes:function(t){z(t,n,o,i)}}}function J(t,e,r){var n=e.match(t);if(!n)return!1;if(!r)return!0;for(var o=1,a=n.length;o<a;++o){var s=t.keys[o-1];s&&(r[s.name||"pathMatch"]="string"==typeof n[o]?i(n[o]):n[o])}return!0}var Q=N&&window.performance&&window.performance.now?window.performance:Date;function X(){return Q.now().toFixed(3)}var Y=X();function W(){return Y}function G(t){return Y=t}var Z=Object.create(null);function tt(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var e=window.location.protocol+"//"+window.location.host,r=window.location.href.replace(e,""),n=t({},window.history.state);return n.key=W(),window.history.replaceState(n,"",r),window.addEventListener("popstate",nt),function(){window.removeEventListener("popstate",nt)}}function et(t,e,r,n){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick((function(){var i=function(){var t=W();if(t)return Z[t]}(),a=o.call(t,e,r,n?i:null);a&&("function"==typeof a.then?a.then((function(t){ut(t,i)})).catch((function(t){})):ut(a,i))}))}}function rt(){var t=W();t&&(Z[t]={x:window.pageXOffset,y:window.pageYOffset})}function nt(t){rt(),t.state&&t.state.key&&G(t.state.key)}function ot(t){return at(t.x)||at(t.y)}function it(t){return{x:at(t.x)?t.x:window.pageXOffset,y:at(t.y)?t.y:window.pageYOffset}}function at(t){return"number"==typeof t}var st=/^#\d/;function ut(t,e){var r,n="object"==typeof t;if(n&&"string"==typeof t.selector){var o=st.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(o){var i=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-r.left-e.x,y:n.top-r.top-e.y}}(o,i={x:at((r=i).x)?r.x:0,y:at(r.y)?r.y:0})}else ot(t)&&(e=it(t))}else n&&ot(t)&&(e=it(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var ct,pt=N&&(-1===(ct=window.navigator.userAgent).indexOf("Android 2.")&&-1===ct.indexOf("Android 4.0")||-1===ct.indexOf("Mobile Safari")||-1!==ct.indexOf("Chrome")||-1!==ct.indexOf("Windows Phone"))&&window.history&&"function"==typeof window.history.pushState;function ft(e,r){rt();var n=window.history;try{if(r){var o=t({},n.state);o.key=W(),n.replaceState(o,"",e)}else n.pushState({key:G(X())},"",e)}catch(t){window.location[r?"replace":"assign"](e)}}function ht(t){ft(t,!0)}function lt(t,e,r){var n=function(o){o>=t.length?r():t[o]?e(t[o],(function(){n(o+1)})):n(o+1)};n(0)}var dt={redirected:2,aborted:4,cancelled:8,duplicated:16};function vt(t,e){return yt(t,e,dt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function yt(t,e,r,n){var o=new Error(n);return o._isRouter=!0,o.from=t,o.to=e,o.type=r,o}var mt=["params","query","hash"];function gt(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function wt(t,e){return gt(t)&&t._isRouter&&(null==e||t.type===e)}function bt(t,e){return xt(t.map((function(t){return Object.keys(t.components).map((function(r){return e(t.components[r],t.instances[r],t,r)}))})))}function xt(t){return Array.prototype.concat.apply([],t)}var kt="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function Rt(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var Et=function(t,e){this.router=t,this.base=function(t){if(!t)if(N){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";return"/"!==t.charAt(0)&&(t="/"+t),t.replace(/\/$/,"")}(e),this.current=h,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};function Ct(t,e,r,n){var o=bt(t,(function(t,n,o,i){var a=function(t,e){return"function"!=typeof t&&(t=V.extend(t)),t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map((function(t){return r(t,n,o,i)})):r(a,n,o,i)}));return xt(n?o.reverse():o)}function At(t,e){if(e)return function(){return t.apply(e,arguments)}}Et.prototype.listen=function(t){this.cb=t},Et.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},Et.prototype.onError=function(t){this.errorCbs.push(t)},Et.prototype.transitionTo=function(t,e,r){var n,o=this;try{n=this.router.match(t,this.current)}catch(t){throw this.errorCbs.forEach((function(e){e(t)})),t}var i=this.current;this.confirmTransition(n,(function(){o.updateRoute(n),e&&e(n),o.ensureURL(),o.router.afterHooks.forEach((function(t){t&&t(n,i)})),o.ready||(o.ready=!0,o.readyCbs.forEach((function(t){t(n)})))}),(function(t){r&&r(t),t&&!o.ready&&(wt(t,dt.redirected)&&i===h||(o.ready=!0,o.readyErrorCbs.forEach((function(e){e(t)}))))}))},Et.prototype.confirmTransition=function(t,e,r){var n=this,o=this.current;this.pending=t;var i,a,s=function(t){!wt(t)&&gt(t)&&(n.errorCbs.length?n.errorCbs.forEach((function(e){e(t)})):console.error(t)),r&&r(t)},u=t.matched.length-1,c=o.matched.length-1;if(v(t,o)&&u===c&&t.matched[u]===o.matched[c])return this.ensureURL(),s(((a=yt(i=o,t,dt.duplicated,'Avoided redundant navigation to current location: "'+i.fullPath+'".')).name="NavigationDuplicated",a));var p=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,t.matched),f=p.updated,h=p.deactivated,l=p.activated,d=[].concat(function(t){return Ct(t,"beforeRouteLeave",At,!0)}(h),this.router.beforeHooks,function(t){return Ct(t,"beforeRouteUpdate",At)}(f),l.map((function(t){return t.beforeEnter})),function(t){return function(e,r,n){var o=!1,i=0,a=null;bt(t,(function(t,e,r,s){if("function"==typeof t&&void 0===t.cid){o=!0,i++;var u,c=Rt((function(e){var o;((o=e).__esModule||kt&&"Module"===o[Symbol.toStringTag])&&(e=e.default),t.resolved="function"==typeof e?e:V.extend(e),r.components[s]=e,--i<=0&&n()})),p=Rt((function(t){var e="Failed to resolve async component "+s+": "+t;a||(a=gt(t)?t:new Error(e),n(a))}));try{u=t(c,p)}catch(t){p(t)}if(u)if("function"==typeof u.then)u.then(c,p);else{var f=u.component;f&&"function"==typeof f.then&&f.then(c,p)}}})),o||n()}}(l)),y=function(e,r){if(n.pending!==t)return s(vt(o,t));try{e(t,o,(function(e){!1===e?(n.ensureURL(!0),s(function(t,e){return yt(t,e,dt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}(o,t))):gt(e)?(n.ensureURL(!0),s(e)):"string"==typeof e||"object"==typeof e&&("string"==typeof e.path||"string"==typeof e.name)?(s(function(t,e){return yt(t,e,dt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+function(t){if("string"==typeof t)return t;if("path"in t)return t.path;var e={};return mt.forEach((function(r){r in t&&(e[r]=t[r])})),JSON.stringify(e,null,2)}(e)+'" via a navigation guard.')}(o,t)),"object"==typeof e&&e.replace?n.replace(e):n.push(e)):r(e)}))}catch(t){s(t)}};lt(d,y,(function(){lt(function(t){return Ct(t,"beforeRouteEnter",(function(t,e,r,n){return function(t,e,r){return function(n,o,i){return t(n,o,(function(t){"function"==typeof t&&(e.enteredCbs[r]||(e.enteredCbs[r]=[]),e.enteredCbs[r].push(t)),i(t)}))}}(t,r,n)}))}(l).concat(n.router.resolveHooks),y,(function(){if(n.pending!==t)return s(vt(o,t));n.pending=null,e(t),n.router.app&&n.router.app.$nextTick((function(){m(t)}))}))}))},Et.prototype.updateRoute=function(t){this.current=t,this.cb&&this.cb(t)},Et.prototype.setupListeners=function(){},Et.prototype.teardown=function(){this.listeners.forEach((function(t){t()})),this.listeners=[],this.current=h,this.pending=null};var Ot=function(t){function e(e,r){t.call(this,e,r),this._startLocation=_t(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router,r=e.options.scrollBehavior,n=pt&&r;n&&this.listeners.push(tt());var o=function(){var r=t.current,o=_t(t.base);t.current===h&&o===t._startLocation||t.transitionTo(o,(function(t){n&&et(e,t,r,!0)}))};window.addEventListener("popstate",o),this.listeners.push((function(){window.removeEventListener("popstate",o)}))}},e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){ft(x(n.base+t.fullPath)),et(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){ht(x(n.base+t.fullPath)),et(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.ensureURL=function(t){if(_t(this.base)!==this.current.fullPath){var e=x(this.base+this.current.fullPath);t?ft(e):ht(e)}},e.prototype.getCurrentLocation=function(){return _t(this.base)},e}(Et);function _t(t){var e=window.location.pathname;return t&&0===e.toLowerCase().indexOf(t.toLowerCase())&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var jt=function(t){function e(e,r,n){t.call(this,e,r),n&&function(t){var e=_t(t);if(!/^\/#/.test(e))return window.location.replace(x(t+"/#"+e)),!0}(this.base)||St()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router.options.scrollBehavior,r=pt&&e;r&&this.listeners.push(tt());var n=function(){var e=t.current;St()&&t.transitionTo($t(),(function(n){r&&et(t.router,n,e,!0),pt||Lt(n.fullPath)}))},o=pt?"popstate":"hashchange";window.addEventListener(o,n),this.listeners.push((function(){window.removeEventListener(o,n)}))}},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){Tt(t.fullPath),et(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){Lt(t.fullPath),et(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;$t()!==e&&(t?Tt(e):Lt(e))},e.prototype.getCurrentLocation=function(){return $t()},e}(Et);function St(){var t=$t();return"/"===t.charAt(0)||(Lt("/"+t),!1)}function $t(){var t=window.location.href,e=t.indexOf("#");return e<0?"":t=t.slice(e+1)}function Pt(t){var e=window.location.href,r=e.indexOf("#");return(r>=0?e.slice(0,r):e)+"#"+t}function Tt(t){pt?ft(Pt(t)):window.location.hash=t}function Lt(t){pt?ht(Pt(t)):window.location.replace(Pt(t))}var qt=function(t){function e(e,r){t.call(this,e,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,r){var n=this;this.transitionTo(t,(function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,(function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)}),r)},e.prototype.go=function(t){var e=this,r=this.index+t;if(!(r<0||r>=this.stack.length)){var n=this.stack[r];this.confirmTransition(n,(function(){var t=e.current;e.index=r,e.updateRoute(n),e.router.afterHooks.forEach((function(e){e&&e(n,t)}))}),(function(t){wt(t,dt.duplicated)&&(e.index=r)}))}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Et),Ut=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=K(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!pt&&!1!==t.fallback,this.fallback&&(e="hash"),N||(e="abstract"),this.mode=e,e){case"history":this.history=new Ot(this,t.base);break;case"hash":this.history=new jt(this,t.base,this.fallback);break;case"abstract":this.history=new qt(this,t.base)}},It={currentRoute:{configurable:!0}};function Mt(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}return Ut.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},It.currentRoute.get=function(){return this.history&&this.history.current},Ut.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",(function(){var r=e.apps.indexOf(t);r>-1&&e.apps.splice(r,1),e.app===t&&(e.app=e.apps[0]||null),e.app||e.history.teardown()})),!this.app){this.app=t;var r=this.history;if(r instanceof Ot||r instanceof jt){var n=function(t){r.setupListeners(),function(t){var n=r.current,o=e.options.scrollBehavior;pt&&o&&"fullPath"in t&&et(e,t,n,!1)}(t)};r.transitionTo(r.getCurrentLocation(),n,n)}r.listen((function(t){e.apps.forEach((function(e){e._route=t}))}))}},Ut.prototype.beforeEach=function(t){return Mt(this.beforeHooks,t)},Ut.prototype.beforeResolve=function(t){return Mt(this.resolveHooks,t)},Ut.prototype.afterEach=function(t){return Mt(this.afterHooks,t)},Ut.prototype.onReady=function(t,e){this.history.onReady(t,e)},Ut.prototype.onError=function(t){this.history.onError(t)},Ut.prototype.push=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise((function(e,r){n.history.push(t,e,r)}));this.history.push(t,e,r)},Ut.prototype.replace=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise((function(e,r){n.history.replace(t,e,r)}));this.history.replace(t,e,r)},Ut.prototype.go=function(t){this.history.go(t)},Ut.prototype.back=function(){this.go(-1)},Ut.prototype.forward=function(){this.go(1)},Ut.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map((function(t){return Object.keys(t.components).map((function(e){return t.components[e]}))}))):[]},Ut.prototype.resolve=function(t,e,r){var n=M(t,e=e||this.history.current,r,this),o=this.match(n,e),i=o.redirectedFrom||o.fullPath;return{location:n,route:o,href:function(t,e,r){var n="hash"===r?"#"+e:e;return t?x(t+"/"+n):n}(this.history.base,i,this.mode),normalizedTo:n,resolved:o}},Ut.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==h&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(Ut.prototype,It),Ut.install=function t(e){if(!t.installed||V!==e){t.installed=!0,V=e;var r=function(t){return void 0!==t},n=function(t,e){var n=t.$options._parentVnode;r(n)&&r(n=n.data)&&r(n=n.registerRouteInstance)&&n(t,e)};e.mixin({beforeCreate:function(){r(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),e.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(e.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(e.prototype,"$route",{get:function(){return this._routerRoot._route}}),e.component("RouterView",g),e.component("RouterLink",H);var o=e.config.optionMergeStrategies;o.beforeRouteEnter=o.beforeRouteLeave=o.beforeRouteUpdate=o.created}},Ut.version="3.4.9",Ut.isNavigationFailure=wt,Ut.NavigationFailureType=dt,N&&window.Vue&&window.Vue.use(Ut),Ut},"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).VueRouter=e();