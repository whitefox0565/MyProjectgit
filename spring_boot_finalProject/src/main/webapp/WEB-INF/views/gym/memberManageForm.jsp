<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
  <script src="<c:url value='/js/imageFileUpload.js'/>"></script>
  <script src="<c:url value='/js/myPageForm.js'/>"></script>
  <script src="<c:url value='/js/myPageInfo.js'/>"></script>
  <c:import url="/WEB-INF/views/layout/head.jsp" />
 </head>
 <body>
  	<c:import url="/WEB-INF/views/layout/top.jsp" />
  	<div class="bodyContents">
        <div id="myPageForm">
            <div id="myPageContainer" class="noto-sans-kr">
                <div id="myPageTitleBox">
                    <div id="myPageTitle">마이페이지</div>
                </div>
                <div id="myPageContentsBox">
                    <div id="myPageLeftBox">
                        <div id="myPageInfoBox">
                            <input type="file" id="fileInput" name="profileImage">
                            <div id="myPageImageBox">
                                <img id="memImg" src="<c:url value='/images/${vo.memImgNo}' />">
                                <img id="memImgModify" src="<c:url value='/image/myPageImageModify.png' />">
                            </div>
                            <div id="myPageInfoNick">${vo.memNick}</div>
                            <div id="myPageInfoEmail">${vo.memEmail}</div>
                        </div>
                        <div id="myPageMenuBox">
                            <div class="myPageMenuEach">
                            	<a href="<c:url value='/member/myPageForm' />">내 프로필</a>
                            </div>
                            <div class="myPageMenuEach">
                            	<a href="<c:url value='/member/myPageChildInfo' />">등록정보</a>
                            </div>
                            <div class="myPageMenuEach" style="font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 2px;">
                            	<a href="/awards">수상내역</a>
                            </div>
                            <div id="memDeleteAccount">
                            	회원탈퇴
                            </div>
                        </div>
                    </div>
                    <div id="myPageRightBox">
                       <div id="myPageMemberManageInfo">
                            <div id="myPageMemberManageContainer">
                                <div id="myPageMemberManageUser">
                                	<div id="myPageMemberManageUserData"></div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  	<c:import url="/WEB-INF/views/layout/bottom.jsp" />
 </body>
</html>