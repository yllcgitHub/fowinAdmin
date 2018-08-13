//OSS环境公共参数,这个accessKey仅有osshanyatemp buckey权限
// temp
accessid = 'LTAIa7vRp7XbA2zw';
accesskey = 'inkrLggFqnOYlkgqFFEfDtd6jKulv2';
host = 'http://osshanyatemp.oss-cn-hangzhou.aliyuncs.com';

// 上传路径
g_picdirname = 'pic/'
g_posterdirname = 'poster/'
g_audiodirname = 'audio/'
g_mediadirname = 'media/'
g_pdfdirname = 'book/'
//最后生成的上传路径
g_object_name = ''
g_cur_time = formatDate(new Date(), "yyyyMMddhhmmss")
now = timestamp = Date.parse(new Date()) / 1000;

//以下是一些设置属性，包括policy的生效时间，上传文件的大小限制，最后生成一个签名，当做参数传至oss进行处理
var policyText = {
	"expiration" : "2020-01-01T12:00:00.000Z", // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
	"conditions" : [ [ "content-length-range", 0, 10485760000 ] // 设置上传文件的大小限制
	]
};
var policyBase64 = Base64.encode(JSON.stringify(policyText));
message = policyBase64;
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
	asBytes : true
});
var signature = Crypto.util.bytesToBase64(bytes);//签名

function random_string(len) {//随机生成字符串
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
	var maxPos = chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get_suffix(filename) {//获取文件后缀
	pos = filename.lastIndexOf('.')
	suffix = ''
	if (pos != -1) {
		suffix = filename.substring(pos)
	}
	return suffix;
}
// 格式化日期
function formatDate(date, format) {
	var paddNum = function(num) {
		num += "";
		return num.replace(/^(\d)$/, "0$1");
	}
	// 指定格式字符
	var cfg = {
		yyyy : date.getFullYear() // 年 : 4位
		,
		yy : date.getFullYear().toString().substring(2)// 年 : 2位
		,
		M : date.getMonth() + 1 // 月 : 如果1位的时候不补0
		,
		MM : paddNum(date.getMonth() + 1) // 月 : 如果1位的时候补0
		,
		d : date.getDate() // 日 : 如果1位的时候不补0
		,
		dd : paddNum(date.getDate())// 日 : 如果1位的时候补0
		,
		hh : date.getHours() // 时
		,
		mm : date.getMinutes() // 分
		,
		ss : date.getSeconds()
	// 秒
	}
	format || (format = "yyyy-MM-dd hh:mm:ss");
	return format.replace(/([a-z])(\1)*/ig, function(m) {
		return cfg[m];
	});
}
// filetype值: 1,图片 2,海报 3,音频 4,视频.......
function calculate_object_name(filename, filetype) {
	suffix = get_suffix(filename)
	if (filetype == '1') {
		g_object_name = g_picdirname + g_cur_time + '_' + random_string(10) + suffix
		/*
		 * var flag=true; var format=".jpg;.png;"; var fileFormat =
		 * format.split(";"); for(i=0;i<fileFormat.length;i++){ if(suffix ==
		 * fileFormat[i].toUpperCase()){ flag=false; } } if(flag){
		 * layer.msg("目前只支持上传"+format+"格式文件"); return false; }else{ return
		 * g_object_name; }
		 */
	} else if (filetype == '2') {
		g_object_name = g_posterdirname + g_cur_time + '_' + random_string(10) + suffix
	} else if (filetype == '3') {
		g_object_name = g_audiodirname + g_cur_time + '_' + random_string(10) + suffix
	} else if (filetype == '4') {
		//g_object_name = g_mediadirname + g_cur_time + '_' + random_string(10) + suffix;
		 if (suffix == ".mp4") {
             g_object_name = g_mediadirname + g_cur_time + '_' + random_string(10) + suffix;
		 } else {
             layer.msg("目前只支持上传.mp4视频文件");
             return false;
		 }
	} else if (filetype == '5') {
		g_object_name = g_pdfdirname + g_cur_time + '_' + random_string(10) + suffix
	}
	return g_object_name;
}

//up为当前上传的实例，filename为文件名，初始时为空，会在每个文件上传前进行重新调用，filetype为自定义的 文件类型
function set_upload_param(up, filename, ret, filetype) {//本例中filetype、ret无作用
//	if (filetype == '1') {
//		g_object_name = g_picdirname;
//	} else if (filetype == '2') {
//		g_object_name = g_posterdirname;
//	} else if (filetype == '3') {
//		g_object_name = g_audiodirname;
//	} else if (filetype == '4') {
//		g_object_name = g_mediadirname;
//	} else if (filetype == '5'){
//		g_object_name = g_pdfdirname;
//	}
	if (filename != '') {
		calculate_object_name(filename, filetype);//这里调用方法来生成g_object_name的值(即上传文件的路径)
	}
	new_multipart_params = {//重新组合参数
		'key' : g_object_name,
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	};

	up.setOption({//设置参数
		'url' : host,
		'multipart_params' : new_multipart_params
	});

	up.start();//开始上传
}

// 上传海报
var posterUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',//上传插件初始化选用那种方式的优先级顺序
	browse_button : 'selectposterfiles',//触发浏览文件按钮标签的唯一id
	container : document.getElementById('postercontainer'),//展现上传文件列表的容器，[默认是body]
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',//flash文件地址
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,//文件上传地址
	multipart_params : {//上传参数值
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {//当前plupload插件的初始化
		PostInit : function() {//阿里云上传插件一些属性的初始化
			document.getElementById('ossposterfile').innerHTML = '';
			document.getElementById('postposterfiles').onclick = function() {
				set_upload_param(posterUploader, '', false, '2');
				return false;
			};
		},

		FilesAdded : function(up, files) {//文件添加时的操作
			$('#imgShow').attr('style', 'display:none');
			$('#ossposterfile').attr('style', 'display:block');
			document.getElementById('ossposterfile').innerHTML='';
			plupload.each(files, function(file) {
				//校验
				document.getElementById('ossposterfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},
		BeforeUpload : function(up, file) {//某个文件上传前触发的操作
			set_upload_param(up, file.name, true, '2');
		},
		UploadProgress : function(up, file) {//上传时进度返回，percent为进度
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {//回调函数
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功, 文件名为:' + g_object_name;
				$('#posterFilePath').val(g_object_name);
				$('#posterImg').attr("src", ossUrl + g_object_name);
				$('#ossposterfile').attr('style', 'display:none');
				$('#imgShow').attr('style', 'display:block');
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {//当发生错误时调用函数
			document.getElementById('posterconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
posterUploader.init();

//上传海报App
var posterUploaderApp = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectposterfilesApp',
	container : document.getElementById('postercontainerApp'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('ossposterfileApp').innerHTML = '';
			document.getElementById('postposterfilesApp').onclick = function() {
				set_upload_param(posterUploaderApp, '', false, '2');
				return false;
			};
		},

		FilesAdded : function(up, files) {
			$('#imgShowApp').attr('style', 'display:none');
			$('#ossposterfileApp').attr('style', 'display:block');
			document.getElementById('ossposterfileApp').innerHTML='';
			plupload.each(files, function(file) {
				//校验
				document.getElementById('ossposterfileApp').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},
		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '2');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功, 文件名为:' + g_object_name;
				$('#posterFilePathApp').val(g_object_name);
				$('#posterImgApp').attr("src", ossUrl + g_object_name);
				$('#ossposterfileApp').attr('style', 'display:none');
				$('#imgShowApp').attr('style', 'display:block');
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('posterconsoleApp').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
posterUploaderApp.init();
// 上传图片
var imageUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectimagefiles',
	container : document.getElementById('imagecontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('ossimagefile').innerHTML = '';
			document.getElementById('postimagefiles').onclick = function() {
				set_upload_param(imageUploader, '', false, '1');
				return false;
			};
		},

		FilesAdded : function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('ossimagefile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},

		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '1');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '图片上传成功, 文件名为:' + g_object_name;
				var oldPath = $('#imageFilePath').val();
				var name = g_object_name;
				var oldPath2 = $('#skimgs').val();
				var newpath = g_object_name;
				if (oldPath == "") {
					$('#imageFilePath').val(newpath);
				} else {
					$('#imageFilePath').val(oldPath + "," + newpath);
				}
				if (oldPath2 == "") {
					$('#skimgs').val(name);
				} else {
					$('#skimgs').val(oldPath2 + "," + name);
				}
				var viewPath = host + '/' + g_object_name;
				addImageToTable(g_object_name, viewPath, '');
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('imageconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
imageUploader.init();

// 上传音频
var audioUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectaudiofiles',
	container : document.getElementById('audiocontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('ossaudiofile').innerHTML = '';
			document.getElementById('postaudiofiles').onclick = function() {
				set_upload_param(audioUploader, '', false, '3');
				return false;
			};
		},

		FilesAdded : function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('ossaudiofile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},

		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '3');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '音频上传成功, 文件名为:' + g_object_name;
				var oldPath = $('#audioFilePath').val();
				var name = g_object_name;
				var oldPath2 = $('#skimgs').val();
				var newpath = g_object_name;
				if (oldPath == "") {
					$('#audioFilePath').val(newpath);
				} else {
					$('#audioFilePath').val(oldPath + "," + newpath);
				}
				if (oldPath2 == "") {
					$('#skimgs').val(name);
				} else {
					$('#skimgs').val(oldPath2 + "," + name);
				}
				var viewPath = host + '/' + g_object_name;
				addAudioToTable(g_object_name, viewPath, '');

			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('audioconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
audioUploader.init();
// 上传视频
var mediaUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectmediafiles',
	container : document.getElementById('mediacontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('ossmediafile').innerHTML = '';
			document.getElementById('postmediafiles').onclick = function() {
				set_upload_param(mediaUploader, '', false, '4');
				return false;
			};
		},

		FilesAdded : function(up, files) {
		plupload.each(files, function(file) {
				document.getElementById('ossmediafile').innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},

		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '4');
		},
		UploadProgress : function(up, file) {
            var videoType = get_suffix(file.name);
            if (videoType == '.mp4') {
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width = 2 * file.percent + 'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            }
		},
		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '视频上传成功, 文件名为:' + g_object_name;
				var oldPath = $('#mediaFilePath').val();
				var name = g_object_name;
				var oldPath2 = $('#skimgs').val();
				var newpath = g_object_name;
				
				if (oldPath == "") {
					$('#mediaFilePath').val(newpath);
				} else {
					$('#mediaFilePath').val(oldPath + "," + newpath);
				}
				if (oldPath2 == "") {
					$('#skimgs').val(name);
				} else {
					$('#skimgs').val(oldPath2 + "," + name);
				}
				var viewPath = host + '/' + g_object_name;
				addMediaToTable(g_object_name, viewPath, '', '');
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('mediaconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
mediaUploader.init();

// 上传pdf
var pdfUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectpdffiles',
	container : document.getElementById('pdfcontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('osspdffile').innerHTML = '';
			document.getElementById('postpdffiles').onclick = function() {
				set_upload_param(pdfUploader, '', false, '5');// TODO
				// 修改目录地址
				return false;
			};
		},

		FilesAdded : function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('osspdffile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},

		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '5');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},
		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功, 文件名为:' + g_object_name;
				var oldPath = $('#pdfFilePath').val();
				var name = g_object_name;
				var oldPath2 = $('#skimgs').val();
				var newpath = g_object_name;
				if (oldPath == "") {
					$('#pdfFilePath').val(newpath);
				} else {
					$('#pdfFilePath').val(oldPath + "," + newpath);
				}
				if (oldPath2 == "") {
					$('#skimgs').val(name);
				} else {
					$('#skimgs').val(oldPath2 + "," + name);
				}
				var viewPath = host + '/' + g_object_name;
				addImageToTable(newpath, viewPath, file.name, "", name)
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('pdfconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
pdfUploader.init();

// 上传二维码
var codeUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectcodefiles',
	container : document.getElementById('codecontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('osscodefile').innerHTML = '';
			document.getElementById('postcodefiles').onclick = function() {
				set_upload_param(codeUploader, '', false, '2');
				return false;
			};
		},

		FilesAdded : function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('osscodefile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},
		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '2');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '二维码上传成功, 文件名为:' + g_object_name;
				$('#codeFilePath').val(g_object_name);
				$('#codeImg').attr("src", ossUrl + g_object_name);
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('codeconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
codeUploader.init();

// 社团管理上传图片（不需要addImageToTable方法）
var _imageUploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : '_selectimagefiles',
	container : document.getElementById('_imagecontainer'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/-2.1.2/js/Moxie.xap',
	url : host,
	multipart_params : {
		'Filename' : '${filename}',
		'key' : '${filename}',
		'policy' : policyBase64,
		'OSSAccessKeyId' : accessid,
		'success_action_status' : '200', // 让服务端返回200,不然，默认会返回204
		'signature' : signature,
	},

	init : {
		PostInit : function() {
			document.getElementById('_ossimagefile').innerHTML = '';
			document.getElementById('_postimagefiles').onclick = function() {
				set_upload_param(_imageUploader, '', false, '1');
				return false;
			};
		},

		FilesAdded : function(up, files) {

			plupload.each(files, function(file) {
				document.getElementById('_ossimagefile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
			});
		},

		BeforeUpload : function(up, file) {
			set_upload_param(up, file.name, true, '1');
		},
		UploadProgress : function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded : function(up, file, info) {
			if (info.status >= 200 || info.status < 200) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '图片上传成功, 文件名为:' + g_object_name;
				var oldPath = $('#_imageFilePath').val();
				var name = g_object_name;
				var oldPath2 = $('#skimgs').val();
				var newpath = g_object_name;
				if (oldPath == "") {
					$('#_imageFilePath').val(newpath);
				} else {
					$('#_imageFilePath').val(oldPath + "," + newpath);
				}
				if (oldPath2 == "") {
					$('#skimgs').val(name);
				} else {
					$('#skimgs').val(oldPath2 + "," + name);
				}
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error : function(up, err) {
			document.getElementById('_imageconsole').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});
_imageUploader.init();