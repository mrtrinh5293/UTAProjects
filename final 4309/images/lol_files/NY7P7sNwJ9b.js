if (self.CavalryLogger) { CavalryLogger.start_js(["R0Mpn"]); }

__d("MoatNHTSignalTypes",[],(function a(b,c,d,e,f,g){var h=function l(m){return {evaluate:function n(){try{return m();}catch(o){return false;}},getName:function n(){return m.toString();}};},i=function l(m){return {evaluate:function n(){try{return m();}catch(o){return -1;}},getName:function n(){return m.toString();}};},j=10,k=function l(m){return {evaluate:function n(){try{var o=m();return Math.round(+o/j)*j;}catch(p){return -1;}},getName:function n(){return m.toString();}};};f.exports={booleanSignal:h,continuousSignal:i,bucketizedSignal:k};}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Two of the signals Moat wants are whether the 'webdriver-evaluate' and
 * 'webdriver-evauate-response' events were ever fired. Here we just set up
 * listeners for these events and remember if they ever fired. This is not
 * completely reliable as these events may have fired before this module ran.
 *
 * Defining these here rather than in the MoatNHTSignals module to keep that
 * one Moat-only code as much as possible.
 *
 * @providesModule MoatNHTFacebookSpecificSignals
 * @preserve-whitespace
 */__d('MoatNHTFacebookSpecificSignals',['MoatNHTSignalTypes','EventListener'],(function $module_MoatNHTFacebookSpecificSignals(global,require,requireDynamic,requireLazy,module,exports){

var booleanSignal=require('MoatNHTSignalTypes').booleanSignal;


var webdriverEvaluateFired=false;
var webdriverEvaluateResponseFired=false;

require('EventListener').listen(window,'webdriver-evaluate',function(){
webdriverEvaluateFired=true;
});

require('EventListener').listen(window,'webdriver-evaluate-response',function(){
webdriverEvaluateResponseFired=true;
});

var signals=[
booleanSignal(function(){return!!webdriverEvaluateFired;}),
booleanSignal(function(){return!!webdriverEvaluateResponseFired;})];


var MoatNHTFacebookSpecificSignals={
getSignals:function getSignals(){
return signals;
}};


module.exports=MoatNHTFacebookSpecificSignals;}),null);
/**
 * Copyright (c) 2011-2015 Moat Inc.  All Rights Reserved by Moat.
 * Confidential code, methods, and practices herein covered by Moat-Facebook
 * Non-Disclosure Agreement.
 *
 * This module contains proprietary code from Moat.
 *
 * This module implements various signals used for non-human traffic
 * detection by Moat, a third-party ads measurement company. Facebook is
 * partnering with Moat to provide third-party verification of
 * full-view impression logging.
 *
 * Each signal is a JavaScript fragment, provided by Moat. Facebook runs
 * these checks on full view ad impressions and sends Moat the results,
 * which they use to determine if the traffic came from a non-human
 * source (e.g. a bot).
 *
 * This module wraps Moat's JavaScript fragments in a form that can be
 * run on Facebook.
 *
 * @providesModule MoatNHTSignals
 * @preserve-whitespace
 * @nolint
 */__d('MoatNHTSignals',['MoatNHTSignalTypes'],(function $module_MoatNHTSignals(global,require,requireDynamic,requireLazy,module,exports){

var booleanSignal=require('MoatNHTSignalTypes').booleanSignal;
var continuousSignal=require('MoatNHTSignalTypes').continuousSignal;
var bucketizedSignal=require('MoatNHTSignalTypes').bucketizedSignal;




var docElemStyle=
document&&document.documentElement&&document.documentElement.style||
{};

var w=window,
d=w.document,
e=d.documentElement,
g=d.body,
p=w.navigator;








var signals=[

booleanSignal(function(){return!!(window.chrome&&window.chrome.webstore);}),
booleanSignal(function(){return!!document.documentMode;}),
booleanSignal(function(){return!!window.ActiveXObject;}),
booleanSignal(function(){return!!window.chrome;}),
booleanSignal(function(){return!!window.opera;}),
booleanSignal(function(){return!!window.sidebar;}),
booleanSignal(function(){return!+"\v1";}),
booleanSignal(function(){return!window.ActiveXObject;}),
booleanSignal(function(){return"-ms-ime-align"in docElemStyle;}),
booleanSignal(function(){return"-ms-scroll-limit"in docElemStyle;}),
booleanSignal(function(){return"ActiveXObject"in window;}),
booleanSignal(function(){return"MozAppearance"in docElemStyle;}),
booleanSignal(function(){return"_phantom"in window;}),
booleanSignal(function(){return"callPhantom"in window;}),



continuousSignal(function(){return new Date().getTimezoneOffset();}),
continuousSignal(
function(){return Object.prototype.toString.call(window.HTMLElement).
indexOf("Constructor");}),

continuousSignal(function(){return typeof InstallTrigger;}),



bucketizedSignal(
function(){return(w.innerWidth||d.documentElement.clientWidth||g.clientWidth)/(
w.innerHeight||d.documentElement.clientHeight||g.clientHeight);}),

bucketizedSignal(
function(){return(
w.outerWidth||
w.document&&w.document.body&&w.document.body.offsetWidth)/(
w.outerHeight||
w.document&&w.document.body&&w.document.body.offsetHeight);}),


bucketizedSignal(function(){return w.screen.availWidth/w.screen.availHeight;}),
bucketizedSignal(function(){return w.screen.width/w.screen.height;}),
bucketizedSignal(function(){return w.screenX||w.screenLeft||w.screenX;}),
bucketizedSignal(function(){return w.screenY||w.screenTop||w.screenY;})];


var MoatNHTSignals={
getSignals:function getSignals(){
return signals;
}};


module.exports=MoatNHTSignals;}),null);
__d('MoatNHTDetection',['Banzai','MoatNHTFacebookSpecificSignals','MoatNHTSignals','URI'],(function a(b,c,d,e,f,g){var h=(c('MoatNHTSignals').getSignals()||[]).concat(c('MoatNHTFacebookSpecificSignals').getSignals()||[]),i=0,j=function l(){var m={};h.forEach(function(n){m[n.getName()]=n.evaluate();});return m;},k={evaluateAndLogSignals:function l(m){var n=j(),o={token:m,results:n};c('Banzai').post('xtrackable:moat_nht',o);i;}};f.exports=k;}),null);