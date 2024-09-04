<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>체육관</title>
<c:import url="/WEB-INF/views/layout/head.jsp" />
<script src="<c:url value='/js/joinChoose.js'/>"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="joinChoose" class="noto-sans-kr">
			<div id="chooseContainer">
				<div id="chooseBox">
					<div id="chooseSentence">
						<div id="chooseTitle">Sign Up</div>
					</div>
					<div id="chooseManagerUserBox">
						<div class="chooseManagerUser">
							<img id="managerImage" src="<c:url value='/image/manager.png' />"
								alt="Manager">
							<div class="chooseMUTitle">Manager</div>
							<div class="chooseMUButton">
								<a href="<c:url value='/gym/insertGymForm' />"> Sign Up </a>
							</div>
						</div>
						<div class="chooseManagerUser">
							<img id="userImage" src="<c:url value='/image/user.png' />"
								alt="User">
							<div class="chooseMUTitle">User</div>
							<div class="chooseMUButton">
								<a href="<c:url value='/member/joinForm' />"> Sign Up </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
