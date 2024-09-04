/**
 * 
 */
 
 $(document).ready(function() {
 	//var eachGymPriceOrginal = 0;
 	
 	//로드시 금액 포멧
 	$('.payGymPrice').each(function(){
 		let price = parseInt($(this).text());
 		$(this).text(formatPrice(price));
 	});
 	
    $(".payGymBtn").on('mouseenter', function() {
        $(this).css({"background-color": "#333333", "color": "whitesmoke"});
    }).on('mouseleave', function() {
        $(this).css({"background-color": "black", "color": "white"});
    });
    
    $(".payGymSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".payGymSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".payGymSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".payGymSubSelect").css("display", "none");
        }
    });

    // payGymSubSelectEach 클릭 시 Placeholder 값 변경
    $(".payGymSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴(개월수)
        var months = selectedValue.replace("개월", "");  // 개월 수를 추출 (예: 1)
        var placeholder = $(this).closest(".payGymSelect").find(".payGymSelectPlaceholder");  // Placeholder를 찾음
        
         // Placeholder 값을 업데이트하고 payGymDown div를 유지
        placeholder.html(selectedValue + ' <div class="payGymDown"></div>');  // Placeholder 값을 업데이트하고 payGymDown div를 유지
        
        // Placeholder의 data-value를 업데이트
   		placeholder.attr("data-value", months);
   		
        // 드롭다운을 숨김
        $(this).parent().css("display", "none");  // 드롭다운을 숨김

    	var selectedMonthValue = $(this).closest('.payGymUserEach').find('.payGymSelectPlaceholder').attr("data-value") //개월수
        var selectedChecked = $(this).closest('.payGymUserEach').find('.payGymCheckBox'); //체크박스 체크 여부
        
        var eachGymPrice = $(this).closest(".payGymUserEachInfoBox").find(".payGymPrice");
        
        if(eachGymPrice.text() != "미등록"){
        	var selectedGymPrice = $(this).closest('.payGymUserEach').find('.costPayGymPrice').val().replace(/,/g,"").replace("원","");
    		let payPrice = formatPrice(parseInt(selectedMonthValue) * parseInt(selectedGymPrice));
    		
        	eachGymPrice.empty();
        	eachGymPrice.text(payPrice);
			
			if(selectedChecked.is(':checked')){
				$('#payGymAddBox').empty(); 
    			testCheckBox();
				getTotalPay();
			}
        }  
    });
    
    //가입 날짜 표시
    $('.registDate').each(function() {
    	let date = new Date();
    	let year = date.getFullYear();
    	let month = (date.getMonth() + 1).toString().padStart(2,'0');
    	let day = date.getDate().toString().padStart(2,'0');;
    	
    	let now = year + "-" + month + "-" + day;
    	
    	$(this).val(now);
    });
    
    //숫자 포멧
 	function formatPrice(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	}
    
    //체크박스 체크 유무에 따라 총액표시
    testCheckBox(); 
	function testCheckBox(){
		$('.payGymCheckBox').each(function() {
	    	var selectedGymNameValue = $(this).closest('.payGymUserEach').find('.payGymName').text(); //체육관 이름
		    var selectedNameValue = $(this).closest('.payGymUserEach').find('.payGymUserEachTitle').text(); //아이 이름
		    var gymPayChildNo =  $(this).closest('.payGymUserEach').find('.payChildNo').val(); // 아이 번호
		    var payGymAddEachId = '#payGymAddEach' + gymPayChildNo; // 아이디 지정
		    var selectedMonthValue = $(this).closest('.payGymUserEach').find('.payGymSelectPlaceholder').attr("data-value") //개월수
	    	
		    if ($(this).is(':checked')) {
		        
		        if(selectedGymNameValue != '미등록'){
		        	var selectedGymPrice = $(this).closest('.payGymUserEach').find('.costPayGymPrice').val().replace(/,/g,"").replace("원","");
	    			let payPrice = formatPrice(parseInt(selectedMonthValue) * parseInt(selectedGymPrice));
	    			
		        	const eachPayPrice = $("<div>", { id: "payGymAddEach" + gymPayChildNo, class:"payGymAddEach" });
					eachPayPrice.html(`
					    <div id="payGymAddName">${selectedNameValue} - ${selectedMonthValue}개월</div>
					    <div id="payGymAddPrice" class="eachPrice">${payPrice}</div>
					`);
					
					$('#payGymAddBox').append(eachPayPrice);
		        }
		        
		        getTotalPay();
		    }else{
		    	$(payGymAddEachId).remove();
		    }
		});
	}
    
    
    $('.payGymCheckBox').on('change', function(){  
    	$('#payGymAddBox').empty(); 
    	testCheckBox();
    	
    	getTotalPay();
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".payGymSelectPlaceholder, .payGymSubSelect").length) {
            $(".payGymSubSelect").css("display", "none");
        }
    });
    
    $(".payGymSelectPlaceholder, .payGymSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#f4f4f4",
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
    
    //총액
    // getTotalPay 함수 정의
    var totalPay = 0;
    function getTotalPay(){
    	totalPay = 0; //초기화
    	$('.eachPrice').each(function() {
    		totalPay += parseInt($(this).text().replace(/,/g,"").replace("원", ""));
    	});
    	
    	$('#payGymAddResult').empty();
    	$('#payGymAddResult').text("총 가격 : " + formatPrice(totalPay));
    	$('#payGymPayA').text(formatPrice(totalPay) + " 결제하기");
    }
   
    
    //체육관 검색 가져오기
    $(document).on('click', '.payGymBtn', function(){
    	var clickedButton = $(this); // 클릭된 버튼
		var thisGymClass = clickedButton.closest('.payGymUserEachInfoBox').find('.payGymName');
		var costGymClass = clickedButton.closest('.payGymUserEachInfoBox').find('.costPayGymPrice');
		var thisGymPriceClass = clickedButton.closest('.payGymUserEachInfoBox').find('.payGymPrice');
		var selectedMonthValue = $(this).closest('.payGymUserEach').find('.payGymSelectPlaceholder').attr("data-value") //개월수
        
	    // 현재 창을 열어 새로운 창을 띄우고 포커스를 유지할 버튼을 설정
	    var newWindow = window.open('/ai/mapRegistGym', '_blank', 'width=' + screen.width + ',height=' + screen.height + ',left=0,top=0');
	    
	    window.updatePayGymName = function(name){
	    	thisGymClass.text(name);
	    	
	    	getGymPriceByGymName(name, costGymClass, thisGymPriceClass, selectedMonthValue, function(){
	    		var isChecked = clickedButton.closest('.payGymUserEach').find('.payGymCheckBox').is(':checked');
            	
            	if(isChecked){
			        $('#payGymAddBox').empty(); 
    				testCheckBox();
			        
			        getTotalPay();
            	}
	    	});	
	    }; 
    });
    
    function getGymPriceByGymName(name, costGymClass, thisGymPriceClass, selectedMonthValue, callback){
    	$.ajax({
	    		type:"get",
	    		url:"/gym/getGymPriceByGymName/" + name,
	    		success:function(result){
	    			//eachGymPriceOrginal = result;
	    			costGymClass.val(result);
	    			thisGymPriceClass.text(formatPrice(result * selectedMonthValue));
	    			if (typeof callback === "function") {
		                callback();  // 콜백 호출
		            }
	    		}
	    });
    }
    
    //결제
    $('#payGymPayButton').on('click', function(){
	    $('.payGymUserEach').each(function(){
	        let ch = $(this);
	        let no = ch.find('.payChildNo').val();
	        let gym = ch.find('.payGymName').text();
	        let month = parseInt(ch.find('.payGymSelectPlaceholder').attr("data-value"));
	        let date = ch.find('.registDate').val();
	        let chk = ch.find('.payGymCheckBox').is(':checked');
	        
	        console.log(date);
	        
	        if(chk && gym != '미등록'){
	            
	            $.ajax({
	                type: "post",
	                url: "/child/childRegistGym",
	                data: {"childNo": no, "gymName": gym, "month": month, "date":date},
	                success: function(){
	                    location.href = "/member/myPageChildInfo";
	                }
	            });
	        }
	    });
	});
});



 