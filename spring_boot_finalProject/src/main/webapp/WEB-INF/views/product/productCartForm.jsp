<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>장바구니</title>
<c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
<script src="<c:url value='/js/productCartForm.js'/>"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/layout/top.jsp" />
    <div class="bodyContents">
        <div id="productCartView">
            <div id="productCartViewContainer" class= "noto-sans-kr">
                <div id="productCartTitleBox">
                    <div id="productCartTitle">상품 판매</div>
                    <div id="productCartSubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
                </div>

                <div id="productCartMain">
                    <div id="cartItems">
                    	<c:forEach var="cart" items="${cartList }"> 
	                        <div class="cartItem">
	                            <input type="checkbox" id="item1" class="cartItemCheckbox" checked>
	                            <img src="<c:url value='/images/${cart.prdImg }'/>" alt="상품 이미지" class="cartItemImage">
	                            <div class="cartItemInfo">
	                                <div class="cartItemName">${cart.prdName }</div>
	                                <div class="cartItemPrice">${cart.prdPrice }</div>
									<div class="cartItemSelect">
										<div class="cartItemSelectPlaceholder" data-value="${cart.prdSize }">
											${cart.prdSize }
											<div class="cartItemDown"></div>
										</div>
										<div class="cartItemSubSelect">
											<div class="cartItemSubSelectEach">4XS (110)</div>
											<div class="cartItemSubSelectEach">CM (120~130)</div>
											<div class="cartItemSubSelectEach">XS (140)</div>
											<div class="cartItemSubSelectEach">S (150)</div>
											<div class="cartItemSubSelectEach">M (160)</div>
											<div class="cartItemSubSelectEach">L (170)</div>
											<div class="cartItemSubSelectEach">XL (180)</div>
											<div class="cartItemSubSelectEach">2XL (190)</div>
											<div class="cartItemSubSelectEach">3XL (200~210)</div>
										</div>
									</div>
									<div class="cartItemQuantity">
	                                    <div class="quantityMinusButton" id="quantityButton">-</div>
	                                    <span class="quantityNumber" id="quantityNumber1">${cart.cartQty }</span>
	                                    <div class="quantityPlusButton" id="quantityButton">+</div>
	                                </div>
	                                <div class="cartItemTotalPrice" id="totalPrice1"></div>
	                            </div>
	                            <div class="cartNo" data-value="${cart.cartNo }"></div>
	                        </div>
                        </c:forEach>
                    </div>

					<div id="cartTotal">
						<div id="totalPriceLabel">총 합계:</div>
						<div id="totalPriceValue"></div>
					</div>

					<div id="cartButtons">
							<button class = "leftBtn" id="CartCheckAllButton">전체 선택</button>
						<div id = "rightBtns">
						<button class = "rightBtn" id="clearCartButton">삭제하기</button>
						<div id = "cartPayButton"> <a href="<c:url value='/prd/productBuyForm' />">결제하기</a></div> 
						</div>
					</div>
				</div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
