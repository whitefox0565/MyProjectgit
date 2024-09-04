<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>로그인</title>
<c:import url="/WEB-INF/views/layout/head.jsp" />
<link rel="stylesheet" type="text/css" href="<c:url value='/css/loginForm.css' />">
<script src="<c:url value='/js/loginForm.js'/>"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="loginContainer" class="noto-sans-kr">
			<div id="loginBox">
				<div id="loginTitle">로그인</div>
				<form id="loginForm" method="post" action="<c:url value='/member/login' />">
					<div class="loginInputBox">
						<input type="text" id="memId" name="memId" placeholder="아이디">
					</div>
					<div class="loginInputBox">
						<input type="password" id="memPwd" name="memPwd" placeholder="비밀번호">
					</div>
					<div id="loginOptions">
						<div><input type="checkbox" id="idSave" name="idSave">아이디 저장</div>
						<a id="pwdSearch" href="<c:url value='/member/findPwd' />">비밀번호 찾기</a>
					</div>
					<div id="loginButton">
						<input type="submit" value="로그인">
					</div>
				</form>
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
