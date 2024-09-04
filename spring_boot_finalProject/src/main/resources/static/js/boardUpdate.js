/**
 * 
 */
 
 $(document).ready(function() {
    var userId = $('#memId').val();
    var boardNo = $('#boardNo').val();
    let textAreaContent = $('boardUpdatePageBoardText').html();
    
    
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
	             	$('#boardUpdatePageImageBox').append(
                     	'<img id="boardImg" class="boardImg" src="/images/' + fileName + '" width="100" height="100" data-filename="' + fileName + '">'
          			);
	             }
       		});
        }
    });
    
    //이미지 textArea에 추가
    $('#boardUpdatePageImageInputBox').on('click', '.boardImg', function(){
       let fileName = $(this).data('filename');
       
       
       $('.textArea').append(
          '<img id="boardImg" class="boardImg" src="/images/' + fileName + '" data-filename="' + fileName + '">'
       );
    });
    
    // 엔터키를 눌렀을 때 폼 제출 방지
    $('#boardUpdateForm').on('keydown', 'input, textarea', function(e) {
        if (e.keyCode === 13) { // Enter key
           e.preventDefault(); // 기본 동작 방지
           return false; // 추가적인 방지
        }
    });
    
    $('#boardUpdateForm').on('submit', function(){
       event.preventDefault();
       let textAreaContent = $('.textArea').html();
       console.log(textAreaContent);
       
       $.ajax({
          type:"post",
          url:"/boardUpdate",
          data:{"textAreaContent":textAreaContent, "title":$('#boardUpdatePageBoardTitle').val(), "boardNo":boardNo},
          success:function(result){
             location.href = "/boardPage?boardNo=" + result;
          }
       })
    });
    
            $(".boardUpdatePageSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".boardUpdatePageSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".boardUpdatePageSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".boardUpdatePageSubSelect").css("display", "none");
        }
    });

    // boardUpdatePageSubSelectEach 클릭 시 Placeholder 값 변경
    $(".boardUpdatePageSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴
        var placeholder = $(this).closest(".boardUpdatePageSelect").find(".boardUpdatePageSelectPlaceholder");  // Placeholder를 찾음
        placeholder.html(selectedValue + ' <div class="boardUpdatePageDown"></div>');  // Placeholder 값을 업데이트하고 boardUpdatePageDown div를 유지
        $(this).parent().css("display", "none");  // 드롭다운을 숨김
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".boardUpdatePageSelectPlaceholder, .boardUpdatePageSubSelect").length) {
            $(".boardUpdatePageSubSelect").css("display", "none");
        }
    });
    
    $(".boardUpdatePageSelectPlaceholder, .boardUpdatePageSubSelectEach").on('mouseenter', function() {
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
    
        $(".boardUpdatePageSubSelectEach").on('mouseenter', function() {
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
    
    $('#boardUpdatePageImageInputButton').on('click', function() {
        $('#fileInput').click();
    });
    
    $('#boardUpdatePageUpdateButton').on('click', function() {
        $('#boardUpdatePageSubmit').click();
    });
    
});