$(document).ready(function() {
    var userId = $('#memId').val();
    
    $('#fileInput').on('change', function() {
        const input = this;
        
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            let fileName = input.files[0].name;

           reader.readAsDataURL(input.files[0]);
            
            // 파일을 서버에 전송하기 위한 FormData 객체 생성
           let formData = new FormData();
           formData.append('uploadFile', input.files[0]); // 'uploadFile'은 서버의 @RequestParam과 매칭되는 이름
            
            $.ajax({
	             type:"post",
	             url:"/member/imageFileUploadOnly",
	             enctype:"multipart/form-data",
	             processData:false,
	             contentType:false,
	             data: formData,
	             success:function(){
	             	$('#boardWritePageImageBox').append(
                     	'<img id="boardImg" class="boardImg" src="/images/' + fileName + '" width="100" height="100" data-filename="' + fileName + '">'
          			);
	             }
       		});
           
        }
    });
    
    //이미지 textArea에 추가
    $('#boardWritePageImageInputBox').on('click', '.boardImg', function(){
       let fileName = $(this).data('filename');
       
       
       $('.textArea').append(
          '<img id="boardImg" class="boardImg" src="/images/' + fileName + '" data-filename="' + fileName + '">'
       );
    });
    
   
    // 엔터키를 눌렀을 때 폼 제출 방지
    $('#boardWriteForm').on('keydown', 'input, textarea', function(e) {
        if (e.keyCode === 13) { // Enter key
           e.preventDefault(); // 기본 동작 방지
           return false; // 추가적인 방지
        }
    });
    
    
    $('#boardWriteForm').on('submit', function(){
       event.preventDefault();
       
       
       let textAreaContent = $('.textArea').html();
       let ctg = $('.boardWritePageSubSelectEach').attr("data-value");
       console.log(textAreaContent);
       console.log(ctg);
       $.ajax({
          type:"post",
          url:"/boardWrite",
          data:{"textAreaContent":textAreaContent, "memId":userId, "title":$('#boardWritePageBoardTitle').val(), "boardCtg":ctg},
          success:function(r){
             location.href= "/board?ctg=" + ctg;
          }
       });
       
       
       
    });
    
    $(".boardWritePageSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".boardWritePageSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".boardWritePageSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".boardWritePageSubSelect").css("display", "none");
        }
      
    });

    // boardWritePageSubSelectEach 클릭 시 Placeholder 값 변경
    $(".boardWritePageSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴
        var placeholder = $(this).closest(".boardWritePageSelect").find(".boardWritePageSelectPlaceholder");  // Placeholder를 찾음
        var selectedCtgValue = $(this).closest(".boardWritePageSelect").find(".boardWritePageSubSelectEach");
        placeholder.html(selectedValue + ' <div class="boardWritePageDown"></div>');  // Placeholder 값을 업데이트하고 boardWritePageDown div를 유지
        selectedCtgValue.attr("data-value", selectedValue);
        $(this).parent().css("display", "none");  // 드롭다운을 숨김
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".boardWritePageSelectPlaceholder, .boardWritePageSubSelect").length) {
            $(".boardWritePageSubSelect").css("display", "none");
        }
    });
    
    $(".boardWritePageSelectPlaceholder, .boardWritePageSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#dddddd",
                "color": "gray"
            });
        })
        .on('mouseleave', function(){
            $(this).css({
                "background-color": "#f8f8f8",
                "color": "#424949"
            });
        }
    );
    
        $(".boardWritePageSubSelectEach").on('mouseenter', function() {
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
    
    $('#boardWritePageImageInputButton').on('click', function() {
        $('#fileInput').click();
    });
    
    $('#boardWritePageWriteButton').on('click', function() {
        $('#boardWritePageSubmit').click();
    });
    
});