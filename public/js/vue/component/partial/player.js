define(["exports","./player/empty","./player/local","./player/twitch-clip","./player/twitch","./player/youtube"],(function(e,t,o,i,a,n){"use strict";function d(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=d(t),o=d(o),i=d(i),a=d(a),n=d(n);var s={template:'<div class="player" :class="$route.params.channel.toLowerCase()"><div v-if="video.player !== &#39;&#39;"><component :is="video.player" ref="player"></component></div><div v-if="video.name.length" class="video-name overlay px-2 pb-1 px-xxl-3">{{ video.name }}<div v-if="video.subName.length" class="sub-name">{{ video.subName }}</div></div></div>',components:{empty:t.default,local:o.default,"twitch-clip":i.default,twitch:a.default,youtube:n.default},data:function(){return{video:{name:"",subName:"",file:"",played:!1,skipped:!1,duration:0,player:"empty"}}},watch:{"video.name":function(){jQuery(".video-name").removeClass("animation"),setTimeout((function(){jQuery(".video-name").addClass("animation")}),100)}},mounted:function(){this.getVideo()},methods:{setVideo:function(e){if(this.$root._route.params.channel.toLowerCase()===e.channel.toLowerCase()){const t=this;t.video=e.video,parseInt(this.video.duration)>0&&setTimeout((function(){t.video.player="empty",t.getVideo()}),1e3*parseInt(t.video.duration))}},getVideo:function(){if("function"==typeof socketWrite){const e={method:"getVideo",args:{channel:this.$root._route.params.channel.toLowerCase()},env:"node"};socketWrite(e)}}}};e.default=s}));