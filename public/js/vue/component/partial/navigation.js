define(["exports"],(function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={template:'<div class="col-auto"><router-link class="btn btn-sm btn-primary mr-2" :to="{name: &#39;index&#39;}"><font-awesome-icon :icon="[&#39;fas&#39;, &#39;home&#39;]" class="fa-fw" /></router-link><a class="btn btn-sm btn-success" target="_blank" :href="getOauthTokenLink()">{{ $t(&#39;token-twitch&#39;) }}</a></div>',methods:{getOauthTokenLink:function(){return`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=mfatyz3gbgk3irt7sygwdfd2qa09wt&redirect_uri=${document.location.origin}&force_verify=true&scope=channel_editor+user_read`}}};t.default=e}));