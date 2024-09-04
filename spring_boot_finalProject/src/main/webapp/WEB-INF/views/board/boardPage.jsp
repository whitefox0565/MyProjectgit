<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="/WEB-INF/views/layout/head.jsp" />
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="boardPage">
			<div id="boardPageContainer" class="noto-sans-kr">
				<div id="boardPageTitleBox">
					<div id="boardPageTitle">게시판</div>
					<c:if test="${empty msg }">
						<div id="boardPageSubTitle">소통의 장, 다양한 의견을 공유하세요</div>
					</c:if>
				</div>
				
				<c:set var="menuItems" value="${fn:split('공지,중고,문의,자유,내 글', ',')}" />
				<c:set var="submenuItems" value="${fn:split('사항,거래,사항,게시판,', ',')}" />
				<c:set var="selectedCtg" value="${ctg}" />
				
				<div id="boardPageMenuBox">
				    <c:forEach items="${menuItems}" var="item" varStatus="status">
				        <c:choose>
				            <c:when test="${item eq selectedCtg}">
				                <div class="boardPageMenuEach" style="font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 4px;">
				                    <a href="/board?ctg=${item}">${item}${submenuItems[status.index]}</a>
				                </div>
				            </c:when>
				            <c:otherwise>
				                <div class="boardPageMenuEach">
				                    <a href="/board?ctg=${item}">${item}${submenuItems[status.index]}</a>
				                </div>
				            </c:otherwise>
				        </c:choose>
				    </c:forEach>
				</div>
				
				<div id="boardPageBoardList">
					<c:if test="${not empty msg }">
						<div id="boardPageSubTitle">${msg }</div>
					</c:if>
					<c:forEach var="board" items="${boards}">
						<div class="boardPageBoardListRow">
							<div class="boardPageBoardCtg boardPageBoardCell">
								<div id="boardPageBoardCtgEach">${board.boardCtg}</div>
							</div>
							<div class="boardPageBoardTitle boardPageBoardCell">
								<a href="/boardPage?ctg=${board.boardCtg}&boardNo=${board.boardNo}">${board.title}</a>
							</div>
							<div class="boardPageBoardNick boardPageBoardCell"><img id="boardManager" class= "boardPageImage" src="<c:url value='/image/mapManager.png' />">${board.memNick}</div>
							<div class="boardPageBoardTime boardPageBoardCell"><img id="boardTime" class= "boardPageImage" src="<c:url value='/image/boardTime.png' />">${board.formatDate}</div>
							<div class="boardPageBoardView boardPageBoardCell"><img id="boardView" class= "boardPageImage" src="<c:url value='/image/boardView.png' />">${board.viewNum}</div>
						</div>
					</c:forEach>
				</div>
				<div id="boardPageButtonBox">
					<c:if test="${empty msg }">
						<div class="boardPageWriteButton">
							<a href="<c:url value='/boardWritePage' />">글쓰기</a>
						</div>
					</c:if>
				</div>
				<!-- Pagination -->
				<c:if test="${totalPages > 0 }">
					<div class="boardPagePagination">
						<div class="boardPagePaginationMove">
							<div class="boardPagePaginationDoubleLeft"></div>
							<div class="boardPagePaginationDoubleLeft"></div>
						</div>
						<div class="boardPagePaginationMove">
							<div class="boardPagePaginationDoubleLeft"></div>
						</div>
					<c:forEach var="i" begin="1" end="${totalPages}">
							<a href="?ctg=${ctg }&page=${i}&pageSize=${pageSize}"
								class="${i == currentPage ? 'active' : ''}">${i}</a>
						</c:forEach>
						<div class="boardPagePaginationMove">
							<div class="boardPagePaginationDoubleRight"></div>
						</div>
						<div class="boardPagePaginationMove">
							<div class="boardPagePaginationDoubleRight"></div>
							<div class="boardPagePaginationDoubleRight"></div>
						</div>
					</div>
				</c:if>
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>