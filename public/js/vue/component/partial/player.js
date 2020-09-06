define(["exports", "./player/empty", "./player/local", "./player/twitch-clip", "./player/twitch", "./player/youtube"], function (_exports, _empty, _local, _twitchClip, _twitch, _youtube) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _empty = _interopRequireDefault(_empty);
  _local = _interopRequireDefault(_local);
  _twitchClip = _interopRequireDefault(_twitchClip);
  _twitch = _interopRequireDefault(_twitch);
  _youtube = _interopRequireDefault(_youtube);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = {
    template: '<div class="player" :class="$route.params.channel.toLowerCase()"><div v-if="video.player !== &#39;&#39;"><component :is="video.player" ref="player"></component></div><div v-if="video.name.length" class="video-name overlay px-2 pb-1 px-xxl-3">{{ video.name }}<div v-if="video.subName.length" class="sub-name">{{ video.subName }}</div></div></div>',
    components: {
      'empty': _empty.default,
      'local': _local.default,
      'twitch-clip': _twitchClip.default,
      'twitch': _twitch.default,
      'youtube': _youtube.default
    },
    data: function () {
      return {
        video: {
          name: '',
          subName: '',
          file: '',
          played: false,
          skipped: false,
          duration: 0,
          // seconds
          player: 'empty'
        }
      };
    },
    watch: {
      'video.name': function () {
        jQuery('.video-name').removeClass('animation');
        setTimeout(function () {
          jQuery('.video-name').addClass('animation');
        }, 100);
      }
    },
    mounted: function () {
      this.getVideo();
    },
    methods: {
      setVideo: function (args) {
        if (this.$root._route.params.channel.toLowerCase() === args.channel.toLowerCase()) {
          const $this = this;
          $this.video = args.video;

          if (parseInt(this.video.duration) > 0) {
            setTimeout(function () {
              $this.video.player = 'empty';
              $this.getVideo();
            }, parseInt($this.video.duration) * 1000);
          }
        }
      },
      getVideo: function () {
        if (typeof socketWrite === 'function') {
          const call = {
            method: 'getVideo',
            args: {
              channel: this.$root._route.params.channel.toLowerCase()
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