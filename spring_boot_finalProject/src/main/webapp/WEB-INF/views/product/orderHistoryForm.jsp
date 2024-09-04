<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>결제내역</title>
    <c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
    <script src="<c:url value='/js/orderHistory.js'/>"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/layout/top.jsp" />

    <div class="bodyContents">
        <div id="orderHistoryView">
            <div id="orderHistoryViewContainer" class="noto-sans-kr">
                <div id="orderHistoryTitleBox">
                    <div id="orderHistoryTitle">상품 판매</div>
                    <div id="orderHistorySubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
                </div>

                <div id="orderHistoryMain">
                    <c:forEach var="ordList" items="${hisList}">
                        <div class="orderItem">
                            <div class="orderItemHeader">
                                <div class="orderDate">${ordList.ordDateFmt }</div>
                                <div class="orderNumber">주문번호: <span>${ordList.ordNo }</span></div>
                            </div>
                            <div class="orderItemDetails">
                                <c:forEach var="prdList" items="${ordList.ordList}">
                                    <div class="orderItemDetail">
                                        <img src="<c:url value='/images/${prdList.prdImg }'/>" alt="상품 A 이미지" class="orderItemImage">
                                        <div class="orderItemInfo">
                                            <div class="orderItemName">${prdList.prdName }</div>
                                            <div class="orderItemSize">옵션: <span>${prdList.ordOption }</span></div>
                                            <div class="orderItemQuantity">수량: <span>${prdList.ordQty }</span></div>
                                            <div class="orderItemPrice">개당 가격: <span>${prdList.prdPrice }</span></div>
                                            <div class="orderItemTotalPrice">총 가격: <span>${prdList.prdPrice * prdList.ordQty }</span></div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>

    <c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
