/**
 * 
 */
 
 $(document).ready(function() {
    // 페이지 로드 시 저장된 아이디가 있으면 입력 필드에 채워 넣기
    let savedId = localStorage.getItem('savedId');
    if (savedId) {
        $('#memId').val(savedId);
        $('#idSave').prop('checked', true);
    }

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        
        let memId = $('#memId').val();
        let memPwd = $('#memPwd').val();
        let idSave = $('#idSave').is(':checked');
        
        if (memId === "" || memPwd === "") {
            alert("아이디 또는 비밀번호를 입력하세요");
        } else {
            $.ajax({
                type: "post",
                url: "/member/login",
                data: { "memId": memId, "memPwd": memPwd },
                success: function(result) {
                    if (result) {
                        // 로그인 성공 시 아이디 저장 여부에 따라 로컬 스토리지에 저장
                        if (idSave) {
                            localStorage.setItem('savedId', memId);
                        } else {
                            localStorage.removeItem('savedId');
                        }
                        location.href = "/";
                    } else {
                        alert("아이디 또는 비밀번호가 일치하지 않습니다");
                    }
                }
            });
        }
    });

    // 비밀번호 찾기 링크에 마우스를 올리면 색상 변경
    $("#pwdSearch").hover(
        function() {
            $(this).css("color", "#1b2631"); // 마우스를 올렸을 때의 색상
        },
        function() {
            $(this).css("color", "#007BFF"); // 마우스를 뗐을 때의 원래 색상
        }
    );

    // 로그인 버튼에 마우스를 올리면 색상 변경
    $("#loginButton input[type='submit']").hover(
        function() {
            $(this).css({ "background-color": "#333333", "color": "whitesmoke" }); // 마우스를 올렸을 때의 색상
        },
        function() {
            $(this).css({ "background-color": "black", "color": "white" }); // 마우스를 뗐을 때의 원래 색상
        }
    );

    // 아이디, 비밀번호 입력 필드 클릭 시 border 스타일 변경
    $(".loginInputBox input").focus(function() {
        $(this).css({
            "outline": "none",                 // 전체 outline 제거
            "border-bottom": "1px solid #1b2631" // 아래쪽 border를 진하게
        });
    });

    // 입력 필드에서 포커스가 벗어났을 때 스타일 원래대로 복원
    $(".loginInputBox input").blur(function() {
        $(this).css({
            "border-bottom": "1px solid #e8e8e8" // 아래쪽 border를 원래 상태로
        });
    });

});
