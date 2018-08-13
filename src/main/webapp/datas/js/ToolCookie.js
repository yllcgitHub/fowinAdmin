/**
 * 设置菜单导航缓存 参数:menuId
 */
function saveLocalCookieMenuId(menuId) {
	Cookies.remove('localMenuId'); // 删除 cookie
	Cookies.set('localMenuId', menuId); // 保存Cookie
};
/**
 * 从缓存获取菜单导航
 */
function getLocalCookieMenuId() {
	var localMenuId = Cookies.get('localMenuId');
	return localMenuId;
};

/**
 * 设置用户ID到缓存 参数:userId,userMobile,userName,localCardStatusDic
 */
function saveLocalCookieUserId(userId,userMobile,userName,localCardStatusDic) {
	Cookies.remove('localUserId'); // 删除 cookie
	Cookies.remove('localUserMobile'); // 删除 cookie
	Cookies.remove('localUserName'); // 删除 cookie
	Cookies.remove('localCardStatusDic'); // 删除 cookie


	Cookies.set('localUserId', userId); // 保存Cookie
	Cookies.set('localUserMobile', userMobile); // 保存Cookie
	Cookies.set('localUserName', userName); // 保存Cookie
	Cookies.set('localCardStatusDic', localCardStatusDic); // 保存Cookie
};
/**
 * 设置用户ID到缓存 参数:userId,userMobile,userName,localCardStatusDic
 */
function removeLocalCookieUserId() {

	Cookies.remove('localUserId'); // 删除 cookie
	Cookies.remove('localUserMobile'); // 删除 cookie
	Cookies.remove('localUserName'); // 删除 cookie
	Cookies.remove('localCardStatusDic'); // 删除 cookie
};
/**
 * 从缓存获取用户是否认证flag，不等于'CARD_STATUS_DIC_0'表示为已认证
 */
function getLocalCookieUserVerified() {
	var localCardStatusDic = Cookies.get('localCardStatusDic');
	return localCardStatusDic;
};

/**
 * 从缓存获取用户昵称
 */
function getLocalCookieUserName() {
	var localUserName = Cookies.get('localUserName');
	return localUserName;
};
/**
 * 从缓存获取用户ID
 */
function getLocalCookieUserId() {
	var localUserId = Cookies.get('localUserId');
	return localUserId;
};
/**
 * 从缓存获取用户手机号码
 */
function getLocalCookieUserMobile() {
	var localUserMobile = Cookies.get('localUserMobile');
	return localUserMobile;
};
/**
 * 设置地址id到缓存
 * 参数:areaId
 */
function saveLocalCookieAreaId(areaId){
	Cookies.set('localAreaId', ''); // 删除 cookie
	Cookies.set('localAreaId', areaId); //保存Cookie
};
/**
 * 从缓存获取areaId
 */
function getLocalCookieAreaId(){
 	var localAreaId= Cookies.get('localAreaId');
	return localAreaId;
};

/**
 * 生成游客账号
 */
function saveUserVisitor() {
		$.post(urlPath, {
			'deviceType' : 'DIC_DEVICE_TYPE_1',
			'apiKey' : 'api_post_saveUserVisitor',
			contentType : "application/json;charset=utf-8",
			async: false, 
			datatype : 'json'
		}, function(data, status) {
			if (data.returnCode=="40000") {
				saveLocalCookieUserId(data.returnData.userId,null,null,null);
			} else {
				console.log("API调用出错!");
			}
		});
};
