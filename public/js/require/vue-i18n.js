/*!
 * vue-i18n v8.22.2 
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueI18n=e()}(this,(function(){"use strict";var t=["compactDisplay","currency","currencyDisplay","currencySign","localeMatcher","notation","numberingSystem","signDisplay","style","unit","unitDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits"];function e(t,e){"undefined"!=typeof console&&(console.warn("[vue-i18n] "+t),e&&console.warn(e.stack))}function n(t,e){"undefined"!=typeof console&&(console.error("[vue-i18n] "+t),e&&console.error(e.stack))}var a=Array.isArray;function r(t){return null!==t&&"object"==typeof t}function i(t){return"string"==typeof t}var o=Object.prototype.toString;function s(t){return"[object Object]"===o.call(t)}function l(t){return null==t}function c(t){return"function"==typeof t}function u(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n=null,i=null;return 1===t.length?r(t[0])||a(t[0])?i=t[0]:"string"==typeof t[0]&&(n=t[0]):2===t.length&&("string"==typeof t[0]&&(n=t[0]),(r(t[1])||a(t[1]))&&(i=t[1])),{locale:n,params:i}}function h(t){return JSON.parse(JSON.stringify(t))}function f(t,e){return!!~t.indexOf(e)}var p=Object.prototype.hasOwnProperty;function m(t,e){return p.call(t,e)}function _(t){for(var e=arguments,n=Object(t),a=1;a<arguments.length;a++){var i=e[a];if(null!=i){var o=void 0;for(o in i)m(i,o)&&(r(i[o])?n[o]=_(n[o],i[o]):n[o]=i[o])}}return n}function g(t,e){if(t===e)return!0;var n=r(t),i=r(e);if(!n||!i)return!n&&!i&&String(t)===String(e);try{var o=a(t),s=a(e);if(o&&s)return t.length===e.length&&t.every((function(t,n){return g(t,e[n])}));if(o||s)return!1;var l=Object.keys(t),c=Object.keys(e);return l.length===c.length&&l.every((function(n){return g(t[n],e[n])}))}catch(t){return!1}}function v(t){return null!=t&&Object.keys(t).forEach((function(e){"string"==typeof t[e]&&(t[e]=t[e].replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"))})),t}var b={beforeCreate:function(){var t=this.$options;if(t.i18n=t.i18n||(t.__i18n?{}:null),t.i18n)if(t.i18n instanceof J){if(t.__i18n)try{var a=t.i18n&&t.i18n.messages?t.i18n.messages:{};t.__i18n.forEach((function(t){a=_(a,JSON.parse(t))})),Object.keys(a).forEach((function(e){t.i18n.mergeLocaleMessage(e,a[e])}))}catch(t){n("Cannot parse locale messages via custom blocks.",t)}this._i18n=t.i18n,this._i18nWatcher=this._i18n.watchI18nData()}else if(s(t.i18n)){var r=this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J?this.$root.$i18n:null;if(r&&(t.i18n.root=this.$root,t.i18n.formatter=r.formatter,t.i18n.fallbackLocale=r.fallbackLocale,t.i18n.formatFallbackMessages=r.formatFallbackMessages,t.i18n.silentTranslationWarn=r.silentTranslationWarn,t.i18n.silentFallbackWarn=r.silentFallbackWarn,t.i18n.pluralizationRules=r.pluralizationRules,t.i18n.preserveDirectiveContent=r.preserveDirectiveContent),t.__i18n)try{var i=t.i18n&&t.i18n.messages?t.i18n.messages:{};t.__i18n.forEach((function(t){i=_(i,JSON.parse(t))})),t.i18n.messages=i}catch(t){e("Cannot parse locale messages via custom blocks.",t)}var o=t.i18n.sharedMessages;o&&s(o)&&(t.i18n.messages=_(t.i18n.messages,o)),this._i18n=new J(t.i18n),this._i18nWatcher=this._i18n.watchI18nData(),(void 0===t.i18n.sync||t.i18n.sync)&&(this._localeWatcher=this.$i18n.watchLocale()),r&&r.onComponentInstanceCreated(this._i18n)}else e("Cannot be interpreted 'i18n' option.");else this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J?this._i18n=this.$root.$i18n:t.parent&&t.parent.$i18n&&t.parent.$i18n instanceof J&&(this._i18n=t.parent.$i18n)},beforeMount:function(){var t=this.$options;t.i18n=t.i18n||(t.__i18n?{}:null),t.i18n?t.i18n instanceof J?(this._i18n.subscribeDataChanging(this),this._subscribing=!0):s(t.i18n)?(this._i18n.subscribeDataChanging(this),this._subscribing=!0):e("Cannot be interpreted 'i18n' option."):this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J?(this._i18n.subscribeDataChanging(this),this._subscribing=!0):t.parent&&t.parent.$i18n&&t.parent.$i18n instanceof J&&(this._i18n.subscribeDataChanging(this),this._subscribing=!0)},beforeDestroy:function(){if(this._i18n){var t=this;this.$nextTick((function(){t._subscribing&&(t._i18n.unsubscribeDataChanging(t),delete t._subscribing),t._i18nWatcher&&(t._i18nWatcher(),t._i18n.destroyVM(),delete t._i18nWatcher),t._localeWatcher&&(t._localeWatcher(),delete t._localeWatcher)}))}}},d={name:"i18n",functional:!0,props:{tag:{type:[String,Boolean,Object],default:"span"},path:{type:String,required:!0},locale:{type:String},places:{type:[Array,Object]}},render:function(t,n){var a=n.data,r=n.parent,i=n.props,o=n.slots,s=r.$i18n;if(s){var l=i.path,c=i.locale,u=i.places,h=o(),f=s.i(l,c,function(t){var e;for(e in t)if("default"!==e)return!1;return Boolean(e)}(h)||u?function(t,n){var a=n?function(t){return e("`places` prop is deprecated in next major version. Please switch to Vue slots."),Array.isArray(t)?t.reduce(k,{}):Object.assign({},t)}(n):{};if(!t)return a;var r=(t=t.filter((function(t){return t.tag||""!==t.text.trim()}))).every(F);r&&e("`place` attribute is deprecated in next major version. Please switch to Vue slots.");return t.reduce(r?y:k,a)}(h.default,u):h),p=i.tag&&!0!==i.tag||!1===i.tag?i.tag:"span";return p?t(p,a,f):f}e("Cannot find VueI18n instance!")}};function y(t,e){return e.data&&e.data.attrs&&e.data.attrs.place&&(t[e.data.attrs.place]=e),t}function k(t,e,n){return t[n]=e,t}function F(t){return Boolean(t.data&&t.data.attrs&&t.data.attrs.place)}var w,T={name:"i18n-n",functional:!0,props:{tag:{type:[String,Boolean,Object],default:"span"},value:{type:Number,required:!0},format:{type:[String,Object]},locale:{type:String}},render:function(n,a){var o=a.props,s=a.parent,l=a.data,c=s.$i18n;if(!c)return e("Cannot find VueI18n instance!"),null;var u=null,h=null;i(o.format)?u=o.format:r(o.format)&&(o.format.key&&(u=o.format.key),h=Object.keys(o.format).reduce((function(e,n){var a;return f(t,n)?Object.assign({},e,((a={})[n]=o.format[n],a)):e}),null));var p=o.locale||c.locale,m=c._ntp(o.value,p,u,h),_=m.map((function(t,e){var n,a=l.scopedSlots&&l.scopedSlots[t.type];return a?a(((n={})[t.type]=t.value,n.index=e,n.parts=m,n)):t.value})),g=o.tag&&!0!==o.tag||!1===o.tag?o.tag:"span";return g?n(g,{attrs:l.attrs,class:l.class,staticClass:l.staticClass},_):_}};function C(t,e,n){W(t,n)&&L(t,e,n)}function $(t,e,n,a){if(W(t,n)){var r=n.context.$i18n;(function(t,e){var n=e.context;return t._locale===n.$i18n.locale})(t,n)&&g(e.value,e.oldValue)&&g(t._localeMessage,r.getLocaleMessage(r.locale))||L(t,e,n)}}function M(t,n,a,r){if(a.context){var i=a.context.$i18n||{};n.modifiers.preserve||i.preserveDirectiveContent||(t.textContent=""),t._vt=void 0,delete t._vt,t._locale=void 0,delete t._locale,t._localeMessage=void 0,delete t._localeMessage}else e("Vue instance does not exists in VNode context")}function W(t,n){var a=n.context;return a?!!a.$i18n||(e("VueI18n instance does not exists in Vue instance"),!1):(e("Vue instance does not exists in VNode context"),!1)}function L(t,n,a){var r,o,l=function(t){var e,n,a,r;i(t)?e=t:s(t)&&(e=t.path,n=t.locale,a=t.args,r=t.choice);return{path:e,locale:n,args:a,choice:r}}(n.value),c=l.path,u=l.locale,h=l.args,f=l.choice;if(c||u||h)if(c){var p=a.context;t._vt=t.textContent=null!=f?(r=p.$i18n).tc.apply(r,[c,f].concat(D(u,h))):(o=p.$i18n).t.apply(o,[c].concat(D(u,h))),t._locale=p.$i18n.locale,t._localeMessage=p.$i18n.getLocaleMessage(p.$i18n.locale)}else e("`path` is required in v-t directive");else e("value type not supported")}function D(t,e){var n=[];return t&&n.push(t),e&&(Array.isArray(e)||s(e))&&n.push(e),n}function I(t){I.installed&&t===w?e("already installed."):(I.installed=!0,((w=t).version&&Number(w.version.split(".")[0])||-1)<2?e("vue-i18n ("+I.version+") need to use Vue 2.0 or later (Vue: "+w.version+")."):(!function(t){t.prototype.hasOwnProperty("$i18n")||Object.defineProperty(t.prototype,"$i18n",{get:function(){return this._i18n}}),t.prototype.$t=function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];var a=this.$i18n;return a._t.apply(a,[t,a.locale,a._getMessages(),this].concat(e))},t.prototype.$tc=function(t,e){for(var n=[],a=arguments.length-2;a-- >0;)n[a]=arguments[a+2];var r=this.$i18n;return r._tc.apply(r,[t,r.locale,r._getMessages(),this,e].concat(n))},t.prototype.$te=function(t,e){var n=this.$i18n;return n._te(t,n.locale,n._getMessages(),e)},t.prototype.$d=function(t){for(var e,n=[],a=arguments.length-1;a-- >0;)n[a]=arguments[a+1];return(e=this.$i18n).d.apply(e,[t].concat(n))},t.prototype.$n=function(t){for(var e,n=[],a=arguments.length-1;a-- >0;)n[a]=arguments[a+1];return(e=this.$i18n).n.apply(e,[t].concat(n))}}(w),w.mixin(b),w.directive("t",{bind:C,update:$,unbind:M}),w.component(d.name,d),w.component(T.name,T),w.config.optionMergeStrategies.i18n=function(t,e){return void 0===e?t:e}))}var S=function(){this._caches=Object.create(null)};S.prototype.interpolate=function(t,n){if(!n)return[t];var a=this._caches[t];return a||(a=function(t){var e=[],n=0,a="";for(;n<t.length;){var r=t[n++];if("{"===r){a&&e.push({type:"text",value:a}),a="";var i="";for(r=t[n++];void 0!==r&&"}"!==r;)i+=r,r=t[n++];var o="}"===r,s=x.test(i)?"list":o&&O.test(i)?"named":"unknown";e.push({value:i,type:s})}else"%"===r?"{"!==t[n]&&(a+=r):a+=r}return a&&e.push({type:"text",value:a}),e}(t),this._caches[t]=a),function(t,n){var a=[],i=0,o=Array.isArray(n)?"list":r(n)?"named":"unknown";if("unknown"===o)return a;for(;i<t.length;){var s=t[i];switch(s.type){case"text":a.push(s.value);break;case"list":a.push(n[parseInt(s.value,10)]);break;case"named":"named"===o?a.push(n[s.value]):e("Type of token '"+s.type+"' and format of value '"+o+"' don't match!");break;case"unknown":e("Detect 'unknown' type of token!")}i++}return a}(a,n)};var x=/^(?:\d)+/,O=/^(?:\w)+/;var j=[];j[0]={ws:[0],ident:[3,0],"[":[4],eof:[7]},j[1]={ws:[1],".":[2],"[":[4],eof:[7]},j[2]={ws:[2],ident:[3,0],0:[3,0],number:[3,0]},j[3]={ident:[3,0],0:[3,0],number:[3,0],ws:[1,1],".":[2,1],"[":[4,1],eof:[7,1]},j[4]={"'":[5,0],'"':[6,0],"[":[4,2],"]":[1,3],eof:8,else:[4,0]},j[5]={"'":[4,0],eof:8,else:[5,0]},j[6]={'"':[4,0],eof:8,else:[6,0]};var N=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function V(t){if(null==t)return"eof";switch(t.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return t;case 95:case 36:case 45:return"ident";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return"ident"}function P(t){var e,n,a,r=t.trim();return("0"!==t.charAt(0)||!isNaN(t))&&(a=r,N.test(a)?(n=(e=r).charCodeAt(0))!==e.charCodeAt(e.length-1)||34!==n&&39!==n?e:e.slice(1,-1):"*"+r)}var H=function(){this._cache=Object.create(null)};H.prototype.parsePath=function(t){var e=this._cache[t];return e||(e=function(t){var e,n,a,r,i,o,s,l=[],c=-1,u=0,h=0,f=[];function p(){var e=t[c+1];if(5===u&&"'"===e||6===u&&'"'===e)return c++,a="\\"+e,f[0](),!0}for(f[1]=function(){void 0!==n&&(l.push(n),n=void 0)},f[0]=function(){void 0===n?n=a:n+=a},f[2]=function(){f[0](),h++},f[3]=function(){if(h>0)h--,u=4,f[0]();else{if(h=0,void 0===n)return!1;if(!1===(n=P(n)))return!1;f[1]()}};null!==u;)if(c++,"\\"!==(e=t[c])||!p()){if(r=V(e),8===(i=(s=j[u])[r]||s.else||8))return;if(u=i[0],(o=f[i[1]])&&(a=void 0===(a=i[2])?e:a,!1===o()))return;if(7===u)return l}}(t))&&(this._cache[t]=e),e||[]},H.prototype.getPathValue=function(t,e){if(!r(t))return null;var n=this.parsePath(e);if(0===n.length)return null;for(var a=n.length,i=t,o=0;o<a;){var s=i[n[o]];if(void 0===s)return null;i=s,o++}return i};var R,E=/<\/?[\w\s="/.':;#-\/]+>/,z=/(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g,A=/^@(?:\.([a-z]+))?:/,B=/[()]/g,U={upper:function(t){return t.toLocaleUpperCase()},lower:function(t){return t.toLocaleLowerCase()},capitalize:function(t){return""+t.charAt(0).toLocaleUpperCase()+t.substr(1)}},q=new S,J=function(t){var e=this;void 0===t&&(t={}),!w&&"undefined"!=typeof window&&window.Vue&&I(window.Vue);var n=t.locale||"en-US",a=!1!==t.fallbackLocale&&(t.fallbackLocale||"en-US"),r=t.messages||{},i=t.dateTimeFormats||{},o=t.numberFormats||{};this._vm=null,this._formatter=t.formatter||q,this._modifiers=t.modifiers||{},this._missing=t.missing||null,this._root=t.root||null,this._sync=void 0===t.sync||!!t.sync,this._fallbackRoot=void 0===t.fallbackRoot||!!t.fallbackRoot,this._formatFallbackMessages=void 0!==t.formatFallbackMessages&&!!t.formatFallbackMessages,this._silentTranslationWarn=void 0!==t.silentTranslationWarn&&t.silentTranslationWarn,this._silentFallbackWarn=void 0!==t.silentFallbackWarn&&!!t.silentFallbackWarn,this._dateTimeFormatters={},this._numberFormatters={},this._path=new H,this._dataListeners=[],this._componentInstanceCreatedListener=t.componentInstanceCreatedListener||null,this._preserveDirectiveContent=void 0!==t.preserveDirectiveContent&&!!t.preserveDirectiveContent,this.pluralizationRules=t.pluralizationRules||{},this._warnHtmlInMessage=t.warnHtmlInMessage||"off",this._postTranslation=t.postTranslation||null,this._escapeParameterHtml=t.escapeParameterHtml||!1,this.getChoiceIndex=function(t,n){var a=Object.getPrototypeOf(e);if(a&&a.getChoiceIndex)return a.getChoiceIndex.call(e,t,n);var r,i;return e.locale in e.pluralizationRules?e.pluralizationRules[e.locale].apply(e,[t,n]):(r=t,i=n,r=Math.abs(r),2===i?r?r>1?1:0:1:r?Math.min(r,2):0)},this._exist=function(t,n){return!(!t||!n)&&(!l(e._path.getPathValue(t,n))||!!t[n])},"warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||Object.keys(r).forEach((function(t){e._checkLocaleMessage(t,e._warnHtmlInMessage,r[t])})),this._initVM({locale:n,fallbackLocale:a,messages:r,dateTimeFormats:i,numberFormats:o})},G={vm:{configurable:!0},messages:{configurable:!0},dateTimeFormats:{configurable:!0},numberFormats:{configurable:!0},availableLocales:{configurable:!0},locale:{configurable:!0},fallbackLocale:{configurable:!0},formatFallbackMessages:{configurable:!0},missing:{configurable:!0},formatter:{configurable:!0},silentTranslationWarn:{configurable:!0},silentFallbackWarn:{configurable:!0},preserveDirectiveContent:{configurable:!0},warnHtmlInMessage:{configurable:!0},postTranslation:{configurable:!0}};return J.prototype._checkLocaleMessage=function(t,r,o){var l=function(t,r,o,c){if(s(o))Object.keys(o).forEach((function(e){var n=o[e];s(n)?(c.push(e),c.push("."),l(t,r,n,c),c.pop(),c.pop()):(c.push(e),l(t,r,n,c),c.pop())}));else if(a(o))o.forEach((function(e,n){s(e)?(c.push("["+n+"]"),c.push("."),l(t,r,e,c),c.pop(),c.pop()):(c.push("["+n+"]"),l(t,r,e,c),c.pop())}));else if(i(o)){if(E.test(o)){var u="Detected HTML in message '"+o+"' of keypath '"+c.join("")+"' at '"+r+"'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";"warn"===t?e(u):"error"===t&&n(u)}}};l(r,t,o,[])},J.prototype._initVM=function(t){var e=w.config.silent;w.config.silent=!0,this._vm=new w({data:t}),w.config.silent=e},J.prototype.destroyVM=function(){this._vm.$destroy()},J.prototype.subscribeDataChanging=function(t){this._dataListeners.push(t)},J.prototype.unsubscribeDataChanging=function(t){!function(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)t.splice(n,1)}}(this._dataListeners,t)},J.prototype.watchI18nData=function(){var t=this;return this._vm.$watch("$data",(function(){for(var e=t._dataListeners.length;e--;)w.nextTick((function(){t._dataListeners[e]&&t._dataListeners[e].$forceUpdate()}))}),{deep:!0})},J.prototype.watchLocale=function(){if(!this._sync||!this._root)return null;var t=this._vm;return this._root.$i18n.vm.$watch("locale",(function(e){t.$set(t,"locale",e),t.$forceUpdate()}),{immediate:!0})},J.prototype.onComponentInstanceCreated=function(t){this._componentInstanceCreatedListener&&this._componentInstanceCreatedListener(t,this)},G.vm.get=function(){return this._vm},G.messages.get=function(){return h(this._getMessages())},G.dateTimeFormats.get=function(){return h(this._getDateTimeFormats())},G.numberFormats.get=function(){return h(this._getNumberFormats())},G.availableLocales.get=function(){return Object.keys(this.messages).sort()},G.locale.get=function(){return this._vm.locale},G.locale.set=function(t){this._vm.$set(this._vm,"locale",t)},G.fallbackLocale.get=function(){return this._vm.fallbackLocale},G.fallbackLocale.set=function(t){this._localeChainCache={},this._vm.$set(this._vm,"fallbackLocale",t)},G.formatFallbackMessages.get=function(){return this._formatFallbackMessages},G.formatFallbackMessages.set=function(t){this._formatFallbackMessages=t},G.missing.get=function(){return this._missing},G.missing.set=function(t){this._missing=t},G.formatter.get=function(){return this._formatter},G.formatter.set=function(t){this._formatter=t},G.silentTranslationWarn.get=function(){return this._silentTranslationWarn},G.silentTranslationWarn.set=function(t){this._silentTranslationWarn=t},G.silentFallbackWarn.get=function(){return this._silentFallbackWarn},G.silentFallbackWarn.set=function(t){this._silentFallbackWarn=t},G.preserveDirectiveContent.get=function(){return this._preserveDirectiveContent},G.preserveDirectiveContent.set=function(t){this._preserveDirectiveContent=t},G.warnHtmlInMessage.get=function(){return this._warnHtmlInMessage},G.warnHtmlInMessage.set=function(t){var e=this,n=this._warnHtmlInMessage;if(this._warnHtmlInMessage=t,n!==t&&("warn"===t||"error"===t)){var a=this._getMessages();Object.keys(a).forEach((function(t){e._checkLocaleMessage(t,e._warnHtmlInMessage,a[t])}))}},G.postTranslation.get=function(){return this._postTranslation},G.postTranslation.set=function(t){this._postTranslation=t},J.prototype._getMessages=function(){return this._vm.messages},J.prototype._getDateTimeFormats=function(){return this._vm.dateTimeFormats},J.prototype._getNumberFormats=function(){return this._vm.numberFormats},J.prototype._warnDefault=function(t,n,a,r,o,s){if(!l(a))return a;if(this._missing){var c=this._missing.apply(null,[t,n,r,o]);if(i(c))return c}else this._isSilentTranslationWarn(n)||e("Cannot translate the value of keypath '"+n+"'. Use the value of keypath as default.");if(this._formatFallbackMessages){var h=u.apply(void 0,o);return this._render(n,s,h.params,n)}return n},J.prototype._isFallbackRoot=function(t){return!t&&!l(this._root)&&this._fallbackRoot},J.prototype._isSilentFallbackWarn=function(t){return this._silentFallbackWarn instanceof RegExp?this._silentFallbackWarn.test(t):this._silentFallbackWarn},J.prototype._isSilentFallback=function(t,e){return this._isSilentFallbackWarn(e)&&(this._isFallbackRoot()||t!==this.fallbackLocale)},J.prototype._isSilentTranslationWarn=function(t){return this._silentTranslationWarn instanceof RegExp?this._silentTranslationWarn.test(t):this._silentTranslationWarn},J.prototype._interpolate=function(t,n,r,o,u,h,f){if(!n)return null;var p,m=this._path.getPathValue(n,r);if(a(m)||s(m))return m;if(l(m)){if(!s(n))return null;if(!i(p=n[r])&&!c(p))return this._isSilentTranslationWarn(r)||this._isSilentFallback(t,r)||e("Value of key '"+r+"' is not a string or function !"),null}else{if(!i(m)&&!c(m))return this._isSilentTranslationWarn(r)||this._isSilentFallback(t,r)||e("Value of key '"+r+"' is not a string or function!"),null;p=m}return i(p)&&(p.indexOf("@:")>=0||p.indexOf("@.")>=0)&&(p=this._link(t,n,p,o,"raw",h,f)),this._render(p,u,h,r)},J.prototype._link=function(t,n,r,i,o,s,l){var c=r,u=c.match(z);for(var h in u)if(u.hasOwnProperty(h)){var p=u[h],m=p.match(A),_=m[0],g=m[1],v=p.replace(_,"").replace(B,"");if(f(l,v))return e('Circular reference found. "'+p+'" is already visited in the chain of '+l.reverse().join(" <- ")),c;l.push(v);var b=this._interpolate(t,n,v,i,"raw"===o?"string":o,"raw"===o?void 0:s,l);if(this._isFallbackRoot(b)){if(this._isSilentTranslationWarn(v)||e("Fall back to translate the link placeholder '"+v+"' with root locale."),!this._root)throw Error("unexpected error");var d=this._root.$i18n;b=d._translate(d._getMessages(),d.locale,d.fallbackLocale,v,i,o,s)}b=this._warnDefault(t,v,b,i,a(s)?s:[s],o),this._modifiers.hasOwnProperty(g)?b=this._modifiers[g](b):U.hasOwnProperty(g)&&(b=U[g](b)),l.pop(),c=b?c.replace(p,b):c}return c},J.prototype._createMessageContext=function(t){var e=a(t)?t:[],n=r(t)?t:{};return{list:function(t){return e[t]},named:function(t){return n[t]}}},J.prototype._render=function(t,e,n,a){if(c(t))return t(this._createMessageContext(n));var r=this._formatter.interpolate(t,n,a);return r||(r=q.interpolate(t,n,a)),"string"!==e||i(r)?r:r.join("")},J.prototype._appendItemToChain=function(t,e,n){var a=!1;return f(t,e)||(a=!0,e&&(a="!"!==e[e.length-1],e=e.replace(/!/g,""),t.push(e),n&&n[e]&&(a=n[e]))),a},J.prototype._appendLocaleToChain=function(t,e,n){var a,r=e.split("-");do{var i=r.join("-");a=this._appendItemToChain(t,i,n),r.splice(-1,1)}while(r.length&&!0===a);return a},J.prototype._appendBlockToChain=function(t,e,n){for(var a=!0,r=0;r<e.length&&"boolean"==typeof a;r++){var o=e[r];i(o)&&(a=this._appendLocaleToChain(t,o,n))}return a},J.prototype._getLocaleChain=function(t,e){if(""===t)return[];this._localeChainCache||(this._localeChainCache={});var n=this._localeChainCache[t];if(!n){e||(e=this.fallbackLocale),n=[];for(var o,s=[t];a(s);)s=this._appendBlockToChain(n,s,e);(s=i(o=a(e)?e:r(e)?e.default?e.default:null:e)?[o]:o)&&this._appendBlockToChain(n,s,null),this._localeChainCache[t]=n}return n},J.prototype._translate=function(t,n,a,r,i,o,s){for(var c,u=this._getLocaleChain(n,a),h=0;h<u.length;h++){var f=u[h];if(!l(c=this._interpolate(f,t[f],r,i,o,s,[r])))return f===n||this._isSilentTranslationWarn(r)||this._isSilentFallbackWarn(r)||e("Fall back to translate the keypath '"+r+"' with '"+f+"' locale."),c}return null},J.prototype._t=function(t,n,a,r){for(var i,o=[],s=arguments.length-4;s-- >0;)o[s]=arguments[s+4];if(!t)return"";var l=u.apply(void 0,o);this._escapeParameterHtml&&(l.params=v(l.params));var c=l.locale||n,h=this._translate(a,c,this.fallbackLocale,t,r,"string",l.params);if(this._isFallbackRoot(h)){if(this._isSilentTranslationWarn(t)||this._isSilentFallbackWarn(t)||e("Fall back to translate the keypath '"+t+"' with root locale."),!this._root)throw Error("unexpected error");return(i=this._root).$t.apply(i,[t].concat(o))}return h=this._warnDefault(c,t,h,r,o,"string"),this._postTranslation&&null!=h&&(h=this._postTranslation(h,t)),h},J.prototype.t=function(t){for(var e,n=[],a=arguments.length-1;a-- >0;)n[a]=arguments[a+1];return(e=this)._t.apply(e,[t,this.locale,this._getMessages(),null].concat(n))},J.prototype._i=function(t,n,a,r,i){var o=this._translate(a,n,this.fallbackLocale,t,r,"raw",i);if(this._isFallbackRoot(o)){if(this._isSilentTranslationWarn(t)||e("Fall back to interpolate the keypath '"+t+"' with root locale."),!this._root)throw Error("unexpected error");return this._root.$i18n.i(t,n,i)}return this._warnDefault(n,t,o,r,[i],"raw")},J.prototype.i=function(t,e,n){return t?(i(e)||(e=this.locale),this._i(t,e,this._getMessages(),null,n)):""},J.prototype._tc=function(t,e,n,a,r){for(var i,o=[],s=arguments.length-5;s-- >0;)o[s]=arguments[s+5];if(!t)return"";void 0===r&&(r=1);var l={count:r,n:r},c=u.apply(void 0,o);return c.params=Object.assign(l,c.params),o=null===c.locale?[c.params]:[c.locale,c.params],this.fetchChoice((i=this)._t.apply(i,[t,e,n,a].concat(o)),r)},J.prototype.fetchChoice=function(t,e){if(!t||!i(t))return null;var n=t.split("|");return n[e=this.getChoiceIndex(e,n.length)]?n[e].trim():t},J.prototype.tc=function(t,e){for(var n,a=[],r=arguments.length-2;r-- >0;)a[r]=arguments[r+2];return(n=this)._tc.apply(n,[t,this.locale,this._getMessages(),null,e].concat(a))},J.prototype._te=function(t,e,n){for(var a=[],r=arguments.length-3;r-- >0;)a[r]=arguments[r+3];var i=u.apply(void 0,a).locale||e;return this._exist(n[i],t)},J.prototype.te=function(t,e){return this._te(t,this.locale,this._getMessages(),e)},J.prototype.getLocaleMessage=function(t){return h(this._vm.messages[t]||{})},J.prototype.setLocaleMessage=function(t,e){"warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||this._checkLocaleMessage(t,this._warnHtmlInMessage,e),this._vm.$set(this._vm.messages,t,e)},J.prototype.mergeLocaleMessage=function(t,e){"warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||this._checkLocaleMessage(t,this._warnHtmlInMessage,e),this._vm.$set(this._vm.messages,t,_({},this._vm.messages[t]||{},e))},J.prototype.getDateTimeFormat=function(t){return h(this._vm.dateTimeFormats[t]||{})},J.prototype.setDateTimeFormat=function(t,e){this._vm.$set(this._vm.dateTimeFormats,t,e),this._clearDateTimeFormat(t,e)},J.prototype.mergeDateTimeFormat=function(t,e){this._vm.$set(this._vm.dateTimeFormats,t,_(this._vm.dateTimeFormats[t]||{},e)),this._clearDateTimeFormat(t,e)},J.prototype._clearDateTimeFormat=function(t,e){for(var n in e){var a=t+"__"+n;this._dateTimeFormatters.hasOwnProperty(a)&&delete this._dateTimeFormatters[a]}},J.prototype._localizeDateTime=function(t,n,a,r,i){for(var o=n,s=r[o],c=this._getLocaleChain(n,a),u=0;u<c.length;u++){var h=o,f=c[u];if(o=f,!l(s=r[f])&&!l(s[i]))break;f===n||this._isSilentTranslationWarn(i)||this._isSilentFallbackWarn(i)||e("Fall back to '"+f+"' datetime formats from '"+h+"' datetime formats.")}if(l(s)||l(s[i]))return null;var p=s[i],m=o+"__"+i,_=this._dateTimeFormatters[m];return _||(_=this._dateTimeFormatters[m]=new Intl.DateTimeFormat(o,p)),_.format(t)},J.prototype._d=function(t,n,a){if(!J.availabilities.dateTimeFormat)return e("Cannot format a Date value due to not supported Intl.DateTimeFormat."),"";if(!a)return new Intl.DateTimeFormat(n).format(t);var r=this._localizeDateTime(t,n,this.fallbackLocale,this._getDateTimeFormats(),a);if(this._isFallbackRoot(r)){if(this._isSilentTranslationWarn(a)||this._isSilentFallbackWarn(a)||e("Fall back to datetime localization of root: key '"+a+"'."),!this._root)throw Error("unexpected error");return this._root.$i18n.d(t,a,n)}return r||""},J.prototype.d=function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];var a=this.locale,o=null;return 1===e.length?i(e[0])?o=e[0]:r(e[0])&&(e[0].locale&&(a=e[0].locale),e[0].key&&(o=e[0].key)):2===e.length&&(i(e[0])&&(o=e[0]),i(e[1])&&(a=e[1])),this._d(t,a,o)},J.prototype.getNumberFormat=function(t){return h(this._vm.numberFormats[t]||{})},J.prototype.setNumberFormat=function(t,e){this._vm.$set(this._vm.numberFormats,t,e),this._clearNumberFormat(t,e)},J.prototype.mergeNumberFormat=function(t,e){this._vm.$set(this._vm.numberFormats,t,_(this._vm.numberFormats[t]||{},e)),this._clearNumberFormat(t,e)},J.prototype._clearNumberFormat=function(t,e){for(var n in e){var a=t+"__"+n;this._numberFormatters.hasOwnProperty(a)&&delete this._numberFormatters[a]}},J.prototype._getNumberFormatter=function(t,n,a,r,i,o){for(var s=n,c=r[s],u=this._getLocaleChain(n,a),h=0;h<u.length;h++){var f=s,p=u[h];if(s=p,!l(c=r[p])&&!l(c[i]))break;p===n||this._isSilentTranslationWarn(i)||this._isSilentFallbackWarn(i)||e("Fall back to '"+p+"' number formats from '"+f+"' number formats.")}if(l(c)||l(c[i]))return null;var m,_=c[i];if(o)m=new Intl.NumberFormat(s,Object.assign({},_,o));else{var g=s+"__"+i;(m=this._numberFormatters[g])||(m=this._numberFormatters[g]=new Intl.NumberFormat(s,_))}return m},J.prototype._n=function(t,n,a,r){if(!J.availabilities.numberFormat)return e("Cannot format a Number value due to not supported Intl.NumberFormat."),"";if(!a)return(r?new Intl.NumberFormat(n,r):new Intl.NumberFormat(n)).format(t);var i=this._getNumberFormatter(t,n,this.fallbackLocale,this._getNumberFormats(),a,r),o=i&&i.format(t);if(this._isFallbackRoot(o)){if(this._isSilentTranslationWarn(a)||this._isSilentFallbackWarn(a)||e("Fall back to number localization of root: key '"+a+"'."),!this._root)throw Error("unexpected error");return this._root.$i18n.n(t,Object.assign({},{key:a,locale:n},r))}return o||""},J.prototype.n=function(e){for(var n=[],a=arguments.length-1;a-- >0;)n[a]=arguments[a+1];var o=this.locale,s=null,l=null;return 1===n.length?i(n[0])?s=n[0]:r(n[0])&&(n[0].locale&&(o=n[0].locale),n[0].key&&(s=n[0].key),l=Object.keys(n[0]).reduce((function(e,a){var r;return f(t,a)?Object.assign({},e,((r={})[a]=n[0][a],r)):e}),null)):2===n.length&&(i(n[0])&&(s=n[0]),i(n[1])&&(o=n[1])),this._n(e,o,s,l)},J.prototype._ntp=function(t,n,a,r){if(!J.availabilities.numberFormat)return e("Cannot format to parts a Number value due to not supported Intl.NumberFormat."),[];if(!a)return(r?new Intl.NumberFormat(n,r):new Intl.NumberFormat(n)).formatToParts(t);var i=this._getNumberFormatter(t,n,this.fallbackLocale,this._getNumberFormats(),a,r),o=i&&i.formatToParts(t);if(this._isFallbackRoot(o)){if(this._isSilentTranslationWarn(a)||e("Fall back to format number to parts of root: key '"+a+"' ."),!this._root)throw Error("unexpected error");return this._root.$i18n._ntp(t,n,a,r)}return o||[]},Object.defineProperties(J.prototype,G),Object.defineProperty(J,"availabilities",{get:function(){if(!R){var t="undefined"!=typeof Intl;R={dateTimeFormat:t&&void 0!==Intl.DateTimeFormat,numberFormat:t&&void 0!==Intl.NumberFormat}}return R}}),J.install=I,J.version="8.22.2",J}));