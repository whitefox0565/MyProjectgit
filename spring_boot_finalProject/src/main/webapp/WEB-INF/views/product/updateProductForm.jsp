<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert Product</title>
	<script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
	<script src="<c:url value='/js/updateProductForm.js'/>"></script>
	<c:import url="/WEB-INF/views/layout/head.jsp" />
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp" />
	<div class="bodyContents">
		<div id="insertProductPage">
			<div id="insertProductPageContainer" class="noto-sans-kr">
				<div id="insertProductPageTitleBox">
					<div id="insertProductPageTitle">상품 판매</div>
					<div id="insertProductPageSubTitle">편리한 쇼핑, 다양한 상품이 한 자리에</div>
				</div>
					<div id="prdNo" data-prd-no="${pvo.prdNo }"></div>
					<div id="prdImg" data-prd-img="${pvo.prdImg }"></div>
					<div id="insertProductPageBox">
						<div class="insertProductPageInputBox">
						<label for="prdName">상품이름</label>
						<div class="insertProductPageSelect">
							<div class="insertProductPageSelectPlaceholder">
								${pvo.ctgId }
								<div class="insertProductPageDown"></div>
							</div>
							<div class="insertProductPageSubSelect">
								<div class="insertProductPageSubSelectEach" data-value="도복 및 띠">도복 및 띠</div>
								<div class="insertProductPageSubSelectEach" data-value="쌍절곤">쌍절곤</div>
							</div>
							<input type="text" id="prdName" name="prdName" value="${pvo.prdName }" required>
						</div>
						</div>
						<div class="insertProductPageInputBox">
							<label for="prdPrice">가격</label>
							<input type="text" id="prdPrice" name="prdPrice" value="${pvo.prdPrice }" required>
						</div>
					</div>
					<div class="textAreaBox">
						<label for="prdMain">메인 상품정보</label>
						<div id="prdMain" class="textArea" contenteditable="true">${pvo.prdMain }</div>
					</div>
					<div id="productMainImageInputBox">
						<div id="productMainImageInputButton">이미지 업로드</div>
						<input type="file" id="fileInputMain" name="fileInputMain">
						<div id="productMainImageBox"></div>
					</div>
					<div class="textAreaBox">
						<label for="prdDetail">상세 상품정보</label>
						<div id="prdDetail" class="textArea" contenteditable="true">${pvo.prdDetail }</div>
					</div>
					<div id="productDetailImageInputBox">
						<div id="productDetailImageInputButton">이미지 업로드</div>
						<input type="file" id="fileInputDetail" name="fileInputDetail">
						<div id="productDetailImageBox"></div>
					</div>
					<div id="insertProductPageButtonBox">
						<input type="submit" id="updatePrdBtn" class="btn" value="수정">
					</div>
			</div>
		</div>
	</div>
	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
