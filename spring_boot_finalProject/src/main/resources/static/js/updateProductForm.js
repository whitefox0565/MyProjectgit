$(document).ready(function() {
    var mainImageName = $('#prdImg').attr('data-prd-img');
    var detailImageName = '';
    
    $(document).on('keydown', function(e) {
        if (e.keyCode === 13) return false; // Enter key disable
    });

    $('#fileInputMain').on('change', function() {
        const input = this;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            mainImageName = input.files[0].name;
            reader.readAsDataURL(input.files[0]);

            let formData = new FormData();
            formData.append('uploadFile', input.files[0]);

            $.ajax({
                type: "post",
                url: "/member/imageFileUploadOnly",
                enctype: "multipart/form-data",
                processData: false,
                contentType: false,
                data: formData,
                success: function() {
                    $('#productMainImageBox').append(
                        '<img class="productMainImage" src="/images/' + mainImageName + '" width="100" height="100" data-filename="' + mainImageName + '">'
                    );
                }
            });
        }
    });

    $('#productMainImageBox').on('click', '.productMainImage', function() {
        let fileName = $(this).data('filename');
        if ($('#prdMain img').length > 0) {
            alert('대표 이미지는 하나만 업로드할 수 있습니다.');
            return;
        }
        $('#prdMain').append(
            '<img class="productMainImg" src="/images/' + fileName + '" data-filename="' + fileName + '">'
        );
    });

    $('#fileInputDetail').on('change', function() {
        const input = this;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            detailImageName = input.files[0].name;
            reader.readAsDataURL(input.files[0]);

            let formData = new FormData();
            formData.append('uploadFile', input.files[0]);

            $.ajax({
                type: "post",
                url: "/member/imageFileUploadOnly",
                enctype: "multipart/form-data",
                processData: false,
                contentType: false,
                data: formData,
                success: function() {
                    $('#productDetailImageBox').append(
                        '<img class="productDetailImage" src="/images/' + detailImageName + '" width="100" height="100" data-filename="' + detailImageName + '">'
                    );
                }
            });
        }
    });

    $('#productDetailImageBox').on('click', '.productDetailImage', function() {
        let fileName = $(this).data('filename');
        $('#prdDetail').append(
            '<img class="productDetailImg" src="/images/' + fileName + '" data-filename="' + fileName + '">'
        );
    });

    $('#updatePrdBtn').on('click', function() {
    	event.preventDefault();
    
        let main = $('#prdMain').html();
        let detail = $('#prdDetail').html();
        let prdName = $('#prdName').val();
        let prdPrice = $('#prdPrice').val();
        let ctg = $('.insertProductPageSelectPlaceholder').text().trim();
        let prdNo = $('#prdNo').attr("data-prd-no");
        
      	/*console.log(main);
        console.log(detail);
        console.log(prdName);
        console.log(prdPrice);
        console.log(ctg);
        console.log($('#prdNo').attr("data-prd-no"));*/
        
        
        $.ajax({
            type: "post",
            url: "/prd/updateProduct",
            data:{
                "prdMain": main,
                "prdDetail": detail,
                "prdName": prdName,
                "prdPrice": prdPrice,
                "prdImg":mainImageName,
                "ctgId":ctg,
                "prdNo": prdNo
            },
            success: function() {
                location.href = "/prd/productDetailForm?prdNo=" + prdNo;
            }
        });
        
        //json 형태로 보내기
       /* $.ajax({
            type: "post",
            url: "/prd/updateProduct",
            contentType: "application/json",
            data: JSON.stringify({
                "prdMain": main,
                "prdDetail": detail,
                "prdName": prdName,
                "prdPrice": prdPrice,
                "prdImg":mainImageName,
                "ctgId":ctg,
                "prdNo": prdNo
            }),
            success: function() {
                location.href = "/prd/prdForm?ctg=도복 및 띠";
            }
        });*/
    });

    $('#productDetailImageInputButton').on('click', function() {
        $('#fileInputDetail').click();
    });

    $('#productMainImageInputButton').on('click', function() {
        $('#fileInputMain').click();
    });
    
        $(".insertProductPageSelectPlaceholder").on('click', function() {
        var currentDisplay = $(this).siblings(".insertProductPageSubSelect").css("display");

        if (currentDisplay === "none" || currentDisplay === "") {
            $(this).siblings(".insertProductPageSubSelect").css("display", "flex");
        } else {
            $(this).siblings(".insertProductPageSubSelect").css("display", "none");
        }
      
    });

    // insertProductPageSubSelectEach 클릭 시 Placeholder 값 변경
    $(".insertProductPageSubSelectEach").on('click', function() {
        var selectedValue = $(this).text();  // 선택된 텍스트를 가져옴
        var placeholder = $(this).closest(".insertProductPageSelect").find(".insertProductPageSelectPlaceholder");  // Placeholder를 찾음
        var selectedCtgValue = $(this).closest(".insertProductPageSelect").find(".insertProductPageSubSelectEach");
        placeholder.html(selectedValue + ' <div class="insertProductPageDown"></div>');  // Placeholder 값을 업데이트하고 insertProductPageDown div를 유지
        selectedCtgValue.attr("data-value", selectedValue);
        $(this).parent().css("display", "none");  // 드롭다운을 숨김
    });

    
    // 클릭 외부 클릭 시 숨기기
    $(document).on('click', function(event) {
        if (!$(event.target).closest(".insertProductPageSelectPlaceholder, .insertProductPageSubSelect").length) {
            $(".insertProductPageSubSelect").css("display", "none");
        }
    });
    
    $(".insertProductPageSelectPlaceholder, .insertProductPageSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#dddddd",
                "color": "gray"
            });
        })
        .on('mouseleave', function(){
            $(this).css({
                "background-color": "#f8f8f8",
                "color": "#424949"
            });
        }
    );
    
        $(".insertProductPageSubSelectEach").on('mouseenter', function() {
            $(this).css({
                "background-color": "#f3f3f3",
                "color": "gray"
            });
        })
        .on('mouseleave', function(){
            $(this).css({
                "background-color": "white",
                "color": "#424949"
            });
        }
    );
    
});
