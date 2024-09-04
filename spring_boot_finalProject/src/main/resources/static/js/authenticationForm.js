$(document).ready(function() {
    var to = opener.document.getElementById("memHp").value;
    $('#to').val(to);

    // 인증번호 전송 버튼 클릭 이벤트
    $('#send').click(function() {
        alert('인증번호가 전송되었습니다.');

        $.ajax({
            url: '/check/sendSMS',
            type: 'GET',
            data: {
                "to": to
            },
            success: function(data) {
                const checkNum = data;

                // 인증번호 확인 버튼 클릭 이벤트
                $('#enterBtn').click(function() {
                    const userNum = $('#userNum').val();

                    if (checkNum === userNum) {
                        $(opener.document).find("#authenticationChk").val("true");
                        $(opener.document).find("#authentication_chk").empty();
                        $(opener.document).find("#authentication_chk").text("본인인증 되었습니다").css('color', '#03C75A');
                        window.close();
                    } else {
                        $(opener.document).find("#authenticationChk").val("false");
                        $('#authenticationResult').text("인증번호가 다릅니다").css('color', 'red');
                    }
                });
            }
        });
    });

    // 인증 버튼에 마우스를 올리면 색상 변경
    $("#authenticationBox button").hover(
        function() {
            $(this).css({ "background-color": "#333333", "color": "whitesmoke" });
        },
        function() {
            $(this).css({ "background-color": "black", "color": "white" });
        }
    );

    // 입력 필드 클릭 시 border 스타일 변경
    $(".authenticationInputBox input").focus(function() {
        $(this).css({
            "outline": "none",
            "border-bottom": "1px solid #1b2631"
        });
    });

    // 입력 필드에서 포커스가 벗어났을 때 스타일 복원
    $(".authenticationInputBox input").blur(function() {
        $(this).css({
            "border-bottom": "1px solid #e8e8e8"
        });
    });
});