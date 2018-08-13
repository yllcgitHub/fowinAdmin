(function($) {   
	$.fn.pager = function(options) {
		var opts = $.extend({}, $.fn.pager.defaults, options);  
		return this.each(function() {       // empty out the destination element and then render out the pager with the supplied options    
			$(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));                        // specify correct cursor activity
			$('.module-pagination module-pagination-lg li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto";});  
		});
	};    // render and return the pager with the supplied options
	
	function renderpager(pagenumber, pagecount, buttonClickCallback) {        // setup $pager to hold render     
		var $pager = $('<ul class="module-pagination module-pagination-lg"></ul>');        // add in the previous and next buttons 
		$pager.append(renderButton("<a href='javascript:void(0);'>&laquo;上一页</a>", pagenumber, pagecount, buttonClickCallback));        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases     
//		$pager.append(renderButton("&laquo;上一页", pagenumber, pagecount, buttonClickCallback));  
		var startPoint = 1; 
		var endPoint = 9;
		var thpoint="<li><span>...</span></li>";
		if (pagenumber > 4) {
			startPoint = pagenumber - 4;
			endPoint = pagenumber + 4;
		}
		if (endPoint > pagecount) {
			startPoint = pagecount - 8;
			endPoint = pagecount;
			thpoint = "";
		}
		if (startPoint < 1) {
			startPoint = 1;
		}        // loop thru visible pages and render buttons
		for (var page = startPoint; page <= endPoint; page++) {
			var currentButton = $("<li><a href='javascript:void(0);'>" + (page) + "</a></li>");
			page == pagenumber ? currentButton.addClass('active') : currentButton.click(function() {
				//buttonClickCallback(this.firstChild.data);
				buttonClickCallback(this.firstChild.firstChild.data);
			});
			currentButton.appendTo($pager);
		}        
		// render in the next and last buttons before returning the whole rendered control back.
		$pager.append(thpoint).append(renderButton("<a href='javascript:void(0);'>下一页&raquo;</a>", pagenumber, pagecount, buttonClickCallback));
		return $pager;
	}    


function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {     
	var $Button = $('<li>' + buttonLabel + '</li>');   
	var destPage = 1;        // work out destination page for required button type   
	switch (buttonLabel) {
		case "<a href='javascript:void(0);'>&laquo;上一页</a>":   
			destPage = pagenumber - 1;
			break;
		case "<a href='javascript:void(0);'>下一页&raquo;</a>":
			destPage = pagenumber + 1;          
		break;
	}
	if (buttonLabel == "<a href='javascript:void(0);'>&laquo;上一页</a>") {     
		pagenumber <= 1 ? $Button.addClass('previous') : $Button.click(function() { buttonClickCallback(destPage); });     
	}else {     
		$Button.addClass('next');
		$Button.click(function() { buttonClickCallback(destPage); });
	}     
	return $Button;  
 } 

 $.fn.pager.defaults = {   
	 pagenumber: 1,     
	 pagecount: 1};
 })(jQuery);