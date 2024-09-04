/**
 * 
 */
 
 $(document).ready(function(){
    $(".cartItemSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".cartItemSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".cartItemSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".cartItemSubSelect").css("display", "none");
        }
      
    });

    // cartItemSubSelectEach 클릭 시 Placeholder 값 변경
    $(".cartItemSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴
        var placeholder = $(this).closest(".cartItemSelect").find(".cartItemSelectPlaceholder");  // Placeholder를 찾음
        var selectedCtgValue = $(this).closest(".cartItemSelect").find(".cartItemSubSelectEach");
        var prdName = $(this).closest('.cartItem').find('.cartItemName').text();
        
        var currentCartItem = $(this).closest('.cartItem'); // 현재 클릭한 항목이 포함된 .cartItem 요소
        
        var duplicateSizeChk = false;
        $('.cartItem').each(function(){

        	let size = $(this).find('.cartItemSelectPlaceholder').attr("data-value");
        	let name = $(this).find('.cartItemName').text();
        	
        	if(selectedValue === size && prdName === name && !$(this).is(currentCartItem)){

        	 	alert('중복된 사이즈가 있습니다');
        	 	duplicateSizeChk = true;
        	 	return false;
        	}
        });
        
        if (!duplicateSizeChk) {
		    let cartNo = parseInt(currentCartItem.closest('.cartItem').find('.cartNo').attr("data-value"));
		    
		    $.ajax({
	    		type:"post",
	    		url:"/prd/changePrdSize",
	    		data:{"cartNo":cartNo, "prdSize":selectedValue},
	    		success:function(){
	    			 placeholder.html(selectedValue + ' <div class="cartItemDown"></div>');  // Placeholder 값을 업데이트하고 cartItemDown div를 유지
		    		 placeholder.attr("data-value", selectedValue);
	    		}
	    	});
		   
		}
        
        $(this).parent().css("display", "none");  // 드롭다운을 숨김
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".cartItemSelectPlaceholder, .cartItemSubSelect").length) {
            $(".cartItemSubSelect").css("display", "none");
        }
    });
    
    $(".cartItemSelectPlaceholder, .cartItemSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#dddddd",
                "color": "gray"
            });
        })
        .on('mouseleave', function(){
            $(this).css({
                "background-color": "white",
                "color": "#424949"
            });
        }
    );
    
        $(".cartItemSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#f3f3f3",
                "color": "gray"
            });
        })
        .on('mouseleave', function(){
            $(this).css({
                "background-color": "white",
                "color": "#424949"
            });
        }
    );
    
    //가격 및 수량, 사이즈 변경 부분
    
    getTotalPrice();
    
    //숫자 포멧
 	function formatPrice(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	}
    
    //전체가격 및 포멧
    function getTotalPrice(){
    	var totalPrice = 0;
    	$('.cartItem').each(function(){
    		let price = parseInt($(this).find('.cartItemPrice').text().replace(/,/g, "").replace("원",""));
    		let qty = parseInt($(this).find('.quantityNumber').text());
    		let chk = $(this).find('.cartItemCheckbox').is(":checked");
    		
    		if(chk) totalPrice += price * qty;
    		
    		$(this).find('.cartItemPrice').text(formatPrice(price));
    		
    	});
    	$('#totalPriceValue').text(formatPrice(totalPrice));
    }
    
    $('.cartItemCheckbox').each(function(){	
    });
    
    //수량변경
    $(document).on('click', '.quantityMinusButton', function(){
    	let qty = parseInt($(this).closest('.cartItem').find('.quantityNumber').text());
    	let cartNo = parseInt($(this).closest('.cartItem').find('.cartNo').attr("data-value"));
    	let qtyText = $(this).closest('.cartItem').find('.quantityNumber');
    	
    	if(qty - 1 < 1) qty = 1;
    	else qty--;
    	
    	$.ajax({
    		type:"post",
    		url:"/prd/changePrdQty",
    		data:{"cartNo":cartNo, "cartQty":qty},
    		success:function(){
    			qtyText.text(qty);
    			getTotalPrice();
    		}
    	});
    	
    	
    });
    
    $(document).on('click', '.quantityPlusButton', function(){
    	let qty = parseInt($(this).closest('.cartItem').find('.quantityNumber').text());
		let cartNo = parseInt($(this).closest('.cartItem').find('.cartNo').attr("data-value"));
		let qtyText = $(this).closest('.cartItem').find('.quantityNumber');
		
    	qty++;
    	
    	$.ajax({
    		type:"post",
    		url:"/prd/changePrdQty",
    		data:{"cartNo":cartNo, "cartQty":qty},
    		success:function(){
    			qtyText.text(qty);
    			getTotalPrice();
    			
    		}
    	});
    	
    
    }); 
    
    //체크박스 변경
    $('.cartItemCheckbox').on('change', function(){
    	getTotalPrice();
    });
    
    //전체 선택
    $('#CartCheckAllButton').on('click', function(){
    	var chk = false;
    	
    	$('.cartItemCheckbox').each(function(){
    		if(!$(this).is(":checked")){
    		 	chk = true;
    		 	return false;
    		}
    	});
    	
    	if(chk){
    		$('.cartItemCheckbox').prop('checked',true);
    	}else{
    		$('.cartItemCheckbox').prop('checked',false);
    	}
    	
    	getTotalPrice();
    });
    
    //선택 항목 삭제
    $('#clearCartButton').on('click', function(){
    	var chk = false;
    	
    	$('.cartItemCheckbox').each(function(){
    		if($(this).is(":checked")){
    		 	chk = true;
    		 	return false;
    		}
    	});
    	
    	if(chk){
	    	if(confirm('삭제 하시겠습니까?')){
		    	$('.cartItemCheckbox').each(function(){
		    		var itemElement = $(this).closest('.cartItem');
		    		
		    		if($(this).is(":checked")){
		    			let cartNo = parseInt($(this).closest('.cartItem').find('.cartNo').attr("data-value"));
		    				
		    			$.ajax({
		    				type:"post",
		    				url:"/prd/deletePrdInMyCart",
		    				data:{"cartNo":cartNo},
		    				success:function(response){
		    					if (response === "success") {
				                    itemElement.remove(); // 서버에서 성공적으로 삭제된 경우 DOM에서 제거
				                    getTotalPrice(); // 총 합계 업데이트
				                } else {
				                    alert('삭제 실패');
				                }
		    				}
		    			});
		    		}
		    	});
	    	}
	    }else alert('삭제할 상품을 선택해주세요.');
    });
    
    //결제 페이지로 이동
    $('#cartPayButton').on('click', function(){
    	let cartArr = new Array();
    	$('.cartNo').each(function(){
    		if($(this).closest('.cartItem').find('.cartItemCheckbox').is(":checked")){
	    		let cartNo = parseInt($(this).attr("data-value"));
	    		cartArr.push(cartNo);
    		}
    	});
    	
    	$.ajax({
    		type:"post",
    		url:"/prd/productBuy",
    		contentType: "application/json",
    		data: JSON.stringify({"cartArr":cartArr}),
    		success: function(result) {
	            // 서버에서 반환한 URL로 페이지 이동
	            window.location.href = result;
	        }
    	})
    	
    });
});
 