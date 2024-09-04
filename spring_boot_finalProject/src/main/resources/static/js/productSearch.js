/**
 * 
 */
 
 $(document).ready(function(){
    $('#prdSearchForm').on('submit', function(){
       let keyword = $('#prdSearch').val();
       
       if(keyword.length <= 0){
          alert('검색어를 입력하세요');
          return false;
       }
       
    });
    
    $('#prdSearch').on('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // 기본 Enter 동작 방지
                $('#prdSearchBtn').click(); // 검색 버튼 클릭
            }
    });
    
    $('#mapSearch').on('click', function() {
        $('#prdSearchBtn').click(); // 검색 버튼 클릭
    });
 });