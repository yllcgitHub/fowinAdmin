/* 获取当前时间 */
var getCurTime = function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
    return currentdate;
}



function alert_(title) {
	$(".alert").remove();
	var cHtml = "";
	cHtml = "<div class='alert fade'> " + title + "</div>";
	$("body").append(cHtml);
}

function winUrl(index){
	if(index){
		window.location.href = index;
	}
}

/*手机号码验证*/
function reg_phone(num){
	var reg = /^1[0-9]{10}$/;
	if(!reg.test(num)){
		alert_("手机号码格式有误！");
		return false
	}else return true;
}

function closeMask(){
	$("#displayNone").html("");
}

function isShow(on,off){
  $(on).toggle()
  $(off).toggle()
}

/* 修改 */
function modifyInfo(e) {
  var $this = $(e);
  var $input = $this.parents('.inputWrap').find('input');
  var $prev = $this.prev();
  if($this.html() == '修改') {
      $input.css("width","55%")
      $this.html('确定')
      console.log($prev.html())
      $input.val($prev.html())
      $prev.hide()
      return
  } else {
      $input.css("width","0")
      $this.html('修改')
      $prev.html($input.val())
      $prev.show()
      return
  }
}

/*校验字符串str中是否包含字符串substr*/
function isContains(str, substr) {
    return new RegExp(substr).test(str);
}
