/**
 * 设置Cookie
 */
function setCookie(key,value,expiresday){  
		$.cookie(key,value,{  expires: expiresday, path: '/'}); 
    }
/**
 * 获取Cookie
 */
function getCookie(key){  
	     return $.cookie(key);
    }
/**
 * 删除Cookie
 */
function removeCookie(key){  
		$.cookie(key, null); 
    }
