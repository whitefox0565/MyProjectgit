<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<header>
	<c:if test="${empty sessionScope.sid }">
	<div id="headerTop">
	    <div id="topContainer">
	        <div id="topLeftBox" class="noto-sans-kr">
	            <div id="logoBox">
	                <a href="<c:url value='/' />">
	                    <img id="logo" src="<c:url value='/image/logo.jpg'/>" alt="Logo">
	                    <div id="logoText" class="yeon-sung">FitHub</div>
	                </a>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/member/loginForm' />">기능
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">체육관 정보</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">회비 납부</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">특수활동 납부</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">심사 납부</a>
	                    </div>
	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/member/loginForm' />">상품
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">상품</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">장바구니</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">주문내역</a>
	                    </div>
	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/member/loginForm' />">특수활동
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">공고</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">갤러리</a>
	                    </div>
	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/member/loginForm' />">게시판
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">공지사항</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">중고거래</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">문의사항</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">자유게시판</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">내 글</a>
	                    </div>
	                </div>
	            </div>
	        </div>
	
	        <div id="topRightBox" class="noto-sans-kr">
				<div id="topLogin">
					<a href="<c:url value='/member/loginForm' />">로그인</a>
				</div>
				<div id="topJoin">
					<a href="<c:url value='/member/joinChoose' />">무료로 시작하기</a>
				</div>	
			</div>
	    </div>
	</div>
	</c:if>
	<c:if test="${not empty sessionScope.sid }">
	<div id="headerTop">
	    <div id="topContainer">
	        <div id="topLeftBox" class="noto-sans-kr">
	            <div id="logoBox">
	                <a href="<c:url value='/' />">
	                    <img id="logo" src="<c:url value='/image/logo.jpg'/>" alt="Logo">
	                    <div id="logoText" class="yeon-sung">FitHub</div>
	                </a>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/ai/map' />">기능
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/ai/map' />">체육관 정보</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/gym/joinAndPayGym' />">회비 납부</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">특수활동 납부</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">심사 납부</a>
	                    </div>
	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/prd/prdForm?ctg=도복 및 띠' />">상품
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/prd/prdForm?ctg=도복 및 띠' />">도복 및 띠</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/prd/prdCartForm' />">장바구니</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/prd/orderHistoryForm' />">주문내역</a>
	                    </div>

	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/member/loginForm' />">특수활동
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">공고</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/member/loginForm' />">갤러리</a>
	                    </div>
	                </div>
	            </div>
	
	            <div class="topMainMenu">
	                <div class="topMenuEachBox">
	                    <a href="<c:url value='/board?ctg=공지' />">게시판
	                        <div class="menuDown"></div>
	                    </a>
	                </div>
	                <div class="topSubMenu">
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/board?ctg=공지' />">공지사항</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/board?ctg=중고' />">중고거래</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/board?ctg=문의' />">문의사항</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/board?ctg=자유' />">자유게시판</a>
	                    </div>
	                    <div class="topSubMenuEach">
	                        <a href="<c:url value='/board?ctg=내 글' />">내 글</a>
	                    </div>
	                </div>
	            </div>
	        </div>
			
	        <div id="topRightBox" class="noto-sans-kr">
			    <div id="topRightImageBox" class="noto-sans-kr">
			        <div id="hello"></div>
			        <img id="myImage" src="<c:url value='' />" alt="Profile Image">
			        <div id="imageSubBox">
			            <div id="imageUserBox">
			                <img id="myImageUser" src="<c:url value='' />" alt="User Image">
			                <div id="imageUserID"></div>
			                <div id="imageUserEmail"></div>
			            </div>
			            <div id="imageFuncBox">
			                <div class="imageFuncEach">
			                    <a href="<c:url value='/member/myPageForm' />">마이페이지</a>
			                </div>
			                <div class="imageFuncEach">
			                    <a href="<c:url value='/member/logout' />">로그아웃</a>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
	    </div>
	</div>
	</c:if>
</header>
