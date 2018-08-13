<meta charset="utf-8">
<base href="${contextPath}/app/">

<link rel="stylesheet" href="${contextPath}/app/css/common.css" />
<link rel="stylesheet" href="${contextPath}/app/css/dataCommon.css" />
<link rel="stylesheet" href="${contextPath}/app/css/gameCenter.css" />
<link rel="stylesheet" href="${contextPath}/app/css/index.css" />
<link rel="stylesheet" href="${contextPath}/app/css/swiper.min.css" />
<link rel="stylesheet" href="${contextPath}/app/css/wrap.css" />
<link rel="stylesheet" href="${contextPath}/app/css/dropload.css" />
<link rel="stylesheet" href="${contextPath}/app/css/mybankcard.css" />
<link rel="stylesheet" href="${contextPath}/app/touchTouch/touchTouch.css" />
<link rel="stylesheet" href="${contextPath}/app/css/newsList.css" />

<script type="text/javascript" src="${contextPath}/app/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/common.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/date.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/iscroll.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/mobileTouch.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/swiper.min.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/thinks_md5.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/thinks_base64.js"></script>
<script type="text/javascript" src="${contextPath}/app/js/pageList.js"></script>
<script type="text/javascript" src="${contextPath}/app/touchTouch/touchTouch.jquery.js"></script>


<script type="text/javascript">
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}    

function tran(id)
{
var v, j, sj, rv = "";
id = id +"";
v = id.replace(/,/g,"").split(".");
j = v[0].length % 3;
sj = v[0].substr(j).toString();
for (var i = 0; i < sj.length; i++)
{
rv = (i % 3 == 0) ? rv + "," + sj.substr(i, 1): rv + sj.substr(i, 1);
}
var rvalue = (v[1] == undefined) ? v[0].substr(0, j) + rv: v[0].substr(0, j) + rv + "." + v[1];
if (rvalue.charCodeAt(0) == 44)
{
rvalue = rvalue.substr(1);
}
id = rvalue.replace("-,","-");
if(id==''){
id='0';
}
return id;
}

$(document).ready(function(){
	
	var lantai_amount = $(".lantai_amount");
	lantai_amount.each(function(index,elm){
		var s = tran($(elm).html())
		$(elm).html(s);
	})
})

</script>