/**
 * 
 */
 
 $(document).ready(function(){
    // 아이디, 비밀번호 입력 필드 클릭 시 border 스타일 변경
    $(".shippingField input[type=text]").focus(function() {
        $(this).css({
            "outline": "none",                 // 전체 outline 제거
            "border-bottom": "1px solid #1b2631" // 아래쪽 border를 진하게
        });
    });

    // 입력 필드에서 포커스가 벗어났을 때 스타일 원래대로 복원
    $(".shippingField input[type=text]").blur(function() {
        $(this).css({
            "border-bottom": "1px solid #e8e8e8" // 아래쪽 border를 원래 상태로
        });
    });
    
    //포멧
    //숫자 포멧
 	function formatPrice(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	}
    
    var totalPrice = 0;
    $('.orderItem').each(function(){
    	let qty = parseInt($(this).find('.orderItemQuantity span').text());
    	let price = parseInt($(this).find('.orderItemPrice span').text().replace(/,/g,"").replace("원", ""));
    	totalPrice += qty * price;
    	
    	$(this).find('.orderItemPrice span').text(formatPrice(price));
    	$(this).find('.orderItemTotalPrice span').text(formatPrice(price * qty));
    })
    $('#orderTotalValue').text(formatPrice(totalPrice));
    
    //우편번호
   $('#searchZipBtn').on('click', function() {
        new daum.Postcode({
           oncomplete:function(data) {
              let address1 = "";
              
              // 도로명 주소인 경우
              if(data.userSelectedType == 'R') {
                 address1 = data.roadAddress + "(" + data.bname + data.buildingName + ")";
              }else { // 지번 주소인 경우
                 address1 = data.jibunAddress;
              }
           
              // 입력란에 우편버오, 주소1 출력 
              document.getElementById('recipientZipCode').value = data.zonecode;
              document.getElementById('recipientAddress').value = address1;
              
              // address2에 입력 시 이미 입력되어 있는 값 삭제하고 포커스
              let address2 = document.getElementById('shippingAddress2');
              address2.value = "";
              address2.focus();
           }        
        }).open();
     });
     
     $('#confirmBuyButton').on('click', function(){
     	event.preventDefault(); // 폼의 기본 제출 동작을 막음
     	
     	let ordReceiver = $('#recipientName').val();
     	let ordZipcode = $('#recipientZipCode').val();
     	let ordAddress1 = $('#recipientAddress').val();
     	let ordAddress2 = $('#shippingAddress2').val();
     	let ordRcvPhone = $('#recipientPhone').val();
     	let ordRcvMsg = $('#shippingMemo').val();
     	let ordPay = parseInt($('#orderTotalValue').text().replace(/,/g,"").replace("원", ""));
     	let option = $('input[name="paymentMethod"]:checked').next('label').text();
     	
     	let orderData = {
	        "ordReceiver": ordReceiver,
	        "ordZipcode": ordZipcode,
	        "ordAddress1": ordAddress1,
	        "ordAddress2": ordAddress2,
	        "ordRcvPhone": ordRcvPhone,
	        "ordRcvMsg": ordRcvMsg,
	        "ordPay": ordPay,
	        "ordPayOption": option
	    };
     	
     	console.log(ordPay);
     	console.log(option);
     	
     	$.ajax({
     		type:"post",
     		url:"/prd/prdBuy",
     		contentType: "application/json",
     		data: JSON.stringify(orderData),
     		success:function(result){
     			location.href = result;
     		}
     	});

     });
     
     $('#cancelButton').on('click',function(){
     	event.preventDefault(); // 폼의 기본 제출 동작을 막음
     	location.href = "/prd/prdCartForm";
     });
});
 