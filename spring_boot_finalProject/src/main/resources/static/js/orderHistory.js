/**
 * 
 */
 $(document).ready(function(){
 	//숫자 포멧
 	function formatPrice(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	}
	
	$('.orderItemDetail').each(function(){
		let price = parseInt($(this).find('.orderItemPrice span').text().replace(/,/g,"").replace("원",""));
		let totalprice = parseInt($(this).find('.orderItemTotalPrice span').text().replace(/,/g,"").replace("원",""));
		
		$(this).find('.orderItemPrice span').text(formatPrice(price));
		$(this).find('.orderItemTotalPrice span').text(formatPrice(totalprice));
	});
 });