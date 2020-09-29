define(["exports"],(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={template:'<div class="row"><div class="col-12"><div class="counter" :class="{&#39;p-2&#39;: isPopout === false, popout: isPopout, victory: counter.streak >= parseInt(counter.victory)}"><div v-if="isPopout === false" class="h4 text-center"><a href="#" onclick="javascript:return false;" @click="popoutCounter()">{{ $t(&#39;counter&#39;) }} <font-awesome-icon :icon="[&#39;fas&#39;, &#39;external-link-alt&#39;]" class="fa-fw"></font-awesome-icon></a></div><div :class="{&#39;embed-responsive&#39;: isPopout, &#39;embed-responsive-1by1&#39;: isPopout}"><div :class="{&#39;embed-responsive-item&#39;: isPopout}"><div id="counter" class="h3 text-center mb-0 text">{{ counter.streak }}</div></div></div><div v-if="isPopout === false" class="input-group input-group-sm pt-3"><div class="input-group-prepend">\x3c!-- eslint-disable-next-line vue/singleline-html-element-content-newline --\x3e<div class="input-group-text"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;trophy&#39;]" class="fa-fw"></font-awesome-icon></div></div><input v-model="counter.victory" type="number" min="1" max="99" class="form-control"></div><div class="confetti-wrapper">\x3c!-- eslint-disable-next-line vue/singleline-html-element-content-newline --\x3e<div v-for="index in 160" :key="index" class="confetti"></div></div></div></div></div>',data:function(){return{counter:{},isPopout:!1,updateTimeout:null}},watch:{"counter.victory":function(){const e=this;!1===this.isPopout&&(clearTimeout(this.updateTimeout),this.updateTimeout=setTimeout((function(){e.updateCounter()}),2e3))}},mounted:function(){this.getCounter(),/^#\/channel\/(.*)\/counter\/?/.test(window.location.hash)&&(this.isPopout=!0,jQuery("body").css("overflow","hidden"))},methods:{getCounter:function(){if("function"==typeof socketWrite){const e={method:"getCounter",args:{channel:this.$root._route.params.channel.toLowerCase()},env:"node"};socketWrite(e)}},popoutCounter:function(){const e=this.$router.resolve({name:"counter",params:{channel:this.$root._route.params.channel}}).href;window.open(e,"Counter","scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=560")},setCounter:function(e){this.$root._route.params.channel.toLowerCase()===e.channel.toLowerCase()&&(this.counter=e.counter)},updateCounter:function(){if("function"==typeof socketWrite&&"string"==typeof this.$root._route.params.channel){const e={method:"updateCounter",args:{channel:this.$root._route.params.channel.toLowerCase(),counter:this.counter},env:"node"};socketWrite(e)}}}};e.default=t}));