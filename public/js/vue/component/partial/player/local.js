define(["exports"],(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={template:'<div class="embed-responsive embed-responsive-16by9"><video class="embed-responsive-item" autoplay><source :src="generateUrl(video.file)" type="video/mp4">{{ $t(\'no-video-support\') }}</video></div>',data:function(){return{video:{}}},mounted:function(){this.getParentVideo()},methods:{generateUrl:function(e){return"http://localhost:3060/"+e},getParentVideo:function(){this.video=this.$parent.video}}};e.default=t}));