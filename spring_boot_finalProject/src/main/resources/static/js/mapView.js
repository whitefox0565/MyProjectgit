$(document).ready(function () {
	var selectedGymName = "";  // 클릭한 도장 이름을 저장할 변수
	var pointX = $('#pointX').val();
	var pointY = $('#pointY').val();
	var memAddress = $('#memAddress').val();

	// 도장이름 검색
	$('#gymNameSearch').on('keyup', function (e) {
		let searchWord = $('#gymNameSearch').val();
		let len = searchWord.length;

		if (e.keyCode >= 0) {
			if (len > 0) {
				$.ajax({
					type: "post",
					url: "/ai/gymNameSearch",
					data: { "searchWord": searchWord },
					success: function (data) {
						// 기존의 내용을 비움
						$('#mapViewGymBox1').hide();
						$('#mapViewGymBox2').css('display', 'flex');
						$('#mapViewGymBox2').empty();

						// 새로운 데이터를 바탕으로 HTML 생성
						$.each(data, function (index, gym) {
							// gym.gymName이 클릭된 값과 동일한지 확인
							if (gym.gymName === selectedGymName) {
								$('#mapViewGymBox2').append(`
                                    <div class="mapViewGymEach" style="font-weight: 700; font-size: 16px; text-decoration: underline; text-underline-offset: 15px; text-decoration-thickness: 2px;">
                                        ${gym.gymName}
                                    </div>
                                `);
							} else {
								$('#mapViewGymBox2').append(`<div class="mapViewGymEach">${gym.gymName}</div>`);
							}
						});

						if (data.length < 10) {
							$('#mapViewGymBox2').css('overflow-y', 'hidden'); // 스크롤바 숨기기
						} else {
							$('#mapViewGymBox2').css('overflow-y', 'scroll'); // 스크롤바 보이기
						}
					}
				});
			} else {
				$('#mapViewGymBox1').show();
				$('#mapViewGymBox2').hide();
			}
		}
	});

	// 도장 이름 클릭 시 변경
	$(document).on('click', '.mapViewGymEach', function () {
		selectedGymName = $(this).text();  // 클릭한 도장 이름 저장

		$.ajax({
			type: "post",
			url: "/gym/getGymDataByName",
			data: { "gymName": selectedGymName },
			dataType: "json",
			success: function (result) {
				$("#mapViewGymName").text(selectedGymName);
				$("#mapManagerText").text(result["memName"]);
				$("#mapNumberText").text(result["memHp"]);
				$("#mapGymNumberText").text(result["gymHp"]);
				$("#mapGymAddressText").text(result["memAddress1"]);
				$("#mapViewGymLink").text(selectedGymName + " 갤러리");

				var gymPointX = result["pointX"];
				var gymPointY = result["pointY"];
				var gymAddress = result["memAddress1"];

				let mapOptions = {
					center: new naver.maps.LatLng(pointY || 36.81358, pointX || 127.1417),
					zoom: 11,
					minZoom: 7,
					zoomControl: true,
					zoomControlOptions: {
						position: naver.maps.Position.TOP_RIGHT
					}
				};

				let map = new naver.maps.Map('map', mapOptions);

				let iconStyle = `
                    <div style="background-color:transparent;">
                        <img src="/image/pingred.png" width="20" height="32">
                    </div>
                `;

				var marker = new naver.maps.Marker({
					map: map,
					position: new naver.maps.LatLng(gymPointY, gymPointX),
					icon: {
						content: [iconStyle].join(''),
						size: new naver.maps.Size(25, 34),
						scaledSize: new naver.maps.Size(30, 34),
						origin: new naver.maps.Point(0, 0),
						anchor: new naver.maps.Point(12, 34)
					}
				});

				var marker = new naver.maps.Marker({
					map: map,
					position: new naver.maps.LatLng(pointY, pointX)
				});
			}
		});
	});

	// MapViewLink hover effect
	$("#mapViewLink").hover(
		function () {
			$(this).find('a').css({
				"background-color": "#333333",
				"color": "whitesmoke"
			});
		},
		function () {
			$(this).find('a').css({
				"background-color": "black",
				"color": "white"
			});
		}
	);

	// MapViewGymEach hover effect
	$(document).on('mouseenter', '.mapViewGymEach', function () {
		$(this).css({
			"background-color": "#f8f9f9",
			"color": "gray"
		});
	});

	$(document).on('mouseleave', '.mapViewGymEach', function () {
		$(this).css({
			"background-color": "white",
			"color": "#424949"
		});
	});

	// 특정 요소가 보이도록 설정
	$(document).on('click', '.mapViewGymEach', function () {
		$('#mapViewGymName, .mapViewGymContents, #mapViewLink a').css("display", "flex");  // Show the gym info box
	});

	// 메뉴 항목의 스타일 초기화 및 변경
	$(document).on('click', '.mapViewGymEach', function () {
		$(".mapViewGymEach").css({
			"font-weight": "normal",
			"font-size": "16px",
			"text-decoration": "none"
		});

		$(this).css({
			"font-weight": "700",
			"font-size": "16px",
			"text-decoration": "underline",
			"text-underline-offset": "15px",
			"text-decoration-thickness": "2px"
		});
	});
	
	//매니저가 사용할 때
	let userChk = $('#userChk').val()
	if(userChk == "manager"){
		
		let nowUser = $('#nowUser').val()
		console.log(nowUser);
		
		$('#mapViewGymName, .mapViewGymContents, #mapViewLink, a').css("display", "flex");
		$('#mapViewRightBox').css("border-left", "0");
		
		$.ajax({
			type: "post",
			url: "/gym/getGymDataByName",
			data: { "gymName": nowUser },
			dataType: "json",
			success: function (result) {
				$("#mapViewGymName").text(nowUser);
				$("#mapManagerText").text(result["memName"]);
				$("#mapNumberText").text(result["memHp"]);
				$("#mapGymNumberText").text(result["gymHp"]);
				$("#mapGymAddressText").text(result["memAddress1"]);
				$("#mapViewGymLink").text("정보 수정");

				var gymPointX = result["pointX"];
				var gymPointY = result["pointY"];
				var gymAddress = result["memAddress1"];

				let mapOptions = {
					center: new naver.maps.LatLng(pointY || 36.81358, pointX || 127.1417),
					zoom: 18,
					minZoom: 7,
					zoomControl: true,
					zoomControlOptions: {
						position: naver.maps.Position.TOP_RIGHT
					}
				};

				let map = new naver.maps.Map('map', mapOptions);

				let iconStyle = `
                    <div style="background-color:transparent;">
                        <img src="/image/pingred.png" width="20" height="32">
                    </div>
                `;

				var marker = new naver.maps.Marker({
					map: map,
					position: new naver.maps.LatLng(pointY, pointX)
				});
			}
		});
	}
});
