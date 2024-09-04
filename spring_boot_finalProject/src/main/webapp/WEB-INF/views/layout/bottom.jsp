<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<footer>
	<c:if test="${not empty sessionScope.sid }">
    <div id="headerBottom">
	    <div id="bottomContainer">
	        <div id="bottomMenuContainer">
	            <div id="bottomMenuLeftBox">
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">기능</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/ai/map' />">체육관 정보</a></li>
	                        <li><a href="<c:url value='/gym/joinAndPayGym' />">회비 납부</a></li>
	                        <li><a href="#">특수활동 납부</a></li>
	                        <li><a href="#">심사 납부</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">상품</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="#">도복 및 띠</a></li>
	                        <li><a href="#">쌍절곤</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">특수활동</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="#">공고</a></li>
	                        <li><a href="#">갤러리</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">게시판</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/board?ctg=공지' />">공지사항</a></li>
	                        <li><a href="<c:url value='/board?ctg=문의' />">문의사항</a></li>
	                        <li><a href="<c:url value='/board?ctg=중고' />">중고거래</a></li>
	                        <li><a href="<c:url value='/board?ctg=자유' />">자유게시판</a></li>
	                    </ul>
	                </div>
	            </div>
	            <div id="bottomMenuRightBox">
	                <div id="bottomMenuInfoBox">
	                    <div id="bottomMenuInfoTitle" class="yeon-sung">FitHub</div>
	                    <div id="bottomMenuInfoContents" class="noto-sans-kr">
	                        FitHub은 통합 체육관 관리 솔루션으로, 회원 관리, 결제 처리, 마케팅 도구 등을 하나의 플랫폼에서 손쉽게
	                        관리할 수 있게 해줍니다. 사용자 친화적인 인터페이스와 강력한 기능을 통해 체육관 운영의 효율성을 극대화하고, 고객
	                        만족도를 높일 수 있는 완벽한 도구를 제공합니다.
	                    </div>
	                    <!-- <div id="bottomMenuInfoLink">
	                        <a href="#"><div id="bottomMenuInfoIntro" class="noto-sans-kr">소개</div></a>
	                        <a href="#"><div id="bottomMenuInfoAsk" class="noto-sans-kr">문의하기</div></a>
	                    </div> -->
	                </div>
	            </div>
	        </div>
	
	        <div id="bottomInfoContainer" class="noto-sans-kr">
	            <div id="bottomInfoBox">
	                <span><a href="#">이용약관</a></span>
	                <span class="divider"></span>
	                <span><a href="#">개인정보 처리방침</a></span>
	                <span class="divider"></span>
	                <span>2024-2024 FitHub.com, Inc</span>
	            </div>
	        </div>
	    </div>
	</div>
    </c:if>
    <c:if test="${empty sessionScope.sid }">
    <div id="headerBottom">
	    <div id="bottomContainer">
	        <div id="bottomMenuContainer">
	            <div id="bottomMenuLeftBox">
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">기능</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/member/loginChoose' />">체육관 정보</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">회비 납부</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">특수활동 납부</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">심사 납부</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">상품</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/member/loginChoose' />">도복 및 띠</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">쌍절곤</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">특수활동</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/member/loginChoose' />">공고</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">갤러리</a></li>
	                    </ul>
	                </div>
	                <div class="bottomMenuEachBox">
	                    <div class="bottomMenuTitle noto-sans-kr">게시판</div>
	                    <ul class="bottomMenuContents noto-sans-kr">
	                        <li><a href="<c:url value='/member/loginChoose' />">공지사항</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">문의사항</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">중고거래</a></li>
	                        <li><a href="<c:url value='/member/loginChoose' />">자유게시판</a></li>
	                    </ul>
	                </div>
	            </div>
	            <div id="bottomMenuRightBox">
	                <div id="bottomMenuInfoBox">
	                    <div id="bottomMenuInfoTitle" class="yeon-sung">FitHub</div>
	                    <div id="bottomMenuInfoContents" class="noto-sans-kr">
	                        FitHub은 통합 체육관 관리 솔루션으로, 회원 관리, 결제 처리, 마케팅 도구 등을 하나의 플랫폼에서 손쉽게
	                        관리할 수 있게 해줍니다. 사용자 친화적인 인터페이스와 강력한 기능을 통해 체육관 운영의 효율성을 극대화하고, 고객
	                        만족도를 높일 수 있는 완벽한 도구를 제공합니다.
	                    </div>
	                    <!-- <div id="bottomMenuInfoLink">
	                        <a href="#"><div id="bottomMenuInfoIntro" class="noto-sans-kr">소개</div></a>
	                        <a href="#"><div id="bottomMenuInfoAsk" class="noto-sans-kr">문의하기</div></a>
	                    </div> -->
	                </div>
	            </div>
	        </div>
	
	        <div id="bottomInfoContainer" class="noto-sans-kr">
	            <div id="bottomInfoBox">
	                <span><a href="#">이용약관</a></span>
	                <span class="divider"></span>
	                <span><a href="#">개인정보 처리방침</a></span>
	                <span class="divider"></span>
	                <span>2024-2024 FitHub.com, Inc</span>
	            </div>
	        </div>
	    </div>
	</div>
    </c:if>
</footer>
