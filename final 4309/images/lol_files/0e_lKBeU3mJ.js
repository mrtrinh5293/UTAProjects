if (self.CavalryLogger) { CavalryLogger.start_js(["EuJc2"]); }

__d('EntstreamAttachmentIssueDiversityShare',['Arbiter','AttachmentIssueDiversityShareConstants','Event','Run','SubscriptionsHandler','ge','onEnclosingPageletDestroy'],(function a(b,c,d,e,f,g){'use strict';function h(k,l,m){var n=new (c('SubscriptionsHandler'))();n.addSubscriptions(c('Event').listen(k,'click',function(){n.release();c('Arbiter').inform(c('AttachmentIssueDiversityShareConstants').ARTICLE_CLICK,{attachment:k,global_share_id:l,is_right_click:false,share_id:m});}));return n;}function i(k,l){var m=new (c('SubscriptionsHandler'))();m.addSubscriptions(c('Event').listen(k,'mousedown',function(event){if(event.isRightClick()){m.release();c('Arbiter').inform(c('AttachmentIssueDiversityShareConstants').ARTICLE_CLICK,{attachment:k,global_share_id:l,is_right_click:true});}}));return m;}var j={loadAttachment:function k(l,m,n){var o=l&&c('ge')(l);if(!o)return;var p=h(o,m,n),q=i(o,m),r=new (c('SubscriptionsHandler'))(),s=function t(){p.release();q.release();r.release();};r.addSubscriptions(c('onEnclosingPageletDestroy')(o,s),c('Run').onLeave(s));}};f.exports=j;}),null);
__d('FbFeedAttachmentRelatedShare',['csx','Arbiter','AttachmentIssueDiversityShareConstants','AttachmentRelatedShareConstants','DOMQuery','Event','tidyEvent'],(function a(b,c,d,e,f,g,h){var i={loadRelatedAttachment:function j(k,l){c('tidyEvent')(c('Event').listen(k,'click',function(){c('Arbiter').inform(c('AttachmentRelatedShareConstants').ARTICLE_CLICK,{attachment:k,global_share_id:l});}));},loadRelatedGameAttachment:function j(k,l){c('tidyEvent')(c('Event').listen(k,'click',function(){c('Arbiter').inform(c('AttachmentRelatedShareConstants').GAME_CLICK,{attachment:k,global_share_id:l});}));},loadRelatedAttachmentForStream:function j(k){this._loadChainableAttachmentForStreamImpl(k,c('AttachmentRelatedShareConstants').ARTICLE_CLICK);},loadIssueDiversityAttachmentForStream:function j(k){this._loadChainableAttachmentForStreamImpl(k,c('AttachmentIssueDiversityShareConstants').ARTICLE_CLICK);},_loadChainableAttachmentForStreamImpl:function j(k,l){var m=function n(event,o){var p=event.getTarget();if(p.getAttribute('target')!=='_blank')return;var q="^div._5pbx",r="^div._5pc9",s=c('DOMQuery').scry(p,q)[0]||c('DOMQuery').scry(p,r)[0];if(!s)return;c('Arbiter').inform(l,{attachment:s,global_share_id:0,link_url:p.getAttribute('href'),is_right_click:o});};c('tidyEvent')(c('Event').listen(k,'click',function(event){m(event,false);}));c('tidyEvent')(c('Event').listen(k,'mousedown',function(event){if(event.which==3||event.button==2)m(event,true);}));}};f.exports=i;}),null);