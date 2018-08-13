//自定义验证规则
form.verify({
	fontLength : function(value) {
		if (value.trim() == "") {
			return '必填项不能为空';
		}
		if (value.trim().length > 40) {
			return '不能大于40个字符';
		}
	},
	fontLengthThreeHundred : function(value) {

		if (value.length > 300) {
			return '不能大于300个字符';
		}
	},
	requiredVideo : function(value) {
		//value为1说明是修改标识 第一次进入存在修改标识不验证
		if (value == "" && value != 1) {
			return '请上传视频';
		}
	},
	requiredAudio : function(value) {
		if (value == "" && value != 1) {
			return '请上传音频';
		}
	},
	requiredEbook : function(value) {
		if (value == "" && value != 1) {
			return '请上传书刊';
		}
	},
	requiredImage : function(value) {
		if (value == "" && value != 1) {
			return '请上传图片';
		}
	},
	requiredPoster : function(value) {
		if (value == "" && value != 1) {
			return '请上传海报';
		}
	}, 
	IsIntegerPositive: function(value) {
		var regex = /^[0-9]*[1-9][0-9]*$/;
		if(!value.match(regex)) {
			return "请输入正整数！";
		}
	},
	IsNumber: function(value) {
		var regex = /^-?\d+$|^(-?\d+)(\.\d+)?$/;
		if(!value.match(regex)) {
			return "请输入正数，保留两位小数！";
		}
	},
	//身份证
	checkIdCard : function (value) {
		var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
	    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
	    if (!value.match(isIDCard1) && !value.match(isIDCard2)) {
	    	return "身份证号码格式不对";
	    }
	},
	requiredCode : function(value) {
		if (value == "" && value != 1) {
			return '请上传二维码';
		}
	},
});
