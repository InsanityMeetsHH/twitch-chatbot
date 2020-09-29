define(["exports","../../method/btn-animation","../../method/data-table"],(function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e=o(e),a=o(a);var n={template:'<div class="row"><div class="col-12"><div class="commands p-2"><div class="h4 text-center">{{ $tc(&#39;command&#39;, 2) }}</div><div v-if="commands.length > 0" class="table-responsive"><table id="commandsTable" class="table table-striped table-hover table-dark data-table"><thead><tr><th scope="col">#</th><th scope="col">{{ $t(&#39;name&#39;) }}</th><th scope="col">{{ $t(&#39;cooldown&#39;) }}</th><th scope="col">{{ $t(&#39;last-exec&#39;) }}</th><th scope="col">{{ $t(&#39;active&#39;) }}</th><th scope="col" class="text-center" data-orderable="false"><span class="d-none" data-toggle="tooltip" data-placement="top" title="Refresh" @click="getCommands()"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;sync&#39;]" class="fa-fw"></font-awesome-icon></span></th></tr></thead><tbody>\x3c!-- eslint-disable-next-line vue/require-v-for-key --\x3e<tr v-for="(command, index) in commands" class="video"><td>{{ index + 1 }}</td><td>{{ command.name }}</td><td :data-order="command.cooldown"><div class="input-group input-group-sm"><input v-model.number="commands[index].cooldown" type="number" min="0" max="3600" class="form-control" :class="{&#39;is-invalid&#39;: commands[index].cooldown < 0 || commands[index].cooldown > 3600}"><div class="input-group-append">\x3c!-- eslint-disable-next-line vue/singleline-html-element-content-newline --\x3e<div class="input-group-text">s</div></div></div></td><td :data-order="command.lastExec"><span class="d-inline-block text-nowrap" data-toggle="tooltip" data-placement="top" :title="command.lastExec|formatDateTime($t(&#39;datetime&#39;))">{{ command.lastExec|formatDateTime($t(&#39;time-long-suffix&#39;)) }}</span></td><td :data-order="command.active ? &#39;1&#39; : &#39;0&#39;" :data-search="command.active ? &#39;active-yes&#39; : &#39;active-no&#39;"><div class="custom-control custom-switch"><input :id="&#39;command-active-&#39; + index" v-model.number="commands[index].active" type="checkbox" class="custom-control-input"><label class="custom-control-label" :for="&#39;command-active-&#39; + index">&nbsp;</label></div></td><td class="text-center"><button type="button" class="btn btn-sm btn-primary btn-animation" data-animation-success="success" data-animation-error="error" data-toggle="tooltip" data-placement="top" title="Save" @click="updateCommand(index)"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;save&#39;]" class="fa-fw"></font-awesome-icon></button></td></tr></tbody></table></div></div></div></div>',mixins:[e.default,a.default],data:function(){return{commands:[]}},mounted:function(){this.getCommands()},methods:{getCommands:function(){if("function"==typeof socketWrite){const t={method:"getCommands",args:{channel:this.$root._route.params.channel.toLowerCase()},env:"node"};socketWrite(t)}},setCommands:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.commands=t.commands,this.initDataTable())},updateCommand:function(t){if("function"==typeof socketWrite&&this.commands[t].cooldown>=0&&this.commands[t].cooldown<=3600){const e={method:"updateCommand",args:{channel:this.$root._route.params.channel.toLowerCase(),command:this.commands[t],commandIndex:t},env:"node"};socketWrite(e),this.btnAnimation(event.target,"success"),this.updateDataTableRow(t,"commandsTable")}else this.btnAnimation(event.target,"error"),this.updateDataTableRow(t,"commandsTable")},updateCommandLastExec:function(t){this.$root._route.params.channel.toLowerCase()===t.channel.toLowerCase()&&(this.commands[t.commandIndex].lastExec=t.lastExec,this.updateDataTableRow(t.commandIndex,"commandsTable"))}}};t.default=n}));