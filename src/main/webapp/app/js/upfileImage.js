function upfile(filechooser, previewer, index) {
	var filechooser = document.getElementById(filechooser); /* input */
  var previewer = document.getElementById(previewer); /*显示的图片*/
  var showbox = previewer.parentNode;
  var oSpan = showbox.getElementsByClassName('x-close')[index];
  var dataId;
  // 200 KB 对应的字节数
  var maxsize = 200 * 1024;

  filechooser.onchange = function() {
      var files = this.files;
      var file = files[0];
			previewer.style.width = '92px';
			previewer.style.height = '92px';
			showbox.style.display = 'inline-block';
			dataId = this.value;
			previewer.setAttribute('data-id', dataId);
			

    // 接受 jpeg, jpg, png 类型的图片
	if (!file) return;
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

    var reader = new FileReader();

    reader.onload = function() {
        var result = this.result;
        var img = new Image();
	
        // 如果图片小于 200kb，不压缩
        if (result.length <= maxsize) {
            toPreviewer(result);
            return;
        }

        img.onload = function() {
            var compressedDataUrl = compress(img, file.type);
            toPreviewer(compressedDataUrl);

            img = null;
        };

        img.src = result;
    };

    reader.readAsDataURL(file);
	
  };

  function toPreviewer(dataUrl) {
    previewer.src = dataUrl;

    // filechooser.value = '';
  }

  function compress(img, fileType) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    var width = img.width;
    var height = img.height;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, width, height);

    // 压缩
    var base64data = canvas.toDataURL(fileType, 0.75);

    var initSize = img.src.length;
    console.log('压缩前：', initSize);
    console.log('压缩后：', base64data.length);
    console.log('压缩率：', 100 * (initSize - base64data.length) / initSize, "%");

    canvas = ctx = null;

    return base64data;
  }
}