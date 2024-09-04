<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
<script src="<c:url value='/js/productDetailForm.js'/>"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="productDetailView">
			<div id="productDetailViewContainer" class="noto-sans-kr">
				<div id="productDetailTitleBox">
					<div id="productDetailTitle">상품 판매</div>
					<div id="productDetailSubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
					<div id="prdNo" data-prdNo="${prdNo }"></div>
				</div>

				<div id="productDetailMain">
					<div id="productDetailImageBox">
						<img src="<c:url value='/images/${pvo.prdImg}' />" alt="${pvo.prdImg}" id="productDetailImage">
					</div>
					<div id="productDetailInfoBox">
						<div id="productDetailNameBox">
							<div id="productDetailName">${pvo.prdName}</div>
							<div id="productDetailCommentLinkDown">
								<img src="<c:url value='/image/Comment.png' />" id="productDetailCommentImage">
								후기 및 문의
							</div>
						</div>
						<div id="productDetailGoodsInfo">
							<div class="productDetailGoodsRows">
								<div class="productDetailCategory">판매가격</div>
								<div class="productDetailcontents">${pvo.prdPrice}원</div>
							</div>
							<div class="productDetailGoodsRows">
								<div class="productDetailCategory">할인율</div>
								<div class="productDetailDisCount">0%</div>
							</div>
							<div class="productDetailGoodsRows">
								<div class="productDetailCategory">적립율</div>
								<div class="productDetailEarn ">0%</div>
							</div>
							<div class="productDetailGoodsRows">
								<div class="productDetailCategory">옵션</div>
								<div class="productDetailSelect">
									<div class="productDetailSelectPlaceholder" data-value="1">
										4XS (110)
										<div class="productDetailDown"></div>
									</div>
									<div class="productDetailSubSelect">
										<div class="productDetailSubSelectEach">4XS (110)</div>
										<div class="productDetailSubSelectEach">CM (120~130)</div>
										<div class="productDetailSubSelectEach">XS (140)</div>
										<div class="productDetailSubSelectEach">S (150)</div>
										<div class="productDetailSubSelectEach">M (160)</div>
										<div class="productDetailSubSelectEach">L (170)</div>
										<div class="productDetailSubSelectEach">XL (180)</div>
										<div class="productDetailSubSelectEach">2XL (190)</div>
										<div class="productDetailSubSelectEach">3XL (200~210)</div>
									</div>
								</div>
							</div>
						</div>
						<div id="productDetailQuantityBox">
							<div id="productDetailQuantity">
								<div id="productDetailQuantityMinus">-</div>
								<div id="productDetailQuantityNumber">1</div>
								<div id="productDetailQuantityplus">+</div>
							</div>
							<div id="productDetailSumPrice">${pvo.prdPrice}원</div>
						</div>
						<div id="productDetailTotalPriceBox">
							<div id="productDetailTotalPrice">총 상품 가격</div>
							<div id="productDetailTotalPriceNumber">${pvo.prdPrice}원</div>
						</div>
						<div id="productDetailButtons">
							<c:if test="${pvo.memId ne sessionScope.sid }">
								<input type="button" id="addToCartButton" value="장바구니">
								<input type="button" id="buyNowButton" value="구매하기">
							</c:if>
							<c:if test="${pvo.memId eq sessionScope.sid }">
								<div id="addToCartButton">
									<a href="<c:url value='/prd/updatePrd/${prdNo}' />">상품수정</a>
								</div>
								<div id="buyNowButton">
									<a id="prdDeleteBtn" href="<c:url value='/prd/prdDelete/${prdNo}/${pvo.ctgId }' />">상품삭제</a>
								</div>
							</c:if>
						</div>
					</div>
				</div>

				<div id="productDetailAdditionalImages">${pvo.prdDetail}</div>

				<div id="productDetailCommentContainer" class="noto-sans-kr">

					<c:set var="menuItems" value="${fn:split('후기,문의', ',')}" />
					<c:set var="selectedCtg" value="${ctg}" />

					<div id="productDetailMenuBox">
						<c:forEach items="${menuItems}" var="item" varStatus="status">
							<c:choose>
								<c:when test="${item eq selectedCtg}">
									<div class="productDetailMenuEach" style="font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 4px;">
										<a href="?prdNo=${prdNo }&ctg=${item }">상품${item}</a>
									</div>
								</c:when>
								<c:otherwise>
									<div class="productDetailMenuEach">
										<a href="?prdNo=${prdNo }&ctg=${item }">상품${item}</a>
									</div>
								</c:otherwise>
							</c:choose>
						</c:forEach>
						<div id="productDetailCommentLinkUp">
							<img src="<c:url value='/image/Comment.png' />" id="productDetailCommentImage">
							상품 상세
						</div>
					</div>

					<div id="productDetailBoardList">
						<c:forEach var="prdBoard" items="${prdBoardList}">
							<div class="productDetailBox">
								<div class="productDetailBoardListRow">
									<div class="productDetailBoardCtg productDetailBoardCell">
										<div id="productDetailBoardCtgEach">${prdBoard.prdBoardCtg}</div>
									</div>
									<div class="productDetailBoardTitle productDetailBoardCell">
										<input type="text" class="prdBoardTitle" value="${prdBoard.prdTitle}" data-value="${prdBoard.prdBoardNo}" readonly>
									</div>
									<div class="productDetailBoardNick productDetailBoardCell">
										<img id="boardManager" class="productDetailImage" src="<c:url value='/image/mapManager.png' />">${prdBoard.memNick}
									</div>
									<div class="productDetailBoardTime productDetailBoardCell">
										<img id="boardTime" class="productDetailImage" src="<c:url value='/image/boardTime.png' />">${prdBoard.formatDate}
									</div>
									<div class="productDetailBoardView productDetailBoardCell">
										<img id="boardView" class="productDetailImage" src="<c:url value='/image/boardView.png' />">
										<span class="viewNumEach">${prdBoard.viewNum}</span>
									</div>
								</div>
								<div class="productDetailContentEach" data-value="false"></div>
							</div>
						</c:forEach>
					</div>
					<div id="productDetailButtonBox">
						<div class="productDetailWriteButton">
							<a href="<c:url value='/prd/prdBoardWriteForm?prdNo=${prdNo }' />">글쓰기</a>
						</div>
					</div>

					<c:if test="${totalPages > 0 }">
						<div class="productDetailPagination">
							<div class="productDetailPaginationMove">
								<div class="productDetailPaginationDoubleLeft"></div>
								<div class="productDetailPaginationDoubleLeft"></div>
							</div>
							<div class="productDetailPaginationMove">
								<div class="productDetailPaginationDoubleLeft"></div>
							</div>

							<c:forEach var="i" begin="1" end="${totalPages}">
								<a href="?prdNo=${prdNo }&ctg=${ctg }&page=${i}&pageSize=${pageSize}" class="${i == currentPage ? 'active' : ''}">${i}</a>
							</c:forEach>

							<div class="productDetailPaginationMove">
								<div class="productDetailPaginationDoubleRight"></div>
							</div>
							<div class="productDetailPaginationMove">
								<div class="productDetailPaginationDoubleRight"></div>
								<div class="productDetailPaginationDoubleRight"></div>
							</div>
						</div>
					</c:if>
				</div>
			</div>
		</div>
	</div>

	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>