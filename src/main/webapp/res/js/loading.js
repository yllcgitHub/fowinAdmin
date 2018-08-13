/** 加载js */
function show_loading_layer(des) {
	return layer.msg(des, {
		icon : 16,
		shade : [ 0.5, '#AAAAAA' ],
		scrollbar : false,
		time : 100000,
		zIndex : 20110102,
	});
}
function close_loading_layer(index) {
	layer.close(index);
}