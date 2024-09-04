<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>체육관 정보</title>
<script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
<script src="<c:url value='/js/mapRegistGym.js'/>"></script>
<script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=220b65eklm&submodules=geocoder"></script>
<script src="<c:url value='/js/map.js'/>"></script>
<c:import url="/WEB-INF/views/layout/head.jsp" />
</head>
<body>
	<div class="bodyContents"></div>
	<div id="mapView">
		<div id="mapViewContainer" class="noto-sans-kr">
			<div id="mapViewTitleBox">
				<div id="mapViewTitle">체육관 선택</div>
				<div id="mapViewSubTitle">원하는 체육관을 검색 후 아래 선택 버튼을 클릭해주세요</div>
			</div>

			<div id="mapViewContentsBox">
				<div id="mapViewLeftBox">
					<div id="mapSearchBox">
						<img id="mapSearch" src="<c:url value='/image/mapSearch.png' />">
						<input type="text" id="gymNameSearch" name="gymNameSearch"
							placeholder="도장 검색" value="">
					</div>
					<div id="mapViewGymBox1">
						<c:forEach var="glist" items="${gymNameList }">
							<div class="mapViewGymEach">${glist.gymName}</div>
						</c:forEach>
					</div>
					<div id="mapViewGymBox2">
						<div id="mapViewGymSearchBox"></div>
					</div>
				</div>
				<div id="mapViewRightBox">
					<div id="mapViewGymInfo">
						<div id="map"></div>
						<div>
							<input type="hidden" id="gymPointX" value=""> 
							<input type="hidden" id="gymPointY" value=""> 
							<input type="hidden" id="gymAddress" value="">
							<input type="hidden" id="chk" value="${chk }"> 
							<input type="hidden" id="pointX" value="${pointX }"> 
							<input type="hidden" id="pointY" value="${pointY }"> 
							<input type="hidden" id="memAddress" value="${address }"> 
							<input type="hidden" id="memCtg" value="${memCtg }">
							<%-- <input type="hidden" id="nowUser" value="${nowUser }">  --%>
						</div>
						<div id="mapViewGymName"></div>
						<div class="mapViewGymContents"><img id="mapManager" src="<c:url value='/image/mapManager.png'/>" class="mapImage"><span id="mapManagerText"></span></div>
						<div class="mapViewGymContents"><img id="mapNumber" src="<c:url value='/image/mapNumber.png'/>" class="mapImage"><span id="mapNumberText"></span></div>
						<div class="mapViewGymContents"><img id="mapGymNumber" src="<c:url value='/image/mapGymNumber.jpg'/>" class="mapImage"><span id="mapGymNumberText"></span></div>
						<div class="mapViewGymContents"><img id="mapGymAddress" src="<c:url value='/image/mapGymAddress.png'/>" class="mapImage"><span id="mapGymAddressText"></span></div>
						<div id="mapViewLink"><span id="mapGymLink"></span></a></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>