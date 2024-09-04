<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>회원가입</title>
<c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
<script src="<c:url value='/js/insertGymSearchZip.js'/>"></script>
<script src="<c:url value='/js/getGymPosition.js'/>"></script>
<script src="<c:url value='/js/insertGymForm.js'/>"></script>
<script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=220b65eklm&submodules=geocoder"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="insertGymForm" class="noto-sans-kr">
			<div id="insertGymFormContainer">
				<div id="insertGymForSentence">
					<div id="insertGymFormTitle">Manager</div>
				</div>
				<form id="joinForm" method="post" action="<c:url value='/gym/insertGymOwner' />">
					<div class="formGroup">
						<label for="memId">아이디</label>
					<div class= "inputGroup">
						<input type="text" id="memId" name="memId" class="formControl " placeholder="아이디">
						<input type="button" id="memIdChk" value="중복확인" class="btn">
											</div>
						<div id="available" class="status-message"></div>
					</div>
					<div class="formGroup">
						<label for="memPwd">비밀번호</label>
						<input type="password" id="memPwd" name="memPwd" class="formControl" placeholder="비밀번호" required>
						<input type="password" id="memPwd_chk" name="memPwd_chk" class="formControl" placeholder="비밀번호 확인">
						<div id="memPwd_chk_or" class="status-message"></div>
					</div>
					<div class="formGroup">
						<label for="memName">이름</label>
						<input type="text" id="memName" name="memName" class="formControl" placeholder="이름" required>
						<input type="text" id="memNick" name="memNick" class="formControl" placeholder="닉네임" required>
						<div id="memNick_chk" class="status-message"></div>
					</div>
					<div class="formGroup">
						<label for="memZipcode">주소지</label>
											<div class= "inputGroup">
						<input type="button" id="searchZipBtn" name="searchZipBtn" value="주소검색" class="btn input-group-btn">
						<input type="text" id="memZipcode" name="memZipcode" class="formControl" placeholder="우편번호" required readonly>
											</div>
						<input type="text" id="memAddress1" name="memAddress1" class="formControl" placeholder="주소" required readonly>
						<input type="text" id="memAddress2" name="memAddress2" class="formControl" placeholder="상세 주소" required>
					</div>
					<div class="formGroup">
						<label for="memHp">연락처</label>
						<div class= "inputGroup">
							<input type="hidden" id="authenticationChk" value="">
							<input type="text" id="memHp" name="memHp" class="formControl" placeholder="( - 을 제외하고 입력해주세요.)" required>
							<input type="button" value="본인인증" id="hpAuthentication" class="btn">
						</div>
						<div id="authentication_chk" class="status-message"></div>
					</div>
					<div class="formGroup">
						<label for="memEmail">이메일</label>
						<input type="email" id="memEmail" name="memEmail" class="formControl" placeholder="example123@naver.com" required>
						<div id="memEmail_chk" class="status-message"></div>
					</div>
					<div class="formGroup">
						<label for="gymName">도장 정보</label>
						<input type="text" id="gymName" name="gymName" class="formControl" placeholder="도장 이름">
						<div id="gymName_chk" class="status-message"></div>
						<input type="text" id="gymHp" name="gymHp" class="formControl" placeholder="도장번호 ( -을 제외하고 입력해주세요)">
						<input type="text" id="gymPrice" name="gymPrice" class="formControl" placeholder="월회비">
					</div>
					<input type="hidden" id="pointX" name="pointX" value="">
					<input type="hidden" id="pointY" name="pointY" value="">
					<input type="submit" id="insertGymBtn" value="sign up" class="btn">
				</form>
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
