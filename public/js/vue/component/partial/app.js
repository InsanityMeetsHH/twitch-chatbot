define(["exports"],(function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={template:'<component :is="layout" ref="layout" />',computed:{layout(){return"l-"+(this.$route.meta.layout||"default")}},mounted:function(){jQuery("html").attr("lang",this.$t("lang")),jQuery("html").removeClass("no-js");let t=/access_token=([a-z0-9]+)/;t.test(document.location.hash)&&(document.location.href=this.$router.resolve({name:"token",params:{token:document.location.hash.match(t)[1],property:"oauthToken"}}).href)}};t.default=e}));