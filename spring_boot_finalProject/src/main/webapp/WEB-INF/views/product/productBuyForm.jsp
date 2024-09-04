<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제 페이지</title>
<c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
<script src="<c:url value='/js/productBuyForm.js'/>"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="productBuyView">
			<div id="productBuyViewContainer" class="noto-sans-kr">
				<div id="productBuyTitleBox">
					<div id="productBuyTitle">상품 구매</div>
					<div id="productBuySubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
				</div>

				<form id="productBuyMain" method="post" action="<c:url value='/prd/prdBuy' />">
					<!-- 주문 요약 -->
					<div id="orderSummary">
						<h2>주문 상품 정보</h2>
						<c:forEach var="cart" items="${cartList }">
							<div class="orderItem">
								<div class="cartNo" data-value="${cart.cartNo }"></div>
								<div class="orderItemImage">
									<img src="<c:url value='/images/${cart.prdImg }'/>" alt="상품 이미지" class="orderItemImage">
								</div>
								<div class="orderItemDetails">
									<div class="orderItemName">${cart.prdName }</div>
									<div class="orderItemOption">
										옵션: <span>${cart.prdSize }</span>
									</div>
									<div class="orderItemQuantity">
										수량: <span>${cart.cartQty }</span>
									</div>
									<div class="orderItemPrice">
										개당 가격: <span>${cart.prdPrice }</span>
									</div>
									<div class="orderItemTotalPrice">
										총 가격: <span></span>
									</div>
								</div>
							</div>
						</c:forEach>
					</div>

					<!-- 배송 정보 -->
					<div id="shippingInfo">
						<h2>배송 정보</h2>
						<div class="shippingField">
							<img src="<c:url value='/image/mapManager.png'/>" class="productBuyImage">
							<input type="text" id="recipientName" name="ordReceiver" placeholder="수령인 이름" value="${vo.memName }" required>
						</div>
						<div class="shippingField">
							<img src="<c:url value='/image/mapNumber.png'/>" class="productBuyImage">
							<input type="text" id="recipientPhone" name="ordRcvPhone" placeholder="전화번호" value="${vo.memHp }" required>
						</div>
						<div class="shippingField">
							<img src="<c:url value='/image/mapGymAddress.png'/>" class="productBuyImage">
							<input type="hidden" id=recipientZipCode name="ordZipcode" value="${vo.memZipcode }">
							<input type="text" id="recipientAddress" name="ordAddress1" placeholder="주소" value="${vo.memAddress1 }" required>
							<input type="button" id="searchZipBtn" name="searchZipBtn" value="주소검색" class="inBtn">
						</div>
						<div class="shippingField">
							<img src="<c:url value='/image/myPageAddress.png'/>" class="productBuyImage">
							<input type="text" id="shippingAddress2" name="ordAddress2" placeholder="상세 주소" value="${vo.memAddress2 }">
						</div>
						<div class="shippingField">
							<img src="<c:url value='/image/payGymRegister.png'/>" class="productBuyImage">
							<input type="text" id="shippingMemo" name="ordRcvMsg" placeholder="배송 메모">
						</div>
					</div>

					<!-- 결제 정보 -->
					<div id="paymentInfo">
						<h2>결제 정보</h2>

						<div id="paymentOptions">
							<div class="paymentOption">
								<input type="radio" id="creditCard" name="paymentMethod" value="creditCard" checked>
								<label for="creditCard">신용카드</label>
							</div>
							<div class="paymentOption">
								<input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer">
								<label for="bankTransfer">계좌이체</label>
							</div>
							<div class="paymentOption">
								<input type="radio" id="kakaoPay" name="paymentMethod" value="kakaoPay">
								<label for="kakaoPay">카카오페이</label>
							</div>
							<div class="paymentOption">
								<input type="radio" id="naverPay" name="paymentMethod" value="naverPay">
								<label for="naverPay">네이버페이</label>
							</div>
						</div>
						<div id="orderTotal">
							<div id="orderTotalLabel">총 결제 금액:</div>
							<div id="orderTotalValue"></div>
						</div>


						<div id="buyButtons">
							<button id="cancelButton">취소하기</button>
							<input type="submit" value="결제하기" id="confirmBuyButton">
						</div>
				</form>
				
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
