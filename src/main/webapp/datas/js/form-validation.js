document.write("<script language=javascript src='libs/cookie/js.cookie.min.js'></script>");
// by xianghongai@gmail.com 2017-8-19 20:41:17
$(document).ready(function() {

    /* 初始验证 */

    // 验证错误信息
    var errorMsg = {
        phone: "请输入正确的手机号",
        sms: "验证码不正确",
        password: "密码由6到20位数字和字母组合",
        name: "名字不正确",
        nickname: "昵称由2到12位中英文数字-_字符组成",
        idcard: "身份证号格式错误"
    };

    // 记录验证是否通过，通过后方可提交，提交后，全重置为false
    var phonePass = false,
        smsPass = false,
        passwordPass = false,
        namePass = false,
        nicknamePass = false,
        idcardPass = false;

    // 推送错误信息
    function ErrorNotify($this, msg) {
        $this.parents(".form-wrapper").find(".form-verify-message").detach();
        return '<span class="form-verify-message has-error"><i class="icon icon-error"></i>' + msg +
            '</span>';
    }

    // 移除错误信息
    function RemoveErrorNotify($this) {
        $this.parents(".form-wrapper").find(".form-verify-message").detach();
    }

    /* 验证规则 */

    // 验证手机号
    function verifyPhone(val) {
        return /^1(3|4|5|7|8)\d{9}$/.test(val);
    }

    // 验证昵称
    function verifyNickName(val) {
        if (val.length < 2) {
            errorMsg.nickname = "昵称太短";
            return false;
        } else if (val.length > 20) {
            errorMsg.nickname = "昵称太长";
            return false;
        } else if (/^\d+$/g.test(val)) {
            errorMsg.nickname = "昵称不能全是数字";
            return false;
        } else if (!/^(?![_\-])(?!.*?[_\-]$)/.test(val)) {
            errorMsg.nickname = "昵称不能以'_'或'-'开头结尾";
            return false;
        } else if (!/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(val)) {
            errorMsg.nickname = "昵称由2到12位中英文数字-_字符组成";
            return false;
        }
        return true;
    }

    // 验证身份证
    function verifyIDCode(code) {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            errorMsg.idcard = "身份证号格式错误";
            return false;
        } else if (!city[code.substr(0, 2)]) {
            errorMsg.idcard = "身份证号地址编码错误";
            return false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length === 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17].toUpperCase()) {
                    errorMsg.idcard = "身份证有误，请检查后重新输入";
                    return false;
                }
            }
        }
        return true;
    }

    // 短信验证码初步校验
    function verifySMS(val) {
        return /^[a-zA-Z0-9]{4,6}$/.test(val);
    }

    // 验证姓名
    function verifyName(val) {
        return /^[a-zA-Z0-9.\u4e00-\u9fa5]{2,20}$/.test(val);
    }

    // 验证密码
    function verifyPassword(val) {
        if (val.length < 6) {
            errorMsg.password = "密码位数太少，至少6位";
            return false;
        } else if (val.length > 20) {
            errorMsg.password = "密码位数太多，最多20位";
            return false;
        } else if (val.search(/\d/) === -1) {
            errorMsg.password = "未包含数字";
            return false;
        } else if (/^\d+$/g.test(val)) {
            errorMsg.password = "密码不能全是数字";
            return false;
        } else if (!/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,20}$/.test(val)) {
            errorMsg.password = "密码由6到20位数字和字母组合";
            return false;
        }
        return true;
    }

    /* 客户端验证 */

    // 验证手机号码
    $(".input-phone").on("blur", function() {
        var $this = $(this);
        var valTemp = $.trim($this.val());
        var $verifyMessage = $(".get-verify-message");
        phonePass = false;
        if (valTemp === "") {
            // 手机号码未输入，获取验证码不可用
            $verifyMessage.addClass("get-verify-message-disabled");
            return;
        } else if (!verifyPhone(valTemp)) {
            // 手机号码未验证通过，获取验证码不可用
            $verifyMessage.addClass("get-verify-message-disabled");
            $this.after(ErrorNotify($this, errorMsg.phone));
            return;
        } else {
            // 验证通过，获取码可用
            $verifyMessage.removeClass("get-verify-message-disabled");
            phonePass = true;
            RemoveErrorNotify($this);
        }
    });

    // 手机号码实时输入触发短信校验
    $(".input-phone").keyup(function() {
        if ($('.get-verify-message').exist()) {
            var $this = $(this);
            var valTemp = $this.val();
            var $verifyMessage = $(".get-verify-message");
            if (valTemp.length === 11 && verifyPhone(valTemp)) {
                $verifyMessage.removeClass("get-verify-message-disabled");
                RemoveErrorNotify($this);
            } else {
                if (!$verifyMessage.hasClass("get-verify-message-disabled")) {
                    $verifyMessage.addClass("get-verify-message-disabled");
                }
            }
        }
    });

    // 短信检验
    $(".input-sms").on("blur", function() {
        var $this = $(this);
        var valTemp = $.trim($this.val());
        smsPass = false;
        // 初步验证
        if (valTemp !== "" && verifySMS(valTemp)) {
            smsPass = true;
            RemoveErrorNotify($this);
        } else if (valTemp !== "") {
            $this.after(ErrorNotify($this, errorMsg.sms));
            return;
        }
        // 后端处理
    });

    // 密码过滤空格
    $(".input-password").on("keydown", function(evt) {
        var keycode = evt.charCode || evt.keyCode;
        if (keycode == 32) {
            evt.keyCode = 0;
            return false;
        }
    });

    // 验证密码
    $(".input-password").on("blur", function() {
        var $this = $(this);
        var valTemp = $this.val();
        passwordPass = false;
        if (valTemp !== "" && verifyPassword(valTemp)) {
            passwordPass = true;
            RemoveErrorNotify($this);
        } else if (valTemp !== "") {
            $this.after(ErrorNotify($this, errorMsg.password));
            return;
        }
    });

    // 验证昵称
    $(".input-nickname").on("blur", function() {
        var $this = $(this);
        var valTemp = $this.val();
        nicknamePass = false;
        if (valTemp !== "" && verifyNickName(valTemp)) {
            nicknamePass = true;
            RemoveErrorNotify($this);
        } else if (valTemp !== "") {
            $this.after(ErrorNotify($this, errorMsg.nickname));
            return;
        }
    });

    // 验证名字
    $(".input-name").on("blur", function() {
        var $this = $(this);
        var valTemp = $this.val();
        namePass = false;
        if (valTemp !== "" && verifyName(valTemp)) {
            namePass = true;
            RemoveErrorNotify($this);
        } else if (valTemp !== "") {
            $this.after(ErrorNotify($this, errorMsg.name));
            return;
        }
    });

    // 验证身份证
    $(".input-idcard").on("blur", function() {
        var $this = $(this);
        var valTemp = $this.val();
        idcardPass = false;
        if (valTemp !== "" && verifyIDCode(valTemp)) {
            idcardPass = true;
            RemoveErrorNotify($this);
        } else if (valTemp !== "") {
            $this.after(ErrorNotify($this, errorMsg.idcard));
            return;
        }
    });

    // 自定义checkbox样式
    $(".icon-checkbox, .label-for-checkbox").on("click", function() {
        var $this = $(this);
        var $checkboxInner = $this.parents(".checkbox-innner");
        var $checkboxItem = $checkboxInner.find(".checkbox");
        var $iCon = $checkboxInner.find(".icon");

        if ($checkboxItem.is(":checked")) {
            $checkboxItem.attr("checked", false);
            $checkboxItem.prop("checked", false);
            $iCon.removeClass("icon-checkbox-checked").addClass("icon-checkbox");
        } else {
            $checkboxItem.attr("checked", true);
            $checkboxItem.prop("checked", true);
            $iCon.removeClass("icon-checkbox").addClass("icon-checkbox-checked");
        }
    });

    // 消除错误提示。错误提示遮盖输入框，表示呵呵哒
    $(".form-wrapper").on("click", ".form-verify-message", function() {
        var $parentWrapper = $(this).parents(".form-wrapper");
        var $input = $parentWrapper.find(".form-input").focus().end().find(".form-verify-message").detach();
        // $(this).find(".form-verify-message").remove();
    });

    /* 用户注册登录找回密码, 根据账户限制找回密码的每天操作次数 */




    // 注册参数验证
    function VerifyPhoneSMS($this) {
        var $parentWrapper = $this.parents(".form-sign");
        var $inputPhone = $parentWrapper.find(".input-phone");
        var $inputSMS = $parentWrapper.find(".input-sms");
        var $inputPassword = $parentWrapper.find(".input-password");

        var valPhone = $.trim($inputPhone.val());
        var valSMS = $.trim($inputSMS.val());
        var valPassword = $inputPassword.val();

        if (!verifyPhone(valPhone)) {
            $inputPhone.after(ErrorNotify($inputPhone, errorMsg.phone));
            return false;
        }

        if (!verifySMS(valSMS)) {


            $inputSMS.after(ErrorNotify($inputSMS, errorMsg.sms));
            return false;
        }

        if (!verifyPassword(valPassword)) {
            $inputPassword.after(ErrorNotify($inputPassword, errorMsg.password));
            return false;
        }

        // 所有条件不满足
        if (!phonePass && !smsPass && !passwordPass) {
            $inputPhone.focus();
            return false;
        }
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'verifyCode': valSMS,
                'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                'userMobile': valPhone,
                'loginOpenId': '',
                'password': valPassword,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'apiKey': 'api_post_saveUserRegistered',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {

                if (data.returnCode == 1) {
                    //保存用户信息到缓存
                    //alert(data.returnData.userMobile);
                    saveLocalCookieUserId(data.returnData.userId, data.returnData.userMobile, data.returnData.userName, data.returnData.cardStatusDic);
                    // 注册成功，提示实名认证
                    XModal("680px", "#J_ModalSignUpVerify");
                    return false;
                } else {
                    XModal("550px", "#J_ModalSignupError");
                    return false;
                }
            }
        })
    }

    // 注册
    $(".btn-signup").on("click", function() {
        if (VerifyPhoneSMS($(this))) {
            // 模拟成功操作,
            // 完善信息: #J_ModalSignUpVerify
            // 成功: #J_ModalSignupSuccess
            // 失败: #J_ModalSignupError
            // 注册成功，提示实名认证
            // 注册操作
            // XModal("680px", "#J_ModalSignUpVerify");
            //return false;
        } else {
            return false;
        }
    });

    function updateUserInfo(valNickName, valName, valIDCard) {


        // 所有条件不满足
        if (!nicknamePass && !namePass && !idcardPass) {
            $inputNickName.focus();
            return false;
        }

        if (!verifyNickName(valNickName)) {
            $inputNickName.after(ErrorNotify($inputNickName, errorMsg.nickname));
            return false;
        }

        if (!verifyName(valName)) {
            $inputName.after(ErrorNotify($inputName, errorMsg.name));
            return false;
        }

        if (!verifyIDCode(valIDCard)) {
            $inputIDCard.after(ErrorNotify($inputIDCard, errorMsg.idcard));
            return false;
        }
        // 后台验证实名认证
        var userId = getLocalCookieUserId();
        // 实名认证
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'userMobile': '',
                'verifyCode': '',
                'realName': valName,
                'idCard': valIDCard,
                'userId': userId,
                'userName': valNickName,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'userBirth': '',
                'userIcon': '',
                'userSexDic': '',
                'apiKey': 'api_post_updateUserInfo',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '40000') {
                    // 验证通过, 打开模态框
                    layer.close(layer.index);
                    XModal("680px", "#J_ModalSignupSuccess");
                } else {
                    XModal("550px", "#J_ModalIdentityVerifyError");
                    //$("#J_ModalSigninSuccess").append('');
                }
            }
        })
    }

    // 注册完成时，完善信息
    $(".btn-signin-verify").on("click", function() {
        var $this = $(this);
        var $parentWrapper = $this.parents(".form-sign");
        var $inputNickName = $parentWrapper.find(".input-nickname");
        var $inputName = $parentWrapper.find(".input-name");
        var $inputIDCard = $parentWrapper.find(".input-idcard");

        var valNickName = $.trim($inputNickName.val());
        var valName = $.trim($inputName.val());
        var valIDCard = $.trim($inputIDCard.val());
        if (updateUserInfo(valNickName, valName, valIDCard)) {
            // 模拟成功操作,
            // 完善信息: #J_ModalSignUpVerify
            // 成功: #J_ModalSignupSuccess
            // 失败: #J_ModalSignupError
            // 注册成功，提示实名认证
            // 注册操作
            // XModal("680px", "#J_ModalSignUpVerify");
            //return false;

        }
        // 验证通过, 打开模态框
        layer.close(layer.index);
        XModal("550px", "#J_ModalSignupSuccess");
        window.location.href = 'index.html';
        return false;

    });
    //找回密码参数验证
    function PasswordSMS($this) {
        var $parentWrapper = $this.parents(".form-sign");
        var $inputPhone = $parentWrapper.find(".input-phone");
        var $inputSMS = $parentWrapper.find(".input-sms");
        var $inputPassword = $parentWrapper.find(".input-password");

        var valPhone = $.trim($inputPhone.val());
        var valSMS = $.trim($inputSMS.val());
        var valPassword = $inputPassword.val();


        if (!verifyPhone(valPhone)) {
            $inputPhone.after(ErrorNotify($inputPhone, errorMsg.phone));
            return false;
        }

        if (!verifySMS(valSMS)) {
            $inputSMS.after(ErrorNotify($inputSMS, errorMsg.sms));
            return false;
        }

        if (!verifyPassword(valPassword)) {
            $inputPassword.after(ErrorNotify($inputPassword, errorMsg.password));
            return false;
        }

        // 所有条件不满足
        if (!phonePass && !smsPass && !passwordPass) {
            $inputPhone.focus();
            return false;
        }
        var userId = getLocalCookieUserId();
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'verifyCode': valSMS,
                'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                'userMobile': valPhone,
                'userId': userId,
                'newPassword': valPassword,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'apiKey': 'api_post_updateUserPassword',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {

                if (data.returnCode == "1") {
                	XModalExtra("550px", "#J_ModalRecoverPasswordSuccess");
                    return false;
                } else {
                    XModal("550px", "#J_ModalResetPasswordError");
                    return false;
                }
            }
        })
        return true;
    }
    // 找回密码
    $(".btn-recover-password").on("click", function(e) {
        if (PasswordSMS($(this))) {
            //layer.close(layer.index);
        	//XModalExtra("550px", "#J_ModalRecoverPasswordSuccess");
            //window.location.href = 'signin.html';
            return false;
        } else {
            return false;
        }



        // 成功: #J_ModalResetPasswordSuccess
        // 失败: #J_ModalResetPasswordError


        $inputSMS.val("");
        $inputPassword.val("");



    });

    $("#J_ModalRecoverPasswordSuccess .J_ModalDismiss").on("click", function() {
        // 重新回到登录界面
        window.location.href = 'signin.html';
    });

    // 密码登录
    $(".btn-signin").on("click", function() {

        var $parentWrapper = $(this).parents(".form-sign");
        var $inputPhone = $parentWrapper.find(".input-phone");
        var $inputPassword = $parentWrapper.find(".input-password");

        var valPhone = $.trim($inputPhone.val());
        var valPassword = $inputPassword.val();

        if (!verifyPhone(valPhone)) {
            $inputPhone.after(ErrorNotify($inputPhone, errorMsg.phone));
            return false;
        }

        if (!verifyPassword(valPassword)) {
            $inputPassword.after(ErrorNotify($inputPassword, errorMsg.password));
            return false;
        }

        // 所有条件不满足
        if (!phonePass && !passwordPass) {
            $inputPhone.focus();
            return false;
        }
        // 登录操作
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'verifyCode': '',
                'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                'userMobile': valPhone,
                'loginOpenId': '',
                'password': valPassword,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'apiKey': 'api_post_postUserLogin',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '40000') {
                    //$("#J_ModalSigninSuccess").append('<div class="xmodal-dialog" role="document"><div class="xmodal-content"><div class="xmodal-header"><button type="button" class="xclose J_ModalDismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="xmodal-body"><i class="icon icon-tips icon-success-lg"></i><h3 class="tips-text">登录成功</h3></div></div></div>');
                    //保存用户ID到
                    saveLocalCookieUserId(data.returnData.userId, data.returnData.userMobile, data.returnData.userName, data.returnData.cardStatusDic);
                    XModal("550px", "#J_ModalSigninSuccess");
                    // 回到首页
                    window.location.href = 'index.html';
                } else {
                    XModal("550px", "#J_ModalSigninError");
                }
            }
        })
        return false;
    });

    // 手机登录
    $(".btn-signin-phone").on("click", function(e) {
        var $parentWrapper = $(this).parents(".form-sign");
        var $inputPhone = $parentWrapper.find(".input-phone");
        var $inputSMS = $parentWrapper.find(".input-sms");

        var valPhone = $.trim($inputPhone.val());
        var valSMS = $.trim($inputSMS.val());

        if (!verifyPhone(valPhone)) {
            $inputPhone.after(ErrorNotify($inputPhone, errorMsg.phone));
            return false;
        }

        if (!verifySMS(valSMS)) {
            $inputSMS.after(ErrorNotify($inputSMS, errorMsg.sms));
            return false;
        }
        // 所有条件不满足
        if (!phonePass && !smsPass) {
            $inputPhone.focus();
            return false;
        }
        // 登录操作
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'verifyCode': valSMS,
                'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                'userMobile': valPhone,
                'loginOpenId': '',
                'password': '',
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'apiKey': 'api_post_postUserLogin',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '40000') {
                    //$("#J_ModalSigninSuccess").append('<div class="xmodal-dialog" role="document"><div class="xmodal-content"><div class="xmodal-header"><button type="button" class="xclose J_ModalDismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="xmodal-body"><i class="icon icon-tips icon-success-lg"></i><h3 class="tips-text">登录成功</h3></div></div></div>');
                    //保存用户ID到
                    saveLocalCookieUserId(data.returnData.userId, data.returnData.userMobile, data.returnData.userName, data.returnData.cardStatusDic);
                    XModal("550px", "#J_ModalSigninSuccess");
                    // 回到首页
                    window.location.href = 'index.html';
                } else {
                    XModal("550px", "#J_ModalSigninError");
                    //$("#J_ModalSigninSuccess").append('');
                }
            }
        })
        return false;
    });

    /* 用户中心, 根据账户限制找回密码、设置手机号、昵称的每天操作次数 */

    // 模态框
    function XModal(modalWidth, modalID) {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shade: 0.8,
            shadeClose: true,
            area: modalWidth,
            content: $(modalID)
        });
    }

    function XModalExtra(modalWidth, modalID) {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shade: 0.8,
            shadeClose: true,
            area: modalWidth,
            content: $(modalID),
            end: function(index, layero) {
                layer.close(index);
                window.location.href = 'signin.html';
                return false;
            }
        });
    }

    // 修改基本信息
    $(".J_EditUserInfo").on("click", function() {
        // 显示相关编辑框、提交操作层
        var $this = $(this);
        var $formWrapper = $this.parents(".form-wrapper");
        $formWrapper.find(".form-input").removeClass("hidden").focusin();
        $formWrapper.find(".form-operate").removeClass("hidden");
        if ($this.hasClass("icon-edit-phone")) {
            $(".J_UserInfoSMS").removeClass("hidden");
        }
    });

    // 取消基本信息修改操作
    function UserInfoCancelOperate($this) {
        var $formWrapper = $this.parents(".form-wrapper");
        $formWrapper.find(".form-input").addClass("hidden").focusout();
        $formWrapper.find(".form-operate").addClass("hidden");
        $formWrapper.find(".form-verify-message").detach();
        if ($this.hasClass("cancel-operate-phone") || $this.hasClass("J_UserInfoSavePhone")) {
            $(".J_UserInfoSMS").addClass("hidden");
        }
    }

    $(".J_UserInfoCancelOperate").on("click", function() {
        UserInfoCancelOperate($(this));
    });

    // 基本信息修改成功
    // 直接修改手机号非常危险，如用户登录未退出，用户离开计算机，其他人操作，直接更换手机号，要考虑加入登录密码验证，不要密保问题原先手机(停机)短信验证。
    $(".J_UserInfoSavePhone").on("click", function() {
        var $this = $(this);
        var $parentWrapper = $this.parents(".module-user-info");
        var $inputPhone = $parentWrapper.find(".input-phone");
        var $inputSMS = $parentWrapper.find(".input-sms");

        var valPhone = $.trim($inputPhone.val());
        var valSMS = $.trim($inputSMS.val());

        if (!verifyPhone(valPhone)) {
            $inputPhone.after(ErrorNotify($inputPhone, errorMsg.phone));
            return false;
        }

        if (!verifySMS(valSMS)) {
            $inputSMS.after(ErrorNotify($inputSMS, errorMsg.sms));
            return false;
        }
        // 所有条件不满足
        if (!phonePass && !smsPass) {
            $inputPhone.focus();
            return false;
        }
        // 后台验证实名认证
        var userId = getLocalCookieUserId();
        var userName = getLocalCookieUserName();
        // 实名认证
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'userMobile': valPhone,
                'verifyCode': valSMS,
                'realName': '',
                'idCard': '',
                'userId': userId,
                'userName': '',
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'userBirth': '',
                'userIcon': '',
                'userSexDic': '',
                'apiKey': 'api_post_updateUserInfo',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '40000') {
                    saveLocalCookieUserId(userId, valPhone, userName, cardStatusDic);
                    // 验证通过, 打开模态框
                    layer.close(layer.index);
                    // 保存成功，隐藏相关表单
                    UserInfoCancelOperate($this);
                    $(".J_UserInfoPhone").html(valPhone);
                    // 成功: #J_ModalEditSuccess
                    // 失败: #J_ModalEditError
                    XModal("550px", "#J_ModalEditSuccess");
                } else {
                    XModal("550px", "#J_ModalEditError");
                    //$("#J_ModalSigninSuccess").append('');
                }
            }
        })
    });

    $(".J_UserInfoSaveNickname").on("click", function() {
        var $this = $(this);
        var $parentWrapper = $this.parents(".module-user-info");
        var $inputNickName = $parentWrapper.find(".input-nickname");

        var valNickName = $.trim($inputNickName.val());

        if (!verifyNickName(valNickName)) {
            $inputNickName.after(ErrorNotify($inputNickName, errorMsg.nickname));
            return false;
        }
        // 所有条件不满足
        if (!nicknamePass) {
            $inputNickName.focus();
            return false;
        }
        // 后台验证实名认证
        var userId = getLocalCookieUserId();
        // 实名认证
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'userMobile': '',
                'verifyCode': '',
                'realName': '',
                'idCard': '',
                'userId': userId,
                'userName': valNickName,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'userBirth': '',
                'userIcon': '',
                'userSexDic': '',
                'apiKey': 'api_post_updateUserInfo',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '40000') {
                    // 验证通过, 打开模态框
                    layer.close(layer.index);
                    // 保存成功，隐藏相关表单
                    UserInfoCancelOperate($this);
                    $(".J_UserInfoNickName").html(valNickName);
                    // 成功: #J_ModalEditSuccess
                    // 失败: #J_ModalEditError
                    XModal("550px", "#J_ModalEditSuccess");
                } else {
                    XModal("550px", "#J_ModalEditError");
                    //$("#J_ModalSigninSuccess").append('');
                }
            }
        })
    });

    // 实名认证
    var userVerifiedName = "";
    var userVerifiedIDCard = "";

    function UserIdentityVerify() {
        var $inputName = $("#J_UserVerifiedNameInput");
        var $inputIDCard = $("#J_UserVerifiedIDCardInput");

        userVerifiedName = $.trim($inputName.val());
        userVerifiedIDCard = $.trim($inputIDCard.val());

        // 所有条件不满足
        if (!namePass && !idcardPass) {
            $inputName.focus();
            return false;
        }

        if (!verifyName(userVerifiedName)) {
            $inputName.after(ErrorNotify($inputName, errorMsg.name));
            return false;
        }

        if (!verifyIDCode(userVerifiedIDCard)) {
            $inputIDCard.after(ErrorNotify($inputIDCard, errorMsg.idcard));
            return false;
        }
        return true;
    }

    // 实名认证: 提交, 校验, 触发确认模态框
    $(".btn-verify").on("click", function() {
        if (UserIdentityVerify()) {
            // 验证通过, 打开模态框
            XModal("550px", "#J_ModalIdentityVerify");
        }
    });

    // 实名认证: 确认模态框, 提交操作
    $(".J_IdentityVerify").on("click", function() {

        // 模拟展示效果
        // 关闭前一个模态框，打开新的验证结果'成功'或'失败'的模态框
        layer.close(layer.index);

        // 模拟展示成功，打开模态框
        // 成功: #J_ModalIdentityVerifySuccess
        // 失败: #J_ModalIdentityVerifyError
        XModal("550px", "#J_ModalIdentityVerifySuccess");

        $("#J_UserVerifiedName").text(userVerifiedName);
        $("#J_UserVerifiedIDCard").text(userVerifiedIDCard);

        // 销毁实名录入模块
        $(".user-verify").detach();
        // 显示实名已认证模块
        $(".user-verified").removeClass("hidden");

        // 后台验证实名认证
        var userId = getLocalCookieUserId();
        // 实名认证
        $.ajax({
            type: "post",
            async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: urlPath, //请求发送
            data: {
                'realName': userVerifiedName,
                'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                'idCard': userVerifiedIDCard,
                'userId': userId,
                'deviceType': 'DIC_DEVICE_TYPE_1',
                'apiKey': 'api_post_saveUserIdcard',
                contentType: "application/json;charset=utf-8",
                datatype: 'json'
            },
            dataType: "json", //返回数据形式为json
            success: function(data, status) {
                if (data.returnCode == '1') {
                    var userName = getLocalCookieUserName();
                    var valPhone = getLocalCookieUserMobile();
                    saveLocalCookieUserId(userId, valPhone, userName, 'CARD_STATUS_DIC_2');
                    layer.close(layer.index);
                } else {
                    //$("##J_ModalIdentityVerifyError").append('');
                }
            }
        })
    });

    // 修改密码, 限制每天修改密码次数
    $(".btn-change-password").on("click", function() {
        var $this = $(this);
        var $parentWrapper = $this.parents(".module-user-info");
        var $inputSMS = $parentWrapper.find(".input-sms");
        var $inputPassword = $parentWrapper.find(".input-password");

        var valSMS = $.trim($inputSMS.val());
        var valPassword = $inputPassword.val();

        if (!verifySMS(valSMS)) {
            $inputSMS.after(ErrorNotify($inputSMS, errorMsg.sms));
            return;
        }

        if (!verifyPassword(valPassword)) {
            $inputPassword.after(ErrorNotify($inputPassword, errorMsg.password));
            return;
        }

        // 所有条件不满足
        if (!smsPass && !passwordPass) {
            $inputPassword.focus();
            return;
        }
        var userId = getLocalCookieUserId();
        var valPhone = getLocalCookieUserMobile();
        $.ajax({
                type: "post",
                async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                url: urlPath, //请求发送
                data: {
                    'verifyCode': valSMS,
                    'loginTypeDic': 'LOGIN_TYPE_DIC_0',
                    'userMobile': valPhone,
                    'userId': userId,
                    'newPassword': valPassword,
                    'deviceType': 'DIC_DEVICE_TYPE_1',
                    'apiKey': 'api_post_updateUserPassword',
                    contentType: "application/json;charset=utf-8",
                    datatype: 'json'
                },
                dataType: "json", //返回数据形式为json
                success: function(data, status) {

                    if (data.returnCode == "1") {
                        //清楚用户缓存信息
                        removeLocalCookieUserId();
                        //密码修改成功
                        XModalExtra("550px", "#J_ModalResetPasswordSuccess");
                        //window.location.href = 'signin.html';
                        return false;
                    } else {
                        XModal("550px", "#J_ModalResetPasswordError");
                        return false;
                    }
                }
            })
            // 成功: #J_ModalResetPasswordSuccess
            // 失败: #J_ModalResetPasswordError


        $inputSMS.val("");
        $inputPassword.val("");

    });

    // 关闭模态框
    $('.J_ModalDismiss').on("click", function() {
        layer.close(layer.index);
    });



    /* 获取验证码 */

    //开始倒计时
    var CountDownTime;

    function SetCountDownTime(obj) {
        CountDownTime = Cookies.get('GetSMSCountDownTime');
        obj.addClass("get-verify-message-disabled");

        if (CountDownTime < 1) {
            obj.removeClass("get-verify-message-disabled");
            obj.html("获取验证码");
            return;
        } else {
            obj.html("重新发送(" + CountDownTime + ")");
            CountDownTime--;
            Cookies.set('GetSMSCountDownTime', CountDownTime, {
                expires: CountDownTime + 1
            });
        }
        setTimeout(function() {
                SetCountDownTime(obj)
            }, 1000) //每1000毫秒执行一次
    }

    //发送验证码
    function SendSMS(obj, valPhone) {
        // 手机号验证通过才能操作
        if (phonePass) {
            // 获取服务器端
            $.ajax({
                type: "post",
                async: false, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                url: urlPath, //请求发送
                data: {
                    'phone': valPhone,
                    'deviceType': 'DIC_DEVICE_TYPE_1',
                    'apiKey': 'api_post_sendMessage',
                    contentType: "application/json;charset=utf-8",
                    datatype: 'json'
                },
                dataType: "json", //返回数据形式为json
                success: function(data, status) {
                    /*                    Cookies.set('GetSMSCountDownTime', 0, {
                                            expires: 0
                                        });*/
                }
            });
            //添加cookie记录,有效时间60s
            Cookies.set('GetSMSCountDownTime', 60, {
                expires: 60
            });
            SetCountDownTime(obj); //开始倒计时
        }
    }

    // 进入页面如果前一次获取短信验证未操作完这里继续操作
    var initCountDownTime = Cookies.get("GetSMSCountDownTime"); //获取cookie值
    initCountDownTime = initCountDownTime ? initCountDownTime : 0;
    if (initCountDownTime > 0) {
        SetCountDownTime($(".J_GetVerifyMessage")); //开始倒计时
    } else {
        Cookies.set('GetSMSCountDownTime', 0, {
            expires: 0
        });
    }

    // 登录获取验证码
    $(".J_GetVerifyMessage").on("click", function() {
        var $this = $(this);
        if (!$this.hasClass("get-verify-message-disabled")) {
            var valPhone;
            var $parentWrapper = $this.parents(".form-sign");
            var $inputPhone = $parentWrapper.find(".input-phone");
            var inputPhone = $.trim($inputPhone.val());
            var putPhone = getLocalCookieUserMobile();
            if (putPhone == "null" || putPhone == "undefined" || putPhone == null || putPhone == "") {
                valPhone = inputPhone;
            } else if (inputPhone != putPhone && inputPhone != "") {
                valPhone = inputPhone;
            } else {
                valPhone = putPhone;
                phonePass = true;
            }
            SendSMS($(".J_GetVerifyMessage"), valPhone);
        }
    });
});