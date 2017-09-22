if (self.CavalryLogger) { CavalryLogger.start_js(["Z0rv8"]); }

__d('rayInterceptsBox',['invariant'],(function a(b,c,d,e,f,g,h){function i(k,l){var m=Object.keys(k);l.forEach(function(n){m.indexOf(n)!==-1||h(0);typeof k[n]==='number'||h(0);});}var j={check:function k(l,m){i(l,['minX','maxX','minY','maxY']);i(m,['x','y','dx','dy']);l.maxX>l.minX&&l.maxY>l.minY||h(0);if(m.dx===0&&m.dy===0)return false;if(m.x>=l.minX&&m.x<=l.maxX&&m.y>=l.minY&&m.y<=l.maxY)return true;var n=(l.minX-m.x)/m.dx,o=(l.maxX-m.x)/m.dx,p=(l.minY-m.y)/m.dy,q=(l.maxY-m.y)/m.dy,r=Math.max(Math.min(n,o),Math.min(p,q)),s=Math.min(Math.max(n,o),Math.max(p,q));if(r<0)return false;if(r>s)return false;return true;}};f.exports=j;}),null);
__d('AdsMouseStateStore',['invariant','$','Arbiter','Event','EventEmitter','Run','SubscriptionsHandler','Vector','ge','keyMirror','rayInterceptsBox','throttle'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=30,l=500,m='pagelet_ego_pane',n=c('keyMirror')({STATIONARY:null,INTENT:null,HOVER:null,NO_INTENT:null});function o(event){try{return {x:event.clientX||event.x,y:event.clientY||event.y};}catch(r){var q=Math.random()*1000;return {x:q,y:q};}}i=babelHelpers.inherits(p,c('EventEmitter'));j=i&&i.prototype;function p(){var q=arguments.length<=0||arguments[0]===undefined?m:arguments[0],r=arguments.length<=1||arguments[1]===undefined?l:arguments[1];j.constructor.call(this);this.destroy=function(){if(this.$AdsMouseStateStore8)this.$AdsMouseStateStore8.release();this.removeAllListeners();}.bind(this);this.onPageTransition=function(event){this.$AdsMouseStateStore10();}.bind(this);this.onMouseMove=function(event){this.calculateState(o(event));}.bind(this);this.$AdsMouseStateStore7=q;this.$AdsMouseStateStore10();this.$AdsMouseStateStore8=new (c('SubscriptionsHandler'))().addSubscriptions(c('Event').listen(document,'mousemove',c('throttle')(this.onMouseMove,r)),c('Arbiter').subscribe('page_transition',this.onPageTransition));c('Run').onLeave(this.destroy);}p.prototype.$AdsMouseStateStore10=function(){this.$AdsMouseStateStore1=n.STATIONARY;this.$AdsMouseStateStore2=this.$AdsMouseStateStore3=0;this.$AdsMouseStateStore4=Date.now();this.$AdsMouseStateStore5=this.$AdsMouseStateStore7;this.$AdsMouseStateStore6=Infinity;};p.prototype.getState=function(){return this.$AdsMouseStateStore1;};p.prototype.updateRhcID=function(q){c('$')(q)||h(0);this.$AdsMouseStateStore5=q;};p.prototype.getRhcID=function(){return this.$AdsMouseStateStore5;};p.prototype.__updateMousePos=function(q){this.$AdsMouseStateStore2=q.x;this.$AdsMouseStateStore3=q.y;};p.prototype.isRhcPresent=function(){if(!c('ge')(this.$AdsMouseStateStore5))return false;var q=this.getRhcDimensions();return q.y>0&&q.x>0;};p.prototype.getRhc=function(){return c('$')(this.$AdsMouseStateStore5);};p.prototype.getRhcPosition=function(){return c('Vector').getElementPosition(this.getRhc());};p.prototype.getRhcScreenPos=function(){var q=c('Vector').getScrollPosition(),r=this.getRhcPosition();return {x:r.x-q.x,y:r.y-q.y};};p.prototype.getRhcDimensions=function(){return c('Vector').getElementDimensions(this.getRhc());};p.prototype.getPointToRectSquareDist=function(){return this.$AdsMouseStateStore6;};p.prototype.isPointWithinDist=function(q){var r=this.getPointToRectSquareDist();return r<=q*q;};p.prototype.getRhcBoundingBox=function(){var q=this.getRhcDimensions(),r=this.getRhcScreenPos();return {minX:r.x,maxX:r.x+q.x,minY:r.y,maxY:r.y+q.y};};p.prototype.$AdsMouseStateStore11=function(q){var r=this.getRhcBoundingBox(),s={x:(r.minX+r.maxX)/2,y:(r.minY+r.maxY)/2},t=Math.abs(r.minX-r.maxX),u=Math.abs(r.minY-r.maxY),v=Math.max(Math.abs(q.x-s.x)-t/2,0),w=Math.max(Math.abs(q.y-s.y)-u/2,0);this.$AdsMouseStateStore6=v*v+w*w;};p.prototype.isPosContainedInRhc=function(q){var r=this.getRhcBoundingBox();return q.x>=r.minX&&q.x<=r.maxX&&q.y>=r.minY&&q.y<=r.maxY;};p.prototype.hasMovedMinDistance=function(q){var r=q.x-this.$AdsMouseStateStore2,s=q.y-this.$AdsMouseStateStore3;return r*r+s*s>=k*k;};p.prototype.tooSoon=function(){return Date.now()-this.$AdsMouseStateStore4<l;};p.prototype.$AdsMouseStateStore12=function(){this.$AdsMouseStateStore4=Date.now();};p.prototype.calculateState=function(q){if(this.tooSoon())return;this.$AdsMouseStateStore12();if(!this.isRhcPresent())return;if(this.isPosContainedInRhc(q)){this.transitionToState(n.HOVER);this.$AdsMouseStateStore6=0;this.__updateMousePos(q);this.scheduleCheckup();return;}else if(!this.hasMovedMinDistance(q)){this.transitionToState(n.STATIONARY);return;}this.$AdsMouseStateStore11(q);var r=this.isMovingTowardsRhc(q)?n.INTENT:n.NO_INTENT;this.transitionToState(r);this.__updateMousePos(q);this.scheduleCheckup();};p.prototype.isMovingTowardsRhc=function(q){var r={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3};if(this.isPosContainedInRhc(r))return true;var s=this.getRhcBoundingBox(),t={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3,dx:q.x-this.$AdsMouseStateStore2,dy:q.y-this.$AdsMouseStateStore3};return c('rayInterceptsBox').check(s,t);};p.prototype.scheduleCheckup=function(){var q={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3};setTimeout(function(){this.calculateState(q);}.bind(this),l*1.5);};p.prototype.transitionToState=function(q){if(q===this.$AdsMouseStateStore1)return;this.$AdsMouseStateStore1=q;this.emit('change');};p.get=function(){if(!p.$AdsMouseStateStore13)p.$AdsMouseStateStore13=new p();return p.$AdsMouseStateStore13;};p.STATES=n;p.MIN_MOVE_DISTANCE=k;p.THROTTLE_TIME=l;f.exports=p;}),null);
__d('AdsPagerConstants',['keyMirror'],(function a(b,c,d,e,f,g){var h=c('keyMirror')({ADD_PAGE:null,PAGE_TRANSITION:null,REQUEST_PAGE:null}),i=c('keyMirror')({VIEW_ACTION:null,SERVER_ACTION:null});f.exports={ActionTypes:h,PayloadSources:i};}),null);
__d('AdsPagerDispatcher',['AdsPagerConstants','Dispatcher_DEPRECATED'],(function a(b,c,d,e,f,g){'use strict';var h=c('AdsPagerConstants').PayloadSources;function i(k){return function(l){this.dispatch({payloadSource:k,action:l});};}var j=Object.assign(new (c('Dispatcher_DEPRECATED'))(),{handleUpdateFromViewAction:i(h.VIEW_ACTION),handleUpdateFromServerAction:i(h.SERVER_ACTION)});f.exports=j;}),null);
__d('AdsRefreshHandler',['csx','AdsMouseStateStore','AdsPagerConstants','AdsPagerDispatcher','Animation','Arbiter','DataAttributeUtils','DOM','Event','SubscriptionsHandler','Toggler','UIPagelet','cxodecode','debounceAcrossTransitions','getOrCreateDOMID'],(function a(b,c,d,e,f,g,h){var i=c('AdsMouseStateStore').STATES,j=600,k=c('AdsMouseStateStore').get(),l=void 0;function m(n,o,p){'use strict';if(!p.data||!p.pid)return;if(o.nonce)l=c('cxodecode')(o.nonce);this.$AdsRefreshHandler1=n;this.$AdsRefreshHandler2=Date.now();this.$AdsRefreshHandler3=o;this.$AdsRefreshHandler4=p;this.$AdsRefreshHandler5=0;this.$AdsRefreshHandler6=false;this.$AdsRefreshHandler7=true;this.$AdsRefreshHandler8=null;this.$AdsRefreshHandler9=c('debounceAcrossTransitions')(this.reloadAdsIfNeeded.bind(this),this.$AdsRefreshHandler3.delay);this.$AdsRefreshHandler10=new (c('SubscriptionsHandler'))();this.$AdsRefreshHandler10.addSubscriptions(c('Event').listen(this.$AdsRefreshHandler1,'mouseenter',this.setMouseOver.bind(this,true)),c('Event').listen(this.$AdsRefreshHandler1,'mouseleave',this.setMouseOver.bind(this,false)),k.addListener('change',this.onMouseStateStoreChange.bind(this)),c('Arbiter').subscribe('AdsPreferencesDialog/opened',this.stopRefreshingRHC.bind(this)),c('Arbiter').subscribe('AdsPreferencesDialog/closed',this.startRefreshingRHC.bind(this)),c('Arbiter').subscribe('VideoChannelView/opened',this.stopRefreshingRHC.bind(this)),c('Arbiter').subscribe('VideoChannelView/closed',this.startRefreshingRHC.bind(this)));this.$AdsRefreshHandler11();c('AdsPagerDispatcher').register(this.handlePageDispatch.bind(this));}m.prototype.$AdsRefreshHandler11=function(){'use strict';if(this.$AdsRefreshHandler12)this.$AdsRefreshHandler12.release();this.$AdsRefreshHandler12=new (c('SubscriptionsHandler'))();var n=c('DOM').scry(this.$AdsRefreshHandler1,'.uiToggle');for(var o=0;o<n.length;o++)this.$AdsRefreshHandler12.addSubscriptions(c('Toggler').listen('show',n[o],this.stopRefreshingRHC.bind(this)),c('Toggler').listen('hide',n[o],this.startRefreshingRHC.bind(this)));};m.prototype.handlePageDispatch=function(n){'use strict';var o=n.action||{};if(o.actionType===c('AdsPagerConstants').ActionTypes.REQUEST_PAGE)this.reloadAds();};m.prototype.setMouseOver=function(n){'use strict';this.$AdsRefreshHandler13=n;if(n&&this.$AdsRefreshHandler8!=null){this.$AdsRefreshHandler8.cancel();this.$AdsRefreshHandler8=null;}};m.prototype.subscribeDefaultEventsForRefresh=function(){'use strict';this.$AdsRefreshHandler10.addSubscriptions(c('Event').listen(window,'scroll',this.$AdsRefreshHandler9),c('Event').listen(window,'resize',this.$AdsRefreshHandler9));return this;};m.prototype.reloadWithDebounce=function(){'use strict';this.$AdsRefreshHandler9();};m.prototype.reloadWithoutDebounce=function(){'use strict';this.reloadAdsIfNeeded();};m.prototype.stopRefreshingRHC=function(n,o){'use strict';this.$AdsRefreshHandler7=false;};m.prototype.startRefreshingRHC=function(n,o){'use strict';this.$AdsRefreshHandler2=Date.now();this.$AdsRefreshHandler7=true;};m.prototype.forceLoadIfEnoughTimePassed=function(n){'use strict';if(Date.now()-this.$AdsRefreshHandler2>n)this.reloadAds();};m.prototype.containsPremium=function(){'use strict';var n=c('DOM').scry(this.$AdsRefreshHandler1,l||"div._4u8");return !!n.filter(function(o){return JSON.parse(c('DataAttributeUtils').getDataAttribute(o,'data-ad')).segment==='premium';}).length;};m.prototype.reloadAdsIfNeeded=function(){'use strict';if(!this.$AdsRefreshHandler1)return;c('Arbiter').inform('AdsRefreshHandler/CheckingReload');if(this.$AdsRefreshHandler3.stateRefresh){this.reloadAdsIfNeededStateBased();return;}if(this.containsPremium()||this.$AdsRefreshHandler13||!this.$AdsRefreshHandler3.interval)return;if(Date.now()-this.$AdsRefreshHandler2>=this.$AdsRefreshHandler3.interval)this.reloadAds();};m.prototype.reloadAdsIfNeededStateBased=function(){'use strict';if(Date.now()-this.$AdsRefreshHandler2<this.$AdsRefreshHandler3.interval)return;if(this.containsPremium())return;if(!this.$AdsRefreshHandler3.interval)return;this.$AdsRefreshHandler6=true;c('Arbiter').inform('AdsRefreshHandler/RefreshScheduled');this.checkScheduledRefresh();};m.prototype.getRefreshScheduled=function(){'use strict';return this.$AdsRefreshHandler6;};m.prototype.onMouseStateStoreChange=function(){'use strict';this.checkScheduledRefresh();};m.prototype.checkScheduledRefresh=function(){'use strict';if(!this.$AdsRefreshHandler6)return;if(this.$AdsRefreshHandler13)return;var n=k.getState(),o=false;switch(n){case i.HOVER:case i.NO_INTENT:o=true;break;default:break;}if(!o)return;this.$AdsRefreshHandler6=false;this.reloadAds();};m.prototype.reloadAds=function(){'use strict';if(!this.$AdsRefreshHandler1)return;this.$AdsRefreshHandler2=Date.now();if(!this.$AdsRefreshHandler7)return;var n=this.$AdsRefreshHandler4&&this.$AdsRefreshHandler4.data,o=babelHelpers['extends']({},n,{refresh_num:++this.$AdsRefreshHandler5});this.$AdsRefreshHandler8=c('UIPagelet').loadFromEndpoint('WebEgoPane',this.$AdsRefreshHandler1,{dom_id:c('getOrCreateDOMID')(this.$AdsRefreshHandler1),pid:this.$AdsRefreshHandler4.pid,data:o},{bundle:false,handler:this.onLoadHandler.bind(this)});c('Arbiter').inform('AdsRefreshHandler/AdsLoading');};m.prototype.onLoadHandler=function(){'use strict';c('Arbiter').inform('AdsRefreshHandler/AdsLoaded');this.$AdsRefreshHandler8=null;this.$AdsRefreshHandler11();if(!this.$AdsRefreshHandler3.fade)return;new (c('Animation'))(this.$AdsRefreshHandler1).from('opacity',0).to('opacity',1).duration(j).go();};m.prototype.cleanup=function(){'use strict';this.$AdsRefreshHandler1=null;this.$AdsRefreshHandler10.release();this.$AdsRefreshHandler9.reset();};f.exports=m;}),null);
__d('PhotosUploadWaterfallMixin',['PhotosUploadWaterfall','emptyFunction'],(function a(b,c,d,e,f,g){var h=c('emptyFunction'),i={getUploaderApp:h,getWaterfallID:h,getAdditionalData:function j(){return {};},logWaterfallStep:function j(k,l,m){c('PhotosUploadWaterfall').sendSignal(babelHelpers['extends']({qn:this.getWaterfallID(),uploader:this.getUploaderApp(),step:k,ref:this.getWaterfallSource&&this.getWaterfallSource()},this.getAdditionalData(),l),m);},logWaterfallStepUsingBanzai:function j(k,l,m){c('PhotosUploadWaterfall').sendBanzai(babelHelpers['extends']({qn:this.getWaterfallID(),uploader:this.getUploaderApp(),step:k,ref:this.getWaterfallSource&&this.getWaterfallSource()},this.getAdditionalData(),l),m);}};f.exports=i;}),null);
__d('PhotoSourceTypes',['keyMirror'],(function a(b,c,d,e,f,g){f.exports=c('keyMirror')({COMPUTER:null,POSTED_PHOTOS:null,SYNCED_PHOTOS:null,SUGGESTIONS:null,PAGES_POSTED_PHOTOS:null});}),null);
__d('BaseSelectionContainer',[],(function a(b,c,d,e,f,g){var h=0;function i(){'use strict';this.$BaseSelectionContainer1=(h++).toString();}i.prototype.getSelectionContainerID=function(){'use strict';return this.$BaseSelectionContainer1;};i.prototype.getSource=function(){'use strict';throw new Error('This must be implemented by the child class');};i.prototype.getName=function(){'use strict';return null;};i.prototype.getSize=function(){'use strict';return null;};i.prototype.hasPlaceholderUI=function(){'use strict';throw new Error('This must be implemented by the child class');};f.exports=i;}),null);
__d('SelectionSource',['PhotoSourceTypes'],(function a(b,c,d,e,f,g){var h={FILE:'file',FLASH:'flash',VAULT:'vault',SUGGESTIONS:'suggestions',POSTED_PHOTOS:'posted_photos',PAGES_POSTED_PHOTOS:'pages_posted_photos',toPhotoSourceType:function i(j){switch(j){case h.FILE:case h.FLASH:return c('PhotoSourceTypes').COMPUTER;case h.VAULT:return c('PhotoSourceTypes').SYNCED_PHOTOS;case h.SUGGESTIONS:return c('PhotoSourceTypes').SUGGESTIONS;case h.POSTED_PHOTOS:return c('PhotoSourceTypes').POSTED_PHOTOS;case h.PAGES_POSTED_PHOTOS:return c('PhotoSourceTypes').PAGES_POSTED_PHOTOS;default:throw new Error('No mapping for SelectionSource: '+j);}}};f.exports=h;}),null);
__d('FileSelectionContainer',['BaseSelectionContainer','SelectionSource'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('BaseSelectionContainer'));i=h&&h.prototype;function j(k){'use strict';i.constructor.call(this);this.$FileSelectionContainer1=k;}j.prototype.getFile=function(){'use strict';return this.$FileSelectionContainer1;};j.prototype.getSource=function(){'use strict';return c('SelectionSource').FILE;};j.prototype.getName=function(){'use strict';return this.$FileSelectionContainer1.fileName||this.$FileSelectionContainer1.name;};j.prototype.getSize=function(){'use strict';return this.$FileSelectionContainer1.fileSize||this.$FileSelectionContainer1.size;};j.prototype.hasPlaceholderUI=function(){'use strict';return false;};f.exports=j;}),null);
__d('HTML5FilePicker',['cx','ArbiterMixin','BrowserSupport','CSS','DOM','FilePickerEvent','FileSelectionContainer','Keys','Parent','PhotosUploadID','PhotosUploadWaterfall','PhotosUploadWaterfallMixin','PhotosUploadWaterfallXMixin','PUWApplications','PUWSteps','URI','getOrCreateDOMID'],(function a(b,c,d,e,f,g,h){function i(j,k){this._config=babelHelpers['extends']({accept:undefined,multiple:undefined},k);this._button=j;this._beginInformed=false;if(!c('BrowserSupport').hasFileAPI()){this.logStep(c('PUWSteps').CLIENT_PROCESS_UNAVAILABLE,{error:'no_file_api'});if(Object.prototype.hasOwnProperty.call(this._config,'fallbackFunction')){this._config.fallbackFunction.call(this);return;}return;}this._subscriptions=[];var l=this._config.input||c('DOM').create('input',{type:'file',className:"_n",tabindex:'-1'});if(Object.prototype.hasOwnProperty.call(this._config,'accept'))l.accept=this._config.accept;if(Object.prototype.hasOwnProperty.call(this._config,'multiple'))l.multiple=this._config.multiple;if(Object.prototype.hasOwnProperty.call(this._config,'title'))l.title=this._config.title;var m=c('DOM').create('label',{className:'accessible_elem','for':c('getOrCreateDOMID')(l)},l.title),n=c('DOM').create('div',{className:"_3jk"},[m,l]);c('CSS').addClass(this._button,"_m");c('DOM').appendContent(this._button,n);this._button.setAttribute('rel','ignore');this._bindInput(l);this._button.onkeydown=function(event){if(event.keyCode===c('Keys').RETURN){this._input.click();if(event&&event.stopPropagation)event.stopPropagation();}}.bind(this);var o=c('Parent').byClass(this._button,'addPhotosDisabled');if(o){c('CSS').removeClass(o,'addPhotosDisabled');c('CSS').addClass(o,'addPhotosEnabled');}}Object.assign(i.prototype,c('ArbiterMixin'),c('PhotosUploadWaterfallMixin'),c('PhotosUploadWaterfallXMixin'),{getUploaderApp:function j(){return c('PhotosUploadWaterfall').APP_HTML5;},getWaterfallID:function j(){return this._config.qn;},getWaterfallAppName:function j(){return c('PUWApplications').WEB_HTML5;},getWaterfallSource:function j(){return this._config.ref;},getSwfID:function j(){return null;},_constructFileList:function j(){var k=Array.from(this._input.files);k.forEach(function(l){l.uploadID=c('PhotosUploadID').getNewID();});return k;},_constructFileSelectionContainerList:function j(){var k=Array.from(this._input.files);return k.map(function(l){return new (c('FileSelectionContainer'))(l);});},cleanup:function j(){if(this._input){this._input.onclick=null;this._input.onchange=null;}if(this._button)this._button.onkeydown=null;},_bindInput:function j(k){this.cleanup();k.onclick=function(){this.logWaterfallStep(c('PhotosUploadWaterfall').SELECT_START);if(!this._beginInformed){this._beginInformed=true;this.inform(c('FilePickerEvent').BEGIN||'FilePickerEvent/BEGIN');}this.inform(c('FilePickerEvent').SELECT_START);}.bind(this);k.onchange=function(){this.inform(c('FilePickerEvent').SELECTED,{sender:this,files:this._constructFileList(),selections:this._constructFileSelectionContainerList()});this._bindInput(this._input.cloneNode(false));}.bind(this);if(this._input)c('DOM').replace(this._input,k);this._input=k;}});f.exports=i;}),null);