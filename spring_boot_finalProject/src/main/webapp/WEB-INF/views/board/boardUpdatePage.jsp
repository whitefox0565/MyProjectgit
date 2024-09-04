<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="/WEB-INF/views/layout/head.jsp" />
<script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
<script src="<c:url value='/js/boardUpdate.js'/>"></script>
</head>
<body>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="boardUpdatePage">
			<div id="boardUpdatePageContainer" class="noto-sans-kr">
				<div id="boardUpdatePageTitleBox">
					<div id="boardUpdatePageTitle">게시판</div>
					<div id="boardUpdatePageSubTitle">소통의 장, 다양한 의견을 공유하세요</div>
				</div>
				<form id="boardUpdateForm" method="post"
					action="<c:url value='/boardUpdate' />">
					<div id="boardUpdatePageUpdateBox">
						<input type="hidden" id="memId" name="memId"
							value="${sessionScope.sid}"> <input type="hidden"
							id="boardNo" name="boardNo" value="${vo.boardNo}">
						<div class="boardUpdatePageSelect">
							<div class="boardUpdatePageSelectPlaceholder">
								공지
								<div class="boardUpdatePageDown"></div>
							</div>
							<div class="boardUpdatePageSubSelect">
								<div class="boardUpdatePageSubSelectEach">공지</div>
								<div class="boardUpdatePageSubSelectEach">중고</div>
								<div class="boardUpdatePageSubSelectEach">문의</div>
								<div class="boardUpdatePageSubSelectEach">자유</div>
							</div>
							<input type="text" id="boardUpdatePageBoardTitle" name="title"
								placeholder="제목을 입력해주세요." value="${vo.title }" required>
						</div>
					</div>
					<input type="submit" id="boardUpdatePageSubmit" class="btn">
				</form>
				<div class="textAreaBox">
					<div id="boardUpdatePageBoardText" class="textArea"
						contenteditable="true">${vo.content }</div>
				</div>
				<div id="boardUpdatePageImageInputBox">
					<div id="boardUpdatePageWarning">
						<div>* 이미지를 업로드 하신 후 클릭을 하셔야 본문에 첨부됩니다.</div>
						<div>* 하단 썸네일을 클릭하시면 본문에 추가됩니다.</div>
						<div id="boardUpdatePageImageBox"></div>
					</div>
					<div id="boardUpdatePageImageInputButton">이미지 업로드</div>
					<input type="file" id="fileInput" name="fileInput">
				</div>
				<div id="boardUpdatePageButtonBox">
					<div id="boardUpdatePageUpdateButton">수정완료</div>
				</div>
			</div>
		</div>
	</div>
		<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>