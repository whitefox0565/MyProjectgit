<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <title>마이페이지</title>
    <script src="<c:url value='/js/jquery-3.7.1.min.js'/>"></script>
    <script src="<c:url value='/js/imageFileUpload.js'/>"></script>
    <script src="<c:url value='/js/myPageForm.js'/>"></script>
    <script src="<c:url value='/js/getGymPosition.js'/>"></script>
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=220b65eklm&submodules=geocoder"></script>
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
                            <div class="myPageMenuEach" style="font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 2px;">
                            	<a href="<c:url value='/member/myPageForm' />">내 프로필</a>
                            </div>
                            <div class="myPageMenuEach">
                            	<c:if test="${vo.gymNo == null }">
                            		<a href="<c:url value='/member/myPageChildInfo' />">등록정보</a>
                            	</c:if>
                            	<c:if test="${vo.gymNo != null }">
                            		<a href="<c:url value='/member/myPageChildInfo' />">회원관리</a>
                            	</c:if>
                            </div>
                            <div class="myPageMenuEach">
                            	<a href="/member/myPageAwardsForm">수상내역</a>
                            </div>
                            <div id="memDeleteAccount">
                            	회원탈퇴
                            </div>
                        </div>
                    </div>
                    <div id="myPageRightBox">
                        <div id="myPageMyInfo">
                            <!-- 수정 가능한 input 필드들 -->
                            <form method="post" action="/member/myPageUpdate">
                                <div class="myPageMyContents">
                                    <img id="myPageId" src="<c:url value='/image/myPageId.jpg'/>"
                                        class="myPageImage" onclick="editField('memId')">
                                    <input id="memId" name="memId" type="text" value="${vo.memId}" readonly>
                                </div>
                                <div class="myPageMyContents">
                                    <img id="myPageNick" src="<c:url value='/image/myPageNick.png'/>"
                                        class="myPageImage" onclick="editField('memNick')">
                                    <input id="memNick" name="memNick" type="text" value="${vo.memNick}" readonly>
                                </div>
                                <div id="memNick_chk" class="status-message"></div>
                                <div class="myPageMyContents">
                                    <img src="<c:url value='/image/mapManager.png'/>"
                                        class="myPageImage" onclick="editField('memName')">
                                    <input id="memName" name="memName" type="text" value="${vo.memName}" readonly>
                                </div>
                                <div class="myPageMyContents">
                                    <img src="<c:url value='/image/mapNumber.png'/>"
                                        class="myPageImage" onclick="editField('memHp')">
                                    <input id="memHp" name="memHp" type="text" value="${vo.memHp}" readonly>
                                </div>
                                <div class="myPageMyContents">
                                    <img id="myPageEmail" src="<c:url value='/image/myPageEmail.png'/>"
                                        class="myPageImage" onclick="editField('memEmail')">
                                    <input id="memEmail" name="memEmail" type="text" value="${vo.memEmail}" readonly>
                                </div>
                                <div id="memEmail_chk" class="status-message"></div>
                                <div class="myPageMyContents">
                                    <img src="<c:url value='/image/mapGymAddress.png'/>"
                                        class="myPageImage" onclick="editField('memAddress')">
                                    <input id="memZipcode" name="memZipcode" type="hidden" value="${vo.memZipcode}" readonly required>
                                    <input id="memAddress1" name="memAddress1" type="text" value="${vo.memAddress1}" readonly required>
                                    <input type="button" id="searchZipBtn" name="searchZipBtn" value="주소검색" class="inBtn">
                                </div>
                                <div class="myPageMyContents">
                                    <img id="myPageAddress" src="<c:url value='/image/myPageAddress.png'/>"
                                        class="myPageImage" onclick="editField('memAddress')">
                                    <input id="memAddress2" name="memAddress2" type="text" value="${vo.memAddress2}" readonly required>
                                </div>
                                <div class="myPageMyContents">
                                    <img src="<c:url value='/image/myPageDate.png'/>"
                                        class="myPageImage" onclick="editField('myPageDate')">
                                    <input id="myPageDate" type="text" value="${date}" readonly>
                                </div>
                                <!-- 정보 수정 및 저장 버튼 -->
                                <div id="myPageModify">
                                	<input type="hidden" id="pointX" name="pointX" value="">
									<input type="hidden" id="pointY" name="pointY" value="">
                                    <input type="button" class="modifyBtn" id="editBtn" value="정보 수정하기">
                                    <input type="submit" class="modifyBtn" id="saveBtn" value="저장하기">
                                </div>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/bottom.jsp" />
</body>
</html>
