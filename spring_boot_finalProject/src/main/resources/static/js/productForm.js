/**
 * 
 */
 
 $(document).ready(function(){
 	
 	const currentUrl = window.location.href;  // 현재 페이지 URL 가져오기
 	const savedUrl = localStorage.getItem('savedUrl');  // 이전에 저장된 URL 가져오기
 	localStorage.setItem('savedUrl', currentUrl); 
 	
 	$('.productUniformViewListRow').on('click', function(){
 		let link = $(this).closest('.productUniformViewListRow').find('.productUniformViewTitleCell a');
 		
 		if(link.length){
 			location.href = link.attr('href');
 		}
 	});
 	
 	//숫자 포멧
 	function formatPrice(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	}
 	
 	$('.productUniformViewPriceCell').each(function(){
 		let price = $(this).text();
 		$(this).text(formatPrice(parseInt(price)));
 	});
 	
 })