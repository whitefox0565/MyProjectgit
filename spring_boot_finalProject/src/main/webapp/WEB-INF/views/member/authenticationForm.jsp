<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>인증</title>
	<c:import url="/WEB-INF/views/layout/head.jsp" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/authenticationForm.css' />">
	<script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
	<script src="<c:url value='/js/authenticationForm.js'/>"></script>
</head>
<body>
	<div class="bodyContents">
		<div id="authenticationContainer" class="noto-sans-kr">
			<div id="authenticationBox">
				<div id="authenticationTitle">인증</div>
				<form id="authenticationForm" method="post" action="<c:url value='/member/authenticate' />">
					<div class="authenticationInputBox">
						<input type="text" id="to" name="to" readonly placeholder="받는사람">
						<button type="button" id="send">전송</button>
					</div>
					<div class="authenticationInputBox">
						<input type="text" id="userNum" name="userNum" placeholder="인증번호">
						<button type="button" id="enterBtn">확인</button>
					</div>
					<div id="authenticationResult"></div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
