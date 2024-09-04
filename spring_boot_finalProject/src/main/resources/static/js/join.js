 $(document).ready(function(){
    let idChk = false; //중복확인 체크
    var pwdChk = false; // 비밀번호 확인
    var pwdRuleChk = false; // 비밀번호 조건 확인
    var nickChk = false; // 닉네임 확인
    var emailChk = false; // 이메일 확인
    
    // 엔터키 눌렀을 때 무조건 submit 되지 않도록 
    $(document).on('keydown', function (e) {
        if (e.keyCode == 13) return false; // 입력란에서 엔터키 쳐도 아무 반응 없음 (submit 되지 않음)
    });
    
    //아이디 중복확인
   $('#memIdChk').click(function(){
      let memId = $('#memId').val();
      
      if(memId == "") alert("아이디를 입력하세요");
      else{
         $.ajax({
            type:"post",
            url:"/member/joinMemIdChk",
            data:{"memId":memId},
            //dataType:"text",
            success:function(result){
               if(result){
                   idChk = false;
                   $('#available').empty();
                   $('#available').text('사용 불가능한 아이디 입니다').css('color', 'red');
                   $('#memId').focus();
               }else{
                  idChk = true;
                  $('#available').empty();
                  $('#available').text('사용가능한 아이디 입니다').css('color', '#03C75A');
                  $('#memPwd').focus();
               }
            }
         })
      }
   }); 
   
   //비밀번호 입력조건 체크
   $('#memPwd').on('keyup', function(e){
      var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // 3종류 이상 혼용 8~16자
      
      if(e.keyCode >= 0){
         let pwd = $('#memPwd').val();
         if(pwd.length <= 0) $('#memPwd_chk_or').empty();
         
         if(!passwordPattern.test(pwd)){
            pwdRuleChk = false;
            if(pwd.length > 0){
               $('#memPwd_chk_or').empty();
               $('#memPwd_chk_or').text('영문, 숫자, 특수문자를 혼합하여 8자리 이상 입력하세요.').css('color', 'red');
            }
         }else{
            pwdRuleChk = true;
            $('#memPwd_chk_or').empty();
         }
      }
   });
   
   //비밀번호 일치 확인
   $('#memPwd_chk').on('keyup', function(e){
      if(e.keyCode >= 0 && pwdRuleChk){
         //console.log($('#memPwd_chk').val().length);
         if($('#memPwd_chk').val().length <= 0) $('#memPwd_chk_or').empty();
         
         if($('#memPwd_chk').val() != $('#memPwd').val()){
            pwdChk = false;
            if($('#memPwd_chk').val().length > 0){
               $('#memPwd_chk_or').text('비밀번호가 일치하지 않습니다').css('color', 'red');
            }
         }else{
            pwdChk = true;
            $('#memPwd_chk_or').text('사용하셔도 좋은 비밀번호 입니다.').css('color', '#03C75A');
         }
      }
   });
      
   //엔터키 누르면 다음으로 포커스 이동
   //비밀번호
   $('#memPwd').on('keydown', function(e){
         if($('#memPwd').val() != "" && e.keyCode == 13){
            $('#memPwd_chk').focus();
         }
   });
   
   //비밀번호 확인
   $('#memPwd_chk').on('keydown', function(e){
         if($('#memPwd_chk').val() != "" && e.keyCode == 13){
            if($('#memPwd_chk').val() != $('#memPwd').val()){
               $('#memPwd_chk').focus();
            }else $('#memName').focus();
         }
   });
   
   //이름
   $('#memName').on('keydown', function(e){
         let name = $('#memName').val();
         
         if(name != "" && e.keyCode == 13){
            $('#memNick').focus();               
         }
   });
   
   //닉네임
   $('#memNick').on('keydown', function(e){
         let nick = $('#memNick').val();
         
         if(nick != "" && e.keyCode == 13 && nickChk){
            $('#memHp').focus();               
         }
   });
   
   //휴대폰 번호 
   $('#memHp').on('keyup', function(e){
         let hp1 = $('#memHp').val();
         let hp1Pattern = /^(01[0-9]{9})$/;
         if(hp1Pattern.test(hp1) && e.keyCode == 13) {
            $('#memEmail').focus();               
         }
   });
   
   
   //이메일
   $('#memEmail').on('keyup', function(e){
         let email = $('#memEmail').val();
         let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
         if(emailPattern.test(email) && e.keyCode >= 0) {
            emailChk = true;
            $('#memEmail_chk').empty();            
         }else{
            emailChk = false;
            $('#memEmail_chk').empty();
            $('#memEmail_chk').text('올바른 이메일이 아닙니다').css('color', 'red');   
         }
   });
   
   
   //닉네임 중복체크 및 조건확인
   $('#memNick').on('keyup', function(e){
         let nick = $('#memNick').val();      
         $.ajax({
            url:"/member/nickChk",
            data:{"nick":nick},
            success:function(result){
               if(nick.length <= 0) $('#memNick_chk').empty();
               
               if(result){
                  nickChk = false;
                   $('#memNick').focus();
                   if(nick.length > 0){
                     $('#memNick_chk').empty();
                     $('#memNick_chk').text('사용 불가능합니다').css('color', 'red');
                  }
               }
               else{
                  nickChk = true;
                  $('#memNick_chk').empty();
                  $('#memNick_chk').text('사용 가능합니다').css('color', '#03C75A');
               }
            }
         })
   });
   
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
              document.getElementById('memZipcode').value = data.zonecode;
              document.getElementById('memAddress1').value = address1;
              
              // address2에 입력 시 이미 입력되어 있는 값 삭제하고 포커스
              let address2 = document.getElementById('memAddress2');
              address2.value = "";
              address2.focus();
           }        
        }).open();
     });
     
   $('#hpAuthentication').on('click', function() {
       let hp = $('#memHp').val();
       
       if (hp.length == 11) {
           // 새 창의 크기
           const width = 500;
           const height = 500;
           
           // 화면의 크기
           const screenWidth = window.screen.width;
           const screenHeight = window.screen.height;
           
           // 새 창의 위치 계산 (정중앙)
           const left = (screenWidth / 2) - (width / 2);
           const top = (screenHeight / 3) - (height / 3) ;
           
           // 새 창 열기
           window.open('/sms', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=no`);
       } else {
           alert('연락처를 입력해주세요(-을 제외하고 11자리)');
       }
   });
      
   //본인인증 확인
   $('#authenticationChk').on('input', function(){
         console.log($('#authenticationChk').val());
   });
   
      
   //회원가입 폼 제출
   $('#joinForm').on('submit',function(){
      let chk = false;
      let authenticationChk = false;
      //console.log(idChk);
      //console.log(pwdChk);
      //console.log(pwdRuleChk);
      //console.log(nickChk);
      //console.log(emailChk);
      if(idChk){
         chk = true;
      }else{
         chk = false;
         alert('아이디를 다시 확인해주세요');
         $('#memId').focus();
         return false;
      }
      
      if($('#authenticationChk').val() == "true"){
         authenticationChk = true;
      }else{
         authenticationChk = false;
         alert("본인인증을 해주세요");
         return false;
      }
      
      
      if(pwdRuleChk){
         chk = true;
      }else{
         chk = false;
         alert('비밀번호를 다시 확인해주세요');
         $('#memPwd').focus();
         return false;
      }
      
      if(pwdChk){
         chk = true;
      }else{
         chk = false;
         alert('비밀번호가 일치하지 않습니다');
         $('#memPwd_chk').focus();
         return false;
      }
      
      if(nickChk){
         chk = true;
      }else{
         chk = false;
         alert('닉네임을 다시 확인해주세요');
         $('#memNick').focus();
         return false;
      }
       
      if(emailChk){
         chk = true;
      }else{
         chk = false;
         alert('이메일을 다시 확인해주세요');
         $('#memEmail').focus();
         return false;
      }
       
   });
 })