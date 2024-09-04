<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <c:import url="/WEB-INF/views/layout/head.jsp" />
  <script src="<c:url value='/js/boardAddComment.js'/>"></script>
  <script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
 </head>
 <body>
    <c:import url="/WEB-INF/views/layout/top.jsp" />
   <div class="bodyContents">
      <div id="boardContentPage">
			<div id="boardContentPageContainer" class="noto-sans-kr">
				<div id="boardContentPageTitleBox">
					<div id="boardContentPageTitle">게시판</div>
					<div id="boardContentPageSubTitle">소통의 장, 다양한 의견을 공유하세요</div>
				</div>
				<div id="boardContentPageContentBox">
					<div id="boardContentPageContentInnerBox">
						<div id="boardContentPageContentInfoBox">
							<div id="boardContentPageContentTitleBox">
								<div id="boardContentPageContentCtg">${vo.boardCtg }</div>
								<div id="boardContentPageContentTitle">${vo.title }</div>
							</div>
							<div id="boardContentPageSubInfoBox">
								<div id="boardContentPageNick" class="boardContentPageSubInfo">
									<img id="boardManager" class="boardContentPageImage"
										src="<c:url value='/image/mapManager.png' />">${vo.memNick}
								</div>
								<div id="boardContentPageTime" class="boardContentPageSubInfo">
									<img id="boardTime" class="boardContentPageImage"
										src="<c:url value='/image/boardTime.png' />">${vo.formatDate}
								</div>
								<div id="boardContentPageView" class="boardContentPageSubInfo">
									<img id="boardView" class="boardContentPageImage"
										src="<c:url value='/image/boardView.png' />">${vo.viewNum}
								</div>
								<div id="boardContentPageView" class="boardContentPageSubInfo">
									<img id="boardView" class="boardContentPageImage"
										src="<c:url value='/image/myPageGym.png' />">${vo.gymName}
								</div>
							</div>
						</div>
						<div class="textAreaBox">
							<div id="boardContentPageBoardText" class="textArea">${vo.content }</div>
						</div>
						<c:if test="${vo.memId eq sessionScope.sid}">
							<div id="boardContentPageButtonBox">
								<div id="boardContentPageModifyButton">
									<a href="/boardUpdatePage?boardNo=${vo.boardNo }">수정하기</a>
								</div>
								<div id="boardContentPageDeleteButton">
									<a href="/boardDelete?ctg=${vo.boardCtg }&boardNo=${vo.boardNo }">삭제하기</a>
								</div>
							</div>
						</c:if>

						<div id="boardContentPageCommentAlarm">
							<img id="boardManager" class="boardContentPageImage"
								src="<c:url value='/image/comment.png' />"> 댓글
						</div>
						<div id="boardContentPageCommentBox">
							<div id="boardContentPageCommentImgArea"></div>
							<input type="hidden" id="memId" value="${sessionScope.sid }">
							<input type="hidden" id="memNick" value="${sessionScope.sidNick }">
							<textarea id="boardContentPageComment" rows="7" cols="100"></textarea>
						</div>
						<div id="boardContentPageCommentButtonBox">
							<input type="file" id="addImgBtn">
							<div class="boardContentPageCommentBtn"
								id="boardContentPageCommentImageButton">이미지 추가</div>
							<input type="button" class="boardContentPageCommentBtn"
								id="addCommentBtn" value="작성하기" required>
						</div>
						<div class="result"></div>

					</div>
				</div>
			</div>
		</div>
 </body>
 <c:import url="/WEB-INF/views/layout/bottom.jsp" />
</html>