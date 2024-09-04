<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>체육관</title>
<c:import url="/WEB-INF/views/layout/head.jsp"></c:import>
<script src="<c:url value='/js/mainPage.js'/>"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/layout/top.jsp"></c:import>
	<c:if test="${empty sessionScope.sid }">
	<div id="mainPage" class="noto-sans-kr">
	    <div class="mainPageContainer">
	        <div id="mainPageFirstContainer">
	            <img id="mainPageFirst1" src="<c:url value='/image/mainPageFirst.jpg' />">
	            <div id="mainPageFirstBox1">
	                <div id="mainPageFirstExplain1">
	                    <div id="mainPageFirstTitle">
	                        편리하고 스마트한 훈련 <br>통합된 시스템으로 간편하게
	                    </div>
	                </div>
	                <div id="mainPageFirstLink">
	                    <a href="<c:url value='/member/joinChoose' />">무료로 시작하기</a>
	                </div>
	            </div>
	        </div>
	    </div>
	
	    <div class="mainPageContainer">
	        <div id="mainPageMapContainer">
	            <div id="mainPageMapBox1">
	                <div id="mainPageMapExplain1">
	                    <div id="mainPageMapTitle">
	                        탐색, <br>누구나 쉽고 빠르게
	                    </div>
	                </div>
	                <div id="mainPageMapBox2">
	                    <div id="mainPageMapExplain2">
	                        <div id="mainPageMapContents">
	                            내 위치 주변의 체육관을 <br>지도에서 한 눈에
	                        </div>
	                    </div>
	                    <img id="mainPageMap1" src="<c:url value='/image/mainPageMap.png' />">
	                    <div id="mainPageMapExplain3">
	                        <div id="mainPageMapContents">
	                            체육관의 자세한 정보를 <br>직관적으로 신속하게
	                        </div>
	                    </div>
	                </div>
	                <div id="mainPageMapLink">
	                    <a href="<c:url value='/member/loginForm' />">체육관 찾아보기</a>
	                </div>
	            </div>
	        </div>
	    </div>
	
	    <div class="mainPageContainer">
	        <div id="mainPageGalleryContainer">
	            <div id="mainPageGalleryBox1">
	                <div id="mainPageGalleryExplain1">
	                    <div id="mainPageGalleryTitle">
	                        체육관의 모든 순간을 한눈에, <br>동적인 활동을 담다
	                    </div>
	                    <div id="mainPageGalleryContents">
	                        우리의 갤러리에서 <br>훈련과 특별한 순간들을<br> 실시간으로 확인하세요.
	                    </div>
	                </div>
	                <img id="mainPageGallery1" src="<c:url value='/image/mainPageGallery1.jpg' />">
	            </div>
	            <div id="mainPageGalleryBox2">
	                <img id="mainPageGallery2" src="<c:url value='/image/mainPageGallery2.jpg' />">
	                <div id="mainPageGalleryExplain2">
	                    <div id="mainPageGalleryContents">
	                        훈련, 행사, 특별한 순간들을 담은 <br>우리의 갤러리를 확인해 보세요. <br>역동적인 순간들이 여러분을 기다립니다.
	                    </div>
	                    <div id="mainPageGalleryLink">
	                        <a href="<c:url value='/member/loginForm' />">갤러리 방문하기</a>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	
	    <div class="mainPageContainer">
	        <div id="mainPageUniformContainer">
	            <div id="mainPageUniformExplain">
	                <div id="mainPageUniformTitle">
	                    최고의 훈련을 위한 <br> 완벽한 준비
	                </div>
	                <div id="mainPageUniformContents">
	                    필요한 모든 장비를 지금 바로 확인하고 주문하세요. 신속한 처리와 품질 보장으로 여러분의 훈련을 지원합니다.
	                </div>
	            </div>
	            <div id="mainPageUniformLink">
	                <a href="<c:url value='/member/loginForm' />">상품 구매하기</a>
	            </div>
	            <div id="mainPageUniformBox">
	                <img id="mainPageUniform1" src="<c:url value='/image/mainPageUniform1.jpg' />">
	                <img id="mainPageUniform2" src="<c:url value='/image/mainPageUniform2.jpg' />">
	                <img id="mainPageUniform3" src="<c:url value='/image/mainPageUniform3.jpg' />">
	            </div>
	        </div>
	    </div>
	</div>
	</c:if>
	<c:if test="${not empty sessionScope.sid}">
		<div id="mainPage" class="noto-sans-kr">
		    <div class="mainPageContainer">
		        <div id="mainPageFirstContainer">
		            <img id="mainPageFirst1" src="<c:url value='/image/mainPageFirst.jpg' />">
		            <div id="mainPageFirstBox1">
		                <div id="mainPageFirstExplain1">
		                    <div id="mainPageFirstTitle">
		                        편리하고 스마트한 훈련 <br>통합된 시스템으로 간편하게
		                    </div>
		                </div>
		                <div id="mainPageFirstLink">
		                    <a href="<c:url value='/gym/joinAndPayGym' />">체육관 등록하기</a>
		                </div>
		            </div>
		        </div>
		    </div>
	
		    <div class="mainPageContainer">
		        <div id="mainPageMapContainer">
		            <div id="mainPageMapBox1">
		                <div id="mainPageMapExplain1">
		                    <div id="mainPageMapTitle">
		                        탐색, <br>누구나 쉽고 빠르게
		                    </div>
		                </div>
		                <div id="mainPageMapBox2">
		                    <div id="mainPageMapExplain2">
		                        <div id="mainPageMapContents">
		                            내 위치 주변의 체육관을 <br>지도에서 한 눈에
		                        </div>
		                    </div>
		                    <img id="mainPageMap1" src="<c:url value='/image/mainPageMap.png' />">
		                    <div id="mainPageMapExplain3">
		                        <div id="mainPageMapContents">
		                            체육관의 자세한 정보를 <br>직관적으로 신속하게
		                        </div>
		                    </div>
		                </div>
		                <div id="mainPageMapLink">
		                    <a href="<c:url value='/ai/map' />">체육관 찾아보기</a>
		                </div>
		            </div>
		        </div>
		    </div>
	
		    <div class="mainPageContainer">
		        <div id="mainPageGalleryContainer">
		            <div id="mainPageGalleryBox1">
		                <div id="mainPageGalleryExplain1">
		                    <div id="mainPageGalleryTitle">
		                        체육관의 모든 순간을 한눈에, <br>동적인 활동을 담다
		                    </div>
		                    <div id="mainPageGalleryContents">
		                        우리의 갤러리에서 <br>훈련과 특별한 순간들을<br> 실시간으로 확인하세요.
		                    </div>
		                </div>
		                <img id="mainPageGallery1" src="<c:url value='/image/mainPageGallery1.jpg' />">
		            </div>
		            <div id="mainPageGalleryBox2">
		                <img id="mainPageGallery2" src="<c:url value='/image/mainPageGallery2.jpg' />">
		                <div id="mainPageGalleryExplain2">
		                    <div id="mainPageGalleryContents">
		                        훈련, 행사, 특별한 순간들을 담은 <br>우리의 갤러리를 확인해 보세요. <br>역동적인 순간들이 여러분을 기다립니다.
		                    </div>
		                    <div id="mainPageGalleryLink">
		                        <a href="<c:url value='/' />">갤러리 방문하기</a>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		
		    <div class="mainPageContainer">
		        <div id="mainPageUniformContainer">
		            <div id="mainPageUniformExplain">
		                <div id="mainPageUniformTitle">
		                    최고의 훈련을 위한 <br> 완벽한 준비
		                </div>
		                <div id="mainPageUniformContents">
		                    필요한 모든 장비를 지금 바로 확인하고 주문하세요. 신속한 처리와 품질 보장으로 여러분의 훈련을 지원합니다.
		                </div>
		            </div>
		            <div id="mainPageUniformLink">
		                <a href="<c:url value='/' />">상품 구매하기</a>
		            </div>
		            <div id="mainPageUniformBox">
		                <img id="mainPageUniform1" src="<c:url value='/image/mainPageUniform1.jpg' />">
		                <img id="mainPageUniform2" src="<c:url value='/image/mainPageUniform2.jpg' />">
		                <img id="mainPageUniform3" src="<c:url value='/image/mainPageUniform3.jpg' />">
		            </div>
		        </div>
		    </div>
	</div>
	</c:if>
	<c:import url="/WEB-INF/views/layout/bottom.jsp"></c:import>
</body>
</html>