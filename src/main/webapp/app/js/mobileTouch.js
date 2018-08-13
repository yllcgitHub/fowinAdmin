function mobileTouch(id, curImg) {
  /* 拖动的容器 */
  var oGame =  document.getElementById(id);
  var childrenA = oGame.getElementsByTagName('a')
  var showImg = document.getElementById(curImg);
  var endX,endY,startX,startY,cur,dataUrl,dataId;
  /* 最大宽度 */
  var oDivWidth = childrenA[0].offsetWidth * (childrenA.length);
  oGame.style.width = oDivWidth  + 'px';
  var halfWidth = childrenA[0].offsetWidth + 10;
  var middle = Math.ceil(childrenA.length/2) - 1;
  /* 设置默认 选中项 */
  for(let m = 0; m < childrenA.length; m++) {
    if (!childrenA[m].id) {
      cur = middle;
      childrenA[cur].id = 'curActive';
      dataUrl = childrenA[cur].dataset.url;
      showImg.src = dataUrl;
    }
  }
  /* 设置定位  */
  function positonDiv() {
    for (var i = 0; i < childrenA.length; i++) {
      if (childrenA[i].id == 'curActive') {
          childrenA[i].id = ' '
          if (endX > startX) {
            oGame.style.left = oGame.offsetLeft + halfWidth + 'px';
            cur = i - 1
          } else {
            oGame.style.left = oGame.offsetLeft - halfWidth + 'px';
            cur = i + 1
          }
      }
    }
  }
  function touch(event) {
    var event = event || window.event;
    switch(event.type) {
      case "touchstart":
        startX = event.touches[0].clientX;
        break;
      case "touchend":
        endX = event.changedTouches[0].clientX;
        if (oGame.offsetLeft <= oDivWidth/2 && oGame.offsetLeft >= (-oDivWidth/2)) {
          positonDiv()
        }
        if (oGame.offsetLeft < (-oDivWidth/2)) {
          oGame.style.left = -oDivWidth/2 + 'px';
          cur = childrenA.length-1;
        }
        if (oGame.offsetLeft > oDivWidth/2) {
          oGame.style.left = oDivWidth/2 + 'px';
          cur = 0;
        }
        cur > 0 ? cur : cur = 0;
        cur > (childrenA.length - 1) ? cur = childrenA.length - 1 : cur;
        childrenA[cur].id = 'curActive';
        dataUrl = childrenA[cur].dataset.url;
        showImg.src = dataUrl;
        break;
      case "touchmove":
        event.preventDefault();
        break;
    }
  }
  /* 监听 */
  oGame.addEventListener('touchstart',touch,false);
  oGame.addEventListener('touchmove',touch,false);
  oGame.addEventListener('touchend',touch,false);
}