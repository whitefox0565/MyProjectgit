/**
 * 
 */
 
 $(document).ready(function(){
 	var fileName = "";
 	$('#uploadFile').on('change',function() {
 		event.preventDefault();
 		
 		let formData = new FormData($('#imageFileFrm')[0]);
 		
 		//let formData = new FormData(document.imageFileFrm);
 		
 		fileName = $('#uploadFile').val().split("\\").pop();
 		//console.log($('#uploadFile').val());
 		//console.log(new FormData($('#imageFileFrm')[0]));
 		//console.log(fileName);
 		
 		$.ajax({
	 			type:"post",
	 			url:"/member/imageFileUpload",
	 			enctype:"multipart/form-data",
	 			processData:false,
	 			contentType:false,
	 			data: formData,
				success: function (result) {
					if (result == "success"){
					 $('#imgBox').html('<img src="/images/' + fileName + '" width="400" height="300">'); 
					}
				},
				erro: function () {
					alert("실패");
				}
	 	});
 	});
 	
 	$('#imageFileFrm').on('submit', function(){
 		event.preventDefault();
 		
 		let memId = $('#memId').val();
 		let chk = $('#userChk').val();
 		console.log(chk);
 		$.ajax({
 			type:"post",
 			url:"/member/imgUpdate",
 			data:{"memId":memId, "fileName":fileName, "chk":chk},
 			success:function(result){
 				if(result) document.location.href = document.location.href;
 				else alert("저장실패");
 			}
 		});
 	});
 });

 /*$(document).ready(function(){
 	$('#imageFileFrm').on('submit',function() {
 		event.preventDefault();
 		
 		let formData = new FormData($('#imageFileFrm')[0]);
 		
 		let formData = new FormData(document.imageFileFrm);
 		console.log($('#uploadFile').val());
 		let fileName = $('#uploadFile').val().split("\\").pop();
 		console.log(fileName);
 		
 		$.ajax({
	 			type:"post",
	 			url:"/member/imageFileUpload",
	 			enctype:"multipart/form-data",
	 			processData:false,
	 			contentType:false,
	 			data: formData,
				success: function (result) {
					if (result == "success"){
					 $('#imgBox').html('<img src="/images/' + fileName + '" width="400" height="300">'); 
					}
				},
				erro: function () {
					alert("실패");
				}
	 	});
 	});
 });*/