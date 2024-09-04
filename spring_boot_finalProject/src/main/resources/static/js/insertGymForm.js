/**
 * 
 */
 
 $(document).ready(function() {
	// 등록 버튼에 마우스를 올리면 색상 변경
    $("#insertGymForm .btn").hover(
        function() {
            $(this).css({ "background-color": "#333333", "color": "whitesmoke" }); // 마우스를 올렸을 때의 색상
        },
        function() {
            $(this).css({ "background-color": "black", "color": "white" }); // 마우스를 뗐을 때의 원래 색상
        }
    );

    // 아이디, 비밀번호 입력 필드 클릭 시 border 스타일 변경
    $(".formControl").focus(function() {
        $(this).css({
            "outline": "none",                 // 전체 outline 제거
            "border-bottom": "1px solid #1b2631" // 아래쪽 border를 진하게
        });
    });

    // 입력 필드에서 포커스가 벗어났을 때 스타일 원래대로 복원
    $(".formControl").blur(function() {
        $(this).css({
            "border-bottom": "1px solid #e8e8e8" // 아래쪽 border를 원래 상태로
        });
    });
	
 })
 
 