define(["exports","vue-ctk-date-time-picker","../../method/bs-component","../../method/image-lazyload"],(function(t,e,s,a){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e=o(e),s=o(s),a=o(a);var i={template:'<div class="row statistic"><div class="col-12 mb-3"><h3 class="text-center">{{ $route.params.channel }} - {{ $t(&#39;statistic&#39;) }}&nbsp;<router-link class="btn btn-sm btn-primary btn-fs1rem" data-toggle="tooltip" data-placement="top" :title="$tc(&#39;channel&#39;, 1)" :to="{name: &#39;channel&#39;, params: {channel: $route.params.channel}}"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;video&#39;]" class="fa-fw" /></router-link></h3></div><div class="col-12 mb-3"><div class="tile-background p-2"><div class="row justify-content-center"><div class="col-12 col-lg-8 col-xl-6 col-xxl-5"><div class="form-row"><div class="col"><c-datetime id="start" v-model="datetimePicker.start" color="#2e97bf" :dark="true" format="YYYY-MM-DDTHH:mm:ss" label="" :no-label="true" :no-header="true"></c-datetime></div><div class="col-auto">-</div><div class="col"><c-datetime id="end" v-model="datetimePicker.end" color="#2e97bf" :dark="true" format="YYYY-MM-DDTHH:mm:ss" label="" :no-label="true" :no-header="true"></c-datetime></div><div class="col-auto"><span class="d-inline-block" data-toggle="tooltip" data-placement="top" :title="$t(&#39;update&#39;)"><button type="button" class="btn btn-primary" :disabled="completed < 9" @click="getAllStats()"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;sync&#39;]" class="fa-fw" :class="{&#39;fa-spin&#39;: completed < 9}" /></button></span></div><div v-if="streamDates.length" class="col-12 pt-2"><select id="stream-dates" v-model.number="streamDate" class="custom-select"><option value="-1">{{ $t(&#39;past-streams&#39;) }}</option><option v-for="(streamDateItem, index) in streamDates" :key="streamDateItem.id" :value="index">{{ streamDateItem.start|formatDateTime($t(&#39;streamdate&#39;)) }} - {{ streamDateItem.end|formatDateTime($t(&#39;streamdate&#39;)) }} / {{ streamDateItem.title }}</option></select></div></div></div></div></div></div><div v-if="hasChart" class="col-12 mb-3"><div class="tile-background p-2"><div class="row text-white"><div class="col">{{ $t(&#39;min&#39;) }}: <span v-if="misc.minViewer">{{ misc.minViewer }}</span><span v-else>0</span></div><div class="col text-center">{{ $t(&#39;avg&#39;) }}: <span v-if="misc.avgViewer">{{ misc.avgViewer }}</span><span v-else>0</span></div><div class="col text-right">{{ $t(&#39;max&#39;) }}: <span v-if="misc.maxViewer">{{ misc.maxViewer }}</span><span v-else>0</span></div></div><canvas id="canvas"></canvas></div></div><div class="col-12 col-md-6 col-lg-3 mb-3 top-emotes"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;top-15-all&#39;) }}</div><div v-if="topEmotesAll.length" class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><thead><tr><th scope="col"></th><th scope="col">{{ $t(&#39;code&#39;) }}</th><th scope="col">{{ $t(&#39;amount&#39;) }}</th></tr></thead><tbody><tr v-for="emote in topEmotesAll" :key="emote.uuid">\x3c!-- eslint-disable-next-line vue/no-v-html --\x3e<td><span v-html="emote.image"></span></td><td>{{ emote.code }}</td><td>{{ emote.amount }}</td></tr></tbody></table></div><div v-else class="text-center">{{ $t(&#39;no-emotes-used&#39;) }}</div></div></div><div class="col-12 col-md-6 col-lg-3 mb-3 top-emotes"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;top-15-twitch&#39;) }}</div><div v-if="topEmotesTwitch.length" class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><thead><tr><th scope="col"></th><th scope="col">{{ $t(&#39;code&#39;) }}</th><th scope="col">{{ $t(&#39;amount&#39;) }}</th></tr></thead><tbody><tr v-for="emote in topEmotesTwitch" :key="emote.uuid">\x3c!-- eslint-disable-next-line vue/no-v-html --\x3e<td><span v-html="emote.image"></span></td><td>{{ emote.code }}</td><td>{{ emote.amount }}</td></tr></tbody></table></div><div v-else class="text-center">{{ $t(&#39;no-emotes-used&#39;) }}</div></div></div><div class="col-12 col-md-6 col-lg-3 mb-3 top-emotes"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;top-15-bttv&#39;) }}</div><div v-if="topEmotesBttv.length" class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><thead><tr><th scope="col"></th><th scope="col">{{ $t(&#39;code&#39;) }}</th><th scope="col">{{ $t(&#39;amount&#39;) }}</th></tr></thead><tbody><tr v-for="emote in topEmotesBttv" :key="emote.uuid">\x3c!-- eslint-disable-next-line vue/no-v-html --\x3e<td><span v-html="emote.image"></span></td><td>{{ emote.code }}</td><td>{{ emote.amount }}</td></tr></tbody></table></div><div v-else class="text-center">{{ $t(&#39;no-emotes-used&#39;) }}</div></div></div><div class="col-12 col-md-6 col-lg-3 mb-3 top-emotes"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;top-15-ffz&#39;) }}</div><div v-if="topEmotesFfz.length" class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><thead><tr><th scope="col"></th><th scope="col">{{ $t(&#39;code&#39;) }}</th><th scope="col">{{ $t(&#39;amount&#39;) }}</th></tr></thead><tbody><tr v-for="emote in topEmotesFfz" :key="emote.uuid">\x3c!-- eslint-disable-next-line vue/no-v-html --\x3e<td><span v-html="emote.image"></span></td><td>{{ emote.code }}</td><td>{{ emote.amount }}</td></tr></tbody></table></div><div v-else class="text-center">{{ $t(&#39;no-emotes-used&#39;) }}</div></div></div><div class="col-12 col-md-4 mb-3"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $tc(&#39;sub&#39;, 2) }}</div><div class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><tbody><tr><td>{{ $t(&#39;new&#39;) }}</td><td><span v-if="subs.new">{{ subs.new }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;new-paid&#39;) }}</td><td><span v-if="subs.newPaid">{{ subs.newPaid }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;new-prime&#39;) }}</td><td><span v-if="subs.newPrime">{{ subs.newPrime }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;gifted&#39;) }}</td><td><span v-if="subs.gifted">{{ subs.gifted }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;gifted-random&#39;) }}</td><td><span v-if="subs.giftedRandom">{{ subs.giftedRandom }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;resubs&#39;) }}</td><td><span v-if="subs.resubs">{{ subs.resubs }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;resubs-paid&#39;) }}</td><td><span v-if="subs.resubsPaid">{{ subs.resubsPaid }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;resubs-prime&#39;) }}</td><td><span v-if="subs.resubsPrime">{{ subs.resubsPrime }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;sub-bombs&#39;) }}</td><td><span v-if="subs.bombs">{{ subs.bombs }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;total&#39;) }}</td><td><span v-if="subs.new + subs.gifted + subs.giftedRandom + subs.resubs">{{ subs.new + subs.gifted + subs.giftedRandom + subs.resubs }}</span><span v-else>0</span></td></tr><tr class="d-none"><td>{{ $t(&#39;anon-gift-paid-upgrade&#39;) }}</td><td><span v-if="subs.anonUpgrade">{{ subs.anonUpgrade }}</span><span v-else>0</span></td></tr></tbody></table></div></div></div><div class="col-12 col-md-4 mb-3"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;purges&#39;) }}</div><div class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><tbody><tr><td>{{ $t(&#39;deleted-messages&#39;) }}</td><td><span v-if="purges.deletedMessages">{{ purges.deletedMessages }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;timeouted-messages&#39;) }}</td><td><span v-if="purges.timeoutedMessages">{{ purges.timeoutedMessages }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;timeouted-users&#39;) }}</td><td><span v-if="purges.timeoutedUsers">{{ purges.timeoutedUsers }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;banned-users&#39;) }}</td><td><span v-if="purges.bannnedUsers">{{ purges.bannnedUsers }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;total&#39;) }}</td><td><span v-if="purges.deletedMessages + purges.timeoutedMessages + purges.bannnedUsers">{{ purges.deletedMessages + purges.timeoutedMessages + purges.bannnedUsers }}</span><span v-else>0</span></td></tr></tbody></table></div></div></div><div class="col-12 col-md-4 mb-3"><div class="tile-background p-2"><div class="h5 text-center pt-1">{{ $t(&#39;miscellanea&#39;) }}</div><div class="table-responsive mb-3"><table class="table table-striped table-hover table-dark mb-0"><tbody><tr><td>{{ $t(&#39;new-users&#39;) }}</td><td><span v-if="misc.newUsers">{{ misc.newUsers }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;all-users&#39;) }}</td><td><span v-if="misc.allUsers">{{ misc.allUsers }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;chat-messages&#39;) }}</td><td><span v-if="misc.messages">{{ misc.messages }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;used-emotes&#39;) }}</td><td><span v-if="misc.usedEmotes">{{ misc.usedEmotes }}</span><span v-else>0</span></td></tr><tr><td>{{ $tc(&#39;cheer&#39;, 2) }}</td><td><span v-if="misc.cheers">{{ misc.cheers }}</span><span v-else>0</span></td></tr><tr><td>{{ $tc(&#39;bit&#39;, 2) }}</td><td><span v-if="misc.bits">{{ misc.bits }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;min-viewer&#39;) }}</td><td><span v-if="misc.minViewer">{{ misc.minViewer }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;average-viewer&#39;) }}</td><td><span v-if="misc.avgViewer">{{ misc.avgViewer }}</span><span v-else>0</span></td></tr><tr><td>{{ $t(&#39;max-viewer&#39;) }}</td><td><span v-if="misc.maxViewer">{{ misc.maxViewer }}</span><span v-else>0</span></td></tr></tbody></table></div></div></div></div>',components:{"c-datetime":e.default},mixins:[s.default,a.default],data:function(){return{completed:9,datetimePicker:{start:moment().format("YYYY-MM-DDT00:00"),end:moment().format("YYYY-MM-DDT23:59:59")},hasChart:!1,misc:{},purges:{},streamDate:-1,streamDates:[],subs:{},topEmotesAll:[],topEmotesBttv:[],topEmotesFfz:[],topEmotesTwitch:[]}},watch:{"misc.minViewer":function(){"number"!=typeof this.misc.minViewer&&(this.hasChart=!1)},streamDate:function(){this.streamDate>=0?this.datetimePicker={start:moment(1e3*this.streamDates[this.streamDate].start).format("YYYY-MM-DDTHH:mm"),end:moment(1e3*this.streamDates[this.streamDate].end).format("YYYY-MM-DDTHH:mm")}:this.datetimePicker={start:moment().format("YYYY-MM-DDT00:00"),end:moment().format("YYYY-MM-DDT23:59:59")}}},mounted:function(){this.getAllStats()},methods:{getAllStats:function(){let t=this;this.completed=0,this.getTopEmotes("'ttv','bttv','ffz'","All",15),this.getTopEmotes("'ttv'","Twitch",15),this.getTopEmotes("'bttv'","Bttv",15),this.getTopEmotes("'ffz'","Ffz",15),this.getChart(),this.getMisc(),this.getPurges(),this.getStreamDates(),this.getSubs(),setTimeout((function(){t.initTooltip()}),1250)},getChart:function(){if("function"==typeof socketWrite){const t={method:"getChart",args:{channel:this.$root._route.params.channel.toLowerCase(),start:this.datetimePicker.start+moment().format("Z"),end:this.datetimePicker.end+moment().format("Z")},env:"node"};socketWrite(t)}},getMisc:function(){if("function"==typeof socketWrite){const t={method:"getMisc",args:{channel:this.$root._route.params.channel.toLowerCase(),start:this.datetimePicker.start+moment().format("Z"),end:this.datetimePicker.end+moment().format("Z")},env:"node"};socketWrite(t)}},getPurges:function(){if("function"==typeof socketWrite){const t={method:"getPurges",args:{channel:this.$root._route.params.channel.toLowerCase(),start:this.datetimePicker.start+moment().format("Z"),end:this.datetimePicker.end+moment().format("Z")},env:"node"};socketWrite(t)}},getStreamDates:function(){if("function"==typeof socketWrite){const t={method:"getStreamDates",args:{channel:this.$root._route.params.channel.toLowerCase()},env:"node"};socketWrite(t)}},getSubs:function(){if("function"==typeof socketWrite){const t={method:"getSubs",args:{channel:this.$root._route.params.channel.toLowerCase(),start:this.datetimePicker.start+moment().format("Z"),end:this.datetimePicker.end+moment().format("Z")},env:"node"};socketWrite(t)}},getTopEmotes:function(t,e,s){if("function"==typeof socketWrite){const a={method:"getTopEmotes",args:{channel:this.$root._route.params.channel.toLowerCase(),types:t,limit:s,array:e,start:this.datetimePicker.start+moment().format("Z"),end:this.datetimePicker.end+moment().format("Z")},env:"node"};socketWrite(a)}},setChart:function(t){if(this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,t.data.length)){this.hasChart=!0;let e={type:"line",data:{labels:t.labels,datasets:[{backgroundColor:t.backgroundColor,borderColor:"#2e97bf",data:t.data,fill:!1,fontColor:"#fff",label:this.$t("viewer-count")}]},options:{responsive:!0,legend:{labels:{fontColor:"#fff"}},scales:{yAxes:[{gridLines:{color:"#212121"},ticks:{fontColor:"#fff",min:0}}],xAxes:[{gridLines:{color:"#212121"},ticks:{fontColor:"#fff"}}]}}};setTimeout((function(){if(void 0!==window.viewerCountChart&&window.viewerCountChart.destroy(),jQuery("#canvas").is(":visible")){let t=document.getElementById("canvas").getContext("2d");window.viewerCountChart=new Chart(t,e)}}),200)}},setMisc:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,this.misc=t.misc)},setPurges:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,this.purges=t.purges)},setStreamDates:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,this.streamDates=t.streamDates)},setSubs:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,this.subs=t.subs)},setTopEmotes:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.completed++,this["topEmotes"+t.array]=t.emotes)}}};t.default=i}));