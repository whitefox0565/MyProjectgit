/**
 * map.js
 */
 
 window.onload = function() {
 	var pointX = $('#pointX').val();
 	var pointY = $('#pointY').val();
 	var memAddress = $('#memAddress').val();
 	//var nowUser = $('#nowUser').val();
 	
    loadMapBasicPosition();

 	//로그인시 내 위치 표시
 	function loadMapBasicPosition() {
	    let markerArr = [];
	    let infoWindowArr = [];
	
	    const mapOptions = {
	        center: new naver.maps.LatLng(pointY || 36.81358, pointX || 127.1417),
	        zoom: 12,
	        minZoom: 7,
	        zoomControl: true,
	        zoomControlOptions: {
	            position: naver.maps.Position.TOP_RIGHT
	        }
	    };
	
	    const map = new naver.maps.Map('map', mapOptions);
		
	    if ($('#chk').val() == "user") {
	    	
	        new naver.maps.Marker({
	            map: map,
	            position: new naver.maps.LatLng(pointY, pointX)
	        });
	
	        $.ajax({
	            type: "post",
	            url: "/ai/getAllGymPosition",
	            success: function(result) {
	                for(let i = 0; i < result.length; i++){
	                	let iconStyle = `
										 <div style="background-color:transparent;">
												<img src="/image/pingred.png" width="20" height="32">		
										 </div>
										`;
									
	                            
	                    let marker = new naver.maps.Marker({
	                        map: map,
	                        title: name,
	                        position: new naver.maps.LatLng(result[i].pointY, result[i].pointX),
	                        icon: {
									content: [iconStyle].join(''),
									size: new naver.maps.Size(25, 34),
									scaledSize: new naver.maps.Size(30, 34),
									origin: new naver.maps.Point(0, 0),
									anchor: new naver.maps.Point(12, 34)
						    	  }
	                     });
	
	                     markerArr.push(marker);
	
	                     let contentString = `<div class="iw_inner">
	                                             <h3>${result[i].gymName}</h3>
	                                             <p>${result[i].memAddress1}</p>
	                                           </div>`;
	
	                     let infowindow = new naver.maps.InfoWindow({
	                          content: contentString
	                     });
	
	                     infoWindowArr.push(infowindow);
	                     
	                            
	                            
	                }
	
	                // 모든 마커와 정보창이 생성된 후 실행
	                
	                markerArr.forEach((marker, index) => {
	                     naver.maps.Event.addListener(marker, "click", function(e) {
		                     if (infoWindowArr[index].getMap()) {
		                        infoWindowArr[index].close();
		                     } else {
		                        infoWindowArr[index].open(map, marker);
		                     }
	                     });
	               });
	                
	            }
	        });
	    }else{
			 var marker = new naver.maps.Marker({
			     map: map,
			     position: new naver.maps.LatLng(pointY, pointX)
		   	 });
		}
	}

	// 지도를 이동하게 해주는 함수
	function moveMap(len, lat) {
		var mapOptions = {
			    center: new naver.maps.LatLng(len, lat),
			    zoom: 15,
			    mapTypeControl: true
			};
	    var map = new naver.maps.Map('map', mapOptions);
	    var marker = new naver.maps.Marker({
	        position: new naver.maps.LatLng(len, lat),
	        map: map
	    });
	}
 };
 

 
 
 


