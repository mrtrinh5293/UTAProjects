if (self.CavalryLogger) { CavalryLogger.start_js(["KShBS"]); }

__d("CommercialBreakMobileEvent",[],(function a(b,c,d,e,f,g){f.exports={SUBSCRIPTION_SUCCESS:"commercial_break_skywalker_subscription_success",SUBSCRIPTION_FAILURE:"commercial_break_skywalker_subscription_failure",RECEIVE_INTENT_MSG:"commercial_break_skywalker_receive_intent",RECEIVE_START_MSG:"commercial_break_skywalker_receive_start",RECEIVE_INVALID_MSG:"commercial_break_skywalker_receive_invalid_message",VIDEO_FETCH_SUCCESS:"commercial_break_video_fetch_success",VIDEO_FETCH_FAILURE:"commercial_break_video_fetch_failure",COMMERCIAL_BREAK_INLINE_TO_FULLSCREEN:"commercial_break_inline_to_fullscreen",COMMERCIAL_BREAK_FULLSCREEN_TO_INLINE:"commercial_break_fullscreen_to_inline",COMMERCIAL_BREAK_SCROLLED_AWAY:"commercial_break_scrolled_away",COMMERCIAL_BREAK_SCROLLED_INTO:"commercial_break_scrolled_into",COMMERCIAL_BREAK_START_NFX:"commercial_break_start_nfx",COMMERCIAL_BREAK_HIDE_AD:"commercial_break_hide_ad",COMMERCIAL_BREAK_HIDE_AD_BREAKS:"commercial_break_hide_ad_breaks",COMMERCIAL_BREAK_START:"commercial_break_start",COMMERCIAL_BREAK_START_AD:"commercial_break_start_ad",COMMERCIAL_BREAK_TRANSIT:"commercial_break_transit",COMMERCIAL_BREAK_WAIT_FOR:"commercial_break_wait_for",COMMERCIAL_BREAK_STATIC_COUNTDOWN:"commercial_break_static_countdown",COMMERCIAL_BREAK_END:"commercial_break_end",COMMERCIAL_BREAK_PAUSE_AD:"commercial_break_pause_ad",COMMERCIAL_BREAK_PLAY_AD:"commercial_break_play_ad",COMMERCIAL_BREAK_NO_AD_TRANSITION:"commercial_break_no_ad_transition",COMMERCIAL_BREAK_ELIGIBLE_VOD_START:"commercial_break_eligible_vod_start",COMMERCIAL_BREAK_START_SHOW_NOTHING:"commercial_break_start_show_nothing",COMMERCIAL_BREAK_STARTING_INDICATOR:"commercial_break_starting_indicator",COMMERCIAL_BREAK_START_TIME_DELTA:"commercial_break_start_time_delta",COMMERCIAL_BREAK_IMPRESSION_ATTEMPT:"commercial_break_impression_attempt",COMMERCIAL_BREAK_SKYWALKER_RECEIVED_DUPLICATE_EVENT:"commercial_break_skywalker_received_duplicate_event",COMMERCIAL_BREAK_ADS_LOADED:"commercial_break_ads_loaded",COMMERCIAL_BREAK_FIRE_EVENT_IN_TRACKER:"commercial_break_fire_event_in_tracker",COMMERCIAL_BREAK_LOG_IMPRESSION_IN_TRACKER:"commercial_break_log_impression_in_tracker",COMMERCIAL_BREAK_REGISTER_VIDEO:"commercial_break_register_video"};}),null);
__d("CommercialBreakNoAdReason",[],(function a(b,c,d,e,f,g){f.exports={NO_VIDEO_AD:"no_video_ad",TIME_SPENT_INSUFFICIENT:"time_spent_insufficient",PLAYBACK_ERROR:"playback_error",HIDE_AD:"hide_ad",WAIT_FOR_FAILED:"wait_for_failed",SPONSORED_STORY:"sponsored_story",CONTROL_GROUP:"control_group",DUPLICATE_VIDEO:"duplicate_video",INACTIVE_TAB:"inactive_tab"};}),null);
__d("InstreamVideoAdType",[],(function a(b,c,d,e,f,g){f.exports={LIVE:"live",VOD:"vod",NONLIVE:"nonlive",LIVE_POST_ROLL:"live_post_roll",VOD_POST_ROLL:"vod_post_roll",NONLIVE_POST_ROLL:"nonlive_post_roll",LIVE_AD_PODS:"live_ad_pods"};}),null);
__d('InstreamVideoAdBreak',[],(function a(b,c,d,e,f,g){'use strict';function h(i){this.$InstreamVideoAdBreak1=i.instreamPlacement;this.$InstreamVideoAdBreak2=i.index;this.$InstreamVideoAdBreak3=i.timeOffsetInMs;this.$InstreamVideoAdBreak4=i.adBreakDurationInMs;}h.prototype.getInstreamPlacement=function(){return this.$InstreamVideoAdBreak1;};h.prototype.getIndex=function(){return this.$InstreamVideoAdBreak2;};h.prototype.getTimeOffsetInMs=function(){return this.$InstreamVideoAdBreak3;};h.prototype.getAdBreakDurationInMs=function(){return this.$InstreamVideoAdBreak4;};f.exports=h;}),null);
__d('CommercialBreakExposureLogger',['CommercialBreakMobileEvent','CommercialBreakNoAdReason','InstreamVideoAdType','MarauderLogger','QE'],(function a(b,c,d,e,f,g){var h=1000,i=1000;function j(k,l,m,n,o){'use strict';this.$CommercialBreakExposureLogger1=k;this.$CommercialBreakExposureLogger2=l;this.$CommercialBreakExposureLogger3=m;this.$CommercialBreakExposureLogger4=n;this.$CommercialBreakExposureLogger5=o;this.$CommercialBreakExposureLogger6=0;if(m&&n)this.$CommercialBreakExposureLogger1.addListener('updateStatus',this.$CommercialBreakExposureLogger7.bind(this));}j.prototype.$CommercialBreakExposureLogger7=function(){'use strict';var k=Date.now();if(k-this.$CommercialBreakExposureLogger6<i)return;var l=this.$CommercialBreakExposureLogger1.getCurrentTimePosition()*h;for(var m=0;m<this.$CommercialBreakExposureLogger3.length;m++){var n=this.$CommercialBreakExposureLogger3[m].getTimeOffsetInMs()||0;if(l<=n&&l+i>n){c('QE').logExposure(this.$CommercialBreakExposureLogger4);if(!this.$CommercialBreakExposureLogger5){var o={ad_break_index:this.$CommercialBreakExposureLogger3[m].getIndex(),commercial_break_no_ad_reason:c('CommercialBreakNoAdReason').CONTROL_GROUP,host_video_id:this.$CommercialBreakExposureLogger1.getVideoID(),instream_video_ad_type:this.$CommercialBreakExposureLogger2?c('InstreamVideoAdType').VOD:c('InstreamVideoAdType').NONLIVE};c('MarauderLogger').log(c('CommercialBreakMobileEvent').COMMERCIAL_BREAK_START_SHOW_NOTHING,'commercial_break',o);}this.$CommercialBreakExposureLogger6=k;return;}}};f.exports=j;}),null);
__d('VideoWithInstreamVideo',['BanzaiODS','CommercialBreakMobileEvent','CommercialBreakShouldLogMarauderEvent','DateConsts','EventEmitter','InstreamVideoAdType','MarauderLogger','SubscriptionsHandler','VideoPlayerLoggerEventField','VideoPlayerReason','VideoPlayerStates','onViewportChanged'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('EventEmitter'));i=h&&h.prototype;function j(k){'use strict';i.constructor.call(this);this.$VideoWithInstreamVideo4=k;}j.prototype.enable=function(k){'use strict';if(this.$VideoWithInstreamVideo2)return;this.$VideoWithInstreamVideo2=k;this.$VideoWithInstreamVideo3=k;this.$VideoWithInstreamVideo11=false;this.$VideoWithInstreamVideo12=this.getIsVisibleForAutoplay();c('onViewportChanged')(this.$VideoWithInstreamVideo15.bind(this));this.$VideoWithInstreamVideo1=new (c('SubscriptionsHandler'))();this.$VideoWithInstreamVideo1.engage();this.$VideoWithInstreamVideo13=[];this.$VideoWithInstreamVideo16();this.$VideoWithInstreamVideo2.registerOption('VideoWithInstreamVideo','enabled',function(){return true;});this.$VideoWithInstreamVideo2.registerOption('VideoWithInstreamVideo','controller',function(){return this;}.bind(this));};j.prototype.disable=function(){'use strict';};j.prototype.$VideoWithInstreamVideo17=function(){'use strict';var k=['play','pause','mute','unmute','constructor','destroy','addListener','isMuted','isState','updateSource'],l=this.$VideoWithInstreamVideo2.constructor.prototype,m=Object.getOwnPropertyNames(l).filter(function(n){var o=l[n];return typeof o==='function'&&k.indexOf(n)<0;});return m;};j.prototype.$VideoWithInstreamVideo16=function(){'use strict';var k=this.$VideoWithInstreamVideo17(),l=function m(n){this.constructor.prototype[n]=function(){return this.$VideoWithInstreamVideo2[n].apply(this.$VideoWithInstreamVideo2,arguments);};};k.forEach(l,this);};j.prototype.$VideoWithInstreamVideo18=function(){'use strict';var k=this.$VideoWithInstreamVideo17();k.forEach(function(l){return delete this.constructor.prototype[l];}.bind(this));};j.prototype.$VideoWithInstreamVideo19=function(){var k;'use strict';(k=i.emit).call.apply(k,[this].concat(Array.prototype.slice.call(arguments)));};j.prototype.emit=function(){var k;'use strict';(k=this.$VideoWithInstreamVideo2).emit.apply(k,arguments);};j.prototype.$VideoWithInstreamVideo20=function(event){'use strict';if(this.$VideoWithInstreamVideo13.indexOf(event)<0){this.$VideoWithInstreamVideo13.push(event);var k=function(event){return this.$VideoWithInstreamVideo19.bind(this,event);}.bind(this);this.$VideoWithInstreamVideo1.addSubscriptions(this.$VideoWithInstreamVideo2.addListener(event,k(event)));}};j.prototype.addListener=function(event){var k;'use strict';this.$VideoWithInstreamVideo20(event);return (k=i.addListener).call.apply(k,[this].concat(Array.prototype.slice.call(arguments)));};j.prototype.registerInstreamVideo=function(k){'use strict';if(!this.$VideoWithInstreamVideo11){this.$VideoWithInstreamVideo11=true;this.$VideoWithInstreamVideo2.instreamVideoStart();}if(this.$VideoWithInstreamVideo3===this.$VideoWithInstreamVideo2){this.$VideoWithInstreamVideo7=this.$VideoWithInstreamVideo2.isState(c('VideoPlayerStates').PLAYING);this.$VideoWithInstreamVideo9=this.$VideoWithInstreamVideo2.isMuted();this.$VideoWithInstreamVideo10=this.$VideoWithInstreamVideo2.getVolume();var l=this.getCurrentInstreamVideoAdType();if(l===c('InstreamVideoAdType').LIVE){this.$VideoWithInstreamVideo2.mute();}else if(l===c('InstreamVideoAdType').VOD||l===c('InstreamVideoAdType').NONLIVE){var m;this.$VideoWithInstreamVideo2.setLogEntryPropertyGetters((m={},m[c('VideoPlayerLoggerEventField').INSTREAM_VIDEO_AD_BREAK_INDEX]=this.$VideoWithInstreamVideo5,m[c('VideoPlayerLoggerEventField').INSTREAM_VIDEO_AD_BREAK_VIDEO_ID]=this.$VideoWithInstreamVideo6?this.$VideoWithInstreamVideo6:-1,m));this.$VideoWithInstreamVideo2.pause(c('VideoPlayerReason').COMMERCIAL_BREAK);}}this.$VideoWithInstreamVideo3=k;};j.prototype.resetInstreamVideo=function(){'use strict';this.$VideoWithInstreamVideo2.removeLogEntryPropertyGetters([c('VideoPlayerLoggerEventField').INSTREAM_VIDEO_AD_BREAK_INDEX,c('VideoPlayerLoggerEventField').INSTREAM_VIDEO_AD_BREAK_VIDEO_ID]);if(this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2){var k=this.getCurrentInstreamVideoAdType();if(k===c('InstreamVideoAdType').LIVE&&!this.$VideoWithInstreamVideo9&&this.$VideoWithInstreamVideo2.isMuted()){this.$VideoWithInstreamVideo2.unmute();}else if((k===c('InstreamVideoAdType').VOD||k===c('InstreamVideoAdType').NONLIVE)&&this.$VideoWithInstreamVideo7&&!this.$VideoWithInstreamVideo2.isState(c('VideoPlayerStates').PLAYING))this.$VideoWithInstreamVideo2.play(c('VideoPlayerReason').COMMERCIAL_BREAK);}this.$VideoWithInstreamVideo3=this.$VideoWithInstreamVideo2;this.$VideoWithInstreamVideo11=false;this.$VideoWithInstreamVideo2.instreamVideoEnd();};j.prototype.shouldPlayInstreamAd=function(){'use strict';if(this.$VideoWithInstreamVideo4.isLive&&!this.$VideoWithInstreamVideo7)return false;return this.getIsVisibleForAutoplay();};j.prototype.playInstreamAd=function(){'use strict';if(!this.$VideoWithInstreamVideo3||this.$VideoWithInstreamVideo3===this.$VideoWithInstreamVideo2){c('BanzaiODS').bumpEntityKey('instreamads','missing_ad_player');return;}var k=this.$VideoWithInstreamVideo3;this.logMarauderEvent(c('CommercialBreakMobileEvent').COMMERCIAL_BREAK_START_AD,{commercial_break_ad_client_token:k.getAdClientToken()});k.once('beginPlayback',function(){this.$VideoWithInstreamVideo14={adClientToken:k.getAdClientToken(),adStartPlayingTimeMs:Date.now(),adPositionInVideoMs:this.$VideoWithInstreamVideo2.getCurrentTimePosition()*c('DateConsts').MS_PER_SEC};}.bind(this));if(this.$VideoWithInstreamVideo9){k.mute();}else{k.unmute();k.setVolume(this.$VideoWithInstreamVideo10);}this.$VideoWithInstreamVideo8=false;k.play(c('VideoPlayerReason').AUTOPLAY);};j.prototype.play=function(k){var l,m=this;'use strict';this.$VideoWithInstreamVideo7=true;if(this.$VideoWithInstreamVideo3&&(this.$VideoWithInstreamVideo3===this.$VideoWithInstreamVideo2||this.$VideoWithInstreamVideo3.isState(c('VideoPlayerStates').PAUSED)||this.$VideoWithInstreamVideo3.isState(c('VideoPlayerStates').PLAYING)))(function(){var n=m.$VideoWithInstreamVideo3;if(!m.$VideoWithInstreamVideo2.getOption('VideoWithCommercialBreak','isInstreamPausedByNFX'))if(m.$VideoWithInstreamVideo8&&n!==m.$VideoWithInstreamVideo2){n.once('pausePlayback',function(){return n.play(k);});}else n.play(k);})();if(this.$VideoWithInstreamVideo4.isLive&&this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2)this.$VideoWithInstreamVideo2.play(k);};j.prototype.pause=function(k){'use strict';if(k===c('VideoPlayerReason').USER&&this.$VideoWithInstreamVideo3===this.$VideoWithInstreamVideo2&&this.$VideoWithInstreamVideo2.getOption('VideoWithInstreamVideo','disableClickToPause'))return;this.$VideoWithInstreamVideo7=false;if(this.$VideoWithInstreamVideo3&&(this.$VideoWithInstreamVideo3===this.$VideoWithInstreamVideo2||this.$VideoWithInstreamVideo3.isState(c('VideoPlayerStates').PLAYING))){var l=this.$VideoWithInstreamVideo3;if(l!==this.$VideoWithInstreamVideo2){this.$VideoWithInstreamVideo8=true;l.once('pausePlayback',function(){return this.$VideoWithInstreamVideo8=false;}.bind(this));}l.pause(k);}if(this.$VideoWithInstreamVideo4.isLive&&this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2)this.$VideoWithInstreamVideo2.pause(k);};j.prototype.mute=function(){'use strict';this.$VideoWithInstreamVideo9=true;if(this.$VideoWithInstreamVideo3)this.$VideoWithInstreamVideo3.mute();};j.prototype.unmute=function(){'use strict';this.$VideoWithInstreamVideo9=false;if(this.$VideoWithInstreamVideo3)this.$VideoWithInstreamVideo3.unmute();};j.prototype.isMuted=function(){'use strict';if(this.$VideoWithInstreamVideo3)return this.$VideoWithInstreamVideo3.isMuted();return this.$VideoWithInstreamVideo2.isMuted();};j.prototype.isState=function(k){'use strict';if(this.$VideoWithInstreamVideo3)return this.$VideoWithInstreamVideo3.isState(k);return this.$VideoWithInstreamVideo2.isState(k);};j.prototype.destroy=function(){'use strict';if(this.$VideoWithInstreamVideo3&&this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2)this.$VideoWithInstreamVideo3.destroy();this.$VideoWithInstreamVideo2.destroy();};j.prototype.updateSource=function(k){'use strict';if(this.$VideoWithInstreamVideo3&&this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2)this.$VideoWithInstreamVideo3.updateSource(k);this.$VideoWithInstreamVideo2.updateSource(k);};j.prototype.getConfig=function(){'use strict';return this.$VideoWithInstreamVideo4;};j.prototype.setCurrentInstreamVideoAdBreakIndex=function(k){'use strict';this.$VideoWithInstreamVideo5=k;};j.prototype.setCurrentInstreamVideoAdBreakVideoID=function(k){'use strict';this.$VideoWithInstreamVideo6=k;};j.prototype.getCurrentInstreamVideoAdType=function(){'use strict';if(this.$VideoWithInstreamVideo4.isLive){return c('InstreamVideoAdType').LIVE;}else if(this.$VideoWithInstreamVideo4.isBroadcast){return c('InstreamVideoAdType').VOD;}else return c('InstreamVideoAdType').NONLIVE;};j.prototype.getIsAdActive=function(){'use strict';return this.$VideoWithInstreamVideo3&&this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2;};j.prototype.getAdController=function(){'use strict';if(this.getIsAdActive())return this.$VideoWithInstreamVideo3;return null;};j.prototype.$VideoWithInstreamVideo15=function(){'use strict';var k=this.getIsVisibleForAutoplay();if(this.$VideoWithInstreamVideo12!==k){if(this.$VideoWithInstreamVideo3!==this.$VideoWithInstreamVideo2){var l=null,m=this.$VideoWithInstreamVideo3;if(m&&m.getPlaybackDuration()>0)l=c('DateConsts').MS_PER_SEC*(m.getPlaybackDuration()-m.getCurrentTimePosition());this.logMarauderEvent(k?c('CommercialBreakMobileEvent').COMMERCIAL_BREAK_SCROLLED_INTO:c('CommercialBreakMobileEvent').COMMERCIAL_BREAK_SCROLLED_AWAY,{remaining_ad_duration_ms:l});}this.$VideoWithInstreamVideo2.emit(k?'commercialBreak/scrollInto':'commercialBreak/scrollAway');}this.$VideoWithInstreamVideo12=k;};j.prototype.getIsVisibleForAutoplay=function(){'use strict';var k=this.$VideoWithInstreamVideo2.getOption('FeedAutoplay','isVisibleForAutoplay');return k||k===undefined;};j.prototype.getMostRecentAdInfo=function(){'use strict';return this.$VideoWithInstreamVideo14;};j.prototype.logMarauderEvent=function(k){var l=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];'use strict';if(!Object.prototype.hasOwnProperty.call(c('CommercialBreakShouldLogMarauderEvent'),k)||!c('CommercialBreakShouldLogMarauderEvent')[k])return;l.host_video_id=this.$VideoWithInstreamVideo4.hostVideoID;l.instream_video_ad_type=this.getCurrentInstreamVideoAdType();if(!Object.prototype.hasOwnProperty.call(l,'ad_break_index'))l.ad_break_index=this.$VideoWithInstreamVideo5;l.is_sponsored=this.$VideoWithInstreamVideo4.isSponsored;l.is_visible=this.getIsVisibleForAutoplay();l.player_origin=this.$VideoWithInstreamVideo4.playerOrigin;c('MarauderLogger').log(k,'commercial_break',l);};f.exports=j;}),null);