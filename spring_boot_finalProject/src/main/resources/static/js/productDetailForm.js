$(document).ready(function(){
   
      const currentUrl = window.location.href;  // 현재 페이지 URL 가져오기
   const savedUrl = localStorage.getItem('savedUrl');  // 이전에 저장된 URL 가져오기
   
   let price = parseInt($('.productDetailcontents').text());
   $('.productDetailcontents').text(formatPrice(price));
   $('#productDetailSumPrice').text(formatPrice(price));
   $('#productDetailTotalPriceNumber').text(formatPrice(price));
   
   // 현재 URL이 이전에 저장된 URL과 다르면 스크롤 위치를 초기화
   if (!savedUrl.includes("productDetailForm?prdNo=")) {
      localStorage.removeItem('scrollPosition');
   } else {
       const scrollPosition = localStorage.getItem('scrollPosition');
       if (scrollPosition) {
           window.scrollTo(0, parseInt(scrollPosition, 10));
       }
   }
   
   // 현재 URL을 저장
   localStorage.setItem('savedUrl', currentUrl);        

    // 페이지 떠날 때 스크롤 위치 저장
   window.addEventListener("beforeunload", function() {
         localStorage.setItem('scrollPosition', window.scrollY);
   });    
   
    

    // 페이지 번호 클릭 시 스크롤 위치 저장
    $('.productDetailPagination a').on('click', function() {
        localStorage.setItem('scrollPosition', window.scrollY);
    });
    
    $('#productDetailCommentLinkDown').on('click', function(e) {
        e.preventDefault(); 

        // Smoothly scroll to the comment container
        $('html, body').animate({
            scrollTop: $('#productDetailCommentContainer').offset().top - 100
        }, 600); 
    });
    
    $('#productDetailCommentLinkUp').on('click', function(e) {
        e.preventDefault(); 

        // Smoothly scroll to the comment container
        $('html, body').animate({
            scrollTop: $('#productDetailAdditionalImages').offset().top - 150
        }, 600); 
    });
    
    // 상품 제목 클릭 시 상세 내용 표시
    $('.prdBoardTitle').on('click', function(){
        prdBoardNo = $(this).attr("data-value"); // 클릭한 제목의 데이터 값을 가져옴
        let contentsBox = $(this).closest('.productDetailBox').find('.productDetailContentEach'); // 클릭한 제목에 해당하는 contentEach 요소를 선택
        let viewNum = $(this).closest('.productDetailBox').find('.viewNumEach');
        let flag = contentsBox.attr("data-value");
        
        if(flag === "true"){
            // 이미 내용이 로드되어 있으면, 내용을 지우고 플래그를 변경
            contentsBox.empty();
            contentsBox.attr("data-value", "false");
            contentsBox.css('display', 'none');
        } else {
            // 내용이 로드되어 있지 않으면, AJAX 요청을 통해 데이터를 가져옴
            
            $.ajax({
                type: "get",
                url: "/prd/getPrdBoardContent/" + prdBoardNo,
                dataType:"json",
                success: function(result) {
                    // 가져온 내용을 contentEach에 삽입
                    contentsBox.html(result["contents"]); 
                    contentsBox.attr("data-value", "true");
                    contentsBox.css('display', 'flex');
               viewNum.text(result["view"]);
               
               if(result["idChk"] == "true"){
                  
                       // Append the modification buttons
                       contentsBox.prepend(`
                          <div id = "productDetailSubModify">
                              <div id="productDetailSubModifyBox">
                                  <img id="productDetailDelete" src="/image/myPageDelete.png" class="deleteButton">
                              </div>
                           </div>
                       `);
                    }
                },
                error: function() {
                    console.log("Error loading content");
                }
            });
        }
    });
    
    $(document).on('click', '.deleteButton', function(){
       let prdBoardNo = $(this).closest('.productDetailBox').find('.prdBoardTitle').attr("data-value");
       
       $.ajax({
          type:"get",
          url:"/prd/prdBoardDelete/" + prdBoardNo,
          success:function(){
             location.href = currentUrl;
          }
       });
    });
    
    //포멧
    function formatPrice(value) {
       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
   }
    
    $('#productDetailQuantityMinus').on('click', function(){
       let val = $('#productDetailQuantityNumber').text();
       let num = parseInt(val);
       let prdPrice = parseInt($('.productDetailcontents').text().replace(/,/g, "").replace("원", ""));
       
       if(num - 1 < 1) num = 1;
       else num--;
       
      $('#productDetailQuantityNumber').text(num);
      $('#productDetailSumPrice').text(formatPrice(num * prdPrice));
      $('#productDetailTotalPriceNumber').text(formatPrice(num * prdPrice));
    });
    
    $('#productDetailQuantityplus').on('click', function(){
       let val = $('#productDetailQuantityNumber').text();
       let num = parseInt(val);
       let prdPrice = parseInt($('.productDetailcontents').text().replace(/,/g, "").replace("원", ""));
       
       num++;
       
       $('#productDetailQuantityNumber').text(num);
       $('#productDetailSumPrice').text(formatPrice(num * prdPrice));
       $('#productDetailTotalPriceNumber').text(formatPrice(num * prdPrice));
    });
    
    //상품 삭제
    $('#prdDeleteBtn').on('click',function() {
       if(!confirm('상품을 삭제하시겠습니까?')){
          return false;
       }
    });
    
            $(".productDetailSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".productDetailSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".productDetailSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".productDetailSubSelect").css("display", "none");
        }
      
    });

    // productDetailSubSelectEach 클릭 시 Placeholder 값 변경
    $(".productDetailSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴
        var placeholder = $(this).closest(".productDetailSelect").find(".productDetailSelectPlaceholder");  // Placeholder를 찾음
        var selectedCtgValue = $(this).closest(".productDetailSelect").find(".productDetailSubSelectEach");
        placeholder.html(selectedValue + ' <div class="productDetailDown"></div>');  // Placeholder 값을 업데이트하고 productDetailDown div를 유지
        selectedCtgValue.attr("data-value", selectedValue);
        $(this).parent().css("display", "none");  // 드롭다운을 숨김
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".productDetailSelectPlaceholder, .productDetailSubSelect").length) {
            $(".productDetailSubSelect").css("display", "none");
        }
    });
    
    $(".productDetailSelectPlaceholder, .productDetailSubSelectEach").on('mouseenter', function() {
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
    
        $(".productDetailSubSelectEach").on('mouseenter', function() {
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
    
    $('#addToCartButton').on('click', function(){
    	let prdNo = parseInt($('#prdNo').attr("data-prdNo"));
    	let size = $('.productDetailSelectPlaceholder').text().trim();
    	let qty = parseInt($('#productDetailQuantityNumber').text());
    	
    	console.log(prdNo);
    	console.log(size);
    	console.log(qty);
    	
    	$.ajax({
    		type:"post",
    		url:"/prd/addPrdCart",
    		data:{
    			"prdNo":prdNo,
    			"prdSize":size,
    			"cartQty":qty
    		},
    		success:function(){
    			if(confirm('장바구니로 이동 하시겠습니까?')){
    				location.href = "/prd/prdCartForm";
    			}
    		}
    	})
    });
    
    $('#buyNowButton').on('click', function(){
    	let prdNo = parseInt($('#prdNo').attr("data-prdNo"));
    	let size = $('.productDetailSelectPlaceholder').text().trim();
    	let qty = parseInt($('#productDetailQuantityNumber').text());
    	
    	$.ajax({
    		type:"post",
    		url:"/prd/immediatelyPrdtBuy",
    		data:{
    			"prdNo":prdNo,
    			"prdSize":size,
    			"cartQty":qty
    		},
    		success:function(result){
    			window.location.href = result;
    		}
    	})
    });
    
});
