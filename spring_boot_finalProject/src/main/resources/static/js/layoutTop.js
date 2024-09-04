/**
 * 
 */

  $(document).ready(function() {
  	
  	
    
	   	$.ajax({
		 		type:"post",
		 		url:"/top",
		 		dataType:"json",
		 		success:function(resultData){
		 			if(resultData["loginChk"] === "login"){
			 			$('#hello').text(resultData["memNick"]);
			 			$('#myImage').attr('src', '/images/' + resultData["memImgNo"]);
			      		$('#myImageUser').attr('src', '/images/' + resultData["memImgNo"]);
			      		$('#imageUserID').text(resultData["memNick"]);
			      		$('#imageUserEmail').text(resultData["memEmail"]);
		      		}
		 		}
		 });
	 
   
	
	
	
    // Hover effect for images and buttons
    $("#myImage, #topLogin, #topJoin").hover(
        function() {
            $(this).css("filter", "brightness(85%)");
        },
        function() {
            $(this).css("filter", "brightness(100%)");
        }
    );
    
    // Hover effect for main menu items
    $(".topMainMenu").hover(
        function() {
            $(this).find(".topMenuEachBox a").css("color", "#909497");
            $(this).find(".menuDown").css({
                "border-top": "1px solid gray",
                "border-left": "1px solid gray"
            });
            $(this).find(".topSubMenu").css("visibility", "visible");
        },
        function() {
            $(this).find(".topMenuEachBox a").css("color", "#424949");
            $(this).find(".menuDown").css({
                "border-top": "1px solid black",
                "border-left": "1px solid black"
            });
            $(this).find(".topSubMenu").css("visibility", "hidden");
        }
    );

    // Hover effect for submenu items and function buttons
    $(".topSubMenuEach, .imageFuncEach").hover(
        function() {
            $(this).find('a').css({
                "background-color": "#f8f9f9",
                "color": "gray"
            });
        },
        function() {
            $(this).find('a').css({
                "background-color": "white",
                "color": "#424949"
            });
        }
    );
    
    $("#myImage").click(function() {
        // 현재 visibility 상태를 가져온다.
        var currentVisibility = $("#imageSubBox").css("visibility");

        // visibility가 'visible'일 때, 'hidden'으로 설정하고, 그 반대도 마찬가지
        if (currentVisibility === "visible") {
            $("#imageSubBox").css("visibility", "hidden");
        } else {
            $("#imageSubBox").css("visibility", "visible");
        }
    });

    // 클릭 외부 클릭 시 숨기기
    $(document).click(function(event) {
        if (!$(event.target).closest("#myImage, #imageSubBox").length) {
            $("#imageSubBox").css("visibility", "hidden");
        }
    });
});
  
  
 