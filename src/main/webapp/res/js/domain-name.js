// 47.93.188.186:8280
// window.location.host

var dataHost = "47.93.188.186:8280";
var resUrlPathPrefix = "http://culturetv.hanyastar.com.cn/standard/nationalculturecloud";
var cultureMediaUrlPrefix = "http://culturetv.hanyastar.com.cn/standard/mp4/media_1500";


var urlPath;
var homePath;
var apiPath;
$(function(){  
	
	// 正式环境域名
	var prdDomain = "culturedc";
	// 测试环境ip地址
	var testIp = "47.93.188.186";
	
	var host = window.location.host;
	// 线上环境
	if(host.indexOf(prdDomain)>=0) {
		
		urlPath = "http://www.culturedc.cn/api/v1/encrypt";
		homePath = "http://www.culturedc.cn";
		apiPath = "http://api.culturedc.cn/national-culture-cloud-api";
		
	} 
	
	// 测试环境
	else if(host.indexOf(testIp)>=0) {
		
		urlPath = "http://47.93.188.186:8280/national-culture-cloud-h5/api/v1/encrypt";
		homePath = "http://47.93.188.186:8280/national-culture-cloud-h5";
		apiPath = "http://47.93.188.186:8380/national-culture-cloud-api";
		
	} 
	
	// 本地环境
	else {
		
		urlPath = "http://" + window.location.host + "/national-culture-cloud-h5/api/v1/encrypt";
		homePath = "http://" + window.location.host + "/national-culture-cloud-h5";
		apiPath = "http://" + window.location.host + "/national-culture-cloud-api";
		
	} 
	
} );
