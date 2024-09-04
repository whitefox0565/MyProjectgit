<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
<script src="<c:url value='/js/productBoardWrite.js'/>"></script>
<c:import url="/WEB-INF/views/layout/head.jsp" />
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="boardWritePage">
			<div id="boardWritePageContainer" class="noto-sans-kr">
				<div id="boardWritePageTitleBox">
					<div id="boardWritePageTitle">게시판</div>
					<div id="boardWritePageSubTitle">소통의 장, 다양한 의견을 공유하세요</div>
				</div>
				<form id="boardWriteForm" method="post"
					action="<c:url value='/boardWrite' />">
					<div id="boardWritePageWriteBox">
						<input type="hidden" id="memId" name="memId" value="${sessionScope.sid}">
						<input type="hidden" id="prdNo" name="prdNo" value="${prdNo}">	
						<div class="boardWritePageSelect">
							<div class="boardWritePageSelectPlaceholder">
									후기
								<div class="boardWritePageDown"></div>
							</div>
								<div class="boardWritePageSubSelect">
									<div class="boardWritePageSubSelectEach" data-value="후기">후기</div>
									<div class="boardWritePageSubSelectEach" data-value="문의">문의</div>
								</div>
							<input type="text" id="boardWritePageBoardTitle" name="title"
								placeholder="제목을 입력해주세요." required>
						</div>
					</div>
					<input type="submit" id="boardWritePageSubmit" class="btn">
				</form>
				<div class="textAreaBox">
					<div id="boardWritePageBoardText" class="textArea"
						contenteditable="true"></div>
				</div>
				<div id="boardWritePageImageInputBox">
					<div id="boardWritePageWarning">
						<div>* 이미지를 업로드 하신 후 클릭을 하셔야 본문에 첨부됩니다.</div>
						<div>* 하단 썸네일을 클릭하시면 본문에 추가됩니다.</div>
						<div id="boardWritePageImageBox"></div>
					</div>
					<div id="boardWritePageImageInputButton">이미지 업로드</div>
					<input type="file" id="fileInput" name="fileInput">
				</div>
				<div id="boardWritePageButtonBox">
				<div id="boardWritePageWriteButton">작성하기</div>
				</div>
			</div>
		</div>
	</div>
		<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>