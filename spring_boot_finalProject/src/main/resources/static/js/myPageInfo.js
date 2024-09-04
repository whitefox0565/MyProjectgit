$(document).ready(function() {
	var isSubEditable = false;

    loadChild();
    

    // Add new user on Plus button click
    $("#myPagePlus").on('click', function() {
        const newUserEach = $("<div>", { class: "myPageRegisterUserEach" });
        newUserEach.html("<p>등록회원</p>");
        newUserEach.css('border', '1px solid #a3a3a3'); // Default border color

        const image = $("<img>", {
            src: "/image/myPageDown.jpg",
            alt: "Down Image",
            class: "myPageDown"
        });

        const subMenu = $("<div>", { class: "myPageRegisterUserSub" });
        subMenu.html(`
            <div class="myPageRegisterSubBox">
            	<input id="childNo" class="childNo" name="childNo" type="hidden" value="" readonly>
                <div id="myPageSubModify">
                    <div id="myPageSubModifyBox">
                        <img id="myPagePencil" src="/image/myPagePencil.png" class="modifyButton">
                        <img id="myPageSave" src="/image/myPageSave.png" class="saveButton">
                        <input type="submit" id="subSaveBtn" value="">
                        <img id="myPageDelete" src="/image/myPageDelete.png" class="deleteButton">
                    </div>
                </div>
                <div class="myPageSubContents">
                    <img id="myPageId" src="/image/myPageId.jpg" class="myPageImage" onclick="editField('memSubName')">
                    <input id="memSubName" class="memSubName" name="memSubName" type="text" value="" readonly>
                </div>
                <div class="myPageSubContents">
                    <img src="/image/myPageAge.png" class="myPageImage" onclick="editField('memSubAge')">
                    <input id="memSubAge" class="memSubAge" name="memSubAge" type="text" value="" readonly required>
                </div>
                <div class="myPageSubContents">
                    <img id="myPageGender" src="/image/myPageGender.png" class="myPageImage" onclick="editField('memSubGender')">
                    <input id="memSubGender" class="memSubGender" name="memSubGender" type="text" value="" readonly required>
                </div>
                <div class="myPageSubContents">
                    <img src="/image/mapNumber.png" class="myPageImage" onclick="editField('memSubNumber')">
                    <input id="memSubNumber" class="memSubNumber" name="memSubNumber" type="text" value="" readonly>
                </div>
                <div class="myPageSubContents">
                    <img src="/image/myPageGym.png" class="myPageImage" onclick="editField('memSubGym')">
                    <input id="memSubGym" class="memSubGym" name="memSubGym" type="text" value="" readonly>
                </div>
                <div class="myPageSubContents">
                    <img src="/image/myPageBelt.png" class="myPageImage" onclick="editField('memSubBelt')">
                    <input id="memSubBelt" class="memSubBelt" name="memSubBelt" type="text" value="" readonly>
                </div>
                <div class="myPageSubContents">
                    <img src="/image/myPageDate.png" class="myPageImage" onclick="editField('memSubDate')">
                    <input id="memSubDate" class="memSubDate" name="memSubDate" type="text" value="" readonly>
                </div>
            </div>
        `);

        newUserEach.append(image);
        $("#myPageRegisterUserData").append(newUserEach);
        $("#myPageRegisterUserData").append(subMenu);

        // Toggle submenu visibility when the image is clicked
        image.on('click', function() {
            const isOpen = subMenu.css('display') === 'flex';
            $(".myPageRegisterUserSub").hide();
            $(".myPageDown").css('transform', 'rotate(0deg)');
            $(".myPageRegisterUserEach").css('border', '1px solid #a3a3a3');

            if (!isOpen) {
                subMenu.css('display', 'flex');
                image.css('transform', 'rotate(180deg)');
                newUserEach.css('border', '2px solid black');
            }
        });
    });

    // Delete button click event within the submenu
    $("#myPageRegisterUser").on('click', '.deleteButton', function() {
        if (confirm("삭제하시겠습니까?")) {
        	const $subBox = $(this).closest('.myPageRegisterSubBox');
	        const childNo = $subBox.find('.childNo').val();
        	
            const subMenu = $(this).closest('.myPageRegisterUserSub');
            const newUserEach = subMenu.prev('.myPageRegisterUserEach');
            newUserEach.remove();
            subMenu.remove();
            
            if(childNo != null){
	            $.ajax({
	            	type:"post",
	            	url:"/child/myPageChildDel",
	            	data:{"childNo":childNo}
	            })
            }
        }
    });
    
    // Modify button click event
    
    $(document).on('click', '.modifyButton', function() {
        isSubEditable = true;
        var hp = $(this).closest('.myPageRegisterSubBox').find('.memSubNumber').val();
        $(this).closest('.myPageRegisterSubBox').find('.memSubNumber').val(hp.replace(/-/gi,""));
       
        // Enable editing for input fields (excluding certain fields)
        $(this).closest('.myPageRegisterSubBox').find('input[type=text]')
            .not('#memSubBelt, #memSubGym, #memSubDate')
            .prop('readonly', false)
            .css({
                'color': '#a8a8a8',
                'border-bottom': '1px solid #e8e8e8',
                'cursor': 'auto'
            });
            
        // Show save button and hide edit button
        $(this).closest('.myPageRegisterSubBox').find('.saveButton').show();
        $(this).hide(); // Hide the edit button
    });

    // Save button click event
    
    $(document).on('click', '.saveButton', function() {
        isSubEditable = false;

        const $subBox = $(this).closest('.myPageRegisterSubBox');
        const childName = $subBox.find('.memSubName').val();
        const childAge = $subBox.find('.memSubAge').val();
        const childSex = $subBox.find('.memSubGender').val();
        const childHp = $subBox.find('.memSubNumber').val();
        const childNo = $subBox.find('.childNo').val();
        
        const namePattern = /^[ㄱ-ㅎ가-힣]{1,5}$/;
		const agePattern = /^[0-9]{1,2}$/;
		const hpPattern = /^01[0-9]{9}$/;
        
        var nameChk = namePattern.test(childName);
   		var ageChk = agePattern.test(childAge);
   		var hpChk = hpPattern.test(childHp);
   		
        console.log(hpChk)
        
        if(nameChk && ageChk && hpChk){
	        $.ajax({
	            type: "post",
	            url: "/child/signUpChildInMyPage",
	            data: {
	                "childName": childName,
	                "childAge": childAge,
	                "childSex": childSex,
	                "childHp": childHp,
	                "childNo": childNo
	            },
	            success: function() {
	               location.href = "/member/myPageChildInfo"; // Reload the data
	            }
	        });
        }else{
        	if(!nameChk) alert("이름을 확인해주세요(한글 이름 2-5자)");
        	else if(!ageChk) alert("나이를 확인해주세요(숫자만 입력)");
        	else if(!hpChk) alert("전화번호를 확인해주세요(-없이 숫자만 입력 11자리)");
        	
        	return false;
        }

        $subBox.find('input[type=text]')
            .not('#memSubBelt, #memSubGym, #memSubDate')
            .prop('readonly', true)
            .css({
                'color': 'black',
                'border-bottom': '',
                'cursor': 'default'
            });

        $subBox.find('.modifyButton').show();
        $(this).hide(); // Hide the save button
        $('#subSaveBtn').click(); // Assuming this triggers additional behavior
    });

    // Input field focus and blur events
    $(document).on('focus', '.myPageSubContents input[type=text]', function() {
        $(this).css("outline", "none");
        if (isSubEditable && !$(this).is('#memSubBelt, #memSubGym, #memSubDate')) {
            $(this).css("border-bottom", "1px solid #1b2631");
        }
    });

    $(document).on('blur', '.myPageSubContents input[type=text]', function() {
        if (isSubEditable && !$(this).is('#memSubBelt, #memSubGym, #memSubDate')) {
            $(this).css("border-bottom", "1px solid #e8e8e8");
        }
    });
    
    function loadChild(){
    	$.ajax({
            type: "post",
            url: "/child/loadMyChildInfo",
            success: function(result) {
                $("#myPageRegisterUserData").empty();
                
                result.forEach(child => {
                    const newUserEach = $("<div>", { class: "myPageRegisterUserEach" });
                    newUserEach.html("<p>" + child.childName + "</p>");
                    newUserEach.css('border', '1px solid #a3a3a3'); // Default border color

                    const image = $("<img>", {
                        src: "/image/myPageDown.jpg",
                        alt: "Down Image",
                        class: "myPageDown"
                    });

                    const subMenu = $("<div>", { class: "myPageRegisterUserSub" });
                    subMenu.html(`
                        <div class="myPageRegisterSubBox">
                        	<input id="childNo" class="childNo" name="childNo" type="hidden" value="${child.childNo}" readonly>
                            <div id="myPageSubModify">
                                <div id="myPageSubModifyBox">
                                    <img id="myPagePencil" src="/image/myPagePencil.png" class="modifyButton">
                                    <img id="myPageSave" src="/image/myPageSave.png" class="saveButton">
                                    <input type="submit" id="subSaveBtn" value="">
                                    <img id="myPageDelete" src="/image/myPageDelete.png" class="deleteButton">
                                </div>
                            </div>
                            <div class="myPageSubContents">
                                <img id="myPageId" src="/image/myPageId.jpg" class="myPageImage" onclick="editField('memSubName')">
                                <input id="memSubName" class="memSubName" name="memSubName" type="text" value="${child.childName}" readonly>
                            </div>
                            <div class="myPageSubContents">
                                <img src="/image/myPageAge.png" class="myPageImage" onclick="editField('memSubAge')">
                                <input id="memSubAge" class="memSubAge" name="memSubAge" type="text" value="${child.childAge}" readonly required>
                            </div>
                            <div class="myPageSubContents">
                                <img id="myPageGender" src="/image/myPageGender.png" class="myPageImage" onclick="editField('memSubGender')">
                                <input id="memSubGender" class="memSubGender" name="memSubGender" type="text" value="${child.childSex}" readonly required>
                            </div>
                            <div class="myPageSubContents">
                                <img src="/image/mapNumber.png" class="myPageImage" onclick="editField('memSubNumber')">
                                <input id="memSubNumber" class="memSubNumber" name="memSubNumber" type="text" value="${child.childHp}" readonly>
                            </div>
                            <div class="myPageSubContents">
                                <img src="/image/myPageGym.png" class="myPageImage" onclick="editField('memSubGym')">
                                <input id="memSubGym" class="memSubGym" name="memSubGym" type="text" value="${child.gymName}" readonly>
                            </div>
                            <div class="myPageSubContents">
                                <img src="/image/myPageBelt.png" class="myPageImage" onclick="editField('memSubBelt')">
                                <input id="memSubBelt" class="memSubBelt" name="memSubBelt" type="text" value="${child.childBelt}" readonly>
                            </div>
                            <div class="myPageSubContents">
                                <img src="/image/myPageDate.png" class="myPageImage" onclick="editField('memSubDate')">
                                <input id="memSubDate" class="memSubDate" name="memSubDate" type="text" value="${child.deadLine}" readonly>
                            </div>    
                        </div>
                    `);

                    newUserEach.append(image);
                    $("#myPageRegisterUserData").append(newUserEach);
                    $("#myPageRegisterUserData").append(subMenu);
                    

                    // Toggle submenu visibility when the image is clicked
                    image.on('click', function() {
                        const isOpen = subMenu.css('display') === 'flex';
                        $(".myPageRegisterUserSub").hide();
                        $(".myPageDown").css('transform', 'rotate(0deg)');
                        $(".myPageRegisterUserEach").css('border', '1px solid #a3a3a3');
                        
                        if (!isOpen) {
                            subMenu.css('display', 'flex');
                            image.css('transform', 'rotate(180deg)');
                            newUserEach.css('border', '2px solid black');
                        }
                    });
                });
            }
        });

        // Apply styles to the clicked menu item
        $(this).css({
            "font-weight": "600",
            "font-size": "21px",
            "text-decoration": "underline",
            "text-underline-offset": "15px",
            "text-decoration-thickness": "2px"
        });
    }
});