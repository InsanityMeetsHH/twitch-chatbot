define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    template: '<div class="row"><div class="col-12"><div class="counter" :class="{&#39;p-2&#39;: isPopout === false, popout: isPopout, victory: counter.streak >= parseInt(counter.victory)}"><div v-if="isPopout === false" class="h4 text-center"><a href="#" onclick="javascript:return false;" @click="popoutCounter()">{{ $t(&#39;counter&#39;) }} <font-awesome-icon :icon="[&#39;fas&#39;, &#39;external-link-alt&#39;]" class="fa-fw"></font-awesome-icon></a></div><div :class="{&#39;embed-responsive&#39;: isPopout, &#39;embed-responsive-1by1&#39;: isPopout}"><div :class="{&#39;embed-responsive-item&#39;: isPopout}"><div id="counter" class="h3 text-center mb-0 text">{{ counter.streak }}</div></div></div><div v-if="isPopout === false" class="input-group input-group-sm pt-3"><div class="input-group-prepend"><!-- eslint-disable-next-line vue/singleline-html-element-content-newline --><div class="input-group-text"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;trophy&#39;]" class="fa-fw"></font-awesome-icon></div></div><input v-model="counter.victory" type="number" min="1" max="99" class="form-control"></div><div class="confetti-wrapper"><!-- eslint-disable-next-line vue/singleline-html-element-content-newline --><div v-for="index in 160" :key="index" class="confetti"></div></div></div></div></div>',
    data: function () {
      return {
        counter: {},
        isPopout: false,
        updateTimeout: null
      };
    },
    watch: {
      'counter.victory': function () {
        const $this = this;

        if (this.isPopout === false) {
          clearTimeout(this.updateTimeout);
          this.updateTimeout = setTimeout(function () {
            $this.updateCounter();
          }, 2000);
        }
      }
    },
    mounted: function () {
      this.getCounter();

      if (/^#\/channel\/(.*)\/counter\/?/.test(window.location.hash)) {
        this.isPopout = true;
        jQuery('body').css('overflow', 'hidden');
      }
    },
    methods: {
      getCounter: function () {
        if (typeof socketWrite === 'function') {
          const call = {
            method: 'getCounter',
            args: {
              channel: this.$root._route.params.channel.toLowerCase()
            },
            env: 'node'
          };
          socketWrite(call);
        }
      },
      popoutCounter: function () {
        const url = this.$router.resolve({
          name: 'counter',
          params: {
            channel: this.$root._route.params.channel
          }
        }).href;
        const params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=560';
        window.open(url, 'Counter', params);
      },
      setCounter: function (args) {
        if (this.$root._route.params.channel.toLowerCase() === args.channel.toLowerCase()) {
          this.counter = args.counter;
        }
      },
      updateCounter: function () {
        if (typeof socketWrite === 'function') {
          const call = {
            method: 'updateCounter',
            args: {
              channel: this.$root._route.params.channel.toLowerCase(),
              counter: this.counter
            },
            env: 'node'
          };
          socketWrite(call);
        }
      }
    }
  };
  _exports.default = _default;
});