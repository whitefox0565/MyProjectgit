$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const boardNo = urlParams.get("boardNo");
    const memId = $('#memId').val();
    const sessionNick = $('#memNick').val(); // sessionNick 변수 추가
    
    bringComment();
    
    $('#addImgBtn').on('change', function() {
        const input = this;
        
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            let fileName = input.files[0].name;
            
            $('#boardContentPageCommentImgArea').append(
                '<img id="commentImg" class="commentImg" src="/images/' + fileName + '" width="200" height="200" data-filename="' + fileName + '">'
            );
        }
    });
    
    $('#addCommentBtn').on('click', function(){
        let imgCode = $('#boardContentPageCommentImgArea').html();
        let commentCode = $('#boardContentPageComment').val().replace(/\n/g, "<br>");
        let comment = imgCode + commentCode;
        
        $.ajax({
            type:"post",
            url:"/addCommentToBoardContent",
            data:{"comment":comment, "memNick":$('#memNick').val(), "boardNo":boardNo, "memId":memId},
            success:function(result){
                const now = new Date(); // 현재 시간 생성
                const formattedDate = now.toLocaleDateString() + " " + now.toLocaleTimeString(); // 현재 시간을 포맷팅
                
                $('.result').append($('<li class="myComment">').html(`
                    <div class="commentNick">${sessionNick}</div>
                    ${comment}
                    <div class="commentDate">${formattedDate}</div>
                `));
                
                // 댓글 입력 필드와 이미지 영역 초기화
                $('#boardContentPageComment').val("");
                $('#boardContentPageCommentImgArea').empty(); // 이미지 영역을 비움
            }
        });
    });
    
    function bringComment(){
        $.ajax({
            type:"post",
            url:"/getComment",
            data:{"boardNo":boardNo},
            success:function(result){
                const resultContainer = $('.result');
                resultContainer.empty();
                
                result.forEach(item => {
                    let formattedDate = new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString(); // DB에서 받아온 날짜를 포맷팅
                    let commentHtml = `
                        <div class="commentNick">${item.memNick}</div>
                        ${item.comment}
                        <div class="commentDate">${formattedDate}</div>
                    `;
                    
                    if(item.memId === memId){
                        resultContainer.append($('<li class="myComment">').html(commentHtml));
                    } else {
                        resultContainer.append($('<li class="myComment">').html(commentHtml));
                    }
                });
            }
        });
    }
    
    $('#boardContentPageCommentImageButton').on('click', function() {
        $('#addImgBtn').click();
    });
});
