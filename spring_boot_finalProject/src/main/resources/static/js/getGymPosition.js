/**
 * 
 */
 
 $(document).ready(function() {
 	$('#memAddress2').on('focus', function(){
 		let memAddress = $('#memAddress1').val();
 		
 		getPosition(memAddress);
 		
 	});
 	
 	function getPosition(mapAddress){
    	//console.log(mapAddress);
	    naver.maps.Service.geocode({ address: mapAddress }, function(status, response) {
		    if (status === naver.maps.Service.Status.ERROR) {
		        return alert('Something wrong!');
		    }
	
	    	// 성공 시의 response 처리
	    	//alert('0' + response.result.userquery);
    		//alert('1' + response.result.items[0].address);
    		//alert('2' + ﻿response.v2.addresses[0].jibunAddress)
    		let pointX = response.result.items[0].point.x;
		    let pointY = response.result.items[0].point.y;
		    //alert('﻿경도: ' + response.result.items[0].point.x + ', 위도: ' +response.result.items[0].point.y);
		    
		    $('#pointX').val(pointX);
		    $('#pointY').val(pointY);
		    console.log($('#pointX').val());
		    console.log($('#pointY').val());
		});
	}
 })
 