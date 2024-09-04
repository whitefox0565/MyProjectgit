<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품 판매</title>
<c:import url="/WEB-INF/views/layout/head.jsp" />
<script src="<c:url value='/js/productForm.js'/>"></script>
<script src="<c:url value='/js/productSearch.js'/>"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/layout/top.jsp" />
    <div class="bodyContents">
        <div id="productUniformView">
            <div id="productUniformViewContainer" class="noto-sans-kr">
                <div id="productUniformViewTitleBox">
                    <div id="productUniformViewTitle">상품 판매</div>
                    <div id="productUniformViewSubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
                </div>
                
                <c:set var="categories" value="${fn:split('도복 및 띠, 쌍절곤', ',')}" />
                <c:set var="selectedCategory" value="${ctg}" /> <!-- 임시로 카테고리 설정 -->
                
                <div id="productUniformViewMenuBox">
                	<div id = "productUniformViewMenuBox2">
	                    <c:forEach items="${categories}" var="item">
	                        <c:choose>
	                            <c:when test="${item eq selectedCategory}">
	                                <div class="productUniformViewMenuEach" style="font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 4px;">
	                                    <a href="/prd/prdForm?ctg=${item}">${item}</a>
	                                </div>
	                            </c:when>
	                            <c:otherwise>
	                                <div class="productUniformViewMenuEach">
	                                    <a href="/prd/prdForm?ctg=${item}">${item}</a>
	                                </div>
	                            </c:otherwise>
	                        </c:choose>
	                    </c:forEach>
                    </div>
                    <form id="prdSearchForm" method="get" action="<c:url value='/prd/prdSearch' />">
                    	<img id="mapSearch" src="<c:url value='/image/mapSearch.png' />">
                    	<input type="text" id="prdSearch" name="keyword">
                    	<input type="submit" id="prdSearchBtn" value="검색">
                    </form>
                    
                </div>

				<div id="productUniformViewList">
					<c:forEach var="prd" items="${prdList}">
						<div class="productUniformViewListRow">
							<div class="productUniformViewImageCell">
								<img src="<c:url value='/images/${prd.prdImg}' />" alt="${prd.prdName}"
									class="productUniformViewImage">
							</div>
							<div class="productUniformViewTitleCell">
								<a href="/prd/productDetailForm?prdNo=${prd.prdNo}">${prd.prdName}</a>
							</div>
							<div class="productUniformViewPriceCell">${prd.prdPrice}원</div>
							<%-- <div class="productUniformViewSellerCell">${prd.seller}</div> --%>
						</div>
					</c:forEach>
				</div>
				
				<c:if test="${not empty sessionScope.sidGymNo }">
					<div id="productUniformViewButtonBox">
	                    <div class="productUniformViewWriteButton">
	                        <a href="<c:url value='/prd/insertProductForm' />">상품 등록</a>
	                    </div>
	                </div>
				</c:if>
				
                <div class="productUniformViewPagination">
                    <div class="productUniformViewPaginationMove">
                        <div class="productUniformViewPaginationDoubleLeft"></div>
                        <div class="productUniformViewPaginationDoubleLeft"></div>
                    </div>
                    <div class="productUniformViewPaginationMove">
                        <div class="productUniformViewPaginationDoubleLeft"></div>
                    </div>
                    <div id="productUniformViewNumberBox">
                        <c:forEach var="i" begin="1" end="${totalPages}">
                            <a href="?ctg=${ctg}&page=${i}&pageSize=${pageSize}" class="${i == currentPage ? 'active' : ''}">${i}</a>
                        </c:forEach>
                    </div>
                    <div class="productUniformViewPaginationMove">
                        <div class="productUniformViewPaginationDoubleRight"></div>
                    </div>
                    <div class="productUniformViewPaginationMove">
                        <div class="productUniformViewPaginationDoubleRight"></div>
                        <div class="productUniformViewPaginationDoubleRight"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
