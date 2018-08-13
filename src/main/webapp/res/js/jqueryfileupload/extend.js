/**
 * 删除上传的临时文件
 * 删除临时文件的时是否存在临时文件,存在隐藏进度条,启动上传按钮,临时文件名称重置;
 * @param tmpFileName 存放临时文件名的元素id
 * @param progress 进度条元素id
 * @param id  上传组件id
 */
function delTmpFile(tmpFileNameId,progress,id){
	var tmpFileName=$("#"+tmpFileNameId).val();
	if(tmpFileName!=null&&tmpFileName!=""){
	 $("#"+progress).hide();
	 $("#"+id).attr("disabled",false);
	 $("#"+tmpFileNameId).val("");
	 
	 $.post("fileUpload/delTmpFile", 
			 {"tmpFileName":tmpFileName},
			 function(data) {
				 if(data.result==0){
					//layer.msg("删除临时文件异常");
					}
		}); 
	}
}